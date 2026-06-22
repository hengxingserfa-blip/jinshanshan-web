import { NextRequest } from "next/server";
import { isAdminLoggedIn } from "@/lib/admin/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface SyncEvent {
  type: "log" | "progress" | "summary" | "error" | "done";
  message?: string;
  current?: number;
  total?: number;
  ok?: number;
  skip?: number;
  fail?: number;
}

function sse(event: SyncEvent): string {
  return `data: ${JSON.stringify(event)}\n\n`;
}

// 從 Drive URL 抓 folder id
function parseDriveFolderId(url: string): string | null {
  // 支援:
  //   https://drive.google.com/drive/folders/XXXXX
  //   https://drive.google.com/drive/folders/XXXXX?usp=sharing
  //   https://drive.google.com/drive/u/0/folders/XXXXX
  const m = url.match(/\/folders\/([a-zA-Z0-9_-]+)/);
  return m ? m[1] : null;
}

interface DriveFile {
  id: string;
  name: string;
  mimeType: string;
  size?: string;
  modifiedTime?: string;
}

async function listFolder(folderId: string, accessToken: string): Promise<DriveFile[]> {
  const files: DriveFile[] = [];
  let pageToken: string | undefined;
  do {
    const url = new URL("https://www.googleapis.com/drive/v3/files");
    url.searchParams.set("q", `'${folderId}' in parents and trashed = false`);
    url.searchParams.set("fields", "files(id,name,mimeType,size,modifiedTime),nextPageToken");
    url.searchParams.set("pageSize", "1000");
    if (pageToken) url.searchParams.set("pageToken", pageToken);
    const r = await fetch(url.toString(), {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    if (!r.ok) {
      const txt = await r.text();
      throw new Error(`Drive API ${r.status}: ${txt.slice(0, 200)}`);
    }
    const data = await r.json();
    files.push(...(data.files || []));
    pageToken = data.nextPageToken;
  } while (pageToken);
  return files;
}

export async function POST(req: NextRequest) {
  if (!(await isAdminLoggedIn())) {
    return new Response(JSON.stringify({ error: "未登入" }), { status: 401 });
  }

  const { accessToken, folderUrl } = await req.json();
  if (!accessToken || !folderUrl) {
    return new Response(JSON.stringify({ error: "缺少 accessToken 或 folderUrl" }), { status: 400 });
  }

  const folderId = parseDriveFolderId(folderUrl);
  if (!folderId) {
    return new Response(JSON.stringify({ error: "Drive 資料夾 URL 格式不對" }), { status: 400 });
  }

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      const send = (e: SyncEvent) => controller.enqueue(encoder.encode(sse(e)));

      try {
        send({ type: "log", message: `🔍 抓資料夾 ${folderId} 內容...` });
        const files = await listFolder(folderId, accessToken);
        send({ type: "log", message: `📂 共 ${files.length} 個檔案` });

        // 分類統計
        const byType: Record<string, number> = {};
        for (const f of files) {
          const cat = f.mimeType.startsWith("image/")
            ? "圖片"
            : f.mimeType === "application/vnd.google-apps.spreadsheet"
            ? "Google Sheet"
            : f.mimeType === "application/vnd.google-apps.folder"
            ? "子資料夾"
            : f.mimeType.includes("csv")
            ? "CSV"
            : "其他";
          byType[cat] = (byType[cat] || 0) + 1;
        }
        for (const [k, v] of Object.entries(byType)) {
          send({ type: "log", message: `   ${k}: ${v} 個` });
        }

        // Phase 1: 只列出檔案,實際同步 logic 等資料結構確認
        send({ type: "progress", current: 0, total: files.length });
        let ok = 0, skip = 0, fail = 0;
        for (let i = 0; i < files.length; i++) {
          const f = files[i];
          // TODO Phase 2: 看 mimeType 分流處理
          // - Sheet → 用 Sheets API 撈 rows,upsert 到 products
          // - 圖片 → download 後 upload 到 Supabase Storage + 建商品 record
          // - CSV → 解析後 upsert
          // 暫時:列出檔名當示範
          send({ type: "log", message: `  · ${f.name} (${f.mimeType.split(".").pop()})` });
          skip++;
          send({ type: "progress", current: i + 1, total: files.length });
          send({ type: "summary", ok, skip, fail });
          // 模擬 throttle(實際處理會自然有 delay)
          await new Promise((r) => setTimeout(r, 30));
        }

        send({ type: "log", message: `⚠ Phase 1:目前只 enumerate 檔案。實際同步 logic 待資料結構確認(Sheet 還是圖片?)` });
        send({ type: "done", message: `enumerate 完成,共 ${files.length} 個檔案` });
      } catch (e) {
        send({ type: "error", message: (e as Error).message });
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}

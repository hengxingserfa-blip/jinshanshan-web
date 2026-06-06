// 從可達 IG 的網路抓最新 12 則,寫進 Supabase ig_posts_cache 表
// 前台首頁從 cache 撈,新貼文 → 打這支 endpoint 就跟上
//
// 用法:
//   curl "https://www.shinygold.com.tw/api/refresh-ig?key=2305ea313728c459b75f4c628c8b6845"
//
// Vercel server 抓 IG API 通常失敗 (機房 IP 被 Meta 擋),所以這支
// endpoint 在 Vercel 上跑常常會回 status: 'fetch-failed'。
// 唯一可靠的更新方式是「從家用網路 / GitHub Actions runner 抓再 PATCH 進 Supabase」。
import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const HANDLE = "shiny_gold991";
const SECRET = "2305ea313728c459b75f4c628c8b6845";

interface IGEdge {
  node: {
    shortcode: string;
    is_video: boolean;
    edge_media_to_caption?: {
      edges: Array<{ node: { text: string } }>;
    };
  };
}

interface CachedPost {
  shortcode: string;
  isVideo: boolean;
  caption: string;
}

async function fetchIG(): Promise<CachedPost[] | null> {
  try {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 5000);
    const res = await fetch(
      `https://www.instagram.com/api/v1/users/web_profile_info/?username=${HANDLE}`,
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
          "X-IG-App-ID": "936619743392459",
        },
        cache: "no-store",
        signal: ctrl.signal,
      }
    );
    clearTimeout(timer);
    if (!res.ok) return null;
    const data = await res.json();
    const edges: IGEdge[] =
      data?.data?.user?.edge_owner_to_timeline_media?.edges ?? [];
    if (edges.length === 0) return null;
    return edges.slice(0, 12).map((e) => ({
      shortcode: e.node.shortcode,
      isVideo: e.node.is_video,
      caption:
        e.node.edge_media_to_caption?.edges?.[0]?.node?.text?.slice(0, 120) ??
        "",
    }));
  } catch {
    return null;
  }
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  if (url.searchParams.get("key") !== SECRET) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  // 方案 1:Vercel 本身抓 IG (常失敗)
  let posts = await fetchIG();
  let source: "ig-direct" | "client-supplied" = "ig-direct";

  // 方案 2:POST 進來的 body 含 posts 陣列 (從家用 / Actions 抓完餵進來)
  if (!posts && req.method === "POST") {
    try {
      const body = await req.json();
      if (Array.isArray(body?.posts) && body.posts.length > 0) {
        posts = body.posts;
        source = "client-supplied";
      }
    } catch {
      // ignore
    }
  }

  if (!posts) {
    return NextResponse.json(
      {
        ok: false,
        message:
          "Vercel server 抓 IG 失敗 (Meta 擋機房 IP)。請從可達 IG 的網路改用 POST 帶 posts 陣列。",
      },
      { status: 502 }
    );
  }

  // 寫進 Supabase
  const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!SUPABASE_URL || !SERVICE_KEY) {
    return NextResponse.json(
      { ok: false, message: "Supabase 未設定" },
      { status: 500 }
    );
  }
  const sb = createClient(SUPABASE_URL, SERVICE_KEY, {
    auth: { persistSession: false },
  });
  const { error } = await sb
    .from("ig_posts_cache")
    .update({ posts, updated_at: new Date().toISOString() })
    .eq("id", 1);
  if (error) {
    return NextResponse.json(
      { ok: false, message: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({
    ok: true,
    source,
    count: posts.length,
    posts: posts.map((p) => p.shortcode),
    timestamp: new Date().toISOString(),
  });
}

export const POST = GET;

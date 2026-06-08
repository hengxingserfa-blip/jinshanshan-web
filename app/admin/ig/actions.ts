"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

function admin() {
  if (!SUPABASE_URL || !SERVICE_KEY) return null;
  return createClient(SUPABASE_URL, SERVICE_KEY, {
    auth: { persistSession: false },
  });
}

interface State {
  ok: boolean;
  message: string;
}

// 解析 IG URL → { shortcode, isVideo }
// 接受:
//   https://www.instagram.com/reel/DZxxxxxxxxx/
//   https://www.instagram.com/p/DZxxxxxxxxx/
//   https://instagram.com/reel/DZxxxxxxxxx
//   也接受純 shortcode: DZxxxxxxxxx
function parseIgUrl(input: string): { shortcode: string; isVideo: boolean } | null {
  const s = input.trim();
  if (!s) return null;
  // /reel/CODE/ or /p/CODE/
  const m = s.match(/instagram\.com\/(reel|p|tv)\/([A-Za-z0-9_-]+)/i);
  if (m) {
    return { shortcode: m[2], isVideo: m[1].toLowerCase() === "reel" || m[1].toLowerCase() === "tv" };
  }
  // 純 shortcode
  if (/^[A-Za-z0-9_-]{6,20}$/.test(s)) {
    return { shortcode: s, isVideo: true };
  }
  return null;
}

export async function saveIgPinned(
  _prev: State,
  formData: FormData
): Promise<State> {
  const sb = admin();
  if (!sb) return { ok: false, message: "Supabase 未設定" };

  // 6 個 slot 一次處理
  const rows: { slot: number; shortcode: string; is_video: boolean; source_url: string }[] = [];
  const toDelete: number[] = [];

  for (let slot = 1; slot <= 6; slot++) {
    const raw = (formData.get(`slot_${slot}`) as string | null) ?? "";
    const trimmed = raw.trim();

    if (!trimmed) {
      toDelete.push(slot);
      continue;
    }
    const parsed = parseIgUrl(trimmed);
    if (!parsed) {
      return {
        ok: false,
        message: `第 ${slot} 格網址格式不對。範例: https://www.instagram.com/reel/XXXXX/`,
      };
    }
    rows.push({
      slot,
      shortcode: parsed.shortcode,
      is_video: parsed.isVideo,
      source_url: trimmed,
    });
  }

  // upsert 有填的
  if (rows.length > 0) {
    const { error } = await sb
      .from("ig_pinned")
      .upsert(rows, { onConflict: "slot" });
    if (error) return { ok: false, message: error.message };
  }
  // 刪掉沒填的
  if (toDelete.length > 0) {
    const { error } = await sb
      .from("ig_pinned")
      .delete()
      .in("slot", toDelete);
    if (error) return { ok: false, message: error.message };
  }

  // 同步處理每格大小設定 (從 size_1 .. size_6 撈)
  const VALID_SIZES = ["S", "M", "M_TALL", "L", "L_TALL", "XL"];
  const slotSizes: Record<string, string> = {};
  for (let i = 1; i <= 6; i++) {
    const raw = (formData.get(`size_${i}`) as string | null) ?? "M";
    slotSizes[String(i)] = VALID_SIZES.includes(raw) ? raw : "M";
  }

  // 欄數設定 (控制影片大小的關鍵)
  const colsMobileRaw = parseInt((formData.get("ig_cols_mobile") as string | null) ?? "2", 10);
  const colsDesktopRaw = parseInt((formData.get("ig_cols_desktop") as string | null) ?? "3", 10);
  const colsMobile = [1, 2].includes(colsMobileRaw) ? colsMobileRaw : 2;
  const colsDesktop = [2, 3].includes(colsDesktopRaw) ? colsDesktopRaw : 3;

  const { error: szErr } = await sb
    .from("site_settings")
    .upsert(
      {
        id: 1,
        slot_sizes: slotSizes,
        ig_cols_mobile: colsMobile,
        ig_cols_desktop: colsDesktop,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "id" }
    );
  if (szErr) return { ok: false, message: `儲存大小失敗:${szErr.message}` };

  revalidatePath("/admin/ig");
  revalidatePath("/");
  const sizeSummary = Object.values(slotSizes).join("/");
  return {
    ok: true,
    message: `已儲存。${rows.length} 格手動指定,${toDelete.length} 格自動抓 IG 最新。6 格大小: ${sizeSummary}`,
  };
}

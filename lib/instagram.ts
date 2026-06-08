// IG 整合
// 顯示邏輯:
//   1. 先撈 ig_pinned 6 個 slot (員工後台手動指定的)
//   2. 空 slot 用 ig_posts_cache (GitHub Actions 每天抓的 IG 最新) 補上,跳過已 pinned 的
//   3. 都拿不到就退回寫死的 FALLBACK_SHORTCODES
export const INSTAGRAM_HANDLE = "shiny_gold991";
export const INSTAGRAM_PROFILE_URL = `https://www.instagram.com/${INSTAGRAM_HANDLE}`;

// 萬一 DB 全失敗的最後保險 — 2026-06-08 從 IG 抓最新更新
const FALLBACK_SHORTCODES: Array<{ code: string; isVideo: boolean }> = [
  { code: "DZUBqm1z8KA", isVideo: true },  // 招財貓手鏈
  { code: "DZT6gXrTWv4", isVideo: true },  // 龍頭古巴手鏈
  { code: "DZT24LMzecd", isVideo: true },  // 今日金價
  { code: "DZSBtmgTF2X", isVideo: true },  // 黃金手鍊 1.16 錢
  { code: "DZR2U5KTheU", isVideo: true },  // 金穗滿滿
  { code: "DZPZw_WTauR", isVideo: true },  // 成交啦
];

export interface IGPost {
  url: string;
  embedUrl: string;
  isVideo: boolean;
  caption: string;
  shortcode: string;
  pinned?: boolean;  // true = 後台手動指定的
}

export type IGSize = "S" | "M" | "L" | "XL";

// IG iframe 高度設定 (mobile / desktop)
export const IG_SIZES: Record<IGSize, { mobile: number; desktop: number; label: string }> = {
  S:  { mobile: 320, desktop: 460, label: "小 (S)" },
  M:  { mobile: 480, desktop: 640, label: "中 (M) — 預設" },
  L:  { mobile: 600, desktop: 780, label: "大 (L)" },
  XL: { mobile: 720, desktop: 920, label: "超大 (XL)" },
};

// 撈站台設定 (目前只有 ig_size)
export async function getSiteSettings(): Promise<{ ig_size: IGSize }> {
  try {
    const { getServerSupabase } = await import("@/lib/supabase/server");
    const supabase = await getServerSupabase();
    if (!supabase) return { ig_size: "M" };
    const { data } = await supabase
      .from("site_settings")
      .select("ig_size")
      .eq("id", 1)
      .maybeSingle();
    const size = (data?.ig_size as IGSize | undefined) ?? "M";
    return { ig_size: ["S", "M", "L", "XL"].includes(size) ? size : "M" };
  } catch {
    return { ig_size: "M" };
  }
}

function buildPost(shortcode: string, isVideo: boolean, caption = "", pinned = false): IGPost {
  const path = isVideo ? "reel" : "p";
  return {
    url: `https://www.instagram.com/${path}/${shortcode}/`,
    embedUrl: `https://www.instagram.com/${path}/${shortcode}/embed/`,
    isVideo,
    caption,
    shortcode,
    pinned,
  };
}

const fallbackPosts = (limit: number): IGPost[] =>
  FALLBACK_SHORTCODES.slice(0, limit).map((p) => buildPost(p.code, p.isVideo));

interface PinnedRow {
  slot: number;
  shortcode: string;
  is_video: boolean;
  caption: string | null;
}

interface CachedPost {
  shortcode: string;
  isVideo: boolean;
  caption?: string;
}

// 撈 6 格首頁要顯示的 IG 貼文 = 手動指定 + 自動抓最新混合
export async function fetchInstagramPosts(limit = 6): Promise<IGPost[]> {
  try {
    const { getServerSupabase } = await import("@/lib/supabase/server");
    const supabase = await getServerSupabase();
    if (!supabase) return fallbackPosts(limit);

    // 兩個查詢同時跑
    const [pinnedResp, cachedResp] = await Promise.all([
      supabase.from("ig_pinned").select("*").order("slot", { ascending: true }),
      supabase.from("ig_posts_cache").select("posts").eq("id", 1).maybeSingle(),
    ]);

    const pinnedRows = (pinnedResp.data ?? []) as PinnedRow[];
    const cachedPosts = (cachedResp.data?.posts ?? []) as CachedPost[];

    // 已 pinned 的 shortcode 集合, 用來去重(避免 fallback 又拿到一樣的)
    const pinnedShortcodes = new Set(pinnedRows.map((p) => p.shortcode));
    // 過濾掉跟 pinned 重複的最新貼文
    const fallbackQueue = cachedPosts.filter(
      (c) => !pinnedShortcodes.has(c.shortcode)
    );
    let fallbackIdx = 0;

    // 6 格依序組裝
    const result: IGPost[] = [];
    for (let slot = 1; slot <= limit; slot++) {
      const manual = pinnedRows.find((p) => p.slot === slot);
      if (manual) {
        result.push(
          buildPost(manual.shortcode, manual.is_video, manual.caption ?? "", true)
        );
      } else {
        // 從 fallback queue 拿下一個沒用過的
        const next = fallbackQueue[fallbackIdx++];
        if (next) {
          result.push(buildPost(next.shortcode, next.isVideo, next.caption ?? ""));
        }
      }
    }

    if (result.length > 0) return result;
  } catch {
    // fall through
  }
  return fallbackPosts(limit);
}

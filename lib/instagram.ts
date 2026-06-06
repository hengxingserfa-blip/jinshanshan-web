// IG 整合:從公開 web profile API 抓最近貼文/Reels
// Vercel server IP 可能被 IG 擋,fetch 失敗會降回 FALLBACK_POSTS
// 換 IG 新影片直接編輯 FALLBACK_POSTS 陣列
export const INSTAGRAM_HANDLE = "shiny_gold991";
export const INSTAGRAM_PROFILE_URL = `https://www.instagram.com/${INSTAGRAM_HANDLE}`;

// 手選的精選貼文 (從 IG 抓最新後挑產品向的) —— 萬一 Vercel fetch 不到 IG 就用這份
// 最後更新:2026-06-06
// Vercel server 抓 IG API 會被 Meta 擋,所以網站永遠走這份 FALLBACK
// 要更新最新貼文 → 打 /api/refresh-ig 或叫 Claude 重寫這陣列
const FALLBACK_SHORTCODES: Array<{ code: string; isVideo: boolean }> = [
  { code: "DZPZw_WTauR", isVideo: true },  // 成交啦 小小金項鍊
  { code: "DZPSYvEz3gE", isVideo: true },  // 黃金虎爺 × 擲筊
  { code: "DZPIxTlTVmK", isVideo: true },  // 星河流轉 金光閃耀
  { code: "DZPA5sVTfX1", isVideo: true },  // 一箭穿心 愛意鎖在心
  { code: "DZOyqqATopF", isVideo: true },  // 小巧金戒 日常戴
  { code: "DZOu2avzcMc", isVideo: true },  // 金珠細語手鏈
];

export interface IGPost {
  url: string;
  embedUrl: string;
  isVideo: boolean;
  caption: string;
  shortcode: string;
}

function buildPost(shortcode: string, isVideo: boolean, caption = ""): IGPost {
  const path = isVideo ? "reel" : "p";
  return {
    url: `https://www.instagram.com/${path}/${shortcode}/`,
    embedUrl: `https://www.instagram.com/${path}/${shortcode}/embed/`,
    isVideo,
    caption,
    shortcode,
  };
}

const fallbackPosts = (limit: number): IGPost[] =>
  FALLBACK_SHORTCODES.slice(0, limit).map((p) => buildPost(p.code, p.isVideo));

// 從 Supabase ig_posts_cache 撈最近的貼文 (員工 / cron 推進來的)。
// 失敗 / 拿到空陣列就退回 FALLBACK_SHORTCODES (寫死)
export async function fetchInstagramPosts(limit = 6): Promise<IGPost[]> {
  // 從 Supabase 撈 cache
  try {
    const { getServerSupabase } = await import("@/lib/supabase/server");
    const supabase = await getServerSupabase();
    if (supabase) {
      const { data } = await supabase
        .from("ig_posts_cache")
        .select("posts")
        .eq("id", 1)
        .maybeSingle();
      const cached = (data?.posts ?? []) as Array<{
        shortcode: string;
        isVideo: boolean;
        caption?: string;
      }>;
      if (Array.isArray(cached) && cached.length > 0) {
        return cached
          .slice(0, limit)
          .map((c) => buildPost(c.shortcode, c.isVideo, c.caption ?? ""));
      }
    }
  } catch {
    // ignore — 落到 fallback
  }
  return fallbackPosts(limit);
}

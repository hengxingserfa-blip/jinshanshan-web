// 首頁要 highlight 的 IG 貼文 / Reels 連結
// 取得方式:打開 IG 貼文 → 右上角分享 → 複製連結
// 範例: "https://www.instagram.com/reel/Cxxxxxxxxxx/"
// 留空陣列就只顯示「追蹤 IG」CTA 不顯示影片格
export const INSTAGRAM_HANDLE = "shiny_gold991";
export const INSTAGRAM_PROFILE_URL = `https://www.instagram.com/${INSTAGRAM_HANDLE}`;

export const INSTAGRAM_POSTS: string[] = [
  // 等 Gino 提供 3-4 個影片連結後填入,例如:
  // "https://www.instagram.com/reel/DABCxxx/",
  // "https://www.instagram.com/p/DDEFxxx/",
];

// 把 IG 貼文連結轉成 embed iframe URL
export function toEmbedUrl(postUrl: string): string {
  const clean = postUrl.split("?")[0].replace(/\/$/, "");
  return `${clean}/embed/`;
}

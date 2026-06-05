// IG 整合:從公開 web profile API 抓最近貼文/Reels
// Vercel server IP 可能被 IG 擋,fetch 失敗會降回 FALLBACK_POSTS
// 換 IG 新影片直接編輯 FALLBACK_POSTS 陣列
export const INSTAGRAM_HANDLE = "shiny_gold991";
export const INSTAGRAM_PROFILE_URL = `https://www.instagram.com/${INSTAGRAM_HANDLE}`;

// 手選的精選貼文 (從 IG 抓最新後挑產品向的) —— 萬一 Vercel fetch 不到 IG 就用這份
const FALLBACK_SHORTCODES: Array<{ code: string; isVideo: boolean }> = [
  { code: "DZMKL_6zc3r", isVideo: true },  // 愛心金鍊
  { code: "DZKYZ4UTsbT", isVideo: true },  // 高級感細節款
  { code: "DZKOIyGTdx4", isVideo: true },  // 黃金蛇鍊手鍊 1.8 錢
  { code: "DZKCt06TTNL", isVideo: true },  // 黃寶石戒指
  { code: "DZJ74KBTypL", isVideo: true },  // 燦爛心語 1.24 錢
  { code: "DZJ22m7zgp3", isVideo: true },  // 破繭新生 3.22 錢
];

export interface IGPost {
  url: string;
  embedUrl: string;
  isVideo: boolean;
  caption: string;
  shortcode: string;
}

interface IGEdge {
  node: {
    shortcode: string;
    is_video: boolean;
    __typename?: string;
    edge_media_to_caption?: {
      edges: Array<{ node: { text: string } }>;
    };
  };
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

// 從 IG 公開端點抓取最近的貼文。失敗 / 拿到空陣列就退回 FALLBACK_SHORTCODES
export async function fetchInstagramPosts(limit = 6): Promise<IGPost[]> {
  try {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 4000);
    const res = await fetch(
      `https://www.instagram.com/api/v1/users/web_profile_info/?username=${INSTAGRAM_HANDLE}`,
      {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
          "X-IG-App-ID": "936619743392459",
        },
        next: { revalidate: 3600 }, // 1 小時快取
        signal: ctrl.signal,
      }
    );
    clearTimeout(timer);
    if (!res.ok) return fallbackPosts(limit);
    const data = await res.json();
    const edges: IGEdge[] = data?.data?.user?.edge_owner_to_timeline_media?.edges ?? [];
    if (edges.length === 0) return fallbackPosts(limit);
    return edges.slice(0, limit).map((e) => {
      const n = e.node;
      const caption =
        n.edge_media_to_caption?.edges?.[0]?.node?.text?.slice(0, 80) ?? "";
      return buildPost(n.shortcode, n.is_video, caption);
    });
  } catch {
    return fallbackPosts(limit);
  }
}

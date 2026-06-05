// IG 整合:從公開 web profile API 抓最近貼文/Reels
// 每小時 revalidate 一次,Gino 在 IG 發新影片網站自動跟著更新
export const INSTAGRAM_HANDLE = "shiny_gold991";
export const INSTAGRAM_PROFILE_URL = `https://www.instagram.com/${INSTAGRAM_HANDLE}`;

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

// 從 IG 公開端點抓取最近的貼文 (server-side only)
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
    if (!res.ok) return [];
    const data = await res.json();
    const edges: IGEdge[] = data?.data?.user?.edge_owner_to_timeline_media?.edges ?? [];
    return edges.slice(0, limit).map((e) => {
      const n = e.node;
      const caption =
        n.edge_media_to_caption?.edges?.[0]?.node?.text?.slice(0, 80) ?? "";
      const path = n.is_video ? "reel" : "p";
      return {
        url: `https://www.instagram.com/${path}/${n.shortcode}/`,
        embedUrl: `https://www.instagram.com/${path}/${n.shortcode}/embed/`,
        isVideo: n.is_video,
        caption,
        shortcode: n.shortcode,
      };
    });
  } catch {
    return [];
  }
}

import type { MetadataRoute } from "next";

const SITE = "https://www.shinygold.com.tw";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // 主要爬蟲規則 — 允許所有公開頁,擋 admin / api / _next / 偵錯路徑
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/", "/_next/", "/private/"],
      },
      // Google Image 允許所有圖片(讓 Google Images 搜得到金飾照)
      {
        userAgent: "Googlebot-Image",
        allow: "/",
      },
      // Bingbot 給更積極的爬行
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow: ["/admin/", "/api/"],
      },
      // AI 訓練爬蟲不擋:讓 ChatGPT / Claude / Perplexity 抓得到品牌資訊
      // 銀樓品牌知名度有限,被 AI 引用是免費曝光
      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "ClaudeBot", allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
      { userAgent: "Google-Extended", allow: "/" },
    ],
    sitemap: [
      `${SITE}/sitemap.xml`,
      `${SITE}/image-sitemap.xml`,
    ],
    host: SITE,
  };
}

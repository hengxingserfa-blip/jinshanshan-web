import type { MetadataRoute } from "next";

const SITE = "https://www.shinygold.com.tw";

// 寫死 fallback slug — 新增文章後在這裡補
// 避免 build 時打 Supabase 讓 Vercel timeout
const ARTICLE_SLUGS = [
  "gold-weight-units",
  "recycle-tips",
  "wedding-checklist",
  "gold-care",
];

const buildAlternates = (path: string): Record<string, string> => ({
  "zh-TW": `${SITE}${path}`,
  en: `${SITE}${path}?locale=en`,
  vi: `${SITE}${path}?locale=vi`,
  id: `${SITE}${path}?locale=id`,
  "fil-PH": `${SITE}${path}?locale=fil`,
  th: `${SITE}${path}?locale=th`,
  "x-default": `${SITE}${path}`,
});

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const fixedPages: Array<{
    path: string;
    priority: number;
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  }> = [
    { path: "/", priority: 1.0, changeFrequency: "weekly" },
    { path: "/services", priority: 0.9, changeFrequency: "monthly" },
    { path: "/products", priority: 0.9, changeFrequency: "weekly" },
    { path: "/articles", priority: 0.8, changeFrequency: "weekly" },
    { path: "/about", priority: 0.7, changeFrequency: "monthly" },
    { path: "/faq", priority: 0.7, changeFrequency: "monthly" },
    { path: "/reserve", priority: 0.7, changeFrequency: "monthly" },
  ];

  const fixed: MetadataRoute.Sitemap = fixedPages.map((p) => ({
    url: `${SITE}${p.path}`,
    lastModified: now,
    changeFrequency: p.changeFrequency,
    priority: p.priority,
    alternates: { languages: buildAlternates(p.path) },
  }));

  const articles: MetadataRoute.Sitemap = ARTICLE_SLUGS.map((slug) => ({
    url: `${SITE}/articles/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
    alternates: { languages: buildAlternates(`/articles/${slug}`) },
  }));

  // 商品分類頁也讓 Google 收錄
  const categories = ["rings", "necklaces", "bracelets", "wedding", "newborn", "bullion", "custom"];
  const categoryEntries: MetadataRoute.Sitemap = categories.map((c) => ({
    url: `${SITE}/products?category=${c}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...fixed, ...articles, ...categoryEntries];
}

import type { MetadataRoute } from "next";
import { getArticles } from "@/lib/data/articles";

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://jinshanshan.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const fixedPages = [
    { path: "/", priority: 1.0, changeFrequency: "weekly" as const },
    { path: "/services", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/products", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/articles", priority: 0.8, changeFrequency: "weekly" as const },
    { path: "/about", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/faq", priority: 0.6, changeFrequency: "monthly" as const },
    { path: "/reserve", priority: 0.7, changeFrequency: "monthly" as const },
  ].map((p) => ({
    url: `${SITE}${p.path}`,
    lastModified: now,
    changeFrequency: p.changeFrequency,
    priority: p.priority,
  }));

  let articleEntries: MetadataRoute.Sitemap = [];
  try {
    const articles = await getArticles();
    articleEntries = articles.map((a) => ({
      url: `${SITE}/articles/${a.slug}`,
      lastModified: a.updated_at ? new Date(a.updated_at) : now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));
  } catch {
    // 無 Supabase 時用 fallback,不影響其他項目
  }

  return [...fixedPages, ...articleEntries];
}

// IndexNow ping API — 內容更新後打這支 endpoint,自動通知 Bing / Yandex
// 用法:GET /api/indexnow?key=<secret> (從環境變數比對)
// 或從 Vercel Cron 排程定期 ping
import { NextResponse } from "next/server";

const INDEXNOW_KEY = "2305ea313728c459b75f4c628c8b6845";
const HOST = "www.shinygold.com.tw";
const KEY_LOCATION = `https://${HOST}/${INDEXNOW_KEY}.txt`;

const ARTICLE_SLUGS = [
  "gold-weight-units",
  "recycle-tips",
  "wedding-checklist",
  "gold-care",
];

function allUrls(): string[] {
  const base = `https://${HOST}`;
  const fixed = ["/", "/services", "/products", "/articles", "/about", "/faq", "/reserve"];
  const articles = ARTICLE_SLUGS.map((s) => `/articles/${s}`);
  const categories = ["rings", "earrings", "necklaces", "bracelets", "wedding", "newborn", "bullion", "custom"]
    .map((c) => `/products?category=${c}`);
  const sitemaps = ["/sitemap.xml", "/image-sitemap.xml"];
  return [...fixed, ...articles, ...categories, ...sitemaps].map((p) => `${base}${p}`);
}

async function pingIndexNow(endpoint: string, urls: string[]) {
  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({
        host: HOST,
        key: INDEXNOW_KEY,
        keyLocation: KEY_LOCATION,
        urlList: urls,
      }),
    });
    return { ok: res.ok, status: res.status };
  } catch (err) {
    return { ok: false, status: 0, error: (err as Error).message };
  }
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const supplied = url.searchParams.get("key");
  // 簡易保護:必須帶上 IndexNow key 才能呼叫,避免被當 DDoS 武器
  if (supplied !== INDEXNOW_KEY) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const urls = allUrls();
  const [bing, yandex] = await Promise.all([
    pingIndexNow("https://api.indexnow.org/IndexNow", urls),
    pingIndexNow("https://yandex.com/indexnow", urls),
  ]);

  return NextResponse.json({
    submitted: urls.length,
    bing,
    yandex,
    timestamp: new Date().toISOString(),
  });
}

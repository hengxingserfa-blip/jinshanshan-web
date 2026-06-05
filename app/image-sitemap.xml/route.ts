// Image sitemap — 讓 Google Images 索引所有 3000+ 件 9999 純金商品照
// Google 對珠寶類圖片搜尋流量很大, 圖片 sitemap 是必備
import { getProducts } from "@/lib/data/products";

const SITE = "https://www.shinygold.com.tw";

const CATEGORY_LABELS: Record<string, string> = {
  rings: "戒指",
  earrings: "耳環",
  necklaces: "項鍊",
  bracelets: "手鐲",
  wedding: "對戒",
  newborn: "彌月金牌",
  bullion: "金條",
  custom: "訂製金飾",
};

function escapeXml(s: string): string {
  return s.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case "<": return "&lt;";
      case ">": return "&gt;";
      case "&": return "&amp;";
      case "'": return "&apos;";
      case '"': return "&quot;";
      default: return c;
    }
  });
}

export async function GET() {
  const products = await getProducts();
  const items = products.filter((p) => p.image_url && p.available);

  const productsUrl = `${SITE}/products`;

  const imageEntries = items
    .map((p) => {
      const cat = CATEGORY_LABELS[p.category] ?? "金飾";
      const weight = p.weight_qian ? ` · ${p.weight_qian} 錢` : "";
      const title = `${p.name_zh}${weight} | 金閃閃銀樓`;
      const caption = `中壢金閃閃銀樓 9999 純金${cat} · ${p.name_zh}${weight} · SKU ${p.slug}`;
      return `    <image:image>
      <image:loc>${escapeXml(p.image_url!)}</image:loc>
      <image:title>${escapeXml(title)}</image:title>
      <image:caption>${escapeXml(caption)}</image:caption>
    </image:image>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <url>
    <loc>${productsUrl}</loc>
${imageEntries}
  </url>
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}

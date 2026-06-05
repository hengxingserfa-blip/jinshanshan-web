import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import CtaBlock from "@/components/CtaBlock";
import ProductsGrid from "@/components/ProductsGrid";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import { getProducts } from "@/lib/data/products";

const SITE = "https://www.shinygold.com.tw";

export const metadata: Metadata = {
  title: "金飾選品 · 9999 純金戒指 / 項鍊 / 手鐲 / 對戒",
  description:
    "金閃閃銀樓 9999 純金飾品選品總覽。戒指、項鍊、手鐲、對戒、彌月禮、投資金條,3000+ 件實際庫存,每件附金重證明。中壢中和路 108 號實體店面可看可試戴。",
  keywords: [
    "9999 純金", "純金戒指", "純金項鍊", "純金手鐲", "純金對戒",
    "彌月金牌", "金條買賣", "結婚對戒", "傳家金飾",
    "中壢金飾", "桃園金飾", "中壢純金店",
  ],
  alternates: { canonical: `${SITE}/products` },
  openGraph: {
    title: "9999 純金 · 戒指 / 項鍊 / 手鐲 / 對戒 — 金閃閃銀樓",
    description: "3000+ 件 9999 純金庫存,每件附金重證明。中壢中和路 108 號可看可試戴。",
    url: `${SITE}/products`,
    type: "website",
    images: [{ url: SITE + "/logo.png", width: 1200, height: 630, alt: "金閃閃銀樓" }],
  },
};

const CATEGORY_NAMES: Record<string, string> = {
  rings: "戒指",
  earrings: "耳環",
  necklaces: "項鍊",
  bracelets: "手鐲",
  wedding: "對戒",
  newborn: "彌月禮品",
  bullion: "金條",
  custom: "訂製",
};

export default async function ProductsPage() {
  const products = await getProducts();

  // 給 Google 抓的商品清單 schema — 取前 20 件展示(避免 JSON 過大)
  const showcase = products.slice(0, 20);
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "金閃閃銀樓 9999 純金飾品選品",
    description: "中壢金閃閃銀樓 9999 純金戒指 / 項鍊 / 手鐲 / 對戒 / 彌月禮 / 金條實體庫存",
    numberOfItems: products.length,
    itemListElement: showcase.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Product",
        name: p.name_zh,
        image: p.image_url ?? undefined,
        sku: p.slug,
        category: CATEGORY_NAMES[p.category] ?? p.category,
        brand: { "@type": "Brand", name: "金閃閃銀樓 SHINY GOLD Jeweller's" },
        ...(p.weight_qian
          ? {
              weight: {
                "@type": "QuantitativeValue",
                value: p.weight_qian,
                unitText: "錢",
              },
            }
          : {}),
        material: p.purity || "9999 純金",
        offers: {
          "@type": "Offer",
          priceCurrency: "TWD",
          availability: p.available
            ? "https://schema.org/InStock"
            : "https://schema.org/OutOfStock",
          businessFunction: "https://schema.org/Sell",
          itemCondition: "https://schema.org/NewCondition",
          seller: { "@id": `${SITE}#business` },
          url: `${SITE}/products`,
        },
      },
    })),
  };

  return (
    <>
      <BreadcrumbJsonLd trail={[{ name: "金飾選品", path: "/products" }]} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <PageHero page="products" />

      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 sm:px-10">
          <ProductsGrid products={products} />

          <p className="mt-24 text-center text-[10px] tracking-[0.3em] uppercase text-ink-400 font-display max-w-md mx-auto leading-loose">
            商品照為實際庫存 · 來店現場可挑選試戴
            <br />
            指定款式或重量,LINE / 電話直接詢問
          </p>
        </div>
      </section>

      <CtaBlock />
    </>
  );
}

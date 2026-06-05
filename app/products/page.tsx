import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import CtaBlock from "@/components/CtaBlock";
import ProductsGrid from "@/components/ProductsGrid";
import { getProducts } from "@/lib/data/products";

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://www.shinygold.com.tw";

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
  },
};

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <>
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

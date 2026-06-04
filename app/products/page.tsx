import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import CtaBlock from "@/components/CtaBlock";
import ProductsGrid from "@/components/ProductsGrid";
import { getProducts } from "@/lib/data/products";

export const metadata: Metadata = {
  title: "金飾選品 | 金閃閃銀樓",
  description:
    "金閃閃銀樓金飾選品總覽。戒指、項鍊、手鐲、對戒、彌月禮、投資金條,每件附金重證明。",
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

import Image from "next/image";
import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import CtaBlock from "@/components/CtaBlock";
import { getProducts } from "@/lib/data/products";

export const metadata: Metadata = {
  title: "金飾選品 | 金閃閃銀樓",
  description:
    "金閃閃銀樓金飾選品總覽。戒指、項鍊、手鐲、對戒、彌月禮、投資金條,每件附金重證明。",
};

const CATEGORY_LABELS: Record<string, { en: string; zh: string }> = {
  rings:     { en: "Rings",     zh: "戒指" },
  necklaces: { en: "Necklaces", zh: "項鍊" },
  bracelets: { en: "Bracelets", zh: "手鏈" },
  wedding:   { en: "Wedding",   zh: "對戒" },
  newborn:   { en: "Newborn",   zh: "彌月禮" },
  bullion:   { en: "Bullion",   zh: "金條" },
  custom:    { en: "Custom",    zh: "訂製" },
};

const TABS = [
  { en: "All", zh: "全部" },
  { en: "Rings", zh: "戒指" },
  { en: "Necklaces", zh: "項鍊" },
  { en: "Bracelets", zh: "手鏈" },
  { en: "Wedding", zh: "對戒" },
  { en: "Newborn", zh: "彌月禮" },
  { en: "Bullion", zh: "金條" },
];

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <>
      <PageHero
        eyebrow="The Collection"
        title="金飾選品"
        subtitle="每一件作品,經過我們親手挑選。實體店面陳列更完整,歡迎來店試戴。"
      />

      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 sm:px-10">
          <div className="flex flex-wrap gap-10 mb-20 justify-center border-b border-ink-950/8 pb-8">
            {TABS.map((c, i) => (
              <span
                key={c.en}
                className="flex flex-col items-center cursor-default group"
              >
                <span
                  className={`font-display tracking-[0.35em] text-[10px] uppercase ${
                    i === 0 ? "text-gold-600" : "text-ink-700 group-hover:text-gold-600"
                  } transition-colors`}
                >
                  {c.en}
                </span>
                <span className="text-[10px] tracking-[0.25em] text-ink-400 mt-1">
                  {c.zh}
                </span>
              </span>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {products.map((p) => {
              const label = CATEGORY_LABELS[p.category] ?? { en: "Item", zh: "" };
              return (
                <article key={p.id} className="group">
                  <div className="aspect-[3/4] relative overflow-hidden bg-ivory-100">
                    {p.image_url && (
                      <Image
                        src={p.image_url}
                        alt={p.name_en ?? p.name_zh}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover group-hover:scale-[1.04] transition-transform duration-[1200ms] ease-out"
                      />
                    )}
                  </div>
                  <div className="pt-6">
                    <p className="font-display tracking-[0.35em] text-[10px] text-gold-600 uppercase mb-2">
                      {label.en} · {label.zh}
                    </p>
                    <h3 className="font-display text-xl text-ink-950 mb-1">
                      {p.name_zh}
                    </h3>
                    {p.name_en && (
                      <p className="text-[11px] tracking-wider text-ink-400 mb-1 font-serif italic">
                        {p.name_en}
                      </p>
                    )}
                    <p className="text-xs text-ink-400 font-light">
                      {p.weight_qian ? `約 ${p.weight_qian} 錢 · ` : ""}
                      實際金重與價格請洽門市
                    </p>
                  </div>
                </article>
              );
            })}
          </div>

          <p className="mt-24 text-center text-[10px] tracking-[0.3em] uppercase text-ink-400 font-display max-w-md mx-auto">
            目前商品照為示意.正式商品照與分類篩選功能將於後台上線後啟用
          </p>
        </div>
      </section>

      <CtaBlock />
    </>
  );
}

import Image from "next/image";
import Link from "next/link";
import Ornament from "@/components/Ornament";
import { getFeaturedProducts } from "@/lib/data/products";

const CATEGORY_LABELS: Record<string, { en: string; zh: string }> = {
  rings:      { en: "Rings",      zh: "戒指" },
  necklaces:  { en: "Necklaces",  zh: "項鍊" },
  bracelets:  { en: "Bracelets",  zh: "手鏈" },
  wedding:    { en: "Wedding",    zh: "對戒" },
  newborn:    { en: "Newborn",    zh: "彌月禮" },
  bullion:    { en: "Bullion",    zh: "金條" },
  custom:     { en: "Custom",     zh: "訂製" },
};

export default async function ProductsPreview() {
  const featured = await getFeaturedProducts(3);
  if (featured.length === 0) return null;
  const [hero, ...rest] = featured;
  const heroLabel = CATEGORY_LABELS[hero.category] ?? { en: "Featured", zh: "精選" };

  return (
    <section id="products" className="bg-white py-32 md:py-44">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <div className="text-center mb-20 md:mb-28">
          <p className="font-display tracking-[0.5em] text-gold-600 text-[10px] mb-8 uppercase">
            The Collection
          </p>
          <h2 className="font-display text-5xl md:text-7xl text-ink-950">
            精選<span className="italic font-serif text-gold-500"> 金飾 </span>選品
          </h2>
          <Ornament className="mt-10" />
        </div>

        <div className="grid lg:grid-cols-12 gap-8 md:gap-12">
          <article className="lg:col-span-7 group">
            <div className="aspect-[4/5] relative overflow-hidden bg-ivory-100">
              {hero.image_url && (
                <Image
                  src={hero.image_url}
                  alt={hero.name_en ?? hero.name_zh}
                  fill
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  className="object-cover group-hover:scale-[1.04] transition-transform duration-[1400ms] ease-out"
                />
              )}
              <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-ink-950/35 to-transparent" />
              <div className="absolute top-6 left-6">
                <span className="inline-block px-3 py-1 bg-ivory-50/95 backdrop-blur text-[10px] tracking-[0.35em] uppercase font-display text-gold-600">
                  Featured
                </span>
              </div>
            </div>
            <div className="pt-7">
              <p className="font-display tracking-[0.4em] text-[10px] text-gold-600 uppercase mb-3">
                {heroLabel.en} · {heroLabel.zh}
              </p>
              <h3 className="font-display text-3xl md:text-4xl text-ink-950 mb-2">
                {hero.name_zh}
              </h3>
              {hero.name_en && (
                <p className="font-serif italic text-ink-400 text-base mb-4">
                  {hero.name_en}
                </p>
              )}
              {hero.description_zh && (
                <p className="text-sm text-ink-700 leading-loose font-light max-w-md">
                  {hero.description_zh}
                </p>
              )}
            </div>
          </article>

          <div className="lg:col-span-5 flex flex-col gap-8 md:gap-12">
            {rest.map((p) => {
              const label = CATEGORY_LABELS[p.category] ?? { en: "Item", zh: "" };
              return (
                <article key={p.id} className="group">
                  <div className="aspect-[4/5] relative overflow-hidden bg-ivory-100">
                    {p.image_url && (
                      <Image
                        src={p.image_url}
                        alt={p.name_en ?? p.name_zh}
                        fill
                        sizes="(max-width: 1024px) 50vw, 42vw"
                        className="object-cover group-hover:scale-[1.04] transition-transform duration-[1400ms] ease-out"
                      />
                    )}
                  </div>
                  <div className="pt-6">
                    <p className="font-display tracking-[0.4em] text-[10px] text-gold-600 uppercase mb-2">
                      {label.en} · {label.zh}
                    </p>
                    <h3 className="font-display text-xl md:text-2xl text-ink-950">
                      {p.name_zh}
                    </h3>
                    {p.name_en && (
                      <p className="font-serif italic text-ink-400 text-sm">
                        {p.name_en}
                      </p>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        <div className="text-center mt-24">
          <Link
            href="/products"
            className="group inline-flex items-center gap-3 text-[10px] tracking-[0.4em] uppercase font-display text-ink-950 pb-2 border-b border-ink-950 hover:border-gold-500 hover:text-gold-600 transition-colors"
          >
            <span>View The Full Collection</span>
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import Ornament from "@/components/Ornament";
import { useT, useI18n } from "@/lib/i18n/provider";
import { localize } from "@/lib/i18n/localize";
import type { Product } from "@/lib/supabase/types";

const CATEGORY_LABELS_EN: Record<string, string> = {
  rings:     "Rings",
  necklaces: "Necklaces",
  bracelets: "Bracelets",
  wedding:   "Wedding",
  newborn:   "Newborn",
  bullion:   "Bullion",
  custom:    "Custom",
};

interface Props {
  products: Product[];
}

export default function ProductsPreview({ products }: Props) {
  const t = useT();
  const { locale } = useI18n();
  if (products.length === 0) return null;
  const [hero, ...rest] = products;
  const heroEn = CATEGORY_LABELS_EN[hero.category] ?? "Featured";
  const heroZh = t.category_bar[hero.category as keyof typeof t.category_bar] ?? "";
  const cleanWeight = (n: string) => n.replace(/\s*·\s*[\d.]+\s*錢\s*$/, "");
  const heroName = cleanWeight(localize(hero.translations, locale, "name", hero.name_zh));
  const heroDesc = localize(hero.translations, locale, "description", hero.description_zh);

  return (
    <section id="products" className="bg-white py-32 md:py-44">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <div className="text-center mb-20 md:mb-28">
          <p className="font-display tracking-[0.5em] text-gold-600 text-[10px] mb-8 uppercase">
            {t.products_preview.eyebrow}
          </p>
          <h2 className="font-display text-5xl md:text-7xl text-ink-950">
            {t.products_preview.title_a}
            <span className="italic font-serif text-gold-500"> {t.products_preview.title_b} </span>
            {t.products_preview.title_c}
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
                  {t.products_preview.featured}
                </span>
              </div>
              {hero.weight_qian != null && hero.weight_qian > 0 && (
                <span className="absolute bottom-5 right-5 bg-ink-950/85 text-ivory-50 text-sm font-medium px-3 py-1.5 backdrop-blur-sm">
                  {hero.weight_qian} 錢
                </span>
              )}
            </div>
            <div className="pt-7">
              <p className="font-display tracking-[0.4em] text-[10px] text-gold-600 uppercase mb-3">
                {heroEn} · {heroZh}
              </p>
              <h3 className="font-display text-3xl md:text-4xl text-ink-950 mb-2">
                {heroName}
              </h3>
              {hero.name_en && locale !== "en" && (
                <p className="font-serif italic text-ink-400 text-base mb-4">
                  {hero.name_en}
                </p>
              )}
              {heroDesc && (
                <p className="text-sm text-ink-700 leading-loose font-light max-w-md">
                  {heroDesc}
                </p>
              )}
            </div>
          </article>

          <div className="lg:col-span-5 flex flex-col gap-8 md:gap-12">
            {rest.map((p) => {
              const en = CATEGORY_LABELS_EN[p.category] ?? "Item";
              const zh = t.category_bar[p.category as keyof typeof t.category_bar] ?? "";
              const pName = cleanWeight(localize(p.translations, locale, "name", p.name_zh));
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
                    {p.weight_qian != null && p.weight_qian > 0 && (
                      <span className="absolute bottom-3 right-3 bg-ink-950/85 text-ivory-50 text-xs font-medium px-2.5 py-1 backdrop-blur-sm">
                        {p.weight_qian} 錢
                      </span>
                    )}
                  </div>
                  <div className="pt-6">
                    <p className="font-display tracking-[0.4em] text-[10px] text-gold-600 uppercase mb-2">
                      {en} · {zh}
                    </p>
                    <h3 className="font-display text-xl md:text-2xl text-ink-950">
                      {pName}
                    </h3>
                    {p.name_en && locale !== "en" && (
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
            <span>{t.products_preview.view_full}</span>
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

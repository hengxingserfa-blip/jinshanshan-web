"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useI18n, useT } from "@/lib/i18n/provider";
import { localize } from "@/lib/i18n/localize";
import type { Product } from "@/lib/supabase/types";

const CATEGORY_LABELS_EN: Record<string, string> = {
  rings: "Rings",
  earrings: "Earrings",
  necklaces: "Necklaces",
  bracelets: "Bracelets",
  wedding: "Wedding",
  newborn: "Newborn",
  bullion: "Bullion",
  custom: "Custom",
};

const TABS = ["all", "rings", "earrings", "necklaces", "bracelets", "wedding", "newborn", "bullion", "custom"] as const;
type TabKey = typeof TABS[number];

interface Props {
  products: Product[];
}

export default function ProductsGrid({ products }: Props) {
  const t = useT();
  const { locale } = useI18n();
  const sp = useSearchParams();
  const rawCat = sp.get("category");
  const active: TabKey = (TABS as readonly string[]).includes(rawCat ?? "")
    ? (rawCat as TabKey)
    : "all";

  const filtered = active === "all"
    ? products
    : products.filter((p) => p.category === active);

  return (
    <>
      <div className="flex flex-wrap gap-x-10 gap-y-6 mb-20 justify-center border-b border-ink-950/8 pb-8">
        {TABS.map((key) => {
          const isActive = key === active;
          const href = key === "all" ? "/products" : `/products?category=${key}`;
          return (
            <Link
              key={key}
              href={href}
              scroll={false}
              className="flex flex-col items-center group"
            >
              <span
                className={`font-display tracking-[0.35em] text-[10px] uppercase ${
                  isActive ? "text-gold-600 border-b border-gold-500" : "text-ink-700 group-hover:text-gold-600"
                } transition-colors pb-1`}
              >
                {key === "all" ? "All" : key.charAt(0).toUpperCase() + key.slice(1)}
              </span>
              <span className="text-[10px] tracking-[0.25em] text-ink-400 mt-1">
                {t.category_bar[key]}
              </span>
            </Link>
          );
        })}
      </div>

      {filtered.length === 0 ? (
        <p className="text-center text-ink-500 py-20">這個分類目前沒有商品</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {filtered.map((p) => {
            const en = CATEGORY_LABELS_EN[p.category] ?? "Item";
            const zh = t.category_bar[p.category as keyof typeof t.category_bar] ?? "";
            const name = localize(p.translations, locale, "name", p.name_zh);
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
                    {en} · {zh}
                  </p>
                  <h3 className="font-display text-xl text-ink-950 mb-1">
                    {name}
                  </h3>
                  {p.name_en && locale !== "en" && (
                    <p className="text-[11px] tracking-wider text-ink-400 mb-1 font-serif italic">
                      {p.name_en}
                    </p>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      )}
    </>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState, useMemo, useEffect } from "react";
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

const PAGE_SIZE = 30;

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

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  // Reset page when category or search changes
  useEffect(() => {
    setPage(1);
  }, [active, search]);

  const filtered = useMemo(() => {
    let result = active === "all" ? products : products.filter((p) => p.category === active);
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      result = result.filter((p) => {
        const name = (p.name_zh ?? "").toLowerCase();
        const nameEn = (p.name_en ?? "").toLowerCase();
        const slug = (p.slug ?? "").toLowerCase();
        return name.includes(q) || nameEn.includes(q) || slug.includes(q);
      });
    }
    return result;
  }, [products, active, search]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const visible = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <>
      <div className="flex flex-wrap gap-x-10 gap-y-6 mb-10 justify-center border-b border-ink-950/8 pb-8">
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

      {/* 搜尋列 + 結果統計 */}
      <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between mb-10">
        <div className="relative w-full sm:max-w-md">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="搜尋商品名稱 / SKU"
            className="w-full bg-ivory-50 border border-ink-950/15 px-4 py-2.5 pr-10 text-sm focus:outline-none focus:border-gold-500 transition-colors"
          />
          <svg
            className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-400"
            width="18" height="18" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
        </div>
        <p className="text-[11px] tracking-[0.2em] text-ink-500 uppercase font-display">
          {filtered.length} 件商品
          {totalPages > 1 && ` · 第 ${page} / ${totalPages} 頁`}
        </p>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-24">
          <p className="text-ink-500 font-display tracking-wider mb-2">
            {search ? "找不到符合條件的商品" : "這個分類目前沒有商品"}
          </p>
          {search && (
            <button
              onClick={() => setSearch("")}
              className="text-[11px] tracking-[0.3em] uppercase text-gold-600 hover:text-gold-700 mt-3"
            >
              清除搜尋 →
            </button>
          )}
        </div>
      ) : (
        <>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {visible.map((p) => {
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

          {/* 分頁器 */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-20">
              <button
                onClick={() => { setPage(p => Math.max(1, p - 1)); window.scrollTo({ top: 200, behavior: "smooth" }); }}
                disabled={page === 1}
                className="px-4 py-2 text-[11px] tracking-[0.3em] uppercase font-display border border-ink-950/15 hover:border-gold-500 hover:text-gold-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                ← 上一頁
              </button>
              {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
                let n;
                if (totalPages <= 7) n = i + 1;
                else if (page <= 4) n = i + 1;
                else if (page >= totalPages - 3) n = totalPages - 6 + i;
                else n = page - 3 + i;
                return (
                  <button
                    key={n}
                    onClick={() => { setPage(n); window.scrollTo({ top: 200, behavior: "smooth" }); }}
                    className={`w-10 h-10 text-sm font-display transition-colors ${
                      n === page
                        ? "bg-ink-950 text-ivory-50"
                        : "text-ink-700 hover:text-gold-600 hover:bg-ivory-100"
                    }`}
                  >
                    {n}
                  </button>
                );
              })}
              <button
                onClick={() => { setPage(p => Math.min(totalPages, p + 1)); window.scrollTo({ top: 200, behavior: "smooth" }); }}
                disabled={page === totalPages}
                className="px-4 py-2 text-[11px] tracking-[0.3em] uppercase font-display border border-ink-950/15 hover:border-gold-500 hover:text-gold-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                下一頁 →
              </button>
            </div>
          )}
        </>
      )}
    </>
  );
}

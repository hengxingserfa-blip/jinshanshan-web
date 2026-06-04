"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState, useMemo, useEffect } from "react";
import { useI18n, useT } from "@/lib/i18n/provider";
import { localize } from "@/lib/i18n/localize";
import type { Product } from "@/lib/supabase/types";
import ProductDialog from "./ProductDialog";

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
  const [weightRange, setWeightRange] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("featured");
  const [page, setPage] = useState(1);
  const [openProduct, setOpenProduct] = useState<Product | null>(null);

  // Reset page when filter changes
  useEffect(() => {
    setPage(1);
  }, [active, search, weightRange, sortBy]);

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
    if (weightRange !== "all") {
      result = result.filter((p) => {
        const w = p.weight_qian ?? 0;
        if (weightRange === "u1") return w > 0 && w < 1;
        if (weightRange === "1-3") return w >= 1 && w < 3;
        if (weightRange === "3-10") return w >= 3 && w < 10;
        if (weightRange === "o10") return w >= 10;
        return true;
      });
    }
    const sorted = [...result];
    if (sortBy === "weight-asc") sorted.sort((a, b) => (a.weight_qian ?? 0) - (b.weight_qian ?? 0));
    else if (sortBy === "weight-desc") sorted.sort((a, b) => (b.weight_qian ?? 0) - (a.weight_qian ?? 0));
    else if (sortBy === "featured") sorted.sort((a, b) => Number(!!b.featured) - Number(!!a.featured));
    return sorted;
  }, [products, active, search, weightRange, sortBy]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const visible = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  // 各分類數量(讓 tab 顯示「戒指 (164)」)
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: products.length };
    for (const p of products) {
      counts[p.category] = (counts[p.category] ?? 0) + 1;
    }
    return counts;
  }, [products]);

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
              {categoryCounts[key] > 0 && (
                <span className="text-[9px] text-ink-400 mt-0.5">
                  ({categoryCounts[key]})
                </span>
              )}
            </Link>
          );
        })}
      </div>

      {/* 搜尋 + 篩選 + 排序 */}
      <div className="flex flex-col gap-4 mb-10">
        <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
          <div className="relative flex-1 sm:max-w-md">
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

          <select
            value={weightRange}
            onChange={(e) => setWeightRange(e.target.value)}
            className="bg-ivory-50 border border-ink-950/15 px-4 py-2.5 text-sm font-sans focus:outline-none focus:border-gold-500 transition-colors"
            aria-label="重量篩選"
          >
            <option value="all">所有重量</option>
            <option value="u1">小於 1 錢(輕巧)</option>
            <option value="1-3">1 ~ 3 錢(中等)</option>
            <option value="3-10">3 ~ 10 錢(較重)</option>
            <option value="o10">10 錢以上(粗款)</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-ivory-50 border border-ink-950/15 px-4 py-2.5 text-sm font-sans focus:outline-none focus:border-gold-500 transition-colors"
            aria-label="排序"
          >
            <option value="featured">推薦排序</option>
            <option value="weight-asc">重量 由輕到重</option>
            <option value="weight-desc">重量 由重到輕</option>
          </select>
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
              // 從 name 移除 "· X 錢" 把重量單獨顯示
              const cleanName = name.replace(/\s*·\s*[\d.]+\s*錢\s*$/, "");
              return (
                <button
                  type="button"
                  key={p.id}
                  onClick={() => setOpenProduct(p)}
                  className="group text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
                >
                  <div className="aspect-[3/4] relative overflow-hidden bg-ivory-100">
                    {p.image_url && (
                      <Image
                        src={p.image_url}
                        alt={p.name_en ?? p.name_zh}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover group-hover:scale-[1.04] transition-transform duration-[1200ms] ease-out"
                        unoptimized
                      />
                    )}
                    {p.featured && (
                      <span className="absolute top-3 left-3 bg-gold-500 text-ink-950 text-[10px] tracking-[0.25em] uppercase font-display px-2.5 py-1">
                        精選
                      </span>
                    )}
                    {p.weight_qian != null && p.weight_qian > 0 && (
                      <span className="absolute bottom-3 right-3 bg-ink-950/85 text-ivory-50 text-xs font-medium px-2.5 py-1 backdrop-blur-sm">
                        {p.weight_qian} 錢
                      </span>
                    )}
                    <span className="absolute inset-0 bg-ink-950/0 group-hover:bg-ink-950/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <span className="bg-ivory-50 text-ink-950 px-5 py-2 text-[10px] tracking-[0.35em] uppercase font-display">
                        查看詳情
                      </span>
                    </span>
                  </div>
                  <div className="pt-6">
                    <p className="font-display tracking-[0.35em] text-[10px] text-gold-600 uppercase mb-2">
                      {en} · {zh}
                    </p>
                    <h3 className="font-display text-xl text-ink-950 mb-1">
                      {cleanName}
                    </h3>
                    {p.name_en && locale !== "en" && (
                      <p className="text-[11px] tracking-wider text-ink-400 mb-1 font-serif italic">
                        {p.name_en}
                      </p>
                    )}
                  </div>
                </button>
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

      <ProductDialog product={openProduct} onClose={() => setOpenProduct(null)} />
    </>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState, useMemo, useEffect, useRef } from "react";
import { useI18n, useT } from "@/lib/i18n/provider";
import { localize } from "@/lib/i18n/localize";
import type { Product } from "@/lib/supabase/types";
import type { ProductCategory } from "@/lib/data/categories";
import ProductDialog from "./ProductDialog";

const PAGE_SIZE = 30;

interface Props {
  products: Product[];
  categories: ProductCategory[];
}

export default function ProductsGrid({ products, categories }: Props) {
  const t = useT();
  const { locale } = useI18n();
  const sp = useSearchParams();
  const rawCat = sp.get("category") ?? "all";

  // 內建分類用 dictionary 翻譯, 新增分類用 DB name_zh
  const categoryLabels = useMemo(() => {
    const labels: Record<string, { en: string; native: string }> = {};
    for (const c of categories) {
      const dictNative = t.category_bar[c.slug as keyof typeof t.category_bar];
      labels[c.slug] = {
        en: c.name_en ?? c.slug,
        native: dictNative ?? c.name_zh,
      };
    }
    return labels;
  }, [categories, t]);

  // 動態 tab — 只顯示頂層分類 (parent_slug=null), 子分類用下拉
  const topLevelCats = useMemo(
    () => categories.filter((c) => !c.parent_slug),
    [categories]
  );
  // 每個頂層分類的子分類
  const childrenByParent = useMemo(() => {
    const m: Record<string, ProductCategory[]> = {};
    for (const c of categories) {
      if (c.parent_slug) {
        if (!m[c.parent_slug]) m[c.parent_slug] = [];
        m[c.parent_slug].push(c);
      }
    }
    return m;
  }, [categories]);

  const tabs = useMemo(
    () => ["all", ...topLevelCats.map((c) => c.slug)],
    [topLevelCats]
  );
  // active 可能是 tab slug 或子分類 slug
  const allSlugs = useMemo(
    () => new Set(["all", ...categories.map((c) => c.slug)]),
    [categories]
  );
  const active = allSlugs.has(rawCat) ? rawCat : "all";
  // 找出 active 對應的頂層分類 (給 tab highlight 用)
  const activeTopLevel = useMemo(() => {
    if (active === "all") return "all";
    const cat = categories.find((c) => c.slug === active);
    if (!cat) return "all";
    return cat.parent_slug ?? cat.slug;
  }, [active, categories]);

  const [search, setSearch] = useState("");
  const [weightRange, setWeightRange] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("featured");
  const [page, setPage] = useState(1);
  const [openProduct, setOpenProduct] = useState<Product | null>(null);

  // Reset page when filter changes
  useEffect(() => {
    setPage(1);
  }, [active, search, weightRange, sortBy]);

  // 選父分類 → 含所有子孫 slug;選子分類 → 只該子分類
  const activeSlugs = useMemo(() => {
    if (active === "all") return null;
    const result = new Set<string>([active]);
    // 如果 active 是頂層,加上所有子分類
    if (childrenByParent[active]) {
      for (const child of childrenByParent[active]) {
        result.add(child.slug);
      }
    }
    return result;
  }, [active, childrenByParent]);

  const filtered = useMemo(() => {
    let result = !activeSlugs ? products : products.filter((p) => activeSlugs.has(p.category));
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
      {/* 分類 tab — 手機橫滑,桌機 wrap;有子分類的 tab hover/touch 出下拉 */}
      <div className="-mx-6 sm:mx-0 mb-6 sm:mb-10 border-b border-ink-950/8 pb-4 sm:pb-8">
        <div className="flex overflow-x-auto scrollbar-none sm:flex-wrap sm:justify-center gap-x-6 sm:gap-x-10 gap-y-4 sm:gap-y-6 px-6 sm:px-0 snap-x">
          {tabs.map((key) => {
            const isActive = key === activeTopLevel;
            const href = key === "all" ? "/products" : `/products?category=${key}`;
            const labelEn = key === "all" ? "All" : (categoryLabels[key]?.en ?? key);
            const labelNative = key === "all" ? t.category_bar.all : (categoryLabels[key]?.native ?? key);
            const children = key !== "all" ? childrenByParent[key] ?? [] : [];
            const hasChildren = children.length > 0;
            return (
              <CategoryTab
                key={key}
                tabKey={key}
                href={href}
                labelEn={labelEn}
                labelNative={labelNative}
                count={categoryCounts[key] ?? 0}
                isActive={isActive}
                hasChildren={hasChildren}
                children={children}
                activeChild={active}
                categoryCounts={categoryCounts}
              />
            );
          })}
        </div>
      </div>

      {/* 搜尋 + 篩選 + 排序 */}
      <div className="flex flex-col gap-3 mb-6 sm:mb-10">
        <div className="relative">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="搜尋商品 / SKU"
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

        <div className="grid grid-cols-2 sm:flex sm:flex-row gap-2 sm:gap-3">
          <select
            value={weightRange}
            onChange={(e) => setWeightRange(e.target.value)}
            className="bg-ivory-50 border border-ink-950/15 px-3 py-2 sm:px-4 sm:py-2.5 text-xs sm:text-sm font-sans focus:outline-none focus:border-gold-500 transition-colors"
            aria-label="重量篩選"
          >
            <option value="all">所有重量</option>
            <option value="u1">小於 1 錢</option>
            <option value="1-3">1 ~ 3 錢</option>
            <option value="3-10">3 ~ 10 錢</option>
            <option value="o10">10 錢以上</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-ivory-50 border border-ink-950/15 px-3 py-2 sm:px-4 sm:py-2.5 text-xs sm:text-sm font-sans focus:outline-none focus:border-gold-500 transition-colors"
            aria-label="排序"
          >
            <option value="featured">推薦排序</option>
            <option value="weight-asc">重量 由輕到重</option>
            <option value="weight-desc">重量 由重到輕</option>
          </select>
        </div>

        <p className="text-[10px] sm:text-[11px] tracking-[0.2em] text-ink-500 uppercase font-display">
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
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-x-3 gap-y-8 sm:gap-x-8 sm:gap-y-16">
            {visible.map((p) => {
              const en = categoryLabels[p.category]?.en ?? "Item";
              const zh = categoryLabels[p.category]?.native ?? p.category;
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
                  <div className="aspect-square sm:aspect-[3/4] relative overflow-hidden bg-ivory-100">
                    {p.image_url && (
                      <Image
                        src={p.image_url}
                        alt={p.name_en ?? p.name_zh}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        className="object-cover group-hover:scale-[1.04] transition-transform duration-[1200ms] ease-out"
                        unoptimized
                      />
                    )}
                    {p.featured && (
                      <span className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-gold-500 text-ink-950 text-[9px] sm:text-[10px] tracking-[0.2em] sm:tracking-[0.25em] uppercase font-display px-1.5 py-0.5 sm:px-2.5 sm:py-1">
                        精選
                      </span>
                    )}
                    {p.weight_qian != null && p.weight_qian > 0 && (
                      <span className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 bg-ink-950/85 text-ivory-50 text-[10px] sm:text-xs font-medium px-1.5 py-0.5 sm:px-2.5 sm:py-1 backdrop-blur-sm">
                        {p.weight_qian} 錢
                      </span>
                    )}
                    <span className="absolute inset-0 bg-ink-950/0 group-hover:bg-ink-950/20 transition-colors hidden sm:flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <span className="bg-ivory-50 text-ink-950 px-5 py-2 text-[10px] tracking-[0.35em] uppercase font-display">
                        查看詳情
                      </span>
                    </span>
                  </div>
                  <div className="pt-2 sm:pt-6">
                    <p className="font-display tracking-[0.2em] sm:tracking-[0.35em] text-[9px] sm:text-[10px] text-gold-600 uppercase mb-1 sm:mb-2 truncate">
                      {en} · {zh}
                    </p>
                    <h3 className="font-display text-sm sm:text-xl text-ink-950 mb-0.5 sm:mb-1 leading-snug line-clamp-2">
                      {cleanName}
                    </h3>
                    {p.name_en && locale !== "en" && (
                      <p className="hidden sm:block text-[11px] tracking-wider text-ink-400 mb-1 font-serif italic truncate">
                        {p.name_en}
                      </p>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* 分頁器 — 手機簡化只剩 prev / current / next */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-1 sm:gap-2 mt-10 sm:mt-20 flex-wrap">
              <button
                onClick={() => { setPage(p => Math.max(1, p - 1)); window.scrollTo({ top: 200, behavior: "smooth" }); }}
                disabled={page === 1}
                className="px-3 sm:px-4 py-2 text-[10px] sm:text-[11px] tracking-[0.2em] sm:tracking-[0.3em] uppercase font-display border border-ink-950/15 hover:border-gold-500 hover:text-gold-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                ← <span className="hidden sm:inline">上一頁</span>
              </button>
              {/* 桌機:顯示 7 個頁碼;手機:只顯示當前頁碼 */}
              <div className="hidden sm:flex items-center gap-2">
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
              </div>
              <span className="sm:hidden font-display text-sm tracking-wider text-ink-700 px-3">
                {page} / {totalPages}
              </span>
              <button
                onClick={() => { setPage(p => Math.min(totalPages, p + 1)); window.scrollTo({ top: 200, behavior: "smooth" }); }}
                disabled={page === totalPages}
                className="px-3 sm:px-4 py-2 text-[10px] sm:text-[11px] tracking-[0.2em] sm:tracking-[0.3em] uppercase font-display border border-ink-950/15 hover:border-gold-500 hover:text-gold-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <span className="hidden sm:inline">下一頁</span> →
              </button>
            </div>
          )}
        </>
      )}

      <ProductDialog product={openProduct} onClose={() => setOpenProduct(null)} />
    </>
  );
}

// 分類 tab + 下拉 — click toggle (手機友好) + outside click 關閉
function CategoryTab({
  tabKey,
  href,
  labelEn,
  labelNative,
  count,
  isActive,
  hasChildren,
  children,
  activeChild,
  categoryCounts,
}: {
  tabKey: string;
  href: string;
  labelEn: string;
  labelNative: string;
  count: number;
  isActive: boolean;
  hasChildren: boolean;
  children: ProductCategory[];
  activeChild: string;
  categoryCounts: Record<string, number>;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // outside click 關下拉
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent | TouchEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler, { passive: true });
    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative shrink-0 snap-start">
      <div className="flex flex-col items-center">
        {/* 有子分類:點箭頭/標題 toggle 下拉;沒有就直接跳連結 */}
        {hasChildren ? (
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            className="flex flex-col items-center cursor-pointer"
          >
            <span
              className={`font-display tracking-[0.3em] sm:tracking-[0.35em] text-[10px] uppercase whitespace-nowrap flex items-center gap-1 ${
                isActive ? "text-gold-600 border-b border-gold-500" : "text-ink-700 hover:text-gold-600"
              } transition-colors pb-1`}
            >
              {labelEn}
              <span className={`text-[8px] transition-transform ${open ? "rotate-180" : ""}`}>▾</span>
            </span>
            <span className="text-[10px] tracking-[0.2em] sm:tracking-[0.25em] text-ink-400 mt-1 whitespace-nowrap">
              {labelNative}
              {count > 0 && <span className="text-ink-400 ml-1">({count})</span>}
            </span>
          </button>
        ) : (
          <Link href={href} scroll={false} className="flex flex-col items-center">
            <span
              className={`font-display tracking-[0.3em] sm:tracking-[0.35em] text-[10px] uppercase whitespace-nowrap ${
                isActive ? "text-gold-600 border-b border-gold-500" : "text-ink-700 hover:text-gold-600"
              } transition-colors pb-1`}
            >
              {labelEn}
            </span>
            <span className="text-[10px] tracking-[0.2em] sm:tracking-[0.25em] text-ink-400 mt-1 whitespace-nowrap">
              {labelNative}
              {count > 0 && <span className="text-ink-400 ml-1">({count})</span>}
            </span>
          </Link>
        )}
      </div>

      {/* 子分類下拉 — click 開,outside click 關 */}
      {hasChildren && open && (
        <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 z-40">
          <div className="bg-ivory-50 border border-ink-950/15 shadow-xl min-w-[200px] py-1">
            <Link
              href={href}
              scroll={false}
              onClick={() => setOpen(false)}
              className="block px-4 py-2.5 text-xs text-ink-700 hover:bg-gold-50 hover:text-gold-700 transition-colors border-b border-ink-950/8"
            >
              <span className="font-medium">全部 {labelNative}</span>
              <span className="text-ink-400 ml-1">({count})</span>
            </Link>
            {children.map((child) => {
              const childCount = categoryCounts[child.slug] ?? 0;
              const childActive = activeChild === child.slug;
              return (
                <Link
                  key={child.slug}
                  href={`/products?category=${child.slug}`}
                  scroll={false}
                  onClick={() => setOpen(false)}
                  className={`block px-4 py-2.5 text-xs transition-colors ${
                    childActive
                      ? "bg-gold-100 text-gold-700"
                      : "text-ink-700 hover:bg-gold-50 hover:text-gold-700"
                  }`}
                >
                  {child.name_zh}{" "}
                  <span className="text-ink-400">({childCount})</span>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

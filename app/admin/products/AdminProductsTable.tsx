"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import type { Product } from "@/lib/supabase/types";
import type { ProductCategory } from "@/lib/data/categories";

const LANGS = [
  { key: "en", flag: "EN" },
  { key: "vi", flag: "VI" },
  { key: "id", flag: "ID" },
  { key: "fil", flag: "FIL" },
  { key: "th", flag: "TH" },
] as const;

type TranslationFilter = "all" | "untranslated" | "partial" | "complete";

const PAGE_SIZE = 50;

interface Props {
  products: Product[];
  categories: ProductCategory[];
}

export default function AdminProductsTable({ products, categories }: Props) {
  const CATEGORY_LABELS = useMemo(() => {
    const map: Record<string, string> = {};
    for (const c of categories) map[c.slug] = c.name_zh;
    return map;
  }, [categories]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string>("all");
  const [trFilter, setTrFilter] = useState<TranslationFilter>("all");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (category !== "all" && p.category !== category) return false;

      if (search.trim()) {
        const q = search.trim().toLowerCase();
        const hay = [
          p.slug,
          p.name_zh,
          p.name_en,
          ...LANGS.map((l) => p.translations?.[l.key]?.name ?? ""),
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();
        if (!hay.includes(q)) return false;
      }

      if (trFilter !== "all") {
        const filled = LANGS.filter(
          (l) => (p.translations?.[l.key]?.name ?? "").trim().length > 0
        ).length;
        if (trFilter === "untranslated" && filled !== 0) return false;
        if (trFilter === "partial" && (filled === 0 || filled === 5)) return false;
        if (trFilter === "complete" && filled !== 5) return false;
      }

      return true;
    });
  }, [products, search, category, trFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const visible = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  // 統計
  const stats = useMemo(() => {
    let untrans = 0,
      partial = 0,
      complete = 0;
    for (const p of products) {
      const filled = LANGS.filter(
        (l) => (p.translations?.[l.key]?.name ?? "").trim().length > 0
      ).length;
      if (filled === 0) untrans++;
      else if (filled === 5) complete++;
      else partial++;
    }
    return { untrans, partial, complete };
  }, [products]);

  return (
    <>
      {/* 篩選 + 搜尋 列 — sticky 在頂 */}
      <div className="bg-white border border-ink-950/10 p-3 sm:p-5 mb-3 sm:mb-4 space-y-2.5 sticky top-12 lg:top-0 z-20 shadow-sm">
        <div className="flex flex-col md:flex-row gap-2 md:gap-3 items-stretch md:items-center">
          <div className="relative flex-1">
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="搜尋商品名 / SKU / 翻譯…"
              className="w-full bg-ivory-50 border border-ink-950/15 px-3 py-2.5 pr-9 text-sm focus:outline-none focus:border-gold-500"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center text-ink-400 hover:text-ink-950"
              >
                ✕
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 md:flex md:gap-3 gap-2">
            <select
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                setPage(1);
              }}
              className="bg-ivory-50 border border-ink-950/15 px-3 py-2.5 text-sm"
            >
              <option value="all">所有分類</option>
              {Object.entries(CATEGORY_LABELS).map(([k, v]) => (
                <option key={k} value={k}>
                  {v}
                </option>
              ))}
            </select>

            <select
              value={trFilter}
              onChange={(e) => {
                setTrFilter(e.target.value as TranslationFilter);
                setPage(1);
              }}
              className="bg-ivory-50 border border-ink-950/15 px-3 py-2.5 text-sm"
            >
              <option value="all">所有翻譯</option>
              <option value="untranslated">沒翻譯 ({stats.untrans})</option>
              <option value="partial">部分 ({stats.partial})</option>
              <option value="complete">全翻 ({stats.complete})</option>
            </select>
          </div>
        </div>

        <p className="text-[11px] sm:text-xs text-ink-500">
          找到 <strong>{filtered.length}</strong> 件
          {totalPages > 1 && ` · ${page}/${totalPages}`}
          <span className="ml-2 text-ink-400">
            (共 {products.length} · 缺翻 {stats.untrans})
          </span>
        </p>
      </div>

      {/* 手機卡片版 */}
      <div className="lg:hidden space-y-3">
        {visible.map((p) => {
          const langStatus = LANGS.map((l) => ({
            key: l.key,
            flag: l.flag,
            filled: (p.translations?.[l.key]?.name ?? "").trim().length > 0,
          }));
          const filledCount = langStatus.filter((s) => s.filled).length;
          return (
            <Link
              key={p.id}
              href={`/admin/products/${p.id}`}
              className="block bg-white border border-ink-950/10 active:bg-ivory-50 transition-colors"
            >
              <div className="flex gap-3 p-3">
                {/* 圖 */}
                <div className="shrink-0">
                  {p.image_url ? (
                    <div className="relative w-16 h-16 overflow-hidden bg-ivory-100">
                      <Image
                        src={p.image_url}
                        alt={p.name_zh}
                        fill
                        sizes="64px"
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                  ) : (
                    <div className="w-16 h-16 bg-ivory-100" />
                  )}
                </div>

                {/* 內容 */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-ink-950 leading-tight text-sm truncate">
                        {p.name_zh}
                      </p>
                      <p className="text-[10px] text-ink-400 font-mono truncate">
                        {p.slug}
                      </p>
                    </div>
                    <span className="text-xs text-gold-700 shrink-0 mt-0.5">
                      ✏ 編輯 →
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mt-2 text-[11px] text-ink-600">
                    <span>{CATEGORY_LABELS[p.category] ?? p.category}</span>
                    {p.weight_qian && (
                      <>
                        <span className="text-ink-300">·</span>
                        <span className="font-mono">{p.weight_qian} 錢</span>
                      </>
                    )}
                    <span className="text-ink-300">·</span>
                    {p.available ? (
                      <span className="text-emerald-700">上架</span>
                    ) : (
                      <span className="text-red-500">下架</span>
                    )}
                    {p.featured && (
                      <>
                        <span className="text-ink-300">·</span>
                        <span className="text-gold-600">★精選</span>
                      </>
                    )}
                  </div>

                  {/* 翻譯 badge */}
                  <div className="flex items-center gap-1 mt-2 flex-wrap">
                    {langStatus.map((s) => (
                      <span
                        key={s.key}
                        className={`text-[9px] font-mono px-1.5 py-0.5 rounded ${
                          s.filled
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-ink-100 text-ink-400 line-through"
                        }`}
                      >
                        {s.flag}
                      </span>
                    ))}
                    <span className="ml-1 text-[10px] text-ink-400">
                      {filledCount}/5
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
        {visible.length === 0 && (
          <p className="text-center py-12 text-sm text-ink-400">沒找到符合條件的商品</p>
        )}
      </div>

      {/* 桌機表格版 */}
      <div className="hidden lg:block bg-white border border-ink-950/10 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-ivory-50 text-ink-400 text-[11px] uppercase tracking-wider">
              <th className="text-left px-3 py-3">圖</th>
              <th className="text-left px-3 py-3">名稱 / SKU</th>
              <th className="text-left px-3 py-3">分類</th>
              <th className="text-left px-3 py-3">金重</th>
              <th className="text-left px-3 py-3">翻譯狀態</th>
              <th className="text-center px-3 py-3">上架</th>
              <th className="text-right px-3 py-3">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink-950/8">
            {visible.map((p) => {
              const langStatus = LANGS.map((l) => ({
                key: l.key,
                flag: l.flag,
                filled: (p.translations?.[l.key]?.name ?? "").trim().length > 0,
              }));
              const filledCount = langStatus.filter((s) => s.filled).length;
              return (
                <tr key={p.id} className="hover:bg-ivory-50/50">
                  <td className="px-3 py-2">
                    {p.image_url ? (
                      <div className="relative w-10 h-10 overflow-hidden bg-ivory-100">
                        <Image
                          src={p.image_url}
                          alt={p.name_zh}
                          fill
                          sizes="40px"
                          className="object-cover"
                          unoptimized
                        />
                      </div>
                    ) : (
                      <div className="w-10 h-10 bg-ivory-100" />
                    )}
                  </td>
                  <td className="px-3 py-2">
                    <p className="font-medium text-ink-950 leading-tight">{p.name_zh}</p>
                    <p className="text-[10px] text-ink-400 font-mono">{p.slug}</p>
                  </td>
                  <td className="px-3 py-2 text-ink-700 text-xs">
                    {CATEGORY_LABELS[p.category] ?? p.category}
                  </td>
                  <td className="px-3 py-2 font-mono text-ink-700 text-xs whitespace-nowrap">
                    {p.weight_qian ? `${p.weight_qian} 錢` : "—"}
                  </td>
                  <td className="px-3 py-2">
                    <div className="flex items-center gap-1">
                      {langStatus.map((s) => (
                        <span
                          key={s.key}
                          title={
                            s.filled
                              ? `${s.flag} 已翻譯:${p.translations?.[s.key]?.name}`
                              : `${s.flag} 還沒翻譯`
                          }
                          className={`text-[9px] font-mono px-1.5 py-0.5 rounded ${
                            s.filled
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-ink-100 text-ink-400 line-through"
                          }`}
                        >
                          {s.flag}
                        </span>
                      ))}
                      <span className="ml-1 text-[10px] text-ink-400">
                        {filledCount}/5
                      </span>
                    </div>
                  </td>
                  <td className="px-3 py-2 text-center">
                    {p.available ? (
                      <span className="text-emerald-700 text-xs font-medium">上架</span>
                    ) : (
                      <span className="text-red-500 text-xs font-medium">下架</span>
                    )}
                  </td>
                  <td className="px-3 py-2 text-right whitespace-nowrap">
                    <Link
                      href={`/admin/products/${p.id}`}
                      className="text-xs text-gold-700 hover:underline"
                    >
                      ✏ 編輯
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* 分頁器 */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-6">
          <button
            type="button"
            onClick={() => {
              setPage((p) => Math.max(1, p - 1));
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            disabled={page === 1}
            className="px-4 py-2 text-xs border border-ink-950/15 bg-white hover:border-gold-500 disabled:opacity-30"
          >
            ← 上一頁
          </button>
          <span className="text-xs text-ink-700 font-mono px-3">
            {page} / {totalPages}
          </span>
          <button
            type="button"
            onClick={() => {
              setPage((p) => Math.min(totalPages, p + 1));
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            disabled={page === totalPages}
            className="px-4 py-2 text-xs border border-ink-950/15 bg-white hover:border-gold-500 disabled:opacity-30"
          >
            下一頁 →
          </button>
        </div>
      )}
    </>
  );
}

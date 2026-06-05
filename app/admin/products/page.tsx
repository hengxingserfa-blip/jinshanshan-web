import Link from "next/link";
import { getProducts } from "@/lib/data/products";
import { getCategories } from "@/lib/data/categories";
import { isSupabaseConfigured } from "@/lib/supabase/server";
import AdminProductsTable from "./AdminProductsTable";

export const metadata = { title: "商品管理 | 金閃閃後台" };

export default async function ProductsAdmin() {
  const [products, categories] = await Promise.all([getProducts(), getCategories()]);
  const configured = isSupabaseConfigured();

  // 統計翻譯
  const LANGS = ["en", "vi", "id", "fil", "th"] as const;
  let translated = 0;
  for (const p of products) {
    const filled = LANGS.filter(
      (l) => (p.translations?.[l]?.name ?? "").trim().length > 0
    ).length;
    if (filled === 5) translated++;
  }

  return (
    <div className="p-4 sm:p-8 md:p-12 max-w-7xl">
      <header className="mb-5 sm:mb-8 flex items-end justify-between gap-4 sm:gap-6 flex-wrap">
        <div>
          <p className="hidden sm:block font-sans tracking-[0.3em] text-[10px] text-gold-600 uppercase mb-2 font-medium">
            Products · 商品管理
          </p>
          <h1 className="font-display text-2xl sm:text-4xl text-ink-950">商品管理</h1>
          <p className="text-xs sm:text-sm text-ink-700 mt-1 sm:mt-2">
            共 <strong>{products.length}</strong> 件 · 精選{" "}
            <strong>{products.filter((p) => p.featured).length}</strong> 件 ·
            5 國全翻譯 <strong>{translated}</strong> 件
          </p>
        </div>
        <Link
          href="/admin/products/new"
          className="inline-flex items-center gap-2 bg-ink-950 hover:bg-gold-500 hover:text-ink-950 text-ivory-50 px-4 sm:px-5 py-2.5 sm:py-3 font-sans font-medium tracking-wider text-[11px] sm:text-xs uppercase transition-colors"
        >
          + 新增商品
        </Link>
      </header>

      {!configured && (
        <div className="mb-8 bg-amber-50 border border-amber-300 text-amber-900 px-5 py-4 text-xs">
          顯示中的是程式內建的 fallback 示意資料。接好 Supabase 後會自動切到後台填的真實商品。
        </div>
      )}

      <details className="mb-4 sm:mb-6 bg-blue-50 border border-blue-200 text-blue-900 text-xs leading-loose group">
        <summary className="px-4 sm:px-5 py-3 cursor-pointer font-medium select-none flex items-center justify-between">
          <span>💡 翻譯後有誤怎麼修?(點開看)</span>
          <span className="text-blue-400 group-open:rotate-180 transition-transform">▾</span>
        </summary>
        <div className="px-4 sm:px-5 pb-4">
          1. 用上面搜尋框找那件商品(打中文名或 SKU 都行)<br />
          2. 點商品卡片(手機)或右邊「✏ 編輯」(桌機)<br />
          3. 拉到下面「多語翻譯」區,切 EN / VI / ID / FIL / TH 5 個 tab 改字儲存<br />
          4. 翻譯狀態 badge:🟢 綠 = 已翻 / ⬜ 灰 = 缺翻
        </div>
      </details>

      <AdminProductsTable products={products} categories={categories} />
    </div>
  );
}

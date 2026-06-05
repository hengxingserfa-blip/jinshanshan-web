import Link from "next/link";
import { getCategories } from "@/lib/data/categories";
import { getProducts } from "@/lib/data/products";

export const metadata = { title: "商品分類 | 金閃閃後台" };

export default async function CategoriesAdmin() {
  const [cats, products] = await Promise.all([getCategories(), getProducts()]);

  // 算每個分類有幾件商品
  const counts: Record<string, number> = {};
  for (const p of products) {
    counts[p.category] = (counts[p.category] ?? 0) + 1;
  }

  return (
    <div className="p-4 sm:p-8 md:p-12 max-w-4xl">
      <header className="mb-5 sm:mb-8 flex items-end justify-between gap-4 flex-wrap">
        <div>
          <p className="hidden sm:block font-sans tracking-[0.3em] text-[10px] text-gold-600 uppercase mb-2 font-medium">
            Categories · 商品分類
          </p>
          <h1 className="font-display text-2xl sm:text-4xl text-ink-950">商品分類</h1>
          <p className="text-xs sm:text-sm text-ink-700 mt-1 sm:mt-2">
            共 <strong>{cats.length}</strong> 個分類 · 員工可以新增 / 編輯 / 刪除
          </p>
        </div>
        <Link
          href="/admin/categories/new"
          className="inline-flex items-center gap-2 bg-ink-950 hover:bg-gold-500 hover:text-ink-950 text-ivory-50 px-4 sm:px-5 py-2.5 sm:py-3 font-sans font-medium tracking-wider text-[11px] sm:text-xs uppercase transition-colors"
        >
          + 新增分類
        </Link>
      </header>

      <details className="mb-4 sm:mb-6 bg-blue-50 border border-blue-200 text-blue-900 text-xs leading-loose group">
        <summary className="px-4 sm:px-5 py-3 cursor-pointer font-medium select-none">
          💡 新增分類 + 商品掛上去的流程(點開)
        </summary>
        <div className="px-4 sm:px-5 pb-4 space-y-1">
          1. 點上面「+ 新增分類」<br />
          2. 填:slug(英文網址)、中文名稱、英文名稱、排序<br />
          3. 儲存後立刻出現在「商品編輯頁的分類下拉」<br />
          4. 編輯任一商品 → 分類欄改成新分類 → 儲存<br />
          5. 該分類就會出現在前台 /products 頂部 tab
        </div>
      </details>

      <div className="bg-white border border-ink-950/10 divide-y divide-ink-950/8">
        {cats.map((c) => {
          const n = counts[c.slug] ?? 0;
          return (
            <Link
              key={c.id}
              href={`/admin/categories/${c.id}`}
              className="flex items-center justify-between gap-3 p-4 sm:p-5 hover:bg-ivory-50 transition-colors"
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline gap-3 flex-wrap">
                  <span className="text-[10px] font-mono text-ink-400 bg-ivory-100 px-1.5 py-0.5">
                    {c.sort_order}
                  </span>
                  <p className="font-display text-lg sm:text-xl text-ink-950 leading-tight">
                    {c.name_zh}
                  </p>
                  {c.name_en && (
                    <p className="text-sm tracking-wider text-ink-500 italic font-serif">
                      {c.name_en}
                    </p>
                  )}
                </div>
                <p className="text-[11px] text-ink-400 font-mono mt-1">
                  slug: {c.slug} · 商品 {n} 件
                </p>
              </div>
              <span className="text-xs text-gold-700 shrink-0">✏ 編輯 →</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

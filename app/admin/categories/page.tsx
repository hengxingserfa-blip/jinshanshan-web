import Link from "next/link";
import { getCategoryTree, getCategories } from "@/lib/data/categories";
import { getProducts } from "@/lib/data/products";

export const metadata = { title: "商品分類 | 金閃閃後台" };

export default async function CategoriesAdmin() {
  const [tree, allCats, products] = await Promise.all([
    getCategoryTree(),
    getCategories(),
    getProducts(),
  ]);

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
            共 <strong>{allCats.length}</strong> 個分類(含 {tree.length} 個大分類 +{" "}
            {allCats.length - tree.length} 個子分類)
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
          💡 大分類 + 子分類 + 商品掛上去的流程(點開)
        </summary>
        <div className="px-4 sm:px-5 pb-4 space-y-1">
          <strong>新增大分類</strong>(例:項鍊)
          <br />
          1. 點「+ 新增分類」<br />
          2. 「父分類」<strong>留空</strong> → 自己就是大分類<br />
          <br />
          <strong>新增子分類</strong>(例:項鍊底下的「套鍊系列」)<br />
          1. 點「+ 新增分類」<br />
          2. 「父分類」選「項鍊 (necklaces)」<br />
          3. 儲存 → 前台 tab 滑過項鍊會自動出下拉<br />
          <br />
          <strong>商品掛分類</strong>:編輯商品 → 分類欄選大分類 或 子分類 都可以
        </div>
      </details>

      <div className="bg-white border border-ink-950/10 divide-y divide-ink-950/8">
        {tree.map((parent) => {
          const parentCount = counts[parent.slug] ?? 0;
          return (
            <div key={parent.id}>
              {/* 大分類 row */}
              <Link
                href={`/admin/categories/${parent.id}`}
                className="flex items-center justify-between gap-3 p-4 sm:p-5 hover:bg-ivory-50 transition-colors"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline gap-3 flex-wrap">
                    <span className="text-[10px] font-mono text-ink-400 bg-ivory-100 px-1.5 py-0.5">
                      {parent.sort_order}
                    </span>
                    <p className="font-display text-lg sm:text-xl text-ink-950 leading-tight">
                      {parent.name_zh}
                    </p>
                    {parent.name_en && (
                      <p className="text-sm tracking-wider text-ink-500 italic font-serif">
                        {parent.name_en}
                      </p>
                    )}
                    {parent.children.length > 0 && (
                      <span className="text-[10px] bg-gold-100 text-gold-700 px-1.5 py-0.5 rounded">
                        含 {parent.children.length} 個子分類
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-ink-400 font-mono mt-1">
                    slug: {parent.slug} · 商品 {parentCount} 件
                  </p>
                </div>
                <span className="text-xs text-gold-700 shrink-0">✏ 編輯 →</span>
              </Link>

              {/* 子分類縮排顯示 */}
              {parent.children.map((child) => {
                const childCount = counts[child.slug] ?? 0;
                return (
                  <Link
                    key={child.id}
                    href={`/admin/categories/${child.id}`}
                    className="flex items-center justify-between gap-3 pl-10 sm:pl-14 pr-4 sm:pr-5 py-3 sm:py-4 hover:bg-ivory-50 transition-colors bg-ivory-50/40"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-baseline gap-2 flex-wrap">
                        <span className="text-ink-400 text-sm">↳</span>
                        <span className="text-[10px] font-mono text-ink-400 bg-ivory-100 px-1.5 py-0.5">
                          {child.sort_order}
                        </span>
                        <p className="font-display text-base sm:text-lg text-ink-800 leading-tight">
                          {child.name_zh}
                        </p>
                        {child.name_en && (
                          <p className="text-xs tracking-wider text-ink-500 italic font-serif">
                            {child.name_en}
                          </p>
                        )}
                      </div>
                      <p className="text-[10px] text-ink-400 font-mono mt-0.5">
                        slug: {child.slug} · 商品 {childCount} 件
                      </p>
                    </div>
                    <span className="text-xs text-gold-700 shrink-0">✏ 編輯 →</span>
                  </Link>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}

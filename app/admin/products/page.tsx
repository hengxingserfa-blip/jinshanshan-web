import Link from "next/link";
import { getProducts } from "@/lib/data/products";
import { isSupabaseConfigured } from "@/lib/supabase/server";
import AdminProductsTable from "./AdminProductsTable";

export const metadata = { title: "商品管理 | 金閃閃後台" };

export default async function ProductsAdmin() {
  const products = await getProducts();
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
    <div className="p-8 md:p-12 max-w-7xl">
      <header className="mb-8 flex items-end justify-between gap-6 flex-wrap">
        <div>
          <p className="font-sans tracking-[0.3em] text-[10px] text-gold-600 uppercase mb-2 font-medium">
            Products · 商品管理
          </p>
          <h1 className="font-display text-4xl text-ink-950">商品管理</h1>
          <p className="text-sm text-ink-700 mt-2">
            共 <strong>{products.length}</strong> 件 · 精選{" "}
            <strong>{products.filter((p) => p.featured).length}</strong> 件 ·
            5 國全翻譯 <strong>{translated}</strong> 件
          </p>
        </div>
        <Link
          href="/admin/products/new"
          className="inline-flex items-center gap-2 bg-ink-950 hover:bg-gold-500 hover:text-ink-950 text-ivory-50 px-5 py-3 font-sans font-medium tracking-wider text-xs uppercase transition-colors"
        >
          + 新增商品
        </Link>
      </header>

      {!configured && (
        <div className="mb-8 bg-amber-50 border border-amber-300 text-amber-900 px-5 py-4 text-xs">
          顯示中的是程式內建的 fallback 示意資料。接好 Supabase 後會自動切到後台填的真實商品。
        </div>
      )}

      <div className="mb-6 bg-blue-50 border border-blue-200 text-blue-900 px-5 py-4 text-xs leading-loose">
        <p className="font-medium mb-1">💡 翻譯後有誤怎麼修?</p>
        <p>
          1. 用上面搜尋框找到那件商品(可以打中文名或 SKU)<br />
          2. 點右邊「✏ 編輯」<br />
          3. 拉到下面「多語翻譯」區,有 EN / VI / ID / FIL / TH 5 個 tab,直接改錯字儲存即可<br />
          4. 也可以用「翻譯狀態」過濾器找出還沒翻譯 / 沒翻完整 的商品
        </p>
      </div>

      <AdminProductsTable products={products} />
    </div>
  );
}

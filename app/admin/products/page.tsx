import Image from "next/image";
import Link from "next/link";
import { getProducts } from "@/lib/data/products";
import { isSupabaseConfigured } from "@/lib/supabase/server";

const CATEGORY_LABELS: Record<string, string> = {
  rings: "戒指",
  necklaces: "項鍊",
  bracelets: "手鏈",
  wedding: "對戒",
  newborn: "彌月禮",
  bullion: "金條",
  custom: "訂製",
};

export default async function ProductsAdmin() {
  const products = await getProducts();
  const configured = isSupabaseConfigured();

  return (
    <div className="p-8 md:p-12 max-w-7xl">
      <header className="mb-10 flex items-end justify-between gap-6 flex-wrap">
        <div>
          <p className="font-sans tracking-[0.3em] text-[10px] text-gold-600 uppercase mb-2 font-medium">
            Products · 商品
          </p>
          <h1 className="font-display text-4xl text-ink-950">商品管理</h1>
          <p className="text-sm text-ink-700 mt-2">
            共 <strong>{products.length}</strong> 件 · 其中{" "}
            <strong>{products.filter((p) => p.featured).length}</strong> 件精選
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
          顯示中的 12 件是程式內建的 fallback 示意資料。接好 Supabase 之後會自動切到後台填的真實商品。
        </div>
      )}

      <div className="bg-white border border-ink-950/10 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-ivory-50 text-ink-400 text-[11px] uppercase tracking-wider">
              <th className="text-left px-4 py-3">圖</th>
              <th className="text-left px-4 py-3">名稱</th>
              <th className="text-left px-4 py-3">分類</th>
              <th className="text-left px-4 py-3">純度</th>
              <th className="text-left px-4 py-3">金重</th>
              <th className="text-center px-4 py-3">精選</th>
              <th className="text-center px-4 py-3">上架</th>
              <th className="text-right px-4 py-3">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink-950/8">
            {products.map((p) => (
              <tr key={p.id} className="hover:bg-ivory-50/50">
                <td className="px-4 py-3">
                  {p.image_url ? (
                    <div className="relative w-12 h-12 overflow-hidden bg-ivory-100">
                      <Image
                        src={p.image_url}
                        alt={p.name_zh}
                        fill
                        sizes="48px"
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-12 h-12 bg-ivory-100" />
                  )}
                </td>
                <td className="px-4 py-3">
                  <p className="font-medium text-ink-950">{p.name_zh}</p>
                  {p.name_en && (
                    <p className="text-[11px] text-ink-400 italic">{p.name_en}</p>
                  )}
                </td>
                <td className="px-4 py-3 text-ink-700">
                  {CATEGORY_LABELS[p.category] ?? p.category}
                </td>
                <td className="px-4 py-3 font-mono text-ink-700">{p.purity ?? "—"}</td>
                <td className="px-4 py-3 font-mono text-ink-700">
                  {p.weight_qian ? `${p.weight_qian} 錢` : "—"}
                </td>
                <td className="px-4 py-3 text-center">
                  {p.featured ? "★" : <span className="text-ink-300">—</span>}
                </td>
                <td className="px-4 py-3 text-center">
                  {p.available ? (
                    <span className="text-emerald-700 text-xs font-medium">上架</span>
                  ) : (
                    <span className="text-red-500 text-xs font-medium">下架</span>
                  )}
                </td>
                <td className="px-4 py-3 text-right">
                  <Link
                    href={`/admin/products/${p.id}`}
                    className="text-xs text-gold-700 hover:underline"
                  >
                    編輯 →
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-8 text-[11px] text-ink-400">
        ※ 新增/編輯表單將在下一輪 Phase 4.5 補上。目前先看資料層通了沒。
      </p>
    </div>
  );
}

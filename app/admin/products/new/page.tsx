import Link from "next/link";
import ProductForm from "../ProductForm";
import { isSupabaseConfigured } from "@/lib/supabase/server";
import { getCategories } from "@/lib/data/categories";

export const metadata = { title: "新增商品 | 金閃閃後台" };

export default async function NewProductPage() {
  const categories = await getCategories();

  return (
    <div className="p-4 sm:p-8 md:p-12 max-w-3xl">
      <header className="mb-5 sm:mb-10">
        <Link href="/admin/products" className="text-xs sm:text-sm text-ink-500 hover:text-ink-950 mb-2 sm:mb-3 inline-block">
          ← 回商品列表
        </Link>
        <p className="hidden sm:block font-sans tracking-[0.3em] text-[10px] text-gold-600 uppercase mb-2 font-medium">
          New Product · 新增商品
        </p>
        <h1 className="font-display text-xl sm:text-4xl text-ink-950 leading-tight">新增金飾商品</h1>
      </header>

      {!isSupabaseConfigured() && (
        <div className="mb-8 bg-amber-50 border border-amber-300 text-amber-900 px-5 py-4 text-xs">
          Supabase 尚未設定. 表單可以填,但送出會錯誤. 請先依 SETUP.md 連好 Supabase.
        </div>
      )}

      <ProductForm categories={categories} />
    </div>
  );
}

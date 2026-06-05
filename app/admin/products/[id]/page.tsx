import Link from "next/link";
import { notFound } from "next/navigation";
import ProductForm from "../ProductForm";
import { getServerSupabase, isSupabaseConfigured } from "@/lib/supabase/server";
import { getProducts } from "@/lib/data/products";
import { getCategories } from "@/lib/data/categories";
import type { Product } from "@/lib/supabase/types";

export const metadata = { title: "編輯商品 | 金閃閃後台" };

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  let product: Product | null = null;

  if (isSupabaseConfigured()) {
    const supabase = await getServerSupabase();
    if (supabase) {
      const { data } = await supabase.from("products").select("*").eq("id", id).maybeSingle();
      product = (data as Product | null) ?? null;
    }
  }

  // Fallback: 從 fallback 資料找
  if (!product) {
    const all = await getProducts();
    product = all.find((p) => p.id === id) ?? null;
  }

  if (!product) return notFound();

  const categories = await getCategories();

  return (
    <div className="p-4 sm:p-8 md:p-12 max-w-3xl">
      <header className="mb-5 sm:mb-10">
        <Link href="/admin/products" className="text-xs sm:text-sm text-ink-500 hover:text-ink-950 mb-2 sm:mb-3 inline-block">
          ← 回商品列表
        </Link>
        <p className="hidden sm:block font-sans tracking-[0.3em] text-[10px] text-gold-600 uppercase mb-2 font-medium">
          Edit Product · 編輯商品
        </p>
        <h1 className="font-display text-xl sm:text-4xl text-ink-950 leading-tight">{product.name_zh}</h1>
      </header>

      {!isSupabaseConfigured() && (
        <div className="mb-8 bg-amber-50 border border-amber-300 text-amber-900 px-5 py-4 text-xs">
          目前看到的是 fallback 示意資料. 接好 Supabase 後才能真的儲存編輯.
        </div>
      )}

      <ProductForm defaults={product} categories={categories} />
    </div>
  );
}

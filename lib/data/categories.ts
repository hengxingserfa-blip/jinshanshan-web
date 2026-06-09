import { getServerSupabase } from "@/lib/supabase/server";

export interface ProductCategory {
  id: string;
  slug: string;
  name_zh: string;
  name_en: string | null;
  sort_order: number;
  parent_slug: string | null;     // null = 頂層大分類
  created_at?: string;
  updated_at?: string;
}

export interface CategoryWithChildren extends ProductCategory {
  children: ProductCategory[];
}

// fallback — Supabase 連不上時用 (內建 8 個 + 都是頂層)
export const FALLBACK_CATEGORIES: ProductCategory[] = [
  { id: "1", slug: "rings",     name_zh: "戒指",   name_en: "Rings",     sort_order: 1, parent_slug: null },
  { id: "2", slug: "earrings",  name_zh: "耳環",   name_en: "Earrings",  sort_order: 2, parent_slug: null },
  { id: "3", slug: "necklaces", name_zh: "項鍊",   name_en: "Necklaces", sort_order: 3, parent_slug: null },
  { id: "4", slug: "bracelets", name_zh: "手鏈",   name_en: "Bracelets", sort_order: 4, parent_slug: null },
  { id: "5", slug: "wedding",   name_zh: "對戒",   name_en: "Wedding",   sort_order: 5, parent_slug: null },
  { id: "6", slug: "newborn",   name_zh: "彌月禮", name_en: "Newborn",   sort_order: 6, parent_slug: null },
  { id: "7", slug: "bullion",   name_zh: "金條",   name_en: "Bullion",   sort_order: 7, parent_slug: null },
  { id: "8", slug: "custom",    name_zh: "訂製",   name_en: "Custom",    sort_order: 8, parent_slug: null },
];

// 撈全部分類 (扁平)
export async function getCategories(): Promise<ProductCategory[]> {
  const supabase = await getServerSupabase();
  if (!supabase) return FALLBACK_CATEGORIES;
  const { data, error } = await supabase
    .from("product_categories")
    .select("*")
    .order("sort_order", { ascending: true });
  if (error || !data || data.length === 0) return FALLBACK_CATEGORIES;
  return data as ProductCategory[];
}

// 撈樹狀分類 (頂層 + 各自子分類)
export async function getCategoryTree(): Promise<CategoryWithChildren[]> {
  const all = await getCategories();
  const topLevel = all.filter((c) => !c.parent_slug);
  return topLevel.map((parent) => ({
    ...parent,
    children: all
      .filter((c) => c.parent_slug === parent.slug)
      .sort((a, b) => a.sort_order - b.sort_order),
  }));
}

// 給單一 slug 撈該分類自己 + 所有子孫 slug (給 /products?category=xxx 過濾用)
export async function getCategoryDescendantSlugs(slug: string): Promise<string[]> {
  const all = await getCategories();
  const result = new Set<string>([slug]);
  const queue = [slug];
  while (queue.length > 0) {
    const current = queue.shift()!;
    for (const c of all) {
      if (c.parent_slug === current && !result.has(c.slug)) {
        result.add(c.slug);
        queue.push(c.slug);
      }
    }
  }
  return Array.from(result);
}

export async function getCategoryById(id: string): Promise<ProductCategory | null> {
  const supabase = await getServerSupabase();
  if (!supabase) return FALLBACK_CATEGORIES.find((c) => c.id === id) ?? null;
  const { data, error } = await supabase
    .from("product_categories")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error || !data) return null;
  return data as ProductCategory;
}

import { getServerSupabase } from "@/lib/supabase/server";

export interface ProductCategory {
  id: string;
  slug: string;
  name_zh: string;
  name_en: string | null;
  sort_order: number;
  created_at?: string;
  updated_at?: string;
}

// fallback — Supabase 連不上時用,跟 SQL seed 一致
export const FALLBACK_CATEGORIES: ProductCategory[] = [
  { id: "1", slug: "rings",     name_zh: "戒指",   name_en: "Rings",     sort_order: 1 },
  { id: "2", slug: "earrings",  name_zh: "耳環",   name_en: "Earrings",  sort_order: 2 },
  { id: "3", slug: "necklaces", name_zh: "項鍊",   name_en: "Necklaces", sort_order: 3 },
  { id: "4", slug: "bracelets", name_zh: "手鏈",   name_en: "Bracelets", sort_order: 4 },
  { id: "5", slug: "wedding",   name_zh: "對戒",   name_en: "Wedding",   sort_order: 5 },
  { id: "6", slug: "newborn",   name_zh: "彌月禮", name_en: "Newborn",   sort_order: 6 },
  { id: "7", slug: "bullion",   name_zh: "金條",   name_en: "Bullion",   sort_order: 7 },
  { id: "8", slug: "custom",    name_zh: "訂製",   name_en: "Custom",    sort_order: 8 },
];

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

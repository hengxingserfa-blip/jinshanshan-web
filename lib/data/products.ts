import { getServerSupabase } from "@/lib/supabase/server";
import type { Product } from "@/lib/supabase/types";
import { IMG } from "@/lib/images";

// Fallback 用的示意商品 (Supabase 未設定 / 無資料時使用)
// 接上 Supabase 後, 後台填入的真實商品會自動取代這份.
const FALLBACK: Product[] = [
  { id: "p1",  slug: "classic-ring",          category: "rings",      name_zh: "經典平面戒指",        name_en: "Classic Plain Ring",        description_zh: null, image_url: IMG.ring1,    weight_qian: 3.5,  purity: "9999", featured: true,  available: true, sort_order: 1,  translations: {}, created_at: "", updated_at: "" },
  { id: "p2",  slug: "carved-floral-ring",    category: "rings",      name_zh: "鏤空雕花戒指",        name_en: "Carved Floral Ring",        description_zh: null, image_url: IMG.ring2,    weight_qian: 4.2,  purity: "9999", featured: false, available: true, sort_order: 2,  translations: {}, created_at: "", updated_at: "" },
  { id: "p3",  slug: "classical-necklace",    category: "necklaces",  name_zh: "古典花鏈項鍊",        name_en: "Classical Floral Necklace", description_zh: "純度 9999,以細緻雕花呈現經典銀樓工藝。每一條都附上獨立金重證明。", image_url: IMG.necklace1, weight_qian: 6.5,  purity: "9999", featured: true,  available: true, sort_order: 3,  translations: {}, created_at: "", updated_at: "" },
  { id: "p4",  slug: "double-wave-necklace",  category: "necklaces",  name_zh: "雙圈水波項鍊",        name_en: "Double Wave Necklace",      description_zh: null, image_url: IMG.necklace2, weight_qian: 7.0,  purity: "9999", featured: false, available: true, sort_order: 4,  translations: {}, created_at: "", updated_at: "" },
  { id: "p5",  slug: "round-bead-bracelet",   category: "bracelets",  name_zh: "圓珠單圈手鏈",        name_en: "Round Bead Bracelet",       description_zh: null, image_url: IMG.bracelet1, weight_qian: 5.0,  purity: "9999", featured: true,  available: true, sort_order: 5,  translations: {}, created_at: "", updated_at: "" },
  { id: "p6",  slug: "fine-gold-bracelet",    category: "bracelets",  name_zh: "細緻金線手鏈",        name_en: "Fine Gold Bracelet",        description_zh: null, image_url: IMG.bracelet2, weight_qian: 3.8,  purity: "9999", featured: false, available: true, sort_order: 6,  translations: {}, created_at: "", updated_at: "" },
  { id: "p7",  slug: "engagement-pair",       category: "wedding",    name_zh: "成雙訂婚對戒",        name_en: "Engagement Pair",           description_zh: null, image_url: IMG.pair,     weight_qian: 4.5,  purity: "9999", featured: false, available: true, sort_order: 7,  translations: {}, created_at: "", updated_at: "" },
  { id: "p8",  slug: "minimal-wedding",       category: "wedding",    name_zh: "簡約結婚對戒",        name_en: "Minimal Wedding Pair",      description_zh: null, image_url: IMG.glow,     weight_qian: 3.5,  purity: "9999", featured: false, available: true, sort_order: 8,  translations: {}, created_at: "", updated_at: "" },
  { id: "p9",  slug: "engraved-baby",         category: "newborn",    name_zh: "雕花彌月金牌",        name_en: "Engraved Baby Pendant",     description_zh: null, image_url: IMG.fancy,    weight_qian: 1.0,  purity: "9999", featured: false, available: true, sort_order: 9,  translations: {}, created_at: "", updated_at: "" },
  { id: "p10", slug: "fortune-baby-lock",     category: "newborn",    name_zh: "圓滿福氣金鎖",        name_en: "Fortune Baby Lock",         description_zh: null, image_url: IMG.ring1,    weight_qian: 1.5,  purity: "9999", featured: false, available: true, sort_order: 10, translations: {}, created_at: "", updated_at: "" },
  { id: "p11", slug: "bullion-1-tael",        category: "bullion",    name_zh: "9999 純金條 一兩",    name_en: "9999 Pure Gold Bar 1 Tael", description_zh: null, image_url: IMG.bar,      weight_qian: 10.0, purity: "9999", featured: false, available: true, sort_order: 11, translations: {}, created_at: "", updated_at: "" },
  { id: "p12", slug: "bullion-5-qian",        category: "bullion",    name_zh: "9999 純金條 五錢",    name_en: "9999 Pure Gold Bar 5 Qian", description_zh: null, image_url: IMG.bar,      weight_qian: 5.0,  purity: "9999", featured: false, available: true, sort_order: 12, translations: {}, created_at: "", updated_at: "" },
];

export async function getProducts(): Promise<Product[]> {
  const supabase = await getServerSupabase();
  if (!supabase) return FALLBACK;
  // Supabase 預設 1000 列,3000+ 商品要分頁撈
  const all: Product[] = [];
  const pageSize = 1000;
  let from = 0;
  while (true) {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("available", true)
      .order("sort_order", { ascending: true })
      .range(from, from + pageSize - 1);
    if (error || !data || data.length === 0) break;
    all.push(...(data as Product[]));
    if (data.length < pageSize) break;
    from += pageSize;
  }
  return all.length > 0 ? all : FALLBACK;
}

export async function getFeaturedProducts(limit = 6): Promise<Product[]> {
  const all = await getProducts();
  const featured = all.filter((p) => p.featured);
  return (featured.length > 0 ? featured : all).slice(0, limit);
}

export async function getProductsByCategory(
  category: Product["category"]
): Promise<Product[]> {
  const all = await getProducts();
  return all.filter((p) => p.category === category);
}

// 撈單一商品(用 slug),找不到回 null
export async function getProductBySlug(slug: string): Promise<Product | null> {
  const supabase = await getServerSupabase();
  if (!supabase) {
    return FALLBACK.find((p) => p.slug === slug) ?? null;
  }
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();
  if (error || !data) return null;
  return data as Product;
}

// 撈所有可索引的 slug,給 sitemap 用 — Supabase 預設 1000 列,要分頁撈
export async function getAllProductSlugs(): Promise<string[]> {
  const supabase = await getServerSupabase();
  if (!supabase) return FALLBACK.map((p) => p.slug);
  const all: string[] = [];
  const pageSize = 1000;
  let from = 0;
  while (true) {
    const { data, error } = await supabase
      .from("products")
      .select("slug")
      .eq("available", true)
      .range(from, from + pageSize - 1);
    if (error || !data || data.length === 0) break;
    all.push(...data.map((r: { slug: string }) => r.slug));
    if (data.length < pageSize) break;
    from += pageSize;
  }
  return all;
}

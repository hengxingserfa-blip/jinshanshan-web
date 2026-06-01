import { getServerSupabase } from "@/lib/supabase/server";
import type { Promotion } from "@/lib/supabase/types";

const FALLBACK: Promotion = {
  id: "p-fallback",
  title_zh: "5 月限定",
  title_en: "May Special",
  body_zh: "母親節黃金回收加碼活動進行中",
  starts_at: new Date().toISOString(),
  ends_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
  cta_label: "詢問詳情",
  cta_url: "/#contact",
  active: true,
  translations: {},
  created_at: "",
};

export async function getActivePromotion(): Promise<Promotion | null> {
  const supabase = await getServerSupabase();
  if (!supabase) return FALLBACK;
  const nowIso = new Date().toISOString();
  const { data, error } = await supabase
    .from("promotions")
    .select("*")
    .eq("active", true)
    .lte("starts_at", nowIso)
    .gte("ends_at", nowIso)
    .order("starts_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  if (error || !data) return FALLBACK;
  return data as Promotion;
}

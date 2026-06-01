import { getServerSupabase } from "@/lib/supabase/server";
import type { GoldPriceOverride } from "@/lib/supabase/types";

// 老闆當日後台覆寫的 9999 飾金回收基準 (NT$/錢)
// 沒覆寫就回 null, 由 /api/gold-price 走 詮美 + Yahoo 即時邏輯
export async function getTodayGoldOverride(): Promise<number | null> {
  const supabase = await getServerSupabase();
  if (!supabase) return null;
  const today = new Date().toISOString().slice(0, 10);
  const { data, error } = await supabase
    .from("gold_price_overrides")
    .select("price_9999_qian")
    .eq("active", true)
    .eq("date", today)
    .maybeSingle();
  if (error || !data) return null;
  return (data as Pick<GoldPriceOverride, "price_9999_qian">).price_9999_qian;
}

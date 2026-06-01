"use server";

import { revalidatePath } from "next/cache";
import { isAdminLoggedIn } from "@/lib/admin/auth";
import { getServiceRoleSupabase } from "@/lib/supabase/server";

interface ActionResult {
  ok: boolean;
  message: string;
}

export async function setGoldOverrideAction(
  _prev: unknown,
  formData: FormData
): Promise<ActionResult> {
  if (!(await isAdminLoggedIn())) return { ok: false, message: "未登入" };

  const supabase = getServiceRoleSupabase();
  if (!supabase) {
    return {
      ok: false,
      message: "Supabase 尚未設定. 請先填 .env.local 並重啟 dev server",
    };
  }

  const date = (formData.get("date") as string | null) ?? "";
  const priceStr = (formData.get("price") as string | null) ?? "";
  const note = (formData.get("note") as string | null) ?? "";

  const price = parseInt(priceStr.replace(/[, ]/g, ""), 10);
  if (!date || !price || price <= 0 || price > 999999) {
    return { ok: false, message: "日期與金額必填,金額需在 1 ~ 999,999 之間" };
  }

  const { error } = await supabase.from("gold_price_overrides").upsert(
    {
      date,
      price_9999_qian: price,
      note: note || null,
      active: true,
    },
    { onConflict: "date" }
  );

  if (error) return { ok: false, message: error.message };

  revalidatePath("/admin/gold-price");
  revalidatePath("/");
  return { ok: true, message: `已儲存 ${date} 牌告 NT$ ${price.toLocaleString("zh-TW")}` };
}

export async function clearGoldOverrideAction(
  date: string
): Promise<ActionResult> {
  if (!(await isAdminLoggedIn())) return { ok: false, message: "未登入" };
  const supabase = getServiceRoleSupabase();
  if (!supabase) return { ok: false, message: "Supabase 尚未設定" };

  const { error } = await supabase
    .from("gold_price_overrides")
    .update({ active: false })
    .eq("date", date);

  if (error) return { ok: false, message: error.message };

  revalidatePath("/admin/gold-price");
  revalidatePath("/");
  return { ok: true, message: `${date} 覆寫已停用(會走詮美+國際即時)` };
}

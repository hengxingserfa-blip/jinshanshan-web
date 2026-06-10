"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { isAdminLoggedIn } from "@/lib/admin/auth";
import { getServiceRoleSupabase } from "@/lib/supabase/server";

interface ActionResult {
  ok: boolean;
  message: string;
}

function parseForm(formData: FormData) {
  const title_zh = (formData.get("title_zh") as string | null)?.trim() ?? "";
  const title_en = (formData.get("title_en") as string | null)?.trim() || null;
  const body_zh = (formData.get("body_zh") as string | null)?.trim() ?? "";
  const startsRaw = (formData.get("starts_at") as string | null) ?? "";
  const endsRaw = (formData.get("ends_at") as string | null) ?? "";
  const cta_label = (formData.get("cta_label") as string | null)?.trim() || null;
  const cta_url = (formData.get("cta_url") as string | null)?.trim() || null;
  const active = formData.get("active") === "on";
  const poster_url = (formData.get("poster_url") as string | null)?.trim() || null;
  const show_popup = formData.get("show_popup") === "on";

  const starts_at = startsRaw ? new Date(startsRaw).toISOString() : "";
  const ends_at = endsRaw ? new Date(endsRaw).toISOString() : "";

  return { title_zh, title_en, body_zh, starts_at, ends_at, cta_label, cta_url, active, poster_url, show_popup };
}

function validate(p: ReturnType<typeof parseForm>): string | null {
  if (!p.title_zh) return "中文標題必填";
  if (!p.body_zh) return "活動內容必填";
  if (!p.starts_at) return "開始時間必填";
  if (!p.ends_at) return "結束時間必填";
  if (new Date(p.starts_at) >= new Date(p.ends_at)) return "結束時間必須晚於開始時間";
  return null;
}

export async function createPromotionAction(
  _prev: unknown,
  formData: FormData
): Promise<ActionResult> {
  if (!(await isAdminLoggedIn())) return { ok: false, message: "未登入" };
  const supabase = getServiceRoleSupabase();
  if (!supabase) return { ok: false, message: "Supabase 尚未設定" };

  const data = parseForm(formData);
  const err = validate(data);
  if (err) return { ok: false, message: err };

  const { error } = await supabase.from("promotions").insert(data);
  if (error) return { ok: false, message: error.message };

  revalidatePath("/admin/promotions");
  revalidatePath("/");
  redirect("/admin/promotions");
}

export async function updatePromotionAction(
  id: string,
  _prev: unknown,
  formData: FormData
): Promise<ActionResult> {
  if (!(await isAdminLoggedIn())) return { ok: false, message: "未登入" };
  const supabase = getServiceRoleSupabase();
  if (!supabase) return { ok: false, message: "Supabase 尚未設定" };

  const data = parseForm(formData);
  const err = validate(data);
  if (err) return { ok: false, message: err };

  const { error } = await supabase.from("promotions").update(data).eq("id", id);
  if (error) return { ok: false, message: error.message };

  revalidatePath("/admin/promotions");
  revalidatePath(`/admin/promotions/${id}`);
  revalidatePath("/");
  return { ok: true, message: "已儲存" };
}

export async function deletePromotionAction(id: string): Promise<ActionResult> {
  if (!(await isAdminLoggedIn())) return { ok: false, message: "未登入" };
  const supabase = getServiceRoleSupabase();
  if (!supabase) return { ok: false, message: "Supabase 尚未設定" };

  const { error } = await supabase.from("promotions").delete().eq("id", id);
  if (error) return { ok: false, message: error.message };

  revalidatePath("/admin/promotions");
  revalidatePath("/");
  return { ok: true, message: "已刪除" };
}

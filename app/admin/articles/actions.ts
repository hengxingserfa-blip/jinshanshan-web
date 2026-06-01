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
  const slug = (formData.get("slug") as string | null)?.trim() ?? "";
  const category = (formData.get("category") as string | null)?.trim() ?? "";
  const category_en = (formData.get("category_en") as string | null)?.trim() ?? "";
  const title_zh = (formData.get("title_zh") as string | null)?.trim() ?? "";
  const excerpt_zh = (formData.get("excerpt_zh") as string | null)?.trim() || null;
  const content_zh = (formData.get("content_zh") as string | null) || null;
  const hero_image_url = (formData.get("hero_image_url") as string | null)?.trim() || null;
  const published = formData.get("published") === "on";
  const publishedRaw = (formData.get("published_at") as string | null) ?? "";
  const published_at = published
    ? publishedRaw
      ? new Date(publishedRaw).toISOString()
      : new Date().toISOString()
    : null;

  return {
    slug, category, category_en, title_zh, excerpt_zh, content_zh,
    hero_image_url, published, published_at,
  };
}

function validate(a: ReturnType<typeof parseForm>): string | null {
  if (!a.slug) return "slug 必填";
  if (!/^[a-z0-9-]+$/.test(a.slug)) return "slug 只能用小寫英文+數字+連字號";
  if (!a.category) return "中文分類必填";
  if (!a.category_en) return "英文分類必填";
  if (!a.title_zh) return "標題必填";
  return null;
}

export async function createArticleAction(
  _prev: unknown,
  formData: FormData
): Promise<ActionResult> {
  if (!(await isAdminLoggedIn())) return { ok: false, message: "未登入" };
  const supabase = getServiceRoleSupabase();
  if (!supabase) return { ok: false, message: "Supabase 尚未設定" };

  const data = parseForm(formData);
  const err = validate(data);
  if (err) return { ok: false, message: err };

  const { error } = await supabase.from("articles").insert(data);
  if (error) return { ok: false, message: error.message };

  revalidatePath("/admin/articles");
  revalidatePath("/articles");
  redirect("/admin/articles");
}

export async function updateArticleAction(
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

  const { error } = await supabase.from("articles").update(data).eq("id", id);
  if (error) return { ok: false, message: error.message };

  revalidatePath("/admin/articles");
  revalidatePath(`/admin/articles/${id}`);
  revalidatePath("/articles");
  return { ok: true, message: "已儲存" };
}

export async function deleteArticleAction(id: string): Promise<ActionResult> {
  if (!(await isAdminLoggedIn())) return { ok: false, message: "未登入" };
  const supabase = getServiceRoleSupabase();
  if (!supabase) return { ok: false, message: "Supabase 尚未設定" };

  const { error } = await supabase.from("articles").delete().eq("id", id);
  if (error) return { ok: false, message: error.message };

  revalidatePath("/admin/articles");
  revalidatePath("/articles");
  return { ok: true, message: "已刪除" };
}

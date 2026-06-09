"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

function admin() {
  if (!SUPABASE_URL || !SERVICE_KEY) return null;
  return createClient(SUPABASE_URL, SERVICE_KEY, {
    auth: { persistSession: false },
  });
}

interface State {
  ok: boolean;
  message: string;
}

type ParseResult =
  | { error: string }
  | {
      slug: string;
      name_zh: string;
      name_en: string | null;
      sort_order: number;
      parent_slug: string | null;
    };

function parseForm(formData: FormData): ParseResult {
  const slug = ((formData.get("slug") as string) || "").trim().toLowerCase();
  const name_zh = ((formData.get("name_zh") as string) || "").trim();
  const name_en = ((formData.get("name_en") as string) || "").trim() || null;
  const sort_order = Number(formData.get("sort_order") ?? 0);
  const parent_raw = ((formData.get("parent_slug") as string) || "").trim();
  const parent_slug = parent_raw && parent_raw !== "—" ? parent_raw : null;

  if (!slug || !/^[a-z0-9-]+$/.test(slug)) {
    return { error: "Slug 只能用小寫英文 / 數字 / 連字號 (例: my-custom)" };
  }
  if (!name_zh) return { error: "中文名稱必填" };
  if (parent_slug && parent_slug === slug) {
    return { error: "父分類不能是自己" };
  }
  return { slug, name_zh, name_en, sort_order, parent_slug };
}

export async function createCategoryAction(
  _: State,
  formData: FormData
): Promise<State> {
  const sb = admin();
  if (!sb) return { ok: false, message: "Supabase 未設定" };

  const parsed = parseForm(formData);
  if ("error" in parsed) return { ok: false, message: parsed.error };

  const { error } = await sb.from("product_categories").insert({
    slug: parsed.slug,
    name_zh: parsed.name_zh,
    name_en: parsed.name_en,
    sort_order: parsed.sort_order,
    parent_slug: parsed.parent_slug,
  });

  if (error) {
    if (error.code === "23505") {
      return { ok: false, message: `Slug "${parsed.slug}" 已存在,換一個` };
    }
    return { ok: false, message: error.message };
  }

  revalidatePath("/admin/categories");
  revalidatePath("/admin/products");
  revalidatePath("/products");
  revalidatePath("/");
  redirect("/admin/categories");
}

export async function updateCategoryAction(
  id: string,
  _: State,
  formData: FormData
): Promise<State> {
  const sb = admin();
  if (!sb) return { ok: false, message: "Supabase 未設定" };

  const parsed = parseForm(formData);
  if ("error" in parsed) return { ok: false, message: parsed.error };

  const { error } = await sb
    .from("product_categories")
    .update({
      slug: parsed.slug,
      name_zh: parsed.name_zh,
      name_en: parsed.name_en,
      sort_order: parsed.sort_order,
      parent_slug: parsed.parent_slug,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) {
    if (error.code === "23505") {
      return { ok: false, message: `Slug "${parsed.slug}" 已存在,換一個` };
    }
    return { ok: false, message: error.message };
  }

  revalidatePath("/admin/categories");
  revalidatePath("/admin/products");
  revalidatePath("/products");
  revalidatePath("/");
  return { ok: true, message: "已儲存" };
}

export async function deleteCategoryAction(id: string): Promise<State> {
  const sb = admin();
  if (!sb) return { ok: false, message: "Supabase 未設定" };

  // 檢查還有沒有商品掛在這分類
  const { data: cat } = await sb
    .from("product_categories")
    .select("slug")
    .eq("id", id)
    .maybeSingle();
  if (!cat) return { ok: false, message: "找不到這個分類" };

  const { count } = await sb
    .from("products")
    .select("id", { count: "exact", head: true })
    .eq("category", cat.slug);

  if (count && count > 0) {
    return {
      ok: false,
      message: `這分類底下還有 ${count} 件商品,請先改分類或刪除商品`,
    };
  }

  // 檢查還有沒有子分類
  const { count: childCount } = await sb
    .from("product_categories")
    .select("id", { count: "exact", head: true })
    .eq("parent_slug", cat.slug);
  if (childCount && childCount > 0) {
    return {
      ok: false,
      message: `這分類底下還有 ${childCount} 個子分類,請先刪除子分類`,
    };
  }

  const { error } = await sb.from("product_categories").delete().eq("id", id);
  if (error) return { ok: false, message: error.message };

  revalidatePath("/admin/categories");
  revalidatePath("/admin/products");
  return { ok: true, message: "已刪除" };
}

"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { isAdminLoggedIn } from "@/lib/admin/auth";
import { getServiceRoleSupabase } from "@/lib/supabase/server";

type ProductCategory =
  | "rings" | "necklaces" | "bracelets" | "wedding"
  | "newborn" | "bullion" | "custom";

interface ActionResult {
  ok: boolean;
  message: string;
}

function parseForm(formData: FormData) {
  const slug = (formData.get("slug") as string | null)?.trim() ?? "";
  const category = (formData.get("category") as string | null) ?? "";
  const name_zh = (formData.get("name_zh") as string | null)?.trim() ?? "";
  const name_en = (formData.get("name_en") as string | null)?.trim() || null;
  const description_zh = (formData.get("description_zh") as string | null)?.trim() || null;
  const image_url = (formData.get("image_url") as string | null)?.trim() || null;
  const weight_str = (formData.get("weight_qian") as string | null) ?? "";
  const purity = (formData.get("purity") as string | null)?.trim() || null;
  const featured = formData.get("featured") === "on";
  const available = formData.get("available") === "on";
  const sort_order = parseInt((formData.get("sort_order") as string | null) ?? "0", 10) || 0;

  const weight_qian = weight_str ? parseFloat(weight_str) : null;

  return {
    slug, category, name_zh, name_en, description_zh, image_url,
    weight_qian, purity, featured, available, sort_order,
  };
}

const ALLOWED_CATEGORIES: ProductCategory[] = [
  "rings", "necklaces", "bracelets", "wedding", "newborn", "bullion", "custom",
];

function validate(p: ReturnType<typeof parseForm>): string | null {
  if (!p.slug) return "slug 必填";
  if (!/^[a-z0-9-]+$/.test(p.slug)) return "slug 只能用小寫英文+數字+連字號";
  if (!p.category) return "分類必填";
  if (!ALLOWED_CATEGORIES.includes(p.category as ProductCategory)) return "分類值不合法";
  if (!p.name_zh) return "中文名稱必填";
  if (p.weight_qian !== null && (p.weight_qian < 0 || p.weight_qian > 9999)) return "金重需在 0 ~ 9999 之間";
  return null;
}

export async function createProductAction(
  _prev: unknown,
  formData: FormData
): Promise<ActionResult> {
  if (!(await isAdminLoggedIn())) return { ok: false, message: "未登入" };
  const supabase = getServiceRoleSupabase();
  if (!supabase) return { ok: false, message: "Supabase 尚未設定" };

  const data = parseForm(formData);
  const err = validate(data);
  if (err) return { ok: false, message: err };

  const { error } = await supabase.from("products").insert(data);
  if (error) return { ok: false, message: error.message };

  revalidatePath("/admin/products");
  revalidatePath("/products");
  revalidatePath("/");
  redirect("/admin/products");
}

export async function updateProductAction(
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

  const { error } = await supabase.from("products").update(data).eq("id", id);
  if (error) return { ok: false, message: error.message };

  revalidatePath("/admin/products");
  revalidatePath(`/admin/products/${id}`);
  revalidatePath("/products");
  revalidatePath("/");
  return { ok: true, message: "已儲存" };
}

export async function deleteProductAction(id: string): Promise<ActionResult> {
  if (!(await isAdminLoggedIn())) return { ok: false, message: "未登入" };
  const supabase = getServiceRoleSupabase();
  if (!supabase) return { ok: false, message: "Supabase 尚未設定" };

  const { error } = await supabase.from("products").delete().eq("id", id);
  if (error) return { ok: false, message: error.message };

  revalidatePath("/admin/products");
  revalidatePath("/products");
  return { ok: true, message: "已刪除" };
}

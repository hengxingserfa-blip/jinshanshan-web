"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { isAdminLoggedIn } from "@/lib/admin/auth";
import { getServiceRoleSupabase } from "@/lib/supabase/server";
import type { Translations } from "@/lib/supabase/types";

interface ActionResult {
  ok: boolean;
  message: string;
}

function parseTranslations(raw: unknown): Translations | null {
  if (typeof raw !== "string" || !raw.trim()) return null;
  try {
    const obj = JSON.parse(raw);
    if (!obj || typeof obj !== "object") return null;
    // 把每個語言空字串清掉,只保留有填的
    const cleaned: Translations = {};
    for (const lang of ["en", "vi", "id", "fil", "th"] as const) {
      const langObj = (obj as Record<string, unknown>)[lang];
      if (langObj && typeof langObj === "object") {
        const fields: Record<string, string> = {};
        for (const [k, v] of Object.entries(langObj as Record<string, unknown>)) {
          if (typeof v === "string" && v.trim().length > 0) {
            fields[k] = v.trim();
          }
        }
        if (Object.keys(fields).length > 0) {
          cleaned[lang] = fields;
        }
      }
    }
    return cleaned;
  } catch {
    return null;
  }
}

function parseForm(formData: FormData) {
  const slug = (formData.get("slug") as string | null)?.trim() ?? "";
  const category = (formData.get("category") as string | null)?.trim() ?? "";
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

  const labour_str = (formData.get("labour_fee") as string | null) ?? "";
  const labour_fee = labour_str ? parseFloat(labour_str) : null;
  const gold_str = (formData.get("selling_gold_price") as string | null) ?? "";
  const selling_gold_price = gold_str ? parseFloat(gold_str) : null;

  // 翻譯欄位從 hidden input "translations" 撈 JSON
  const translations = parseTranslations(formData.get("translations"));

  return {
    slug, category, name_zh, name_en, description_zh, image_url,
    weight_qian, purity, featured, available, sort_order, translations,
    labour_fee, selling_gold_price,
  };
}

// 從 DB 撈當前合法分類 slug (允許員工新增) — 失敗回 fallback 8 個
async function getAllowedCategorySlugs(): Promise<Set<string>> {
  const supabase = getServiceRoleSupabase();
  const fallback = new Set([
    "rings", "earrings", "necklaces", "bracelets",
    "wedding", "newborn", "bullion", "custom",
  ]);
  if (!supabase) return fallback;
  const { data, error } = await supabase
    .from("product_categories")
    .select("slug");
  if (error || !data) return fallback;
  return new Set(data.map((r: { slug: string }) => r.slug));
}

async function validate(p: ReturnType<typeof parseForm>): Promise<string | null> {
  if (!p.slug) return "slug 必填";
  // 放寬:允許大寫 (DB 裡 1000+ 舊資料含大寫 hash)
  if (!/^[A-Za-z0-9_-]+$/.test(p.slug)) return "slug 只能用英文字母 + 數字 + _ -";
  if (!p.category) return "分類必填";
  const allowed = await getAllowedCategorySlugs();
  if (!allowed.has(p.category)) {
    return `分類 "${p.category}" 不在 product_categories 表內,請先到分類管理新增`;
  }
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
  const err = await validate(data);
  if (err) return { ok: false, message: err };

  // translations 是 null 時要塞空物件(DB schema 預期 jsonb)
  const insert = { ...data, translations: data.translations ?? {} };
  const { error } = await supabase.from("products").insert(insert);
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
  const err = await validate(data);
  if (err) return { ok: false, message: err };

  const update = { ...data, translations: data.translations ?? {} };
  const { error } = await supabase.from("products").update(update).eq("id", id);
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

import type { Locale } from "./types";
import type { Translations } from "@/lib/supabase/types";

// 從 Supabase 的多語結構撈出對應語言的字串.
// 規則:
//  1. zh-TW → 用基準欄位 (例如 name_zh)
//  2. 其他語言 → 先看 translations[locale][field], 沒填就 fallback 回 zh
//
// 範例:
//   localize(product, product.translations, locale, "name", product.name_zh)
//
// field 是 translations JSON 裡的 key. 例如 product 用 "name" / "description".
// fallback 是 zh-TW 的基準值.

export function localize(
  translations: Translations | null | undefined,
  locale: Locale,
  field: string,
  fallback: string
): string;
export function localize(
  translations: Translations | null | undefined,
  locale: Locale,
  field: string,
  fallback: string | null
): string | null;
export function localize(
  translations: Translations | null | undefined,
  locale: Locale,
  field: string,
  fallback: string | null
): string | null {
  if (locale === "zh-TW") return fallback;
  const localized = translations?.[locale as Exclude<Locale, "zh-TW">]?.[field];
  if (typeof localized === "string" && localized.trim().length > 0) {
    return localized;
  }
  return fallback;
}

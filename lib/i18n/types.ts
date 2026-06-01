export const LOCALES = ["zh-TW", "vi", "en", "id", "fil", "th"] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "zh-TW";

export const LOCALE_META: Record<
  Locale,
  { short: string; native: string; htmlLang: string }
> = {
  "zh-TW": { short: "中", native: "繁體中文", htmlLang: "zh-TW" },
  vi:      { short: "Vi", native: "Tiếng Việt", htmlLang: "vi" },
  en:      { short: "EN", native: "English", htmlLang: "en" },
  id:      { short: "ID", native: "Bahasa Indonesia", htmlLang: "id" },
  fil:     { short: "Fil", native: "Filipino · Tagalog", htmlLang: "fil" },
  th:      { short: "Th", native: "ภาษาไทย", htmlLang: "th" },
};

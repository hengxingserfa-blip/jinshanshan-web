"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { DEFAULT_LOCALE, LOCALES, type Locale, LOCALE_META } from "./types";
import { DICTIONARY, type Dict } from "./dictionary";

const STORAGE_KEY = "jinshanshan-lang";

interface I18nContextValue {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: Dict;
}

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  // 為了避免 SSR hydration mismatch, 初始永遠用預設, 在 useEffect 才讀 localStorage
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && (LOCALES as readonly string[]).includes(saved)) {
        setLocaleState(saved as Locale);
        document.documentElement.lang = LOCALE_META[saved as Locale].htmlLang;
        return;
      }
      // 自動偵測瀏覽器語言(新訪客第一次來)
      const browserLang = (navigator.language || "").toLowerCase();
      const langMap: Array<[string, Locale]> = [
        ["vi",  "vi"],   // Vietnamese
        ["id",  "id"],   // Indonesian
        ["in",  "id"],   // legacy Indonesian code
        ["ms",  "id"],   // Malay close enough
        ["fil", "fil"],  // Filipino
        ["tl",  "fil"],  // Tagalog
        ["th",  "th"],   // Thai
        ["en",  "en"],   // English
      ];
      for (const [prefix, locale] of langMap) {
        if (browserLang.startsWith(prefix)) {
          setLocaleState(locale);
          document.documentElement.lang = LOCALE_META[locale].htmlLang;
          return;
        }
      }
      // 預設 zh-TW,不用改
    } catch {
      // 例如 localStorage 被阻擋,就無視
    }
  }, []);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    try {
      localStorage.setItem(STORAGE_KEY, l);
      document.documentElement.lang = LOCALE_META[l].htmlLang;
    } catch {
      // ignore
    }
  }, []);

  const t = DICTIONARY[locale] ?? DICTIONARY[DEFAULT_LOCALE];

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    // Fallback: 沒在 Provider 內也回預設, 避免出錯
    return {
      locale: DEFAULT_LOCALE,
      setLocale: () => {},
      t: DICTIONARY[DEFAULT_LOCALE],
    };
  }
  return ctx;
}

export function useT(): Dict {
  return useI18n().t;
}

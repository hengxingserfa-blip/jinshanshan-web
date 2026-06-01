"use client";

import { LOCALES, LOCALE_META, type Locale } from "@/lib/i18n/types";
import { useI18n } from "@/lib/i18n/provider";

function GlobeIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20" />
      <path d="M12 2a15 15 0 0 1 4 10 15 15 0 0 1-4 10 15 15 0 0 1-4-10 15 15 0 0 1 4-10z" />
    </svg>
  );
}

export default function LanguageSwitcher() {
  const { locale, setLocale, t } = useI18n();

  return (
    <div className="relative flex items-center gap-2 md:gap-3 shrink-0">
      <span className="hidden md:flex items-center gap-1.5 text-xs tracking-[0.25em] uppercase text-gold-300 font-sans font-medium shrink-0">
        <GlobeIcon />
        {t.topbar.language}
      </span>
      <span className="md:hidden text-gold-300 shrink-0">
        <GlobeIcon />
      </span>

      <div className="flex items-center gap-1 md:gap-1.5 overflow-x-auto scrollbar-none">
        {LOCALES.map((code) => {
          const meta = LOCALE_META[code];
          const active = code === locale;
          return (
            <button
              key={code}
              type="button"
              onClick={() => setLocale(code as Locale)}
              title={meta.native}
              aria-label={meta.native}
              aria-pressed={active}
              className={`shrink-0 min-w-[40px] px-3 md:px-3.5 py-1 md:py-1.5 text-sm md:text-base tracking-wide font-sans font-medium transition-all border ${
                active
                  ? "bg-gold-400 text-ink-950 border-gold-400 shadow-[0_0_14px_rgba(214,180,120,0.5)]"
                  : "bg-white/15 text-white/95 border-white/55 hover:bg-gold-500/25 hover:border-gold-300 hover:text-white"
              }`}
            >
              {meta.short}
            </button>
          );
        })}
      </div>
    </div>
  );
}

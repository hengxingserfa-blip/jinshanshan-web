"use client";

import { useEffect, useState } from "react";

const LANGS = [
  { code: "zh-TW", label: "中",   native: "繁體中文" },
  { code: "vi",    label: "Vi",  native: "Tiếng Việt" },
  { code: "en",    label: "EN",  native: "English" },
  { code: "id",    label: "ID",  native: "Bahasa Indonesia" },
  { code: "fil",   label: "Fil", native: "Filipino · Tagalog" },
  { code: "th",    label: "Th",  native: "ภาษาไทย" },
] as const;

const STORAGE_KEY = "jinshanshan-lang";

function GlobeIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20" />
      <path d="M12 2a15 15 0 0 1 4 10 15 15 0 0 1-4 10 15 15 0 0 1-4-10 15 15 0 0 1 4-10z" />
    </svg>
  );
}

export default function LanguageSwitcher() {
  const [lang, setLang] = useState<string>("zh-TW");
  const [hint, setHint] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) setLang(saved);
  }, []);

  const select = (code: string, native: string) => {
    setLang(code);
    localStorage.setItem(STORAGE_KEY, code);
    if (code === "zh-TW") {
      setHint(null);
      return;
    }
    setHint(`${native} · 翻譯版本準備中`);
    setTimeout(() => setHint(null), 2600);
  };

  return (
    <div className="relative flex items-center gap-2 md:gap-3 shrink-0">
      <span className="hidden md:flex items-center gap-1.5 text-xs tracking-[0.25em] uppercase text-gold-300 font-sans font-medium shrink-0">
        <GlobeIcon />
        Language
      </span>
      <span className="md:hidden text-gold-300 shrink-0">
        <GlobeIcon />
      </span>

      <div className="flex items-center gap-1 md:gap-1.5 overflow-x-auto scrollbar-none">
        {LANGS.map((l) => {
          const active = l.code === lang;
          return (
            <button
              key={l.code}
              type="button"
              onClick={() => select(l.code, l.native)}
              title={l.native}
              aria-label={l.native}
              aria-pressed={active}
              className={`shrink-0 min-w-[40px] px-3 md:px-3.5 py-1 md:py-1.5 text-sm md:text-base tracking-wide font-sans font-medium transition-all border ${
                active
                  ? "bg-gold-400 text-ink-950 border-gold-400 shadow-[0_0_14px_rgba(214,180,120,0.5)]"
                  : "bg-white/15 text-white/95 border-white/55 hover:bg-gold-500/25 hover:border-gold-300 hover:text-white"
              }`}
            >
              {l.label}
            </button>
          );
        })}
      </div>

      {hint && (
        <div className="absolute top-full right-0 mt-2 bg-ivory-50 text-ink-950 text-[11px] tracking-wider px-3 py-2 shadow-lg border border-gold-300 whitespace-nowrap z-50 animate-fade-in">
          <span className="inline-block w-1.5 h-1.5 rotate-45 bg-gold-500 mr-2 align-middle" />
          {hint}
        </div>
      )}
    </div>
  );
}

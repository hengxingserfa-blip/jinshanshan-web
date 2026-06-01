"use client";

import { useState } from "react";
import type { Translations } from "@/lib/supabase/types";

// 後台用的多語編輯區. 5 個語言 tab, 每個 tab 可填多個欄位.
//
// 用法:
//   <TranslationsEditor
//     name="translations"                        // form 欄位名
//     fields={[
//       { key: "name", label: "名稱", base: "經典平面戒指" },
//       { key: "description", label: "描述", base: "純度 9999...", multiline: true },
//     ]}
//     defaultValue={defaults?.translations}
//   />
//
// 送出時會把整個 JSON 字串塞進 hidden input "translations",
// server action 自己 JSON.parse 即可.

type LocaleKey = "en" | "vi" | "id" | "fil" | "th";

const LANGS: { key: LocaleKey; native: string; flag: string }[] = [
  { key: "en",  native: "English",          flag: "EN" },
  { key: "vi",  native: "Tiếng Việt",       flag: "VI" },
  { key: "id",  native: "Bahasa Indonesia", flag: "ID" },
  { key: "fil", native: "Filipino",         flag: "FIL" },
  { key: "th",  native: "ภาษาไทย",          flag: "TH" },
];

interface FieldSpec {
  key: string;         // translations.en[key]
  label: string;       // 顯示給後台的標籤
  base: string | null; // 中文基準, 顯示在 placeholder
  multiline?: boolean;
}

interface Props {
  name: string;
  fields: FieldSpec[];
  defaultValue?: Translations | null;
}

export default function TranslationsEditor({ name, fields, defaultValue }: Props) {
  const [active, setActive] = useState<LocaleKey>("en");
  const [values, setValues] = useState<Translations>(() => ({
    en: defaultValue?.en ?? {},
    vi: defaultValue?.vi ?? {},
    id: defaultValue?.id ?? {},
    fil: defaultValue?.fil ?? {},
    th: defaultValue?.th ?? {},
  }));

  const setField = (lang: LocaleKey, field: string, val: string) => {
    setValues((prev) => ({
      ...prev,
      [lang]: { ...(prev[lang] ?? {}), [field]: val },
    }));
  };

  const filledCount = (lang: LocaleKey) => {
    const obj = values[lang] ?? {};
    return fields.filter((f) => (obj[f.key] ?? "").trim().length > 0).length;
  };

  return (
    <div className="bg-ivory-50 border border-ink-950/10 p-6">
      <div className="flex items-baseline justify-between mb-4">
        <p className="text-xs tracking-[0.2em] text-gold-700 uppercase font-medium">
          多語翻譯(選填,沒填會 fallback 到中文)
        </p>
        <p className="text-[10px] tracking-wider text-ink-400">
          中文走原本欄位
        </p>
      </div>

      <div className="flex gap-1 mb-5 border-b border-ink-950/10 overflow-x-auto scrollbar-none">
        {LANGS.map((l) => {
          const filled = filledCount(l.key);
          return (
            <button
              key={l.key}
              type="button"
              onClick={() => setActive(l.key)}
              className={`shrink-0 px-4 py-2 text-xs tracking-wider font-medium border-b-2 transition-colors ${
                active === l.key
                  ? "border-gold-500 text-ink-950 bg-white"
                  : "border-transparent text-ink-400 hover:text-ink-700"
              }`}
            >
              {l.flag} · {l.native}
              {filled > 0 && (
                <span className="ml-2 inline-block min-w-[18px] px-1.5 py-0.5 bg-gold-500 text-ink-950 text-[10px] rounded-full">
                  {filled}
                </span>
              )}
            </button>
          );
        })}
      </div>

      <div className="space-y-4">
        {fields.map((f) => {
          const val = values[active]?.[f.key] ?? "";
          const inputClass =
            "w-full bg-white border border-ink-950/15 focus:border-gold-500 focus:outline-none py-2 px-3 text-ink-950 text-sm";
          return (
            <label key={f.key} className="block">
              <div className="flex items-baseline justify-between mb-1.5">
                <span className="text-xs text-ink-700 font-medium">{f.label}</span>
                {f.base && (
                  <span className="text-[10px] text-ink-400 italic truncate max-w-[60%]">
                    中:{f.base.slice(0, 30)}
                    {f.base.length > 30 && "…"}
                  </span>
                )}
              </div>
              {f.multiline ? (
                <textarea
                  value={val}
                  onChange={(e) => setField(active, f.key, e.target.value)}
                  rows={3}
                  className={inputClass}
                  placeholder={`${LANGS.find((l) => l.key === active)?.native} 翻譯(選填)`}
                />
              ) : (
                <input
                  type="text"
                  value={val}
                  onChange={(e) => setField(active, f.key, e.target.value)}
                  className={inputClass}
                  placeholder={`${LANGS.find((l) => l.key === active)?.native} 翻譯(選填)`}
                />
              )}
            </label>
          );
        })}
      </div>

      <input type="hidden" name={name} value={JSON.stringify(values)} />
    </div>
  );
}

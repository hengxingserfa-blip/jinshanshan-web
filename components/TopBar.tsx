"use client";

import Link from "next/link";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useI18n, useT } from "@/lib/i18n/provider";
import { localize } from "@/lib/i18n/localize";
import type { Promotion } from "@/lib/supabase/types";

interface Props {
  promo: Promotion | null;
}

export default function TopBar({ promo }: Props) {
  const t = useT();
  const { locale } = useI18n();

  // 有 server promo 用其翻譯欄位; 沒有就用字典預設
  const title = promo
    ? localize(promo.translations, locale, "title", promo.title_zh)
    : t.topbar.promo_title_default;
  const body = promo
    ? localize(promo.translations, locale, "body", promo.body_zh)
    : t.topbar.promo_body_default;
  const ctaLabel = promo
    ? localize(promo.translations, locale, "cta_label", promo.cta_label ?? "")
    : t.topbar.promo_cta_default;
  const ctaUrl = promo?.cta_url ?? "/#contact";

  return (
    <div className="bg-ink-950 text-ivory-50 border-b border-gold-500/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-10 py-3 flex items-center justify-between gap-4">
        <div className="hidden md:flex items-center gap-3 text-[11px] tracking-wider min-w-0">
          <span className="inline-block w-1.5 h-1.5 rotate-45 bg-gold-400 shrink-0" />
          <span className="font-sans font-medium tracking-[0.2em] text-gold-300 uppercase shrink-0 text-xs">
            {title}
          </span>
          <span className="text-ivory-50/40">·</span>
          <span className="font-light text-ivory-50/90 truncate">
            {body}{" "}
            <Link
              href={ctaUrl}
              className="text-gold-300 hover:text-gold-200 underline-offset-4 hover:underline"
            >
              {ctaLabel} →
            </Link>
          </span>
        </div>

        <Link
          href={ctaUrl}
          className="md:hidden font-sans font-medium tracking-[0.2em] text-xs text-gold-300 uppercase shrink-0"
        >
          {title} →
        </Link>

        <LanguageSwitcher />
      </div>
    </div>
  );
}

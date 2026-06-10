"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useI18n, useT } from "@/lib/i18n/provider";
import { localize } from "@/lib/i18n/localize";
import type { Promotion } from "@/lib/supabase/types";

interface Props {
  promo: Promotion;
}

// 活動彈窗 — 每次進首頁都顯示
export default function PromoPopup({ promo }: Props) {
  const t = useT();
  const { locale } = useI18n();
  const pb = t.promo_banner;
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // 0.5 秒後開,讓首頁先 paint 不影響 LCP
    const tm = setTimeout(() => setOpen(true), 500);
    return () => clearTimeout(tm);
  }, []);

  // ESC 關
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [open]);

  const close = () => setOpen(false);

  if (!open || !promo.poster_url) return null;

  const title = localize(promo.translations, locale, "title", promo.title_zh);
  const ctaLabel = localize(
    promo.translations,
    locale,
    "cta_label",
    promo.cta_label
  );

  return (
    <div
      onClick={close}
      role="dialog"
      aria-modal="true"
      aria-label={pb.eyebrow_main}
      className="fixed inset-0 z-[200] bg-ink-950/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fade-in"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative bg-ivory-50 max-w-md w-full max-h-[92vh] overflow-y-auto shadow-2xl"
      >
        {/* 關閉按鈕 */}
        <button
          type="button"
          onClick={close}
          aria-label="Close"
          className="absolute top-3 right-3 z-10 w-10 h-10 flex items-center justify-center bg-ivory-50/90 hover:bg-ink-950 hover:text-ivory-50 text-ink-950 backdrop-blur-sm transition-colors rounded-full text-2xl leading-none"
        >
          ×
        </button>

        {/* 海報圖 */}
        <div className="relative w-full" style={{ minHeight: 200 }}>
          <Image
            src={promo.poster_url}
            alt={title}
            width={1080}
            height={1920}
            sizes="(max-width: 640px) 100vw, 448px"
            className="w-full h-auto block"
            priority
            unoptimized
          />
        </div>

        {/* CTA 按鈕 (選填) */}
        {promo.cta_url && (
          <div className="p-4 sm:p-5 border-t border-ink-950/8">
            <Link
              href={promo.cta_url}
              onClick={close}
              className="block w-full text-center bg-ink-950 hover:bg-gold-500 hover:text-ivory-50 hover:bg-gold-500 text-ivory-50 px-6 py-3.5 text-sm tracking-[0.3em] font-display uppercase transition-colors"
            >
              {ctaLabel || pb.cta_default}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

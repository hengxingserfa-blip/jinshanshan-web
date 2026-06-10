"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Props {
  posterUrl: string;
  titleZh?: string | null;
  ctaUrl?: string | null;
  ctaLabel?: string | null;
}

// 活動彈窗 — 每次進首頁都顯示
export default function PromoPopup({
  posterUrl,
  titleZh,
  ctaUrl,
  ctaLabel,
}: Props) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // 0.5 秒後開,讓首頁先 paint 不影響 LCP
    const t = setTimeout(() => setOpen(true), 500);
    return () => clearTimeout(t);
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

  if (!open) return null;

  return (
    <div
      onClick={close}
      role="dialog"
      aria-modal="true"
      aria-label="當月活動"
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
          aria-label="關閉"
          className="absolute top-3 right-3 z-10 w-10 h-10 flex items-center justify-center bg-ivory-50/90 hover:bg-ink-950 hover:text-ivory-50 text-ink-950 backdrop-blur-sm transition-colors rounded-full text-2xl leading-none"
        >
          ×
        </button>

        {/* 海報圖 */}
        <div className="relative w-full" style={{ minHeight: 200 }}>
          <Image
            src={posterUrl}
            alt={titleZh ?? "金閃閃銀樓 當月活動"}
            width={1080}
            height={1920}
            sizes="(max-width: 640px) 100vw, 448px"
            className="w-full h-auto block"
            priority
            unoptimized
          />
        </div>

        {/* CTA 按鈕 (選填) */}
        {ctaUrl && (
          <div className="p-4 sm:p-5 border-t border-ink-950/8">
            <Link
              href={ctaUrl}
              onClick={close}
              className="block w-full text-center bg-ink-950 hover:bg-gold-500 hover:text-ink-950 text-ivory-50 px-6 py-3.5 text-sm tracking-[0.3em] font-display uppercase transition-colors"
            >
              {ctaLabel || "看更多 →"}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

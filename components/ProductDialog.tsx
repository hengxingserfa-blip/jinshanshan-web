"use client";

import Image from "next/image";
import { useEffect } from "react";
import { useI18n, useT } from "@/lib/i18n/provider";
import { localize } from "@/lib/i18n/localize";
import type { Product } from "@/lib/supabase/types";

const LINE_OA = process.env.NEXT_PUBLIC_LINE_OA_ID || "452rajhx";

const CATEGORY_LABELS_EN: Record<string, string> = {
  rings: "Rings",
  earrings: "Earrings",
  necklaces: "Necklaces",
  bracelets: "Bracelets",
  wedding: "Wedding",
  newborn: "Newborn",
  bullion: "Bullion",
  custom: "Custom",
};

interface Props {
  product: Product | null;
  onClose: () => void;
}

export default function ProductDialog({ product, onClose }: Props) {
  const t = useT();
  const { locale } = useI18n();

  useEffect(() => {
    if (!product) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [product, onClose]);

  if (!product) return null;

  const name = localize(product.translations, locale, "name", product.name_zh);
  const cleanName = name.replace(/\s*·\s*[\d.]+\s*錢\s*$/, "");
  const en = CATEGORY_LABELS_EN[product.category] ?? "Item";
  const zh = t.category_bar[product.category as keyof typeof t.category_bar] ?? "";

  const lineMsg = `您好,我想詢問這款金飾:\n${cleanName}${product.weight_qian ? ` · ${product.weight_qian} 錢` : ""}\n(SKU: ${product.slug})`;
  const lineUrl = `https://line.me/R/oaMessage/@${LINE_OA}/?${encodeURIComponent(lineMsg)}`;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="product-dialog-title"
      className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-6 bg-ink-950/85 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative bg-ivory-50 w-full md:max-w-5xl md:max-h-[92vh] h-full md:h-auto overflow-y-auto md:overflow-hidden md:rounded-sm"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="關閉"
          className="absolute top-3 right-3 z-10 w-10 h-10 flex items-center justify-center bg-ivory-50/90 hover:bg-ink-950 hover:text-ivory-50 text-ink-950 backdrop-blur-sm transition-colors rounded-full text-2xl leading-none"
        >
          ×
        </button>

        <div className="grid md:grid-cols-2 gap-0">
          <div className="relative aspect-square md:aspect-auto md:h-[92vh] bg-ivory-100">
            {product.image_url && (
              <Image
                src={product.image_url}
                alt={product.name_en ?? product.name_zh}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-contain"
                unoptimized
                priority
              />
            )}
          </div>

          <div className="p-8 md:p-12 flex flex-col">
            <p className="font-display tracking-[0.4em] text-[10px] text-gold-600 uppercase mb-3">
              {en} · {zh}
            </p>
            <h2
              id="product-dialog-title"
              className="font-display text-3xl md:text-4xl text-ink-950 mb-3 leading-tight"
            >
              {cleanName}
            </h2>
            {product.name_en && locale !== "en" && (
              <p className="text-sm tracking-wider text-ink-400 mb-6 font-serif italic">
                {product.name_en}
              </p>
            )}

            <div className="border-y border-ink-950/8 py-5 my-5 grid grid-cols-2 gap-4">
              <div>
                <p className="text-[10px] tracking-[0.3em] text-ink-400 font-display uppercase mb-1.5">
                  純度 Purity
                </p>
                <p className="text-ink-950 text-base">{product.purity || "9999 純金"}</p>
              </div>
              <div>
                <p className="text-[10px] tracking-[0.3em] text-ink-400 font-display uppercase mb-1.5">
                  重量 Weight
                </p>
                <p className="text-ink-950 text-base">
                  {product.weight_qian ? `${product.weight_qian} 錢` : "現場確認"}
                </p>
              </div>
              <div>
                <p className="text-[10px] tracking-[0.3em] text-ink-400 font-display uppercase mb-1.5">
                  款式編號 SKU
                </p>
                <p className="text-ink-950 text-xs tracking-wider font-mono">{product.slug}</p>
              </div>
              <div>
                <p className="text-[10px] tracking-[0.3em] text-ink-400 font-display uppercase mb-1.5">
                  庫存 Stock
                </p>
                <p className="text-ink-950 text-base">{product.available ? "現貨可看" : "需詢問"}</p>
              </div>
            </div>

            <p className="text-sm text-ink-700 leading-loose font-light mb-8">
              這款金飾為實際庫存。歡迎來店試戴,或透過 LINE 預約看貨;若想要相近重量、款式可以提出,我們為您整理出來。
            </p>

            <div className="flex flex-col gap-3 mt-auto">
              <a
                href={lineUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-between bg-[#06C755] text-white hover:opacity-90 px-6 py-4 text-sm tracking-[0.3em] font-display uppercase transition-opacity"
              >
                <span>LINE 詢問此款</span>
                <span>→</span>
              </a>
              <a
                href="tel:+88632805908"
                className="inline-flex items-center justify-between bg-ink-950 text-ivory-50 hover:bg-gold-500 hover:text-ink-950 px-6 py-4 text-sm tracking-[0.3em] font-display uppercase transition-colors"
              >
                <span>來電 (03) 280-5908</span>
                <span>→</span>
              </a>
              <a
                href="/reserve"
                className="inline-flex items-center justify-between border border-ink-950/30 text-ink-950 hover:border-gold-500 hover:text-gold-600 px-6 py-4 text-sm tracking-[0.3em] font-display uppercase transition-colors"
              >
                <span>預約看店</span>
                <span>→</span>
              </a>
            </div>

            <p className="text-[10px] tracking-wider text-ink-400 font-display mt-6 text-center">
              ※ 金價每日浮動 · 以來店現場為準
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

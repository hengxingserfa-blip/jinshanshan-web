"use client";

import Ornament from "@/components/Ornament";
import { useT } from "@/lib/i18n/provider";
import type { Dict } from "@/lib/i18n/dictionary";

type PageKey =
  | "services"
  | "products"
  | "about"
  | "faq"
  | "journal"
  | "reserve";

interface Props {
  page?: PageKey;
  // 也可以直接傳字串(向後相容,例如商品詳情頁用商品名作為標題)
  eyebrow?: string;
  title?: string;
  subtitle?: string;
}

const KEY_MAP: Record<PageKey, { eyebrow: keyof Dict["page_titles"]; title: keyof Dict["page_titles"]; sub: keyof Dict["page_titles"] }> = {
  services: { eyebrow: "services_eyebrow", title: "services_title", sub: "services_sub" },
  products: { eyebrow: "products_eyebrow", title: "products_title", sub: "products_sub" },
  about:    { eyebrow: "about_eyebrow",    title: "about_title",    sub: "about_sub" },
  faq:      { eyebrow: "faq_eyebrow",      title: "faq_title",      sub: "faq_sub" },
  journal:  { eyebrow: "journal_eyebrow",  title: "journal_title",  sub: "journal_sub" },
  reserve:  { eyebrow: "reserve_eyebrow",  title: "reserve_title",  sub: "reserve_sub" },
};

export default function PageHero({ page, eyebrow, title, subtitle }: Props) {
  const t = useT();

  let eyebrowText = eyebrow ?? "";
  let titleText = title ?? "";
  let subtitleText = subtitle ?? "";

  if (page) {
    const keys = KEY_MAP[page];
    eyebrowText = t.page_titles[keys.eyebrow];
    titleText = t.page_titles[keys.title];
    subtitleText = t.page_titles[keys.sub];
  }

  return (
    <section className="bg-ivory-50 border-b border-ink-950/8 subtle-noise">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 pt-28 md:pt-36 pb-24 md:pb-32 text-center">
        <p className="font-display tracking-[0.5em] text-gold-600 text-[10px] mb-10 uppercase animate-fade-in">
          {eyebrowText}
        </p>
        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-ink-950 mb-10 leading-[1.05] animate-fade-up">
          {titleText}
        </h1>
        <Ornament className="mb-10" />
        {subtitleText && (
          <p className="text-sm md:text-base text-ink-700 max-w-xl mx-auto leading-loose font-light animate-fade-up">
            {subtitleText}
          </p>
        )}
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { useI18n } from "@/lib/i18n/provider";
import { localize } from "@/lib/i18n/localize";
import type { Article } from "@/lib/supabase/types";

const formatDate = (iso: string | null) =>
  iso ? iso.slice(0, 10).replace(/-/g, ".") : "";

interface Props {
  articles: Article[];
}

export default function ArticlesGrid({ articles }: Props) {
  const { locale } = useI18n();

  return (
    <div className="grid md:grid-cols-2 gap-x-10 gap-y-20">
      {articles.map((a) => {
        const title = localize(a.translations, locale, "title", a.title_zh);
        const excerpt = localize(a.translations, locale, "excerpt", a.excerpt_zh);
        return (
          <Link key={a.id} href={`/articles/${a.slug}`} className="group block">
            <div className="aspect-[16/10] relative overflow-hidden bg-ivory-100">
              {a.hero_image_url && (
                <Image
                  src={a.hero_image_url}
                  alt={a.title_zh}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover group-hover:scale-[1.04] transition-transform duration-[1200ms] ease-out"
                />
              )}
            </div>
            <div className="pt-7">
              <div className="flex items-center gap-4 mb-4">
                <p className="font-display tracking-[0.35em] text-[10px] text-gold-600 uppercase">
                  {a.category_en} · {a.category}
                </p>
                <span className="text-ink-400/40">/</span>
                <p className="text-[10px] tracking-[0.25em] text-ink-400 font-display">
                  {formatDate(a.published_at)}
                </p>
              </div>
              <h2 className="font-display text-2xl md:text-3xl text-ink-950 mb-4 leading-snug group-hover:text-gold-700 transition-colors">
                {title}
              </h2>
              {excerpt && (
                <p className="text-sm text-ink-700 leading-loose font-light">
                  {excerpt}
                </p>
              )}
              <p className="mt-6 font-display text-[10px] tracking-[0.35em] uppercase text-ink-400 group-hover:text-gold-600 transition-colors">
                Read More →
              </p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { IMG } from "@/lib/images";
import Ornament from "@/components/Ornament";
import { useT } from "@/lib/i18n/provider";

export default function OccasionCategories() {
  const t = useT();

  const occasions = [
    { en: "Wedding",      title: t.occasions.wedding_title,      desc: t.occasions.wedding_desc,      img: IMG.pair,      href: "/products?category=wedding" },
    { en: "Newborn",      title: t.occasions.newborn_title,      desc: t.occasions.newborn_desc,      img: IMG.fancy,     href: "/products?category=newborn" },
    { en: "Engagement",   title: t.occasions.engagement_title,   desc: t.occasions.engagement_desc,   img: IMG.ring1,     href: "/products?category=rings" },
    { en: "Mother's Day", title: t.occasions.mothers_day_title,  desc: t.occasions.mothers_day_desc,  img: IMG.necklace2, href: "/products?category=necklaces" },
    { en: "New Year",     title: t.occasions.new_year_title,     desc: t.occasions.new_year_desc,     img: IMG.bar,       href: "/products?category=custom" },
    { en: "Investment",   title: t.occasions.investment_title,   desc: t.occasions.investment_desc,   img: IMG.bracelet1, href: "/products?category=bullion" },
  ];

  return (
    <section className="bg-white py-32 md:py-44 border-y border-ink-950/8">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <div className="text-center mb-20 md:mb-24">
          <p className="font-display tracking-[0.5em] text-gold-600 text-[10px] mb-8 uppercase">
            {t.occasions.eyebrow}
          </p>
          <h2 className="font-display text-5xl md:text-7xl text-ink-950">
            {t.occasions.title_a}
            <br />
            <span className="italic font-serif gold-foil">
              {t.occasions.title_b}
            </span>
          </h2>
          <Ornament className="mt-10" />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-ink-950/8 border border-ink-950/8">
          {occasions.map((o) => (
            <Link
              key={o.title}
              href={o.href}
              className="group bg-white hover:bg-ivory-50 transition-colors p-8 md:p-10 flex gap-6"
            >
              <div className="shrink-0 w-24 h-24 md:w-28 md:h-28 relative overflow-hidden bg-ivory-100">
                <Image
                  src={o.img}
                  alt={o.title}
                  fill
                  sizes="120px"
                  className="object-cover group-hover:scale-[1.06] transition-transform duration-[1400ms]"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-display tracking-[0.4em] text-[10px] text-gold-600 uppercase mb-2">
                  {o.en}
                </p>
                <h3 className="font-display text-xl md:text-2xl text-ink-950 mb-3">
                  {o.title}
                </h3>
                <p className="text-xs text-ink-700 leading-loose font-light mb-3">
                  {o.desc}
                </p>
                <span className="inline-flex items-center gap-2 text-[10px] tracking-[0.35em] uppercase font-display text-ink-400 group-hover:text-gold-600 transition-colors">
                  {t.occasions.explore} <span className="transition-transform group-hover:translate-x-1">→</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

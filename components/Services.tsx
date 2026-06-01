"use client";

import Link from "next/link";
import Ornament from "@/components/Ornament";
import { useT } from "@/lib/i18n/provider";

export default function Services() {
  const t = useT();

  const services = [
    { num: "I",   en: "Renewal",     title: t.services.renewal_title,     body: t.services.renewal_body },
    { num: "II",  en: "Recycle",     title: t.services.recycle_title,     body: t.services.recycle_body },
    { num: "III", en: "Boutique",    title: t.services.boutique_title,    body: t.services.boutique_body },
    { num: "IV",  en: "Restoration", title: t.services.restoration_title, body: t.services.restoration_body },
  ];

  return (
    <section id="services" className="relative bg-ivory-50 py-32 md:py-44 subtle-noise">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <div className="text-center mb-24 md:mb-32">
          <p className="font-display tracking-[0.5em] text-gold-600 text-[10px] mb-8 uppercase">
            {t.services.eyebrow}
          </p>
          <h2 className="font-display text-5xl md:text-7xl text-ink-950 mb-10">
            {t.services.title_a}
            <span className="italic font-serif text-gold-500"> {t.services.title_b}</span>
          </h2>
          <Ornament className="mb-10" />
          <p className="text-ink-700 max-w-xl mx-auto text-sm leading-loose font-light">
            {t.services.intro_a}
            <br />
            {t.services.intro_b}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-ink-950/10 border border-ink-950/10">
          {services.map((s) => (
            <div
              key={s.title}
              className="relative bg-ivory-50 hover:bg-white p-12 md:p-14 transition-colors group overflow-hidden min-h-[360px]"
            >
              <span className="absolute -top-6 -right-2 font-display text-[10rem] md:text-[12rem] text-gold-200/50 leading-none pointer-events-none select-none group-hover:text-gold-300/60 transition-colors">
                {s.num}
              </span>
              <div className="relative">
                <p className="font-display tracking-[0.45em] text-[10px] text-gold-600 uppercase mb-5">
                  {s.en}
                </p>
                <h3 className="font-display text-2xl md:text-3xl text-ink-950 mb-6">
                  {s.title}
                </h3>
                <div className="w-10 gold-line h-px mb-6" />
                <p className="text-sm leading-loose text-ink-700 font-light">
                  {s.body}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-20">
          <Link
            href="/services"
            className="group inline-flex items-center gap-3 text-[10px] tracking-[0.4em] uppercase font-display text-ink-950 pb-2 border-b border-ink-950 hover:border-gold-500 hover:text-gold-600 transition-colors"
          >
            <span>{t.services.discover_all}</span>
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

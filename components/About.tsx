"use client";

import Image from "next/image";
import Link from "next/link";
import { IMG } from "@/lib/images";
import Ornament from "@/components/Ornament";
import { useT } from "@/lib/i18n/provider";

export default function About() {
  const t = useT();
  return (
    <section id="about" className="bg-ivory-50 py-32 md:py-44 subtle-noise">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 grid lg:grid-cols-12 gap-16 lg:gap-24 items-center">
        <div className="lg:col-span-7 relative">
          <div className="aspect-[4/5] relative overflow-hidden bg-ivory-100 group">
            <Image
              src={IMG.aboutAtmosphere}
              alt="金閃閃銀樓"
              fill
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover group-hover:scale-[1.05] transition-transform duration-[1600ms]"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-ink-950/30" />
          </div>
          <div className="absolute -top-4 -left-4 hidden md:block">
            <p className="font-display tracking-[0.5em] text-[10px] text-gold-600 uppercase bg-ivory-50 px-4 py-2">
              The Maison
            </p>
          </div>
        </div>

        <div className="lg:col-span-5">
          <p className="font-display tracking-[0.5em] text-gold-600 text-[10px] mb-10 uppercase">
            {t.about_section.eyebrow}
          </p>
          <h2 className="font-display text-4xl md:text-6xl text-ink-950 mb-10 leading-[1.05]">
            {t.about_section.title_a}
            <br />
            <span className="italic font-serif gold-foil">{t.about_section.title_b}</span>
          </h2>
          <Ornament className="mb-10 !justify-start" />
          <div className="space-y-6 text-ink-700 leading-loose text-sm md:text-base font-light">
            <p>{t.about_section.body_1}</p>
            <p>{t.about_section.body_2}</p>
            <p>
              <span className="text-ink-950">{t.about_section.body_3_strong}</span>
              {t.about_section.body_3_after}
            </p>
          </div>

          <div className="mt-14">
            <Link
              href="/about"
              className="group inline-flex items-center gap-3 text-[10px] tracking-[0.4em] uppercase font-display text-ink-950 pb-2 border-b border-ink-950 hover:border-gold-500 hover:text-gold-600 transition-colors"
            >
              <span>{t.about_section.full_story}</span>
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

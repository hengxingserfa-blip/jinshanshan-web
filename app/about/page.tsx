"use client";

import Image from "next/image";
import { IMG } from "@/lib/images";
import PageHero from "@/components/PageHero";
import CtaBlock from "@/components/CtaBlock";
import { useI18n } from "@/lib/i18n/provider";
import { getAbout } from "@/lib/i18n/page-content";

// 注意:metadata 在 client 不會生效, 但這頁需要 useI18n,
// 改成 server-rendered 並用 dynamic metadata 是 Phase 6 + 才需要的事.
// 現階段 client + 缺 metadata 對 SEO 影響小,主要靠首頁 + sitemap 撐.

export default function AboutPage() {
  const { locale } = useI18n();
  const c = getAbout(locale);

  return (
    <>
      <PageHero page="about" />

      <section className="bg-ivory-50 py-28 md:py-40">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          <div className="lg:col-span-7">
            <div className="aspect-[4/5] relative overflow-hidden bg-ivory-100">
              <Image
                src={IMG.aboutAtmosphere}
                alt="Shiny Gold"
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover hover:scale-[1.03] transition-transform duration-[1500ms]"
              />
            </div>
          </div>

          <div className="lg:col-span-5">
            <p className="font-display tracking-[0.45em] text-gold-600 text-[10px] mb-8 uppercase">
              {c.story_eyebrow}
            </p>
            <h2 className="font-display text-3xl md:text-5xl text-ink-950 mb-8 leading-[1.1]">
              {c.story_title_a}
              <br />
              <span className="italic font-serif text-gold-500">
                {c.story_title_b_italic}
              </span>
              {c.story_title_c}
            </h2>
            <div className="w-12 gold-line h-px mb-10" />
            <div className="space-y-5 text-ink-700 leading-loose text-sm md:text-base font-light">
              {c.paragraphs.map((p, i) => (
                <p key={i} className={i === c.paragraphs.length - 1 ? "text-ink-950" : ""}>
                  {p}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-28 md:py-40 border-y border-ink-950/8">
        <div className="mx-auto max-w-7xl px-6 sm:px-10">
          <div className="text-center mb-20 md:mb-24">
            <p className="font-display tracking-[0.45em] text-gold-600 text-[10px] mb-6 uppercase">
              {c.values_eyebrow}
            </p>
            <h2 className="font-display text-4xl md:text-6xl text-ink-950">
              {c.values_title}
            </h2>
            <div className="w-12 gold-line h-px mx-auto mt-8" />
          </div>
          <div className="grid md:grid-cols-3 gap-px bg-ink-950/8 border border-ink-950/8">
            {c.values.map((v) => (
              <div
                key={v.num}
                className="bg-white hover:bg-ivory-50 transition-colors p-12 md:p-14"
              >
                <p className="font-display text-4xl text-gold-400 mb-6">{v.num}</p>
                <p className="font-display tracking-[0.35em] text-[10px] text-gold-600 uppercase mb-3">
                  {v.en}
                </p>
                <h3 className="font-display text-2xl md:text-3xl text-ink-950 mb-5">
                  {v.title}
                </h3>
                <p className="text-sm text-ink-700 leading-loose font-light">
                  {v.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ivory-50 py-28 md:py-40">
        <div className="mx-auto max-w-7xl px-6 sm:px-10">
          <div className="text-center mb-20">
            <p className="font-display tracking-[0.45em] text-gold-600 text-[10px] mb-6 uppercase">
              {c.why_eyebrow}
            </p>
            <h2 className="font-display text-4xl md:text-6xl text-ink-950">
              {c.why_title}
            </h2>
            <div className="w-12 gold-line h-px mx-auto mt-8" />
          </div>
          <div className="grid md:grid-cols-3 gap-12 md:gap-16">
            {c.why.map((r) => (
              <div key={r.en}>
                <p className="font-display tracking-[0.35em] text-[10px] text-gold-600 uppercase mb-4">
                  {r.en}
                </p>
                <h3 className="font-display text-2xl text-ink-950 mb-4">
                  {r.title}
                </h3>
                <div className="w-8 gold-line h-px mb-5" />
                <p className="text-sm text-ink-700 leading-loose font-light">
                  {r.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBlock />
    </>
  );
}

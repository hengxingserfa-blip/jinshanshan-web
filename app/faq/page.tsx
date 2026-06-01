"use client";

import PageHero from "@/components/PageHero";
import CtaBlock from "@/components/CtaBlock";
import { useI18n } from "@/lib/i18n/provider";
import { getFaq } from "@/lib/i18n/page-content";

export default function FaqPage() {
  const { locale } = useI18n();
  const groups = getFaq(locale);

  return (
    <>
      <PageHero page="faq" />

      <section className="bg-ivory-50 py-24 md:py-32">
        <div className="mx-auto max-w-3xl px-6 sm:px-10 space-y-20">
          {groups.map((g) => (
            <div key={g.title}>
              <p className="font-display tracking-[0.45em] text-[10px] text-gold-600 uppercase mb-3">
                {g.en}
              </p>
              <h2 className="font-display text-3xl md:text-4xl text-ink-950 mb-2">
                {g.title}
              </h2>
              <div className="w-12 gold-line h-px mb-8" />
              <div className="divide-y divide-ink-950/8 border-y border-ink-950/8">
                {g.items.map((it, idx) => (
                  <details key={idx} className="group">
                    <summary className="cursor-pointer list-none py-6 flex items-start gap-6 select-none">
                      <span className="font-display text-gold-500 text-sm shrink-0 mt-1 w-6">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <span className="flex-1 text-ink-950 font-light text-base leading-relaxed">
                        {it.q}
                      </span>
                      <span className="font-display text-gold-500 text-lg shrink-0 group-open:rotate-45 transition-transform duration-300">
                        +
                      </span>
                    </summary>
                    <div className="pb-7 pl-12 text-sm text-ink-700 leading-loose font-light">
                      {it.a}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <CtaBlock />
    </>
  );
}

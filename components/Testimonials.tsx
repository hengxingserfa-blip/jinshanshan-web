"use client";

import Ornament from "@/components/Ornament";
import { useT } from "@/lib/i18n/provider";

export default function Testimonials() {
  const t = useT();

  const reviews = [
    { name: t.testimonials.name_a, occasion: t.testimonials.occ_a, quote: t.testimonials.quote_a },
    { name: t.testimonials.name_b, occasion: t.testimonials.occ_b, quote: t.testimonials.quote_b },
    { name: t.testimonials.name_c, occasion: t.testimonials.occ_c, quote: t.testimonials.quote_c },
  ];

  return (
    <section className="bg-ivory-50 py-32 md:py-44 subtle-noise">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <div className="text-center mb-20 md:mb-24">
          <p className="font-display tracking-[0.5em] text-gold-600 text-[10px] mb-8 uppercase">
            {t.testimonials.eyebrow}
          </p>
          <h2 className="font-display text-5xl md:text-7xl text-ink-950">
            {t.testimonials.title_a}
            <span className="italic font-serif text-gold-500"> {t.testimonials.title_b}</span>
          </h2>
          <Ornament className="mt-10" />
          <p className="mt-10 text-xs tracking-wider text-ink-400 font-display">
            {t.testimonials.rating_note}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-px bg-ink-950/8 border border-ink-950/8">
          {reviews.map((r, i) => (
            <figure
              key={i}
              className="bg-ivory-50 hover:bg-white transition-colors p-10 md:p-12 flex flex-col"
            >
              <span className="font-display text-6xl gold-foil leading-none mb-6">
                &ldquo;
              </span>
              <blockquote className="flex-1 text-ink-700 leading-loose text-sm md:text-base font-light italic mb-8">
                {r.quote}
              </blockquote>
              <figcaption className="border-t border-ink-950/8 pt-6">
                <p className="font-display text-lg text-ink-950 mb-1">{r.name}</p>
                <p className="font-display tracking-[0.35em] text-[10px] text-gold-600 uppercase">
                  {r.occasion}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>

        <p className="mt-12 text-center text-[10px] tracking-[0.3em] uppercase text-ink-400 font-display">
          {t.testimonials.disclaimer}
        </p>
      </div>
    </section>
  );
}

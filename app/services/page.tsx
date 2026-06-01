"use client";

import Image from "next/image";
import { IMG } from "@/lib/images";
import PageHero from "@/components/PageHero";
import CtaBlock from "@/components/CtaBlock";
import { useI18n } from "@/lib/i18n/provider";
import { getServices } from "@/lib/i18n/page-content";

const IMAGES = [IMG.ring2, IMG.bar, IMG.necklace2, IMG.fancy];

export default function ServicesPage() {
  const { locale } = useI18n();
  const services = getServices(locale);

  return (
    <>
      <PageHero page="services" />

      <section className="bg-ivory-50">
        {services.map((s, i) => (
          <div
            key={s.num}
            className={`${i % 2 === 1 ? "bg-white" : "bg-ivory-50"} py-24 md:py-32`}
          >
            <div className="mx-auto max-w-7xl px-6 sm:px-10">
              <div
                className={`grid lg:grid-cols-12 gap-12 lg:gap-20 items-center ${
                  i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                <div className="lg:col-span-7 relative">
                  <div className="aspect-[4/3] relative overflow-hidden bg-ivory-100">
                    <Image
                      src={IMAGES[i]}
                      alt={s.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 60vw"
                      className="object-cover hover:scale-[1.03] transition-transform duration-[1500ms]"
                    />
                  </div>
                  <div className="absolute -top-4 -left-4 bg-gold-500 text-white rounded-2xl shadow-lg w-16 h-16 flex items-center justify-center font-display tracking-widest">
                    {s.num}
                  </div>
                </div>

                <div className="lg:col-span-5">
                  <p className="font-display tracking-[0.3em] text-gold-600 text-xs mb-3">
                    SERVICE {s.num}
                  </p>
                  <h2 className="font-display text-3xl md:text-4xl text-ink-950 mb-2">
                    {s.title}
                  </h2>
                  <p className="text-gold-700 italic font-serif mb-5">
                    {s.subtitle}
                  </p>
                  <p className="text-ink-700 leading-loose mb-8 text-sm md:text-base font-light">
                    {s.body}
                  </p>

                  <div className="rounded-2xl bg-gold-50 border border-gold-100 p-6">
                    <p className="text-xs font-display tracking-[0.3em] text-gold-600 mb-4">
                      {s.steps_label}
                    </p>
                    <ol className="space-y-2">
                      {s.steps.map((step, idx) => (
                        <li key={idx} className="flex gap-3 text-sm text-ink-700">
                          <span className="shrink-0 w-6 h-6 rounded-full bg-gold-500 text-white text-xs flex items-center justify-center">
                            {idx + 1}
                          </span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      <CtaBlock />
    </>
  );
}

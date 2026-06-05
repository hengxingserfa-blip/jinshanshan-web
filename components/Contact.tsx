"use client";

import { useT } from "@/lib/i18n/provider";

export default function Contact() {
  const t = useT();
  return (
    <section id="contact" className="bg-ink-950 text-ivory-50 py-28 md:py-40 relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 30%, rgba(201,164,81,0.4), transparent 50%), radial-gradient(circle at 80% 70%, rgba(220,186,118,0.3), transparent 50%)",
        }}
      />
      <div className="relative mx-auto max-w-7xl px-6 sm:px-10">
        <div className="text-center mb-20 md:mb-24">
          <p className="font-display tracking-[0.45em] text-gold-300 text-[10px] mb-6 uppercase">
            {t.contact.eyebrow}
          </p>
          <h2 className="font-display text-3xl md:text-5xl mb-6">
            {t.contact.title}
          </h2>
          <div className="w-12 gold-line h-px mx-auto mb-8" />
          <p className="text-ivory-50/60 max-w-md mx-auto text-sm leading-loose font-light">
            {t.contact.intro}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-px bg-white/10">
          <div className="bg-ink-950 text-ivory-50 p-10 md:p-14">
            <p className="font-display tracking-[0.35em] text-gold-300 text-[10px] uppercase mb-10">
              {t.contact.boutique_info}
            </p>

            <dl className="space-y-7 text-sm md:text-base">
              <div className="grid grid-cols-[80px_1fr] gap-6 items-start">
                <dt className="font-display tracking-[0.3em] text-[10px] text-gold-300 uppercase pt-1">
                  {t.contact.label_address}
                </dt>
                <dd>
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=桃園市中壢區中和路108號"
                    target="_blank"
                    rel="noreferrer"
                    className="text-ivory-50 hover:text-gold-300 transition-colors whitespace-pre-line"
                  >
                    {t.contact.address}
                  </a>
                </dd>
              </div>
              <div className="h-px bg-white/20" />

              <div className="grid grid-cols-[80px_1fr] gap-6 items-center">
                <dt className="font-display tracking-[0.3em] text-[10px] text-gold-300 uppercase">
                  {t.contact.label_phone}
                </dt>
                <dd>
                  <a href="tel:+88632805908" className="text-ivory-50 hover:text-gold-300 transition-colors">
                    (03) 280-5908
                  </a>
                </dd>
              </div>
              <div className="h-px bg-white/20" />

              <div className="grid grid-cols-[80px_1fr] gap-6 items-center">
                <dt className="font-display tracking-[0.3em] text-[10px] text-gold-300 uppercase">
                  {t.contact.label_hours}
                </dt>
                <dd className="text-ivory-50">{t.contact.hours_value}</dd>
              </div>
              <div className="h-px bg-white/20" />

              <div className="grid grid-cols-[80px_1fr] gap-6 items-center">
                <dt className="font-display tracking-[0.3em] text-[10px] text-gold-300 uppercase">
                  {t.contact.label_line}
                </dt>
                <dd>
                  <a
                    href="https://lin.ee/onfiZgZ"
                    target="_blank"
                    rel="noreferrer"
                    className="text-ivory-50 hover:text-gold-300 transition-colors"
                  >
                    {t.contact.line_value}
                  </a>
                </dd>
              </div>
              <div className="h-px bg-white/20" />

              <div className="grid grid-cols-[80px_1fr] gap-6 items-center">
                <dt className="font-display tracking-[0.3em] text-[10px] text-gold-300 uppercase">
                  {t.contact.label_ig}
                </dt>
                <dd>
                  <a
                    href="https://instagram.com/shiny_gold991"
                    target="_blank"
                    rel="noreferrer"
                    className="text-ivory-50 hover:text-gold-300 transition-colors"
                  >
                    {t.contact.ig_value}
                  </a>
                </dd>
              </div>
              <div className="h-px bg-white/20" />

              <div className="grid grid-cols-[80px_1fr] gap-6 items-center">
                <dt className="font-display tracking-[0.3em] text-[10px] text-gold-300 uppercase">
                  {t.contact.label_fb}
                </dt>
                <dd>
                  <a
                    href="https://www.facebook.com/profile.php?id=61575318885967"
                    target="_blank"
                    rel="noreferrer"
                    className="text-ivory-50 hover:text-gold-300 transition-colors"
                  >
                    {t.contact.fb_value}
                  </a>
                </dd>
              </div>
            </dl>

            <div className="mt-12 flex gap-8 flex-wrap">
              <a
                href="tel:+88632805908"
                className="inline-flex items-center text-[10px] tracking-[0.35em] uppercase font-display text-ivory-50 border-b border-ivory-50 hover:border-gold-300 hover:text-gold-300 pb-1.5 transition-colors"
              >
                {t.contact.cta_call}
              </a>
              <a
                href="https://www.google.com/maps/search/?api=1&query=桃園市中壢區中和路108號"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center text-[10px] tracking-[0.35em] uppercase font-display text-ivory-50/70 hover:text-gold-300 pb-1.5 transition-colors"
              >
                {t.contact.cta_map}
              </a>
            </div>
          </div>

          <div className="relative bg-ink-900 min-h-[480px]">
            <iframe
              src="https://www.google.com/maps?q=桃園市中壢區中和路108號&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "100%", filter: "grayscale(0.6) invert(0.06)" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Map"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

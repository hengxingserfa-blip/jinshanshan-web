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
                    className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#06C755] text-white hover:opacity-90 transition-opacity text-sm rounded-sm"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.022.135-.033.199-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"/>
                    </svg>
                    <span>{t.contact.line_value}</span>
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
              <div className="h-px bg-white/20" />

              <div className="grid grid-cols-[80px_1fr] gap-6 items-center">
                <dt className="font-display tracking-[0.3em] text-[10px] text-gold-300 uppercase">
                  {t.contact.label_shopee}
                </dt>
                <dd>
                  <a
                    href="https://shopee.tw/shiny_gold"
                    target="_blank"
                    rel="noreferrer"
                    className="text-ivory-50 hover:text-gold-300 transition-colors"
                  >
                    {t.contact.shopee_value} →
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

export default function Contact() {
  return (
    <section id="contact" className="bg-ink-950 text-ivory-50 py-28 md:py-40">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <div className="text-center mb-20 md:mb-24">
          <p className="font-display tracking-[0.45em] text-gold-300 text-[10px] mb-6 uppercase">
            Visit Us
          </p>
          <h2 className="font-display text-4xl md:text-6xl mb-6">
            親自走一趟
          </h2>
          <div className="w-12 gold-line h-px mx-auto mb-8" />
          <p className="text-ivory-50/60 max-w-md mx-auto text-sm leading-loose font-light">
            建議來店前先 LINE 詢今日金價,
            <br />
            我們在桃園中壢中和路 108 號等您。
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-px bg-white/10">
          <div className="bg-ink-950 text-ivory-50 p-10 md:p-14">
            <p className="font-display tracking-[0.35em] text-gold-300 text-[10px] uppercase mb-10">
              Boutique Information
            </p>

            <dl className="space-y-7 text-sm md:text-base">
              <div className="grid grid-cols-[80px_1fr] gap-6 items-start">
                <dt className="font-display tracking-[0.3em] text-[10px] text-gold-300 uppercase pt-1">
                  Address
                </dt>
                <dd>
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=桃園市中壢區中和路108號"
                    target="_blank"
                    rel="noreferrer"
                    className="text-ivory-50 hover:text-gold-300 transition-colors"
                  >
                    320 桃園市中壢區
                    <br />
                    中和路 108 號
                  </a>
                </dd>
              </div>
              <div className="h-px bg-white/20" />

              <div className="grid grid-cols-[80px_1fr] gap-6 items-center">
                <dt className="font-display tracking-[0.3em] text-[10px] text-gold-300 uppercase">
                  Phone
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
                  Hours
                </dt>
                <dd className="text-ivory-50">每日 10:30 – 20:30</dd>
              </div>
              <div className="h-px bg-white/20" />

              <div className="grid grid-cols-[80px_1fr] gap-6 items-center">
                <dt className="font-display tracking-[0.3em] text-[10px] text-gold-300 uppercase">
                  LINE
                </dt>
                <dd className="text-ivory-50/75">@待提供官方 ID</dd>
              </div>
              <div className="h-px bg-white/20" />

              <div className="grid grid-cols-[80px_1fr] gap-6 items-center">
                <dt className="font-display tracking-[0.3em] text-[10px] text-gold-300 uppercase">
                  Instagram
                </dt>
                <dd>
                  <a
                    href="https://instagram.com/shiny_gold991"
                    target="_blank"
                    rel="noreferrer"
                    className="text-ivory-50 hover:text-gold-300 transition-colors"
                  >
                    @shiny_gold991
                  </a>
                </dd>
              </div>
            </dl>

            <div className="mt-12 flex gap-8 flex-wrap">
              <a
                href="tel:+88632805908"
                className="inline-flex items-center text-[10px] tracking-[0.35em] uppercase font-display text-ivory-50 border-b border-ivory-50 hover:border-gold-300 hover:text-gold-300 pb-1.5 transition-colors"
              >
                Call Us
              </a>
              <a
                href="https://www.google.com/maps/search/?api=1&query=桃園市中壢區中和路108號"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center text-[10px] tracking-[0.35em] uppercase font-display text-ivory-50/70 hover:text-gold-300 pb-1.5 transition-colors"
              >
                Direction →
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
              title="金閃閃銀樓地圖"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useT } from "@/lib/i18n/provider";

const ICONS = {
  pure: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 12l2 2 4-4" />
      <path d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9c2.5 0 4.76 1.02 6.39 2.66" />
    </svg>
  ),
  scale: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </svg>
  ),
  price: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  ),
  loss: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
};

export default function TrustBadges() {
  const t = useT();
  const tb = t.trust_badges;

  const badges = [
    { icon: ICONS.pure, label: tb.pure_label, desc: tb.pure_desc },
    { icon: ICONS.scale, label: tb.scale_label, desc: tb.scale_desc },
    { icon: ICONS.price, label: tb.price_label, desc: tb.price_desc },
    { icon: ICONS.loss, label: tb.loss_label, desc: tb.loss_desc },
  ];

  return (
    <section className="bg-ivory-50 border-y border-ink-950/8 py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <p className="text-center font-display tracking-[0.45em] text-gold-600 text-[10px] uppercase mb-10">
          {tb.eyebrow}
        </p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-10">
          {badges.map((b) => (
            <div key={b.label} className="text-center px-2">
              <div className="text-gold-600 mb-3 flex justify-center">
                {b.icon}
              </div>
              <p className="font-display text-base md:text-lg text-ink-950 mb-1.5">
                {b.label}
              </p>
              <p className="text-[11px] md:text-xs text-ink-500 leading-relaxed font-light">
                {b.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

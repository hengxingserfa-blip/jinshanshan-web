"use client";

import { useT } from "@/lib/i18n/provider";

const BADGES = [
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 12l2 2 4-4" />
        <path d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9c2.5 0 4.76 1.02 6.39 2.66" />
      </svg>
    ),
    label: "9999 純金",
    desc: "保證足金,純度標示明確",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
    label: "公開秤重",
    desc: "電子秤現場過秤,客人親眼看",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
    label: "透明金價",
    desc: "每日國際金價即時更新",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    label: "無耗損計算",
    desc: "舊金換新不扣火耗,實重計價",
  },
];

export default function TrustBadges() {
  return (
    <section className="bg-ivory-50 border-y border-ink-950/8 py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <p className="text-center font-display tracking-[0.45em] text-gold-600 text-[10px] uppercase mb-10">
          為什麼選金閃閃
        </p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-10">
          {BADGES.map((b) => (
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

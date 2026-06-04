"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useT } from "@/lib/i18n/provider";

export default function Header() {
  const t = useT();
  const [open, setOpen] = useState(false);

  // Lock scroll when drawer open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const navLinks = [
    { href: "/services", label: t.header.services, en: "Services" },
    { href: "/products", label: t.header.collection, en: "Collection" },
    { href: "/articles", label: t.header.journal, en: "Journal" },
    { href: "/about",    label: t.header.maison, en: "Maison" },
    { href: "/faq",      label: t.header.faq, en: "FAQ" },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 bg-ivory-50/90 backdrop-blur-md border-b border-ink-950/8">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 h-20 md:h-24 flex items-center justify-between gap-6">
          {/* 漢堡(只手機) */}
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="開啟選單"
            className="lg:hidden text-ink-950/80 hover:text-gold-600 transition-colors"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <path d="M3 6h18M3 12h18M3 18h18" />
            </svg>
          </button>

          <Link href="/" className="flex items-center shrink-0 lg:mr-auto">
            <Image
              src="/logo.png"
              alt="金閃閃銀樓 SHINY GOLD Jeweller's"
              width={260}
              height={70}
              priority
              className="h-10 md:h-14 w-auto"
            />
          </Link>

          <nav className="hidden lg:flex items-center gap-10">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="group flex flex-col items-center text-xs tracking-[0.2em] text-ink-950/85 hover:text-gold-600 transition-colors uppercase font-sans font-medium"
              >
                <span>{l.en}</span>
                <span className="text-[11px] tracking-[0.15em] font-sans font-light text-ink-400 group-hover:text-gold-500 mt-0.5">
                  {l.label}
                </span>
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-5 md:gap-7">
            <Link
              href="/reserve"
              className="hidden md:inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase font-sans font-medium text-ink-950 border border-ink-950 hover:border-gold-500 hover:text-gold-600 hover:bg-ivory-100 px-4 py-2.5 transition-colors"
            >
              {t.header.reserve_cta}
            </Link>
          </div>
        </div>
      </header>

      {/* 手機版抽屜選單 */}
      {open && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <div
            className="absolute inset-0 bg-ink-950/50 backdrop-blur-sm animate-fade-in"
            onClick={() => setOpen(false)}
            aria-hidden
          />
          <div className="absolute left-0 top-0 bottom-0 w-[85%] max-w-sm bg-ivory-50 shadow-2xl flex flex-col">
            {/* 抽屜頂部 */}
            <div className="flex items-center justify-between h-20 px-6 border-b border-ink-950/8">
              <Image
                src="/logo.png"
                alt="金閃閃銀樓"
                width={180}
                height={48}
                className="h-10 w-auto"
              />
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="關閉選單"
                className="text-ink-950/80 hover:text-gold-600 transition-colors"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* 導覽 */}
            <nav className="flex-1 overflow-y-auto px-6 py-8">
              <ul className="space-y-1">
                {navLinks.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="flex items-baseline justify-between py-4 border-b border-ink-950/8 group"
                    >
                      <span className="font-display text-2xl text-ink-950 group-hover:text-gold-600 transition-colors">
                        {l.label}
                      </span>
                      <span className="font-display tracking-[0.3em] text-[10px] text-ink-400 uppercase">
                        {l.en}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>

              <Link
                href="/reserve"
                onClick={() => setOpen(false)}
                className="mt-8 block text-center bg-ink-950 text-ivory-50 hover:bg-gold-500 hover:text-ink-950 font-display tracking-[0.3em] text-xs uppercase py-4 transition-colors"
              >
                {t.header.reserve_cta}
              </Link>
            </nav>

            {/* 底部聯絡 */}
            <div className="border-t border-ink-950/8 px-6 py-6 space-y-3 text-sm text-ink-700">
              <a href="tel:+88632805908" className="flex items-center gap-3 hover:text-gold-600 transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.33 1.85.57 2.81.7a2 2 0 0 1 1.72 2.03Z" />
                </svg>
                (03) 280-5908
              </a>
              <a
                href="https://www.google.com/maps/search/?api=1&query=桃園市中壢區中和路108號"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 hover:text-gold-600 transition-colors"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                中壢中和路 108 號
              </a>
              <p className="text-xs text-ink-400">10:30 ~ 20:30 · 週日公休</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

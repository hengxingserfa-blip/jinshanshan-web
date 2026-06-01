"use client";

import Link from "next/link";
import Ornament from "@/components/Ornament";
import { useT } from "@/lib/i18n/provider";

export default function NotFound() {
  const t = useT();
  return (
    <section className="bg-ivory-50 min-h-[70vh] flex items-center justify-center px-6 py-32 subtle-noise">
      <div className="max-w-md text-center">
        <p className="font-sans tracking-[0.5em] text-gold-600 text-xs uppercase mb-8 font-medium">
          {t.not_found.eyebrow}
        </p>
        <h1 className="font-display text-5xl md:text-7xl text-ink-950 mb-6 leading-tight">
          {t.not_found.title}
        </h1>
        <Ornament className="mb-10" />
        <p className="text-ink-700 leading-loose mb-12 font-light">
          {t.not_found.body}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8">
          <Link
            href="/"
            className="group inline-flex items-center gap-3 text-xs tracking-[0.3em] uppercase font-sans font-medium text-ink-950 border-b border-ink-950 hover:border-gold-500 hover:text-gold-600 pb-1.5 transition-colors"
          >
            <span>{t.not_found.home}</span>
          </Link>
          <Link
            href="/#contact"
            className="group inline-flex items-center gap-3 text-xs tracking-[0.3em] uppercase font-sans font-medium text-ink-400 hover:text-gold-600 pb-1.5 transition-colors"
          >
            <span>{t.not_found.line}</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

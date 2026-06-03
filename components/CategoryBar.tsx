"use client";

import Link from "next/link";
import { useT } from "@/lib/i18n/provider";

export default function CategoryBar() {
  const t = useT();

  const cats = [
    { en: "All",       zh: t.category_bar.all,        href: "/products" },
    { en: "Rings",     zh: t.category_bar.rings,      href: "/products" },
    { en: "Earrings",  zh: t.category_bar.earrings,   href: "/products" },
    { en: "Necklaces", zh: t.category_bar.necklaces,  href: "/products" },
    { en: "Bracelets", zh: t.category_bar.bracelets,  href: "/products" },
    { en: "Wedding",   zh: t.category_bar.wedding,    href: "/products" },
    { en: "Newborn",   zh: t.category_bar.newborn,    href: "/products" },
    { en: "Bullion",   zh: t.category_bar.bullion,    href: "/products" },
    { en: "Custom",    zh: t.category_bar.custom,     href: "/products" },
  ];

  return (
    <div className="sticky top-20 lg:top-24 z-40 bg-ivory-50/95 backdrop-blur-md border-b border-ink-950/8">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center gap-8 md:gap-12 overflow-x-auto scrollbar-none px-4 sm:px-10 py-3 md:py-3.5">
          {cats.map((c) => (
            <Link
              key={c.en}
              href={c.href}
              className="group shrink-0 text-center"
            >
              <p className="font-sans font-medium tracking-[0.2em] text-xs text-ink-950/85 group-hover:text-gold-600 transition-colors uppercase whitespace-nowrap">
                {c.en}
              </p>
              <p className="text-[11px] tracking-[0.15em] text-ink-400 group-hover:text-gold-500 mt-0.5 whitespace-nowrap font-light">
                {c.zh}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

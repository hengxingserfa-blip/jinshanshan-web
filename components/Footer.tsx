"use client";

import Image from "next/image";
import Link from "next/link";
import { useT } from "@/lib/i18n/provider";

export default function Footer() {
  const t = useT();
  const year = new Date().getFullYear();

  const cols = [
    {
      title: t.footer.col_maison,
      items: [
        { label: t.header.maison, href: "/about" },
        { label: t.header.services, href: "/services" },
        { label: t.header.collection, href: "/products" },
      ],
    },
    {
      title: t.footer.col_journal,
      items: [
        { label: t.header.journal, href: "/articles" },
        { label: t.header.faq, href: "/faq" },
      ],
    },
    {
      title: t.footer.col_contact,
      items: [
        { label: "(03) 280-5908", href: "tel:+88632805908" },
        { label: "加 LINE 好友", href: "https://lin.ee/onfiZgZ" },
        { label: "@shiny_gold991 (IG)", href: "https://instagram.com/shiny_gold991" },
        { label: "Facebook", href: "https://www.facebook.com/profile.php?id=61575318885967" },
        { label: "蝦皮選物 Shopee", href: "https://shopee.tw/shiny_gold" },
        {
          label: "Google Map",
          href: "https://www.google.com/maps/search/?api=1&query=桃園市中壢區中和路108號",
        },
      ],
    },
  ];

  return (
    <footer className="bg-ink-950 text-ivory-50 border-t border-white/5">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 py-20">
        <div className="grid md:grid-cols-12 gap-12 md:gap-8 mb-16">
          <div className="md:col-span-5">
            <Image
              src="/logo.png"
              alt="金閃閃銀樓"
              width={260}
              height={70}
              className="h-12 w-auto brightness-0 invert opacity-80 mb-8"
            />
            <p className="text-xs leading-loose text-ivory-50/80 max-w-sm font-light">
              {t.footer.brand_line_1}
              <br />
              {t.footer.brand_line_2}
              <br />
              <span className="text-gold-300/70">{t.footer.welcome_line}</span>
            </p>
          </div>

          {cols.map((c) => (
            <div key={c.title} className="md:col-span-2">
              <p className="font-display tracking-[0.35em] text-[10px] text-gold-300 uppercase mb-6">
                {c.title}
              </p>
              <ul className="space-y-3">
                {c.items.map((it) => (
                  <li key={it.label}>
                    <Link
                      href={it.href}
                      className="text-xs text-ivory-50 hover:text-gold-300 transition-colors"
                    >
                      {it.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="md:col-span-3">
            <p className="font-display tracking-[0.35em] text-[10px] text-gold-300 uppercase mb-6">
              {t.footer.col_boutique}
            </p>
            <p className="text-xs leading-loose text-ivory-50/80 font-light whitespace-pre-line">
              {t.footer.boutique_lines}
            </p>
          </div>
        </div>

        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[10px] tracking-[0.3em] uppercase text-ivory-50/65 font-display">
            {t.footer.rights.replace("{year}", String(year))}
          </p>
          <p className="text-[10px] tracking-[0.3em] uppercase text-ivory-50/65 font-display">
            {t.footer.region}
          </p>
        </div>
      </div>
    </footer>
  );
}

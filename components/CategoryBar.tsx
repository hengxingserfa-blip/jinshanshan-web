import Link from "next/link";

const cats = [
  { en: "All",       zh: "全部商品",   href: "/products" },
  { en: "Rings",     zh: "戒指",      href: "/products" },
  { en: "Necklaces", zh: "項鍊",      href: "/products" },
  { en: "Bracelets", zh: "手鏈",      href: "/products" },
  { en: "Wedding",   zh: "對戒",      href: "/products" },
  { en: "Newborn",   zh: "彌月禮",    href: "/products" },
  { en: "Bullion",   zh: "投資金條",  href: "/products" },
  { en: "Custom",    zh: "訂製",      href: "/products" },
];

export default function CategoryBar() {
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

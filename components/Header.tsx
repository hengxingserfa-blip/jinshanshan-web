import Image from "next/image";
import Link from "next/link";

const navLinks = [
  { href: "/services", label: "Services", zh: "服務" },
  { href: "/products", label: "Collection", zh: "選品" },
  { href: "/articles", label: "Journal", zh: "文章" },
  { href: "/about", label: "Maison", zh: "關於" },
  { href: "/faq", label: "FAQ", zh: "Q&A" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-ivory-50/90 backdrop-blur-md border-b border-ink-950/8">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 h-20 md:h-24 flex items-center justify-between gap-6">
        <Link href="/" className="flex items-center shrink-0">
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
              <span>{l.label}</span>
              <span className="text-[11px] tracking-[0.15em] font-sans font-light text-ink-400 group-hover:text-gold-500 mt-0.5">
                {l.zh}
              </span>
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-5 md:gap-7">
          <Link
            href="/products"
            aria-label="收藏 Wishlist"
            className="hidden md:inline-flex text-ink-950/70 hover:text-gold-600 transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
              />
            </svg>
          </Link>

          <Link
            href="/reserve"
            className="hidden md:inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase font-sans font-medium text-ink-950 border border-ink-950 hover:border-gold-500 hover:text-gold-600 hover:bg-ivory-100 px-4 py-2.5 transition-colors"
          >
            預約看店 · Reserve
          </Link>

          <a
            href="tel:+88632805908"
            className="lg:hidden text-[10px] tracking-[0.3em] uppercase text-ink-950 border-b border-ink-950 pb-0.5"
          >
            來電
          </a>
        </div>
      </div>
    </header>
  );
}

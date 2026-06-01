import Image from "next/image";
import Link from "next/link";

const cols = [
  {
    title: "Maison",
    items: [
      { label: "關於我們", href: "/about" },
      { label: "服務項目", href: "/services" },
      { label: "金飾選品", href: "/products" },
    ],
  },
  {
    title: "Journal",
    items: [
      { label: "文章專欄", href: "/articles" },
      { label: "常見問題", href: "/faq" },
    ],
  },
  {
    title: "Contact",
    items: [
      { label: "(03) 280-5908", href: "tel:+88632805908" },
      { label: "@shiny_gold991", href: "https://instagram.com/shiny_gold991" },
      {
        label: "Google Map",
        href: "https://www.google.com/maps/search/?api=1&query=桃園市中壢區中和路108號",
      },
    ],
  },
];

export default function Footer() {
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
              金閃閃銀樓 SHINY GOLD Jeweller&apos;s
              <br />
              桃園中壢在地誠信銀樓。公開金價、現場秤重、絕不扣耗損。
              <br />
              <span className="text-gold-300/70">
                歡迎 · Xin chào · Selamat datang · Mabuhay · ยินดีต้อนรับ
              </span>
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
              Boutique
            </p>
            <p className="text-xs leading-loose text-ivory-50/80 font-light">
              320 桃園市中壢區
              <br />
              中和路 108 號
              <br />
              <br />
              每日 10:30 – 20:30
            </p>
          </div>
        </div>

        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[10px] tracking-[0.3em] uppercase text-ivory-50/65 font-display">
            © {new Date().getFullYear()} Shiny Gold Jeweller&apos;s · All Rights Reserved
          </p>
          <p className="text-[10px] tracking-[0.3em] uppercase text-ivory-50/65 font-display">
            Taoyuan · Taiwan
          </p>
        </div>
      </div>
    </footer>
  );
}

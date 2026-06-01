import Link from "next/link";
import Ornament from "@/components/Ornament";

const services = [
  {
    num: "I",
    en: "Renewal",
    title: "舊金換新",
    body: "把抽屜裡的金飾,換成現在想戴的款式。當日金價試算,只補差價。",
  },
  {
    num: "II",
    en: "Recycle",
    title: "舊金回收",
    body: "公開當日金價、現場秤重、清楚試算。當日結清,絕不扣耗損。",
  },
  {
    num: "III",
    en: "Boutique",
    title: "飾金換購",
    body: "項鍊、手鐲、對戒,實體店面親自挑選。每件附金重證明。",
  },
  {
    num: "IV",
    en: "Restoration",
    title: "修飾販售",
    body: "斷鍊、改款、放大縮小、拋光翻新。讓老件再次戴回身上。",
  },
];

export default function Services() {
  return (
    <section id="services" className="relative bg-ivory-50 py-32 md:py-44 subtle-noise">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <div className="text-center mb-24 md:mb-32">
          <p className="font-display tracking-[0.5em] text-gold-600 text-[10px] mb-8 uppercase">
            Our Services
          </p>
          <h2 className="font-display text-5xl md:text-7xl text-ink-950 mb-10">
            四項<span className="italic font-serif text-gold-500"> 服務</span>
          </h2>
          <Ornament className="mb-10" />
          <p className="text-ink-700 max-w-xl mx-auto text-sm leading-loose font-light">
            金閃閃銀樓提供的,不只是黃金交易,
            <br />
            而是讓每一塊金子,在最對的時間、回到最對的人手上。
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-ink-950/10 border border-ink-950/10">
          {services.map((s) => (
            <div
              key={s.title}
              className="relative bg-ivory-50 hover:bg-white p-12 md:p-14 transition-colors group overflow-hidden min-h-[360px]"
            >
              <span className="absolute -top-6 -right-2 font-display text-[10rem] md:text-[12rem] text-gold-200/50 leading-none pointer-events-none select-none group-hover:text-gold-300/60 transition-colors">
                {s.num}
              </span>
              <div className="relative">
                <p className="font-display tracking-[0.45em] text-[10px] text-gold-600 uppercase mb-5">
                  {s.en}
                </p>
                <h3 className="font-display text-2xl md:text-3xl text-ink-950 mb-6">
                  {s.title}
                </h3>
                <div className="w-10 gold-line h-px mb-6" />
                <p className="text-sm leading-loose text-ink-700 font-light">
                  {s.body}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-20">
          <Link
            href="/services"
            className="group inline-flex items-center gap-3 text-[10px] tracking-[0.4em] uppercase font-display text-ink-950 pb-2 border-b border-ink-950 hover:border-gold-500 hover:text-gold-600 transition-colors"
          >
            <span>Discover All Services</span>
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

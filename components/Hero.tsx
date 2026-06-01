import Image from "next/image";
import Link from "next/link";
import { IMG } from "@/lib/images";
import Ornament from "@/components/Ornament";

export default function Hero() {
  return (
    <section className="relative bg-ivory-50">
      <div className="grid lg:grid-cols-12 min-h-[90vh] lg:min-h-screen">
        <div className="lg:col-span-5 flex items-center px-6 sm:px-10 lg:px-20 py-24 lg:py-0 order-2 lg:order-1 subtle-noise">
          <div className="max-w-md animate-fade-up">
            <p className="font-display tracking-[0.5em] text-gold-600 text-[10px] mb-12 uppercase">
              Est. Zhongli · Taoyuan
            </p>
            <h1 className="font-display text-5xl md:text-7xl lg:text-[6.5rem] leading-[0.95] text-ink-950 mb-12">
              在這裡,
              <br />
              <span className="gold-foil">黃金</span>
              <br />
              <span className="italic font-serif text-ink-900">不只是黃金</span>
            </h1>
            <Ornament className="mb-10 !justify-start" />
            <p className="text-sm md:text-base text-ink-700 leading-loose mb-12 font-light">
              桃園中壢的誠信銀樓。
              <br />
              公開金價・現場秤重・清楚試算。
            </p>
            <div className="flex flex-col gap-4">
              <Link
                href="/#contact"
                className="group inline-flex w-fit items-center gap-3 text-[10px] tracking-[0.4em] uppercase font-display text-ink-950 pb-2 border-b border-ink-950 hover:border-gold-500 hover:text-gold-600 transition-colors"
              >
                <span>Enquire · 詢今日金價</span>
                <span className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </Link>
              <Link
                href="/products"
                className="group inline-flex w-fit items-center gap-3 text-[10px] tracking-[0.4em] uppercase font-display text-ink-400 hover:text-gold-600 transition-colors"
              >
                <span>The Collection · 金飾選品</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 relative min-h-[60vh] lg:min-h-screen order-1 lg:order-2">
          <Image
            src={IMG.heroJewelry}
            alt="SHINY GOLD Fine Jewellery"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 58vw"
            className="object-cover scale-[1.02]"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-ivory-50/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-950/35 via-transparent to-transparent" />

          <div className="absolute top-8 right-8 lg:top-12 lg:right-12 flex items-center gap-3 animate-fade-in">
            <span className="block w-8 h-px bg-gold-300" />
            <span className="font-display tracking-[0.45em] text-[10px] text-white/90 uppercase">
              The Maison · 金閃閃
            </span>
          </div>

          <div className="absolute bottom-10 right-10 lg:bottom-16 lg:right-16 text-right animate-fade-up">
            <p className="font-display text-white text-2xl md:text-3xl mb-1">
              金閃閃銀樓
            </p>
            <p className="font-display tracking-[0.45em] text-[10px] text-gold-300 uppercase">
              Shiny Gold · Jeweller&apos;s
            </p>
          </div>
        </div>
      </div>

      <div className="bg-ink-950 text-ivory-50">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 py-5 flex flex-wrap items-center justify-center gap-x-8 md:gap-x-12 gap-y-2 text-sm md:text-base font-sans">
          <span className="text-gold-300 font-medium">★ Google 5.0</span>
          <span className="text-ivory-50/55">·</span>
          <span>桃園中壢中和路 108 號</span>
          <span className="text-ivory-50/55">·</span>
          <span>每日 10:30 – 20:30</span>
          <span className="text-ivory-50/55">·</span>
          <span className="font-medium">(03) 280-5908</span>
        </div>
      </div>
    </section>
  );
}

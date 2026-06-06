"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { IMG } from "@/lib/images";
import Ornament from "@/components/Ornament";
import { useT } from "@/lib/i18n/provider";

export default function Hero() {
  const t = useT();
  const sp = useSearchParams();
  // ?preview=video 才顯示影片版 (一般訪客 / SEO 不受影響)
  const showVideo = sp.get("preview") === "video";
  const videoRef = useRef<HTMLVideoElement>(null);

  // iOS Safari 對 React 駝峰屬性 (playsInline / autoPlay) 不認, 用 ref 直接操作 DOM
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    v.playsInline = true;
    v.setAttribute("playsinline", "");
    v.setAttribute("webkit-playsinline", "");
    v.setAttribute("autoplay", "");
    v.setAttribute("muted", "");
    v.setAttribute("loop", "");
    const tryPlay = () => v.play().catch(() => {});
    tryPlay();
    // 萬一第一次沒播 (iOS Low Power Mode 等), 用戶任意觸碰螢幕時再試一次
    document.addEventListener("touchstart", tryPlay, { once: true, passive: true });
    document.addEventListener("click", tryPlay, { once: true });
    return () => {
      document.removeEventListener("touchstart", tryPlay);
      document.removeEventListener("click", tryPlay);
    };
  }, [showVideo]);
  return (
    <section className="relative bg-ivory-50">
      <div className="grid lg:grid-cols-12 min-h-[90vh] lg:min-h-screen">
        <div className="lg:col-span-5 flex items-center px-6 sm:px-10 lg:px-20 py-24 lg:py-0 order-2 lg:order-1 subtle-noise">
          <div className="max-w-md animate-fade-up">
            <p className="font-display tracking-[0.5em] text-gold-600 text-[10px] mb-12 uppercase">
              {t.hero.eyebrow}
            </p>
            <h1 className="font-display text-5xl md:text-7xl lg:text-[6.5rem] leading-[0.95] text-ink-950 mb-12">
              {t.hero.title_a}
              <br />
              <span className="gold-foil">{t.hero.title_b}</span>
              <br />
              <span className="italic font-serif text-ink-900">{t.hero.title_c}</span>
            </h1>
            <Ornament className="mb-10 !justify-start" />
            <p className="text-sm md:text-base text-ink-700 leading-loose mb-12 font-light">
              {t.hero.subtitle_1}
              <br />
              {t.hero.subtitle_2}
            </p>
            <div className="flex flex-col gap-4">
              <Link
                href="/#contact"
                className="group inline-flex w-fit items-center gap-3 text-[10px] tracking-[0.4em] uppercase font-display text-ink-950 pb-2 border-b border-ink-950 hover:border-gold-500 hover:text-gold-600 transition-colors"
              >
                <span>{t.hero.cta_a}</span>
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
              <Link
                href="/products"
                className="group inline-flex w-fit items-center gap-3 text-[10px] tracking-[0.4em] uppercase font-display text-ink-400 hover:text-gold-600 transition-colors"
              >
                <span>{t.hero.cta_b} →</span>
              </Link>
            </div>
          </div>
        </div>

        <div
          className={`lg:col-span-7 relative order-1 lg:order-2 bg-ink-950 lg:min-h-screen ${
            showVideo ? "aspect-[9/16] lg:aspect-auto" : "min-h-[60vh]"
          }`}
        >
          {showVideo ? (
            // 直式 9:16 影片:手機剛好填滿,桌機 contain 完整顯示 + 兩側深色底
            // 屬性透過 useEffect 用 setAttribute 補上小寫 HTML 屬性 (iOS 才會自動播)
            <video
              ref={videoRef}
              src="/hero-opening.mp4"
              poster={typeof IMG.heroJewelry === "string" ? IMG.heroJewelry : undefined}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              controls={false}
              className="absolute inset-0 w-full h-full object-contain"
              aria-label="金閃閃銀樓 開幕宣傳影片"
            />
          ) : (
            <Image
              src={IMG.heroJewelry}
              alt="金閃閃銀樓 SHINY GOLD Jeweller's · 桃園中壢 9999 純金黃金飾品 · 公開秤重透明金價"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 58vw"
              className="object-cover scale-[1.02]"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-ivory-50/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-950/35 via-transparent to-transparent" />

          <div className="absolute top-8 right-8 lg:top-12 lg:right-12 flex items-center gap-3 animate-fade-in">
            <span className="block w-8 h-px bg-gold-300" />
            <span className="font-display tracking-[0.45em] text-[10px] text-white/90 uppercase">
              {t.hero.maison_tag}
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
          <span className="text-gold-300 font-medium">★ {t.hero.rating}</span>
          <span className="text-ivory-50/55">·</span>
          <span>{t.hero.address}</span>
          <span className="text-ivory-50/55">·</span>
          <span>{t.hero.hours}</span>
          <span className="text-ivory-50/55">·</span>
          <span className="font-medium">{t.hero.phone}</span>
        </div>
      </div>
    </section>
  );
}

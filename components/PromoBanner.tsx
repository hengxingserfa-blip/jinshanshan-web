import Image from "next/image";
import Link from "next/link";

interface Props {
  posterUrl: string;
  titleZh: string;
  bodyZh: string;
  ctaUrl?: string | null;
  ctaLabel?: string | null;
}

// 首頁常駐活動版面 — 放在 IG 區塊上方
export default function PromoBanner({
  posterUrl,
  titleZh,
  bodyZh,
  ctaUrl,
  ctaLabel,
}: Props) {
  return (
    <section
      id="promo"
      aria-label="當月活動"
      className="bg-gradient-to-b from-ivory-50 to-ivory-100 border-y border-gold-200/60 py-12 sm:py-20"
    >
      <div className="max-w-6xl mx-auto px-6">
        <p className="text-center font-display tracking-[0.4em] text-[10px] sm:text-[11px] text-gold-600 uppercase mb-6 sm:mb-10">
          ✦ 當月限定 Featured ✦
        </p>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* 海報 */}
          <div className="relative w-full max-w-sm mx-auto md:mx-0 md:ml-auto">
            <div className="absolute inset-0 bg-gold-500/15 translate-x-3 translate-y-3" aria-hidden />
            <div className="relative aspect-[9/16] bg-white shadow-2xl overflow-hidden">
              <Image
                src={posterUrl}
                alt={titleZh}
                fill
                sizes="(max-width: 768px) 80vw, 400px"
                className="object-cover"
                unoptimized
              />
            </div>
          </div>

          {/* 文字 + CTA */}
          <div className="text-center md:text-left">
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-ink-950 leading-tight mb-4 sm:mb-6">
              {titleZh}
            </h2>
            <p className="text-sm sm:text-base text-ink-700 leading-loose mb-6 sm:mb-8 whitespace-pre-line">
              {bodyZh}
            </p>
            {ctaUrl && (
              <Link
                href={ctaUrl}
                className="inline-block bg-ink-950 hover:bg-gold-500 hover:text-ink-950 text-ivory-50 px-8 py-3.5 text-sm tracking-[0.3em] font-display uppercase transition-colors"
              >
                {ctaLabel || "看更多 →"}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

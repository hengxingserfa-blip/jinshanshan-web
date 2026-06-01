import Link from "next/link";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { getActivePromotion } from "@/lib/data/promotions";

export default async function TopBar() {
  const promo = await getActivePromotion();

  return (
    <div className="bg-ink-950 text-ivory-50 border-b border-gold-500/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-10 py-3 flex items-center justify-between gap-4">
        {promo && (
          <div className="hidden md:flex items-center gap-3 text-[11px] tracking-wider min-w-0">
            <span className="inline-block w-1.5 h-1.5 rotate-45 bg-gold-400 shrink-0" />
            <span className="font-sans font-medium tracking-[0.2em] text-gold-300 uppercase shrink-0 text-xs">
              {promo.title_zh}
            </span>
            <span className="text-ivory-50/40">·</span>
            <span className="font-light text-ivory-50/90 truncate">
              {promo.body_zh}{" "}
              {promo.cta_url && promo.cta_label && (
                <Link
                  href={promo.cta_url}
                  className="text-gold-300 hover:text-gold-200 underline-offset-4 hover:underline"
                >
                  {promo.cta_label} →
                </Link>
              )}
            </span>
          </div>
        )}

        {promo && (
          <Link
            href={promo.cta_url ?? "/#contact"}
            className="md:hidden font-sans font-medium tracking-[0.2em] text-xs text-gold-300 uppercase shrink-0"
          >
            {promo.title_zh} →
          </Link>
        )}

        {!promo && <span className="hidden md:block" />}

        <LanguageSwitcher />
      </div>
    </div>
  );
}

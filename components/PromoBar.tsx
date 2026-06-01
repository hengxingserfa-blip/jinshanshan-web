import Link from "next/link";

export default function PromoBar() {
  return (
    <div className="bg-ink-950 text-ivory-50 border-b border-gold-500/20">
      <div className="mx-auto max-w-7xl px-4 sm:px-10 py-2.5 flex items-center justify-center gap-3 text-[11px] md:text-xs tracking-wider">
        <span className="hidden md:inline-block w-1.5 h-1.5 rotate-45 bg-gold-400" />
        <span className="font-display tracking-[0.35em] text-gold-300 uppercase">
          5 月限定
        </span>
        <span className="text-ivory-50/40">·</span>
        <span className="font-light text-ivory-50/90">
          母親節黃金回收<span className="text-gold-300"> 加碼活動 </span>進行中
        </span>
        <span className="text-ivory-50/40">·</span>
        <Link
          href="/#contact"
          className="inline-flex items-center gap-1 font-display tracking-[0.3em] text-gold-300 hover:text-gold-200 uppercase underline-offset-4 hover:underline"
        >
          詳情 →
        </Link>
      </div>
    </div>
  );
}

import Link from "next/link";
import Ornament from "@/components/Ornament";

export const metadata = {
  title: "找不到頁面 | 金閃閃銀樓",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section className="bg-ivory-50 min-h-[70vh] flex items-center justify-center px-6 py-32 subtle-noise">
      <div className="max-w-md text-center">
        <p className="font-sans tracking-[0.5em] text-gold-600 text-xs uppercase mb-8 font-medium">
          404 · Not Found
        </p>
        <h1 className="font-display text-5xl md:text-7xl text-ink-950 mb-6 leading-tight">
          這頁不見了
        </h1>
        <Ornament className="mb-10" />
        <p className="text-ink-700 leading-loose mb-12 font-light">
          您要找的頁面找不到 ——
          <br />
          可能是連結舊了、商品下架、或頁面剛搬家。
          <br />
          <span className="text-ink-400">
            想看看的話,直接回首頁或來店找我們聊聊。
          </span>
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8">
          <Link
            href="/"
            className="group inline-flex items-center gap-3 text-xs tracking-[0.3em] uppercase font-sans font-medium text-ink-950 border-b border-ink-950 hover:border-gold-500 hover:text-gold-600 pb-1.5 transition-colors"
          >
            <span>← 回首頁</span>
          </Link>
          <Link
            href="/#contact"
            className="group inline-flex items-center gap-3 text-xs tracking-[0.3em] uppercase font-sans font-medium text-ink-400 hover:text-gold-600 pb-1.5 transition-colors"
          >
            <span>加 LINE 詢問</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

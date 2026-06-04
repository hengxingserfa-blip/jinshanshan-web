"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <p className="font-display tracking-[0.5em] text-gold-600 text-[10px] uppercase mb-6">
          Something went wrong
        </p>
        <h1 className="font-display text-3xl md:text-4xl text-ink-950 mb-6">
          頁面發生問題
        </h1>
        <p className="text-sm text-ink-600 leading-loose mb-10 font-light">
          很抱歉造成不便。請稍後再試,或直接聯絡我們:<br />
          (03) 280-5908 · 中壢中和路 108 號
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={reset}
            className="px-6 py-3 text-[10px] tracking-[0.35em] uppercase font-display bg-ink-950 text-ivory-50 hover:bg-gold-500 hover:text-ink-950 transition-colors"
          >
            重試
          </button>
          <Link
            href="/"
            className="px-6 py-3 text-[10px] tracking-[0.35em] uppercase font-display border border-ink-950 text-ink-950 hover:border-gold-500 hover:text-gold-600 transition-colors"
          >
            回首頁
          </Link>
        </div>
      </div>
    </div>
  );
}

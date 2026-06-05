import Link from "next/link";
import {
  getServerSupabase,
  isSupabaseConfigured,
} from "@/lib/supabase/server";
import type { Promotion } from "@/lib/supabase/types";
import { getActivePromotion } from "@/lib/data/promotions";

export default async function PromotionsAdmin() {
  const configured = isSupabaseConfigured();
  let all: Promotion[] = [];

  if (configured) {
    const supabase = await getServerSupabase();
    if (supabase) {
      const { data } = await supabase
        .from("promotions")
        .select("*")
        .order("starts_at", { ascending: false });
      all = (data ?? []) as Promotion[];
    }
  }

  // 沒接 Supabase 時用 fallback 當前促銷讓使用者看得到一筆示意
  if (all.length === 0) {
    const promo = await getActivePromotion();
    if (promo) all = [promo];
  }

  const now = Date.now();

  return (
    <div className="p-4 sm:p-8 md:p-12 max-w-6xl">
      <header className="mb-10 flex items-end justify-between gap-6 flex-wrap">
        <div>
          <p className="font-sans tracking-[0.3em] text-[10px] text-gold-600 uppercase mb-2 font-medium">
            Promotions · 促銷
          </p>
          <h1 className="font-display text-4xl text-ink-950">促銷活動管理</h1>
          <p className="text-sm text-ink-700 mt-2">
            設定母親節 / 過年 / 父親節 等限時活動,會在 TopBar 自動排程顯示
          </p>
        </div>
        <Link
          href="/admin/promotions/new"
          className="inline-flex items-center gap-2 bg-ink-950 hover:bg-gold-500 hover:text-ink-950 text-ivory-50 px-5 py-3 font-sans font-medium tracking-wider text-xs uppercase transition-colors"
        >
          + 新增活動
        </Link>
      </header>

      {!configured && (
        <div className="mb-8 bg-amber-50 border border-amber-300 text-amber-900 px-5 py-4 text-xs">
          顯示中的是 fallback 示意活動。接好 Supabase 後會切到後台填的真實活動。
        </div>
      )}

      {all.length === 0 ? (
        <p className="text-sm text-ink-400">尚無活動</p>
      ) : (
        <div className="bg-white border border-ink-950/10 divide-y divide-ink-950/8">
          {all.map((p) => {
            const start = new Date(p.starts_at).getTime();
            const end = new Date(p.ends_at).getTime();
            const live = p.active && now >= start && now <= end;
            return (
              <div
                key={p.id}
                className="px-5 py-5 flex items-start justify-between gap-6 hover:bg-ivory-50/50"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    {live ? (
                      <span className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-emerald-700 font-medium">
                        <span className="relative flex w-1.5 h-1.5">
                          <span className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-75" />
                          <span className="relative inline-flex w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        </span>
                        進行中
                      </span>
                    ) : (
                      <span className="text-[10px] uppercase tracking-wider text-ink-400 font-medium">
                        {now < start ? "未開始" : "已結束"}
                      </span>
                    )}
                    {p.title_en && (
                      <span className="text-[10px] uppercase tracking-wider text-gold-600 font-medium">
                        {p.title_en}
                      </span>
                    )}
                  </div>
                  <p className="font-display text-lg text-ink-950">{p.title_zh}</p>
                  <p className="text-xs text-ink-700 font-light mb-2">{p.body_zh}</p>
                  <p className="text-[11px] text-ink-400 font-mono">
                    {p.starts_at.slice(0, 10)} → {p.ends_at.slice(0, 10)}
                    {p.cta_label && ` · CTA「${p.cta_label}」→ ${p.cta_url}`}
                  </p>
                </div>
                <Link
                  href={`/admin/promotions/${p.id}`}
                  className="text-xs text-gold-700 hover:underline shrink-0"
                >
                  編輯 →
                </Link>
              </div>
            );
          })}
        </div>
      )}

      <p className="mt-8 text-[11px] text-ink-400">
        ※ 新增/編輯表單將在 Phase 4.5 補上。
      </p>
    </div>
  );
}

import Link from "next/link";
import {
  getServerSupabase,
  isSupabaseConfigured,
} from "@/lib/supabase/server";
import GoldPriceForm from "./GoldPriceForm";
import ClearButton from "./ClearButton";
import type { GoldPriceOverride } from "@/lib/supabase/types";

function todayISO() {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d.toISOString().slice(0, 10);
}

export default async function GoldPriceAdmin() {
  const today = todayISO();
  const configured = isSupabaseConfigured();

  let recent: GoldPriceOverride[] = [];
  let todays: GoldPriceOverride | null = null;

  if (configured) {
    const supabase = await getServerSupabase();
    if (supabase) {
      const { data } = await supabase
        .from("gold_price_overrides")
        .select("*")
        .order("date", { ascending: false })
        .limit(14);
      recent = (data ?? []) as GoldPriceOverride[];
      todays = recent.find((r) => r.date === today && r.active) ?? null;
    }
  }

  return (
    <div className="p-4 sm:p-8 md:p-12 max-w-4xl">
      <header className="mb-10">
        <p className="font-sans tracking-[0.3em] text-[10px] text-gold-600 uppercase mb-2 font-medium">
          Gold Price · 今日金價
        </p>
        <h1 className="font-display text-4xl md:text-5xl text-ink-950 mb-4">
          設定今日 9999 飾金回收價
        </h1>
        <p className="text-sm text-ink-700 leading-loose font-light max-w-2xl">
          這裡設的數字會 <strong>優先於</strong> 詮美牌告 + Yahoo 國際金價即時計算的結果。
          適合用在:詮美還沒更新、想要主動策略性定價、或當天有特殊活動加碼回收時。
          <br />
          沒設這個欄位的話,網站照常用 詮美 + 國際金價自動算。
        </p>
      </header>

      {!configured && (
        <div className="mb-10 bg-amber-50 border border-amber-300 text-amber-900 px-5 py-4">
          <p className="font-medium text-sm mb-1">⚠ Supabase 還沒接</p>
          <p className="text-xs leading-relaxed">
            這個功能需要 Supabase 連線。請先依 <Link href="/" className="underline">SETUP.md</Link>{" "}
            指引設定 <code className="bg-amber-100 px-1">.env.local</code>。
          </p>
        </div>
      )}

      <section className="bg-white border border-ink-950/10 p-8 md:p-10 mb-10">
        <h2 className="font-display text-2xl text-ink-950 mb-2">
          {todays ? "今日已覆寫(可重設)" : "新增今日覆寫"}
        </h2>
        {todays && (
          <p className="text-sm text-emerald-700 mb-6">
            目前 9999 回收 = NT${" "}
            <span className="font-semibold">
              {todays.price_9999_qian.toLocaleString("zh-TW")}
            </span>{" "}
            / 錢
          </p>
        )}
        <GoldPriceForm
          defaultDate={today}
          defaultPrice={todays?.price_9999_qian}
          defaultNote={todays?.note ?? ""}
        />
      </section>

      <section>
        <h2 className="font-display text-2xl text-ink-950 mb-6">最近 14 筆紀錄</h2>
        {!configured || recent.length === 0 ? (
          <p className="text-sm text-ink-400">尚無紀錄</p>
        ) : (
          <div className="bg-white border border-ink-950/10 divide-y divide-ink-950/8">
            {recent.map((r) => (
              <div
                key={r.id}
                className="flex items-center justify-between px-5 py-4 text-sm"
              >
                <div className="flex items-center gap-6 flex-1">
                  <span className="font-mono text-ink-700 w-28">{r.date}</span>
                  <span className="font-semibold text-ink-950 w-32">
                    NT$ {r.price_9999_qian.toLocaleString("zh-TW")}
                  </span>
                  {r.note && (
                    <span className="text-ink-400 text-xs truncate">
                      {r.note}
                    </span>
                  )}
                  {!r.active && (
                    <span className="text-[10px] uppercase tracking-wider text-red-500 font-medium">
                      已停用
                    </span>
                  )}
                </div>
                {r.active && <ClearButton date={r.date} />}
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

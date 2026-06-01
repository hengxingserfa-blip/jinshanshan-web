"use client";

import { useGoldPrices } from "@/hooks/useGoldPrices";
import { PURITY_DEFS, PRICE_EN_LABELS } from "@/lib/gold";
import Sparkline from "@/components/Sparkline";
import { useT } from "@/lib/i18n/provider";

const formatTime = (d: Date) =>
  d.toLocaleTimeString("zh-TW", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

// 台灣股市慣例:漲紅 / 跌綠 / 平灰
const colors = {
  up:   { text: "text-red-600",     priceText: "text-red-600",     bg: "bg-red-50/60",     arrow: "▲", flash: "animate-flash-up" },
  down: { text: "text-emerald-600", priceText: "text-emerald-600", bg: "bg-emerald-50/60", arrow: "▼", flash: "animate-flash-down" },
  flat: { text: "text-ink-400",     priceText: "text-ink-950",     bg: "bg-ivory-50",      arrow: "—", flash: "" },
} as const;

export default function GoldPriceTicker() {
  const t = useT();
  const { rates, trends, directions, updatedAt, anchor, source, history } =
    useGoldPrices();

  const featured = PURITY_DEFS[0]; // 9999
  const others = PURITY_DEFS.slice(1);

  const featRate = rates[featured.value];
  const featTrend = trends[featured.value];
  const featDir = directions[featured.value];
  const featColor = colors[featDir];

  return (
    <section className="bg-ivory-100 border-y border-ink-950/8">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 py-12 md:py-16">
        <div className="flex flex-wrap items-baseline justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-4 mb-3">
              <p className="font-display tracking-[0.5em] text-gold-600 text-[10px] uppercase">
                {t.ticker.eyebrow}
              </p>
              <span className="inline-flex items-center gap-2">
                <span className="relative flex w-2 h-2">
                  <span className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-75" />
                  <span className="relative inline-flex w-2 h-2 rounded-full bg-emerald-500" />
                </span>
                <span className="font-display text-[10px] tracking-[0.3em] text-emerald-700 uppercase">
                  Live
                </span>
              </span>
            </div>
            <h3 className="font-display text-2xl md:text-3xl text-ink-950">
              {t.ticker.title_a}<span className="italic font-serif text-gold-500"> {t.ticker.title_b} </span>
            </h3>
          </div>
          <p
            className="text-[11px] tracking-wider text-ink-400 font-light text-right"
            suppressHydrationWarning
          >
            {updatedAt ? (
              <>
                更新於 {formatTime(updatedAt)}
                <br />
                {source && <span className="text-ink-400/70">資料 · {source}</span>}
                {!source && <span className="text-ink-400/70">每 30 秒重新同步</span>}
              </>
            ) : (
              "正在同步…"
            )}
          </p>
        </div>

        {/* Featured 9999 + 5 cards grid */}
        <div className="grid lg:grid-cols-12 gap-px bg-ink-950/8 border border-ink-950/8">
          {/* 9999 hero card */}
          <div
            className={`lg:col-span-5 p-8 md:p-12 transition-colors ${featColor.bg}`}
          >
            <div className="flex items-baseline justify-between mb-6">
              <div>
                <p className="font-display tracking-[0.45em] text-[10px] text-gold-600 uppercase mb-2">
                  {PRICE_EN_LABELS[featured.value]}
                </p>
                <p className="text-sm text-ink-700 font-light">
                  {featured.label} · 飾金回收
                </p>
              </div>
              <span
                className={`font-sans font-semibold text-3xl md:text-4xl ${featColor.text}`}
              >
                {featColor.arrow}
              </span>
            </div>

            <p
              key={featRate}
              className={`font-sans font-semibold tracking-tight text-5xl md:text-7xl ${featColor.priceText} mb-3 ${featColor.flash} transition-colors`}
            >
              <span className="text-gold-500 text-xl align-top mr-1 font-medium">NT$</span>
              {featRate.toLocaleString("zh-TW")}
            </p>
            <p className="text-xs text-ink-400 tracking-wider mb-6">
              / 錢(1 錢 = 3.75 公克)
            </p>

            <div className="flex items-baseline gap-4">
              <span
                className={`font-sans font-semibold text-2xl md:text-3xl ${featColor.text}`}
              >
                {featTrend >= 0 ? "+" : ""}
                {featTrend.toFixed(2)}%
              </span>
              <span className="text-xs text-ink-400 font-light">
                今日對昨日
              </span>
            </div>

            {history.length >= 2 && (
              <div className="mt-8">
                <div className="flex items-baseline justify-between mb-2">
                  <p className="font-display tracking-[0.35em] text-[10px] text-gold-600 uppercase">
                    30 Day Trend
                  </p>
                  <p className="text-[10px] tracking-wider text-ink-400">
                    {Math.min(...history).toLocaleString("zh-TW")} —{" "}
                    {Math.max(...history).toLocaleString("zh-TW")} NT$/錢
                  </p>
                </div>
                <Sparkline
                  data={history}
                  height={80}
                  stroke="#B58E3F"
                  fill="#B58E3F"
                />
              </div>
            )}

          </div>

          {/* Other 5 purities */}
          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-px bg-ink-950/8">
            {others.map((p) => {
              const rate = rates[p.value];
              const trend = trends[p.value];
              const dir = directions[p.value];
              const c = colors[dir];
              return (
                <div
                  key={p.value}
                  className={`p-5 md:p-6 transition-colors ${c.bg}`}
                >
                  <p className="font-display tracking-[0.35em] text-[10px] text-gold-600 uppercase mb-2">
                    {PRICE_EN_LABELS[p.value]}
                  </p>
                  <p className="text-xs text-ink-700 mb-4 font-light">
                    {p.label}
                  </p>
                  <p
                    key={rate}
                    className={`font-sans font-semibold tracking-tight text-2xl md:text-3xl ${c.priceText} mb-2 ${c.flash} transition-colors`}
                  >
                    <span className="text-gold-500 text-xs align-top font-medium">NT$</span>{" "}
                    {rate.toLocaleString("zh-TW")}
                  </p>
                  <div className="flex items-baseline justify-between">
                    <span className="text-[10px] text-ink-400 tracking-wider">
                      / 錢
                    </span>
                    <span
                      className={`text-xs font-display tracking-wider ${c.text}`}
                    >
                      {c.arrow}{" "}
                      {trend === 0 ? "0.00" : Math.abs(trend).toFixed(2)}%
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <p className="mt-6 text-[10px] tracking-[0.3em] uppercase text-ink-400 font-display text-center">
          ※ {t.ticker.note}
        </p>
      </div>
    </section>
  );
}

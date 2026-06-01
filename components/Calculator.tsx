"use client";

import { useMemo, useState } from "react";
import Ornament from "@/components/Ornament";
import { useGoldPrices } from "@/hooks/useGoldPrices";
import { PURITY_DEFS, type PurityValue } from "@/lib/gold";

const UNITS = [
  { value: "qian", label: "錢 (台錢)", toQian: 1 },
  { value: "g",    label: "公克 (g)", toQian: 1 / 3.75 },
  { value: "tael", label: "兩 (台兩)", toQian: 10 },
];

const formatNT = (n: number) =>
  "NT$ " +
  n.toLocaleString("zh-TW", {
    maximumFractionDigits: 0,
  });

const formatTime = (d: Date) =>
  d.toLocaleTimeString("zh-TW", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

const dirColors = {
  up:   { text: "text-red-400",     priceText: "text-red-400",     resultText: "text-red-500",     arrow: "▲", flash: "animate-flash-up" },
  down: { text: "text-emerald-400", priceText: "text-emerald-400", resultText: "text-emerald-500", arrow: "▼", flash: "animate-flash-down" },
  flat: { text: "text-ivory-50/50", priceText: "text-gold-300",    resultText: "",                 arrow: "—", flash: "" },
} as const;

export default function Calculator() {
  const [purity, setPurity] = useState<PurityValue>("9999");
  const [unit, setUnit] = useState("qian");
  const [weight, setWeight] = useState("");
  const { rates, trends, directions, updatedAt } = useGoldPrices();

  const currentRate = rates[purity];
  const currentTrend = trends[purity];
  const currentDir = directions[purity];
  const dirStyle = dirColors[currentDir];

  const result = useMemo(() => {
    const w = parseFloat(weight);
    if (!w || w <= 0) return 0;
    const u = UNITS.find((x) => x.value === unit)!;
    return Math.round(w * u.toQian * currentRate);
  }, [weight, unit, currentRate]);

  const currentPurity = PURITY_DEFS.find((x) => x.value === purity)!;

  return (
    <section className="bg-ink-950 text-ivory-50 py-32 md:py-44 relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-50 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at 30% 50%, rgba(155,120,42,0.3), transparent 60%), radial-gradient(ellipse at 80% 30%, rgba(214,180,120,0.18), transparent 55%)",
        }}
      />
      <div className="relative mx-auto max-w-6xl px-6 sm:px-10">
        <div className="text-center mb-16 md:mb-20">
          <p className="font-display tracking-[0.5em] text-gold-300 text-[10px] mb-6 uppercase">
            Cash Today · 今天能換多少
          </p>
          <h2 className="font-display text-4xl md:text-6xl mb-8 leading-tight">
            今天把舊金拿來金閃閃,
            <br />
            <span className="italic font-serif gold-foil">大約能換多少現金?</span>
          </h2>
          <Ornament className="mb-8" />
          <p className="text-ivory-50/85 max-w-2xl mx-auto text-base md:text-lg leading-loose font-light">
            抽屜裡那條老金鏈、媽媽留下的金牌、結婚時的對戒 ——
            <br />
            輸入重量,3 秒看到今天大約可以換到多少現金。
            <br />
            <span className="text-ivory-50/60 text-sm md:text-base">
              金價即時跟著國際牌告.現場秤重.現金結清.絕不扣耗損。
            </span>
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-7 space-y-10">
            <div>
              <label className="block font-display tracking-[0.4em] text-xs md:text-sm text-gold-300 uppercase mb-5">
                01 · 你的金是哪一種?
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-white/10 border border-white/10">
                {PURITY_DEFS.map((p) => (
                  <button
                    key={p.value}
                    type="button"
                    onClick={() => setPurity(p.value)}
                    className={`px-3 py-4 text-left transition-colors ${
                      purity === p.value
                        ? "bg-gold-500 text-ink-950 font-medium"
                        : "bg-white/10 text-white/95 hover:bg-gold-500/20 hover:text-white border border-white/15"
                    }`}
                  >
                    <div className="font-sans font-semibold text-xl tracking-wide">
                      {p.value}
                    </div>
                    <div className="text-xs mt-1 opacity-80 font-light">{p.note}</div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block font-display tracking-[0.4em] text-xs md:text-sm text-gold-300 uppercase mb-5">
                02 · 你習慣用哪個單位?
              </label>
              <div className="grid grid-cols-3 gap-px bg-white/10 border border-white/10">
                {UNITS.map((u) => (
                  <button
                    key={u.value}
                    type="button"
                    onClick={() => setUnit(u.value)}
                    className={`px-4 py-3 text-sm transition-colors ${
                      unit === u.value
                        ? "bg-gold-500 text-ink-950 font-medium"
                        : "bg-white/10 text-white/95 hover:bg-gold-500/20 hover:text-white border border-white/15"
                    }`}
                  >
                    {u.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label
                htmlFor="weight"
                className="block font-display tracking-[0.4em] text-[10px] text-gold-300 uppercase mb-5"
              >
                03 · 大概有多重?
              </label>
              <input
                id="weight"
                type="number"
                inputMode="decimal"
                min={0}
                step="0.01"
                placeholder="例如 5"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="w-full bg-transparent border-b border-white/40 focus:border-gold-300 focus:outline-none py-3 text-3xl md:text-4xl font-sans font-semibold text-white placeholder-white/30 transition-colors"
              />
              <div className="mt-5 flex items-center flex-wrap gap-3 text-sm text-ivory-50/85 tracking-wider">
                <span className="relative flex w-1.5 h-1.5">
                  <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-75" />
                  <span className="relative inline-flex w-1.5 h-1.5 rounded-full bg-emerald-400" />
                </span>
                <span>目前牌告 · {currentPurity.label}</span>
                <span
                  key={currentRate}
                  className={`${dirStyle.priceText} ${dirStyle.flash} transition-colors`}
                >
                  NT$ {currentRate.toLocaleString("zh-TW")} / 錢
                </span>
                <span className={`${dirStyle.text} font-display`}>
                  {dirStyle.arrow}{" "}
                  {currentTrend === 0
                    ? "0.00"
                    : (currentTrend >= 0 ? "+" : "") +
                      currentTrend.toFixed(2)}
                  %
                </span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 lg:sticky lg:top-32">
            <div className="bg-ivory-50 text-ink-950 p-10 md:p-12 relative overflow-hidden">
              <div
                className="absolute inset-0 opacity-30 pointer-events-none"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 80% 20%, rgba(155,120,42,0.15), transparent 60%)",
                }}
              />
              <div className="relative">
                <p className="font-display tracking-[0.4em] text-xs md:text-sm text-gold-600 uppercase mb-4">
                  Cash Today · 今天大約可換
                </p>
                <p className="text-sm md:text-base text-ink-700 mb-6 font-light tracking-wider">
                  {result > 0 ? "把你的金拿來金閃閃,今天可以換到" : "輸入重量,看看可以換多少"}
                </p>
                <p
                  key={result}
                  className={`font-sans font-semibold text-3xl md:text-5xl mb-2 whitespace-nowrap tracking-tight text-red-600 ${dirStyle.flash} transition-colors`}
                >
                  {result > 0 ? formatNT(result) : "NT$ —"}
                </p>
                <p className="text-sm text-ink-700/80 mb-8 font-light">
                  依今日金價試算 · 實際以門市現場秤重為準
                </p>

                <div className="h-px bg-ink-950/15 mb-8" />

                <p className="text-base text-ink-700 leading-loose font-light mb-6">
                  想知道精準的金額?
                  <br />
                  加 LINE 或來電,我們告訴你今天最即時的成交價。
                </p>

                <div className="flex flex-col gap-3">
                  <a
                    href="tel:+88632805908"
                    className="inline-flex items-center justify-between bg-ink-950 text-ivory-50 hover:bg-gold-500 hover:text-ink-950 px-6 py-4 text-sm tracking-[0.3em] font-display uppercase transition-colors"
                  >
                    <span>立即來電 (03) 280-5908</span>
                    <span>→</span>
                  </a>
                  <a
                    href="/#contact"
                    className="inline-flex items-center justify-between border border-ink-950/30 text-ink-950 hover:border-gold-500 hover:text-gold-600 px-6 py-4 text-sm tracking-[0.3em] font-display uppercase transition-colors"
                  >
                    <span>加 LINE 詢實際金價</span>
                    <span>→</span>
                  </a>
                </div>

                <p
                  className="mt-6 text-xs tracking-wider text-ink-700/70 font-light text-center"
                  suppressHydrationWarning
                >
                  牌告更新 · {updatedAt ? formatTime(updatedAt) : "—"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

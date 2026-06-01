"use client";

import { useEffect, useRef, useState } from "react";
import {
  BASE_RATES,
  SEED_TRENDS,
  type Direction,
  type PurityValue,
} from "@/lib/gold";

const POLL_MS = 30_000;
const PT_FIXED = 5200;

const purityKeys = Object.keys(BASE_RATES) as PurityValue[];

interface ApiResponse {
  rates: Record<PurityValue, number>;
  trends: Record<PurityValue, number>;
  anchor: {
    date: string;
    time: string;
    jewelryBuy: number;
    prevJewelryBuy: number | null;
  } | null;
  intl: {
    price: number;
    previousClose: number;
    currency: string;
  } | null;
  history9999: number[];
  timestamp: string;
  source: string;
}

const flatDirections = (): Record<PurityValue, Direction> =>
  purityKeys.reduce(
    (acc, k) => ({ ...acc, [k]: "flat" as Direction }),
    {} as Record<PurityValue, Direction>
  );

// 從 9999 基準算出全部純度
function ratesFrom9999(base: number): Record<PurityValue, number> {
  return {
    "9999": base,
    "999": base - 80,
    "18K": Math.round(base * 0.75),
    "14K": Math.round(base * 0.58),
    "9K": Math.round(base * 0.375),
    "PT": PT_FIXED,
  };
}

// Fallback: 客戶端直接抓 Yahoo 國際金價 (走 CORS proxy)
// 用在純靜態部署 (Netlify 拖拉, GitHub Pages 等) 沒有 /api/gold-price 後端的情況
async function fetchViaCorsProxy(): Promise<ApiResponse | null> {
  try {
    const proxy = (u: string) =>
      "https://corsproxy.io/?" + encodeURIComponent(u);

    const yahooLive =
      "https://query1.finance.yahoo.com/v8/finance/chart/GC=F?range=1d&interval=1m";
    const r1 = await fetch(proxy(yahooLive), { cache: "no-store" });
    if (!r1.ok) return null;
    const live = await r1.json();
    const meta = live?.chart?.result?.[0]?.meta;
    if (!meta?.regularMarketPrice) return null;

    const intlPrice = meta.regularMarketPrice as number;
    const intlPrev = (meta.chartPreviousClose as number) ?? intlPrice;
    const ratio = intlPrev > 0 ? intlPrice / intlPrev : 1;
    const base9999 = Math.round(BASE_RATES["9999"] * ratio);
    const dailyPct = (ratio - 1) * 100;

    const rates = ratesFrom9999(base9999);
    const trends: Record<PurityValue, number> = purityKeys.reduce(
      (acc, k) => ({ ...acc, [k]: k === "PT" ? 0 : dailyPct }),
      {} as Record<PurityValue, number>
    );

    // 30 天歷史 (用同一個 ratio 換算回 NT$/錢)
    let history9999: number[] = [];
    try {
      const yahooMo =
        "https://query1.finance.yahoo.com/v8/finance/chart/GC=F?range=1mo&interval=1d";
      const r2 = await fetch(proxy(yahooMo), { cache: "no-store" });
      if (r2.ok) {
        const mo = await r2.json();
        const closes =
          (mo?.chart?.result?.[0]?.indicators?.quote?.[0]?.close as
            | (number | null)[]
            | undefined) ?? [];
        const filtered = closes.filter(
          (c): c is number => typeof c === "number" && c > 0
        );
        if (filtered.length > 0 && intlPrice > 0) {
          const usdToNt = base9999 / intlPrice;
          history9999 = filtered.map((p) => Math.round(p * usdToNt));
          if (history9999[history9999.length - 1] !== base9999) {
            history9999.push(base9999);
          }
        }
      }
    } catch {
      // history 失敗就 sparkline 不顯示, 不影響主價
    }

    return {
      rates,
      trends,
      anchor: null,
      intl: { price: intlPrice, previousClose: intlPrev, currency: "USD" },
      history9999,
      timestamp: new Date().toISOString(),
      source: "Yahoo (direct, via CORS proxy)",
    };
  } catch {
    return null;
  }
}

async function fetchPrices(): Promise<ApiResponse | null> {
  // 1) 優先試 Next.js API route (dev / Vercel / Netlify w/ functions)
  try {
    const r = await fetch("/api/gold-price", { cache: "no-store" });
    if (r.ok) {
      const data = (await r.json()) as ApiResponse;
      if (data?.rates) return data;
    }
  } catch {
    // 沒 API route 就走 fallback
  }

  // 2) 純靜態部署 fallback: 從瀏覽器直接抓 Yahoo
  return fetchViaCorsProxy();
}

export function useGoldPrices() {
  const [rates, setRates] = useState<Record<PurityValue, number>>(() => ({
    ...BASE_RATES,
  }));
  const [trends, setTrends] = useState<Record<PurityValue, number>>(() => ({
    ...SEED_TRENDS,
  }));
  const [directions, setDirections] =
    useState<Record<PurityValue, Direction>>(flatDirections);
  const [updatedAt, setUpdatedAt] = useState<Date | null>(null);
  const [anchor, setAnchor] = useState<{ date: string; time: string } | null>(
    null
  );
  const [source, setSource] = useState<string>("");
  const [history, setHistory] = useState<number[]>([]);

  const ratesRef = useRef<Record<PurityValue, number>>({ ...BASE_RATES });
  const isFirstRef = useRef(true);

  useEffect(() => {
    let alive = true;

    const tick = async () => {
      const data = await fetchPrices();
      if (!alive || !data) return;

      const prev = ratesRef.current;
      const newDirs: Record<PurityValue, Direction> = {} as Record<
        PurityValue,
        Direction
      >;
      purityKeys.forEach((k) => {
        if (isFirstRef.current) {
          newDirs[k] = "flat";
        } else {
          const next = data.rates[k];
          const curr = prev[k];
          newDirs[k] = next > curr ? "up" : next < curr ? "down" : "flat";
        }
      });
      isFirstRef.current = false;
      ratesRef.current = data.rates;

      setRates(data.rates);
      setTrends(data.trends);
      setDirections(newDirs);
      setUpdatedAt(new Date());
      if (data.anchor) {
        setAnchor({ date: data.anchor.date, time: data.anchor.time });
      }
      setSource(data.source);
      if (Array.isArray(data.history9999) && data.history9999.length > 0) {
        setHistory(data.history9999);
      }
    };

    tick();
    const interval = setInterval(tick, POLL_MS);
    return () => {
      alive = false;
      clearInterval(interval);
    };
  }, []);

  return { rates, trends, directions, updatedAt, anchor, source, history };
}

import { NextResponse } from "next/server";
import { BASE_RATES, type PurityValue } from "@/lib/gold";
import { getTodayGoldOverride } from "@/lib/data/gold-override";

// 30 秒一輪 server-side cache. 客戶端可以每 30s-60s poll, 命中 cache 不會打爆來源.
export const revalidate = 30;
export const dynamic = "force-dynamic";

interface Anchor {
  date: string;
  time: string;
  goldBar: number;
  jewelrySell: number;
  jewelryBuy: number;
  prevJewelryBuy: number | null;
}

interface Intl {
  price: number;
  previousClose: number;
  currency: string;
  asOf: number;
}

// 詮美每日牌告(/m/m_GoldPriceReport.php)
async function fetchAnchor(): Promise<Anchor | null> {
  try {
    const r = await fetch("https://www.allbeauty.com.tw/m/m_GoldPriceReport.php", {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Accept: "text/html,application/xhtml+xml",
        "Accept-Language": "zh-TW,zh;q=0.9,en;q=0.8",
      },
      next: { revalidate: 900 },
    });
    if (!r.ok) {
      console.error("[gold-price] anchor fetch not ok:", r.status);
      return null;
    }
    const html = await r.text();
    const re =
      /<tr[^>]*><td>(\d{4}-\d{2}-\d{2})<br\s*\/?>\s*(\d{2}:\d{2}:\d{2})<\/td><td>([\d,]+)<\/td><td>([\d,]+)<\/td><td>([\d,]+)<\/td>/g;
    const rows = Array.from(html.matchAll(re));
    if (rows.length === 0) {
      console.error("[gold-price] anchor parse fail, html len:", html.length);
      return null;
    }
    const num = (s: string) => parseInt(s.replace(/,/g, ""), 10);
    const today = rows[0];
    const prev = rows[1];
    return {
      date: today[1],
      time: today[2],
      goldBar: num(today[3]),
      jewelrySell: num(today[4]),
      jewelryBuy: num(today[5]),
      prevJewelryBuy: prev ? num(prev[5]) : null,
    };
  } catch (e) {
    console.error("[gold-price] anchor fetch threw:", e);
    return null;
  }
}

// Yahoo Finance gold futures (分鐘級)
async function fetchIntl(): Promise<Intl | null> {
  try {
    const r = await fetch(
      "https://query1.finance.yahoo.com/v8/finance/chart/GC=F?range=1d&interval=1m",
      {
        headers: { "User-Agent": "Mozilla/5.0" },
        next: { revalidate: 30 },
      }
    );
    if (!r.ok) return null;
    const data = await r.json();
    const meta = data?.chart?.result?.[0]?.meta;
    if (!meta || typeof meta.regularMarketPrice !== "number") return null;
    return {
      price: meta.regularMarketPrice,
      previousClose: meta.chartPreviousClose ?? meta.regularMarketPrice,
      currency: meta.currency ?? "USD",
      asOf: (meta.regularMarketTime ?? Date.now() / 1000) * 1000,
    };
  } catch {
    return null;
  }
}

// 1 個月日線 (30 天 sparkline 用)
async function fetchIntlHistory(): Promise<number[] | null> {
  try {
    const r = await fetch(
      "https://query1.finance.yahoo.com/v8/finance/chart/GC=F?range=1mo&interval=1d",
      {
        headers: { "User-Agent": "Mozilla/5.0" },
        next: { revalidate: 3600 }, // 1 小時更新
      }
    );
    if (!r.ok) return null;
    const data = await r.json();
    const closes = data?.chart?.result?.[0]?.indicators?.quote?.[0]?.close;
    if (!Array.isArray(closes)) return null;
    return closes.filter((c: number | null): c is number => typeof c === "number" && c > 0);
  } catch {
    return null;
  }
}

export async function GET() {
  const [anchor, intl, intlHistory, override] = await Promise.all([
    fetchAnchor(),
    fetchIntl(),
    fetchIntlHistory(),
    getTodayGoldOverride(),
  ]);

  // 9999 飾金回收基準. 老闆後台覆寫最優先, 其次詮美, 最後 fallback
  let base9999 = override ?? anchor?.jewelryBuy ?? BASE_RATES["9999"];

  // 用國際金價當日漲跌微調 (老闆覆寫時不微調, 直接用老闆的數字)
  let intlAdjustment = 1;
  if (override === null && intl && intl.previousClose > 0) {
    intlAdjustment = intl.price / intl.previousClose;
    base9999 = Math.round(base9999 * intlAdjustment);
  }

  // 與 詮美 昨日比較,得出今日 % 漲跌
  let dailyPct = 0;
  if (anchor?.prevJewelryBuy && anchor.prevJewelryBuy > 0) {
    dailyPct = ((base9999 - anchor.prevJewelryBuy) / anchor.prevJewelryBuy) * 100;
  } else if (intl) {
    dailyPct = (intlAdjustment - 1) * 100;
  }

  const rates: Record<PurityValue, number> = {
    "9999": base9999,
    "999":  base9999 - 80,
    "18K":  Math.round(base9999 * 0.75),
    "14K":  Math.round(base9999 * 0.58),
    "9K":   Math.round(base9999 * 0.375),
    "PT":   5200,
  };

  const trends: Record<PurityValue, number> = {
    "9999": dailyPct,
    "999":  dailyPct,
    "18K":  dailyPct,
    "14K":  dailyPct,
    "9K":   dailyPct,
    "PT":   0,
  };

  const sources: string[] = [];
  if (anchor) sources.push("詮美牌告");
  if (intl) sources.push("國際金價 GC=F");
  if (sources.length === 0) sources.push("本地預設值");

  // 把國際歷史(USD/oz)換算成 NT$/錢 的 9999 等效價格
  let history9999: number[] = [];
  if (intlHistory && intl && intl.price > 0 && intlHistory.length > 0) {
    const ratio = base9999 / intl.price;
    history9999 = intlHistory.map((usd) => Math.round(usd * ratio));
    // 追加今日最新點
    if (history9999[history9999.length - 1] !== base9999) {
      history9999.push(base9999);
    }
  }

  return NextResponse.json(
    {
      rates,
      trends,
      anchor,
      intl,
      intlAdjustment,
      history9999,
      timestamp: new Date().toISOString(),
      source: sources.join(" + "),
    },
    {
      headers: {
        "Cache-Control": "public, s-maxage=30, stale-while-revalidate=120",
      },
    }
  );
}

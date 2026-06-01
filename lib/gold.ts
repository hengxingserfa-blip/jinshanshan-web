// 純度定義與基準牌告(參考自 2026-05-29 詮美牌告.單位:NT$ / 錢)
// 9999 飾金回收基準:16,620
// 其他純度依含金比例換算,白金獨立估價

export const PURITY_DEFS = [
  { value: "9999", label: "9999 純金", note: "Fine Gold" },
  { value: "999",  label: "999 黃金",  note: "999 Gold" },
  { value: "18K",  label: "18K 金",   note: "含金 75%" },
  { value: "14K",  label: "14K 金",   note: "含金 58%" },
  { value: "9K",   label: "9K 金",    note: "含金 37.5%" },
  { value: "PT",   label: "白金 Pt950", note: "Platinum" },
] as const;

export type PurityValue = typeof PURITY_DEFS[number]["value"];

export const BASE_RATES: Record<PurityValue, number> = {
  "9999": 16620,
  "999":  16540,
  "18K":  12465,
  "14K":  9640,
  "9K":   6233,
  "PT":   5200,
};

export const SEED_TRENDS: Record<PurityValue, number> = {
  "9999": 1.7,
  "999":  1.7,
  "18K":  1.4,
  "14K":  1.2,
  "9K":   1.0,
  "PT":   -0.3,
};

export const PRICE_EN_LABELS: Record<PurityValue, string> = {
  "9999": "Fine Gold",
  "999":  "999 Gold",
  "18K":  "18K Gold",
  "14K":  "14K Gold",
  "9K":   "9K Gold",
  "PT":   "Platinum",
};

export type Direction = "up" | "down" | "flat";

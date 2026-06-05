import type { Metadata } from "next";
import ServicesClient from "./ServicesClient";

const SITE = "https://www.shinygold.com.tw";

export const metadata: Metadata = {
  title: "服務項目 · 舊金換新 / 回收 / 飾金販售 / 修飾",
  description:
    "金閃閃銀樓 4 大服務:舊金換新、舊金回收、飾金販售、修飾翻新。桃園中壢中和路 108 號,公開秤重、透明金價、絕不扣耗損。當日結清,歡迎中越英印菲泰各國朋友。",
  keywords: [
    "舊金換新", "舊金回收", "飾金販售", "金飾修飾",
    "中壢黃金回收", "桃園銀樓", "桃園黃金回收", "中壢銀樓",
    "金條買賣", "9999 純金", "現場秤重", "透明金價",
  ],
  alternates: {
    canonical: `${SITE}/services`,
  },
  openGraph: {
    title: "金閃閃銀樓 4 大服務 · 公開秤重透明金價",
    description: "舊金換新、回收、飾金販售、修飾。桃園中壢誠信銀樓,當日結清不扣耗損。",
    url: `${SITE}/services`,
    type: "website",
    images: [{ url: SITE + "/logo.png", width: 1200, height: 630, alt: "金閃閃銀樓" }],
  },
};

export default function ServicesPage() {
  return <ServicesClient />;
}

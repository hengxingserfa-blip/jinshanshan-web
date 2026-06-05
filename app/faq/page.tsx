import type { Metadata } from "next";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import FaqClient from "./FaqClient";
import FaqStructuredData from "@/components/FaqStructuredData";

const SITE = "https://www.shinygold.com.tw";

export const metadata: Metadata = {
  title: "常見問題 FAQ · 黃金回收金價 / 火耗 / 純度",
  description:
    "舊金回收怎麼算?要不要扣火耗?多重才接?哪些金飾可以收?中越英印菲泰多國語言朋友皆可詢問。桃園中壢金閃閃銀樓常見問題一次說明。",
  keywords: [
    "舊金回收價格", "黃金回收計算", "火耗扣不扣", "金飾純度判斷",
    "金條回收", "彌月金牌", "對戒重量", "金飾保養",
    "中壢黃金回收問題", "桃園銀樓 FAQ",
  ],
  alternates: { canonical: `${SITE}/faq` },
  openGraph: {
    title: "黃金回收 / 飾金常見問題 — 金閃閃銀樓",
    description: "回收價怎麼算?火耗扣不扣?純度怎麼測?一次說清楚。",
    url: `${SITE}/faq`,
    type: "website",
    images: [{ url: SITE + "/logo.png", width: 1200, height: 630, alt: "金閃閃銀樓" }],
  },
};

export default function FaqPage() {
  return (
    <>
      <BreadcrumbJsonLd trail={[{ name: "常見問題", path: "/faq" }]} />
      <FaqStructuredData />
      <FaqClient />
    </>
  );
}

import type { Metadata } from "next";
import ServicesClient from "./ServicesClient";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";

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

const services = [
  {
    name: "舊金換新 · Gold Renewal",
    description:
      "把抽屜裡的舊金條、舊金飾換成現在想戴的款式。當日金價試算,只補差價。不扣耗損、無火燒費。",
    serviceType: "舊金換新",
  },
  {
    name: "舊金回收 · Gold Buy-Back",
    description:
      "公開當日金價、現場秤重、清楚試算。當日現金結清,絕不扣耗損費。XRF 驗金儀器免費檢測。",
    serviceType: "黃金回收",
  },
  {
    name: "飾金販售 · Jewellery Sales",
    description:
      "9999 純金戒指、項鍊、手鐲、對戒、彌月禮、投資金條,3000+ 件實際庫存。每件附金重證明保證卡。",
    serviceType: "金飾販售",
  },
  {
    name: "修飾翻新 · Repair & Refit",
    description:
      "斷鍊接線、戒圍放大縮小、款式改造、拋光翻新、寶石重鑲。3-7 天交件,讓老件再次戴回身上。",
    serviceType: "金飾修理",
  },
];

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@graph": services.map((s) => ({
    "@type": "Service",
    name: s.name,
    description: s.description,
    serviceType: s.serviceType,
    provider: { "@id": `${SITE}#business` },
    areaServed: [
      { "@type": "City", name: "中壢區" },
      { "@type": "City", name: "桃園市" },
    ],
    availableLanguage: ["zh-TW", "en", "vi", "id", "fil", "th"],
  })),
};

export default function ServicesPage() {
  return (
    <>
      <BreadcrumbJsonLd trail={[{ name: "服務項目", path: "/services" }]} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <ServicesClient />
    </>
  );
}

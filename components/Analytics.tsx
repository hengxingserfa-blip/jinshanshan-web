// Google Analytics 4 + Google Ads 轉換追蹤 scaffold
// 沒設 env 變數時自動不渲染 — 開帳號前後都能 deploy
//
// 啟用方式:
// 1. GA4: 到 https://analytics.google.com 建 GA4 property,拿 Measurement ID (G-XXXX),
//    填到 Vercel 環境變數 NEXT_PUBLIC_GA_ID
// 2. Google Ads: 到 ads.google.com → 工具 → 轉換,建立轉換動作,拿 Conversion ID (AW-XXXX),
//    填到 Vercel 環境變數 NEXT_PUBLIC_ADS_ID
// 兩個獨立,可只裝一個或兩個都裝。

import Script from "next/script";

export default function Analytics() {
  const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
  const ADS_ID = process.env.NEXT_PUBLIC_ADS_ID;

  // 至少要有一個才掛 gtag
  if (!GA_ID && !ADS_ID) return null;

  const configs: string[] = [];
  if (GA_ID) configs.push(`gtag('config', '${GA_ID}', { anonymize_ip: true });`);
  if (ADS_ID) configs.push(`gtag('config', '${ADS_ID}');`);

  // gtag/js 用其中一個 ID 載入即可,gtag('config') 才是各自分流
  const loaderId = GA_ID || ADS_ID;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${loaderId}`}
        strategy="afterInteractive"
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          ${configs.join("\n          ")}
        `}
      </Script>
    </>
  );
}

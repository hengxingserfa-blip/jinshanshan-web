// Google Analytics 4 scaffold. 沒設 NEXT_PUBLIC_GA_ID 就不渲染.
// 要啟用: 到 https://analytics.google.com 建立 GA4 property, 拿 Measurement ID (G-XXXX),
// 填到 .env.local 或 Vercel 環境變數.

import Script from "next/script";

export default function Analytics() {
  const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
  if (!GA_ID) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}', { anonymize_ip: true });
        `}
      </Script>
    </>
  );
}

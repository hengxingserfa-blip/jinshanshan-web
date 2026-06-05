import type { Metadata } from "next";
import { Noto_Sans_TC, Cormorant_Garamond, Italiana } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TopBar from "@/components/TopBar";
import CategoryBar from "@/components/CategoryBar";
import FloatingActions from "@/components/FloatingActions";
import BackToTop from "@/components/BackToTop";
import StructuredData from "@/components/StructuredData";
import Analytics from "@/components/Analytics";
import { I18nProvider } from "@/lib/i18n/provider";
import { getActivePromotion } from "@/lib/data/promotions";

const notoTC = Noto_Sans_TC({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-noto-tc",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const italiana = Italiana({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-italiana",
  display: "swap",
});

const SITE = "https://www.shinygold.com.tw";
const SEARCH_CONSOLE = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "_ALBLBU3J1mXohl-w9hDwx2JKnBo9fuoKsZQ7T_d__g";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: "金閃閃銀樓 SHINY GOLD Jeweller's | 桃園中壢黃金回收・舊金換新",
    template: "%s | 金閃閃銀樓",
  },
  description:
    "金閃閃銀樓位於桃園中壢中和路,提供舊金換新、舊金回收、飾金換購、修飾販售。公開秤重、透明金價,讓每一位客人都安心。歡迎中越英印菲泰各國朋友。",
  keywords: [
    "金閃閃銀樓", "SHINY GOLD", "桃園中壢黃金回收", "中壢銀樓", "舊金換新",
    "黃金回收", "飾金回收", "金條買賣", "彌月金牌", "對戒",
    "Tiệm vàng Trung Lịch", "Toko Emas Zhongli",
  ],
  authors: [{ name: "金閃閃銀樓" }],
  creator: "金閃閃銀樓",
  publisher: "金閃閃銀樓",
  alternates: {
    canonical: SITE,
    // Next.js TS 對 fil (Filipino) 不認,用 BCP 47 的 fil-PH 形式 + 強制斷言
    languages: {
      "zh-TW": SITE,
      en: `${SITE}/?locale=en`,
      vi: `${SITE}/?locale=vi`,
      id: `${SITE}/?locale=id`,
      "fil-PH": `${SITE}/?locale=fil`,
      th: `${SITE}/?locale=th`,
      "x-default": SITE,
    } as Record<string, string>,
  },
  openGraph: {
    title: "金閃閃銀樓 SHINY GOLD Jeweller's",
    description:
      "桃園中壢在地誠信銀樓.舊金換新.公開秤重.透明金價.歡迎各國朋友",
    url: SITE,
    siteName: "金閃閃銀樓",
    locale: "zh_TW",
    alternateLocale: ["en_US", "vi_VN", "id_ID", "tl_PH", "th_TH"],
    type: "website",
    images: [
      {
        url: `${SITE}/logo.png`,
        width: 1200,
        height: 630,
        alt: "金閃閃銀樓 SHINY GOLD Jeweller's",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "金閃閃銀樓 SHINY GOLD Jeweller's",
    description: "桃園中壢誠信銀樓.公開金價.歡迎各國朋友",
    images: [`${SITE}/logo.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  ...(SEARCH_CONSOLE && {
    verification: { google: SEARCH_CONSOLE },
  }),
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const h = await headers();
  const pathname = h.get("x-pathname") ?? "";
  const isAdmin = pathname.startsWith("/admin");

  const promo = !isAdmin ? await getActivePromotion() : null;

  return (
    <html lang="zh-TW">
      <head>
        <StructuredData />
      </head>
      <body
        className={`${notoTC.variable} ${cormorant.variable} ${italiana.variable} font-sans antialiased bg-ivory-50 text-ink-950 font-light ${!isAdmin ? "pb-[64px] md:pb-0" : ""}`}
      >
        <I18nProvider>
          {!isAdmin && <TopBar promo={promo} />}
          {!isAdmin && <Header />}
          {!isAdmin && <CategoryBar />}
          <main>{children}</main>
          {!isAdmin && <Footer />}
          {!isAdmin && <FloatingActions />}
          {!isAdmin && <BackToTop />}
        </I18nProvider>
        <Analytics />
      </body>
    </html>
  );
}

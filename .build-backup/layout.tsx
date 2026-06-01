import type { Metadata } from "next";
import { Noto_Sans_TC, Cormorant_Garamond, Italiana } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TopBar from "@/components/TopBar";
import CategoryBar from "@/components/CategoryBar";
import FloatingActions from "@/components/FloatingActions";

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

export const metadata: Metadata = {
  title: "金閃閃銀樓 SHINY GOLD Jeweller's | 桃園中壢黃金回收・舊金換新",
  description:
    "金閃閃銀樓位於桃園中壢中和路,提供舊金換新、舊金回收、飾金換購、修飾販售。公開秤重、透明金價,讓每一位客人都安心。",
  openGraph: {
    title: "金閃閃銀樓 SHINY GOLD Jeweller's",
    description: "桃園中壢在地誠信銀樓.舊金換新.公開秤重.透明金價.歡迎各國朋友",
    locale: "zh_TW",
    type: "website",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const h = await headers();
  const pathname = h.get("x-pathname") ?? "";
  const isAdmin = pathname.startsWith("/admin");

  return (
    <html lang="zh-TW">
      <body
        className={`${notoTC.variable} ${cormorant.variable} ${italiana.variable} font-sans antialiased bg-ivory-50 text-ink-950 font-light`}
      >
        {!isAdmin && <TopBar />}
        {!isAdmin && <Header />}
        {!isAdmin && <CategoryBar />}
        <main>{children}</main>
        {!isAdmin && <Footer />}
        {!isAdmin && <FloatingActions />}
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import Hero from "@/components/Hero";
import TrustBadges from "@/components/TrustBadges";
import Calculator from "@/components/Calculator";
import GoldPriceTicker from "@/components/GoldPriceTicker";
import Services from "@/components/Services";
import OccasionCategories from "@/components/OccasionCategories";
import ProductsPreview from "@/components/ProductsPreview";
import InstagramSection from "@/components/InstagramSection";
import Testimonials from "@/components/Testimonials";
import About from "@/components/About";
import Contact from "@/components/Contact";
import { getFeaturedProducts } from "@/lib/data/products";
import { fetchInstagramPosts } from "@/lib/instagram";

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://www.shinygold.com.tw";

export const metadata: Metadata = {
  // 用空字串避免 layout template 在首頁加 " | 金閃閃銀樓" 後綴 (首頁標題本身就含品牌)
  title: {
    absolute:
      "金閃閃銀樓 SHINY GOLD Jeweller's | 桃園中壢黃金回收・舊金換新・9999 純金",
  },
  description:
    "桃園中壢中和路 108 號誠信銀樓。9999 純金、公開秤重、透明金價、絕不扣耗損。舊金換新 / 回收 / 飾金販售 / 修飾翻新。3000+ 件實際庫存,每件附金重證明。每日 10:30–20:30 營業,歡迎中越英印菲泰各國朋友。",
  alternates: { canonical: SITE },
  openGraph: {
    title: "金閃閃銀樓 SHINY GOLD Jeweller's · 中壢黃金回收 / 舊金換新",
    description:
      "9999 純金、公開秤重、透明金價、當日結清不扣耗損。中壢中和路 108 號,每日 10:30–20:30。",
    url: SITE,
    type: "website",
  },
};

export default async function Home() {
  const [featured, igPosts] = await Promise.all([
    getFeaturedProducts(3),
    fetchInstagramPosts(6),
  ]);

  return (
    <>
      <Hero />
      <TrustBadges />
      <InstagramSection posts={igPosts} />
      <Calculator />
      <GoldPriceTicker />
      <Services />
      <OccasionCategories />
      <ProductsPreview products={featured} />
      <Testimonials />
      <About />
      <Contact />
    </>
  );
}

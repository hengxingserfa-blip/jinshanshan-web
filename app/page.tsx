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

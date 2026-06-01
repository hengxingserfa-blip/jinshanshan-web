import Hero from "@/components/Hero";
import Calculator from "@/components/Calculator";
import GoldPriceTicker from "@/components/GoldPriceTicker";
import Services from "@/components/Services";
import OccasionCategories from "@/components/OccasionCategories";
import ProductsPreview from "@/components/ProductsPreview";
import Testimonials from "@/components/Testimonials";
import About from "@/components/About";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <Calculator />
      <GoldPriceTicker />
      <Services />
      <OccasionCategories />
      <ProductsPreview />
      <Testimonials />
      <About />
      <Contact />
    </>
  );
}

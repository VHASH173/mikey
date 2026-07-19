import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProductShowcase from "@/components/ProductShowcase";
import DynamicCatalog from "@/components/DynamicCatalog";
import PremiumPlanSection from "@/components/PremiumPlanSection";
import Features from "@/components/Features";
import CtaBand from "@/components/CtaBand";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="producto" className="flex-1">
        <Hero />
        <ProductShowcase />
        <DynamicCatalog />
        <PremiumPlanSection />
        <Features />
        <CtaBand />
      </main>
      <Footer />
    </>
  );
}

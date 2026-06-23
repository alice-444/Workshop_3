import FeaturedProductsSection from "@/components/sections/FeaturedProductsSection";
import HeroSection from "@/components/sections/HeroSection";
import MarqueeBand from "@/components/sections/MarqueeBand";
import ServicesSection from "@/components/sections/ServicesSection";
import ContactCtaSection from "@/components/sections/ContactCtaSection";

export default function Home() {
  return (
    <main className="overflow-x-hidden">
      <HeroSection />
      <MarqueeBand />
      <FeaturedProductsSection />
      <ServicesSection />
      <ContactCtaSection />
    </main>
  );
}

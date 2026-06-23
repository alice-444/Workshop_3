import FeaturedProductsSection from "@/components/sections/featured-products-section";
import HeroSection from "@/components/sections/hero-section";
import MarqueeBand from "@/components/sections/marquee-band";
import ServicesSection from "@/components/sections/services-section";
import ContactCtaSection from "@/components/sections/contact-cta-section";

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

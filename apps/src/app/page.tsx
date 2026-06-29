import HeroSection from "@/components/sections/HeroSection";
import MarqueeBand from "@/components/sections/MarqueeBand";
import ServicesSection from "@/components/sections/ServicesSection";
import ContactCtaSection from "@/components/sections/ContactCtaSection";
import CollectionSection from "@/components/sections/CollectionSection";

export default function Home() {
  return (
    <main className="overflow-x-hidden">
      <HeroSection />
      <MarqueeBand />
      <CollectionSection />
      <ServicesSection />
      <ContactCtaSection />
    </main>
  );
}

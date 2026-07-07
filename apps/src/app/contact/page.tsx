import type { Metadata } from "next";
import Image from "next/image";
import ContactForm from "./ContactForm";
import FaqSection from "@/components/faq/FaqSection";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Une question, un projet sur-mesure ou l'envie de réserver un atelier ? Écrivez à Animal-Totem via le formulaire de contact.",
};

export default function ContactPage() {
  return (
    <main className="overflow-x-hidden">
      <section className="max-w-6xl mx-auto px-6 pt-12 pb-24">
        <h1
          className="text-5xl md:text-6xl font-normal text-foreground text-center leading-tight mb-14"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Contact
        </h1>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Visuel */}
          <div className="relative aspect-3/4 w-full overflow-hidden rounded-sm bg-muted">
            <Image
              src="/Lapin.png"
              alt="Livres jeunesse et lièvre en bois peint dans l'atelier"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          {/* Formulaire */}
          <ContactForm />
        </div>
      </section>

      {/* FAQ */}
      <FaqSection />
    </main>
  );
}

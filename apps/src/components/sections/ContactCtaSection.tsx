import Link from "next/link";
import Image from "next/image";
import type { Route } from "next";
import { Button } from "@e-commerce/ui/components/button";

const CARDS = [
  {
    id: "image1",
    src: "/image1.png",
    alt: "Pots de peinture dans l'atelier",
    title: "Une création sur-mesure",
    bgClass: "bg-[oklch(0.91_0.025_72)] dark:bg-[oklch(0.26_0.025_62)]",
  },
  {
    id: "image2",
    src: "/image2.png",
    alt: "Choix des couleurs dans la boîte de pastels",
    title: "Réserver un atelier",
    bgClass: "bg-[oklch(0.91_0.03_290)] dark:bg-[oklch(0.26_0.04_285)]",
  },
  {
    id: "image3",
    src: "/image3.png",
    alt: "Dessin à la main en cours de création",
    title: "Obtenir un devis",
    bgClass: "bg-[oklch(0.91_0.018_235)] dark:bg-[oklch(0.24_0.02_240)]",
  },
];

export default function ContactCtaSection() {
  return (
    <section className="py-16 overflow-hidden bg-[oklch(0.975_0.01_72)] dark:bg-[oklch(0.185_0.02_52)]">
      <div className="max-w-6xl mx-auto px-6 flex flex-col items-center gap-12">

        {/* En-tête */}
        <div className="flex flex-col items-center gap-3 text-center max-w-2xl">
          <h2
            className="text-5xl md:text-6xl font-light text-foreground leading-tight"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Tu souhaites en savoir plus ?
          </h2>
          <p
            className="text-base text-muted-foreground leading-relaxed"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Une envie particulière ou une question sur mes ateliers ? Je suis à ton écoute.
          </p>
        </div>

        {/* Cartes images */}
        <div className="grid sm:grid-cols-3 gap-5 w-full">
          {CARDS.map((card) => (
            <div
              key={card.id}
              className={`group rounded-3xl p-3 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${card.bgClass}`}
            >
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-muted">
                <Image
                  src={card.src}
                  alt={card.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, 33vw"
                />
                {/* Overlay nom du service au survol */}
                <div className="absolute inset-0 flex items-center justify-center bg-foreground/0 transition-colors duration-300 group-hover:bg-foreground/45">
                  <span
                    className="px-4 text-center text-lg font-semibold text-background opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {card.title}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <Link href={"/contact" as Route}>
          <Button
            size="lg"
            className="px-8 h-12 text-xs tracking-[0.15em] uppercase"
          >
            As-tu une question ?
          </Button>
        </Link>

      </div>
    </section>
  );
}

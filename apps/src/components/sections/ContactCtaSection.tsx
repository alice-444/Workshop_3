import Link from "next/link";
import type { Route } from "next";
import { Button } from "@e-commerce/ui/components/button";

const CARDS = [
  {
    id: "sur-mesure",
    emoji: "🪵",
    title: "Une création sur-mesure",
    description: "Vous avez un projet en tête ? Décrivez-le nous et nous vous proposerons une solution adaptée.",
    bgClass: "bg-[oklch(0.91_0.025_72)] dark:bg-[oklch(0.26_0.025_62)]",
  },
  {
    id: "ateliers",
    emoji: "🎨",
    title: "Réserver un atelier",
    description: "Envie d'une expérience créative ? Nos ateliers sont ouverts aux débutants comme aux passionnés.",
    bgClass: "bg-[oklch(0.91_0.03_290)] dark:bg-[oklch(0.26_0.04_285)]",
  },
  {
    id: "devis",
    emoji: "📐",
    title: "Obtenir un devis",
    description: "Pour tout projet professionnel ou événementiel, nous établissons un devis personnalisé sous 48h.",
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
            Vous souhaitez en savoir plus ?
          </h2>
          <p
            className="text-base text-muted-foreground leading-relaxed"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Une envie particulière ou une question sur nos ateliers ? Nous sommes à votre écoute.
          </p>
        </div>

        {/* Cartes */}
        <div className="grid sm:grid-cols-3 gap-5 w-full">
          {CARDS.map((card) => (
            <div
              key={card.id}
              className={`relative rounded-2xl p-6 flex flex-col gap-3 min-h-52 ${card.bgClass}`}
            >
              <span className="text-3xl select-none" aria-hidden="true">{card.emoji}</span>
              <h3
                className="text-lg font-semibold text-foreground leading-snug"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {card.title}
              </h3>
              <p
                className="text-sm text-muted-foreground leading-relaxed"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {card.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <Link href={"/contact" as Route}>
          <Button
            size="lg"
            className="px-8 h-12 text-xs tracking-[0.15em] uppercase"
          >
            Avez-vous une question ?
          </Button>
        </Link>

      </div>
    </section>
  );
}

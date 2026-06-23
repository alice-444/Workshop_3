import type { Metadata } from "next";
import type { Route } from "next";
import Link from "next/link";
import { Button } from "@e-commerce/ui/components/button";
import ServicesSection from "@/components/sections/services-section";

export const metadata: Metadata = {
  title: "À propos",
  description:
    "Rencontrez Camille, créatrice de l'atelier Animal-Totem. Une artisane qui façonne à la main des objets en bois local, pensés pour durer.",
};

const STATS = [
  { value: "15 ans", label: "à l'établi" },
  { value: "100 %", label: "bois local" },
  { value: "Pièces", label: "uniques" },
] as const;

const VALUES = [
  {
    emoji: "🌳",
    title: "Bois choisi",
    description:
      "Des essences locales sélectionnées une à une, séchées lentement et travaillées dans le respect de leur fil.",
  },
  {
    emoji: "✋",
    title: "Tout à la main",
    description:
      "Gouge, couteau, tour à bois : chaque geste laisse sa trace. Aucune pièce n'est tout à fait identique à une autre.",
  },
  {
    emoji: "♻️",
    title: "Pensé pour durer",
    description:
      "Des finitions naturelles à l'huile et à la cire, des assemblages solides, des objets qui vieillissent bien.",
  },
] as const;

export default function AboutPage() {
  return (
    <main className="overflow-x-hidden">
      {/* En-tête */}
      <section className="max-w-6xl mx-auto px-6 pt-12 pb-16">
        <header className="max-w-2xl mb-14">
          <div className="flex items-center gap-2 mb-4">
            <div className="h-px w-8 bg-primary" />
            <p
              className="text-xs uppercase tracking-[0.3em] text-primary font-light"
              style={{ fontFamily: "var(--font-body)" }}
            >
              L'atelier
            </p>
          </div>
          <h1
            className="text-5xl md:text-6xl font-light text-foreground leading-[1.05] mb-5"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            La main qui <em className="text-primary not-italic">façonne</em>
          </h1>
          <p
            className="text-base text-muted-foreground leading-relaxed font-light"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Animal-Totem, c'est l'atelier d'une créatrice passionnée de bois et de
            formes vivantes. Ici, chaque objet naît d'une bille brute et de beaucoup
            de patience.
          </p>
        </header>

        {/* Présentation de la créatrice */}
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Portrait */}
          <div
            className="relative min-h-[420px] rounded-3xl overflow-hidden flex items-center justify-center bg-[oklch(0.88_0.05_66)] dark:bg-[oklch(0.27_0.04_60)]"
            aria-hidden="true"
          >
            <div
              className="absolute inset-0 opacity-[0.12]"
              style={{
                backgroundImage:
                  "repeating-radial-gradient(ellipse at 50% 55%, transparent 0px, transparent 22px, oklch(0.42 0.07 55) 24px, transparent 26px)",
              }}
            />
            <span className="relative text-8xl drop-shadow-lg select-none">👩‍🎨</span>
          </div>

          {/* Bio */}
          <div className="flex flex-col gap-6">
            <h2
              className="text-3xl md:text-4xl font-light text-foreground leading-tight"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Bonjour, je suis <span className="text-primary">Camille</span>
            </h2>
            <div
              className="flex flex-col gap-4 text-base text-muted-foreground leading-relaxed font-light"
              style={{ fontFamily: "var(--font-body)" }}
            >
              <p>
                Ébéniste de formation, j'ai posé mes outils il y a quinze ans dans
                un petit atelier lyonnais. Ce qui m'anime, c'est cet instant où une
                forme apparaît sous la gouge — comme si l'animal, l'objet ou le totem
                attendait déjà dans le bois.
              </p>
              <p>
                Je travaille exclusivement des essences locales, récupérées auprès de
                scieries de la région. Chaque pièce est sculptée, tournée ou assemblée
                à la main, puis nourrie d'huiles et de cires naturelles. Rien n'est
                pressé : le bois impose son rythme, je le suis.
              </p>
            </div>

            <p
              className="text-2xl text-foreground/90 italic leading-snug border-l-2 border-primary pl-4"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              « Je ne crée pas des objets, je révèle ce que le bois portait déjà. »
            </p>
          </div>
        </div>
      </section>

      {/* Services */}
      <ServicesSection />

      {/* CTA final */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="flex flex-col items-center gap-6 text-center">
          <h2
            className="text-4xl md:text-5xl font-light text-foreground leading-tight max-w-2xl"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Une idée à faire naître ?
          </h2>
          <p
            className="text-base text-muted-foreground leading-relaxed max-w-xl font-light"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Parlons de votre projet, ou laissez-vous porter par les créations déjà
            sorties de l'atelier.
          </p>
          <div className="flex flex-wrap gap-3 justify-center pt-2">
            <Link href={"/contact" as Route}>
              <Button
                size="lg"
                className="px-8 h-11 text-xs tracking-[0.15em] uppercase"
                style={{ borderBottomColor: "oklch(0.28 0.05 50)" }}
              >
                Me contacter
              </Button>
            </Link>
            <Link href={"/shop" as Route}>
              <Button
                variant="outline"
                size="lg"
                className="px-8 h-11 text-xs tracking-[0.15em] uppercase"
              >
                Voir la boutique
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

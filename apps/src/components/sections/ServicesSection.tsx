import Link from "next/link";
import Image from "next/image";
import type { Route } from "next";
import { Button } from "@e-commerce/ui/components/button";

const SERVICES = [
  {
    id: "sur-mesure",
    title: "Créations Sur-mesure",
    description:
      "Donnez vie à vos idées. Un animal préféré ?\nNous illustrons l'animal de votre choix.\nNous fabriquons la tête de l'animal de votre choix pour des pièces uniques en bois, adaptées à votre intérieur et à vos envies.\nChaque création est une histoire.",
    cta: "Découvrir la collection",
    href: "/shop" as Route,
    image: "/sur-mesure.png",
    imageAlt: "Artisane façonnant une pièce en bois sur-mesure",
    framed: true,
    reverse: false,
  },
  {
    id: "ateliers",
    title: "Ateliers Créatifs",
    description:
      "Éveillez leur imagination. Des moments ludiques où les enfants découvrent le plaisir de créer de leurs propres mains. Un espace d'expression pour expérimenter et s'amuser.",
    cta: "Découvrir les ateliers",
    href: "/about" as Route,
    image: "/ateliers.png",
    imageAlt: "Atelier créatif : création à la main",
    framed: true,
    reverse: true,
  },
];

export default function ServicesSection() {
  return (
    <section className="py-16 bg-[oklch(0.96_0.018_70)]">
      <div className="max-w-5xl mx-auto px-6 flex flex-col gap-16">

        <div className="text-center">
          <h2
            className="text-5xl md:text-6xl font-normal text-foreground leading-tight"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Services
          </h2>
        </div>

        {SERVICES.map((service) => (
          <div key={service.id} className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">

            {/* Visuel */}
            <div
              className={`${service.framed ? "bg-[oklch(0.93_0.035_90)] p-4 rounded-[2rem]" : ""} ${service.reverse ? "order-1 md:order-2" : ""}`}
            >
              <div className="relative aspect-square w-full overflow-hidden rounded-3xl bg-muted">
                <Image
                  src={service.image}
                  alt={service.imageAlt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>

            {/* Contenu */}
            <div className={`flex flex-col gap-5 ${service.reverse ? "order-2 md:order-1" : ""}`}>
              <h3
                className="text-2xl font-semibold text-foreground"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {service.title}
              </h3>
              <p
                className="text-base text-foreground/80 leading-relaxed whitespace-pre-line"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {service.description}
              </p>

              <div className="mt-4">
                <Link href={service.href} className="w-full sm:w-fit inline-block">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto px-8 h-13 text-lg font-medium"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {service.cta}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        ))}

      </div>
    </section>
  );
}

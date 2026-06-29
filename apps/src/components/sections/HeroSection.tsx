import Link from "next/link";
import Image from "next/image";
import type { Route } from "next";
import { Button } from "@e-commerce/ui/components/button";

export default function HeroSection() {
  return (
    <section className="relative z-0 -mt-24 min-h-[88vh] flex items-start overflow-hidden">

      {/* Image de fond */}
      <Image
        src="/Hero.png"
        alt=""
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />

      {/* Voile sombre pour la lisibilité */}
      <div
        className="absolute inset-0 bg-foreground/55"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-3xl mx-auto px-6 pt-36 pb-24 flex flex-col items-center text-center gap-6 w-full">

        {/* Titre */}
        <h1
          className="text-white leading-[1.1] drop-shadow-sm"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          <span className="block text-5xl md:text-7xl">
            <span className="font-bold">Artiste plasticienne</span>
          </span>
          <span className="block text-5xl md:text-7xl mt-1">
            <span className="font-light">Animal-</span>
            <span className="font-bold">Totem</span>
          </span>
        </h1>

        {/* Sous-titre */}
        <p
          className="text-base md:text-lg text-white/80"
          style={{ fontFamily: "var(--font-body)" }}
        >
          Ateliers créatifs et contes
        </p>

        {/* CTA */}
        <div className="flex flex-wrap justify-center gap-3 pt-2">
          <Link href={"/shop" as Route}>
            <Button
              size="lg"
              className="px-8 h-11 text-xs tracking-[0.15em] uppercase bg-white text-foreground hover:bg-white/90 border-b-black/15"
            >
              Découvrir la collection
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

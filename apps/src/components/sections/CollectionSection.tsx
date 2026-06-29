import Link from "next/link";
import Image from "next/image";
import type { Route } from "next";
import { buttonVariants } from "@e-commerce/ui/components/button";
import { cn } from "@e-commerce/ui/lib/utils";

const IMAGES = [
  { src: "/Lion.png", alt: "Tête de lion sculptée", span: "main" },
  { src: "/Giraffe.png", alt: "Girafe en papier découpé", span: "top-right" },
  { src: "/Lapin.png", alt: "Lapin en feutrine", span: "bottom-left" },
  { src: "/Koala.png", alt: "Koala en feutrine", span: "bottom-right" },
];

export default function CollectionSection() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-16">
      {/* En-tête */}
      <div className="mb-12 text-center">
        <h2
          className="text-4xl md:text-5xl font-light text-foreground leading-tight"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Collections
        </h2>
      </div>

      {/* Bento */}
      <div className="group/bento relative grid grid-cols-2 grid-rows-2 gap-3 h-[480px] md:h-[560px]">
        {/* Grande image à gauche */}
        <div className="relative row-span-2 rounded-2xl overflow-hidden bg-muted">
          <Image
            src={IMAGES[0].src}
            alt={IMAGES[0].alt}
            fill
            className="object-cover transition-transform duration-700 group-hover/bento:scale-[1.02]"
            sizes="(max-width: 768px) 50vw, 33vw"
          />
        </div>

        {/* Image en haut à droite */}
        <div className="relative rounded-2xl overflow-hidden bg-muted">
          <Image
            src={IMAGES[1].src}
            alt={IMAGES[1].alt}
            fill
            className="object-cover transition-transform duration-700 group-hover/bento:scale-[1.02]"
            sizes="(max-width: 768px) 50vw, 33vw"
          />
        </div>

        {/* Deux petites images en bas à droite */}
        <div className="grid grid-cols-2 gap-3">
          <div className="relative rounded-2xl overflow-hidden bg-muted">
            <Image
              src={IMAGES[2].src}
              alt={IMAGES[2].alt}
              fill
              className="object-cover transition-transform duration-700 group-hover/bento:scale-[1.02]"
              sizes="25vw"
            />
          </div>
          <div className="relative rounded-2xl overflow-hidden bg-muted">
            <Image
              src={IMAGES[3].src}
              alt={IMAGES[3].alt}
              fill
              className="object-cover transition-transform duration-700 group-hover/bento:scale-[1.02]"
              sizes="25vw"
            />
          </div>
        </div>

        {/* Overlay sombre + bouton centré */}
        <Link
          href={"/shop" as Route}
          className="absolute inset-0 flex items-center justify-center bg-foreground/0 group-hover/bento:bg-foreground/30 transition-all duration-500 rounded-2xl"
          aria-label="Explorer la collection"
        >
          <span
            className={cn(
              buttonVariants({ size: "lg" }),
              "px-8 h-11 text-xs tracking-[0.15em] uppercase",
              "opacity-0 translate-y-2 group-hover/bento:opacity-100 group-hover/bento:translate-y-0",
            )}
            style={{ fontFamily: "var(--font-body)" }}
          >
            Explorer la collection
          </span>
        </Link>
      </div>
    </section>
  );
}

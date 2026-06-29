import Link from "next/link";
import type { Route } from "next";
import { Button } from "@e-commerce/ui/components/button";

export default function HeroSection() {
  return (
    <section className="relative min-h-[88vh] flex items-center bg-background overflow-hidden">

      {/* Anneaux concentriques — fil du bois */}
      <div
        className="absolute inset-0 opacity-[0.07] dark:opacity-[0.1] pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage: `
            repeating-radial-gradient(
              ellipse at 60% 50%,
              transparent 0px,
              transparent 26px,
              oklch(0.42 0.07 55 / 1) 28px,
              transparent 30px
            )
          `,
          animation: "heroPulse 8s ease-in-out infinite",
        }}
      />

      {/* Accent doré en diagonale */}
      <div
        className="absolute top-0 right-0 w-1/2 h-full opacity-[0.07] dark:opacity-[0.1] pointer-events-none"
        aria-hidden="true"
        style={{
          background: "linear-gradient(135deg, transparent 40%, oklch(0.78 0.1 75) 100%)",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-16 items-center w-full">

        {/* Texte */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-2">
            <div className="h-px w-8 bg-primary" />
          </div>
          <div className="flex flex-wrap gap-3 pt-2">
            <Link href={"/shop" as Route}>
              <Button size="lg" className="px-8 h-11 text-xs tracking-[0.15em] uppercase">
                Découvrir la collection
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

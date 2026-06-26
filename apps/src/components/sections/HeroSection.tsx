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
            <span
              className="text-xs uppercase tracking-[0.3em] text-primary font-light"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Artisan créateur · France
            </span>
          </div>

          <h1
            className="text-6xl md:text-7xl lg:text-8xl font-light leading-[0.95] text-foreground"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Le bois
            <br />
            <em className="text-primary not-italic">raconté</em>
            <br />
            à la main
          </h1>

          <p
            className="text-base text-muted-foreground leading-relaxed max-w-md font-light"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Des objets pensés pour durer, taillés dans des bois nobles de nos forêts.
            Chaque création porte la marque du temps passé à l'atelier, outil en main.
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <Link href={"/shop" as Route}>
              <Button size="lg" className="px-8 h-11 text-xs tracking-[0.15em] uppercase">
                Découvrir nos créations
              </Button>
            </Link>
          </div>
        </div>

        {/* Composition visuelle */}
        <div className="hidden md:grid grid-cols-2 gap-3 h-[520px]" aria-hidden="true">
          <div className="flex flex-col gap-3">
            <div className="flex-1 rounded-sm flex items-center justify-center text-5xl bg-[oklch(0.87_0.04_68)] dark:bg-[oklch(0.28_0.035_62)]">🪵</div>
            <div className="h-32 rounded-sm flex items-center justify-center text-4xl bg-[oklch(0.78_0.06_55)] dark:bg-[oklch(0.26_0.04_55)]">🌿</div>
          </div>
          <div className="flex flex-col gap-3 pt-8">
            <div className="h-28 rounded-sm flex items-center justify-center text-4xl bg-[oklch(0.93_0.025_78)] dark:bg-[oklch(0.24_0.025_65)]">🍂</div>
            <div className="flex-1 rounded-sm flex items-center justify-center text-5xl bg-[oklch(0.62_0.06_52)] dark:bg-[oklch(0.32_0.04_52)]">🖼️</div>
          </div>
        </div>
      </div>
    </section>
  );
}

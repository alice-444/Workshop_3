import Link from "next/link";
import Image from "next/image";
import type { Route } from "next";
import { Button } from "@e-commerce/ui/components/button";

export default function NotFound() {
  return (
    <main className="min-h-[70vh] flex items-center justify-center px-6 py-24">
      <div className="max-w-md text-center flex flex-col items-center">
        {/* Pictogramme */}
        <div
          className="w-24 h-24 rounded-2xl flex items-center justify-center mb-8 bg-[var(--p-bg)] dark:bg-[var(--p-bg-dark)]"
          style={
            {
              "--p-bg": "oklch(0.9 0.03 70)",
              "--p-bg-dark": "oklch(0.27 0.03 60)",
            } as React.CSSProperties
          }
        >
          <Image
            src="/logo/logo_icon.png"
            alt="Animal-Totem"
            width={72}
            height={72}
            className="h-16 w-auto select-none"
          />
        </div>

        <p
          className="text-xs uppercase tracking-[0.3em] text-primary font-light mb-4"
          style={{ fontFamily: "var(--font-body)" }}
        >
          Erreur 404
        </p>
        <h1
          className="text-4xl md:text-5xl font-light text-foreground leading-tight mb-4"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Page introuvable
        </h1>
        <p
          className="text-sm text-muted-foreground leading-relaxed mb-8 font-light"
          style={{ fontFamily: "var(--font-body)" }}
        >
          Cette page s'est égarée dans l'atelier. Elle a peut-être été déplacée,
          ou n'a jamais existé.
        </p>

        <div className="flex flex-wrap gap-3 justify-center">
          <Link href="/">
            <Button size="lg" className="px-8 h-11 text-xs tracking-[0.15em] uppercase">
              Retour à l'accueil
            </Button>
          </Link>
          <Link href={"/shop" as Route}>
            <Button
              variant="outline"
              size="lg"
              className="px-6 h-11 text-xs tracking-[0.15em] uppercase"
            >
              Voir la boutique
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}

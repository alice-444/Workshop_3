"use client";
import Link from "next/link";
import type { Route } from "next";
import { usePathname } from "next/navigation";

import CartPopover from "./cart-popover";
import { ModeToggle } from "./mode-toggle";

const NAV_LINKS: { to: Route; label: string }[] = [
  { to: "/" as Route, label: "Accueil" },
  { to: "/shop" as Route, label: "Boutique" },
  { to: "/about" as Route, label: "À propos" },
  { to: "/contact" as Route, label: "Contact" },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 pointer-events-none">
      {/* Bandeau supérieur */}
      <div className="pointer-events-auto bg-primary text-primary-foreground text-center py-1.5 text-xs tracking-[0.2em] uppercase font-light" style={{ fontFamily: "var(--font-body)" }}>
        Livraison soignée · Pièces uniques · Bois local
      </div>

      <div className="px-4 pt-3 pb-2">
        <div className="max-w-5xl mx-auto pointer-events-auto">
          <div className="flex items-center justify-between gap-6 bg-background/80 backdrop-blur-md border border-border/60 rounded-full px-5 py-3 shadow-sm">

            {/* Logo / Marque */}
            <Link
              href="/"
              className="group flex items-center gap-3 no-underline shrink-0"
              aria-label="Bois & Art — Retour à l'accueil"
            >
              <div className="relative w-8 h-8 flex items-center justify-center">
                <div className="absolute inset-0 bg-primary/10 rotate-45 rounded-sm group-hover:bg-primary/20 transition-colors duration-300" />
                <span className="relative text-base select-none" aria-hidden="true">🪵</span>
              </div>
              <div className="flex flex-col leading-none">
                <span
                  className="text-xl font-semibold tracking-wide text-foreground group-hover:text-primary transition-colors duration-300"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  Bois <span className="text-primary">&amp;</span> Art
                </span>
                <span className="text-[8px] uppercase tracking-[0.3em] text-muted-foreground font-light mt-0.5" style={{ fontFamily: "var(--font-body)" }}>
                  Artisan créateur
                </span>
              </div>
            </Link>

            {/* Navigation centrale */}
            <nav aria-label="Navigation principale" className="hidden md:block">
              <ul className="flex items-center gap-1 list-none">
                {NAV_LINKS.map(({ to, label }) => {
                  const isActive = pathname === to;
                  return (
                    <li key={to}>
                      <Link
                        href={to}
                        className={[
                          "relative px-3 py-1.5 text-[11px] uppercase tracking-[0.15em] font-medium transition-all duration-200 no-underline block rounded-full",
                          isActive
                            ? "text-primary bg-primary/8"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted/60",
                        ].join(" ")}
                        style={{ fontFamily: "var(--font-body)" }}
                      >
                        {label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Actions droite */}
            <div className="flex items-center gap-2 shrink-0">
              <CartPopover />
              <ModeToggle />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

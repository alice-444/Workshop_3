"use client";
import Link from "next/link";
import Image from "next/image";
import type { Route } from "next";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

import CartPopover from "@/components/cart/CartPopover";
import { ModeToggle } from "@/components/ui/ModeToggle";

const NAV_LINKS: { to: Route; label: string }[] = [
  { to: "/" as Route, label: "Accueil" },
  { to: "/shop" as Route, label: "Boutique" },
  { to: "/about" as Route, label: "À propos" },
  { to: "/contact" as Route, label: "Contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="relative z-50">
      {/* Bandeau supérieur — page d'accueil uniquement */}
      {pathname === "/" && (
        <div className="pointer-events-auto bg-secondary text-secondary-foreground text-center py-1.5 text-xs tracking-[0.2em] uppercase font-light" style={{ fontFamily: "var(--font-body)" }}>
          Livraison soignée · Pièces uniques
        </div>
      )}

      <div className="px-4 pt-3 pb-2">
        <div className="w-full pointer-events-auto">
          <div className="flex items-center justify-between gap-6 bg-accent text-accent-foreground rounded-lg px-6 py-5">

            {/* Logo / Marque */}
            <Link
              href="/"
              className="group flex items-center no-underline shrink-0"
              aria-label="Animal-Totem — Retour à l'accueil"
            >
              <Image
                src="/logo/logo_navbar.png"
                alt="Animal-Totem"
                width={170}
                height={40}
                priority
                className="h-9 w-auto select-none transition-transform duration-300 group-hover:-translate-y-0.5"
              />
            </Link>

            {/* Navigation centrale — desktop */}
            <nav aria-label="Navigation principale" className="hidden md:block">
              <ul className="flex items-center gap-1 list-none">
                {NAV_LINKS.map(({ to, label }) => {
                  const isActive = pathname === to;
                  return (
                    <li key={to}>
                      <Link
                        href={to}
                        className={[
                          "relative px-3 py-1.5 text-[11px] uppercase tracking-[0.15em] font-medium transition-all duration-200 block rounded-lg underline-offset-4",
                          isActive
                            ? "text-accent-foreground underline"
                            : "text-accent-foreground/75 hover:text-accent-foreground no-underline hover:underline",
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
              {/* Burger — mobile uniquement */}
              <button
                onClick={() => setMenuOpen((v) => !v)}
                aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
                aria-expanded={menuOpen}
                className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg text-accent-foreground/75 hover:text-accent-foreground hover:bg-accent-foreground/10 transition-all duration-200"
              >
                {menuOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>

          {/* Menu mobile déroulant */}
          <div
            className={[
              "md:hidden overflow-hidden transition-all duration-300 ease-in-out",
              menuOpen ? "max-h-80 opacity-100 mt-2" : "max-h-0 opacity-0",
            ].join(" ")}
          >
            <nav
              aria-label="Navigation mobile"
              className="bg-accent text-accent-foreground rounded-lg px-3 py-3"
            >
              <ul className="flex flex-col gap-1 list-none">
                {NAV_LINKS.map(({ to, label }) => {
                  const isActive = pathname === to;
                  return (
                    <li key={to}>
                      <Link
                        href={to}
                        onClick={() => setMenuOpen(false)}
                        className={[
                          "block px-4 py-2.5 text-[11px] uppercase tracking-[0.15em] font-medium rounded-lg transition-all duration-200 underline-offset-4",
                          isActive
                            ? "text-accent-foreground underline"
                            : "text-accent-foreground/75 hover:text-accent-foreground no-underline hover:underline",
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
          </div>

        </div>
      </div>
    </header>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import type { Route } from "next";
import Link from "next/link";
import { ShoppingBag, X, ArrowRight } from "lucide-react";
import { Button } from "@e-commerce/ui/components/button";

export default function CartPopover() {
  const itemCount: number = 0;
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  return (
    <div ref={containerRef} className="relative">

      {/* Trigger */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={`Panier — ${itemCount} article${itemCount !== 1 ? "s" : ""}`}
        aria-expanded={open}
        className="relative p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <ShoppingBag size={18} />
        {itemCount > 0 ? (
          <span className="absolute -top-0.5 -right-0.5 min-w-[16px] h-4 px-1 bg-primary text-primary-foreground text-[9px] font-bold rounded-full flex items-center justify-center leading-none">
            {itemCount > 99 ? "99+" : itemCount}
          </span>
        ) : (
          <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-primary rounded-full" aria-hidden="true" />
        )}
      </button>

      {/* Popover */}
      {open && (
        <div
          role="dialog"
          aria-label="Panier"
          className="absolute right-0 top-full mt-3 w-72 rounded-2xl border border-border/50 bg-background/98 backdrop-blur-xl shadow-2xl z-50 animate-in fade-in-0 zoom-in-95 duration-200 origin-top-right overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-border/40">
            <div className="flex items-center gap-2.5">
              <ShoppingBag size={14} className="text-primary" />
              <h2
                className="text-sm font-semibold text-foreground tracking-wide"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Mon panier
              </h2>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Fermer le panier"
              className="p-1 rounded-full text-muted-foreground/60 hover:text-foreground hover:bg-muted/50 transition-all duration-150"
            >
              <X size={13} />
            </button>
          </div>

          {/* État vide */}
          {itemCount === 0 && (
            <div className="flex flex-col items-center gap-5 px-6 py-8 text-center">

              {/* Illustration */}
              <div className="relative w-20 h-20">
                <div className="absolute inset-0 rounded-2xl opacity-60 bg-[oklch(0.93_0.02_72)] dark:bg-[oklch(0.28_0.025_62)]" />
                <div className="absolute inset-0 rounded-2xl rotate-6 opacity-30 bg-[oklch(0.87_0.04_68)] dark:bg-[oklch(0.24_0.03_62)]" />
                <div className="relative w-full h-full flex items-center justify-center text-3xl select-none">
                  🛒
                </div>
              </div>

              {/* Texte */}
              <div className="flex flex-col gap-1.5">
                <p
                  className="text-sm font-semibold text-foreground"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  Votre panier est vide
                </p>
                <p
                  className="text-[11px] text-muted-foreground leading-relaxed"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  Explorez nos créations artisanales<br />en bois, façonnées à la main.
                </p>
              </div>

              {/* CTA */}
              <Link href={"/shop" as Route} onClick={() => setOpen(false)}>
                <Button size="sm" className="gap-2 px-5 text-[11px] tracking-[0.1em] uppercase group">
                  Voir la boutique
                  <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform duration-200" />
                </Button>
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

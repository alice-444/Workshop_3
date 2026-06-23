"use client";

import { useEffect, useRef, useState } from "react";
import type { Route } from "next";
import Link from "next/link";
import { ShoppingBag, PackageOpen, X } from "lucide-react";

export default function CartPopover() {
  const itemCount: number = 0; // à brancher sur le vrai state
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
          <span className="absolute top-1 right-1 w-2 h-2 bg-primary/40 rounded-full" aria-hidden="true" />
        )}
      </button>

      {open && (
        <div
          role="dialog"
          aria-label="Panier"
          className="absolute right-0 top-full mt-3 w-80 rounded-2xl border border-border/60 bg-background/95 backdrop-blur-lg shadow-xl z-50 animate-in fade-in-0 zoom-in-95 duration-150 origin-top-right"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 pt-4 pb-3 border-b border-border/50">
            <h2
              className="text-sm font-semibold tracking-wide text-foreground"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Mon panier
            </h2>
            <button
              onClick={() => setOpen(false)}
              aria-label="Fermer le panier"
              className="p-1 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors"
            >
              <X size={14} />
            </button>
          </div>

          {/* Empty state */}
          {itemCount === 0 && (
            <div className="flex flex-col items-center justify-center gap-4 px-6 py-10 text-center">
              <div className="relative flex items-center justify-center w-16 h-16 rounded-2xl bg-muted/60">
                <div className="absolute inset-0 bg-primary/5 rounded-2xl rotate-3" />
                <PackageOpen size={28} className="relative text-muted-foreground/60" />
              </div>
              <div className="space-y-1">
                <p
                  className="text-sm font-medium text-foreground"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  Votre panier est vide
                </p>
                <p
                  className="text-xs text-muted-foreground leading-relaxed max-w-[200px]"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  Découvrez nos pièces artisanales en bois, façonnées avec soin.
                </p>
              </div>
              <Link
                href={"/collections" as Route}
                onClick={() => setOpen(false)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-primary text-primary-foreground text-xs font-medium tracking-wide uppercase transition-opacity hover:opacity-90 no-underline"
                style={{ fontFamily: "var(--font-body)" }}
              >
                Voir les collections
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

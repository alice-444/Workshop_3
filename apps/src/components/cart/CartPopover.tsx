"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import type { Route } from "next";
import { ShoppingBag, X, ImageIcon, Minus, Plus } from "lucide-react";
import { Button } from "@e-commerce/ui/components/button";
import { useCart } from "./CartProvider";

const priceFormatter = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
  minimumFractionDigits: 0,
});

export default function CartPopover() {
  const { items, itemCount, subtotal, checkoutUrl, loading, updateQuantity, removeItem } = useCart();
  const [open, setOpen] = useState(false);

  // Fermeture au clavier (Échap) + verrouillage du scroll de fond
  useEffect(() => {
    if (!open) return;
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", handleEscape);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  return (
    <>
      {/* Trigger */}
      <button
        onClick={() => setOpen(true)}
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

      {open && createPortal(
        <>
          {/* Fond assombri */}
          <div
            className="fixed inset-0 z-40 bg-foreground/40 backdrop-blur-[1px] animate-in fade-in-0 duration-200"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />

          {/* Tiroir latéral */}
          <aside
            role="dialog"
            aria-label="Panier"
            aria-modal="true"
            className="fixed right-0 top-0 z-50 flex h-dvh w-full max-w-md flex-col bg-background shadow-2xl animate-in slide-in-from-right duration-300"
          >
            {/* Header */}
            <div className="px-6 pt-5 pb-4">
              <div className="flex items-center justify-between gap-4">
                <h2
                  className="text-3xl font-normal text-foreground"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  Mon panier
                </h2>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Fermer le panier"
                  className="p-1.5 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-all duration-150"
                >
                  <X size={22} />
                </button>
              </div>
              <div className="mt-4 border-b border-foreground/20" />
            </div>

            {/* État vide */}
            {itemCount === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-8 px-6 text-center">
                <p
                  className="text-lg text-foreground"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  Votre panier est actuellement vide.
                </p>
                <Link href={"/shop" as Route} onClick={() => setOpen(false)}>
                  <Button size="lg" className="px-8 h-12 text-xs tracking-[0.15em] uppercase">
                    Découvrir la collection
                  </Button>
                </Link>
              </div>
            ) : (
              <>
                {/* Liste des articles */}
                <ul className="flex-1 overflow-y-auto px-6 py-6 flex flex-col gap-4 list-none">
                  {items.map((item) => (
                    <li
                      key={item.id}
                      className="flex gap-4 rounded-xl bg-muted/40 overflow-hidden"
                    >
                      {/* Vignette */}
                      <div className="relative w-28 shrink-0 self-stretch bg-muted flex items-center justify-center text-muted-foreground">
                        {item.image ? (
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                            sizes="112px"
                          />
                        ) : item.emoji ? (
                          <span className="text-3xl" role="img" aria-hidden="true">{item.emoji}</span>
                        ) : (
                          <ImageIcon size={28} aria-hidden="true" />
                        )}
                      </div>

                      {/* Infos */}
                      <div className="flex flex-1 flex-col gap-2 py-3 pr-4 min-w-0">
                        {/* Label + prix */}
                        <div className="flex items-start justify-between gap-3">
                          <p
                            className="text-sm font-medium text-foreground"
                            style={{ fontFamily: "var(--font-heading)" }}
                          >
                            {item.name}
                          </p>
                          <p
                            className="text-sm text-foreground whitespace-nowrap"
                            style={{ fontFamily: "var(--font-body)" }}
                          >
                            {priceFormatter.format(item.price)}
                          </p>
                        </div>

                        {/* Quantité */}
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.lineId, item.quantity - 1)}
                            disabled={loading}
                            aria-label={`Réduire la quantité de ${item.name}`}
                            className="w-6 h-6 rounded-full border border-border/60 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-border transition-colors disabled:opacity-40"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="text-sm tabular-nums w-6 text-center text-foreground" aria-live="polite">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.lineId, item.quantity + 1)}
                            disabled={loading}
                            aria-label={`Augmenter la quantité de ${item.name}`}
                            className="w-6 h-6 rounded-full border border-border/60 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-border transition-colors disabled:opacity-40"
                          >
                            <Plus size={12} />
                          </button>
                        </div>

                        {/* Supprimer */}
                        <button
                          onClick={() => removeItem(item.lineId)}
                          aria-label={`Retirer ${item.name} du panier`}
                          className="self-start text-xs text-muted-foreground hover:text-destructive transition-colors underline underline-offset-2"
                          style={{ fontFamily: "var(--font-body)" }}
                        >
                          Supprimer
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>

                {/* Pied : total + payer */}
                <div className="px-6 pb-5 flex flex-col gap-4">
                  <div className="border-t border-foreground/20" />
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                      <span
                        className="text-sm text-muted-foreground"
                        style={{ fontFamily: "var(--font-body)" }}
                      >
                        Sous-total
                      </span>
                      <span
                        className="text-lg font-semibold text-foreground"
                        style={{ fontFamily: "var(--font-heading)" }}
                      >
                        {priceFormatter.format(subtotal)}
                      </span>
                    </div>
                    <p
                      className="text-[11px] text-muted-foreground/70"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      Frais de livraison calculés au paiement.
                    </p>
                  </div>
                  <div className="flex justify-end">
                    {checkoutUrl ? (
                      <a href={checkoutUrl} onClick={() => setOpen(false)}>
                        <Button size="lg" className="px-10 h-12 text-xs tracking-[0.15em] uppercase">
                          Payer
                        </Button>
                      </a>
                    ) : (
                      <Button size="lg" disabled className="px-10 h-12 text-xs tracking-[0.15em] uppercase">
                        Payer
                      </Button>
                    )}
                  </div>
                </div>
              </>
            )}
          </aside>
        </>,
        document.body,
      )}
    </>
  );
}

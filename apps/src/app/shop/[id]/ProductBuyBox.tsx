"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@e-commerce/ui/components/button";
import { useCart } from "@/components/cart/CartProvider";
import type { NormalizedProduct } from "@/types/shopify";

export default function ProductBuyBox({ product }: { product: NormalizedProduct }) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const outOfStock = !product.availableForSale;

  function handleAdd() {
    addItem(product, quantity);
    toast.success(
      quantity > 1
        ? `${quantity} × ${product.name} ajoutés au panier`
        : `${product.name} ajouté au panier`,
    );
  }

  if (outOfStock) {
    return (
      <Button
        size="lg"
        variant="outline"
        disabled
        aria-disabled
        className="px-8 h-12 text-xs tracking-[0.15em] uppercase w-full sm:w-auto"
      >
        Indisponible
      </Button>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      {/* Sélecteur de quantité */}
      <div
        className="flex items-center justify-between sm:justify-start gap-1 border border-border/60 rounded-full p-1 h-12"
        role="group"
        aria-label="Quantité"
      >
        <button
          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
          disabled={quantity <= 1}
          aria-label="Diminuer la quantité"
          className="flex items-center justify-center w-9 h-9 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted/60 disabled:opacity-30 disabled:hover:bg-transparent transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <Minus size={15} aria-hidden="true" />
        </button>
        <span
          className="min-w-8 text-center text-sm tabular-nums text-foreground"
          aria-live="polite"
          style={{ fontFamily: "var(--font-body)" }}
        >
          {quantity}
        </span>
        <button
          onClick={() => setQuantity((q) => q + 1)}
          aria-label="Augmenter la quantité"
          className="flex items-center justify-center w-9 h-9 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <Plus size={15} aria-hidden="true" />
        </button>
      </div>

      <Button
        size="lg"
        onClick={handleAdd}
        className="px-8 h-12 text-xs tracking-[0.15em] uppercase w-full sm:w-auto"
        style={{ borderBottomColor: "oklch(0.28 0.05 50)" }}
      >
        Ajouter au panier
      </Button>
    </div>
  );
}

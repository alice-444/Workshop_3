"use client";

import { toast } from "sonner";
import { Button } from "@e-commerce/ui/components/button";
import { useCart } from "./CartProvider";
import type { NormalizedProduct } from "@/lib/shopify";

export default function AddToCartButton({ product }: { product: NormalizedProduct }) {
  const { addItem } = useCart();
  const outOfStock = !product.availableForSale;

  function handleAdd() {
    addItem(product);
    toast.success(`${product.name} ajouté au panier`);
  }

  return (
    <Button
      size="sm"
      variant={outOfStock ? "outline" : "default"}
      disabled={outOfStock}
      aria-disabled={outOfStock}
      onClick={handleAdd}
      className="text-[10px] tracking-widest uppercase h-7 px-3"
    >
      {outOfStock ? "Indisponible" : "Ajouter"}
    </Button>
  );
}

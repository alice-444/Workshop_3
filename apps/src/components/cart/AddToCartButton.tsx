"use client";

import { toast } from "sonner";
import { Button } from "@e-commerce/ui/components/button";
import { useCart } from "./CartProvider";
import type { NormalizedProduct } from "@/lib/shopify";

export default function AddToCartButton({ product }: { product: NormalizedProduct }) {
  const { addItem, loading } = useCart();
  const outOfStock = !product.availableForSale;

  async function handleAdd() {
    await addItem(product);
    toast.success(`${product.name} ajouté au panier`);
  }

  return (
    <Button
      size="sm"
      variant={outOfStock ? "outline" : "default"}
      disabled={outOfStock || loading}
      aria-disabled={outOfStock || loading}
      onClick={handleAdd}
      className="text-[10px] tracking-widest uppercase h-7 px-3"
    >
      {outOfStock ? "Indisponible" : "Ajouter"}
    </Button>
  );
}

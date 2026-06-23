"use client";

import { toast } from "sonner";
import { Button } from "@e-commerce/ui/components/button";
import { useCart } from "./cart-provider";
import type { Product } from "@/data/shop.data";

export default function AddToCartButton({ product }: { product: Product }) {
  const { addItem } = useCart();
  const outOfStock = product.inStock === false;

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

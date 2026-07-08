"use client";

import { Toaster } from "@e-commerce/ui/components/sonner";

import { CartProvider } from "@/components/cart/CartProvider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      {children}
      <Toaster richColors />
    </CartProvider>
  );
}

"use client";

import { Toaster } from "@e-commerce/ui/components/sonner";

import { CartProvider } from "@/components/cart/CartProvider";
import { ThemeProvider } from "./ThemeProvider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <CartProvider>
        {children}
        <Toaster richColors />
      </CartProvider>
    </ThemeProvider>
  );
}

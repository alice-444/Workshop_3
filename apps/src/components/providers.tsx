"use client";

import { Toaster } from "@e-commerce/ui/components/sonner";

import { CartProvider } from "./cart-provider";
import { ThemeProvider } from "./theme-provider";

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

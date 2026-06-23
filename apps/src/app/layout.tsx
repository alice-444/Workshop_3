import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";

import "../index.css";
import BackToTop from "@/components/layout/BackToTop";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import Providers from "@/components/providers/Providers";

// Serif élégante pour les titres — caractère librairie ancienne, artisanal
const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

// Sans-serif géométrique lisible pour le corps — moderne mais sobre
const jost = Jost({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Bois & Art — Décorations en bois faites main",
  description:
    "Créations artisanales uniques en bois local : sculptures, cadres, objets décoratifs façonnés à la main avec soin. Chaque pièce est une oeuvre, taillée pour durer.",
  keywords: ["bois", "artisanat", "décorations", "fait main", "sculptures", "cadres bois", "artisan"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={`${cormorantGaramond.variable} ${jost.variable} antialiased`}>
        <Providers>
          <div className="grid grid-rows-[auto_1fr_auto] min-h-svh">
            <Header />
            {children}
            <Footer />
          </div>
          <BackToTop />
        </Providers>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Lora, Nunito } from "next/font/google";

import "../index.css";
import BackToTop from "@/components/layout/BackToTop";
import CookieConsent from "@/components/layout/CookieConsent";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import Providers from "@/components/providers/Providers";
import { SITE_NAME, SITE_URL, SITE_DESCRIPTION, SITE_OG_IMAGE } from "@/lib/site";

// Serif des titres — Lora (charte typographique)
const lora = Lora({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

// Sans-serif du corps — Nunito (charte typographique)
const nunito = Nunito({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Animal-Totem — Décorations en bois faites main",
    template: "%s · Animal-Totem",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "Animal-Totem",
    "décoration en bois",
    "artisanat bois",
    "fait main",
    "sculptures bois",
    "mobilier bois",
    "pièce unique",
    "sur-mesure",
    "bois local",
  ],
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "Animal-Totem — Décorations en bois faites main",
    description: SITE_DESCRIPTION,
    images: [SITE_OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Animal-Totem — Décorations en bois faites main",
    description: SITE_DESCRIPTION,
    images: [SITE_OG_IMAGE.url],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: SITE_URL,
      logo: `${SITE_URL}/logo/logo_icon.png`,
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: SITE_NAME,
      url: SITE_URL,
      publisher: { "@id": `${SITE_URL}/#organization` },
      inLanguage: "fr-FR",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={`${lora.variable} ${nunito.variable} antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Providers>
          <div className="grid grid-rows-[auto_1fr_auto] min-h-svh">
            <Header />
            {children}
            <Footer />
          </div>
          <BackToTop />
          <CookieConsent />
        </Providers>
      </body>
    </html>
  );
}

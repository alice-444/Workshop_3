import type { Metadata } from "next";
import ShopClient from "./ShopClient";
import { getProducts, normalizeProduct } from "@/lib/shopify";
import { SITE_URL, SITE_OG_IMAGE } from "@/lib/site";

// ISR : régénère la page au plus toutes les 60 s pour refléter le catalogue Shopify.
export const revalidate = 60;

const TITLE = "Collection";
const DESCRIPTION =
    "Découvrez notre ménagerie de bois. Chaque animal totem est une pièce unique, sculptée et peinte à la main avec passion dans notre atelier.";

export const metadata: Metadata = {
    title: TITLE,
    description: DESCRIPTION,
    alternates: { canonical: "/shop" },
    openGraph: {
        type: "website",
        url: `${SITE_URL}/shop`,
        title: TITLE,
        description: DESCRIPTION,
        images: [SITE_OG_IMAGE],
    },
    twitter: {
        card: "summary_large_image",
        title: TITLE,
        description: DESCRIPTION,
        images: [SITE_OG_IMAGE.url],
    },
};

export default async function ShopPage() {
    const raw = await getProducts();
    const products = raw.map(normalizeProduct);
    const categories = Array.from(new Set(products.map((p) => p.category).filter(Boolean))).sort();
    return (
        <main className="overflow-x-hidden">
            <section className="max-w-6xl mx-auto px-6 pt-12 pb-24">
                {/* En-tête */}
                <header className="max-w-2xl mx-auto text-center mb-10">
                    <h1
                        className="text-4xl md:text-5xl font-medium text-foreground leading-tight mb-4"
                        style={{ fontFamily: "var(--font-heading)" }}
                    >
                        Collection
                    </h1>
                    <p
                        className="text-sm text-foreground/80 leading-relaxed max-w-md mx-auto"
                        style={{ fontFamily: "var(--font-body)" }}
                    >
                        Découvrez notre ménagerie de bois. Chaque animal totem est une pièce
                        unique, sculptée et peinte à la main avec passion dans notre atelier.
                    </p>
                </header>

                <ShopClient products={products} categories={categories} />
            </section>
        </main>
    );
}

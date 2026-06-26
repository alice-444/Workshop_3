import type { Metadata } from "next";
import type { Route } from "next";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import ShopClient from "./ShopClient";
import { getProducts, normalizeProduct } from "@/lib/shopify";

export const metadata: Metadata = {
    title: "Boutique",
    description:
        "Découvrez toutes nos créations artisanales en bois : décoration, mobilier, objets de cuisine et sculptures, façonnés à la main dans des bois nobles.",
};

export default async function ShopPage() {
    const raw = await getProducts();
    const products = raw.map(normalizeProduct);
    return (
        <main className="overflow-x-hidden">
            <section className="max-w-6xl mx-auto px-6 pt-12 pb-24">
                <Breadcrumbs
                    items={[
                        { label: "Accueil", href: "/" as Route },
                        { label: "Boutique" },
                    ]}
                />

                {/* En-tête */}
                <header className="max-w-2xl mb-14">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="h-px w-8 bg-primary" />
                        <p
                            className="text-xs uppercase tracking-[0.3em] text-primary font-light"
                            style={{ fontFamily: "var(--font-body)" }}
                        >
                            La boutique
                        </p>
                    </div>
                    <h1
                        className="text-5xl md:text-6xl font-light text-foreground leading-[1.05] mb-5"
                        style={{ fontFamily: "var(--font-heading)" }}
                    >
                        Toutes mes <em className="text-primary not-italic">créations</em>
                    </h1>
                    <p
                        className="text-base text-muted-foreground leading-relaxed font-light"
                        style={{ fontFamily: "var(--font-body)" }}
                    >
                        Chaque pièce est unique, taillée à la main dans des bois choisis de nos
                        forêts. Filtrez par usage et laissez-vous porter par le grain du bois.
                    </p>
                </header>

                <ShopClient products={products} />
            </section>
        </main>
    );
}

import Link from "next/link";
import type { Route } from "next";
import { Button } from "@e-commerce/ui/components/button";
import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@e-commerce/ui/components/card";

const FEATURED_PRODUCTS = [
  { id: 1, name: "Cadre chêne sculpté", description: "Cadre photo taillé à la main dans du chêne massif local. Finition huile naturelle.", price: "78 €", emoji: "🖼️", tag: "Nouveau", wood: "Chêne" },
  { id: 2, name: "Sculpture abstraite", description: "Pièce unique en noyer, forme organique travaillée à la gouge. H. 22 cm.", price: "145 €", emoji: "🌿", tag: "Coup de cœur", wood: "Noyer" },
  { id: 3, name: "Étagère flottante", description: "Étagère en frêne brut, bords naturels conservés. Livrée avec fixations invisibles.", price: "95 €", emoji: "🪵", tag: "Best-seller", wood: "Frêne" },
  { id: 4, name: "Vide-poche rond", description: "Vide-poche tourné au tour à bois en merisier. Bords légèrement flammés.", price: "38 €", emoji: "🍂", tag: "Artisanal", wood: "Merisier" },
];

export default function FeaturedProductsSection() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-24">
      <div className="flex items-end justify-between mb-12">
        <div>
          <p
            className="text-xs uppercase tracking-[0.3em] text-primary mb-3 font-light"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Sélection du moment
          </p>
          <h2
            className="text-4xl md:text-5xl font-light text-foreground leading-tight"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Nouvelles créations
          </h2>
        </div>
        <Link href={"/shop" as Route} className="hidden sm:flex">
          <Button variant="outline" size="sm" className="text-xs tracking-widest uppercase">
            Voir tout
          </Button>
        </Link>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {FEATURED_PRODUCTS.map((product) => (
          <Card key={product.id} className="group cursor-pointer hover:ring-primary/30 transition-all duration-300">
            <div
              className="aspect-square flex items-center justify-center text-6xl transition-transform duration-500 group-hover:scale-110 bg-[oklch(0.93_0.02_72)] dark:bg-[oklch(0.26_0.025_58)]"
            >
              <span role="img" aria-label={product.name}>{product.emoji}</span>
            </div>
            <CardHeader>
              <div className="flex items-center justify-between">
                <span className="text-[9px] uppercase tracking-[0.2em] text-primary font-medium" style={{ fontFamily: "var(--font-body)" }}>
                  {product.tag}
                </span>
                <span className="text-[9px] uppercase tracking-[0.15em] text-muted-foreground" style={{ fontFamily: "var(--font-body)" }}>
                  {product.wood}
                </span>
              </div>
              <CardTitle className="text-base font-medium mt-1 leading-snug" style={{ fontFamily: "var(--font-heading)", fontSize: "1.05rem" }}>
                {product.name}
              </CardTitle>
              <CardDescription className="text-xs leading-relaxed mt-1">
                {product.description}
              </CardDescription>
            </CardHeader>
            <CardFooter className="flex items-center justify-between">
              <span className="text-lg font-semibold text-foreground" style={{ fontFamily: "var(--font-heading)" }}>
                {product.price}
              </span>
              <Button size="sm" className="text-[10px] tracking-widest uppercase h-7 px-3">
                Ajouter
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}

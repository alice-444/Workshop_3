import Link from "next/link";
import type { Route } from "next";
import { Button } from "@e-commerce/ui/components/button";
import { getProducts, normalizeProduct } from "@/lib/shopify";
import ProductCard from "@/components/product/ProductCard";

export default async function FeaturedProductsSection() {
  const raw = await getProducts();
  const products = raw.map(normalizeProduct).slice(0, 4);

  if (products.length === 0) return null;

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
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

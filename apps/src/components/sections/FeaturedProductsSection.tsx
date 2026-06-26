import Link from "next/link";
import Image from "next/image";
import type { Route } from "next";
import type { CSSProperties } from "react";
import { ArrowRight } from "lucide-react";
import { getProducts, normalizeProduct } from "@/lib/shopify";
import AddToCartButton from "@/components/cart/AddToCartButton";
import type { NormalizedProduct } from "@/lib/shopify";

const priceFormatter = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
  minimumFractionDigits: 0,
});

function FeaturedCard({ product, priority = false }: { product: NormalizedProduct; priority?: boolean }) {
  const outOfStock = !product.availableForSale;
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-border/40 bg-card transition-all duration-300 hover:border-border hover:shadow-sm">
      <Link
        href={`/shop/${product.handle}` as Route}
        className="block outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-t-2xl"
        aria-label={`Voir ${product.name}`}
      >
        <div
          className="relative aspect-4/3 overflow-hidden"
          style={
            {
              "--product-bg": product.bg.light,
              "--product-bg-dark": product.bg.dark,
              backgroundColor: "var(--product-bg)",
            } as CSSProperties
          }
        >
          {product.image ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              priority={priority}
              className={`object-cover transition-transform duration-700 ${outOfStock ? "grayscale opacity-40" : "group-hover:scale-105"}`}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div className={`absolute inset-0 flex items-center justify-center text-7xl transition-transform duration-700 ${outOfStock ? "grayscale opacity-40" : "group-hover:scale-105"}`}>
              <span role="img" aria-label={product.name}>{product.emoji}</span>
            </div>
          )}
          {outOfStock && (
            <span
              className="absolute top-3 left-3 rounded-full bg-foreground/85 text-background px-2.5 py-1 text-[8px] uppercase tracking-[0.2em] font-medium backdrop-blur-sm"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Rupture de stock
            </span>
          )}
          {product.tag && !outOfStock && (
            <span
              className="absolute top-3 left-3 rounded-full bg-background/90 text-foreground px-2.5 py-1 text-[8px] uppercase tracking-[0.2em] font-medium backdrop-blur-sm border border-border/30"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {product.tag}
            </span>
          )}
        </div>
      </Link>

      <div className="flex flex-col gap-3 p-4 flex-1">
        <div className="flex-1">
          {product.wood && (
            <p
              className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground mb-1"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {product.wood}
            </p>
          )}
          <Link href={`/shop/${product.handle}` as Route} className="outline-none focus-visible:underline">
            <h3
              className="text-base font-medium leading-snug text-foreground group-hover:text-primary transition-colors duration-200"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {product.name}
            </h3>
          </Link>
        </div>

        <div className="flex items-center justify-between pt-1 border-t border-border/30">
          <span
            className={`text-lg font-semibold ${outOfStock ? "text-muted-foreground" : "text-foreground"}`}
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {priceFormatter.format(product.price)}
          </span>
          <AddToCartButton product={product} />
        </div>
      </div>
    </div>
  );
}

export default async function FeaturedProductsSection() {
  const raw = await getProducts();
  const products = raw.map(normalizeProduct).slice(0, 3);

  if (products.length === 0) return null;

  const [hero, ...rest] = products;

  return (
    <section className="max-w-6xl mx-auto px-6 py-24">
      {/* En-tête */}
      <div className="flex items-end justify-between mb-12">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="h-px w-8 bg-primary" />
            <p
              className="text-xs uppercase tracking-[0.3em] text-primary font-light"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Sélection du moment
            </p>
          </div>
          <h2
            className="text-4xl md:text-5xl font-light text-foreground leading-tight"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Nouvelles créations
          </h2>
        </div>
        <Link
          href={"/shop" as Route}
          className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 group outline-none focus-visible:underline"
          style={{ fontFamily: "var(--font-body)" }}
        >
          Voir tout
          <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
        </Link>
      </div>

      {products.length === 1 ? (
        <div className="max-w-sm">
          <FeaturedCard product={hero} priority />
        </div>
      ) : (
        <div className="grid lg:grid-cols-[1.4fr_1fr] gap-5 items-start">
          {/* Produit mis en avant */}
          <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-border/40 bg-card transition-all duration-300 hover:border-border hover:shadow-sm">
            <Link
              href={`/shop/${hero.handle}` as Route}
              className="block outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-t-2xl"
              aria-label={`Voir ${hero.name}`}
            >
              <div
                className="relative aspect-3/2 overflow-hidden"
                style={
                  {
                    "--product-bg": hero.bg.light,
                    "--product-bg-dark": hero.bg.dark,
                    backgroundColor: "var(--product-bg)",
                  } as CSSProperties
                }
              >
                {hero.image ? (
                  <Image
                    src={hero.image}
                    alt={hero.name}
                    fill
                    priority
                    className={`object-cover transition-transform duration-700 ${!hero.availableForSale ? "grayscale opacity-40" : "group-hover:scale-105"}`}
                    sizes="(max-width: 1024px) 100vw, 55vw"
                  />
                ) : (
                  <div className={`absolute inset-0 flex items-center justify-center text-[8rem] transition-transform duration-700 ${!hero.availableForSale ? "grayscale opacity-40" : "group-hover:scale-105"}`}>
                    <span role="img" aria-label={hero.name}>{hero.emoji}</span>
                  </div>
                )}
                {hero.tag && hero.availableForSale && (
                  <span
                    className="absolute top-4 left-4 rounded-full bg-background/90 text-foreground px-3 py-1.5 text-[8px] uppercase tracking-[0.2em] font-medium backdrop-blur-sm border border-border/30"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {hero.tag}
                  </span>
                )}
              </div>
            </Link>
            <div className="flex flex-col gap-3 p-5">
              {hero.wood && (
                <p className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground" style={{ fontFamily: "var(--font-body)" }}>
                  {hero.wood}
                </p>
              )}
              <Link href={`/shop/${hero.handle}` as Route} className="outline-none focus-visible:underline">
                <h3
                  className="text-xl font-medium leading-snug text-foreground group-hover:text-primary transition-colors duration-200"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {hero.name}
                </h3>
              </Link>
              <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2" style={{ fontFamily: "var(--font-body)" }}>
                {hero.description}
              </p>
              <div className="flex items-center justify-between pt-2 border-t border-border/30">
                <span className="text-xl font-semibold text-foreground" style={{ fontFamily: "var(--font-heading)" }}>
                  {priceFormatter.format(hero.price)}
                </span>
                <AddToCartButton product={hero} />
              </div>
            </div>
          </div>

          {/* Produits secondaires */}
          <div className="flex flex-col gap-5">
            {rest.map((p, i) => (
              <FeaturedCard key={p.id} product={p} priority={i === 0} />
            ))}
          </div>
        </div>
      )}

      {/* Lien mobile */}
      <div className="sm:hidden mt-10 flex justify-center">
        <Link
          href={"/shop" as Route}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 group"
          style={{ fontFamily: "var(--font-body)" }}
        >
          Voir toutes les créations
          <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
        </Link>
      </div>
    </section>
  );
}

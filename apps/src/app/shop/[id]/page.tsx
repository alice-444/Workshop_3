import type { Metadata } from "next";
import type { Route } from "next";
import type { CSSProperties } from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import ProductCard from "@/components/product/ProductCard";
import StarRating from "@/components/ui/StarRating";
import { SHOP_CATEGORIES } from "@/data/shop.data";
import { getProducts, getProduct, normalizeProduct } from "@/lib/shopify";
import ProductBuyBox from "@/components/product/ProductBuyBox";

const priceFormatter = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
  minimumFractionDigits: 0,
});

function categoryLabel(id: string) {
  return SHOP_CATEGORIES.find((c) => c.id === id)?.label ?? id;
}

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((p) => ({ id: p.handle }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const raw = await getProduct(id);
  if (!raw) return { title: "Création introuvable" };
  const product = normalizeProduct(raw);
  return {
    title: product.name,
    description: product.description,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const raw = await getProduct(id);
  if (!raw) notFound();

  const product = normalizeProduct(raw);
  const outOfStock = !product.availableForSale;

  const allRaw = await getProducts();
  const related = allRaw
    .map(normalizeProduct)
    .filter((p) => p.category === product.category && p.handle !== product.handle)
    .slice(0, 4);

  return (
    <main className="overflow-x-hidden">
      <section className="max-w-6xl mx-auto px-6 pt-12 pb-24">
        <Breadcrumbs
          items={[
            { label: "Accueil", href: "/" as Route },
            { label: "Boutique", href: "/shop" as Route },
            { label: product.name },
          ]}
        />

        <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Visuel */}
          <div
            className="relative aspect-square rounded-3xl overflow-hidden bg-[var(--product-bg)] dark:bg-[var(--product-bg-dark)]"
            style={
              {
                "--product-bg": product.bg.light,
                "--product-bg-dark": product.bg.dark,
              } as CSSProperties
            }
          >
            {product.image ? (
              <Image
                src={product.image}
                alt={product.name}
                fill
                className={`object-cover ${outOfStock ? "grayscale opacity-40" : ""}`}
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            ) : (
              <div
                className={`absolute inset-0 flex items-center justify-center text-[10rem] ${outOfStock ? "grayscale opacity-40" : ""}`}
              >
                <span role="img" aria-label={product.name}>
                  {product.emoji}
                </span>
              </div>
            )}
            {outOfStock && (
              <span
                className="absolute top-4 left-4 rounded-full bg-foreground/85 text-background px-3 py-1.5 text-[9px] uppercase tracking-[0.2em] font-medium backdrop-blur-sm"
                style={{ fontFamily: "var(--font-body)" }}
              >
                Rupture de stock
              </span>
            )}
          </div>

          {/* Informations */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <span
                className="text-[10px] uppercase tracking-[0.2em] text-primary font-medium"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {product.tag}
              </span>
              <span className="text-muted-foreground/40">·</span>
              <span
                className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {categoryLabel(product.category)}
              </span>
            </div>

            <h1
              className="text-4xl md:text-5xl font-light text-foreground leading-tight"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {product.name}
            </h1>

            {product.rating !== undefined && (
              <StarRating
                rating={product.rating}
                reviewCount={product.reviewCount}
                size={16}
              />
            )}

            <p
              className="text-2xl font-semibold text-foreground"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {priceFormatter.format(product.price)}
            </p>

            <p
              className="text-base text-muted-foreground leading-relaxed font-light"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {product.description}
            </p>

            {/* Caractéristiques */}
            <dl className="grid grid-cols-2 gap-px rounded-2xl overflow-hidden bg-border/40 border border-border/40">
              {[
                { label: "Essence", value: product.wood || "—" },
                { label: "Catégorie", value: categoryLabel(product.category) },
                { label: "Finition", value: "Huile & cire naturelles" },
                {
                  label: "Disponibilité",
                  value: outOfStock ? "En rupture" : "En stock",
                },
              ].map((row) => (
                <div key={row.label} className="bg-background p-4 flex flex-col gap-1">
                  <dt
                    className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {row.label}
                  </dt>
                  <dd
                    className="text-sm text-foreground"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {row.value}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="pt-2">
              <ProductBuyBox product={product} />
            </div>
          </div>
        </div>

        {/* Produits liés */}
        {related.length > 0 && (
          <div className="mt-24">
            <h2
              className="text-3xl md:text-4xl font-light text-foreground leading-tight mb-8"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Dans le même esprit
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </section>
    </main>
  );
}

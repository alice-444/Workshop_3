import type { Metadata } from "next";
import type { Route } from "next";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import ProductCard from "@/components/product/ProductCard";
import ProductGallery from "@/components/product/ProductGallery";
import StarRating from "@/components/ui/StarRating";
import { getProducts, getProduct, normalizeProduct } from "@/lib/shopify";
import ProductBuyBox from "@/components/product/ProductBuyBox";

const priceFormatter = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
  minimumFractionDigits: 0,
});

function categoryLabel(id: string) {
  return id ? id.charAt(0).toUpperCase() + id.slice(1) : "—";
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
  const url = `/shop/${product.handle}`;
  const images = product.image
    ? [{ url: product.image, alt: product.name }]
    : undefined;
  return {
    title: product.name,
    description: product.description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      title: product.name,
      description: product.description,
      url,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: product.name,
      description: product.description,
      images: product.image ? [product.image] : undefined,
    },
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
  const others = allRaw.map(normalizeProduct).filter((p) => p.handle !== product.handle);
  const byCategory = others.filter((p) => p.category === product.category);
  const related = (byCategory.length > 0 ? byCategory : others).slice(0, 4);

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
          <ProductGallery
            media={raw.media.nodes}
            alt={product.name}
            emoji={product.emoji}
            outOfStock={outOfStock}
            bgLight={product.bg.light}
            bgDark={product.bg.dark}
          />

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

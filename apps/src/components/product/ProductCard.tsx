import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Route } from "next";
import { Image as ImageIcon } from "lucide-react";
import { Card, CardHeader, CardTitle } from "@e-commerce/ui/components/card";
import type { NormalizedProduct } from "@/lib/shopify";

const priceFormatter = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
  minimumFractionDigits: 0,
});

export default function ProductCard({ product }: { product: NormalizedProduct }) {
  const outOfStock = !product.availableForSale;

  return (
    <Card
      className={`group transition-all duration-300 ${outOfStock ? "opacity-90" : "cursor-pointer hover:ring-primary/30"
        }`}
    >
      <Link
        href={`/shop/${product.handle}` as Route}
        className="block outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-[inherit]"
        aria-label={`Voir ${product.name}`}
      >
        <div
          className="relative aspect-square overflow-hidden bg-[var(--product-bg)] dark:bg-[var(--product-bg-dark)]"
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
              className={`object-cover transition-transform duration-500 ${outOfStock ? "grayscale opacity-40" : "group-hover:scale-110"}`}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
              <ImageIcon size={20} aria-hidden="true" />
            </div>
          )}
          {outOfStock && (
            <span
              className="absolute top-2.5 left-2.5 rounded-full bg-foreground/85 text-background px-2.5 py-1 text-[8px] uppercase tracking-[0.2em] font-medium backdrop-blur-sm"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Rupture de stock
            </span>
          )}
        </div>
        <CardHeader className="py-4">
          <CardTitle
            className="text-sm font-normal leading-snug"
            style={{ fontFamily: "var(--font-body)" }}
          >
            {product.name}
          </CardTitle>
          <p
            className="text-sm text-muted-foreground mt-1"
            style={{ fontFamily: "var(--font-body)" }}
          >
            {priceFormatter.format(product.price)}
          </p>
        </CardHeader>
      </Link>
    </Card>
  );
}

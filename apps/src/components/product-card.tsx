import type { CSSProperties } from "react";
import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@e-commerce/ui/components/card";
import AddToCartButton from "./add-to-cart-button";
import type { Product } from "@/data/shop.data";

const priceFormatter = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
  minimumFractionDigits: 0,
});

export default function ProductCard({ product }: { product: Product }) {
  const outOfStock = product.inStock === false;

  return (
    <Card
      className={`group transition-all duration-300 ${outOfStock ? "opacity-90" : "cursor-pointer hover:ring-primary/30"
        }`}
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
        <div
          className={`absolute inset-0 flex items-center justify-center text-6xl transition-transform duration-500 ${outOfStock ? "grayscale opacity-40" : "group-hover:scale-110"
            }`}
        >
          <span role="img" aria-label={product.name}>
            {product.emoji}
          </span>
        </div>
        {outOfStock && (
          <span
            className="absolute top-2.5 left-2.5 rounded-full bg-foreground/85 text-background px-2.5 py-1 text-[8px] uppercase tracking-[0.2em] font-medium backdrop-blur-sm"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Rupture de stock
          </span>
        )}
      </div>
      <CardHeader>
        <div className="flex items-center justify-between">
          <span
            className="text-[9px] uppercase tracking-[0.2em] text-primary font-medium"
            style={{ fontFamily: "var(--font-body)" }}
          >
            {product.tag}
          </span>
          <span
            className="text-[9px] uppercase tracking-[0.15em] text-muted-foreground"
            style={{ fontFamily: "var(--font-body)" }}
          >
            {product.wood}
          </span>
        </div>
        <CardTitle
          className="text-base font-medium mt-1 leading-snug"
          style={{ fontFamily: "var(--font-heading)", fontSize: "1.05rem" }}
        >
          {product.name}
        </CardTitle>
        <CardDescription className="text-xs leading-relaxed mt-1">
          {product.description}
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex items-center justify-between">
        <span
          className={`text-lg font-semibold ${outOfStock ? "text-muted-foreground" : "text-foreground"
            }`}
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {priceFormatter.format(product.price)}
        </span>
        <AddToCartButton product={product} />
      </CardFooter>
    </Card>
  );
}

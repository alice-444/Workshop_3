import type { ShopifyProduct, NormalizedProduct } from "./types";

const LABEL_TAGS = [
  "nouveau",
  "best-seller",
  "coup de cœur",
  "artisanal",
  "fait main",
  "pièce unique",
];

export function normalizeProduct(p: ShopifyProduct): NormalizedProduct {
  const metafield = (key: string) =>
    p.metafields?.find((m) => m?.key === key)?.value ?? "";

  const category = p.productType.trim().toLowerCase();

  const tag =
    p.tags.find((t) => LABEL_TAGS.includes(t.toLowerCase())) ?? p.tags[0] ?? "";

  return {
    id: p.id,
    handle: p.handle,
    name: p.title,
    description: p.description,
    price: parseFloat(p.priceRange.minVariantPrice.amount),
    availableForSale: p.availableForSale,
    category: category.toLowerCase(),
    tag,
    wood: metafield("wood"),
    emoji: metafield("emoji"),
    bg: metafield("bg_light") || "oklch(0.93 0.02 72)",
    image: p.featuredImage?.url ?? null,
    variantId: p.variants.nodes[0]?.id ?? "",
  };
}

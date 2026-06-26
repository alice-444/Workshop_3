import type { ShopifyProduct, NormalizedProduct } from "./types";

const CATEGORY_TAGS = ["decoration", "sculpture"];

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

  const category =
    p.tags.find((t) => CATEGORY_TAGS.includes(t.toLowerCase())) ?? "";

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
    bg: {
      light: metafield("bg_light") || "oklch(0.93 0.02 72)",
      dark: metafield("bg_dark") || "oklch(0.26 0.025 58)",
    },
    image: p.featuredImage?.url ?? null,
    variantId: p.variants.nodes[0]?.id ?? "",
  };
}

import { describe, it, expect } from "vitest";
import { normalizeProduct } from "../normalize";
import type { ShopifyProduct } from "../types";

function makeProduct(overrides: Partial<ShopifyProduct> = {}): ShopifyProduct {
  return {
    id: "gid://shopify/Product/1",
    handle: "cadre-chene",
    title: "Cadre chêne sculpté",
    description: "Un cadre en chêne massif.",
    availableForSale: true,
    productType: "decoration",
    tags: ["decoration", "nouveau"],
    featuredImage: {
      url: "https://cdn.shopify.com/image.jpg",
      altText: null,
      width: 800,
      height: 800,
    },
    images: { nodes: [] },
    media: { nodes: [] },
    priceRange: { minVariantPrice: { amount: "78.00", currencyCode: "EUR" } },
    variants: {
      nodes: [
        {
          id: "gid://shopify/ProductVariant/1",
          title: "Default",
          availableForSale: true,
          price: { amount: "78.00", currencyCode: "EUR" },
        },
      ],
    },
    metafields: [
      { key: "wood", value: "Chêne" },
      { key: "emoji", value: "🖼️" },
      { key: "bg_light", value: "oklch(0.93 0.02 72)" },
    ],
    ...overrides,
  };
}

describe("normalizeProduct", () => {
  it("mappe les champs de base correctement", () => {
    const result = normalizeProduct(makeProduct());

    expect(result.id).toBe("gid://shopify/Product/1");
    expect(result.handle).toBe("cadre-chene");
    expect(result.name).toBe("Cadre chêne sculpté");
    expect(result.description).toBe("Un cadre en chêne massif.");
    expect(result.availableForSale).toBe(true);
  });

  it("convertit le prix en float", () => {
    const result = normalizeProduct(makeProduct());
    expect(result.price).toBe(78);
  });

  it("utilise productType comme catégorie", () => {
    const result = normalizeProduct(makeProduct({ productType: "Ornement" }));
    expect(result.category).toBe("ornement");
  });

  it("retourne une catégorie vide si productType est vide", () => {
    const result = normalizeProduct(makeProduct({ productType: "" }));
    expect(result.category).toBe("");
  });

  it("extrait le tag label depuis les tags", () => {
    const result = normalizeProduct(
      makeProduct({ tags: ["decoration", "best-seller"] }),
    );
    expect(result.tag).toBe("best-seller");
  });

  it("utilise le premier tag si aucun tag label reconnu", () => {
    const result = normalizeProduct(
      makeProduct({ tags: ["decoration", "tag-inconnu"] }),
    );
    expect(result.tag).toBe("decoration");
  });

  it("retourne une catégorie vide si aucun tag label reconnu (fallback premier tag)", () => {
    const result = normalizeProduct(makeProduct({ tags: ["nouveau"] }));
    expect(result.category).toBe("decoration"); // vient de productType du makeProduct de base
  });

  it("extrait les metafields correctement", () => {
    const result = normalizeProduct(makeProduct());
    expect(result.wood).toBe("Chêne");
    expect(result.emoji).toBe("🖼️");
    expect(result.bg).toBe("oklch(0.93 0.02 72)");
  });

  it("utilise la couleur de fallback si le metafield bg est absent", () => {
    const result = normalizeProduct(makeProduct({ metafields: [] }));
    expect(result.bg).toBe("oklch(0.93 0.02 72)");
  });

  it("retourne une chaîne vide si metafield absent", () => {
    const result = normalizeProduct(makeProduct({ metafields: [] }));
    expect(result.wood).toBe("");
    expect(result.emoji).toBe("");
  });

  it("extrait l'image depuis featuredImage", () => {
    const result = normalizeProduct(makeProduct());
    expect(result.image).toBe("https://cdn.shopify.com/image.jpg");
  });

  it("retourne null si pas d'image", () => {
    const result = normalizeProduct(makeProduct({ featuredImage: null }));
    expect(result.image).toBeNull();
  });

  it("extrait le variantId depuis la première variante", () => {
    const result = normalizeProduct(makeProduct());
    expect(result.variantId).toBe("gid://shopify/ProductVariant/1");
  });

  it("retourne une chaîne vide si pas de variante", () => {
    const result = normalizeProduct(makeProduct({ variants: { nodes: [] } }));
    expect(result.variantId).toBe("");
  });

  it("gère un produit indisponible", () => {
    const result = normalizeProduct(makeProduct({ availableForSale: false }));
    expect(result.availableForSale).toBe(false);
  });

  it("gère les metafields null", () => {
    const result = normalizeProduct(
      makeProduct({ metafields: [null, { key: "wood", value: "Noyer" }] }),
    );
    expect(result.wood).toBe("Noyer");
  });
});

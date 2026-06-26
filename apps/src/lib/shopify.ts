import type { ShopifyCart, ShopifyProduct } from "@/types/shopify";

const DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN!;
const TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN!;
const API_URL = `https://${DOMAIN}/api/2025-01/graphql.json`;

async function shopifyFetch<T>(
  query: string,
  variables?: Record<string, unknown>,
): Promise<T> {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  });

  const json = await res.json();

  if (json.errors) {
    throw new Error(json.errors[0].message);
  }

  return json.data as T;
}

// ─── Fragments ────────────────────────────────────────────────────────────────

const PRODUCT_FRAGMENT = `
  fragment ProductFields on Product {
    id
    handle
    title
    description
    availableForSale
    tags
    featuredImage { url altText width height }
    images(first: 5) { nodes { url altText width height } }
    priceRange { minVariantPrice { amount currencyCode } }
    variants(first: 10) {
      nodes { id title availableForSale price { amount currencyCode } }
    }
    metafields(identifiers: [
      { namespace: "custom", key: "wood" }
      { namespace: "custom", key: "emoji" }
      { namespace: "custom", key: "bg_light" }
      { namespace: "custom", key: "bg_dark" }
    ]) { key value }
  }
`;

const CART_FRAGMENT = `
  fragment CartFields on Cart {
    id
    checkoutUrl
    totalQuantity
    lines(first: 100) {
      nodes {
        id
        quantity
        merchandise {
          ... on ProductVariant {
            id
            title
            price { amount currencyCode }
            product {
              title
              handle
              featuredImage { url altText width height }
            }
          }
        }
      }
    }
    cost {
      subtotalAmount { amount currencyCode }
      totalAmount { amount currencyCode }
    }
  }
`;

// ─── Products ─────────────────────────────────────────────────────────────────

export async function getProducts(): Promise<ShopifyProduct[]> {
  const data = await shopifyFetch<{ products: { nodes: ShopifyProduct[] } }>(`
    ${PRODUCT_FRAGMENT}
    query GetProducts {
      products(first: 100, sortKey: CREATED_AT, reverse: true) {
        nodes { ...ProductFields }
      }
    }
  `);
  return data.products.nodes;
}

export async function getProduct(
  handle: string,
): Promise<ShopifyProduct | null> {
  const data = await shopifyFetch<{ productByHandle: ShopifyProduct | null }>(
    `
    ${PRODUCT_FRAGMENT}
    query GetProduct($handle: String!) {
      productByHandle(handle: $handle) { ...ProductFields }
    }
  `,
    { handle },
  );
  return data.productByHandle;
}

// ─── Cart ─────────────────────────────────────────────────────────────────────

export async function createCart(): Promise<ShopifyCart> {
  const data = await shopifyFetch<{ cartCreate: { cart: ShopifyCart } }>(`
    ${CART_FRAGMENT}
    mutation CartCreate {
      cartCreate { cart { ...CartFields } }
    }
  `);
  return data.cartCreate.cart;
}

export async function addToCart(
  cartId: string,
  variantId: string,
  quantity: number,
): Promise<ShopifyCart> {
  const data = await shopifyFetch<{ cartLinesAdd: { cart: ShopifyCart } }>(
    `
    ${CART_FRAGMENT}
    mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) { cart { ...CartFields } }
    }
  `,
    { cartId, lines: [{ merchandiseId: variantId, quantity }] },
  );
  return data.cartLinesAdd.cart;
}

export async function updateCartLine(
  cartId: string,
  lineId: string,
  quantity: number,
): Promise<ShopifyCart> {
  const data = await shopifyFetch<{ cartLinesUpdate: { cart: ShopifyCart } }>(
    `
    ${CART_FRAGMENT}
    mutation CartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
      cartLinesUpdate(cartId: $cartId, lines: $lines) { cart { ...CartFields } }
    }
  `,
    { cartId, lines: [{ id: lineId, quantity }] },
  );
  return data.cartLinesUpdate.cart;
}

export async function removeCartLine(
  cartId: string,
  lineId: string,
): Promise<ShopifyCart> {
  const data = await shopifyFetch<{ cartLinesRemove: { cart: ShopifyCart } }>(
    `
    ${CART_FRAGMENT}
    mutation CartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
      cartLinesRemove(cartId: $cartId, lineIds: $lineIds) { cart { ...CartFields } }
    }
  `,
    { cartId, lineIds: [lineId] },
  );
  return data.cartLinesRemove.cart;
}

// ─── Normalize ────────────────────────────────────────────────────────────────

import type { NormalizedProduct } from "@/types/shopify";

const CATEGORY_TAGS = ["decoration", "sculpture"];

export function normalizeProduct(p: ShopifyProduct): NormalizedProduct {
  const metafield = (key: string) =>
    p.metafields?.find((m) => m?.key === key)?.value ?? "";

  const category =
    p.tags.find((t) => CATEGORY_TAGS.includes(t.toLowerCase())) ?? "";

  const priceTag =
    p.tags.find((t) =>
      [
        "nouveau",
        "best-seller",
        "coup de cœur",
        "artisanal",
        "fait main",
        "pièce unique",
      ].includes(t.toLowerCase()),
    ) ??
    p.tags[0] ??
    "";

  return {
    id: p.id,
    handle: p.handle,
    name: p.title,
    description: p.description,
    price: parseFloat(p.priceRange.minVariantPrice.amount),
    availableForSale: p.availableForSale,
    category: category.toLowerCase(),
    tag: priceTag,
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

export async function getCart(cartId: string): Promise<ShopifyCart | null> {
  const data = await shopifyFetch<{ cart: ShopifyCart | null }>(
    `
    ${CART_FRAGMENT}
    query GetCart($cartId: ID!) {
      cart(id: $cartId) { ...CartFields }
    }
  `,
    { cartId },
  );
  return data.cart;
}

import { shopifyFetch } from "./client";
import { PRODUCT_FRAGMENT } from "./fragments";
import type { ShopifyProduct } from "./types";

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

export const PRODUCT_FRAGMENT = `
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

export const CART_FRAGMENT = `
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

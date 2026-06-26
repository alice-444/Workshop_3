export type ShopifyImage = {
  url: string;
  altText: string | null;
  width: number;
  height: number;
};

export type ShopifyMoneyV2 = {
  amount: string;
  currencyCode: string;
};

export type ShopifyProductVariant = {
  id: string;
  title: string;
  availableForSale: boolean;
  price: ShopifyMoneyV2;
};

export type ShopifyMetafield = {
  key: string;
  value: string;
};

export type ShopifyProduct = {
  id: string;
  handle: string;
  title: string;
  description: string;
  availableForSale: boolean;
  tags: string[];
  featuredImage: ShopifyImage | null;
  images: { nodes: ShopifyImage[] };
  priceRange: {
    minVariantPrice: ShopifyMoneyV2;
  };
  variants: { nodes: ShopifyProductVariant[] };
  metafields: (ShopifyMetafield | null)[];
};

export type ShopifyCartLine = {
  id: string;
  quantity: number;
  merchandise: {
    id: string;
    title: string;
    product: {
      title: string;
      handle: string;
      featuredImage: ShopifyImage | null;
    };
    price: ShopifyMoneyV2;
  };
};

export type ShopifyCart = {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  lines: { nodes: ShopifyCartLine[] };
  cost: {
    subtotalAmount: ShopifyMoneyV2;
    totalAmount: ShopifyMoneyV2;
  };
};

export type NormalizedProduct = {
  id: string;
  handle: string;
  name: string;
  description: string;
  price: number;
  availableForSale: boolean;
  category: string;
  tag: string;
  wood: string;
  emoji: string;
  bg: { light: string; dark: string };
  image: string | null;
  variantId: string;
  rating?: number;
  reviewCount?: number;
};

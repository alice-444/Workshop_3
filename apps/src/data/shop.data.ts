export const SHOP_CATEGORIES = [
  { id: "tout", label: "Tout" },
  { id: "decoration", label: "Décoration" },
] as const;

export type ShopCategoryId = (typeof SHOP_CATEGORIES)[number]["id"];

export const SHOP_SORTS = [
  { id: "nouveautes", label: "Nouveautés" },
  { id: "prix-asc", label: "Prix croissant" },
  { id: "prix-desc", label: "Prix décroissant" },
] as const;

export type ShopSortId = (typeof SHOP_SORTS)[number]["id"];

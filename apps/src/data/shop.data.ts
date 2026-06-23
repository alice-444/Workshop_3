export const SHOP_CATEGORIES = [
  { id: "tout", label: "Tout" },
  { id: "decoration", label: "Décoration" },
  { id: "cuisine", label: "Cuisine" },
  { id: "mobilier", label: "Mobilier" },
  { id: "sculpture", label: "Sculpture" },
] as const;

export type ShopCategoryId = (typeof SHOP_CATEGORIES)[number]["id"];

export const SHOP_SORTS = [
  { id: "nouveautes", label: "Nouveautés" },
  { id: "prix-asc", label: "Prix croissant" },
  { id: "prix-desc", label: "Prix décroissant" },
] as const;

export type ShopSortId = (typeof SHOP_SORTS)[number]["id"];

export type Product = {
  id: number;
  name: string;
  description: string;
  /** Prix en euros, valeur numérique pour le tri. */
  price: number;
  emoji: string;
  tag: string;
  wood: string;
  category: Exclude<ShopCategoryId, "tout">;
  /** Couleur de fond oklch (clair / sombre) pour l'image produit. */
  bg: { light: string; dark: string };
  /** Disponibilité — absent ou `true` = en stock. */
  inStock?: boolean;
  /** Note moyenne sur 5. */
  rating?: number;
  /** Nombre d'avis clients. */
  reviewCount?: number;
};

export const PRODUCTS: Product[] = [
  {
    id: 1,
    rating: 4.8,
    reviewCount: 24,
    name: "Cadre chêne sculpté",
    description:
      "Cadre photo taillé à la main dans du chêne massif local. Finition huile naturelle.",
    price: 78,
    emoji: "🖼️",
    tag: "Nouveau",
    wood: "Chêne",
    category: "decoration",
    bg: { light: "oklch(0.93 0.02 72)", dark: "oklch(0.26 0.025 58)" },
  },
  {
    id: 2,
    rating: 5,
    reviewCount: 12,
    name: "Sculpture abstraite",
    description:
      "Pièce unique en noyer, forme organique travaillée à la gouge. H. 22 cm.",
    price: 145,
    emoji: "🌿",
    tag: "Coup de cœur",
    wood: "Noyer",
    category: "sculpture",
    bg: { light: "oklch(0.78 0.06 55)", dark: "oklch(0.26 0.04 55)" },
  },
  {
    id: 3,
    rating: 4.7,
    reviewCount: 41,
    name: "Étagère flottante",
    description:
      "Étagère en frêne brut, bords naturels conservés. Livrée avec fixations invisibles.",
    price: 95,
    emoji: "🪵",
    tag: "Best-seller",
    wood: "Frêne",
    category: "mobilier",
    bg: { light: "oklch(0.87 0.04 68)", dark: "oklch(0.28 0.035 62)" },
  },
  {
    id: 4,
    rating: 4.5,
    reviewCount: 18,
    name: "Vide-poche rond",
    description:
      "Vide-poche tourné au tour à bois en merisier. Bords légèrement flammés.",
    price: 38,
    emoji: "🍂",
    tag: "Artisanal",
    wood: "Merisier",
    category: "decoration",
    bg: { light: "oklch(0.93 0.025 78)", dark: "oklch(0.24 0.025 65)" },
  },
  {
    id: 5,
    rating: 4.9,
    reviewCount: 56,
    name: "Planche à découper",
    description:
      "Planche bout de bois en hêtre étuvé, traitée à l'huile de lin alimentaire.",
    price: 52,
    emoji: "🧀",
    tag: "Best-seller",
    wood: "Hêtre",
    category: "cuisine",
    bg: { light: "oklch(0.9 0.03 70)", dark: "oklch(0.27 0.03 60)" },
  },
  {
    id: 6,
    rating: 4.6,
    reviewCount: 33,
    name: "Cuillères taillées",
    description:
      "Lot de deux cuillères de service sculptées au couteau croche dans du bouleau.",
    price: 34,
    emoji: "🥄",
    tag: "Fait main",
    wood: "Bouleau",
    category: "cuisine",
    bg: { light: "oklch(0.94 0.02 80)", dark: "oklch(0.25 0.025 64)" },
  },
  {
    id: 7,
    rating: 4.8,
    reviewCount: 9,
    name: "Tabouret tripode",
    description:
      "Tabouret bas assemblé sans vis, assise en chêne, pieds tournés en frêne.",
    price: 168,
    emoji: "🪑",
    tag: "Nouveau",
    wood: "Chêne",
    category: "mobilier",
    bg: { light: "oklch(0.85 0.045 64)", dark: "oklch(0.29 0.035 58)" },
  },
  {
    id: 8,
    rating: 4.7,
    reviewCount: 21,
    name: "Bol creusé",
    description:
      "Grand bol évidé à la gouge dans une bille d'orme, finition cire d'abeille.",
    price: 64,
    emoji: "🥣",
    tag: "Pièce unique",
    wood: "Orme",
    category: "cuisine",
    bg: { light: "oklch(0.88 0.04 66)", dark: "oklch(0.26 0.035 60)" },
    inStock: false,
  },
  {
    id: 9,
    rating: 4.9,
    reviewCount: 15,
    name: "Oiseau stylisé",
    description:
      "Petite sculpture d'oiseau au galbe épuré, poncée à la main dans du tilleul.",
    price: 88,
    emoji: "🐦",
    tag: "Coup de cœur",
    wood: "Tilleul",
    category: "sculpture",
    bg: { light: "oklch(0.91 0.025 74)", dark: "oklch(0.25 0.03 62)" },
  },
  {
    id: 10,
    rating: 4.4,
    reviewCount: 27,
    name: "Patère murale",
    description:
      "Trio de patères en noyer huilé, formes douces. Vis et chevilles fournies.",
    price: 42,
    emoji: "🧥",
    tag: "Artisanal",
    wood: "Noyer",
    category: "decoration",
    bg: { light: "oklch(0.83 0.05 60)", dark: "oklch(0.3 0.04 56)" },
  },
  {
    id: 11,
    rating: 5,
    reviewCount: 7,
    name: "Console d'entrée",
    description:
      "Console fine en frêne massif, plateau biseauté et piètement compas. L. 90 cm.",
    price: 320,
    emoji: "🚪",
    tag: "Best-seller",
    wood: "Frêne",
    category: "mobilier",
    bg: { light: "oklch(0.86 0.04 66)", dark: "oklch(0.28 0.035 60)" },
    inStock: false,
  },
  {
    id: 12,
    rating: 4.6,
    reviewCount: 11,
    name: "Galet décoratif",
    description:
      "Forme galet polie au tampon, veinage flammé du merisier mis en valeur.",
    price: 46,
    emoji: "🪨",
    tag: "Pièce unique",
    wood: "Merisier",
    category: "sculpture",
    bg: { light: "oklch(0.92 0.025 76)", dark: "oklch(0.24 0.03 64)" },
  },
];

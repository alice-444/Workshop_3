// Constantes globales du site, partagées par les métadonnées, le sitemap et robots.
export const SITE_NAME = "Animal-Totem";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://animal-totem.fr";

export const SITE_DESCRIPTION =
  "Atelier Animal-Totem : créations artisanales uniques en bois local — décoration, sculptures, mobilier et objets façonnés à la main pour durer. Pièces uniques et commandes sur-mesure.";

// Image par défaut pour les partages sociaux (Open Graph / Twitter Card).
export const SITE_OG_IMAGE = {
  url: `${SITE_URL}/Hero.png`,
  width: 1440,
  height: 879,
  alt: SITE_NAME,
};

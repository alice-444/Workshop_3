export type FaqItem = {
  question: string;
  answer: string;
  image: string;
  imageAlt: string;
  /** Classes Tailwind du cadre coloré autour de l'image. */
  frameClass: string;
};

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: "Réalisez-vous les découpes de bois vous-même ?",
    answer:
      "Oui, chaque découpe est réalisée à la main dans mon atelier. Je dessine d'abord chaque motif, puis je découpe les différentes couches de bois à la scie à chantourner avant de les poncer et de les assembler avec soin.",
    image: "/contact/faq1.png",
    imageAlt: "Découpe de girafe en bois en cours de peinture dans l'atelier",
    frameClass: "bg-[oklch(0.78_0.02_250)]",
  },
  {
    question: "Quel type de peinture utilisez-vous pour vos créations ?",
    answer:
      "J'utilise de la peinture spécialement conçue pour le bois extérieur. Ce choix technique permet d'assurer une plus longue tenue dans le temps. Les couleurs offrent un pouvoir couvrant élevé, une finition soignée et sont parfaitement résistantes à l'eau, protégeant ainsi l'œuvre durablement.",
    image: "/contact/faq2.png",
    imageAlt: "Dessin d'un loup en cours de mise en couleur",
    frameClass: "bg-[oklch(0.91_0.02_340)]",
  },
  {
    question: "D'où provient le bois que vous utilisez ?",
    answer:
      "Chaque création est réalisée en bois de Méranti, soigneusement sélectionné auprès de fournisseurs locaux. Je privilégie systématiquement les matériaux issus de circuits courts et je me déplace moi-même pour choisir chaque pièce de bois afin d'en garantir la qualité. Cette démarche me permet de soutenir les acteurs de mon territoire, tout en donnant vie à des décorations authentiques, durables et fabriquées avec le plus grand soin.",
    image: "/contact/faq3.png",
    imageAlt: "Croquis de héron et de lièvre sur la table de l'atelier",
    frameClass: "bg-[oklch(0.75_0.1_60)]",
  },
];

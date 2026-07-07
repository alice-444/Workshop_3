export const TABS = [
  { id: "mentions", label: "Mentions légales" },
  { id: "cgv", label: "Conditions générales de Vente (CGV)" },
  { id: "confidentialite", label: "Politique de Confidentialité" },
] as const;

export type TabId = (typeof TABS)[number]["id"];

export type LegalSection = {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
};

export const CONTENT: Record<
  TabId,
  { title: string; sections: LegalSection[] }
> = {
  mentions: {
    title: "Mentions légales",
    sections: [
      {
        heading: "1. Éditeur et Directeur de la publication",
        paragraphs: ["Le site Animal-Totem est édité par :", "Claire Mehadi"],
        bullets: [
          "Siège social : 8 rue de l'alouette, 59570 Bavay",
          "Email : claire.mehaddi@gmail.com",
          "Téléphone : +33 6 35 20 75 95",
          "SIRET : 911 194 033 00013",
          "TVA : TVA non applicable, art. 293 B du CGI",
        ],
      },
      {
        heading: "2. Hébergement",
        paragraphs: ["Ce site est hébergé par :"],
        bullets: [
          "Shopify Inc.",
          "Adresse : 151 rue O'Connor, Rez-de-chaussée, Ottawa, Ontario K2P 2L8, Canada",
          "Contact : assistance@shopify.com / 1-613-241-2828",
        ],
      },
      {
        heading: "3. Propriété intellectuelle & Données",
        paragraphs: [
          "Toute reproduction des créations en bois, photographies et textes figurant sur ce site est strictement interdite sans autorisation. Pour en savoir plus sur le traitement de vos données, veuillez consulter notre Politique de confidentialité.",
        ],
      },
    ],
  },
  cgv: {
    title: "Conditions générales de Vente (CGV)",
    sections: [
      {
        heading: "1. Produits et Pièces uniques",
        paragraphs: [
          "Les créations Animal-Totem sont sculptées et peintes à la main à partir de bois naturel. Chaque pièce est unique. Par conséquent, de légères variations de forme, de couleur ou de grain de bois peuvent exister par rapport aux photographies présentées sur le site, sans que cela ne constitue un défaut.",
        ],
      },
      {
        heading: "2. Prix et Paiement",
        paragraphs: [
          "Les prix de nos créations sont indiqués en euros (TVA non applicable, art. 293 B du CGI), hors frais de traitement et d'expédition. Le paiement est exigible immédiatement à la commande. Les transactions sont entièrement sécurisées par notre prestataire de paiement.",
        ],
      },
      {
        heading: "3. Expédition et Livraison",
        paragraphs: [
          "Nous apportons le plus grand soin à l'emballage de vos créations. Les articles en stock sont expédiés sous 3 à 5 jours ouvrés. Pour les créations sur commande, le délai de fabrication et d'expédition est de 2 à 3 semaines. Les délais et frais de livraison varient selon la destination et sont indiqués lors de la validation de la commande.",
        ],
      },
      {
        heading: "4. Droit de rétractation et Retours",
        paragraphs: [
          "Conformément aux dispositions légales en vigueur, vous disposez d'un délai de 14 jours à compter de la réception de votre commande pour exercer votre droit de rétractation. Les frais de retour sont à la charge du client. Le produit doit être retourné dans son emballage et son état d'origine. Les pièces personnalisées sur-mesure ne sont ni reprises ni échangées.",
        ],
      },
      {
        heading: "5. Garanties légales",
        paragraphs: [
          "Toutes nos créations bénéficient de la garantie légale de conformité et de la garantie des vices cachés, conformément aux dispositions légales du Code de la consommation français, permettant au client de renvoyer les produits livrés défectueux ou non conformes.",
        ],
      },
    ],
  },
  confidentialite: {
    title: "Politique de Confidentialité",
    sections: [
      {
        heading: "1. Responsable du traitement",
        paragraphs: [
          "Les données personnelles collectées sur le site Animal-Totem sont traitées par Claire Mehadi, en qualité de responsable du traitement.",
        ],
      },
      {
        heading: "2. Données collectées et Finalités",
        paragraphs: [
          "Nous collectons uniquement les données strictement nécessaires au traitement de vos commandes (nom, prénom, adresse postale, adresse email, numéro de téléphone). Ces informations nous permettent de préparer vos colis, d'assurer le suivi de livraison et de répondre à vos demandes de contact. Si vous vous y êtes expressément abonné, votre email pourra être utilisé pour vous envoyer les actualités de l'atelier.",
        ],
      },
      {
        heading: "3. Partage des données",
        paragraphs: [
          "Vos données personnelles ne sont jamais revendues à des tiers. Elles sont uniquement partagées avec nos prestataires de confiance indispensables au fonctionnement de la boutique :",
        ],
        bullets: [
          "Shopify (notre plateforme e-commerce et hébergeur)",
          "Nos transporteurs (pour l'expédition de vos colis)",
          "Nos prestataires de paiement (vos informations bancaires sont cryptées et gérées directement par eux, nous n'y avons jamais accès).",
        ],
      },
      {
        heading: "4. Conservation des données",
        paragraphs: [
          "Vos données sont conservées pendant la durée nécessaire à la gestion de la relation commerciale et dans le respect des obligations légales de conservation (notamment à des fins de facturation et de comptabilité).",
        ],
      },
      {
        heading: "5. Vos droits (RGPD)",
        paragraphs: [
          "Conformément à la réglementation européenne (RGPD), vous disposez d'un droit d'accès, de rectification, d'effacement et de portabilité de vos données personnelles. Vous pouvez exercer ces droits à tout moment en nous contactant à l'adresse suivante : claire.mehaddi@gmail.com.",
        ],
      },
    ],
  },
};

export const TABS = [
  { id: "cgv", label: "CGV" },
  { id: "mentions", label: "Mentions légales" },
  { id: "retour", label: "Politique de retour" },
  { id: "cgu", label: "CGU" },
  { id: "confidentialite", label: "Confidentialité" },
  { id: "paiement", label: "Paiement" },
] as const;

export type TabId = (typeof TABS)[number]["id"];

export const CONTENT: Record<TabId, { title: string; body: string }> = {
  cgv: {
    title: "Conditions Générales de Vente",
    body: "Les présentes conditions générales de vente régissent les relations contractuelles entre notre société et ses clients dans le cadre de la vente de produits via notre boutique en ligne.",
  },
  mentions: {
    title: "Mentions légales",
    body: "Conformément aux dispositions de la loi n°2004-575 du 21 juin 2004 pour la confiance en l'économie numérique, il est précisé aux utilisateurs du site l'identité des différents intervenants.",
  },
  retour: {
    title: "Politique de retour",
    body: "Vous disposez d'un délai de 30 jours à compter de la réception de votre commande pour retourner tout article qui ne vous conviendrait pas. Les articles doivent être retournés dans leur état d'origine.",
  },
  cgu: {
    title: "Conditions Générales d'Utilisation",
    body: "Les présentes conditions générales d'utilisation définissent les modalités d'accès et d'utilisation des services proposés par notre plateforme à ses utilisateurs.",
  },
  confidentialite: {
    title: "Politique de confidentialité",
    body: "Nous accordons une grande importance à la protection de vos données personnelles. Cette politique décrit comment nous collectons, utilisons et protégeons vos informations conformément au RGPD.",
  },
  paiement: {
    title: "Modalités de paiement",
    body: "Nous acceptons les paiements par carte bancaire (Visa, Mastercard, American Express), PayPal et virement bancaire. Toutes les transactions sont sécurisées par un chiffrement SSL.",
  },
};

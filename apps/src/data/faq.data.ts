export const FAQ_TABS = [
  { id: "commandes", label: "Commandes" },
  { id: "livraison", label: "Livraison" },
  { id: "retours", label: "Retours" },
  { id: "paiement", label: "Paiement" },
  { id: "compte", label: "Mon compte" },
] as const;

export type FaqTabId = (typeof FAQ_TABS)[number]["id"];

export type FaqItem = { question: string; answer: string };

export const FAQ_CONTENT: Record<FaqTabId, FaqItem[]> = {
  commandes: [
    {
      question: "Comment passer une commande ?",
      answer:
        "Ajoutez les articles souhaités à votre panier, puis cliquez sur « Commander ». Suivez les étapes de validation : adresse, livraison, paiement.",
    },
    {
      question: "Puis-je modifier ma commande après validation ?",
      answer:
        "Les modifications sont possibles dans l'heure suivant la validation. Passé ce délai, contactez notre service client.",
    },
    {
      question: "Comment suivre ma commande ?",
      answer:
        "Un e-mail de confirmation avec un lien de suivi vous est envoyé dès l'expédition. Vous pouvez aussi consulter l'historique dans votre compte.",
    },
  ],
  livraison: [
    {
      question: "Quels sont les délais de livraison ?",
      answer:
        "La livraison standard prend 3 à 5 jours ouvrés. La livraison express est disponible en 24 h pour les commandes passées avant 12 h.",
    },
    {
      question: "Livrez-vous à l'international ?",
      answer:
        "Oui, nous livrons dans plus de 30 pays. Les frais et délais varient selon la destination, consultez notre page livraison pour les détails.",
    },
    {
      question: "La livraison est-elle gratuite ?",
      answer:
        "La livraison est offerte pour toute commande supérieure à 50 €. En dessous, des frais forfaitaires de 4,90 € s'appliquent.",
    },
  ],
  retours: [
    {
      question: "Comment retourner un article ?",
      answer:
        "Rendez-vous dans « Mes commandes », sélectionnez l'article et cliquez sur « Retourner ». Imprimez l'étiquette prépayée et déposez le colis en point relais.",
    },
    {
      question: "Quel est le délai pour effectuer un retour ?",
      answer:
        "Vous disposez de 30 jours à compter de la réception pour retourner un article dans son état d'origine avec les étiquettes.",
    },
    {
      question: "Quand serai-je remboursé ?",
      answer:
        "Le remboursement est effectué sous 5 à 7 jours ouvrés après réception et contrôle du colis retourné.",
    },
  ],
  paiement: [
    {
      question: "Quels moyens de paiement acceptez-vous ?",
      answer:
        "Nous acceptons les cartes bancaires (Visa, Mastercard, Amex), PayPal, Apple Pay et le virement bancaire.",
    },
    {
      question: "Mes données bancaires sont-elles sécurisées ?",
      answer:
        "Oui, toutes les transactions sont chiffrées via SSL et nous ne stockons aucune donnée de carte bancaire sur nos serveurs.",
    },
    {
      question: "Puis-je payer en plusieurs fois ?",
      answer:
        "Le paiement en 3 ou 4 fois sans frais est disponible via Alma pour les commandes supérieures à 100 €.",
    },
  ],
  compte: [
    {
      question: "Comment créer un compte ?",
      answer:
        "Cliquez sur « Connexion » puis « Créer un compte ». Renseignez votre e-mail et un mot de passe. Un e-mail de confirmation vous sera envoyé.",
    },
    {
      question: "J'ai oublié mon mot de passe, que faire ?",
      answer:
        "Cliquez sur « Mot de passe oublié » sur la page de connexion, saisissez votre e-mail et suivez les instructions reçues.",
    },
    {
      question: "Comment supprimer mon compte ?",
      answer:
        "Rendez-vous dans « Paramètres du compte » puis « Supprimer mon compte ». Cette action est irréversible et supprime toutes vos données.",
    },
  ],
};

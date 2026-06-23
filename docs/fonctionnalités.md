# Fonctionnalités

Vue d'ensemble des fonctionnalités du site, par domaine. Le site fonctionne
**sans backend** : les données sont statiques (`apps/src/data/`) et les actions
sensibles (paiement, envoi d'e-mail) sont simulées côté client.

## Boutique (`/shop`)

- **Catalogue** de produits issus de `shop.data.ts`.
- **Filtre par catégorie** (onglets).
- **Tri** : nouveautés, prix croissant, prix décroissant.
- **Densité de la grille** réglable (3 ou 4 colonnes, ≥ desktop).
- **Compteur** de créations + nombre d'articles **en rupture de stock**.
- Composant `ProductCard` avec bouton **Ajouter au panier**.

> Logique dans `app/shop/ShopClient.tsx`.

## Panier

- État global via **contexte React** (`CartProvider` / `useCart`).
- **Persistance** dans `localStorage` (le panier survit au rechargement).
- Actions : `addItem`, `removeItem`, `updateQuantity`, `clear`.
- Valeurs dérivées : `itemCount`, `subtotal`.
- **`CartPopover`** dans le header : aperçu des articles et sous-total.
- ⚠️ Pas de tunnel de paiement (démonstration).

> `components/cart/CartProvider.tsx`, `CartPopover.tsx`, `AddToCartButton.tsx`.

## Contact (`/contact`)

- Formulaire (nom, e-mail, sujet, message).
- **Validation** côté client avec **zod**.
- **Accessibilité** : `aria-invalid`, messages d'erreur liés
  (`aria-describedby`), `role="alert"`.
- **Retour utilisateur** via un toast **sonner** en cas de succès.
- ⚠️ Pas d'envoi réel (succès simulé).

> `app/contact/ContactForm.tsx`.

## FAQ (`/faq`)

- Navigation par **onglets** thématiques (`FaqTabs`).
- Réponses en **accordéon** dépliable (`FaqAccordion`).
- Contenu depuis `faq.data.ts`.

## Mentions légales (`/legal`)

- Contenu organisé en **onglets** (`LegalTabs` + `LegalContent`).
- Contenu depuis `legal.data.ts`.

## À propos (`/about`)

- Présentation de l'atelier et de la créatrice.
- **Section Services** détaillée (`ServicesSection`) : étapes, repères
  pratiques (délai, tarif) et **deux CTA par service** (principal + secondaire),
  empilés en mobile et alignés en desktop.

## Accueil (`/`)

Composée de sections réutilisables : `HeroSection`,
`FeaturedProductsSection`, `ServicesSection`, `ContactCtaSection`,
`MarqueeBand`.

## Transversal

- **Thème clair / sombre** via `next-themes` (`ModeToggle` dans le header).
- **Header responsive** avec menu mobile.
- **Bouton « retour en haut »** (`BackToTop`).
- **États de route** : chargement (`loading.tsx`), erreur (`error.tsx`),
  page 404 (`not-found.tsx`).
- **Design responsive** mobile-first (voir [conventions](./conventions.md#styles)).

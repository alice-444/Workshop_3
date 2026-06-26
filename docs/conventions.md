# Conventions

## Nommage

| Élément                      | Convention          | Exemple                               |
| ---------------------------- | ------------------- | ------------------------------------- |
| Fichiers de composants       | **PascalCase**      | `ProductCard.tsx`, `CartProvider.tsx` |
| Composants de section        | suffixe `Section`   | `ServicesSection.tsx`                 |
| Composants clients de route  | suffixe `Client`    | `ShopClient.tsx`                      |
| Fichiers de données          | `*.data.ts` (kebab) | `shop.data.ts`                        |
| Routes (dossiers)            | kebab-case          | `app/about/`                          |
| Fichiers spéciaux App Router | imposés par Next    | `page.tsx`, `layout.tsx`…             |

## Imports

- **Même dossier** : import relatif.
  `import { useCart } from "./CartProvider";`
- **Dossier différent** : alias absolu `@/`.
  `import ProductCard from "@/components/product/ProductCard";`
- **UI partagée** : alias dédié.
  `import { Button } from "@e-commerce/ui/components/button";`

## Server / Client Components

- `page.tsx` reste un **Server Component** par défaut.
- Tout ce qui utilise état, effets, événements ou contexte est isolé dans un
  composant `"use client"` (souvent `*Client.tsx`).
- Les providers globaux (thème, panier) sont montés une seule fois dans
  `app/layout.tsx` via `Providers`.

## Styles

- **Tailwind CSS v4**, classes utilitaires directement dans le JSX.
- **Tokens de design** définis en OKLCH dans
  `packages/ui/src/styles/globals.css` (couleurs, thèmes clair/sombre).
- **Typographies** via variables CSS, appliquées en inline :
  - `var(--font-heading)` — Cormorant Garamond (titres)
  - `var(--font-body)` — Jost (corps de texte)
- **Responsive** : approche mobile-first, points de rupture Tailwind
  (`sm:`, `md:`, `lg:`). Ex. boutons empilés en mobile, alignés en desktop :
  `flex flex-col sm:flex-row`.

### Boutons

Les variantes de `Button` (`packages/ui/src/components/button.tsx`) intègrent un
**effet 3D « pressable »** via une bordure basse épaisse (`border-b-4`) qui se
rétracte au clic (`active:border-b-0 active:translate-y-0.5`). Variantes avec
relief : `default`, `outline`, `secondary`, `destructive`. La variante `ghost`
est plate (sans bordure).

## Internationalisation

L'interface est **en français**. Le code (noms de variables, types) est en
anglais ; les chaînes affichées sont en français.

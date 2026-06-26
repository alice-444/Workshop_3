# Développement

## Prérequis

- **Node.js** — version récente (LTS recommandée ; React 19 / Next 16)
- **pnpm** (gestionnaire de paquets du monorepo) — `packageManager: pnpm@11.5.1`

## Installation

```bash
pnpm install
```

## Scripts

Lancés depuis la **racine** (délégués à Turborepo) :

| Commande               | Effet                                             |
| ---------------------- | ------------------------------------------------- |
| `pnpm run dev`         | Démarre l'app en mode développement               |
| `pnpm run build`       | Build de production                               |
| `pnpm run start`       | Sert le build de production                       |
| `pnpm run check-types` | Vérifie les types TypeScript sur tout le monorepo |

L'application est servie sur **http://localhost:4830**
(`apps/package.json` : `next dev --port 4830`).

## Workflow type

1. `pnpm run dev` et ouvrir http://localhost:4830.
2. Modifier les fichiers — le **Hot Module Replacement** recharge
   automatiquement.
3. Avant de pousser : `pnpm run check-types`.

## Ajouter du contenu

- **Produits, FAQ, mentions légales** : éditer les fichiers de
  `apps/src/data/` (voir [architecture.md](./architecture.md#données-appssrcdata)).
- **Nouvelle page** : créer `apps/src/app/<route>/page.tsx`. Pour de
  l'interactivité, ajouter un composant `"use client"` dédié.
- **Nouvelle section** : ajouter un composant dans
  `apps/src/components/sections/` (suffixe `Section`).

## Ajouter un composant d'UI partagé

Depuis la racine, via la CLI shadcn ciblant le package `ui` :

```bash
pnpx shadcn@latest add <composant> -c packages/ui
```

Puis l'importer : `import { X } from "@e-commerce/ui/components/x";`

## Variables d'environnement

Validées via le package `@e-commerce/env` (schéma zod). Ajouter une variable
implique de mettre à jour ce schéma.

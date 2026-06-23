# Animal-Totem

Boutique en ligne d'un atelier d'artisanat sur bois — créations sur-mesure et
ateliers créatifs. Application **Next.js 16** dans un monorepo **Turborepo**,
avec une bibliothèque d'UI partagée basée sur **shadcn/ui**.

## Stack

- **Next.js 16** — App Router, React 19, React Compiler
- **TypeScript**
- **Tailwind CSS v4**
- **shadcn/ui** — primitives partagées dans `packages/ui`
- **Turborepo** + **pnpm workspaces**

## Démarrage

```bash
pnpm install
pnpm run dev
```

Ouvrir [http://localhost:4830](http://localhost:4830).

## Scripts (racine)

| Commande               | Effet                        |
| ---------------------- | ---------------------------- |
| `pnpm run dev`         | Mode développement           |
| `pnpm run build`       | Build de production          |
| `pnpm run start`       | Sert le build de production  |
| `pnpm run check-types` | Vérifie les types TypeScript |

## Structure

```text
├── apps/              # Application Next.js (le site)
├── packages/
│   ├── ui/            # Primitives shadcn/ui + tokens de design partagés
│   ├── env/           # Validation des variables d'environnement (zod)
│   └── config/        # Configurations partagées
└── docs/              # Documentation du projet
```

Pages : Accueil, Boutique, À propos, Contact, FAQ, Mentions légales.

## Documentation

La documentation détaillée vit dans [`docs/`](./docs/) :

- [Fonctionnalités](./docs/fonctionnalités.md) — fonctionnalités du site, par domaine
- [Architecture](./docs/architecture.md) — monorepo, application, composants, données
- [Conventions](./docs/conventions.md) — nommage, imports, styles
- [Développement](./docs/développement.md) — installation, scripts, workflow

## UI partagée

Les composants React de ce stack partagent les primitives shadcn/ui via
`packages/ui`.

- Tokens de design et styles globaux : `packages/ui/src/styles/globals.css`
- Primitives partagées : `packages/ui/src/components/*`
- Config shadcn : `packages/ui/components.json` et `apps/components.json`

### Ajouter une primitive partagée

Depuis la racine, en ciblant le package `ui` :

```bash
pnpx shadcn@latest add <composant> -c packages/ui
```

Import :

```tsx
import { Button } from "@e-commerce/ui/components/button";
```

Pour des blocs spécifiques à l'app plutôt que des primitives partagées, lancer
la CLI shadcn depuis `apps`.

# Documentation — Animal-Totem

Boutique en ligne d'un atelier d'artisanat sur bois (créations sur-mesure et
ateliers créatifs). Application **Next.js 16** dans un monorepo **Turborepo**,
avec une bibliothèque d'UI partagée basée sur **shadcn/ui**.

## Sommaire

| Document | Contenu |
|----------|---------|
| [fonctionnalités.md](./fonctionnalités.md) | Fonctionnalités du site, par domaine |
| [architecture.md](./architecture.md) | Structure du monorepo, de l'application et des données |
| [conventions.md](./conventions.md) | Conventions de nommage, imports, styles et composants |
| [développement.md](./développement.md) | Installation, scripts, workflow local |

## En bref

- **Stack** : Next.js 16 (App Router, React 19, React Compiler) · TypeScript ·
  Tailwind CSS v4 · shadcn/ui · Turborepo · pnpm.
- **App** : `apps/` — le site public (port `4830`).
- **UI partagée** : `packages/ui/` — primitives shadcn et tokens de design.
- **Pages** : Accueil, Boutique, À propos, Contact, FAQ, Mentions légales.

## Démarrage rapide

```bash
pnpm install
pnpm run dev        # http://localhost:4830
```

> Voir [développement.md](./développement.md) pour le détail des scripts.

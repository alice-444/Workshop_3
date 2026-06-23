import Link from "next/link";
import type { Route } from "next";
import { ChevronRight } from "lucide-react";

export type Crumb = {
  label: string;
  /** Lien de l'élément. Absent = élément courant (non cliquable). */
  href?: Route;
};

/** Fil d'Ariane de navigation contextuelle. */
export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Fil d'Ariane" className="mb-8">
      <ol
        className="flex flex-wrap items-center gap-1.5 text-[11px] uppercase tracking-[0.15em] text-muted-foreground"
        style={{ fontFamily: "var(--font-body)" }}
      >
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={item.label} className="flex items-center gap-1.5">
              {item.href && !last ? (
                <Link
                  href={item.href}
                  className="hover:text-foreground transition-colors duration-200"
                >
                  {item.label}
                </Link>
              ) : (
                <span className={last ? "text-foreground" : undefined} aria-current={last ? "page" : undefined}>
                  {item.label}
                </span>
              )}
              {!last && (
                <ChevronRight size={12} className="text-muted-foreground/50" aria-hidden="true" />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

"use client";

import { useEffect, useMemo, useState } from "react";
import { Search, X, PackageOpen } from "lucide-react";
import {
  SHOP_CATEGORIES,
  SHOP_SORTS,
  type ShopCategoryId,
  type ShopSortId,
} from "@/data/shop.data";
import type { NormalizedProduct } from "@/lib/shopify";
import ProductCard from "@/components/product/ProductCard";

type Columns = 3 | 4;

const PAGE_SIZE = 8;

export default function ShopClient({ products: allProducts }: { products: NormalizedProduct[] }) {
  const [category, setCategory] = useState<ShopCategoryId>("tout");
  const [sort, setSort] = useState<ShopSortId>("nouveautes");
  const [columns, setColumns] = useState<Columns>(4);
  const [query, setQuery] = useState("");
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const products = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = allProducts.filter((p) => {
      if (category !== "tout" && p.category !== category) return false;
      if (onlyInStock && !p.availableForSale) return false;
      if (q && !p.name.toLowerCase().includes(q)) return false;
      return true;
    });

    const sorted = [...filtered];
    if (sort === "prix-asc") sorted.sort((a, b) => a.price - b.price);
    else if (sort === "prix-desc") sorted.sort((a, b) => b.price - a.price);
    return sorted;
  }, [allProducts, category, sort, query, onlyInStock]);

  // Réinitialise le chargement progressif quand les filtres changent.
  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [category, sort, query, onlyInStock]);

  const outOfStockCount = products.filter((p) => !p.availableForSale).length;
  const visibleProducts = products.slice(0, visibleCount);
  const hasMore = visibleCount < products.length;

  const isFiltered = category !== "tout" || onlyInStock || query.trim() !== "";
  const resetFilters = () => {
    setCategory("tout");
    setOnlyInStock(false);
    setQuery("");
  };

  return (
    <div>
      {/* Recherche */}
      <div className="relative mb-6">
        <Search
          size={16}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
          aria-hidden="true"
        />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Rechercher une création…"
          aria-label="Rechercher une création"
          className="w-full bg-transparent border border-border/60 rounded-full pl-11 pr-10 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring hover:border-border transition-colors"
          style={{ fontFamily: "var(--font-body)" }}
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            aria-label="Effacer la recherche"
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <X size={15} aria-hidden="true" />
          </button>
        )}
      </div>

      {/* Barre de filtres */}
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between mb-12">
        {/* Catégories */}
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Catégories">
          {SHOP_CATEGORIES.map((cat) => {
            const active = cat.id === category;
            return (
              <button
                key={cat.id}
                role="tab"
                aria-selected={active}
                onClick={() => setCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-[11px] uppercase tracking-[0.15em] transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-ring ${active
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                  }`}
                style={{ fontFamily: "var(--font-body)" }}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Disponibilité + Affichage + Tri */}
        <div className="flex items-center gap-4 shrink-0">
          {/* Disponibilité */}
          <button
            onClick={() => setOnlyInStock((v) => !v)}
            aria-pressed={onlyInStock}
            className={`px-4 py-2 rounded-full text-[11px] uppercase tracking-[0.15em] border transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-ring ${onlyInStock
              ? "bg-primary text-primary-foreground border-primary"
              : "border-border/60 text-muted-foreground hover:text-foreground hover:border-border"
              }`}
            style={{ fontFamily: "var(--font-body)" }}
          >
            En stock
          </button>

          {/* Densité de la grille — masqué sur petit écran */}
          <div
            className="hidden lg:flex items-center gap-1 border border-border/60 rounded-full p-1"
            role="group"
            aria-label="Nombre de créations par rangée"
          >
            {([3, 4] as const).map((n) => {
              const active = columns === n;
              return (
                <button
                  key={n}
                  onClick={() => setColumns(n)}
                  aria-pressed={active}
                  aria-label={`${n} par rangée`}
                  title={`${n} par rangée`}
                  className={`flex items-center gap-[2px] px-2.5 py-1.5 rounded-full transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-ring ${active
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                    }`}
                >
                  {Array.from({ length: n }).map((_, i) => (
                    <span
                      key={i}
                      className="w-[3px] h-3.5 rounded-full bg-current"
                      aria-hidden="true"
                    />
                  ))}
                </button>
              );
            })}
          </div>

          <label
            htmlFor="shop-sort"
            className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Trier
          </label>
          <select
            id="shop-sort"
            value={sort}
            onChange={(e) => setSort(e.target.value as ShopSortId)}
            className="bg-transparent border border-border/60 rounded-full px-4 py-2 text-[11px] uppercase tracking-[0.12em] text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer hover:border-border transition-colors"
            style={{ fontFamily: "var(--font-body)" }}
          >
            {SHOP_SORTS.map((s) => (
              <option key={s.id} value={s.id} className="bg-background text-foreground">
                {s.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Compteur */}
      <p
        className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-6"
        style={{ fontFamily: "var(--font-body)" }}
      >
        {products.length} création{products.length !== 1 ? "s" : ""}
        {outOfStockCount > 0 && (
          <span className="text-muted-foreground/70">
            {" "}· {outOfStockCount} en rupture
          </span>
        )}
      </p>

      {/* Grille produits */}
      <div
        className={`grid sm:grid-cols-2 gap-4 ${columns === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4"
          }`}
      >
        {visibleProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}

      </div>

      {/* Chargement progressif */}
      {hasMore && (
        <div className="flex justify-center mt-12">
          <button
            onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
            className="px-8 h-11 rounded-full border border-border border-b-4 active:border-b active:translate-y-0.5 bg-background hover:bg-muted text-xs tracking-[0.15em] uppercase text-foreground transition-all outline-none focus-visible:ring-2 focus-visible:ring-ring"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Voir plus ({products.length - visibleCount})
          </button>
        </div>
      )}

      {/* État vide */}
      {products.length === 0 && (
        <div className="flex flex-col items-center gap-4 text-center py-20">
          <span className="flex items-center justify-center w-16 h-16 rounded-full bg-muted/60 text-muted-foreground">
            <PackageOpen size={28} aria-hidden="true" />
          </span>
          <div className="flex flex-col gap-1">
            <p
              className="text-base text-foreground"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Aucune création trouvée
            </p>
            <p
              className="text-sm text-muted-foreground max-w-sm"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {query.trim()
                ? `Rien ne correspond à « ${query.trim()} » avec ces filtres.`
                : "Aucune création ne correspond à ces filtres pour le moment."}
            </p>
          </div>
          {isFiltered && (
            <button
              onClick={resetFilters}
              className="mt-2 px-6 h-10 rounded-full bg-primary text-primary-foreground text-xs tracking-[0.15em] uppercase border-b-4 border-b-black/25 active:border-b-0 active:translate-y-0.5 transition-all outline-none focus-visible:ring-2 focus-visible:ring-ring"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Réinitialiser les filtres
            </button>
          )}
        </div>
      )}
    </div>
  );
}

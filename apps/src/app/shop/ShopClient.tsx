"use client";

import { useMemo, useState } from "react";
import {
  PRODUCTS,
  SHOP_CATEGORIES,
  SHOP_SORTS,
  type ShopCategoryId,
  type ShopSortId,
} from "@/data/shop.data";
import ProductCard from "@/components/product-card";

type Columns = 3 | 4;

export default function ShopClient() {
  const [category, setCategory] = useState<ShopCategoryId>("tout");
  const [sort, setSort] = useState<ShopSortId>("nouveautes");
  const [columns, setColumns] = useState<Columns>(4);

  const products = useMemo(() => {
    const filtered =
      category === "tout"
        ? PRODUCTS
        : PRODUCTS.filter((p) => p.category === category);

    const sorted = [...filtered];
    if (sort === "prix-asc") sorted.sort((a, b) => a.price - b.price);
    else if (sort === "prix-desc") sorted.sort((a, b) => b.price - a.price);
    return sorted;
  }, [category, sort]);

  const outOfStockCount = products.filter((p) => p.inStock === false).length;

  return (
    <div>
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

        {/* Affichage + Tri */}
        <div className="flex items-center gap-4 shrink-0">
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
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {products.length === 0 && (
        <p
          className="text-sm text-muted-foreground text-center py-16"
          style={{ fontFamily: "var(--font-body)" }}
        >
          Aucune création dans cette catégorie pour le moment.
        </p>
      )}
    </div>
  );
}

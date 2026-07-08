"use client";

import { useEffect, useMemo, useState } from "react";
import { ChevronDown, Search, X } from "lucide-react";
import type { NormalizedProduct } from "@/lib/shopify";
import ProductCard from "@/components/product/ProductCard";

const PAGE_SIZE = 8;

export default function ShopClient({
  products: allProducts,
  categories,
}: {
  products: NormalizedProduct[];
  categories: string[];
}) {
  const [category, setCategory] = useState("tout");
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const products = useMemo(() => {
    const q = query.trim().toLowerCase();
    return allProducts.filter((p) => {
      if (category !== "tout" && p.category !== category) return false;
      if (q && !p.name.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [allProducts, category, query]);

  // Réinitialise le chargement progressif quand les filtres changent.
  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [category, query]);

  const visibleProducts = products.slice(0, visibleCount);
  const hasMore = visibleCount < products.length;

  const isFiltered = category !== "tout" || query.trim() !== "";
  const resetFilters = () => {
    setCategory("tout");
    setQuery("");
  };

  return (
    <div>
      {/* Recherche */}
      <div className="relative max-w-sm mx-auto mb-10">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Rechercher"
          aria-label="Rechercher une création"
          className="w-full bg-transparent border border-border/60 rounded-md pl-4 pr-10 py-2 text-sm italic text-foreground placeholder:text-muted-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring hover:border-border transition-colors"
          style={{ fontFamily: "var(--font-body)" }}
        />
        {query ? (
          <button
            onClick={() => setQuery("")}
            aria-label="Effacer la recherche"
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <X size={15} aria-hidden="true" />
          </button>
        ) : (
          <Search
            size={15}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
            aria-hidden="true"
          />
        )}
      </div>

      {/* Filtre catégorie — masqué quand la recherche ne trouve rien */}
      <div className={`relative mb-8 w-fit ${products.length === 0 ? "hidden" : ""}`}>
        <button
          type="button"
          onClick={() => setCategoryOpen((v) => !v)}
          aria-haspopup="listbox"
          aria-expanded={categoryOpen}
          className="flex items-center gap-8 rounded-xl border border-border bg-card px-5 py-3 text-base text-foreground cursor-pointer transition-colors hover:border-foreground/30 outline-none focus-visible:ring-2 focus-visible:ring-ring"
          style={{ fontFamily: "var(--font-body)" }}
        >
          <span>{category === "tout" ? "Catégorie" : category}</span>
          <ChevronDown
            size={18}
            className={`shrink-0 transition-transform duration-200 ${categoryOpen ? "rotate-180" : ""}`}
            aria-hidden="true"
          />
        </button>

        {categoryOpen && (
          <>
            {/* Ferme le menu au clic à l'extérieur */}
            <div
              className="fixed inset-0 z-10"
              aria-hidden="true"
              onClick={() => setCategoryOpen(false)}
            />
            <ul
              role="listbox"
              aria-label="Catégorie"
              className="absolute left-0 top-full mt-2 z-20 min-w-full w-max list-none overflow-hidden rounded-xl border border-border bg-card shadow-md divide-y divide-border"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {["tout", ...categories].map((cat) => (
                <li key={cat}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={category === cat}
                    onClick={() => {
                      setCategory(cat);
                      setCategoryOpen(false);
                    }}
                    className={`w-full px-5 py-3 text-left text-base transition-colors hover:bg-accent hover:text-accent-foreground ${category === cat ? "text-foreground font-medium" : "text-foreground/85"}`}
                  >
                    {cat === "tout" ? "Toutes les catégories" : cat}
                  </button>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>

      {/* Grille produits */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {visibleProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Chargement progressif */}
      {hasMore && (
        <div className="flex justify-center mt-12">
          <button
            onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
            className="px-8 h-11 rounded-lg border border-border bg-background hover:bg-muted text-xs tracking-[0.15em] uppercase text-foreground transition-all outline-none focus-visible:ring-2 focus-visible:ring-ring"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Voir plus ({products.length - visibleCount})
          </button>
        </div>
      )}

      {/* État vide */}
      {products.length === 0 && (
        <div className="flex flex-col items-center gap-10 text-center py-16">
          <h2
            className="text-3xl md:text-4xl font-normal text-foreground"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Nous explorons encore cette piste...
          </h2>
          <p
            className="text-sm text-foreground/85 leading-relaxed max-w-2xl"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Il semble que votre recherche n&apos;ait pas trouvé d&apos;écho dans notre
            atelier pour le moment. Vérifiez l&apos;orthographe ou laissez-vous surprendre
            par les créatures qui habitent déjà notre collection.
          </p>
          {isFiltered && (
            <button
              onClick={resetFilters}
              className="px-8 h-13 rounded-lg bg-primary text-primary-foreground text-lg font-medium hover:bg-primary/90 transition-all outline-none focus-visible:ring-2 focus-visible:ring-ring"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Découvrir la collection
            </button>
          )}
        </div>
      )}
    </div>
  );
}

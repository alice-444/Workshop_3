import { Skeleton } from "@e-commerce/ui/components/skeleton";
import { Card, CardFooter, CardHeader } from "@e-commerce/ui/components/card";

// Largeurs variées pour les pastilles de catégories — évite un rendu trop régulier.
const FILTER_WIDTHS = ["w-16", "w-28", "w-20", "w-24", "w-24"];

export default function ShopLoading() {
  return (
    <main className="overflow-x-hidden">
      <section className="max-w-6xl mx-auto px-6 pt-12 pb-24">
        {/* En-tête */}
        <div className="max-w-2xl mb-14">
          <Skeleton className="h-3 w-28 mb-5" />
          <Skeleton className="h-14 w-3/4 mb-5" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-2/3" />
        </div>

        {/* Barre de filtres */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between mb-6">
          <div className="flex flex-wrap gap-2">
            {FILTER_WIDTHS.map((w, i) => (
              <Skeleton key={i} className={`h-9 ${w} rounded-full`} />
            ))}
          </div>
          <div className="flex items-center gap-4 shrink-0">
            <Skeleton className="hidden lg:block h-9 w-24 rounded-full" />
            <Skeleton className="h-9 w-32 rounded-full" />
          </div>
        </div>

        {/* Compteur */}
        <Skeleton className="h-3 w-24 mb-6" />

        {/* Grille produits — mêmes primitives Card que les vraies fiches */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <Card key={i}>
              <Skeleton className="aspect-square w-full" />
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Skeleton className="h-2 w-14" />
                  <Skeleton className="h-2 w-10" />
                </div>
                <Skeleton className="h-4 w-3/4 mt-1" />
                <Skeleton className="h-3 w-full mt-1" />
                <Skeleton className="h-3 w-2/3" />
              </CardHeader>
              <CardFooter className="flex items-center justify-between">
                <Skeleton className="h-5 w-16" />
                <Skeleton className="h-7 w-16 rounded-full" />
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}

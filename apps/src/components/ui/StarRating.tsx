import { Star, StarHalf } from "lucide-react";

type StarRatingProps = {
  /** Note moyenne sur 5. */
  rating: number;
  /** Nombre d'avis, affiché entre parenthèses si fourni. */
  reviewCount?: number;
  /** Taille des étoiles en px. */
  size?: number;
};

/** Affiche une note sous forme d'étoiles (pleines / demie / vides). */
export default function StarRating({
  rating,
  reviewCount,
  size = 13,
}: StarRatingProps) {
  const label =
    `Noté ${rating} sur 5` +
    (reviewCount !== undefined ? ` — ${reviewCount} avis` : "");

  return (
    <div
      className="flex items-center gap-1.5"
      role="img"
      aria-label={label}
      style={{ fontFamily: "var(--font-body)" }}
    >
      <div className="flex items-center text-primary" aria-hidden="true">
        {Array.from({ length: 5 }).map((_, i) => {
          const filled = i + 1 <= Math.floor(rating);
          const half = !filled && i + 0.5 <= rating;
          if (half) {
            return (
              <StarHalf key={i} size={size} className="fill-current stroke-current" />
            );
          }
          return (
            <Star
              key={i}
              size={size}
              className={filled ? "fill-current stroke-current" : "stroke-current opacity-30"}
            />
          );
        })}
      </div>
      {reviewCount !== undefined && (
        <span className="text-[11px] text-muted-foreground tabular-nums">
          {rating.toFixed(1)} ({reviewCount})
        </span>
      )}
    </div>
  );
}

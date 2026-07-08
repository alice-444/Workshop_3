"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { ShopifyMediaNode } from "@/lib/shopify";

type Props = {
  media: ShopifyMediaNode[];
  alt: string;
  emoji: string;
  outOfStock: boolean;
  bgLight: string;
};

export default function ProductGallery({ media, alt, emoji, outOfStock, bgLight }: Props) {
  const [selected, setSelected] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Synchronise les miniatures avec le média visible pendant le défilement.
  useEffect(() => {
    const container = containerRef.current;
    if (!container || media.length <= 1) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((e) => e.isIntersecting);
        if (!visible) return;
        const index = itemRefs.current.indexOf(visible.target as HTMLDivElement);
        if (index !== -1) setSelected(index);
      },
      { root: container, threshold: 0.6 },
    );

    itemRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [media]);

  const scrollToIndex = (i: number) => {
    itemRefs.current[i]?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="flex flex-col gap-3">
      {/* Média principal — défilement vertical entre les images/vidéos */}
      <div
        className="relative aspect-square rounded-3xl overflow-hidden"
        style={{ backgroundColor: bgLight }}
      >
        {media.length === 0 ? (
          <div className={`absolute inset-0 flex items-center justify-center text-[10rem] ${outOfStock ? "grayscale opacity-40" : ""}`}>
            <span role="img" aria-label={alt}>{emoji}</span>
          </div>
        ) : (
          <div
            ref={containerRef}
            className="absolute inset-0 overflow-y-auto overscroll-contain snap-y snap-mandatory scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {media.map((item, i) => (
              <div
                key={i}
                ref={(el) => {
                  itemRefs.current[i] = el;
                }}
                className="relative w-full h-full snap-start"
              >
                {item.mediaContentType === "VIDEO" ? (
                  <video
                    className={`absolute inset-0 w-full h-full object-cover ${outOfStock ? "grayscale opacity-40" : ""}`}
                    autoPlay={i === selected}
                    muted
                    loop
                    playsInline
                    poster={item.previewImage?.url}
                  >
                    {item.sources.map((s) => (
                      <source key={s.url} src={s.url} type={s.mimeType} />
                    ))}
                  </video>
                ) : (
                  <Image
                    src={item.image.url}
                    alt={item.image.altText ?? alt}
                    fill
                    className={`object-cover ${outOfStock ? "grayscale opacity-40" : ""}`}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority={i === 0}
                  />
                )}
              </div>
            ))}
          </div>
        )}

        {outOfStock && (
          <span
            className="absolute top-4 left-4 z-10 rounded-full bg-foreground/85 text-background px-3 py-1.5 text-[9px] uppercase tracking-[0.2em] font-medium backdrop-blur-sm"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Rupture de stock
          </span>
        )}
      </div>

      {/* Miniatures */}
      {media.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {media.map((item, i) => {
            const thumb =
              item.mediaContentType === "IMAGE"
                ? item.image.url
                : item.mediaContentType === "VIDEO"
                  ? item.previewImage?.url
                  : null;

            return (
              <button
                key={i}
                onClick={() => scrollToIndex(i)}
                aria-label={item.mediaContentType === "VIDEO" ? `Vidéo ${i + 1}` : `Image ${i + 1}`}
                className={`relative shrink-0 w-16 h-16 rounded-xl overflow-hidden border-2 transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-ring ${i === selected ? "border-primary" : "border-transparent opacity-60 hover:opacity-100"
                  }`}
              >
                {thumb ? (
                  <Image src={thumb} alt="" fill className="object-cover" sizes="64px" />
                ) : (
                  <div className="w-full h-full bg-muted" />
                )}
                {item.mediaContentType === "VIDEO" && (
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="w-5 h-5 rounded-full bg-black/50 flex items-center justify-center">
                      <svg viewBox="0 0 10 10" className="w-2.5 h-2.5 fill-white ml-0.5">
                        <polygon points="2,1 9,5 2,9" />
                      </svg>
                    </span>
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

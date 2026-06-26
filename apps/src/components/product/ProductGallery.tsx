"use client";

import { useState } from "react";
import Image from "next/image";
import type { ShopifyMediaNode } from "@/lib/shopify";

type Props = {
  media: ShopifyMediaNode[];
  alt: string;
  emoji: string;
  outOfStock: boolean;
  bgLight: string;
  bgDark: string;
};

export default function ProductGallery({ media, alt, emoji, outOfStock, bgLight, bgDark }: Props) {
  const [selected, setSelected] = useState(0);
  const current = media[selected];

  return (
    <div className="flex flex-col gap-3">
      {/* Média principal */}
      <div
        className="relative aspect-square rounded-3xl overflow-hidden"
        style={{ backgroundColor: bgLight }}
      >
        {current?.mediaContentType === "VIDEO" ? (
          <video
            key={current.sources[0]?.url}
            className={`absolute inset-0 w-full h-full object-cover ${outOfStock ? "grayscale opacity-40" : ""}`}
            autoPlay
            muted
            loop
            playsInline
            poster={current.previewImage?.url}
          >
            {current.sources.map((s) => (
              <source key={s.url} src={s.url} type={s.mimeType} />
            ))}
          </video>
        ) : current?.mediaContentType === "IMAGE" ? (
          <Image
            src={current.image.url}
            alt={current.image.altText ?? alt}
            fill
            className={`object-cover transition-opacity duration-300 ${outOfStock ? "grayscale opacity-40" : ""}`}
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        ) : (
          <div className={`absolute inset-0 flex items-center justify-center text-[10rem] ${outOfStock ? "grayscale opacity-40" : ""}`}>
            <span role="img" aria-label={alt}>{emoji}</span>
          </div>
        )}

        {outOfStock && (
          <span
            className="absolute top-4 left-4 rounded-full bg-foreground/85 text-background px-3 py-1.5 text-[9px] uppercase tracking-[0.2em] font-medium backdrop-blur-sm"
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
                onClick={() => setSelected(i)}
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

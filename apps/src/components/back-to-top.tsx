"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function onScroll() {
      const scrolled = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setVisible(scrolled > 400);
      setProgress(total > 0 ? Math.min(scrolled / total, 1) : 0);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const size = 48;
  const r = 20;
  const circumference = 2 * Math.PI * r;
  const dash = circumference * progress;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Revenir en haut de page"
      className={[
        "fixed bottom-6 right-6 z-50 group transition-all duration-500 focus-visible:outline-none",
        visible ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-6 pointer-events-none",
      ].join(" ")}
    >
      {/* Anneau de progression SVG */}
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="absolute inset-0 -rotate-90 transition-all duration-300"
        aria-hidden="true"
      >
        {/* Piste */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          strokeWidth="2"
          className="stroke-border/60"
        />
        {/* Progression */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray={`${dash} ${circumference}`}
          className="stroke-primary transition-all duration-150"
        />
      </svg>

      {/* Cercle central */}
      <div className="relative w-12 h-12 rounded-full bg-background/90 backdrop-blur-sm border border-border/60 shadow-md flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all duration-300">
        <ArrowUp
          size={15}
          className="text-muted-foreground group-hover:text-primary-foreground group-hover:-translate-y-0.5 transition-all duration-300"
        />
      </div>
    </button>
  );
}

"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ModeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Passer en mode clair" : "Passer en mode sombre"}
      className="relative flex items-center w-12 h-6 rounded-full border border-border/60 bg-muted/60 hover:bg-muted transition-colors duration-300 shrink-0"
    >
      {/* Track fill */}
      <span
        className="absolute inset-0 rounded-full transition-colors duration-300"
        style={{ background: isDark ? "oklch(0.28 0.04 52)" : "" }}
        aria-hidden="true"
      />
      {/* Thumb */}
      <span
        className="relative z-10 flex items-center justify-center w-5 h-5 rounded-full bg-background shadow-sm border border-border/40 transition-all duration-300"
        style={{ transform: isDark ? "translateX(26px)" : "translateX(2px)" }}
        aria-hidden="true"
      >
        {isDark
          ? <Moon size={10} className="text-primary" />
          : <Sun size={10} className="text-primary" />
        }
      </span>
    </button>
  );
}

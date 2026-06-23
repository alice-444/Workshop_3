import Link from "next/link";
import type { Route } from "next";
import { Button } from "@e-commerce/ui/components/button";

const SERVICES = [
  {
    id: "sur-mesure",
    title: "Créations\nSur-mesure",
    description: "Donnez vie à vos idées. Nous concevons et fabriquons des pièces uniques en bois, adaptées à votre intérieur et à vos envies. Chaque création est une histoire.",
    steps: [
      "Échange autour de votre projet : usage, dimensions, essence et budget.",
      "Croquis et choix du bois, validés ensemble avant la moindre découpe.",
      "Fabrication entièrement à la main, finitions naturelles à l'huile et à la cire.",
      "Livraison soignée et conseils d'entretien pour faire durer la pièce.",
    ],
    meta: [
      { label: "Délai", value: "3 à 6 semaines" },
      { label: "Sur devis", value: "dès 80 €" },
    ],
    cta: "Découvrir la collection",
    href: "/shop" as Route,
    cta2: "Demander un devis",
    href2: "/contact" as Route,
    emoji: "🪵",
    visualBgClass: "bg-[oklch(0.88_0.06_68)] dark:bg-[oklch(0.28_0.04_62)]",
    patternColor: "oklch(0.42 0.07 55)",
    patternDir: "45deg",
    patternAnimation: "patternDriftIn 18s linear infinite",
    btnBg: "oklch(0.22 0.04 245)",
    btnBorder: "oklch(0.14 0.03 245)",
    reverse: false,
  },
  {
    id: "ateliers",
    title: "Ateliers\nCréatifs",
    description: "Éveillez leur imagination. Des moments ludiques où les enfants découvrent le plaisir de créer de leurs propres mains. Un espace d'expression pour expérimenter et s'amuser.",
    steps: [
      "Petits groupes encadrés, pour une vraie attention à chaque participant.",
      "Outils adaptés et bois préparé : on crée en toute sécurité, dès 6 ans.",
      "Un projet à réaliser et à emporter à la fin de chaque séance.",
      "Formules anniversaire, scolaires ou entre amis sur demande.",
    ],
    meta: [
      { label: "Durée", value: "2 h / séance" },
      { label: "Tarif", value: "35 € / pers." },
    ],
    cta: "Découvrir les ateliers",
    href: "/shop" as Route,
    cta2: "Réserver une séance",
    href2: "/contact" as Route,
    emoji: "🎨",
    visualBgClass: "bg-[oklch(0.90_0.06_290)] dark:bg-[oklch(0.26_0.06_290)]",
    patternColor: "oklch(0.45 0.18 280)",
    patternDir: "-45deg",
    patternAnimation: "patternDriftOut 18s linear infinite",
    btnBg: "oklch(0.45 0.18 280)",
    btnBorder: "oklch(0.32 0.16 280)",
    reverse: true,
  },
];

export default function ServicesSection() {
  return (
    <section className="relative py-8 overflow-hidden bg-[oklch(0.96_0.018_70)] dark:bg-[oklch(0.185_0.025_52)]">

      {/* Motif de fond */}
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage: "repeating-linear-gradient(45deg, oklch(0.42 0.07 55) 0px, oklch(0.42 0.07 55) 1px, transparent 1px, transparent 12px)",
          animation: "patternDrift 24s linear infinite",
        }}
      />

      <div className="relative max-w-5xl mx-auto px-6 flex flex-col gap-6">

        <div className="mb-2">
          <h2
            className="text-5xl md:text-6xl font-light text-foreground leading-tight"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Services
          </h2>
        </div>

        {SERVICES.map((service, i) => (
          <div key={service.id}>
            <div className="grid md:grid-cols-2 gap-12 items-center">

              {/* Visuel */}
              <div
                className={`relative min-h-52 rounded-3xl flex items-center justify-center text-6xl overflow-hidden ${service.visualBgClass} ${service.reverse ? "order-1 md:order-2" : ""}`}
              >
                <div
                  className="absolute inset-0 opacity-[0.18] pointer-events-none"
                  style={{
                    backgroundImage: `repeating-linear-gradient(${service.patternDir}, ${service.patternColor} 0px, ${service.patternColor} 1px, transparent 1px, transparent 10px)`,
                    animation: service.patternAnimation,
                  }}
                />
                <span className="relative drop-shadow-lg select-none text-6xl" aria-hidden="true">{service.emoji}</span>
              </div>

              {/* Contenu */}
              <div className={`flex flex-col gap-6 ${service.reverse ? "order-2 md:order-1" : ""}`}>
                <h3
                  className="text-4xl font-bold text-foreground leading-tight"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {service.title.split("\n").map((line, j) => (
                    <span key={j}>{line}{j < service.title.split("\n").length - 1 && <br />}</span>
                  ))}
                </h3>
                <p className="text-base text-muted-foreground leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
                  {service.description}
                </p>

                {/* Étapes / ce qui est inclus */}
                <ul className="flex flex-col gap-2.5" style={{ fontFamily: "var(--font-body)" }}>
                  {service.steps.map((step) => (
                    <li key={step} className="flex items-start gap-3 text-sm text-foreground/80 leading-relaxed">
                      <span
                        className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] text-white"
                        style={{ background: service.btnBg }}
                        aria-hidden="true"
                      >
                        ✓
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>

                {/* Repères pratiques */}
                <div className="flex flex-wrap gap-3">
                  {service.meta.map((m) => (
                    <div
                      key={m.label}
                      className="flex flex-col rounded-xl border border-border/50 bg-background/60 px-4 py-2"
                    >
                      <span
                        className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground"
                        style={{ fontFamily: "var(--font-body)" }}
                      >
                        {m.label}
                      </span>
                      <span
                        className="text-base font-medium text-foreground"
                        style={{ fontFamily: "var(--font-heading)" }}
                      >
                        {m.value}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Link href={service.href} className="w-full sm:w-fit">
                    <Button
                      size="lg"
                      className="w-full sm:w-auto px-8 h-12 text-xs tracking-[0.15em] uppercase border-b-4 active:border-b-0 active:translate-y-0.5 transition-all"
                      style={{ background: service.btnBg, color: "white", borderBottomColor: service.btnBorder }}
                    >
                      {service.cta}
                    </Button>
                  </Link>
                  <Link href={service.href2} className="w-full sm:w-fit">
                    <Button
                      variant="outline"
                      size="lg"
                      className="w-full sm:w-auto px-8 h-12 text-xs tracking-[0.15em] uppercase"
                    >
                      {service.cta2}
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            {i < SERVICES.length - 1 && <div className="h-px bg-border/40 my-2" />}
          </div>
        ))}

      </div>
    </section>
  );
}

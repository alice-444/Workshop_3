import type { Metadata } from "next";
import type { Route } from "next";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@e-commerce/ui/components/button";

export const metadata: Metadata = {
  title: "À propos",
  description:
    "Rencontrez Claire, artiste plasticienne et conteuse, créatrice d'Animal-Totem : créations en bois sur-mesure et ateliers créatifs pour les jeunes publics.",
};

const SUR_MESURE_INTRO = [
  "Chaque création que je réalise est avant tout une pièce unique, née d'une idée, d'un dessin et d'un travail artisanal.",
  "Je conçois mes objets décoratifs en relief grâce à la superposition de différentes couches de bois. Cette technique donne naissance à des compositions tout en douceur, aux volumes délicats, qui apportent poésie et personnalité à une chambre d'enfant ou à tout autre intérieur.",
  "Du premier croquis jusqu'aux dernières finitions, chaque étape est réalisée à la main dans mon atelier : je dessine, découpe le bois, ponce chaque élément avec soin, assemble les différentes couches puis applique la peinture et les finitions. Ce travail minutieux demande du temps, mais c'est ce qui confère à chaque pièce son caractère unique et artisanal.",
];

const SUR_MESURE_SUITE = [
  "Vous retrouverez sur ce site plusieurs collections, notamment des têtes d'animaux en bois et d'autres objets décoratifs. Mais parce que chaque histoire est différente, je vous propose également de réaliser des créations sur mesure.",
  "Vous rêvez d'un animal qui ne figure pas dans la collection ? Vous souhaitez un mobile bébé sur un thème particulier ? Je peux imaginer et créer une pièce spécialement pour vous, en échangeant avec vous afin de donner vie à votre projet.",
  "Choisir une de mes créations, c'est faire entrer chez vous un objet fabriqué avec passion, patience et savoir-faire, pensé pour durer et raconter une histoire.",
];

const ATELIERS_TEXTE = [
  "Depuis toujours, la nature, les animaux et l'imaginaire nourrissent mon travail de création. À travers mes contes, mes décors et mon théâtre d'ombres, je cherche à ouvrir des portes vers des univers poétiques où l'émerveillement, la curiosité et la participation des enfants occupent une place essentielle.",
  "Je crée des décors en bas-relief en bois peint pour mes propres spectacles de conte ainsi que pour des projets destinés aux écoles et aux structures culturelles. Chaque décor est conçu comme une invitation au voyage, mêlant travail artisanal et narration.",
  "Autrice de mes histoires, j'imagine des contes participatifs qui encouragent les enfants à devenir acteurs du récit. Ces spectacles sont souvent accompagnés d'ateliers d'arts plastiques permettant de prolonger l'expérience créative, d'explorer les thèmes abordés et de développer l'expression personnelle de chacun.",
];

const ATELIERS_IMAGES = [
  { src: "/about/jellyfish.jpg", alt: "Spectacle devant des enfants" },
  { src: "/about/wolf.jpg", alt: "Décor en bas-relief éclairé" },
  { src: "/about/whale.jpg", alt: "Décor de baleine en bois peint" },
];

function Framed({
  src,
  alt,
  aspect = "aspect-4/3",
  sizes,
  frameClass = "bg-[oklch(0.93_0.035_90)] dark:bg-[oklch(0.3_0.03_80)] ring-1 ring-border/60",
}: {
  src: string;
  alt: string;
  aspect?: string;
  sizes: string;
  frameClass?: string;
}) {
  return (
    <div className={`${frameClass} p-2 rounded-2xl`}>
      <div className={`relative ${aspect} w-full overflow-hidden rounded-xl bg-muted`}>
        <Image src={src} alt={alt} fill className="object-cover" sizes={sizes} />
      </div>
    </div>
  );
}

export default function AboutPage() {
  return (
    <main className="overflow-x-hidden">
      {/* Présentation */}
      <section className="max-w-6xl mx-auto px-6 pt-12 pb-20">
        <h1
          className="text-5xl md:text-6xl font-normal text-foreground text-center leading-tight mb-14"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          À propos
        </h1>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Portrait */}
          <Framed
            src="/about/claire.png"
            alt="Claire dans son atelier"
            sizes="(max-width: 768px) 100vw, 50vw"
          />

          {/* Identité */}
          <div className="flex flex-col gap-6">
            <h2
              className="text-5xl md:text-6xl font-semibold text-foreground"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Claire
            </h2>
            <p
              className="text-3xl md:text-4xl text-foreground leading-snug pl-8 whitespace-pre-line"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {"Artiste plasticienne\n/\nConteuse"}
            </p>
            <div className="h-1 bg-accent rounded-full" />
            <p
              className="text-sm text-foreground/85 leading-relaxed max-w-md"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Installée en tant qu&apos;auto-entrepreneuse depuis trois ans, je développe
              des projets où se rencontrent les arts plastiques, le conte et la
              transmission, avec le désir de créer des expériences sensibles, créatives
              et accessibles aux jeunes publics.
            </p>
          </div>
        </div>
      </section>

      {/* Créations sur-mesure */}
      <section className="bg-[oklch(0.96_0.018_70)] dark:bg-[oklch(0.185_0.025_52)] py-16">
        <div className="max-w-6xl mx-auto px-6 flex flex-col gap-16">
          <h2
            className="text-4xl md:text-5xl font-normal text-foreground"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Créations sur-mesure
          </h2>

          <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div
              className="flex flex-col gap-5 text-sm text-foreground/85 leading-relaxed"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {SUR_MESURE_INTRO.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <Framed
              src="/about/creation1.png"
              alt="Claire derrière une tête de héron en bois peint"
              sizes="(max-width: 768px) 100vw, 50vw"
              frameClass="bg-[oklch(0.72_0.045_40)] dark:bg-[oklch(0.38_0.04_40)]"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="order-2 md:order-1">
              <Framed
                src="/about/creation2.png"
                alt="Application de peinture au pinceau sur une pièce en bois"
                sizes="(max-width: 768px) 100vw, 50vw"
                frameClass="bg-[oklch(0.72_0.025_250)] dark:bg-[oklch(0.38_0.03_250)]"
              />
            </div>
            <div
              className="order-1 md:order-2 flex flex-col gap-5 text-sm text-foreground/85 leading-relaxed"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {SUR_MESURE_SUITE.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>

          <div className="flex justify-center">
            <Link href={"/shop" as Route}>
              <Button
                size="lg"
                className="px-8 h-13 text-lg font-medium"
                style={{ fontFamily: "var(--font-body)" }}
              >
                Découvrir la collection
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Ateliers créatifs */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6 flex flex-col gap-12">
          <h2
            className="text-4xl md:text-5xl font-normal text-foreground"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Ateliers créatifs
          </h2>

          <div
            className="flex flex-col gap-4 text-sm text-foreground/85 leading-relaxed"
            style={{ fontFamily: "var(--font-body)" }}
          >
            {ATELIERS_TEXTE.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>

          <div className="grid sm:grid-cols-3 gap-8 max-w-4xl mx-auto w-full">
            {ATELIERS_IMAGES.map((img) => (
              <Framed
                key={img.src}
                src={img.src}
                alt={img.alt}
                aspect="aspect-square"
                sizes="(max-width: 640px) 100vw, 33vw"
              />
            ))}
          </div>

          <div className="flex justify-center">
            <Link href={"/contact" as Route}>
              <Button
                size="lg"
                className="px-8 h-13 text-lg font-medium"
                style={{ fontFamily: "var(--font-body)" }}
              >
                Contactez-nous
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

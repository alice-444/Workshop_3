import Link from "next/link";
import Image from "next/image";
import type { ComponentProps } from "react";
import { FaInstagram, FaSquareFacebook } from "react-icons/fa6";

type FooterLink = { href: ComponentProps<typeof Link>["href"]; label: string };

const NAV_LINKS: FooterLink[] = [
  { href: "/", label: "Accueil" },
  { href: "/shop", label: "Boutique" },
  { href: "/about", label: "À propos" },
  { href: "/contact", label: "Contact" },
];

const INFO_LINKS: FooterLink[] = [
  { href: { pathname: "/contact", hash: "faq" }, label: "FAQ" },
  { href: { pathname: "/legal", query: { tab: "cgv" } }, label: "Livraison & Retours" },
  { href: { pathname: "/legal", query: { tab: "mentions" } }, label: "Mentions légales" },
  { href: { pathname: "/legal", query: { tab: "cgv" } }, label: "CGV" },
  {
    href: { pathname: "/legal", query: { tab: "confidentialite" } },
    label: "Politique de confidentialité",
  },
];

const INSTAGRAM_URL = "#";
const FACEBOOK_URL = "#";

function ColumnTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="text-xs uppercase tracking-[0.15em] text-accent-foreground/70 font-medium mb-4"
      style={{ fontFamily: "var(--font-body)" }}
    >
      {children}
    </h2>
  );
}

function LinkColumn({ title, links }: { title: string; links: FooterLink[] }) {
  return (
    <nav aria-label={title}>
      <ColumnTitle>{title}</ColumnTitle>
      <ul className="flex flex-col gap-2 list-none">
        {links.map(({ href, label }) => (
          <li key={label}>
            <Link
              href={href}
              className="text-sm text-accent-foreground/85 hover:text-accent-foreground transition-colors no-underline"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default function Footer() {
  return (
    <footer className="pt-4">
      <div className="bg-accent text-accent-foreground rounded-t-3xl">
        <div className="max-w-5xl mx-auto px-6 py-8">
          <div className="flex flex-col gap-10 lg:flex-row lg:justify-between lg:gap-16">

            {/* Marque */}
            <div className="flex max-w-md flex-col items-start gap-5">
              <Link href="/" aria-label="Animal-Totem — Retour à l'accueil" className="no-underline">
                <Image
                  src="/logo/logo_navbar.png"
                  alt="Animal-Totem"
                  width={230}
                  height={54}
                  className="h-14 w-auto rounded-lg select-none shadow-sm"
                />
              </Link>
              <p
                className="text-sm text-accent-foreground/90 leading-relaxed"
                style={{ fontFamily: "var(--font-body)" }}
              >
                L&apos;authenticité du bois, des créations pensées pour durer.
              </p>
            </div>

            {/* Colonnes de liens */}
            <div className="flex flex-wrap gap-12 sm:gap-20">
              <LinkColumn title="Navigation" links={NAV_LINKS} />
              <LinkColumn title="Information" links={INFO_LINKS} />

              {/* Réseaux sociaux */}
              <div>
                <ColumnTitle>Suivez-nous</ColumnTitle>
                <div className="flex items-center gap-3">
                  <Link
                    href={INSTAGRAM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="text-accent-foreground/85 hover:text-accent-foreground transition-colors"
                  >
                    <FaInstagram size={22} />
                  </Link>
                  <Link
                    href={FACEBOOK_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    className="text-accent-foreground/85 hover:text-accent-foreground transition-colors"
                  >
                    <FaSquareFacebook size={22} />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Bas de page */}
          <div className="mt-8 border-t border-accent-foreground/20 pt-4">
            <p
              className="text-center text-xs text-accent-foreground/70"
              style={{ fontFamily: "var(--font-body)" }}
            >
              © {new Date().getFullYear()} Animal-Totem
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

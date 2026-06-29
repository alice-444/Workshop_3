import Link from "next/link";
import Image from "next/image";
import type { ComponentProps } from "react";
import { FaInstagram, FaFacebook } from "react-icons/fa";

type FooterLink = { href: ComponentProps<typeof Link>["href"]; label: string };

const NAV_LINKS: FooterLink[] = [
  { href: "/", label: "Accueil" },
  { href: "/shop", label: "Boutique" },
  { href: "/about", label: "À propos" },
  { href: "/contact", label: "Contact" },
];

const INFO_LINKS: FooterLink[] = [
  { href: "/faq", label: "FAQ" },
  { href: "/faq", label: "Livraison & Retours" },
  { href: { pathname: "/legal", query: { tab: "mentions" } }, label: "Mentions légales" },
  { href: { pathname: "/legal", query: { tab: "cgv" } }, label: "CGV" },
  {
    href: { pathname: "/legal", query: { tab: "confidentialite" } },
    label: "Politique de confidentialité",
  },
];

const INSTAGRAM_URL = "#";
const FACEBOOK_URL = "#";

function LinkColumn({ title, links }: { title: string; links: FooterLink[] }) {
  return (
    <nav aria-label={title}>
      <h2
        className="text-xs uppercase tracking-[0.2em] text-muted-foreground/70 font-medium mb-4"
        style={{ fontFamily: "var(--font-body)" }}
      >
        {title}
      </h2>
      <ul className="flex flex-col gap-2.5 list-none">
        {links.map(({ href, label }) => (
          <li key={label}>
            <Link
              href={href}
              className="text-sm text-foreground/80 hover:text-primary transition-colors no-underline"
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
    <footer className="border-t border-border/50 bg-muted/20">
      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="flex flex-col gap-10 md:flex-row md:justify-between md:gap-16">

          {/* Marque */}
          <div className="flex max-w-sm flex-col items-start gap-4">
            <Link href="/" aria-label="Animal-Totem — Retour à l'accueil" className="no-underline">
              <Image
                src="/logo/logo_footer.png"
                alt="Animal-Totem"
                width={84}
                height={60}
                className="h-16 w-auto select-none"
              />
            </Link>
            <p
              className="max-w-xs text-sm text-muted-foreground/80 font-light leading-relaxed"
              style={{ fontFamily: "var(--font-body)" }}
            >
              L&apos;authenticité du bois, des créations pensées pour durer.
            </p>
            <div className="flex items-center gap-1">
              <Link
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="p-2 rounded-full text-muted-foreground/60 hover:text-foreground hover:bg-muted/60 transition-all duration-200"
              >
                <FaInstagram size={22} />
              </Link>
              <Link
                href={FACEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="p-2 rounded-full text-muted-foreground/60 hover:text-foreground hover:bg-muted/60 transition-all duration-200"
              >
                <FaFacebook size={22} />
              </Link>
            </div>
          </div>

          {/* Colonnes de liens */}
          <div className="flex gap-12 sm:gap-20">
            <LinkColumn title="Navigation" links={NAV_LINKS} />
            <LinkColumn title="Information" links={INFO_LINKS} />
          </div>
        </div>

        {/* Bas de page */}
        <div className="mt-10 border-t border-border/50 pt-6">
          <p
            className="text-center text-xs text-muted-foreground/70 font-light"
            style={{ fontFamily: "var(--font-body)" }}
          >
            © {new Date().getFullYear()} Animal-Totem — Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}

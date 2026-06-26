import Link from "next/link";
import type { Route } from "next";
import { FaInstagram, FaFacebook } from "react-icons/fa";

const LINKS: { href: Route; label: string }[] = [
  { href: "/shop" as Route, label: "Boutique" },
  { href: "/about" as Route, label: "À propos" },
  { href: "/contact" as Route, label: "Contact" },
  { href: "/faq" as Route, label: "FAQ" },
  { href: "/legal" as Route, label: "Mentions légales" },
];

const INSTAGRAM_URL = "#";
const FACEBOOK_URL = "#";

export default function Footer() {
  return (
    <footer className="border-t border-border/50 bg-muted/20">
      <div className="max-w-5xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">

        <p
          className="text-sm text-muted-foreground/70 font-light shrink-0"
          style={{ fontFamily: "var(--font-body)" }}
        >
          © {new Date().getFullYear()} Animal-Totem
        </p>

        <nav className="flex flex-wrap justify-center gap-x-5 gap-y-1" aria-label="Navigation secondaire">
          {LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-sm text-muted-foreground/70 hover:text-foreground transition-colors font-light no-underline tracking-wide"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1 shrink-0">
          <Link
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="p-2 rounded-full text-muted-foreground/60 hover:text-foreground hover:bg-muted/60 transition-all duration-200"
          >
            <FaInstagram size={24} />
          </Link>
          <Link
            href={FACEBOOK_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="p-2 rounded-full text-muted-foreground/60 hover:text-foreground hover:bg-muted/60 transition-all duration-200"
          >
            <FaFacebook size={24} />
          </Link>
        </div>

      </div>
    </footer>
  );
}

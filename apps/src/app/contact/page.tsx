import type { Metadata } from "next";
import type { Route } from "next";
import Link from "next/link";
import { Mail, MapPin, Clock, Phone, type LucideIcon } from "lucide-react";
import { FaInstagram } from "react-icons/fa";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Une question, un projet sur-mesure ou l'envie de réserver un atelier ? Écrivez à l'atelier Animal-Totem, nous vous répondons sous 48 h.",
};

type ContactDetail = {
  icon: LucideIcon;
  label: string;
  value: string;
  href?: Route;
};

const DETAILS: ContactDetail[] = [
  {
    icon: Mail,
    label: "E-mail",
    value: "bonjour@animal-totem.fr",
    href: "mailto:bonjour@animal-totem.fr" as Route,
  },
  {
    icon: Phone,
    label: "Téléphone",
    value: "+33 4 78 00 00 00",
    href: "tel:+33478000000" as Route,
  },
  {
    icon: MapPin,
    label: "L'atelier",
    value: "12 chemin des Ébénistes, 69000 Lyon",
  },
  {
    icon: Clock,
    label: "Horaires",
    value: "Du mardi au samedi · 10h – 18h",
  },
];

export default function ContactPage() {
  return (
    <main className="overflow-x-hidden">
      <section className="max-w-6xl mx-auto px-6 pt-12 pb-24">
        {/* En-tête */}
        <header className="max-w-2xl mb-14">
          <div className="flex items-center gap-2 mb-4">
            <div className="h-px w-8 bg-primary" />
            <p
              className="text-xs uppercase tracking-[0.3em] text-primary font-light"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Contact
            </p>
          </div>
          <h1
            className="text-5xl md:text-6xl font-light text-foreground leading-[1.05] mb-5"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Parlons de votre <em className="text-primary not-italic">projet</em>
          </h1>
          <p
            className="text-base text-muted-foreground leading-relaxed font-light"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Une création sur-mesure, un atelier à réserver ou simplement une question ?
            Écrivez-nous — chaque demande reçoit une réponse soignée sous 48 h.
          </p>
        </header>

        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-12 lg:gap-16">
          {/* Coordonnées */}
          <div className="flex flex-col gap-8">
            <ul className="flex flex-col gap-6 list-none">
              {DETAILS.map(({ icon: Icon, label, value, href }) => {
                const content = (
                  <>
                    <span className="w-10 h-10 shrink-0 rounded-full flex items-center justify-center bg-[oklch(0.91_0.025_72)] dark:bg-[oklch(0.26_0.025_62)] text-primary">
                      <Icon size={16} />
                    </span>
                    <span className="flex flex-col">
                      <span
                        className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-0.5"
                        style={{ fontFamily: "var(--font-body)" }}
                      >
                        {label}
                      </span>
                      <span
                        className="text-sm text-foreground"
                        style={{ fontFamily: "var(--font-body)" }}
                      >
                        {value}
                      </span>
                    </span>
                  </>
                );

                return (
                  <li key={label}>
                    {href ? (
                      <Link
                        href={href}
                        className="flex items-center gap-4 hover:opacity-80 transition-opacity no-underline w-fit"
                      >
                        {content}
                      </Link>
                    ) : (
                      <div className="flex items-center gap-4">{content}</div>
                    )}
                  </li>
                );
              })}
            </ul>

            {/* Réseaux + note */}
            <div className="flex flex-col gap-4 pt-2">
              <Link
                href={"#" as Route}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 rounded-full flex items-center justify-center text-muted-foreground/70 hover:text-foreground hover:bg-muted/60 transition-all duration-200"
              >
                <FaInstagram size={20} />
              </Link>
              <p
                className="text-[11px] text-muted-foreground/70 leading-relaxed max-w-xs font-light"
                style={{ fontFamily: "var(--font-body)" }}
              >
                L'atelier travaille sur commande : les délais de réalisation varient
                selon les pièces. N'hésitez pas à nous écrire en amont de votre projet.
              </p>
            </div>
          </div>

          {/* Formulaire */}
          <div className="rounded-2xl border border-border/50 bg-card/40 p-6 sm:p-8">
            <ContactForm />
          </div>
        </div>
      </section>
    </main>
  );
}

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Cookie } from "lucide-react";

import { Button } from "@e-commerce/ui/components/button";

const CONSENT_KEY = "cookie_consent";
type Consent = "accepted" | "rejected";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(CONSENT_KEY);
      if (stored !== "accepted" && stored !== "rejected") setVisible(true);
    } catch {
      // localStorage indisponible (mode privé strict) : on affiche par prudence.
      setVisible(true);
    }
  }, []);

  function choose(value: Consent) {
    try {
      window.localStorage.setItem(CONSENT_KEY, value);
    } catch {
      // Si le stockage échoue, on masque tout de même la bannière pour cette session.
    }
    setVisible(false);
    // Point d'extension : déclencher ici l'activation des mesures d'audience
    // (analytics) uniquement si value === "accepted".
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Consentement aux cookies"
      className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-2xl rounded-lg border border-border/60 bg-background/95 p-5 shadow-lg backdrop-blur-sm sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <Cookie
          size={22}
          className="shrink-0 text-primary"
          aria-hidden="true"
        />
        <p className="text-sm text-muted-foreground">
          Nous utilisons des cookies pour assurer le bon fonctionnement du site
          et, avec votre accord, mesurer son audience. Vous pouvez accepter ou
          refuser.{" "}
          <Link
            href="/legal"
            className="font-medium text-foreground underline underline-offset-2 hover:text-primary"
          >
            En savoir plus
          </Link>
          .
        </p>
        <div className="flex shrink-0 gap-2">
          <Button variant="outline" size="sm" onClick={() => choose("rejected")}>
            Refuser
          </Button>
          <Button size="sm" onClick={() => choose("accepted")}>
            Accepter
          </Button>
        </div>
      </div>
    </div>
  );
}

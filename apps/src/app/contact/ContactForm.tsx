"use client";

import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "@e-commerce/ui/components/button";
import { Input } from "@e-commerce/ui/components/input";
import { Label } from "@e-commerce/ui/components/label";
import { Checkbox } from "@e-commerce/ui/components/checkbox";

const SUBJECTS = [
  "Création sur-mesure",
  "Réserver un atelier",
  "Devis professionnel",
  "Suivi de commande",
  "Autre",
] as const;

const schema = z.object({
  name: z.string().trim().min(2, "Indiquez votre nom."),
  email: z.string().trim().email("Adresse e-mail invalide."),
  subject: z.string().min(1, "Choisissez un sujet."),
  message: z.string().trim().min(10, "Votre message doit faire au moins 10 caractères."),
  consent: z.boolean().refine((v) => v, "Veuillez accepter pour continuer."),
});

type FieldErrors = Partial<Record<keyof z.infer<typeof schema>, string>>;

const EMPTY = { name: "", email: "", subject: "", message: "", consent: false };

const fieldClass =
  "h-9 w-full rounded-none border border-input bg-transparent px-3 py-1 text-sm transition-colors outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-1 focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-1 aria-invalid:ring-destructive/20 dark:bg-input/30";

export default function ContactForm() {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);

  function setField<K extends keyof typeof EMPTY>(key: K, value: (typeof EMPTY)[K]) {
    setValues((v) => ({ ...v, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const result = schema.safeParse(values);
    if (!result.success) {
      const fieldErrors: FieldErrors = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0] as keyof FieldErrors;
        if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }

    setSubmitting(true);
    // Pas de backend pour l'instant — on simule l'envoi.
    await new Promise((r) => setTimeout(r, 700));
    setSubmitting(false);
    toast.success("Message envoyé — nous vous répondrons sous 48 h.");
    setValues(EMPTY);
    setErrors({});
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      {/* Nom */}
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="contact-name" className="text-[11px] uppercase tracking-[0.15em] text-muted-foreground">
          Nom
        </Label>
        <Input
          id="contact-name"
          value={values.name}
          onChange={(e) => setField("name", e.target.value)}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "contact-name-error" : undefined}
          placeholder="Votre nom"
          className="h-9 text-sm px-3"
        />
        {errors.name && (
          <p id="contact-name-error" className="text-[11px] text-destructive" role="alert">
            {errors.name}
          </p>
        )}
      </div>

      {/* E-mail */}
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="contact-email" className="text-[11px] uppercase tracking-[0.15em] text-muted-foreground">
          E-mail
        </Label>
        <Input
          id="contact-email"
          type="email"
          value={values.email}
          onChange={(e) => setField("email", e.target.value)}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "contact-email-error" : undefined}
          placeholder="vous@exemple.fr"
          className="h-9 text-sm px-3"
        />
        {errors.email && (
          <p id="contact-email-error" className="text-[11px] text-destructive" role="alert">
            {errors.email}
          </p>
        )}
      </div>

      {/* Sujet */}
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="contact-subject" className="text-[11px] uppercase tracking-[0.15em] text-muted-foreground">
          Sujet
        </Label>
        <select
          id="contact-subject"
          value={values.subject}
          onChange={(e) => setField("subject", e.target.value)}
          aria-invalid={!!errors.subject}
          aria-describedby={errors.subject ? "contact-subject-error" : undefined}
          className={`${fieldClass} cursor-pointer`}
          style={{ fontFamily: "var(--font-body)" }}
        >
          <option value="" disabled>
            Choisissez un sujet…
          </option>
          {SUBJECTS.map((s) => (
            <option key={s} value={s} className="bg-background text-foreground">
              {s}
            </option>
          ))}
        </select>
        {errors.subject && (
          <p id="contact-subject-error" className="text-[11px] text-destructive" role="alert">
            {errors.subject}
          </p>
        )}
      </div>

      {/* Message */}
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="contact-message" className="text-[11px] uppercase tracking-[0.15em] text-muted-foreground">
          Message
        </Label>
        <textarea
          id="contact-message"
          value={values.message}
          onChange={(e) => setField("message", e.target.value)}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "contact-message-error" : undefined}
          rows={5}
          placeholder="Décrivez votre projet ou votre question…"
          className={`${fieldClass} h-auto py-2.5 resize-y leading-relaxed`}
          style={{ fontFamily: "var(--font-body)" }}
        />
        {errors.message && (
          <p id="contact-message-error" className="text-[11px] text-destructive" role="alert">
            {errors.message}
          </p>
        )}
      </div>

      {/* Consentement */}
      <div className="flex flex-col gap-1.5">
        <div className="flex items-start gap-2.5">
          <Checkbox
            id="contact-consent"
            checked={values.consent}
            onCheckedChange={(checked) => setField("consent", checked === true)}
            aria-invalid={!!errors.consent}
            className="mt-0.5"
          />
          <Label
            htmlFor="contact-consent"
            className="text-[11px] leading-relaxed text-muted-foreground"
            style={{ fontFamily: "var(--font-body)" }}
          >
            J'accepte que mes informations soient utilisées pour répondre à ma demande.
          </Label>
        </div>
        {errors.consent && (
          <p className="text-[11px] text-destructive" role="alert">
            {errors.consent}
          </p>
        )}
      </div>

      <Button
        type="submit"
        size="lg"
        disabled={submitting}
        className="px-8 h-11 text-xs tracking-[0.15em] uppercase self-start"
      >
        {submitting ? "Envoi…" : "Envoyer le message"}
      </Button>
    </form>
  );
}

"use client";

import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "@e-commerce/ui/components/button";
import { Label } from "@e-commerce/ui/components/label";
import { Checkbox } from "@e-commerce/ui/components/checkbox";

const schema = z.object({
  name: z.string().trim().min(2, "Indiquez votre nom."),
  email: z.string().trim().email("Adresse e-mail invalide."),
  subject: z.string().trim().min(2, "Indiquez un sujet."),
  message: z.string().trim().min(10, "Votre message doit faire au moins 10 caractères."),
  consent: z.boolean().refine((v) => v, "Veuillez accepter pour continuer."),
});

type FieldErrors = Partial<Record<keyof z.infer<typeof schema>, string>>;

const EMPTY = { name: "", email: "", subject: "", message: "", consent: false };

const fieldClass =
  "w-full rounded-lg border border-foreground/30 bg-muted/60 px-3 py-2 text-sm text-foreground transition-colors outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-1 focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-1 aria-invalid:ring-destructive/20 dark:bg-input/30";

const labelClass = "text-sm text-foreground";

type TextField = {
  key: "name" | "email" | "subject";
  label: string;
  type: string;
};

const TEXT_FIELDS: TextField[] = [
  { key: "name", label: "Votre nom :", type: "text" },
  { key: "email", label: "Votre mail :", type: "email" },
  { key: "subject", label: "Sujet :", type: "text" },
];

const SUBJECT_SUGGESTIONS = [
  "Création sur-mesure",
  "Réserver un atelier",
  "Question sur une commande",
  "Demande de devis",
  "Autre",
];

export default function ContactForm() {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [subjectFocused, setSubjectFocused] = useState(false);

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
    <form
      onSubmit={handleSubmit}
      noValidate
      className="flex flex-col gap-6"
      style={{ fontFamily: "var(--font-body)" }}
    >
      {TEXT_FIELDS.map(({ key, label, type }) => {
        const isSubject = key === "subject";
        const suggestions = isSubject
          ? SUBJECT_SUGGESTIONS.filter((s) =>
            s.toLowerCase().includes(values.subject.trim().toLowerCase()),
          )
          : [];
        const showSuggestions =
          isSubject && subjectFocused && suggestions.length > 0;
        return (
          <div key={key} className="flex flex-col gap-2">
            <Label htmlFor={`contact-${key}`} className={labelClass}>
              {label}
            </Label>
            <div className="relative">
              <input
                id={`contact-${key}`}
                type={type}
                value={values[key]}
                onChange={(e) => setField(key, e.target.value)}
                onFocus={isSubject ? () => setSubjectFocused(true) : undefined}
                onBlur={isSubject ? () => setSubjectFocused(false) : undefined}
                autoComplete={isSubject ? "off" : undefined}
                role={isSubject ? "combobox" : undefined}
                aria-expanded={isSubject ? showSuggestions : undefined}
                aria-invalid={!!errors[key]}
                aria-describedby={errors[key] ? `contact-${key}-error` : undefined}
                className={fieldClass}
              />
              {showSuggestions && (
                <ul
                  className="absolute left-0 right-0 top-full mt-1 z-20 list-none overflow-hidden rounded-lg border border-border bg-card shadow-md"
                  role="listbox"
                >
                  {suggestions.map((s) => (
                    <li key={s}>
                      <button
                        type="button"
                        role="option"
                        aria-selected={values.subject === s}
                        // onMouseDown pour devancer le blur du champ.
                        onMouseDown={(e) => {
                          e.preventDefault();
                          setField("subject", s);
                          setSubjectFocused(false);
                        }}
                        className="w-full px-3 py-2 text-left text-sm text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                      >
                        {s}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            {errors[key] && (
              <p id={`contact-${key}-error`} className="text-[11px] text-destructive" role="alert">
                {errors[key]}
              </p>
            )}
          </div>
        );
      })}

      {/* Message */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="contact-message" className={labelClass}>
          Votre message :
        </Label>
        <textarea
          id="contact-message"
          value={values.message}
          onChange={(e) => setField("message", e.target.value)}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "contact-message-error" : undefined}
          rows={9}
          className={`${fieldClass} resize-y leading-relaxed`}
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
          >
            J&apos;accepte que mes informations soient utilisées pour répondre à ma demande.
          </Label>
        </div>
        {errors.consent && (
          <p className="text-[11px] text-destructive" role="alert">
            {errors.consent}
          </p>
        )}
      </div>

      <div className="flex justify-center pt-2">
        <Button
          type="submit"
          size="lg"
          disabled={submitting}
          className="px-8 h-13 text-lg font-medium"
        >
          {submitting ? "Envoi…" : "Envoyer le message"}
        </Button>
      </div>
    </form>
  );
}

import type { Metadata } from "next";
import LegalClient from "./LegalClient";

export const metadata: Metadata = {
    title: "Legal Information",
    description: "Retrouvez les informations légales de notre boutique en ligne : CGV, mentions légales, politique de retour, CGU, confidentialité et paiement.",
};

export default function LegalPage() {
    return <LegalClient />;
}
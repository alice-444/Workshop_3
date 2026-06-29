import type { Metadata } from "next";
import LegalClient from "./LegalClient";
import { TABS, type TabId } from "@/data/legal.data";

export const metadata: Metadata = {
    title: "Legal Information",
    description: "Retrouvez les informations légales de notre boutique en ligne : CGV, mentions légales, politique de retour, CGU, confidentialité et paiement.",
};

export default async function LegalPage({
    searchParams,
}: {
    searchParams: Promise<{ tab?: string }>;
}) {
    const { tab } = await searchParams;
    const initialTab: TabId = TABS.some((t) => t.id === tab)
        ? (tab as TabId)
        : "cgv";
    return <LegalClient initialTab={initialTab} />;
}
import type { Metadata } from "next";
import LegalClient from "./LegalClient";
import { TABS, type TabId } from "@/data/legal.data";

export const metadata: Metadata = {
    title: "Informations légales",
    description: "Retrouvez les informations légales d'Animal-Totem : mentions légales, conditions générales de vente (CGV) et politique de confidentialité.",
};

export default async function LegalPage({
    searchParams,
}: {
    searchParams: Promise<{ tab?: string }>;
}) {
    const { tab } = await searchParams;
    const initialTab: TabId = TABS.some((t) => t.id === tab)
        ? (tab as TabId)
        : "mentions";
    return <LegalClient initialTab={initialTab} />;
}
import type { Metadata } from "next";
import LegalClient from "./LegalClient";
import { TABS, type TabId } from "@/data/legal.data";
import { SITE_URL } from "@/lib/site";

const TITLE = "Informations légales";
const DESCRIPTION =
    "Retrouvez les informations légales d'Animal-Totem : mentions légales, conditions générales de vente (CGV) et politique de confidentialité.";

export const metadata: Metadata = {
    title: TITLE,
    description: DESCRIPTION,
    alternates: { canonical: "/legal" },
    openGraph: {
        type: "website",
        url: `${SITE_URL}/legal`,
        title: TITLE,
        description: DESCRIPTION,
    },
    twitter: {
        card: "summary_large_image",
        title: TITLE,
        description: DESCRIPTION,
    },
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
"use client";

import { useState } from "react";
import { type TabId } from "@/data/legal.data";
import LegalTabs from "@/components/legal/LegalTabs";
import LegalContent from "@/components/legal/LegalContent";

export default function LegalClient({
    initialTab = "mentions",
}: {
    initialTab?: TabId;
}) {
    const [active, setActive] = useState<TabId>(initialTab);

    return (
        <div className="container mx-auto max-w-4xl px-4 py-10">
            <h1 className="sr-only">Informations légales</h1>
            <LegalTabs active={active} onChange={setActive} />
            <LegalContent active={active} />
        </div>
    );
}

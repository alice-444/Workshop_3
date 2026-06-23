"use client";

import { useState } from "react";
import { type FaqTabId } from "@/data/faq.data";
import FaqTabs from "@/components/faq/FaqTabs";
import FaqAccordion from "@/components/faq/FaqAccordion";

export default function FaqClient() {
    const [active, setActive] = useState<FaqTabId>("commandes");

    return (
        <div className="container mx-auto max-w-4xl px-4 py-10">
            <h1 className="text-3xl font-bold mb-8">Questions fréquentes</h1>
            <FaqTabs active={active} onChange={setActive} />
            <FaqAccordion active={active} />
        </div>
    );
}

"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { FAQ_CONTENT, type FaqTabId } from "@/data/faq.data";

type Props = {
    active: FaqTabId;
};

export default function FaqAccordion({ active }: Props) {
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const items = FAQ_CONTENT[active];

    const toggle = (index: number) =>
        setOpenIndex(openIndex === index ? null : index);

    return (
        <div className="py-8 space-y-2" role="tabpanel">
            {items.map((item, index) => (
                <div key={index} className="border border-border rounded-lg overflow-hidden">
                    <button
                        onClick={() => toggle(index)}
                        className="w-full flex items-center justify-between px-5 py-4 text-left text-sm font-medium hover:bg-muted/50 transition-colors"
                        aria-expanded={openIndex === index}
                    >
                        <span>{item.question}</span>
                        <ChevronDown
                            className={[
                                "size-4 shrink-0 text-muted-foreground transition-transform duration-200",
                                openIndex === index ? "rotate-180" : "",
                            ].join(" ")}
                        />
                    </button>
                    {openIndex === index && (
                        <div className="px-5 pb-4 text-sm text-muted-foreground leading-relaxed">
                            {item.answer}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

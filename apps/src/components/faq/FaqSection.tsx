"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronDown, ChevronUp } from "lucide-react";
import { FAQ_ITEMS } from "@/data/faq.data";

export default function FaqSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggle = (index: number) =>
        setOpenIndex(openIndex === index ? null : index);

    return (
        <section id="faq" className="max-w-5xl mx-auto px-6 pt-12 pb-24 scroll-mt-8">
            <h2
                className="text-5xl md:text-6xl font-normal text-foreground text-center leading-tight mb-16"
                style={{ fontFamily: "var(--font-heading)" }}
            >
                FAQ
            </h2>

            <div className="flex flex-col gap-16">
                {FAQ_ITEMS.map((item, index) => {
                    const open = openIndex === index;
                    const reverse = index % 2 === 1;
                    const Chevron = open ? ChevronUp : ChevronDown;
                    return (
                        <div
                            key={item.question}
                            className="grid md:grid-cols-2 gap-10 md:gap-16 items-start"
                        >
                            {/* Question / réponse */}
                            <div className={reverse ? "order-1 md:order-2" : ""}>
                                <button
                                    onClick={() => toggle(index)}
                                    aria-expanded={open}
                                    className="flex items-center gap-2 text-left text-lg md:text-xl text-foreground hover:opacity-80 transition-opacity outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
                                    style={{ fontFamily: "var(--font-heading)" }}
                                >
                                    <span>{item.question}</span>
                                    <Chevron
                                        className="size-5 shrink-0 text-foreground/70"
                                        aria-hidden="true"
                                    />
                                </button>
                                {open && (
                                    <p
                                        className="mt-4 text-sm text-foreground/85 leading-relaxed"
                                        style={{ fontFamily: "var(--font-body)" }}
                                    >
                                        {item.answer}
                                    </p>
                                )}
                            </div>

                            {/* Visuel */}
                            <div
                                className={`${item.frameClass} p-2 rounded-2xl max-w-sm w-full ${reverse ? "order-2 md:order-1" : "md:justify-self-end"}`}
                            >
                                <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-muted">
                                    <Image
                                        src={item.image}
                                        alt={item.imageAlt}
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 768px) 100vw, 384px"
                                    />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}

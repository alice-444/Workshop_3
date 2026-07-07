"use client";

import { TABS, type TabId } from "@/data/legal.data";

type Props = {
    active: TabId;
    onChange: (id: TabId) => void;
};

export default function LegalTabs({ active, onChange }: Props) {
    return (
        <div className="overflow-x-auto">
            <nav
                className="flex flex-wrap gap-x-10 gap-y-2"
                role="tablist"
                aria-label="Informations légales"
            >
                {TABS.map((tab) => (
                    <button
                        key={tab.id}
                        role="tab"
                        aria-selected={active === tab.id}
                        onClick={() => onChange(tab.id)}
                        className={[
                            "text-base md:text-lg whitespace-nowrap transition-colors",
                            active === tab.id
                                ? "text-foreground font-semibold"
                                : "text-muted-foreground hover:text-foreground",
                        ].join(" ")}
                        style={{ fontFamily: "var(--font-heading)" }}
                    >
                        {tab.label}
                    </button>
                ))}
            </nav>
        </div>
    );
}

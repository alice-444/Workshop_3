"use client";

import { TABS, type TabId } from "@/data/legal.data";

type Props = {
    active: TabId;
    onChange: (id: TabId) => void;
};

export default function LegalTabs({ active, onChange }: Props) {
    return (
        <div className="overflow-x-auto">
            <nav className="flex flex-wrap gap-2" role="tablist">
                {TABS.map((tab) => (
                    <button
                        key={tab.id}
                        role="tab"
                        aria-selected={active === tab.id}
                        onClick={() => onChange(tab.id)}
                        className={[
                            "px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors",
                            active === tab.id
                                ? "bg-primary text-primary-foreground"
                                : "bg-secondary text-secondary-foreground hover:bg-accent hover:text-accent-foreground",
                        ].join(" ")}
                    >
                        {tab.label}
                    </button>
                ))}
            </nav>
        </div>
    );
}

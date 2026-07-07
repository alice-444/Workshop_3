import { CONTENT, type TabId } from "@/data/legal.data";

type Props = {
    active: TabId;
};

export default function LegalContent({ active }: Props) {
    const { title, sections } = CONTENT[active];

    return (
        <div className="py-10" role="tabpanel" aria-label={title}>
            <div className="mx-auto max-w-2xl space-y-8">
                {sections.map((section) => (
                    <section key={section.heading}>
                        <h2 className="text-sm font-semibold mb-3">{section.heading}</h2>
                        {section.paragraphs?.map((paragraph) => (
                            <p
                                key={paragraph}
                                className="text-sm text-muted-foreground leading-relaxed mb-3 last:mb-0"
                            >
                                {paragraph}
                            </p>
                        ))}
                        {section.bullets && (
                            <ul className="list-disc pl-8 space-y-1 text-sm text-muted-foreground leading-relaxed">
                                {section.bullets.map((item) => (
                                    <li key={item}>{item}</li>
                                ))}
                            </ul>
                        )}
                    </section>
                ))}
            </div>
        </div>
    );
}

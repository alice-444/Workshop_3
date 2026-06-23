import { CONTENT, type TabId } from "@/data/legal.data";

type Props = {
    active: TabId;
};

export default function LegalContent({ active }: Props) {
    const { title, body } = CONTENT[active];

    return (
        <div className="py-8" role="tabpanel">
            <h2 className="text-xl font-semibold mb-4">{title}</h2>
            <p className="text-muted-foreground leading-relaxed">{body}</p>
        </div>
    );
}

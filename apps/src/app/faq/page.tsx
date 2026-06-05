import type { Metadata } from "next";
import FaqClient from "./FaqClient";

export const metadata: Metadata = {
    title: "FAQ",
    description: "Retrouvez les réponses aux questions fréquentes sur nos commandes, livraisons, retours, paiements et votre compte.",
};

export default function FaqPage() {
    return <FaqClient />;
}

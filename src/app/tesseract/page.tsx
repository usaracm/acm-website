import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "TESSERACT — Flagship Hackathon",
  description:
    "TESSERACT is the flagship Web3 hackathon by GGSIPU EDC ACM Student Chapter in collaboration with Hela Labs. Deploy on-chain, compete for ₹50,000+ in prizes, and build the future of decentralized technology.",
  keywords: [
    "TESSERACT",
    "Hackathon",
    "Web3",
    "Hela Labs",
    "Blockchain",
    "ACM",
    "GGSIPU",
    "EDC",
    "Coding Competition",
  ],
  openGraph: {
    title: "TESSERACT — GGSIPU EDC ACM Flagship Hackathon",
    description:
      "A Web3 hackathon where builders deploy real projects on the Hela blockchain. ₹50,000+ in prizes.",
    type: "website",
  },
};

export default function TesseractRoute() {
  notFound();
}

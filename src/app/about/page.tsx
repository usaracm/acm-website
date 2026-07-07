import { Metadata } from "next";
import {
  AboutHero,
  AboutMarquee,
  WhatIsACM,
  AboutGGSIPU,
  AboutChapter,
  FAQSection,
  CTASection,
} from "@/components/about";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about GGSIPU EDC ACM Student Chapter — our mission, history, and the passionate team building Delhi's leading computing community at East Delhi Campus.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#030303] text-[var(--foreground)]">
      <AboutHero />
      <AboutMarquee />
      <WhatIsACM />
      <AboutGGSIPU />
      <AboutChapter />
      <FAQSection />
      <CTASection />
    </main>
  );
}

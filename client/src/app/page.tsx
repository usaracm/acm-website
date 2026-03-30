import dynamic from 'next/dynamic';
import { Hero } from "@/components/home";

// Dynamically load components below the fold
const AboutSection = dynamic(() => import("@/components/home/AboutSection"), { ssr: true });
const AwardSection = dynamic(() => import("@/components/home/AwardSection"), { ssr: true });
const MarqueeSection = dynamic(() => import("@/components/home/MarqueeSection"), { ssr: true });
const EventsSection = dynamic(() => import("@/components/home/EventsSection"), { ssr: true });
const GallerySection = dynamic(() => import("@/components/home/GallerySection"), { ssr: true });
const StoryTransition = dynamic(() => import("@/components/home/StoryTransition"), { ssr: true });
const Teams = dynamic(() => import("@/components/home/Teams"), { ssr: true });

export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--background)]">
      <Hero />
      <AwardSection />
      <AboutSection />
      <StoryTransition
        topLabel="Our Journey"
        mainText="Where curiosity becomes innovation"
        accentWord="innovation"
        subText="We don't just learn technology — we live it, breathe it, and build with it."
      />
      <GallerySection />
      <MarqueeSection />
      <EventsSection />
      <StoryTransition
        topLabel="Community"
        mainText="Built by students, for students"
        accentWord="students"
        subText="Join a community of passionate creators shaping the future of technology."
      />
      <Teams />
    </main>
  );
}

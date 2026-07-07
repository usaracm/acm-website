import { Metadata } from "next";
import {
  EventsHero,
  EventsMarquee,
  EventsShowcase,
  EventsClosing,
} from "@/components/events";

export const metadata: Metadata = {
  title: "Events",
  description: "Explore workshops, hackathons, seminars, and tech events hosted by GGSIPU EDC ACM Student Chapter. From coding bootcamps to industry talks.",
};

export default function EventsPage() {
  return (
    <main className="min-h-screen bg-[#030303] text-[var(--foreground)] selection:bg-acm-blue/30">
      <EventsHero />
      <EventsMarquee />
      <EventsShowcase />
      <EventsClosing />
    </main>
  );
}

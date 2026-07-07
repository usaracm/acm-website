import { notFound } from "next/navigation";
import { eventsData, getEventBySlug } from "@/data/eventsData";
import EventPageContent from "@/components/events/EventPageContent";

interface EventPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return eventsData.map((event) => ({
    slug: event.slug,
  }));
}

export async function generateMetadata({ params }: EventPageProps) {
  const resolvedParams = await params;
  const event = getEventBySlug(resolvedParams.slug);
  
  if (!event) {
    return {
      title: "Event Not Found",
    };
  }

  return {
    title: `${event.title} | ACM Events`,
    description: event.description,
  };
}

export default async function EventPage({ params }: EventPageProps) {
  const resolvedParams = await params;
  const event = getEventBySlug(resolvedParams.slug);

  if (!event) {
    notFound();
  }

  return <EventPageContent event={event} />;
}

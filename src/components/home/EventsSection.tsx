"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { TextReveal } from "../TextReveal";
import { eventsData, EventData } from "@/data/eventsData";

interface UpcomingEvent {
  title: string;
  description: string;
  tags: string[];
  registrationLink: string;
  websiteLink?: string;
  previewUrl?: string;
  image?: string;
  slug?: string;
  stats: { label: string; value: string }[];
}

// Upcoming Events
const upcomingEvents: UpcomingEvent[] = [
  {
    title: "25 DAYS DSA CHALLENGE",
    description: "A focused 25-day DSA sprint is coming soon.",
    tags: ["Challenge", "Algorithms", "Competitive Programming"],
    registrationLink: "#",
    websiteLink: "https://squid-game-cyan.vercel.app/",
    previewUrl: "https://squid-game-cyan.vercel.app/",
    slug: "75-days-dsa-challenge",
    stats: [
      { label: "Days", value: "25" },
      { label: "Problems", value: "50+" },
      { label: "Contests", value: "4" },
      { label: "Mentors", value: "5" }
    ]
  }
];

// Get past events from eventsData (first 6, excluding upcoming)
const pastEvents = eventsData
  .filter(e => !e.isUpcoming)
  .slice(0, 6);

/**
 * Upcoming Event Card - Simplified premium design with poster image
 */
function UpcomingEventCard({ event }: { event: UpcomingEvent }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });
  
  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
      className="relative overflow-hidden rounded-2xl border border-white/10 bg-linear-to-br from-[var(--surface)] to-[#050505]"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Left: Event Preview */}
        <div className="relative aspect-square lg:aspect-auto lg:min-h-[500px] bg-linear-to-br from-[#0d1117] to-[#080808] overflow-hidden">
          {event.previewUrl ? (
            <>
              <iframe
                src={event.previewUrl}
                title={`${event.title} preview`}
                className="absolute inset-0 w-full h-full"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/20" />
            </>
          ) : event.image ? (
            <>
              <Image
                src={event.image}
                alt={event.title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/30 lg:block hidden" />
            </>
          ) : (
            <>
              {/* Fallback: Large Number */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-[140px] md:text-[200px] font-black text-white/5 select-none" style={{ fontFamily: "var(--font-heading)" }}>
                  25
                </span>
                <p className="absolute bottom-1/3 text-white/40 text-sm tracking-[0.3em] uppercase" style={{ fontFamily: "var(--font-body)" }}>
                  Days of Code
                </p>
              </div>
            </>
          )}
          
          {/* Badge */}
          <div className="absolute top-6 left-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-acm-blue/90 z-10">
            <span className="relative flex h-2 w-2">
              <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
            </span>
            <span className="text-xs font-semibold text-[var(--foreground)] uppercase tracking-wider" style={{ fontFamily: "var(--font-body)" }}>
              Upcoming
            </span>
          </div>
        </div>
        
        {/* Right: Content */}
        <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center">
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {event.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-white/60 border border-white/15 rounded-full"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {tag}
              </span>
            ))}
          </div>
          
          {/* Title */}
          <h3
            className="text-4xl md:text-5xl font-black text-[var(--foreground)] mb-4 tracking-normal"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {event.title}
          </h3>
          
          {/* Description */}
          <p
            className="text-white/50 text-base leading-relaxed mb-8"
            style={{ fontFamily: "var(--font-body)" }}
          >
            {event.description}
          </p>
          
          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8 py-6 border-y border-white/10">
            {event.stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <span className="block text-xl sm:text-2xl font-black text-[var(--foreground)]" style={{ fontFamily: "var(--font-heading)" }}>
                  {stat.value}
                </span>
                <span className="text-[9px] uppercase tracking-wider text-white/40" style={{ fontFamily: "var(--font-body)" }}>
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
          
          {/* CTA - Coming Soon or Register Now */}
          {event.registrationLink && event.registrationLink !== "#" ? (
            <a
              href={event.registrationLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-acm-blue text-[var(--foreground)] font-semibold text-sm uppercase tracking-wider transition-all duration-300 hover:bg-acm-blue/90"
              style={{ fontFamily: "var(--font-body)" }}
            >
              <span>Register Now</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          ) : (
            <div className="flex flex-col sm:flex-row gap-4">
              <div
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30 text-orange-400 font-semibold text-sm uppercase tracking-wider"
                style={{ fontFamily: "var(--font-body)" }}
              >
                <Clock className="w-4 h-4" />
                <span>Coming Soon</span>
              </div>
              {event.websiteLink && (
                <a
                  href={event.websiteLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 border border-acm-blue/40 text-acm-blue font-semibold text-sm uppercase tracking-wider transition-all duration-300 hover:border-acm-blue hover:bg-acm-blue/10"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  <span>Visit Website</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              )}
              {event.slug && (
                <Link
                  href={`/events/${event.slug}`}
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 border border-white/20 text-white/70 font-semibold text-sm uppercase tracking-wider transition-all duration-300 hover:border-white/40 hover:text-[var(--foreground)]"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  <span>View Details</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

/**
 * Past Event Card - With poster image
 */
function EventCard({ event, index }: { event: EventData; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });
  
  return (
    <Link href={`/events/${event.slug}`}>
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: (index % 3) * 0.1 }}
        className="group relative bg-[var(--surface)] border border-white/5 overflow-hidden transition-all duration-300 hover:border-white/20"
      >
        {/* Event Image */}
        {event.image && (
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src={event.image}
              alt={event.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--surface)] via-transparent to-transparent" />
            {/* Category Badge */}
            <div className="absolute top-4 left-4">
              <span
                className="px-3 py-1 text-[10px] font-semibold uppercase tracking-wider rounded-full"
                style={{ 
                  backgroundColor: `${event.categoryColor}20`,
                  color: event.categoryColor,
                  fontFamily: "var(--font-body)"
                }}
              >
                {event.category}
              </span>
            </div>
          </div>
        )}
        
        {/* Content */}
        <div className="p-6">
          {/* Event number */}
          <div className="flex items-center gap-3 mb-4">
            <span className="text-acm-blue text-xs font-medium tracking-wider" style={{ fontFamily: "var(--font-body)" }}>
              {String(index + 1).padStart(2, '0')}
            </span>
          </div>
          
          {/* Title */}
          <h3 className="text-xl md:text-2xl font-black text-[var(--foreground)] mb-3 tracking-normal group-hover:text-acm-blue transition-colors" style={{ fontFamily: "var(--font-heading)" }}>
            {event.title}
          </h3>
          
          {/* Description */}
          <p className="text-white/40 text-sm leading-relaxed mb-4 line-clamp-2" style={{ fontFamily: "var(--font-body)" }}>
            {event.description}
          </p>
          
          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {event.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 text-[10px] uppercase tracking-wider text-white/40 border border-white/10 rounded"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

/**
 * Section Header
 */
function SectionHeader({ title, subtitle, isUpcoming = false }: { title: string; subtitle: string; isUpcoming?: boolean }) {
  const headerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(headerRef, { once: true, margin: "-50px" });
  
  return (
    <motion.div
      ref={headerRef}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.6 }}
      className="mb-12"
    >
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-px bg-acm-blue/50" />
        <span className={`text-[10px] tracking-[0.4em] uppercase ${isUpcoming ? 'text-acm-blue' : 'text-white/30'}`} style={{ fontFamily: "var(--font-body)" }}>
          {subtitle}
        </span>
      </div>
      <h2 className="text-4xl md:text-6xl font-black text-[var(--foreground)] tracking-normal" style={{ fontFamily: "var(--font-heading)" }}>
        <TextReveal text={title} delay={0.1} />
      </h2>
    </motion.div>
  );
}

export default function EventsSection() {
  return (
    <section
      id="events"
      className="relative w-full bg-[var(--background)] overflow-hidden py-24 md:py-32"
      style={{ zIndex: 10 }}
    >
      {/* Background Glow */}
      <div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-acm-blue/3 rounded-full blur-[150px] pointer-events-none" />
      
      <div className="relative z-10 px-6 md:px-12 lg:px-20">
        <div className="max-w-[1400px] mx-auto">
          {/* Upcoming Events */}
          <SectionHeader title="Join the Challenge" subtitle="Upcoming Events" isUpcoming />
          
          <div className="mb-24">
            {upcomingEvents.map((event) => (
              <UpcomingEventCard key={event.title} event={event} />
            ))}
          </div>
          
          {/* Past Events */}
          <SectionHeader title="What We've Hosted" subtitle="Past Events" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pastEvents.map((event, index) => (
              <EventCard key={event.id} event={event} index={index} />
            ))}
          </div>
          
          {/* View All CTA */}
          <div className="text-center mt-16">
            <a
              href="/events"
              className="inline-flex items-center gap-3 px-8 py-4 border border-white/15 text-white/60 text-sm uppercase tracking-normalst hover:border-white/30 hover:text-[var(--foreground)] transition-all"
              style={{ fontFamily: "var(--font-body)" }}
            >
              <span>View All Events</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

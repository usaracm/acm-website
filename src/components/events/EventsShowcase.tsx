"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, MapPin, Users, Zap } from "lucide-react";
import { eventsData, EventData } from "@/data/eventsData";

interface EventCardProps {
  event: EventData;
  index: number;
}

function EventCard({ event, index }: EventCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
        delay: 0.1,
      }}
      className="group relative"
    >
      <Link href={`/events/${event.slug}`}>
        <div
          className={`relative flex flex-col ${
            isEven ? "md:flex-row" : "md:flex-row-reverse"
          } gap-8 md:gap-12 p-6 md:p-10 bg-[var(--surface)] border border-white/5 hover:border-acm-blue/20 transition-all duration-500`}
        >
          {/* Corner Accents */}
          <div className="absolute top-0 left-0 w-6 h-6 border-l-2 border-t-2 border-white/10 group-hover:border-acm-blue/40 transition-colors duration-500 z-10" />
          <div className="absolute top-0 right-0 w-6 h-6 border-r-2 border-t-2 border-white/10 group-hover:border-acm-blue/40 transition-colors duration-500 z-10" />
          <div className="absolute bottom-0 left-0 w-6 h-6 border-l-2 border-b-2 border-white/10 group-hover:border-acm-blue/40 transition-colors duration-500 z-10" />
          <div className="absolute bottom-0 right-0 w-6 h-6 border-r-2 border-b-2 border-white/10 group-hover:border-acm-blue/40 transition-colors duration-500 z-10" />
          {/* Left/Right: Event Info */}
          <div className="flex-1 flex flex-col justify-center">
            {/* Category */}
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <span
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-semibold tracking-wider uppercase"
                style={{
                  background: `${event.categoryColor}15`,
                  color: event.categoryColor,
                  fontFamily: "var(--font-body)",
                }}
              >
                <Zap className="w-3 h-3" />
                {event.category}
              </span>
            </div>

            {/* Title */}
            <h3
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-[var(--foreground)] mb-3 group-hover:text-acm-blue transition-colors leading-tight"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {event.title}
            </h3>

            {/* Subtitle */}
            <p
              className="text-base md:text-lg text-white/40 mb-4"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {event.subtitle}
            </p>

            {/* Description */}
            <p
              className="text-sm text-white/50 leading-relaxed mb-6 line-clamp-2"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {event.description}
            </p>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 text-white/30">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5" />
                <span
                  className="text-xs"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {event.venue}
                </span>
              </div>
              {event.participants && (
                <div className="flex items-center gap-2">
                  <Users className="w-3.5 h-3.5" />
                  <span
                    className="text-xs"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {event.participants}
                  </span>
                </div>
              )}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-5">
              {event.tags.slice(0, 4).map((tag, i) => (
                <span
                  key={i}
                  className="px-2 py-1 text-[10px] font-medium text-white/30 bg-white/5 rounded-md"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Right/Left: Visual */}
          <div className="relative w-full md:w-[280px] lg:w-[320px] h-[200px] md:h-[280px] shrink-0 overflow-hidden bg-linear-to-br from-white/5 to-transparent border border-white/5">
            {/* Corner accents for visual */}
            <div className="absolute top-0 left-0 w-4 h-4 border-l border-t border-white/10 z-10" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-r border-b border-white/10 z-10" />
            
            {/* Website Preview, Event Image, or Category Icon */}
            {event.previewUrl ? (
              <>
                <iframe
                  src={event.previewUrl}
                  title={`${event.title} preview`}
                  className="absolute inset-0 w-full h-full pointer-events-none"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/25" />
              </>
            ) : event.image ? (
              <>
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </>
            ) : (
              <>
                {/* Category Icon Display */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    className="w-24 h-24 md:w-32 md:h-32 rounded-full opacity-20 group-hover:opacity-40 group-hover:scale-110 transition-all duration-500 flex items-center justify-center"
                    style={{ background: `${event.categoryColor}30` }}
                  >
                    <Zap 
                      className="w-12 h-12 md:w-16 md:h-16"
                      style={{ color: event.categoryColor }}
                    />
                  </motion.div>
                </div>

                {/* Category Color Overlay */}
                <div
                  className="absolute inset-0 opacity-20"
                  style={{
                    background: `radial-gradient(circle at 50% 50%, ${event.categoryColor}30, transparent 70%)`,
                  }}
                />

                {/* Grid Pattern */}
                <div
                  className="absolute inset-0 opacity-30"
                  style={{
                    backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0)`,
                    backgroundSize: "24px 24px",
                  }}
                />
              </>
            )}

            {/* Corner Decorations */}
            <div className="absolute top-3 left-3 w-6 h-6 border-l border-t border-white/10" />
            <div className="absolute bottom-3 right-3 w-6 h-6 border-r border-b border-white/10" />
          </div>

          {/* Arrow */}
          <motion.div
            className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ArrowUpRight className="w-5 h-5 text-acm-blue" />
          </motion.div>

          {/* Featured Badge */}
          {event.isFeatured && (
            <div className="absolute -top-3 left-8 px-3 py-1 bg-acm-blue/20 border border-acm-blue/30 rounded-full">
              <span
                className="text-[9px] font-semibold tracking-wider text-acm-blue uppercase flex items-center gap-1.5"
                style={{ fontFamily: "var(--font-body)" }}
              >
                <span className="w-1.5 h-1.5 bg-acm-blue rounded-full" />
                Featured
              </span>
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  );
}

export default function EventsShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  // Filter and sort events (upcoming first, then past by date)
  const upcomingEvents = eventsData.filter((e) => e.isUpcoming);
  const pastEvents = eventsData
    .filter((e) => !e.isUpcoming)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <section
      ref={containerRef}
      className="relative py-20 sm:py-32 md:py-40 bg-[#030303] overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.03) 1px, transparent 0)`,
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12">
        {/* Upcoming Events Section */}
        {upcomingEvents.length > 0 && (
          <div className="mb-24">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="mb-12 md:mb-16"
            >
              <div className="flex items-center gap-4 mb-6">
                <span 
                  className="text-[10px] md:text-[11px] font-medium tracking-[0.3em] text-green-400 uppercase"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  01
                </span>
                <div className="w-12 md:w-20 h-px bg-green-500/40" />
                <span 
                  className="text-[10px] md:text-[11px] font-light tracking-[0.4em] text-white/30 uppercase"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  Upcoming Events
                </span>
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="w-2 h-2 bg-green-500 rounded-full"
                />
              </div>
              
              <h2
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[var(--foreground)] tracking-normal"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                DON&apos;T MISS <span className="text-green-400">OUT</span>
              </h2>
            </motion.div>

            <div className="space-y-8">
              {upcomingEvents.map((event, index) => (
                <EventCard key={event.id} event={event} index={index} />
              ))}
            </div>
          </div>
        )}

        {/* Past Events Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 md:mb-16"
        >
          <div className="flex items-center gap-4 mb-6">
            <span 
              className="text-[10px] md:text-[11px] font-medium tracking-[0.3em] text-acm-blue uppercase"
              style={{ fontFamily: "var(--font-body)" }}
            >
              02
            </span>
            <div className="w-12 md:w-20 h-px bg-acm-blue/40" />
            <span 
              className="text-[10px] md:text-[11px] font-light tracking-[0.4em] text-white/30 uppercase"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Past Events
            </span>
          </div>
          
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <h2
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[var(--foreground)] tracking-normal"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              EXPLORE THE <span className="text-acm-blue">ARCHIVE</span>
            </h2>
            
            {/* Event count */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-px bg-white/20" />
              <span 
                className="text-sm text-white/40"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {pastEvents.length} {pastEvents.length === 1 ? "Event" : "Events"}
              </span>
            </div>
          </div>
        </motion.div>

        <div className="space-y-8">
          {pastEvents.map((event, index) => (
            <EventCard key={event.id} event={event} index={index + upcomingEvents.length} />
          ))}
        </div>
      </div>
    </section>
  );
}

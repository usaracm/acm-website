"use client";

import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  MapPin,
  Users,
  Clock,
  ExternalLink,
  ArrowUpRight,
  Trophy,
  Sparkles,
  ChevronUp,
  Zap,
  Award,
  Mic2,
  Link2,
  Tag,
  FileText,
  Camera,
  X,
} from "lucide-react";
import { EventData } from "@/data/eventsData";

interface EventPageContentProps {
  event: EventData;
}

export default function EventPageContent({ event }: EventPageContentProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  const hasPreview = Boolean(event.previewUrl);

  // Get slideshow images (all from gallery or just the main image)
  const slideshowImages = event.gallery || (event.image ? [event.image] : []);

  // Auto-rotate slideshow
  useEffect(() => {
    if (slideshowImages.length <= 1) return;
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slideshowImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [slideshowImages.length]);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const heroY = useTransform(smoothProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(smoothProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(smoothProgress, [0, 0.5], [1, 0.95]);

  // Scroll listener for scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-[#030303]">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-acm-blue z-[200] origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen overflow-hidden">
        <motion.div
          style={{ y: heroY, opacity: heroOpacity, scale: heroScale }}
          className="relative min-h-screen flex flex-col items-center justify-center px-6 py-24"
        >
          {/* Background Effects */}
          <div className="absolute inset-0 pointer-events-none">
            <div
              className="absolute inset-0 opacity-20"
              style={{
                background: `radial-gradient(ellipse 60% 40% at 50% 50%, ${event.categoryColor}30, transparent 70%)`,
              }}
            />
            <div
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.02) 1px, transparent 0)`,
                backgroundSize: "48px 48px",
              }}
            />
          </div>

          {/* Geometric Shapes */}
          <motion.div
            className="absolute top-[15%] left-[10%] w-20 h-20 border border-white/5 rotate-45"
            animate={{ rotate: [45, 50, 45] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-[20%] right-[15%] w-16 h-16 border border-acm-blue/10 rounded-full"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />
          <motion.div
            className="absolute top-[40%] right-[8%] w-24 h-24 border border-white/5 rounded-full"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />

          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="absolute top-8 left-8 z-20"
          >
            <Link
              href="/events"
              className="group flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 hover:border-white/20 transition-all"
            >
              <ArrowLeft className="w-4 h-4 text-white/60 group-hover:text-[var(--foreground)] transition-colors" />
              <span
                className="text-xs text-white/60 group-hover:text-[var(--foreground)] transition-colors"
                style={{ fontFamily: "var(--font-body)" }}
              >
                All Events
              </span>
            </Link>
          </motion.div>

          {/* Content with Event Poster */}
          <div className="relative z-10 max-w-6xl mx-auto w-full">
            {(hasPreview || event.image || slideshowImages.length > 0) ? (
              /* Two-column layout when image exists */
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Event Slideshow */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className="relative max-w-md mx-auto lg:mx-0 w-full"
                >
                  <div className="flex gap-4">
                    {/* Main visual */}
                    <div className="relative flex-1 aspect-square rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                      {hasPreview ? (
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
                      ) : slideshowImages.length > 0 ? (
                        <>
                          {slideshowImages.map((img, idx) => (
                            <motion.div
                              key={idx}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: activeSlide === idx ? 1 : 0 }}
                              transition={{ duration: 0.5 }}
                              className="absolute inset-0"
                            >
                              <Image
                                src={img}
                                alt={`${event.title} - Image ${idx + 1}`}
                                fill
                                className="object-contain bg-black/50"
                                priority={idx === 0}
                              />
                            </motion.div>
                          ))}
                        </>
                      ) : (
                        <Image
                          src={event.image!}
                          alt={event.title}
                          fill
                          className="object-contain bg-black/50"
                          priority
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                    </div>

                    {/* Numbered Thumbnails */}
                    {!hasPreview && slideshowImages.length > 1 && (
                      <div className="flex flex-col gap-2 w-16 max-h-[450px] overflow-y-auto no-scrollbar">
                        {slideshowImages.map((img, idx) => (
                          <motion.button
                            key={idx}
                            onClick={() => setActiveSlide(idx)}
                            className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${activeSlide === idx
                              ? "border-acm-blue shadow-lg shadow-acm-blue/30"
                              : "border-white/20 hover:border-white/40"
                              }`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Image
                              src={img}
                              alt={`Thumbnail ${idx + 1}`}
                              fill
                              className="object-cover"
                            />
                            <div className={`absolute inset-0 flex items-center justify-center ${activeSlide === idx ? "bg-acm-blue/40" : "bg-black/50"
                              }`}>
                              <span
                                className="text-[var(--foreground)] font-bold text-lg"
                                style={{ fontFamily: "var(--font-heading)" }}
                              >
                                {idx + 1}
                              </span>
                            </div>
                          </motion.button>
                        ))}
                      </div>
                    )}
                  </div>
                  {/* Decorative elements */}
                  <div className="absolute -top-4 -right-4 w-8 h-8 border-t border-r border-acm-blue/30" />
                  <div className="absolute -bottom-4 -left-4 w-8 h-8 border-b border-l border-acm-blue/30" />
                </motion.div>

                {/* Event Info */}
                <div className="text-center lg:text-left">
                  {/* Category */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-6"
                  >
                    <span
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase"
                      style={{
                        background: `${event.categoryColor}20`,
                        color: event.categoryColor,
                        fontFamily: "var(--font-body)",
                      }}
                    >
                      <Zap className="w-3.5 h-3.5" />
                      {event.category}
                    </span>
                    {event.isUpcoming && (
                      <span className="inline-flex items-center gap-2 px-3 py-1 bg-green-500/20 border border-green-500/30 rounded-full">
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                          className="w-1.5 h-1.5 bg-green-500 rounded-full"
                        />
                        <span
                          className="text-[10px] font-semibold tracking-wider text-green-400 uppercase"
                          style={{ fontFamily: "var(--font-body)" }}
                        >
                          Upcoming
                        </span>
                      </span>
                    )}
                  </motion.div>

                  {/* Title */}
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="mb-6"
                  >
                    <h1
                      className="text-3xl md:text-5xl lg:text-6xl font-black text-[var(--foreground)] leading-tight"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      {event.title}
                    </h1>
                    <p
                      className="mt-4 text-lg md:text-xl text-white/40"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      {event.subtitle}
                    </p>
                  </motion.div>

                  {/* Meta Row */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="flex flex-wrap items-center justify-center lg:justify-start gap-6 text-white/40 mb-8"
                  >
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm" style={{ fontFamily: "var(--font-body)" }}>
                        {event.venue}
                      </span>
                    </div>
                    {event.participants && (
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        <span className="text-sm" style={{ fontFamily: "var(--font-body)" }}>
                          {event.participants}
                        </span>
                      </div>
                    )}
                  </motion.div>

                  {/* CTA for Upcoming */}
                  {event.isUpcoming && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 }}
                    >
                      {event.registrationUrl && event.registrationUrl !== "#" ? (
                        <Link href={event.registrationUrl}>
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="inline-flex items-center gap-3 px-8 py-4 bg-acm-blue text-[var(--foreground)] font-semibold rounded-full hover:bg-acm-blue/90 transition-colors"
                          >
                            <span style={{ fontFamily: "var(--font-body)" }}>
                              Register Now
                            </span>
                            <ArrowUpRight className="w-4 h-4" />
                          </motion.button>
                        </Link>
                      ) : (
                        <div className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30 text-orange-400 font-semibold rounded-full">
                          <Clock className="w-5 h-5" />
                          <span style={{ fontFamily: "var(--font-body)" }}>
                            Coming Soon
                          </span>
                        </div>
                      )}
                    </motion.div>
                  )}
                </div>
              </div>
            ) : (
              /* Original centered layout when no image */
              <div className="text-center">
                {/* Category */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex flex-wrap items-center justify-center gap-4 mb-8"
                >
                  <span
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase"
                    style={{
                      background: `${event.categoryColor}20`,
                      color: event.categoryColor,
                      fontFamily: "var(--font-body)",
                    }}
                  >
                    <Zap className="w-3.5 h-3.5" />
                    {event.category}
                  </span>
                  {event.isUpcoming && (
                    <span className="inline-flex items-center gap-2 px-3 py-1 bg-green-500/20 border border-green-500/30 rounded-full">
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="w-1.5 h-1.5 bg-green-500 rounded-full"
                      />
                      <span
                        className="text-[10px] font-semibold tracking-wider text-green-400 uppercase"
                        style={{ fontFamily: "var(--font-body)" }}
                      >
                        Upcoming
                      </span>
                    </span>
                  )}
                </motion.div>

                {/* Title */}
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="mb-6"
                >
                  <h1
                    className="text-4xl md:text-6xl lg:text-7xl font-black text-[var(--foreground)] leading-tight"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {event.title}
                  </h1>
                  <p
                    className="mt-4 text-xl md:text-2xl text-white/40"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {event.subtitle}
                  </p>
                </motion.div>

                {/* Meta Row */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="flex flex-wrap items-center justify-center gap-6 text-white/40"
                >
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm" style={{ fontFamily: "var(--font-body)" }}>
                      {event.venue}
                    </span>
                  </div>
                  {event.participants && (
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      <span className="text-sm" style={{ fontFamily: "var(--font-body)" }}>
                        {event.participants}
                      </span>
                    </div>
                  )}
                  {event.registrationDeadline && (
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm" style={{ fontFamily: "var(--font-body)" }}>
                        Register by {event.registrationDeadline}
                      </span>
                    </div>
                  )}
                </motion.div>

                {/* CTA for Upcoming */}
                {event.isUpcoming && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="mt-10"
                  >
                    {event.registrationUrl && event.registrationUrl !== "#" ? (
                      <Link href={event.registrationUrl}>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="inline-flex items-center gap-3 px-8 py-4 bg-acm-blue text-[var(--foreground)] font-semibold rounded-full hover:bg-acm-blue/90 transition-colors"
                        >
                          <span style={{ fontFamily: "var(--font-body)" }}>
                            Register Now
                          </span>
                          <ArrowUpRight className="w-4 h-4" />
                        </motion.button>
                      </Link>
                    ) : (
                      <div className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30 text-orange-400 font-semibold rounded-full">
                        <Clock className="w-5 h-5" />
                        <span style={{ fontFamily: "var(--font-body)" }}>
                          Coming Soon
                        </span>
                      </div>
                    )}
                  </motion.div>
                )}
              </div>
            )}
          </div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
          >
            <span
              className="text-[9px] tracking-[0.4em] text-white/20 uppercase"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Scroll
            </span>
            <motion.div
              className="w-5 h-8 border border-white/20 rounded-full flex items-start justify-center p-1.5"
            >
              <motion.div
                className="w-1 h-2 bg-acm-blue/60 rounded-full"
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Corner Accents */}
        <div className="absolute top-8 right-8 w-16 h-16 border-r border-t border-white/[0.06]" />
        <div className="absolute bottom-8 left-8 w-16 h-16 border-l border-b border-white/[0.06]" />
      </section>

      {/* Main Content */}
      <section className="relative py-20 md:py-32">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          {/* Description */}
          <ContentSection title="About This Event" icon={FileText}>
            <div className="prose prose-invert prose-lg max-w-none">
              {event.fullDescription.split("\n\n").map((paragraph, i) => (
                <p
                  key={i}
                  className="text-white/60 leading-relaxed mb-6"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </ContentSection>

          {/* Highlights */}
          <ContentSection title="Highlights" icon={Sparkles}>
            <div className="grid md:grid-cols-2 gap-4">
              {event.highlights.map((highlight, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-3 p-4 bg-white/[0.02] border border-white/5 rounded-xl"
                >
                  <span className="w-1.5 h-1.5 mt-2 bg-acm-blue rounded-full shrink-0" />
                  <span
                    className="text-sm text-white/60"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {highlight.replace(/^[✦◈◇✧○] /, "")}
                  </span>
                </motion.div>
              ))}
            </div>
          </ContentSection>

          {/* Schedule */}
          {event.schedule && (
            <ContentSection title="Schedule" icon={Clock}>
              <div className="space-y-4">
                {event.schedule.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex gap-6 p-4 bg-white/[0.02] border border-white/5 rounded-xl"
                  >
                    <div className="w-24 shrink-0">
                      <span
                        className="text-xs font-semibold text-acm-blue"
                        style={{ fontFamily: "var(--font-body)" }}
                      >
                        {item.time}
                      </span>
                    </div>
                    <span
                      className="text-sm text-white/60"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      {item.activity}
                    </span>
                  </motion.div>
                ))}
              </div>
            </ContentSection>
          )}

          {/* Prizes */}
          {event.prizes && (
            <ContentSection title="Prizes" icon={Trophy}>
              <div className="grid md:grid-cols-2 gap-4">
                {event.prizes.map((prize, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="relative p-6 bg-linear-to-br from-white/3 to-transparent border border-white/10 rounded-xl overflow-hidden"
                  >
                    <div className="flex items-center gap-4 mb-3">
                      <Award
                        className="w-8 h-8"
                        style={{ color: event.categoryColor }}
                      />
                      <span
                        className="text-sm font-semibold text-white/80"
                        style={{ fontFamily: "var(--font-body)" }}
                      >
                        {prize.position}
                      </span>
                    </div>
                    <p
                      className="text-sm text-white/50"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      {prize.prize}
                    </p>
                    {/* Decorative */}
                    <div
                      className="absolute top-0 right-0 w-20 h-20 opacity-10"
                      style={{
                        background: `radial-gradient(circle at 100% 0%, ${event.categoryColor}, transparent 70%)`,
                      }}
                    />
                  </motion.div>
                ))}
              </div>
            </ContentSection>
          )}

          {/* Speakers */}
          {event.speakers && (
            <ContentSection title="Speakers" icon={Mic2}>
              <div className="grid md:grid-cols-2 gap-4">
                {event.speakers.map((speaker, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="p-6 bg-white/[0.02] border border-white/5 rounded-xl"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-linear-to-br from-acm-blue/20 to-transparent border border-acm-blue/20 flex items-center justify-center">
                        <Users className="w-5 h-5 text-acm-blue/60" />
                      </div>
                      <div>
                        <h4
                          className="text-sm font-semibold text-white/80"
                          style={{ fontFamily: "var(--font-body)" }}
                        >
                          {speaker.name}
                        </h4>
                        <p
                          className="text-xs text-white/40"
                          style={{ fontFamily: "var(--font-body)" }}
                        >
                          {speaker.role}
                          {speaker.company && ` at ${speaker.company}`}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </ContentSection>
          )}
          {/* Links */}
          {event.links && (
            <ContentSection title="Resources" icon={Link2}>
              <div className="flex flex-wrap gap-4">
                {event.links.map((link, i) => (
                  <Link key={i} href={link.url} target="_blank" rel="noopener noreferrer">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="inline-flex items-center gap-2 px-5 py-3 bg-white/5 border border-white/10 rounded-full hover:border-acm-blue/30 hover:bg-acm-blue/5 transition-all"
                    >
                      <ExternalLink className="w-3.5 h-3.5 text-white/40" />
                      <span
                        className="text-sm text-white/60"
                        style={{ fontFamily: "var(--font-body)" }}
                      >
                        {link.label}
                      </span>
                    </motion.div>
                  </Link>
                ))}
              </div>
            </ContentSection>
          )}


          {/* Tags */}
          <ContentSection title="Tags" icon={Tag}>
            <div className="flex flex-wrap gap-3">
              {event.tags.map((tag, i) => (
                <span
                  key={i}
                  className="px-4 py-2 text-xs font-medium text-white/40 bg-white/5 border border-white/5 rounded-full"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  #{tag}
                </span>
              ))}
            </div>
          </ContentSection>

          {/* Gallery */}
          {event.gallery && event.gallery.length > 0 && (
            <ContentSection title="Gallery" icon={Camera}>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {event.gallery.map((image, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="relative aspect-square rounded-xl overflow-hidden cursor-pointer group"
                    onClick={() => setLightboxImage(image)}
                  >
                    <Image
                      src={image}
                      alt={`${event.title} gallery image ${i + 1}`}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                        <Camera className="w-5 h-5 text-[var(--foreground)]" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </ContentSection>
          )}
        </div>
      </section>

      {/* Back to Events CTA */}
      <section className="relative py-20 border-t border-white/5">
        <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p
              className="text-white/40 mb-6"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Want to explore more events?
            </p>
            <Link href="/events">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-3 px-8 py-4 border border-white/20 text-[var(--foreground)] font-medium rounded-full hover:border-acm-blue/50 hover:bg-acm-blue/5 transition-all"
              >
                <ArrowLeft className="w-4 h-4" />
                <span style={{ fontFamily: "var(--font-body)" }}>
                  Back to All Events
                </span>
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Scroll to Top Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: showScrollTop ? 1 : 0,
          scale: showScrollTop ? 1 : 0.8,
        }}
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 z-50 w-12 h-12 bg-acm-blue/90 rounded-full flex items-center justify-center shadow-lg hover:bg-acm-blue transition-colors"
      >
        <ChevronUp className="w-5 h-5 text-[var(--foreground)]" />
      </motion.button>

      {/* Lightbox */}
      {lightboxImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[300] bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightboxImage(null)}
        >
          <button
            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
            onClick={() => setLightboxImage(null)}
          >
            <X className="w-6 h-6 text-[var(--foreground)]" />
          </button>
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="relative max-w-5xl max-h-[90vh] w-full h-full"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={lightboxImage}
              alt="Gallery image"
              fill
              className="object-contain"
            />
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}

// Content Section Component
function ContentSection({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="mb-16"
    >
      <div className="flex items-center gap-3 mb-6">
        <Icon className="w-5 h-5 text-acm-blue/60" />
        <h2
          className="text-xl md:text-2xl font-bold text-[var(--foreground)]"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {title}
        </h2>
        <div className="h-px flex-1 bg-linear-to-r from-white/10 to-transparent" />
      </div>
      {children}
    </motion.div>
  );
}

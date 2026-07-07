"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { TextReveal } from "../TextReveal";

// Premium card data with refined copy
const cards = [
  {
    id: 1,
    title: "Who We Are",
    subtitle: "COMMUNITY",
    description:
      "A collective of curious minds—designers, developers, and dreamers—united by the passion to explore technology's endless possibilities.",
    stats: { value: "50+", label: "Active Members" },
    image: "/about/about-1.webp",
  },
  {
    id: 2,
    title: "What We Build",
    subtitle: "DOMAINS",
    description:
      "From AI to blockchain, web to mobile—we dive deep into the technologies shaping tomorrow, learning by building real-world solutions.",
    stats: { value: "12+", label: "Tech Domains" },
    image: "/about/about-2.webp",
  },
  {
    id: 3,
    title: "Our Philosophy",
    subtitle: "PURPOSE",
    description:
      "We believe in learning through creation. Every hackathon, workshop, and project is an opportunity to transform curiosity into capability.",
    stats: { value: "100%", label: "Passion Driven" },
    image: "/about/about-3.webp",
  },
  {
    id: 4,
    title: "Our Reach",
    subtitle: "IMPACT",
    description:
      "Thousands of students across Delhi have been part of our journey—building skills, connections, and the confidence to innovate.",
    stats: { value: "25+", label: "Events Hosted" },
    image: "/about/about-4.webp",
  },
];

// Simple Card Component
function SimpleCard({ card, index }: { card: typeof cards[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative"
    >
      <div className="relative h-full overflow-hidden bg-[var(--surface)] border border-white/5 p-8 md:p-10 transition-all duration-300 hover:border-acm-blue/20">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src={card.image}
            alt={card.title}
            fill
            className="object-cover opacity-60 grayscale group-hover:grayscale-0 group-hover:scale-105 group-hover:opacity-100 transition-all duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--surface)]/90 via-[var(--surface)]/40 to-[var(--surface)]/90" />
        </div>

        {/* Top Accent Line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-acm-blue/30 to-transparent z-20" />

        {/* Large Number */}
        <span
          className="absolute -top-4 -right-2 text-[100px] md:text-[120px] font-black text-white/3 leading-none select-none"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {String(card.id).padStart(2, '0')}
        </span>

        {/* Content */}
        <div className="relative z-10">
          {/* Subtitle */}
          <span
            className="text-[10px] font-medium tracking-[0.4em] text-acm-blue/70 uppercase"
            style={{ fontFamily: "var(--font-body)" }}
          >
            {card.subtitle}
          </span>

          {/* Title */}
          <h3
            className="text-3xl md:text-4xl font-black text-[var(--foreground)] mt-4 mb-4 tracking-normal leading-[1.1]"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {card.title}
          </h3>

          {/* Description */}
          <p
            className="text-white/40 text-sm leading-[1.8] mb-8"
            style={{ fontFamily: "var(--font-body)" }}
          >
            {card.description}
          </p>

          {/* Stats */}
          <div className="pt-6 border-t border-white/5">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl md:text-4xl font-black text-[var(--foreground)]" style={{ fontFamily: "var(--font-heading)" }}>
                {card.stats.value}
              </span>
              <span className="text-[10px] font-medium tracking-[0.2em] text-white/30 uppercase" style={{ fontFamily: "var(--font-body)" }}>
                {card.stats.label}
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function AboutSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, amount: 0.3 });

  return (
    <section
      id="about"
      className="relative bg-[#030303] py-16 sm:py-24 md:py-32 lg:py-40"
    >
      {/* Ambient Glow */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full bg-acm-blue/2 blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
        {/* Header Section */}
        <div ref={headerRef} className="mb-12 sm:mb-16 md:mb-24">
          {/* Section Label */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isHeaderInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-6 mb-6"
          >
            <div className="w-16 md:w-24 h-px bg-linear-to-r from-acm-blue/60 to-transparent" />
            <span className="text-[10px] md:text-[11px] font-light tracking-[0.5em] text-white/30 uppercase">
              About Us
            </span>
          </motion.div>

          {/* Main Title */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isHeaderInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h2
              className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-[var(--foreground)] tracking-normal leading-[0.9]"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              <TextReveal text="Shaping" delay={0.1} />
            </h2>
            <h2
              className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-normal leading-[0.9]"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              <span className="text-white/20">
                <TextReveal text="the" delay={0.3} />
              </span>{" "}
              <span className="text-acm-blue">
                <TextReveal text="future" delay={0.4} />
              </span>
            </h2>
          </motion.div>

          {/* Tagline & Intro */}
          <div className="mt-10 md:mt-16 grid md:grid-cols-2 gap-8 md:gap-16">
            <motion.p
              initial={{ opacity: 0 }}
              animate={isHeaderInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-white/30 text-sm md:text-base leading-relaxed"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Where curiosity meets code. We&apos;re building the next generation of
              tech leaders, one project at a time.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={isHeaderInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex items-start gap-6"
            >
              <div className="w-12 h-12 relative opacity-50 shrink-0">
                <Image
                  src="/ACM_Logo_white_text.webp"
                  alt="ACM"
                  fill
                  className="object-contain"
                />
              </div>
              <p className="text-lg md:text-xl font-light text-white/40 leading-[1.6]" style={{ fontFamily: "var(--font-body)" }}>
                We are a collective of{" "}
                <span className="text-[var(--foreground)] font-medium">designers,</span>
                {" "}<span className="text-[var(--foreground)] font-medium">developers,</span>
                {" "}and{" "}
                <span className="text-acm-blue font-medium">innovators</span>.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {cards.map((card, index) => (
            <SimpleCard key={card.id} card={card} index={index} />
          ))}
        </div>

        {/* Learn More CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 md:mt-16 flex justify-center"
        >
          <Link
            href="/about"
            className="group flex items-center gap-3 px-8 py-4 border border-white/10 hover:border-acm-blue/50 bg-white/2 hover:bg-acm-blue/5 transition-all duration-300"
          >
            <span
              className="text-sm font-medium tracking-normal text-white/60 group-hover:text-[var(--foreground)] transition-colors"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Learn More About Us
            </span>
            <ArrowRight className="w-4 h-4 text-acm-blue transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

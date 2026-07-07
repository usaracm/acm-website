"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Linkedin, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import {
  facultyMembers,
  officeBearers,
  TeamMember,
} from "@/data/teamData";
import { TextReveal } from "@/components/TextReveal";

/**
 * Premium Member Card with corner accents
 */
function MemberCard({ member, index }: { member: TeamMember; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className="group relative"
    >
      {/* Card Container */}
      <div className="relative bg-[#0a0a0f] border border-white/6 overflow-hidden transition-all duration-500 hover:border-white/12">
        {/* Corner Accents */}
        <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-acm-blue/60" />
        <div className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 border-acm-blue/60" />
        <div className="absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2 border-acm-blue/60" />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-acm-blue/60" />

        {/* Image Container */}
        <div className="relative aspect-4/5 overflow-hidden bg-linear-to-br from-white/2 to-transparent">
          {member.imageUrl ? (
            <Image
              src={member.imageUrl}
              alt={member.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-6xl font-black text-white/3" style={{ fontFamily: "var(--font-heading)" }}>
                {member.name.charAt(0)}
              </div>
            </div>
          )}

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-[#0a0a0f] via-transparent to-transparent opacity-80" />
        </div>

        {/* Content */}
        <div className="relative p-5 -mt-12">
          <h3
            className="text-xl md:text-2xl font-black text-[var(--foreground)] mb-1 tracking-normal"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {member.name}
          </h3>
          <p
            className="text-white/40 text-sm tracking-normal"
            style={{ fontFamily: "var(--font-body)" }}
          >
            {member.role}
          </p>

          {/* LinkedIn */}
          {member.linkedin && (
            <a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${member.name}'s LinkedIn profile`}
              className="absolute bottom-5 right-5 w-8 h-8 flex items-center justify-center bg-white/5 border border-white/10 text-white/40 hover:text-acm-blue hover:border-acm-blue/40 transition-all duration-300"
            >
              <Linkedin size={14} />
            </a>
          )}
        </div>

        {/* Decorative Line */}
        <div className="absolute bottom-0 left-5 right-5 h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />
      </div>
    </motion.div>
  );
}

/**
 * Section Header Component
 */
function SectionHeader({
  label,
  title,
  index,
}: {
  label: string;
  title: string;
  index: string;
}) {
  const headerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(headerRef, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={headerRef}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      className="flex items-end justify-between mb-12"
    >
      <div>
        <div className="flex items-center gap-4 mb-3">
          <span
            className="text-acm-blue text-xs font-medium tracking-[0.3em]"
            style={{ fontFamily: "var(--font-body)" }}
          >
            {index}
          </span>
          <div className="w-8 h-px bg-white/20" />
          <span
            className="text-[10px] tracking-[0.4em] text-white/30 uppercase"
            style={{ fontFamily: "var(--font-body)" }}
          >
            {label}
          </span>
        </div>
        <h3
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-[var(--foreground)] tracking-normal"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {title}
        </h3>
      </div>
    </motion.div>
  );
}

/**
 * Main Teams Section
 */
export default function Teams() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-50px" });

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#050508] overflow-hidden py-20 sm:py-32"
      style={{ zIndex: 10 }}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
        <div
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
          className="absolute inset-0"
        />
      </div>

      <div className="relative z-10 px-6 md:px-12 lg:px-20">
        <div className="max-w-[1400px] mx-auto">
          {/* Main Section Header */}
          <motion.div
            ref={headerRef}
            initial={{ opacity: 0, y: 30 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="mb-16 sm:mb-24"
          >
            <div className="flex items-center gap-6 mb-6">
              <div className="w-16 h-px bg-linear-to-r from-acm-blue/60 to-transparent" />
              <span
                className="text-[11px] font-light tracking-[0.5em] text-white/40 uppercase"
                style={{ fontFamily: "var(--font-body)" }}
              >
                The People
              </span>
            </div>
            <h2
              className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-[var(--foreground)] tracking-normal"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              <TextReveal text="Our Team" delay={0.1} />
            </h2>
            <p
              className="mt-6 text-white/40 text-base md:text-lg max-w-xl leading-relaxed"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Meet the passionate individuals driving innovation and building
              our community.
            </p>
          </motion.div>

          {/* Faculty Section */}
          <div className="mb-24">
            <SectionHeader
              index="01"
              label="Mentors"
              title="Faculty Advisors"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {facultyMembers.map((member, index) => (
                <MemberCard key={`faculty-${member.role}-${index}`} member={member} index={index} />
              ))}
            </div>
          </div>

          {/* Office Bearers Section */}
          <div className="mb-24">
            <SectionHeader
              index="02"
              label="Leadership"
              title="Office Bearers"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {officeBearers.map((member, index) => (
                <MemberCard key={`office-${member.role}-${index}`} member={member} index={index} />
              ))}
            </div>
          </div>



          {/* View All CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex justify-center pt-8"
          >
            <Link
              href="/teams"
              className="group inline-flex items-center gap-4 px-8 py-4 bg-white/3 border border-white/10 hover:border-acm-blue/40 hover:bg-acm-blue/5 transition-all duration-500"
            >
              <span
                className="text-sm font-medium text-white/70 group-hover:text-[var(--foreground)] tracking-normal transition-colors duration-300"
                style={{ fontFamily: "var(--font-body)" }}
              >
                View All Team Members
              </span>
              <ArrowRight
                size={16}
                className="text-white/40 group-hover:text-acm-blue group-hover:translate-x-1 transition-all duration-300"
              />
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-[var(--background)] to-transparent pointer-events-none" />
    </section>
  );
}

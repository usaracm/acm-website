"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import MemberCard from "./MemberCard";
import { TeamMember } from "@/data/teamData";
import { LucideIcon } from "lucide-react";

interface FocusArea {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface TeamSectionProps {
  title: string;
  subtitle?: string;
  members: TeamMember[];
  sectionNumber: string;
  description?: string;
  focusAreas?: FocusArea[];
}

export default function TeamSection({
  title,
  subtitle,
  members,
  sectionNumber,
  description,
  focusAreas,
}: TeamSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, amount: 0.3 });

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#030303] overflow-hidden py-16 sm:py-24 md:py-32"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-acm-blue/3 rounded-full blur-[180px]" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-purple-900/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
        {/* Section Header */}
        <div ref={headerRef} className="mb-12 md:mb-16">
          {/* Section Label with Number */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isHeaderInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-6 mb-6"
          >
            <div className="flex items-center gap-3">
              <span
                className="text-[10px] md:text-[11px] font-medium tracking-[0.3em] text-acm-blue uppercase"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {sectionNumber}
              </span>
              <div className="w-12 md:w-20 h-px bg-acm-blue/40" />
            </div>
            {subtitle && (
              <span
                className="text-[10px] md:text-[11px] font-light tracking-[0.4em] text-white/30 uppercase"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {subtitle}
              </span>
            )}
          </motion.div>

          {/* Main Title */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black text-[var(--foreground)] tracking-normal leading-[0.95] mb-4"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {title}
          </motion.h2>

          {/* Accent Line */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="w-24 h-0.5 bg-linear-to-r from-acm-blue to-transparent origin-left"
          />

          {/* Description */}
          {description && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-white/40 text-sm md:text-base max-w-2xl mt-6 leading-relaxed"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {description}
            </motion.p>
          )}
        </div>

        {/* Focus Areas - Domain Description Cards */}
        {focusAreas && focusAreas.length > 0 && (
          <div className="mb-16 md:mb-20">
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-sm font-medium tracking-[0.3em] text-white/30 uppercase mb-8"
              style={{ fontFamily: "var(--font-body)" }}
            >
              What We Focus On
            </motion.h3>
            <div className={`grid gap-4 md:gap-6 ${focusAreas.length === 3
                ? "grid-cols-1 md:grid-cols-3"
                : focusAreas.length === 4
                  ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
                  : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
              }`}>
              {focusAreas.map((area, index) => {
                const Icon = area.icon;
                return (
                  <motion.div
                    key={area.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{
                      duration: 0.6,
                      delay: index * 0.1,
                      ease: [0.22, 1, 0.36, 1]
                    }}
                    className="group relative"
                  >
                    <div className="relative bg-[var(--surface)] border border-white/5 p-6 transition-all duration-500 hover:border-acm-blue/30 overflow-hidden h-full">
                      {/* Corner Accents */}
                      <div className="absolute top-0 left-0 w-3 h-3 border-l border-t border-white/10 group-hover:border-acm-blue/40 transition-colors duration-300" />
                      <div className="absolute bottom-0 right-0 w-3 h-3 border-r border-b border-white/10 group-hover:border-acm-blue/40 transition-colors duration-300" />

                      {/* Icon */}
                      <div className="mb-4">
                        <div className="w-10 h-10 flex items-center justify-center bg-white/5 border border-white/10 group-hover:border-acm-blue/30 group-hover:bg-acm-blue/10 transition-all duration-300">
                          <Icon className="w-4 h-4 text-white/50 group-hover:text-acm-blue transition-colors duration-300" strokeWidth={1.5} />
                        </div>
                      </div>

                      {/* Content */}
                      <h4
                        className="text-lg font-black text-[var(--foreground)] mb-2 tracking-normal group-hover:text-acm-blue transition-colors duration-300"
                        style={{ fontFamily: "var(--font-heading)" }}
                      >
                        {area.title}
                      </h4>
                      <p
                        className="text-white/40 text-sm leading-[1.7]"
                        style={{ fontFamily: "var(--font-body)" }}
                      >
                        {area.description}
                      </p>

                      {/* Hover Glow */}
                      <div className="absolute inset-0 bg-acm-blue/0 group-hover:bg-acm-blue/3 transition-colors duration-500 pointer-events-none" />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}

        {/* Members Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {members.map((member, index) => (
            <MemberCard
              key={`${sectionNumber}-${member.role}-${index}`}
              member={member}
              index={index}
            />
          ))}
        </div>
      </div>

      {/* Bottom Divider */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.5 }}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[1200px] h-px bg-linear-to-r from-transparent via-white/5 to-transparent"
      />
    </section>
  );
}

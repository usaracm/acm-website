"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { 
  Brain, 
  Code, 
  Network, 
  PenTool, 
  Camera, 
  Palette, 
  LucideIcon,
  Megaphone 
} from "lucide-react";

interface DomainProps {
  number: string;
  icon: LucideIcon;
  title: string;
  description: string;
}

const technicalDomains: DomainProps[] = [
  {
    number: "01",
    icon: Brain,
    title: "Machine Learning",
    description: "Exploring the frontiers of AI, from neural networks to predictive modeling and intelligent systems.",
  },
  {
    number: "02",
    icon: Code,
    title: "Web Development",
    description: "Building scalable, modern web applications with cutting-edge technologies and frameworks.",
  },
  {
    number: "03",
    icon: Network,
    title: "DSA & System Design",
    description: "Mastering algorithms and architecting robust, high-performance distributed systems.",
  },
];

const creativeDomains: DomainProps[] = [
  {
    number: "01",
    icon: Palette,
    title: "Graphics & UI/UX",
    description: "Designing intuitive interfaces and stunning visual assets that captivate users.",
  },
  {
    number: "02",
    icon: PenTool,
    title: "Content & Writing",
    description: "Crafting compelling narratives and engaging content that tells our story.",
  },
  {
    number: "03",
    icon: Camera,
    title: "Photo & Video",
    description: "Capturing moments and telling stories through professional visual media.",
  },
  {
    number: "04",
    icon: Megaphone,
    title: "Marketing & PR",
    description: "Managing our public presence and building community engagement.",
  },
];

function DomainCard({ domain, index }: { domain: DomainProps; index: number }) {
  const Icon = domain.icon;
  
  return (
    <motion.div
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
      <div className="relative bg-[var(--surface)] border border-white/5 p-6 md:p-8 transition-all duration-500 hover:border-acm-blue/30 overflow-hidden">
        {/* Corner Accents */}
        <div className="absolute top-0 left-0 w-4 h-4 border-l border-t border-white/10 group-hover:border-acm-blue/40 transition-colors duration-300" />
        <div className="absolute top-0 right-0 w-4 h-4 border-r border-t border-white/10 group-hover:border-acm-blue/40 transition-colors duration-300" />
        <div className="absolute bottom-0 left-0 w-4 h-4 border-l border-b border-white/10 group-hover:border-acm-blue/40 transition-colors duration-300" />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-r border-b border-white/10 group-hover:border-acm-blue/40 transition-colors duration-300" />

        {/* Background Number */}
        <div className="absolute top-4 right-4 select-none pointer-events-none">
          <span 
            className="text-6xl md:text-7xl font-black text-white/3 group-hover:text-acm-blue/10 transition-colors duration-500"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {domain.number}
          </span>
        </div>

        {/* Icon */}
        <div className="relative mb-6">
          <div className="w-12 h-12 flex items-center justify-center bg-white/5 border border-white/10 group-hover:border-acm-blue/30 group-hover:bg-acm-blue/10 transition-all duration-300">
            <Icon className="w-5 h-5 text-white/50 group-hover:text-acm-blue transition-colors duration-300" strokeWidth={1.5} />
          </div>
        </div>

        {/* Content */}
        <div className="relative">
          <h4 
            className="text-xl md:text-2xl font-black text-[var(--foreground)] mb-3 tracking-normal group-hover:text-acm-blue transition-colors duration-300"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {domain.title}
          </h4>
          <p 
            className="text-white/40 text-sm leading-[1.7]"
            style={{ fontFamily: "var(--font-body)" }}
          >
            {domain.description}
          </p>
        </div>

        {/* Bottom Accent Line */}
        <motion.div
          className="absolute bottom-0 left-0 h-0.5 bg-acm-blue/50"
          initial={{ width: 0 }}
          whileInView={{ width: "100%" }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 + 0.3, duration: 0.6 }}
        />

        {/* Hover Glow */}
        <div className="absolute inset-0 bg-acm-blue/0 group-hover:bg-acm-blue/3 transition-colors duration-500 pointer-events-none" />
      </div>
    </motion.div>
  );
}

function DomainSection({ 
  title, 
  domains, 
  gridCols 
}: { 
  title: string; 
  domains: DomainProps[]; 
  gridCols: string;
}) {
  return (
    <div>
      <motion.h3
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-2xl md:text-3xl font-black text-[var(--foreground)] mb-8 tracking-normal"
        style={{ fontFamily: "var(--font-heading)" }}
      >
        {title}
      </motion.h3>
      <div className={`grid ${gridCols} gap-4 md:gap-6`}>
        {domains.map((domain, index) => (
          <DomainCard key={domain.title} domain={domain} index={index} />
        ))}
      </div>
    </div>
  );
}

export default function DomainStackCards() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Stack card transforms for desktop
  const creativeY = useTransform(scrollYProgress, [0, 0.3, 0.6, 1], [200, 80, 60, 60]);
  const techScale = useTransform(scrollYProgress, [0.3, 0.6], [1, 0.98]);

  return (
    <section className="relative w-full bg-[#030303] overflow-hidden py-24 md:py-32">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-acm-blue/5 rounded-full blur-[200px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-purple-900/5 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
        {/* Section Header */}
        <div className="mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-6 mb-6"
          >
            <div className="w-16 md:w-24 h-px bg-linear-to-r from-acm-blue/60 to-transparent" />
            <span 
              className="text-[10px] md:text-[11px] font-light tracking-[0.5em] text-white/30 uppercase"
              style={{ fontFamily: "var(--font-body)" }}
            >
              What We Do
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl lg:text-7xl font-black text-[var(--foreground)] tracking-normal leading-[0.95] mb-6"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            OUR <span className="text-acm-blue">DOMAINS</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white/40 text-sm md:text-base max-w-2xl leading-relaxed"
            style={{ fontFamily: "var(--font-body)" }}
          >
            From cutting-edge technical innovation to creative expression — we cover the full spectrum 
            of skills needed to build impactful digital experiences.
          </motion.p>
        </div>

        {/* Mobile Layout - Simple Stack */}
        <div className="md:hidden space-y-12">
          <DomainSection 
            title="Technical Domains" 
            domains={technicalDomains} 
            gridCols="grid-cols-1" 
          />
          <DomainSection 
            title="Creative Domains" 
            domains={creativeDomains} 
            gridCols="grid-cols-1" 
          />
        </div>

        {/* Desktop Stacked Cards Layout */}
        <div ref={containerRef} className="relative min-h-[150vh] hidden md:block">
          {/* Technical Domains Card - Sticky */}
          <motion.div
            style={{ scale: techScale }}
            className="sticky top-24 z-20 bg-[var(--surface)] border border-white/5 p-8 md:p-12 rounded-sm"
          >
            <DomainSection 
              title="Technical Domains" 
              domains={technicalDomains} 
              gridCols="grid-cols-1 lg:grid-cols-3" 
            />
          </motion.div>

          {/* Creative Domains Card - Overlapping */}
          <motion.div
            style={{ y: creativeY }}
            className="sticky top-32 z-30 bg-[#0f0f0f] border border-white/5 p-8 md:p-12 rounded-sm mt-[-40vh]"
          >
            <DomainSection 
              title="Creative Domains" 
              domains={creativeDomains} 
              gridCols="grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" 
            />
          </motion.div>
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

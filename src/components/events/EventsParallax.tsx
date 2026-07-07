"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";

export default function EventsParallax() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const imageY = useTransform(smoothProgress, [0, 1], ["10%", "-10%"]);
  const textY = useTransform(smoothProgress, [0, 1], ["20%", "-20%"]);
  const opacity = useTransform(smoothProgress, [0, 0.3, 0.7, 1], [0.3, 1, 1, 0.3]);

  return (
    <section
      ref={containerRef}
      className="relative h-[80vh] md:h-[100vh] overflow-hidden bg-[#030303]"
    >
      {/* Parallax Video/Image Container */}
      <motion.div
        style={{ y: imageY }}
        className="absolute inset-0 scale-[1.2]"
      >
        {/* Video Background */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/home/video.mp4" type="video/mp4" />
        </video>

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/60" />

        {/* Blue Tint Overlay */}
        <div className="absolute inset-0 bg-acm-blue/10 mix-blend-overlay" />

        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-linear-to-t from-[#030303] via-transparent to-[#030303]" />
        <div className="absolute inset-0 bg-linear-to-r from-[#030303]/50 via-transparent to-[#030303]/50" />
      </motion.div>

      {/* Grid Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.03) 1px, transparent 0)`,
          backgroundSize: "48px 48px",
        }}
      />

      {/* Content */}
      <motion.div
        style={{ y: textY, opacity }}
        className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center"
      >
        {/* Top Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-4 mb-8"
        >
          <span className="w-8 h-px bg-acm-blue/40" />
          <span
            className="text-[10px] md:text-xs tracking-[0.4em] text-white/40 uppercase"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Innovation Meets Inspiration
          </span>
          <span className="w-8 h-px bg-acm-blue/40" />
        </motion.div>

        {/* Main Text */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-4xl md:text-6xl lg:text-8xl font-black text-[var(--foreground)] leading-tight mb-6"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          EXPERIENCES THAT
          <br />
          <span className="text-transparent bg-clip-text bg-linear-to-r from-acm-blue via-cyan-400 to-acm-blue">
            TRANSFORM
          </span>
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-2xl text-base md:text-lg text-white/50 leading-relaxed"
          style={{ fontFamily: "var(--font-body)" }}
        >
          From hackathons to workshops, our events are designed to push boundaries, 
          spark creativity, and build lasting connections in the tech community.
        </motion.p>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-12 flex items-center gap-12 md:gap-20"
        >
          {[
            { value: "48+", label: "Hours of Events" },
            { value: "25+", label: "Industry Mentors" },
            { value: "₹2L+", label: "Prizes Awarded" },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <span
                className="block text-2xl md:text-4xl font-black text-[var(--foreground)]"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {stat.value}
              </span>
              <span
                className="text-[10px] md:text-xs tracking-wider text-white/40 uppercase"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Corner Decorations */}
      <div className="absolute top-8 left-8 w-16 h-16 border-l border-t border-white/10" />
      <div className="absolute top-8 right-8 w-16 h-16 border-r border-t border-white/10" />
      <div className="absolute bottom-8 left-8 w-16 h-16 border-l border-b border-white/10" />
      <div className="absolute bottom-8 right-8 w-16 h-16 border-r border-b border-white/10" />

      {/* Film Grain */}
      <div
        className="pointer-events-none absolute inset-0 z-20 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
    </section>
  );
}

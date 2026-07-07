"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Mail, Calendar, Users, Home } from "lucide-react";

export default function EventsClosing() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section 
      ref={containerRef}
      className="relative min-h-[80vh] overflow-hidden bg-[#030303] py-32 md:py-40"
    >
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Gradient orbs */}
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-acm-blue/[0.05] rounded-full blur-[200px]" />
        <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-acm-blue/[0.03] rounded-full blur-[180px]" />
        
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
            backgroundSize: "80px 80px",
          }}
        />

        {/* Diagonal lines */}
        <div className="absolute top-0 left-1/4 w-px h-full bg-linear-to-b from-transparent via-white/[0.02] to-transparent" style={{ transform: "rotate(15deg)" }} />
        <div className="absolute top-0 right-1/3 w-px h-full bg-linear-to-b from-transparent via-acm-blue/[0.03] to-transparent" style={{ transform: "rotate(-10deg)" }} />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
        {/* Main content */}
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Section label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-4 mb-8"
          >
            <div className="w-12 md:w-16 h-px bg-linear-to-r from-transparent to-acm-blue/40" />
            <span 
              className="text-[10px] md:text-[11px] tracking-[0.5em] text-acm-blue uppercase"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Be Part of the Journey
            </span>
            <div className="w-12 md:w-16 h-px bg-linear-to-l from-transparent to-acm-blue/40" />
          </motion.div>

          {/* Main heading */}
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-black tracking-normal leading-[0.95] mb-6"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            <span className="text-[var(--foreground)]">DON&apos;T JUST WATCH.</span>
            <br />
            <span 
              style={{
                background: "linear-gradient(135deg, #0085CA 0%, #00A3FF 50%, #0085CA 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              PARTICIPATE.
            </span>
          </motion.h2>

          {/* Accent line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="w-20 h-0.5 bg-linear-to-r from-transparent via-acm-blue to-transparent mb-8"
          />

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-base md:text-lg text-white/40 max-w-2xl leading-relaxed mb-12"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Join GGSIPU EDC ACM Student Chapter and be part of events that shape futures. 
            From hackathons to workshops, every event is an opportunity to learn, connect, and grow.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 md:gap-6 mb-16"
          >
            {/* Primary CTA */}
            <a
              href="mailto:usaracm@ipu.ac.in?subject=Event Inquiry"
              className="group relative px-8 py-4 bg-acm-blue/20 border border-acm-blue/40 hover:bg-acm-blue/30 hover:border-acm-blue/60 transition-all duration-300"
            >
              <span className="relative z-10 flex items-center justify-center gap-3">
                <Mail size={18} className="text-acm-blue" />
                <span 
                  className="text-sm font-medium text-[var(--foreground)] tracking-wide"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  Get Event Updates
                </span>
                <ArrowRight size={16} className="text-acm-blue group-hover:translate-x-1 transition-transform duration-300" />
              </span>
              
              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-3 h-3 border-l-2 border-t-2 border-acm-blue/60" />
              <div className="absolute bottom-0 right-0 w-3 h-3 border-r-2 border-b-2 border-acm-blue/60" />
            </a>

            {/* Secondary CTA - Home Page */}
            <a
              href="/"
              className="group relative px-8 py-4 bg-white/[0.02] border border-white/10 hover:border-white/20 hover:bg-white/[0.04] transition-all duration-300"
            >
              <span className="relative z-10 flex items-center justify-center gap-3">
                <Home size={18} className="text-white/50" />
                <span 
                  className="text-sm font-medium text-white/70 tracking-wide"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  Back to Home
                </span>
              </span>
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex items-center gap-8 md:gap-16 pt-8 border-t border-white/5"
          >
            {[
              { icon: Calendar, value: "11", label: "Events" },
              { icon: Users, value: "1000+", label: "Participants" },
              { icon: Calendar, value: "6", label: "Categories" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.7 + i * 0.1 }}
                className="text-center"
              >
                <div className="flex items-center justify-center gap-2 mb-2">
                  <stat.icon size={16} className="text-acm-blue/60" />
                  <span 
                    className="text-2xl md:text-3xl font-black text-[var(--foreground)]"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {stat.value}
                  </span>
                </div>
                <span 
                  className="text-[10px] tracking-[0.2em] text-white/30 uppercase"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom decorative elements */}
      <div className="absolute bottom-0 left-0 right-0">
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.2, delay: 0.8 }}
          className="h-px bg-linear-to-r from-transparent via-white/10 to-transparent"
        />
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function TeamsClosing() {
  return (
    <section className="relative w-full bg-[#030303] overflow-hidden py-32 md:py-40">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-acm-blue/5 rounded-full blur-[200px]" />
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
        {/* Section Label */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex justify-center mb-8"
        >
          <div className="inline-flex items-center gap-4">
            <div className="w-12 h-px bg-white/10" />
            <span 
              className="text-[10px] md:text-[11px] font-light tracking-[0.5em] text-white/30 uppercase"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Join Our Journey
            </span>
            <div className="w-12 h-px bg-white/10" />
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="text-center max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl lg:text-7xl font-black text-[var(--foreground)] tracking-normal leading-[0.95] mb-6"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            BE PART OF
            <br />
            <span 
              style={{ 
                background: "linear-gradient(135deg, #0085CA 0%, #00A3E0 50%, #0085CA 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              SOMETHING BIGGER
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white/40 text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-12"
            style={{ fontFamily: "var(--font-body)" }}
          >
            We&apos;re always looking for passionate individuals who want to make an impact. 
            Whether you&apos;re a coder, designer, or aspiring leader — there&apos;s a place for you here.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="https://www.acm.org/membership/join"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative px-8 py-4 bg-acm-blue hover:bg-acm-blue/90 transition-all duration-300 overflow-hidden"
            >
              <span 
                className="relative z-10 flex items-center gap-2 text-sm font-medium text-[var(--foreground)] tracking-normal uppercase"
                style={{ fontFamily: "var(--font-body)" }}
              >
                Join ACM
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
              <div className="absolute inset-0 bg-linear-to-r from-white/0 via-white/10 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            </Link>

            <Link
              href="/about"
              className="group px-8 py-4 border border-white/10 hover:border-acm-blue/50 bg-white/2 hover:bg-white/5 transition-all duration-300"
            >
              <span 
                className="flex items-center gap-2 text-sm font-medium text-white/70 group-hover:text-[var(--foreground)] tracking-normal uppercase transition-colors"
                style={{ fontFamily: "var(--font-body)" }}
              >
                Learn More
                <ArrowUpRight className="w-4 h-4 text-acm-blue transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </Link>
          </motion.div>
        </div>

        {/* Decorative Bottom Element */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-20 flex justify-center"
        >
          <div className="flex items-center gap-4">
            <div className="w-16 h-px bg-linear-to-r from-transparent to-white/10" />
            <div className="text-acm-blue text-lg opacity-60">✦</div>
            <div className="w-16 h-px bg-linear-to-l from-transparent to-white/10" />
          </div>
        </motion.div>

        {/* Footer Text */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-12 text-center text-[10px] tracking-[0.4em] text-white/20 uppercase"
          style={{ fontFamily: "var(--font-body)" }}
        >
          GGSIPU EDC ACM Student Chapter • Est. 2024
        </motion.p>
      </div>
    </section>
  );
}

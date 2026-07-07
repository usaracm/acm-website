"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-screen w-full bg-[var(--background)] overflow-hidden overflow-x-hidden">
      {/* Background Video */}
      <div className="absolute inset-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          // @ts-expect-error fetchPriority is valid for video but not typed in React
          fetchPriority="high"
          poster="/home/EDC-poster.webp"
          className="w-full h-full object-cover opacity-60"
        >
          <source src="/home/EDC.mp4" type="video/mp4" />
        </video>
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/60" />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-linear-to-b from-[var(--background)] via-transparent to-[var(--background)]" />
      </div>

      {/* Ambient Glow Orbs */}
      <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] md:w-[600px] md:h-[600px] rounded-full bg-acm-blue/8 blur-[100px] md:blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/3 w-[200px] h-[200px] md:w-[400px] md:h-[400px] rounded-full bg-acm-blue/5 blur-[80px] md:blur-[120px] pointer-events-none" />

      {/* Grid Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Top Navigation Bar */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full px-6 md:px-12 lg:px-20 py-6"
        >
          <div className="max-w-[1400px] mx-auto flex items-center justify-between">
            <Image
              src="/ACM_Logo_white_text.webp"
              alt="ACM"
              width={100}
              height={36}
              className="h-9 w-auto"
              priority
            />
            <div className="hidden md:flex items-center gap-8">
              <span className="text-[11px] tracking-[0.3em] text-white/40 uppercase">GGSIPU East Delhi Campus</span>
              <div className="w-px h-4 bg-white/20" />
              <span className="text-[11px] tracking-[0.3em] text-white/40 uppercase">New Delhi</span>
            </div>
          </div>
        </motion.header>

        {/* Center Content */}
        <div className="flex-1 flex items-center px-6 md:px-12 lg:px-20">
          <div className="max-w-[1400px] mx-auto w-full grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left: Typography */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {/* Pre-title */}
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-px bg-acm-blue" />
                <span className="text-[11px] tracking-[0.5em] text-acm-blue uppercase font-medium">Student Chapter</span>
              </div>

              {/* Main Title */}
              <h1 className="mb-4 sm:mb-6 md:mb-8">
                <span
                  className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-black text-[var(--foreground)] leading-[0.9] tracking-normal"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  GGSIPU
                </span>
                <span
                  className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-black text-white/20 leading-[0.9] tracking-normal"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  EDC
                </span>
                <span
                  className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-black text-acm-blue leading-[0.9] tracking-normal"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  ACM
                </span>
              </h1>

              {/* Description */}
              <p
                className="max-w-md text-sm sm:text-base md:text-lg text-white/50 leading-relaxed mb-8 sm:mb-10"
                style={{ fontFamily: "var(--font-body)" }}
              >
                Empowering students to innovate and lead in computing—transforming ideas into <span className="text-acm-blue font-medium">impact</span>.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 sm:gap-4">
                <Link href="/about">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-6 sm:px-8 py-3 sm:py-4 bg-acm-blue text-white text-sm tracking-[0.2em] uppercase font-medium hover:bg-acm-blue/90 transition-colors cursor-pointer"
                  >
                    Join Community
                  </motion.div>
                </Link>
                <Link href="/events">
                  <motion.span
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="group flex items-center justify-center gap-3 px-6 sm:px-8 py-3 sm:py-4 border border-white/20 text-white/70 text-sm tracking-[0.2em] uppercase hover:border-white/40 hover:text-[var(--foreground)] transition-all cursor-pointer"
                  >
                    <span>Explore Events</span>
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </motion.span>
                </Link>
              </div>
            </motion.div>

            {/* Right: Logo/Visual Element */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="relative hidden lg:flex items-center justify-center"
            >
              {/* Decorative Rings */}
              <div className="absolute w-[500px] h-[500px]">
                <div className="absolute inset-0 border border-white/5 rounded-full" />
                <div className="absolute inset-8 border border-white/5 rounded-full" />
                <div className="absolute inset-16 border border-acm-blue/10 rounded-full" />
                <div className="absolute inset-24 border border-acm-blue/20 rounded-full" />
              </div>

              {/* Center Logo */}
              <div className="relative w-48 h-48 flex items-center justify-center">
                <div className="absolute inset-0 bg-acm-blue/10 rounded-full blur-xl" />
                <Image
                  src="/ACM_Logo_white_text.webp"
                  alt="ACM Logo"
                  width={160}
                  height={160}
                  className="relative z-10 w-32 h-auto"
                />
              </div>

              {/* Floating Stats */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="absolute -left-8 top-1/4 bg-black/80 backdrop-blur-sm border border-white/10 px-6 py-4"
              >
                <span className="block text-3xl font-black text-[var(--foreground)]" style={{ fontFamily: "var(--font-heading)" }}>50+</span>
                <span className="text-[10px] tracking-[0.2em] text-white/40 uppercase">Members</span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.9 }}
                className="absolute -right-4 top-1/2 bg-black/80 backdrop-blur-sm border border-white/10 px-6 py-4"
              >
                <span className="block text-3xl font-black text-[var(--foreground)]" style={{ fontFamily: "var(--font-heading)" }}>25+</span>
                <span className="text-[10px] tracking-[0.2em] text-white/40 uppercase">Events</span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1 }}
                className="absolute left-1/4 -bottom-4 bg-black/80 backdrop-blur-sm border border-white/10 px-6 py-4"
              >
                <span className="block text-3xl font-black text-[var(--foreground)]" style={{ fontFamily: "var(--font-heading)" }}>12+</span>
                <span className="text-[10px] tracking-[0.2em] text-white/40 uppercase">Domains</span>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="w-full px-6 md:px-12 lg:px-20 py-8"
        >
          <div className="max-w-[1400px] mx-auto">
            <div className="flex items-center justify-between pt-6 border-t border-white/10">
              {/* Mobile Stats */}
              <div className="flex gap-4 sm:gap-8 lg:hidden">
                {[{ value: "50+", label: "Members" }, { value: "25+", label: "Events" }, { value: "12+", label: "Domains" }].map((stat) => (
                  <div key={stat.label} className="flex items-baseline gap-1 sm:gap-2">
                    <span className="text-xl sm:text-2xl font-black text-[var(--foreground)]" style={{ fontFamily: "var(--font-heading)" }}>{stat.value}</span>
                    <span className="text-[8px] sm:text-[9px] tracking-[0.15em] sm:tracking-[0.2em] text-white/30 uppercase">{stat.label}</span>
                  </div>
                ))}
              </div>

              {/* Scroll Indicator */}
              <div className="hidden lg:flex items-center gap-4">
                <span className="text-[10px] tracking-[0.3em] text-white/30 uppercase">Scroll to explore</span>
                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  className="w-5 h-8 border border-white/20 rounded-full flex items-start justify-center p-1"
                >
                  <div className="w-1 h-2 bg-acm-blue rounded-full" />
                </motion.div>
              </div>

              {/* Year */}
              <span className="text-[10px] tracking-[0.3em] text-white/20 uppercase">Est. 2024</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

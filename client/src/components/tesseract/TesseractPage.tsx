"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import type { TesseractState } from "./InteractiveTesseract";
import MagneticButton from "./MagneticButton";
import GrainOverlay from "./GrainOverlay";

const InteractiveTesseract = dynamic(() => import("./InteractiveTesseract"), { ssr: false });

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const UNSTOP_URL = "https://unstop.com";

/* ── Section definitions for scroll-based tesseract states ── */

const SECTIONS = {
  hero: { start: 0, end: 0.15 },
  marquee: { start: 0.15, end: 0.25 },
  about: { start: 0.25, end: 0.4 },
  timeline: { start: 0.4, end: 0.6 },
  prizes: { start: 0.6, end: 0.7 },
  faq: { start: 0.7, end: 0.85 },
  cta: { start: 0.85, end: 1 },
};

/* ── Tesseract state interpolation ─────────────────────────── */

function useTesseractState(progress: number): TesseractState {
  return useMemo(() => {
    const p = progress;

    // Hero: Center, medium size, calm rotation
    if (p < SECTIONS.hero.end) {
      const t = p / SECTIONS.hero.end;
      return {
        scale: 1 + t * 0.1,
        positionX: 0,
        positionY: 0,
        rotationSpeed: 0.12,
        morphIntensity: 0.6,
        color: "#0085ca",
        wireOpacity: 0.5,
        nodeOpacity: 0.8,
        explode: 0,
        bloomIntensity: 1,
        chromaticAberration: 0,
      };
    }

    // Marquee: Shrink and move right, gentle rotation
    if (p < SECTIONS.marquee.end) {
      const t = (p - SECTIONS.marquee.start) / (SECTIONS.marquee.end - SECTIONS.marquee.start);
      return {
        scale: 1.1 - t * 0.3,
        positionX: t * 2,
        positionY: t * -0.3,
        rotationSpeed: 0.12 + t * 0.08,
        morphIntensity: 0.6 + t * 0.2,
        color: "#0085ca",
        wireOpacity: 0.4 + t * 0.1,
        nodeOpacity: 0.6,
        explode: 0,
        bloomIntensity: 1 + t * 0.1,
        chromaticAberration: t * 0.15,
      };
    }

    // About: Move to left, expand, show rings
    if (p < SECTIONS.about.end) {
      const t = (p - SECTIONS.about.start) / (SECTIONS.about.end - SECTIONS.about.start);
      return {
        scale: 0.8 + t * 0.3,
        positionX: 2 - t * 4, // Move from right to left (reduced range)
        positionY: -0.3 + t * 0.3,
        rotationSpeed: 0.2 - t * 0.05,
        morphIntensity: 0.8 - t * 0.1,
        color: "#0085ca",
        wireOpacity: 0.5,
        nodeOpacity: 0.7,
        explode: t * 0.1,
        bloomIntensity: 1.1,
        chromaticAberration: 0.15 - t * 0.1,
      };
    }

    // Timeline: Gentle drift, subtle pulse
    if (p < SECTIONS.timeline.end) {
      const t = (p - SECTIONS.timeline.start) / (SECTIONS.timeline.end - SECTIONS.timeline.start);
      return {
        scale: 0.9 + Math.sin(t * Math.PI) * 0.1,
        positionX: -2 + t * 2,
        positionY: 0 + t * -0.8,
        rotationSpeed: 0.15 + t * 0.05,
        morphIntensity: 0.7,
        color: "#0085ca",
        wireOpacity: 0.5,
        nodeOpacity: 0.6 + t * 0.1,
        explode: 0.1 + Math.sin(t * Math.PI) * 0.05,
        bloomIntensity: 1.1,
        chromaticAberration: 0.1,
      };
    }

    // Prizes: Gentle expansion
    if (p < SECTIONS.prizes.end) {
      const t = (p - SECTIONS.prizes.start) / (SECTIONS.prizes.end - SECTIONS.prizes.start);
      return {
        scale: 0.85 + t * 0.15,
        positionX: 0,
        positionY: -0.8 + t * 0.8,
        rotationSpeed: 0.18,
        morphIntensity: 0.8,
        color: "#0085ca",
        wireOpacity: 0.55,
        nodeOpacity: 0.75,
        explode: 0.15 + t * 0.15,
        bloomIntensity: 1.2,
        chromaticAberration: 0.15,
      };
    }

    // FAQ: Drift and subtle pulsing
    if (p < SECTIONS.faq.end) {
      const t = (p - SECTIONS.faq.start) / (SECTIONS.faq.end - SECTIONS.faq.start);
      return {
        scale: 1.0 - t * 0.1,
        positionX: 0,
        positionY: 0,
        rotationSpeed: 0.16,
        morphIntensity: 0.75,
        color: "#0085ca",
        wireOpacity: 0.5,
        nodeOpacity: 0.7,
        explode: 0.2 - t * 0.1,
        bloomIntensity: 1.15,
        chromaticAberration: 0.12,
      };
    }

    // CTA: Centered, subtle glow
    const t = (p - SECTIONS.cta.start) / (SECTIONS.cta.end - SECTIONS.cta.start);
    return {
      scale: 0.9 + t * 0.2,
      positionX: 0,
      positionY: 0,
      rotationSpeed: 0.2,
      morphIntensity: 0.9,
      color: "#0085ca",
      wireOpacity: 0.6,
      nodeOpacity: 0.8,
      explode: 0.1,
      bloomIntensity: 1.3,
      chromaticAberration: 0.2,
    };
  }, [progress]);
}

/* ── Scroll-Reveal Text ─────────────────────────────────────── */

function ScrollWords({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "start 0.4"],
  });

  const words = text.split(" ");

  return (
    <p ref={ref} className={className} style={{ fontFamily: "var(--font-body)" }}>
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;
        return <Word key={`${word}-${i}`} progress={scrollYProgress} range={[start, end]}>{word}</Word>;
      })}
    </p>
  );
}

function Word({ children, progress, range }: { children: string; progress: any; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  const y = useTransform(progress, range, [8, 0]);
  return (
    <motion.span className="inline-block mr-[0.3em]" style={{ opacity, y }}>
      {children}
    </motion.span>
  );
}

/* ── Animated Counter ───────────────────────────────────────── */

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState("0");
  const inView = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !inView.current) {
          inView.current = true;
          let start = 0;
          const duration = 2000;
          const startTime = performance.now();
          
          const animate = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(start + (target - start) * eased);
            setDisplay(current.toLocaleString("en-IN"));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{display}{suffix}</span>;
}

/* ══════════════════════════════════════════════════════════════
   MAIN PAGE COMPONENT
   ══════════════════════════════════════════════════════════════ */

export default function TesseractPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setScrollProgress(v);
  });

  const tesseractState = useTesseractState(scrollProgress);

  // Opacity for tesseract based on scroll - gradual fade out at the end
  const tesseractOpacity = useTransform(
    scrollYProgress,
    [0, 0.05, 0.7, 0.95],
    [1, 1, 0.6, 0]
  );

  return (
    <div ref={containerRef} className="relative">
      {/* ── PERSISTENT TESSERACT BACKGROUND ── */}
      <motion.div
        className="fixed inset-0 z-0 pointer-events-none bg-black"
        style={{ opacity: tesseractOpacity }}
      >
        <InteractiveTesseract state={tesseractState} className="w-full h-full" />
      </motion.div>

      {/* ── GRAIN OVERLAY ── */}
      <div className="fixed inset-0 z-50 pointer-events-none">
        <GrainOverlay />
      </div>

      {/* ══════════════════════════════════════════════════════════
          HERO SECTION
         ══════════════════════════════════════════════════════════ */}
      <section className="relative z-10 h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Vignette overlays */}
        <div className="absolute inset-0 z-1 bg-radial-[ellipse_at_center] from-transparent via-transparent to-black/80 pointer-events-none" />
        <div className="absolute inset-0 z-1 bg-linear-to-b from-black/20 via-transparent to-black/50 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#0085ca]/5 rounded-full blur-[150px] pointer-events-none" />

        <div className="relative z-10 w-full max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20">
          {/* Top bar */}
          <div className="flex items-center justify-between mb-8 md:mb-16">
            <motion.div
              className="flex items-center gap-3"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.5, ease: EASE }}
            >
              <Image
                src="/ACM_White_Logo_transparent_text.webp"
                alt="ACM Logo"
                width={40}
                height={40}
                className="w-8 h-8 md:w-10 md:h-10 object-contain"
              />
              <div className="w-10 h-px bg-[#0085ca]/80" />
              <span className="text-[9px] md:text-[10px] tracking-[0.6em] text-white/70 uppercase" style={{ fontFamily: "var(--font-body)" }}>
                GGSIPU EDC ACM
              </span>
            </motion.div>

            <motion.span
              className="text-[9px] md:text-[10px] tracking-[0.6em] text-white/50 uppercase font-mono"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.5, ease: EASE }}
            >
              22 . 02 . 26
            </motion.span>
          </div>

          {/* Main title */}
          <div className="relative">
            <div className="overflow-hidden">
              <motion.h1
                className="text-[15vw] md:text-[12vw] lg:text-[10vw] font-black leading-[0.85] tracking-[-0.02em]"
                style={{ fontFamily: "var(--font-heading)" }}
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 1.4, delay: 0.1, ease: EASE }}
              >
                <span className="text-white">TESSE</span>
                <span className="text-[#0085ca]">RACT</span>
              </motion.h1>
            </div>
            <div className="overflow-hidden mt-4 md:mt-6">
              <motion.h1
                className="text-[15vw] md:text-[12vw] lg:text-[10vw] font-black leading-[0.85] tracking-[-0.02em] text-[#0085ca]/60"
                style={{ fontFamily: "var(--font-heading)" }}
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 1.4, delay: 0.2, ease: EASE }}
              >
                2026
              </motion.h1>
            </div>

            {/* Floating tagline */}
            <motion.div
              className="absolute right-0 bottom-0 md:bottom-4 max-w-xs md:max-w-sm text-right"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1, ease: EASE }}
            >
              <p className="text-[10px] md:text-xs text-white/75 leading-[1.8] tracking-wide" style={{ fontFamily: "var(--font-body)" }}>
                A Web3 hackathon where builders deploy<br />real projects on the Hela blockchain
              </p>
            </motion.div>
          </div>

          {/* Bottom bar */}
          <div className="flex items-end justify-between mt-8 md:mt-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.2, ease: EASE }}
            >
              <MagneticButton
                href={UNSTOP_URL}
                external
                className="group inline-flex items-center gap-4 px-8 py-4 bg-[#0085ca] text-white font-medium text-xs uppercase tracking-[0.25em] hover:bg-[#0085ca]/85 transition-colors duration-500"
              >
                Register Now
                <svg className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </MagneticButton>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
              className="hidden md:flex flex-col items-center gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 2, ease: EASE }}
            >
              <span className="text-[9px] tracking-[0.4em] text-white/40 uppercase" style={{ fontFamily: "var(--font-body)" }}>
                Scroll
              </span>
              <motion.div
                className="w-px h-12 bg-linear-to-b from-[#0085ca]/60 to-transparent"
                animate={{ scaleY: [1, 0.5, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          MARQUEE SECTION
         ══════════════════════════════════════════════════════════ */}
      <section className="relative z-10 py-8 md:py-12 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-b from-black/50 via-transparent to-black/50 pointer-events-none" />
        
        <motion.div
          className="flex whitespace-nowrap"
          animate={{ x: [0, "-50%"] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center gap-16 px-8">
              <span className="text-[8vw] md:text-[6vw] font-black text-white/6" style={{ fontFamily: "var(--font-heading)" }}>
                TESSERACT
              </span>
              <span className="text-[#0085ca]/30 text-2xl">◆</span>
              <span className="text-[8vw] md:text-[6vw] font-black text-white/6" style={{ fontFamily: "var(--font-heading)" }}>
                HACKATHON
              </span>
              <span className="text-[#0085ca]/30 text-2xl">◇</span>
              <span className="text-[8vw] md:text-[6vw] font-black text-white/6" style={{ fontFamily: "var(--font-heading)" }}>
                WEB3
              </span>
              <span className="text-[#0085ca]/30 text-2xl">○</span>
              <span className="text-[8vw] md:text-[6vw] font-black text-white/6" style={{ fontFamily: "var(--font-heading)" }}>
                HELA
              </span>
              <span className="text-[#0085ca]/30 text-2xl">◆</span>
            </div>
          ))}
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          ABOUT SECTION
         ══════════════════════════════════════════════════════════ */}
      <section id="about" className="relative z-10 w-full py-24 md:py-32 overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute top-1/3 left-0 w-[600px] h-[600px] bg-[#0085ca]/5 rounded-full blur-[250px] pointer-events-none" />

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
          {/* Section label */}
          <motion.div
            className="flex items-center gap-4 mb-16"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: EASE }}
          >
            <div className="w-12 h-px bg-[#0085ca]/60" />
            <span className="text-[10px] tracking-[0.6em] text-white/50 uppercase" style={{ fontFamily: "var(--font-body)" }}>
              About The Event
            </span>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Left: Heading */}
            <div>
              <div className="overflow-hidden mb-6">
                <motion.h2
                  className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[0.9]"
                  style={{ fontFamily: "var(--font-heading)" }}
                  initial={{ y: "100%" }}
                  whileInView={{ y: "0%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, ease: EASE }}
                >
                  MORE THAN
                </motion.h2>
              </div>
              <div className="overflow-hidden mb-6">
                <motion.h2
                  className="text-5xl md:text-6xl lg:text-7xl font-black leading-[0.9]"
                  style={{ fontFamily: "var(--font-heading)", textShadow: "0 0 30px rgba(0, 133, 202, 0.25)" }}
                  initial={{ y: "100%" }}
                  whileInView={{ y: "0%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: 0.1, ease: EASE }}
                >
                  <span className="text-white/35">A</span>{" "}
                  <span className="text-[#0085ca]">HACKATHON</span>
                </motion.h2>
              </div>
            </div>

            {/* Right: Description */}
            <div className="flex flex-col justify-center">
              <ScrollWords
                text="TESSERACT is a Web3 hackathon hosted by GGSIPU EDC ACM in collaboration with Hela Labs. Teams will build real-world projects deployed on the Hela blockchain, competing for prizes worth ₹50,000+ and ecosystem access."
                className="text-lg md:text-xl text-white/80 leading-loose mb-8"
              />

              <motion.div
                className="flex items-center gap-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5, ease: EASE }}
              >
                <div className="w-8 h-px bg-[#0085ca]/50" />
                <span className="text-xs tracking-[0.3em] text-white/50 uppercase" style={{ fontFamily: "var(--font-body)" }}>
                  Build • Deploy • Win
                </span>
              </motion.div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-20">
            {[
              { value: "50K+", label: "Prize Pool" },
              { value: "300+", label: "Participants" },
              { value: "24", label: "Hours" },
              { value: "∞", label: "Possibilities" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                className="group p-6 md:p-8 border border-white/10 hover:border-[#0085ca]/30 bg-black/30 backdrop-blur-sm transition-all duration-500 hover:shadow-[0_0_30px_rgba(0,133,202,0.15)]"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: EASE }}
              >
                <p className="text-4xl md:text-5xl font-black text-white mb-2" style={{ fontFamily: "var(--font-heading)" }}>
                  {stat.value}
                </p>
                <p className="text-[10px] tracking-[0.5em] text-white/40 uppercase" style={{ fontFamily: "var(--font-body)" }}>
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          TIMELINE SECTION
         ══════════════════════════════════════════════════════════ */}
      <section id="timeline" className="relative z-10 w-full py-24 md:py-32 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#0085ca]/4 rounded-full blur-[200px] pointer-events-none" />

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
          {/* Section label */}
          <motion.div
            className="flex items-center gap-4 mb-16"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: EASE }}
          >
            <div className="w-12 h-px bg-[#0085ca]/60" />
            <span className="text-[10px] tracking-[0.6em] text-white/50 uppercase" style={{ fontFamily: "var(--font-body)" }}>
              Event Timeline
            </span>
          </motion.div>

          {/* Heading */}
          <div className="mb-20">
            <div className="overflow-hidden">
              <motion.h2
                className="text-5xl md:text-6xl lg:text-8xl font-black text-white leading-[0.85]"
                style={{ fontFamily: "var(--font-heading)", textShadow: "0 0 35px rgba(0, 133, 202, 0.3)" }}
                initial={{ y: "100%" }}
                whileInView={{ y: "0%" }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: EASE }}
              >
                TWO ROUNDS.
              </motion.h2>
            </div>
            <div className="overflow-hidden">
              <motion.h2
                className="text-5xl md:text-6xl lg:text-8xl font-black leading-[0.85]"
                style={{ fontFamily: "var(--font-heading)" }}
                initial={{ y: "100%" }}
                whileInView={{ y: "0%" }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: 0.1, ease: EASE }}
              >
                <span className="text-[#0085ca]">ONE</span>{" "}
                <span className="text-white/30">WINNER.</span>
              </motion.h2>
            </div>
          </div>

          {/* Round Cards */}
          <div className="space-y-6">
            {[
              {
                number: "01",
                title: "IDEA SCREENING",
                date: "22 Feb 2026",
                mode: "Online",
                description: "Teams submit their vision through PPT presentations. Working prototypes deployed using Hela L1 tokens receive priority in screening.",
                details: ["PPT & idea submission", "Working prototypes preferred", "Deploy using Hela L1 tokens", "Web3 / Blockchain theme"],
                highlight: true,
              },
              {
                number: "02",
                title: "FINAL JUDGEMENT",
                date: "27 Feb 2026",
                mode: "Offline",
                description: "Shortlisted teams present their working projects to a panel of industry judges. Defend your approach. Demonstrate your deployment.",
                details: ["Live project demonstration", "Industry judge panel", "On-campus at GGSIPU EDC", "Prizes, swags & recognition"],
                highlight: false,
              },
            ].map((round, i) => (
              <motion.div
                key={round.number}
                className={`relative p-8 md:p-12 border transition-all duration-500 ${
                  round.highlight ? "border-[#0085ca]/30 bg-[#0085ca]/10 backdrop-blur-sm" : "border-white/10 bg-black/30 backdrop-blur-sm"
                }`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: i * 0.2, ease: EASE }}
              >
                {/* Top glow line */}
                {round.highlight && (
                  <motion.div
                    className="absolute -top-px left-0 right-0 h-px bg-linear-to-r from-transparent via-[#0085ca]/70 to-transparent"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: 0.3, ease: EASE }}
                  />
                )}

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  {/* Left: Round info */}
                  <div className="lg:col-span-5 relative">
                    {/* Watermark */}
                    <span className="absolute -top-4 -left-2 text-[20vw] md:text-[12vw] font-black text-white/3 select-none pointer-events-none" style={{ fontFamily: "var(--font-heading)" }}>
                      {round.number}
                    </span>

                    <div className="relative z-10">
                      <div className="flex items-center gap-3 mb-6">
                        <div className={`w-2 h-2 rounded-full ${round.highlight ? "bg-[#0085ca] shadow-[0_0_8px_rgba(0,133,202,0.6)]" : "bg-white/40"}`} />
                        <span className="text-[10px] tracking-[0.5em] text-white/50 uppercase" style={{ fontFamily: "var(--font-body)" }}>
                          {round.mode} Round
                        </span>
                      </div>

                      <h3 className="text-4xl md:text-5xl font-black text-white leading-[0.9] mb-2" style={{ fontFamily: "var(--font-heading)" }}>
                        ROUND {round.number}
                      </h3>
                      <h4 className={`text-2xl md:text-3xl font-black leading-[0.9] ${round.highlight ? "text-[#0085ca]" : "text-white/50"}`} style={{ fontFamily: "var(--font-heading)" }}>
                        {round.title}
                      </h4>

                      <div className="flex items-center gap-3 mt-4">
                        <div className="w-6 h-px bg-[#0085ca]/40" />
                        <span className="text-xs tracking-[0.3em] text-white/45 uppercase font-mono">
                          {round.date}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Description */}
                  <div className="lg:col-span-7 flex flex-col justify-center">
                    <p className="text-base md:text-lg text-white/75 leading-[1.8] mb-8" style={{ fontFamily: "var(--font-body)" }}>
                      {round.description}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {round.details.map((detail, j) => (
                        <motion.div
                          key={detail}
                          className="flex items-center gap-4 py-3 px-4 border border-white/10 bg-black/30 backdrop-blur-sm"
                          initial={{ opacity: 0, x: 20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.6, delay: 0.5 + j * 0.1, ease: EASE }}
                        >
                          <span className="text-[#0085ca]/50 text-[10px] font-mono">0{j + 1}</span>
                          <span className="text-sm text-white/65" style={{ fontFamily: "var(--font-body)" }}>{detail}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          PRIZES SECTION
         ══════════════════════════════════════════════════════════ */}
      <section id="prizes" className="relative z-10 w-full py-24 md:py-32 overflow-hidden">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#0085ca]/6 rounded-full blur-[200px] pointer-events-none" />

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
          {/* Section label */}
          <motion.div
            className="flex items-center justify-center gap-4 mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: EASE }}
          >
            <div className="w-12 h-px bg-linear-to-r from-transparent to-[#0085ca]/50" />
            <span className="text-[10px] tracking-[0.6em] text-white/50 uppercase" style={{ fontFamily: "var(--font-body)" }}>
              Prize Pool
            </span>
            <div className="w-12 h-px bg-linear-to-l from-transparent to-[#0085ca]/50" />
          </motion.div>

          {/* Heading */}
          <div className="text-center mb-20">
            <div className="overflow-hidden">
              <motion.h2
                className="text-6xl md:text-8xl lg:text-[10vw] font-black text-white leading-[0.85]"
                style={{ fontFamily: "var(--font-heading)", textShadow: "0 0 40px rgba(0, 133, 202, 0.3)" }}
                initial={{ y: "100%" }}
                whileInView={{ y: "0%" }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: EASE }}
              >
                ₹<AnimatedCounter target={50000} />+
              </motion.h2>
            </div>
            <motion.p
              className="text-sm md:text-base text-white/50 mt-6 tracking-wide"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.5, ease: EASE }}
              style={{ fontFamily: "var(--font-body)" }}
            >
              In prizes, swags, and exclusive perks
            </motion.p>
          </div>

          {/* Prize Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
            {[
              { place: "1ST", amount: 25000, label: "Grand Prize", highlight: true, icon: "◆" },
              { place: "2ND", amount: 15000, label: "Runner Up", highlight: false, icon: "◇" },
              { place: "3RD", amount: 10000, label: "Second Runner Up", highlight: false, icon: "○" },
            ].map((prize, i) => (
              <motion.div
                key={prize.place}
                className={`relative p-8 md:p-10 text-center border transition-all duration-500 ${
                  prize.highlight ? "border-[#0085ca]/30 bg-[#0085ca]/10 backdrop-blur-sm shadow-[0_0_40px_rgba(0,133,202,0.2)]" : "border-white/10 bg-black/30 backdrop-blur-sm"
                }`}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: i * 0.15, ease: EASE }}
              >
                {prize.highlight && (
                  <motion.div
                    className="absolute -top-px left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-[#0085ca] to-transparent"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: 0.3, ease: EASE }}
                  />
                )}

                <p className="text-[10px] tracking-[0.6em] text-white/45 uppercase mb-6" style={{ fontFamily: "var(--font-body)" }}>
                  {prize.label}
                </p>

                <motion.span
                  className={`block text-2xl mb-4 ${prize.highlight ? "text-[#0085ca]" : "text-white/20"}`}
                  animate={prize.highlight ? { scale: [1, 1.2, 1], opacity: [0.8, 1, 0.8] } : {}}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  {prize.icon}
                </motion.span>

                <p 
                  className={`text-5xl md:text-6xl font-black mb-3 leading-none ${prize.highlight ? "text-white" : "text-white/75"}`} 
                  style={{ 
                    fontFamily: "var(--font-heading)",
                    textShadow: prize.highlight ? "0 0 30px rgba(0, 133, 202, 0.4)" : "none"
                  }}
                >
                  ₹<AnimatedCounter target={prize.amount} />
                </p>

                <p className="text-[10px] tracking-[0.4em] text-white/35 uppercase" style={{ fontFamily: "var(--font-body)" }}>
                  {prize.place} Place
                </p>
              </motion.div>
            ))}
          </div>

          {/* Perks */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5, ease: EASE }}
          >
            {["ACM merchandise & swag kits", "Certificates for all", "Industry mentor networking", "Hela Labs ecosystem access"].map((perk, i) => (
              <div key={perk} className="p-4 border border-white/10 bg-black/30 backdrop-blur-sm hover:border-[#0085ca]/20 hover:shadow-[0_0_20px_rgba(0,133,202,0.1)] transition-all duration-300">
                <span className="text-[#0085ca]/50 text-sm">✦</span>
                <p className="text-xs text-white/60 mt-2 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>{perk}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          FAQ SECTION
         ══════════════════════════════════════════════════════════ */}
      <section id="faq" className="relative z-10 w-full py-24 md:py-32 overflow-hidden">
        <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20">
          {/* Section label */}
          <motion.div
            className="flex items-center justify-center gap-4 mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: EASE }}
          >
            <div className="w-12 h-px bg-linear-to-r from-transparent to-[#0085ca]/50" />
            <span className="text-[10px] tracking-[0.6em] text-white/50 uppercase" style={{ fontFamily: "var(--font-body)" }}>
              FAQs
            </span>
            <div className="w-12 h-px bg-linear-to-l from-transparent to-[#0085ca]/50" />
          </motion.div>

          {/* Heading */}
          <div className="text-center mb-16">
            <div className="overflow-hidden">
              <motion.h2
                className="text-5xl md:text-7xl lg:text-[8vw] font-black text-white leading-[0.9]"
                style={{ fontFamily: "var(--font-heading)", textShadow: "0 0 35px rgba(0, 133, 202, 0.25)" }}
                initial={{ y: "100%" }}
                whileInView={{ y: "0%" }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: EASE }}
              >
                Got Questions?
              </motion.h2>
            </div>
            <motion.p
              className="text-sm md:text-base text-white/50 mt-6 tracking-wide"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.5, ease: EASE }}
              style={{ fontFamily: "var(--font-body)" }}
            >
              Everything you need to know about TESSERACT 2026
            </motion.p>
          </div>

          {/* FAQ Items */}
          <div className="space-y-4">
            {[
              {
                q: "What is TESSERACT?",
                a: "TESSERACT is a Web3 hackathon where teams build real projects on the Hela blockchain. It's a collaborative event focused on learning, building, and deploying functional blockchain applications."
              },
              {
                q: "Who can participate?",
                a: "Students from all colleges and universities can participate. Teams of 2-4 members are required. Participants should have prior blockchain development experience."
              },
              {
                q: "Do I need prior blockchain experience?",
                a: "Yes, prior blockchain experience is required. Participants should be familiar with Web3 development concepts and blockchain fundamentals to build on the Hela blockchain."
              },
              {
                q: "What should I build?",
                a: "Build any real-world application on the Hela blockchain - DeFi protocols, NFT platforms, DAOs, supply chain solutions, or any innovative Web3 idea. Projects will be judged on innovation, technical execution, and real-world impact."
              },
              {
                q: "How do I register?",
                a: "Register your team of 2-4 members on Unstop before 21st February 2026. Individual registrations are not accepted - you must form a team to participate."
              },
              {
                q: "What's the prize pool?",
                a: "₹50,000+ in cash prizes plus ACM swag kits, certificates, mentorship opportunities, and exclusive access to the Hela Labs ecosystem for all participants."
              },
              {
                q: "Is accommodation provided?",
                a: "The hackathon is in-person at GGSIPU EDC. Accommodation is not provided, but we can help connect outstation participants with local resources."
              },
              {
                q: "What are the important dates?",
                a: "Orientation & Workshop: 22 Feb | Round 1 (Idea Submission): 25 Feb | Round 2 (Project Demo): 27 Feb. Check the timeline section for detailed schedule."
              }
            ].map((faq, i) => (
              <motion.details
                key={i}
                className="group border border-white/10 bg-black/30 backdrop-blur-sm overflow-hidden hover:border-[#0085ca]/20 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: EASE }}
              >
                <summary className="cursor-pointer p-6 md:p-8 flex items-start justify-between gap-4 hover:bg-white/5 transition-colors">
                  <span className="text-base md:text-lg font-semibold text-white/90 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
                    {faq.q}
                  </span>
                  <span className="text-[#0085ca] text-xl group-open:rotate-45 transition-transform duration-300 flex-shrink-0">+</span>
                </summary>
                <div className="px-6 md:px-8 pb-6 md:pb-8 pt-0">
                  <p className="text-sm md:text-base text-white/60 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
                    {faq.a}
                  </p>
                </div>
              </motion.details>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          CTA SECTION
         ══════════════════════════════════════════════════════════ */}
      <section className="relative z-10 w-full min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-radial-[ellipse_at_center] from-[#0085ca]/10 via-transparent to-transparent pointer-events-none" />

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 text-center py-20">
          {/* Label */}
          <motion.div
            className="flex items-center justify-center gap-4 mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <div className="w-12 h-px bg-linear-to-r from-transparent to-[#0085ca]/40" />
            <span className="text-[10px] tracking-[0.6em] text-white/45 uppercase" style={{ fontFamily: "var(--font-body)" }}>
              Don&apos;t Miss Out
            </span>
            <div className="w-12 h-px bg-linear-to-l from-transparent to-[#0085ca]/40" />
          </motion.div>

          {/* Giant headline */}
          <div className="overflow-hidden mb-2">
            <motion.h2
              className="text-[12vw] md:text-[10vw] lg:text-[8vw] font-black text-white leading-[0.85]"
              style={{ fontFamily: "var(--font-heading)" }}
              initial={{ y: "110%" }}
              whileInView={{ y: "0%" }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, ease: EASE }}
            >
              READY TO
            </motion.h2>
          </div>
          <div className="overflow-hidden mb-2">
            <motion.h2
              className="text-[12vw] md:text-[10vw] lg:text-[8vw] font-black leading-[0.85]"
              style={{ fontFamily: "var(--font-heading)", textShadow: "0 0 50px rgba(0, 133, 202, 0.4), 0 0 80px rgba(0, 133, 202, 0.2)" }}
              initial={{ y: "110%" }}
              whileInView={{ y: "0%" }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, delay: 0.1, ease: EASE }}
            >
              <span className="text-[#0085ca]">BUILD</span>
              <span className="text-white/25"> THE</span>
            </motion.h2>
          </div>
          <div className="overflow-hidden mb-12">
            <motion.h2
              className="text-[12vw] md:text-[10vw] lg:text-[8vw] font-black text-white/25 leading-[0.85]"
              style={{ fontFamily: "var(--font-heading)" }}
              initial={{ y: "110%" }}
              whileInView={{ y: "0%" }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, delay: 0.2, ease: EASE }}
            >
              FUTURE?
            </motion.h2>
          </div>

          {/* Subtext */}
          <motion.p
            className="text-sm md:text-base text-white/65 max-w-xl mx-auto mb-12 leading-relaxed"
            style={{ fontFamily: "var(--font-body)" }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5, ease: EASE }}
          >
            Assemble your team. Build on Hela. Compete for ₹50,000+ in prizes.
            Registrations are open — secure your spot.
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.7, ease: EASE }}
            className="inline-block relative"
          >
            <motion.div
              className="absolute inset-0 border border-[#0085ca]/30 pointer-events-none"
              animate={{ scale: [1, 1.15, 1.15], opacity: [0.6, 0, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut" }}
            />

            <MagneticButton
              href={UNSTOP_URL}
              external
              className="group inline-flex items-center gap-4 px-10 py-5 bg-[#0085ca] text-white font-medium text-sm uppercase tracking-[0.25em] hover:bg-[#0085ca]/85 transition-colors duration-500"
            >
              Register on Unstop
              <svg className="w-5 h-5 transition-transform duration-500 group-hover:translate-x-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </MagneticButton>
          </motion.div>

          {/* Footer info */}
          <motion.div
            className="flex items-center justify-center gap-8 mt-20"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 1, ease: EASE }}
          >
            <span className="text-[10px] tracking-[0.4em] text-white/30 uppercase" style={{ fontFamily: "var(--font-body)" }}>
              GGSIPU EDC
            </span>
            <div className="w-1 h-1 bg-[#0085ca]/50 rounded-full" />
            <span className="text-[10px] tracking-[0.4em] text-white/30 uppercase" style={{ fontFamily: "var(--font-body)" }}>
              ACM Student Chapter
            </span>
            <div className="w-1 h-1 bg-[#0085ca]/50 rounded-full" />
            <span className="text-[10px] tracking-[0.4em] text-white/30 uppercase" style={{ fontFamily: "var(--font-body)" }}>
              Hela Labs
            </span>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

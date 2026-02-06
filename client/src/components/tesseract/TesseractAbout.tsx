"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* ── Scroll-driven word reveal ─────────────────────────── */

function Word({
  children,
  progress,
  range,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.12, 1]);
  const y = useTransform(progress, range, [6, 0]);
  return (
    <motion.span className="inline-block mr-[0.3em]" style={{ opacity, y }}>
      {children}
    </motion.span>
  );
}

function ScrollRevealText({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "start 0.25"],
  });

  const words = text.split(" ");

  return (
    <p ref={ref} className={className} style={{ fontFamily: "var(--font-body)" }}>
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;
        return (
          <Word key={`${word}-${i}`} progress={scrollYProgress} range={[start, end]}>
            {word}
          </Word>
        );
      })}
    </p>
  );
}

/* ── Stat Card with animated border ────────────────────── */

function StatCard({
  value,
  label,
  index,
}: {
  value: string;
  label: string;
  index: number;
}) {
  return (
    <motion.div
      className="group relative p-8 md:p-10 border border-white/8 hover:border-[#0085ca]/30 transition-colors duration-700 bg-white/2"
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.9, delay: index * 0.12, ease: EASE }}
    >
      {/* Glow line at top on hover */}
      <div className="absolute -top-px left-0 right-0 h-px bg-linear-to-r from-transparent via-[#0085ca]/0 to-transparent group-hover:via-[#0085ca]/60 transition-all duration-700" />

      <p
        className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-3 leading-none"
        style={{ fontFamily: "var(--font-heading)" }}
      >
        {value}
      </p>
      <p
        className="text-[10px] tracking-[0.5em] text-white/40 uppercase"
        style={{ fontFamily: "var(--font-body)" }}
      >
        {label}
      </p>

      {/* Corner accents */}
      <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-white/6 group-hover:border-[#0085ca]/30 transition-colors duration-700" />
      <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-white/6 group-hover:border-[#0085ca]/30 transition-colors duration-700" />
    </motion.div>
  );
}

/* ── Main About Section ────────────────────────────────── */

export default function TesseractAbout() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const { scrollYProgress: headingProgress } = useScroll({
    target: headingRef,
    offset: ["start 0.9", "start 0.3"],
  });

  const lineScale = useTransform(headingProgress, [0, 1], [0, 1]);
  const parallaxY = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const glowOpacity = useTransform(scrollYProgress, [0.2, 0.5], [0, 1]);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full bg-black py-32 md:py-48 lg:py-64 overflow-hidden"
    >
      {/* Large ambient glow */}
      <motion.div
        className="absolute top-1/4 right-0 w-[800px] h-[800px] bg-[#0085ca]/4 rounded-full blur-[300px] pointer-events-none"
        style={{ y: parallaxY, opacity: glowOpacity }}
      />
      <motion.div
        className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-[#0085ca]/3 rounded-full blur-[250px] pointer-events-none"
        style={{ y: parallaxY }}
      />

      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(0,133,202,0.15) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(0,133,202,0.15) 1px, transparent 1px)`,
          backgroundSize: "120px 120px",
        }}
      />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
        {/* Section label */}
        <motion.div
          className="flex items-center gap-4 mb-20 md:mb-32"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: EASE }}
        >
          <span className="text-[#0085ca] text-sm font-mono font-bold">01</span>
          <div className="w-16 h-px bg-linear-to-r from-[#0085ca]/50 to-transparent" />
          <span
            className="text-[10px] tracking-[0.6em] text-white/50 uppercase"
            style={{ fontFamily: "var(--font-body)" }}
          >
            The Vision
          </span>
        </motion.div>

        {/* Giant heading — dramatic stacking */}
        <div ref={headingRef} className="mb-20 md:mb-32">
          <div className="overflow-hidden">
            <motion.h2
              className="text-[13vw] md:text-[9vw] lg:text-[7vw] font-black text-white leading-[0.85]"
              style={{ fontFamily: "var(--font-heading)" }}
              initial={{ y: "110%" }}
              whileInView={{ y: "0%" }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: EASE }}
            >
              WHERE IDEAS
            </motion.h2>
          </div>
          <div className="overflow-hidden">
            <motion.h2
              className="text-[13vw] md:text-[9vw] lg:text-[7vw] font-black leading-[0.85]"
              style={{ fontFamily: "var(--font-heading)" }}
              initial={{ y: "110%" }}
              whileInView={{ y: "0%" }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.1, ease: EASE }}
            >
              <span className="text-white">BECOME </span>
              <span className="text-[#0085ca]">REALITY</span>
            </motion.h2>
          </div>
          <div className="overflow-hidden">
            <motion.h2
              className="text-[13vw] md:text-[9vw] lg:text-[7vw] font-black text-white/15 leading-[0.85]"
              style={{ fontFamily: "var(--font-heading)" }}
              initial={{ y: "110%" }}
              whileInView={{ y: "0%" }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.2, ease: EASE }}
            >
              ON-CHAIN
            </motion.h2>
          </div>

          {/* Animated line divider — glowing */}
          <motion.div
            className="w-full h-px mt-12 origin-left bg-linear-to-r from-[#0085ca]/50 via-white/15 to-transparent"
            style={{ scaleX: lineScale }}
          />
        </div>

        {/* Scroll-revealed description */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8">
          <div className="lg:col-span-3">
            <motion.p
              className="text-[10px] tracking-[0.5em] text-white/40 uppercase sticky top-32"
              style={{ fontFamily: "var(--font-body)" }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              About the
              <br />
              hackathon
            </motion.p>
          </div>

          <div className="lg:col-span-9">
            <ScrollRevealText
              text="TESSERACT is the flagship hackathon by GGSIPU EDC ACM — a convergence of ideas, code, and blockchain innovation. In collaboration with Hela Labs, participants build and deploy real-world projects on the Hela L1 blockchain, pushing the boundaries of what's possible in decentralized technology."
              className="text-xl md:text-2xl lg:text-[1.85rem] text-white/95 leading-[1.7] md:leading-[1.6] mb-16"
            />

            <ScrollRevealText
              text="This isn't just another hackathon. It's a proving ground where working prototypes matter, where the best ideas get deployed on-chain, and where the future of Web3 is built by students who refuse to wait for permission."
              className="text-base md:text-lg text-white/75 leading-[1.8] mb-24"
            />
          </div>
        </div>

        {/* Stats grid — dramatic cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {[
            { value: "500+", label: "Participants" },
            { value: "₹50K+", label: "Prize Pool" },
            { value: "02", label: "Rounds" },
            { value: "∞", label: "Possibilities" },
          ].map((stat, i) => (
            <StatCard
              key={stat.label}
              value={stat.value}
              label={stat.label}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

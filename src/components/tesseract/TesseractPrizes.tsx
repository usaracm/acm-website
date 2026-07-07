"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView, useSpring, useMotionValue, useScroll, useTransform } from "framer-motion";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* ── Animated Counter ──────────────────────────────────── */

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const motionVal = useMotionValue(0);
  const spring = useSpring(motionVal, { stiffness: 40, damping: 20, mass: 1 });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (isInView) {
      motionVal.set(target);
    }
  }, [isInView, target, motionVal]);

  useEffect(() => {
    const unsubscribe = spring.on("change", (v) => {
      setDisplay(Math.round(v).toLocaleString("en-IN"));
    });
    return unsubscribe;
  }, [spring]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

/* ── Prize data ────────────────────────────────────────── */

const prizes = [
  {
    place: "1ST",
    amount: 25000,
    label: "Grand Prize",
    highlight: true,
    icon: "◆",
  },
  {
    place: "2ND",
    amount: 15000,
    label: "Runner Up",
    highlight: false,
    icon: "◇",
  },
  {
    place: "3RD",
    amount: 10000,
    label: "Second Runner Up",
    highlight: false,
    icon: "○",
  },
];

const perks = [
  { text: "ACM merchandise & exclusive swag kits", icon: "✦" },
  { text: "Certificates for all participants", icon: "✦" },
  { text: "Networking with industry mentors", icon: "✦" },
  { text: "Hela Labs ecosystem access & resources", icon: "✦" },
];

/* ── Prize Card ────────────────────────────────────────── */

function PrizeCard({
  prize,
  index,
}: {
  prize: (typeof prizes)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      className={`group relative p-8 md:p-10 lg:p-12 text-center border transition-all duration-700 ${
        prize.highlight
          ? "border-[#0085ca]/30 bg-[#0085ca]/4 hover:border-[#0085ca]/50"
          : "border-white/8 bg-white/2 hover:border-white/20"
      }`}
      initial={{ opacity: 0, y: 60, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 1, delay: index * 0.15, ease: EASE }}
    >
      {/* Grand prize — animated top glow line */}
      {prize.highlight && (
        <motion.div
          className="absolute -top-px left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-[#0085ca] to-transparent"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={isInView ? { scaleX: 1, opacity: 1 } : {}}
          transition={{ duration: 1.2, delay: 0.5, ease: EASE }}
        />
      )}

      {/* Place label */}
      <p
        className="text-[10px] tracking-[0.6em] text-white/45 uppercase mb-8"
        style={{ fontFamily: "var(--font-body)" }}
      >
        {prize.label}
      </p>

      {/* Decorative icon */}
      <motion.span
        className={`block text-2xl mb-6 ${
          prize.highlight ? "text-[#0085ca]" : "text-white/20"
        }`}
        animate={prize.highlight ? { 
          scale: [1, 1.2, 1],
          opacity: [0.8, 1, 0.8],
        } : {}}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        {prize.icon}
      </motion.span>

      {/* Amount — the star of the show */}
      <p
        className={`text-5xl md:text-6xl lg:text-7xl font-black mb-4 leading-none ${
          prize.highlight ? "text-white" : "text-white/80"
        }`}
        style={{ fontFamily: "var(--font-heading)" }}
      >
        ₹<AnimatedCounter target={prize.amount} />
      </p>

      {/* Subtitle */}
      <p
        className="text-[10px] tracking-[0.4em] text-white/35 uppercase mt-4"
        style={{ fontFamily: "var(--font-body)" }}
      >
        {prize.place} Place + Swags + Goodies
      </p>

      {/* Corner marks for highlight */}
      {prize.highlight && (
        <>
          <div className="absolute top-3 left-3 w-4 h-4 border-t border-l border-[#0085ca]/40" />
          <div className="absolute top-3 right-3 w-4 h-4 border-t border-r border-[#0085ca]/40" />
          <div className="absolute bottom-3 left-3 w-4 h-4 border-b border-l border-[#0085ca]/40" />
          <div className="absolute bottom-3 right-3 w-4 h-4 border-b border-r border-[#0085ca]/40" />
        </>
      )}
    </motion.div>
  );
}

/* ── Prizes Section ────────────────────────────────────── */

export default function TesseractPrizes() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const glowScale = useTransform(scrollYProgress, [0.1, 0.4], [0.5, 1]);
  const glowOpacity = useTransform(scrollYProgress, [0.1, 0.4], [0, 1]);

  return (
    <section
      id="prizes"
      ref={sectionRef}
      className="relative w-full bg-black py-32 md:py-48 lg:py-64 overflow-hidden"
    >
      {/* Center glow that scales in */}
      <motion.div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[#0085ca]/5 rounded-full blur-[300px] pointer-events-none"
        style={{ scale: glowScale, opacity: glowOpacity }}
      />

      {/* Grid background */}
      <div
        className="absolute inset-0 opacity-[0.018]"
        style={{
          backgroundImage: `linear-gradient(rgba(0,133,202,0.12) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(0,133,202,0.12) 1px, transparent 1px)`,
          backgroundSize: "100px 100px",
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
          <span className="text-[#0085ca] text-sm font-mono font-bold">03</span>
          <div className="w-16 h-px bg-linear-to-r from-[#0085ca]/50 to-transparent" />
          <span
            className="text-[10px] tracking-[0.6em] text-white/50 uppercase"
            style={{ fontFamily: "var(--font-body)" }}
          >
            What You Win
          </span>
        </motion.div>

        {/* Giant prize amount — the centerpiece */}
        <div className="text-center mb-24 md:mb-40">
          <motion.p
            className="text-[11px] tracking-[0.7em] text-white/45 uppercase mb-8"
            style={{ fontFamily: "var(--font-body)" }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            Total Prize Pool
          </motion.p>

          <div className="overflow-hidden">
            <motion.h2
              className="text-[20vw] md:text-[14vw] lg:text-[11vw] font-black text-white leading-[0.85]"
              style={{ fontFamily: "var(--font-heading)" }}
              initial={{ y: "110%" }}
              whileInView={{ y: "0%" }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, ease: EASE }}
            >
              ₹<AnimatedCounter target={50000} suffix="+" />
            </motion.h2>
          </div>

          <motion.div
            className="flex items-center justify-center gap-4 mt-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <div className="w-8 h-px bg-[#0085ca]/30" />
            <p
              className="text-[10px] tracking-[0.5em] text-white/35 uppercase"
              style={{ fontFamily: "var(--font-body)" }}
            >
              In Cash Prizes & Rewards
            </p>
            <div className="w-8 h-px bg-[#0085ca]/30" />
          </motion.div>
        </div>

        {/* Prize tiers — dramatic cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-24 md:mb-40">
          {prizes.map((prize, i) => (
            <PrizeCard key={prize.place} prize={prize} index={i} />
          ))}
        </div>

        {/* Beyond the Prizes — perks section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-4">
            <div className="overflow-hidden">
              <motion.h3
                className="text-4xl md:text-5xl font-black text-white leading-[0.9]"
                style={{ fontFamily: "var(--font-heading)" }}
                initial={{ y: "110%" }}
                whileInView={{ y: "0%" }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: EASE }}
              >
                BEYOND
              </motion.h3>
            </div>
            <div className="overflow-hidden">
              <motion.h3
                className="text-4xl md:text-5xl font-black text-white/20 leading-[0.9]"
                style={{ fontFamily: "var(--font-heading)" }}
                initial={{ y: "110%" }}
                whileInView={{ y: "0%" }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.1, ease: EASE }}
              >
                THE PRIZES
              </motion.h3>
            </div>
          </div>

          <div className="lg:col-span-7 lg:col-start-6 flex flex-col gap-3">
            {perks.map((perk, i) => (
              <motion.div
                key={perk.text}
                className="group flex items-center gap-5 py-5 px-6 border border-white/5 hover:border-white/15 bg-white/1 hover:bg-white/3 transition-all duration-700"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.1, ease: EASE }}
              >
                <span className="text-[#0085ca]/50 text-xs group-hover:text-[#0085ca]/80 transition-colors duration-500">
                  {perk.icon}
                </span>
                <span
                  className="text-sm text-white/50 group-hover:text-white/80 transition-colors duration-500"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {perk.text}
                </span>
                <div className="ml-auto w-4 h-px bg-white/10 group-hover:w-8 group-hover:bg-[#0085ca]/40 transition-all duration-500" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

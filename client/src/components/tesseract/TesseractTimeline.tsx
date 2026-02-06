"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

interface Round {
  number: string;
  title: string;
  date: string;
  mode: string;
  description: string;
  details: string[];
}

const rounds: Round[] = [
  {
    number: "01",
    title: "Idea Screening",
    date: "22 Feb 2026",
    mode: "Online",
    description:
      "Teams submit their vision through PPT presentations. Working prototypes deployed using Hela L1 tokens receive priority in screening. This is where ideas qualify to become reality.",
    details: [
      "PPT & idea submission",
      "Working prototypes preferred",
      "Deploy using Hela L1 tokens",
      "Web3 / Blockchain theme",
    ],
  },
  {
    number: "02",
    title: "Final Judgement",
    date: "27 Feb 2026",
    mode: "Offline",
    description:
      "Shortlisted teams present their working projects to a panel of industry judges. Defend your approach. Demonstrate your deployment. Compete for the grand prize.",
    details: [
      "Live project demonstration",
      "Industry judge panel",
      "On-campus at GGSIPU EDC",
      "Prizes, swags & recognition",
    ],
  },
];

/* ── Single Round Panel — dramatic full-width card ─────── */

function RoundPanel({ round, index }: { round: Round; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const isFirst = index === 0;

  return (
    <motion.div
      ref={ref}
      className="relative"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 1, ease: EASE }}
    >
      {/* The card */}
      <div
        className={`relative p-8 md:p-12 lg:p-16 border ${
          isFirst
            ? "border-[#0085ca]/25 bg-[#0085ca]/3"
            : "border-white/8 bg-white/2"
        }`}
      >
        {/* Animated top border glow */}
        <motion.div
          className={`absolute -top-px left-0 right-0 h-px ${
            isFirst
              ? "bg-linear-to-r from-transparent via-[#0085ca]/70 to-transparent"
              : "bg-linear-to-r from-transparent via-white/20 to-transparent"
          }`}
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.5, delay: 0.3, ease: EASE }}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          {/* Left: Round info */}
          <div className="lg:col-span-5 relative">
            {/* Giant watermark number */}
            <motion.span
              className="absolute -top-6 -left-2 md:-top-10 md:-left-4 text-[25vw] md:text-[15vw] lg:text-[10vw] font-black leading-none text-white/4 select-none pointer-events-none"
              style={{ fontFamily: "var(--font-heading)" }}
              initial={{ opacity: 0, x: -40 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1.5, delay: 0.2, ease: EASE }}
            >
              {round.number}
            </motion.span>

            <div className="relative z-10">
              {/* Mode badge */}
              <motion.div
                className="flex items-center gap-3 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
              >
                <div
                  className={`w-2 h-2 rounded-full ${
                    isFirst ? "bg-[#0085ca] shadow-[0_0_8px_rgba(0,133,202,0.6)]" : "bg-white/40"
                  }`}
                />
                <span
                  className="text-[10px] tracking-[0.5em] text-white/50 uppercase"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {round.mode} Round
                </span>
              </motion.div>

              {/* Round title */}
              <div className="overflow-hidden mb-2">
                <motion.h3
                  className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[0.85]"
                  style={{ fontFamily: "var(--font-heading)" }}
                  initial={{ y: "110%" }}
                  animate={isInView ? { y: "0%" } : {}}
                  transition={{ duration: 1.2, delay: 0.3, ease: EASE }}
                >
                  ROUND {round.number}
                </motion.h3>
              </div>
              <div className="overflow-hidden">
                <motion.h4
                  className={`text-3xl md:text-4xl lg:text-5xl font-black leading-[0.9] ${
                    isFirst ? "text-[#0085ca]" : "text-white/60"
                  }`}
                  style={{ fontFamily: "var(--font-heading)" }}
                  initial={{ y: "110%" }}
                  animate={isInView ? { y: "0%" } : {}}
                  transition={{ duration: 1.2, delay: 0.4, ease: EASE }}
                >
                  {round.title.toUpperCase()}
                </motion.h4>
              </div>

              {/* Date */}
              <motion.div
                className="flex items-center gap-3 mt-6"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.6, ease: EASE }}
              >
                <div className="w-6 h-px bg-[#0085ca]/40" />
                <span
                  className="text-xs tracking-[0.3em] text-white/45 uppercase font-mono"
                >
                  {round.date}
                </span>
              </motion.div>
            </div>
          </div>

          {/* Right: Description + details */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <motion.p
              className="text-base md:text-lg lg:text-xl text-white/80 leading-[1.8] mb-10"
              style={{ fontFamily: "var(--font-body)" }}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.5, ease: EASE }}
            >
              {round.description}
            </motion.p>

            {/* Detail list with animated reveals */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {round.details.map((detail, i) => (
                <motion.div
                  key={detail}
                  className="group flex items-center gap-4 py-3 px-4 border border-white/5 hover:border-white/15 bg-white/1 hover:bg-white/3 transition-all duration-500"
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.7 + i * 0.1, ease: EASE }}
                >
                  <span className="text-[#0085ca]/60 text-[10px] font-mono shrink-0">
                    0{i + 1}
                  </span>
                  <span
                    className="text-sm text-white/70 group-hover:text-white transition-colors duration-500"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {detail}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Corner marks */}
        {isFirst && (
          <>
            <div className="absolute top-3 left-3 w-3 h-3 border-t border-l border-[#0085ca]/30" />
            <div className="absolute top-3 right-3 w-3 h-3 border-t border-r border-[#0085ca]/30" />
            <div className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-[#0085ca]/30" />
            <div className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-[#0085ca]/30" />
          </>
        )}
      </div>
    </motion.div>
  );
}

/* ── Timeline Section ──────────────────────────────────── */

export default function TesseractTimeline() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const lineHeight = useTransform(scrollYProgress, [0.1, 0.9], ["0%", "100%"]);

  return (
    <section
      id="rounds"
      ref={sectionRef}
      className="relative w-full bg-[#020204] py-32 md:py-48 overflow-hidden"
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `linear-gradient(rgba(0,133,202,0.12) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(0,133,202,0.12) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#0085ca]/4 rounded-full blur-[200px] pointer-events-none" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
        {/* Section label */}
        <motion.div
          className="flex items-center gap-4 mb-20 md:mb-32"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: EASE }}
        >
          <span className="text-[#0085ca] text-sm font-mono font-bold">02</span>
          <div className="w-16 h-px bg-linear-to-r from-[#0085ca]/50 to-transparent" />
          <span
            className="text-[10px] tracking-[0.6em] text-white/50 uppercase"
            style={{ fontFamily: "var(--font-body)" }}
          >
            The Rounds
          </span>
        </motion.div>

        {/* Heading */}
        <div className="mb-20 md:mb-32">
          <div className="overflow-hidden">
            <motion.h2
              className="text-[14vw] md:text-[9vw] lg:text-[7vw] font-black text-white leading-[0.85]"
              style={{ fontFamily: "var(--font-heading)" }}
              initial={{ y: "110%" }}
              whileInView={{ y: "0%" }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: EASE }}
            >
              TWO ROUNDS.
            </motion.h2>
          </div>
          <div className="overflow-hidden">
            <motion.h2
              className="text-[14vw] md:text-[9vw] lg:text-[7vw] font-black text-white/15 leading-[0.85]"
              style={{ fontFamily: "var(--font-heading)" }}
              initial={{ y: "110%" }}
              whileInView={{ y: "0%" }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.1, ease: EASE }}
            >
              ONE CHAMPION.
            </motion.h2>
          </div>
        </div>

        {/* Rounds with scroll progress */}
        <div className="relative">
          {/* Vertical progress line (desktop) */}
          <div className="hidden lg:block absolute left-0 top-0 bottom-0 w-px bg-white/6">
            <motion.div
              className="w-full bg-[#0085ca]/50 origin-top"
              style={{ height: lineHeight }}
            />
          </div>

          {/* Round panels */}
          <div className="lg:pl-16 flex flex-col gap-12 md:gap-16">
            {rounds.map((round, i) => (
              <RoundPanel key={round.number} round={round} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

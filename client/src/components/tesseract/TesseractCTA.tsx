"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import MagneticButton from "./MagneticButton";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const UNSTOP_URL = "https://unstop.com";

export default function TesseractCTA() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgOpacity = useTransform(scrollYProgress, [0.1, 0.4], [0, 1]);
  const textScale = useTransform(scrollYProgress, [0.2, 0.5], [0.9, 1]);
  const glowScale = useTransform(scrollYProgress, [0.1, 0.5], [0.3, 1]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen flex items-center justify-center bg-black overflow-hidden"
    >
      {/* Massive background glow that fades in on scroll */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ opacity: bgOpacity }}
      >
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-[#0085ca]/8 rounded-full blur-[300px]"
          style={{ scale: glowScale }}
        />
      </motion.div>

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(0,133,202,0.12) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(0,133,202,0.12) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Radial fade */}
      <div className="absolute inset-0 bg-radial-[ellipse_at_center] from-transparent via-transparent to-black/50 pointer-events-none" />

      {/* Content */}
      <motion.div
        className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 text-center py-20"
        style={{ scale: textScale }}
      >
        {/* Label */}
        <motion.div
          className="flex items-center justify-center gap-4 mb-14 md:mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <div className="w-12 h-px bg-linear-to-r from-transparent to-[#0085ca]/40" />
          <span
            className="text-[10px] tracking-[0.6em] text-white/45 uppercase"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Don&apos;t Miss Out
          </span>
          <div className="w-12 h-px bg-linear-to-l from-transparent to-[#0085ca]/40" />
        </motion.div>

        {/* Giant headline — high contrast with strategic color pops */}
        <div className="overflow-hidden mb-2">
          <motion.h2
            className="text-[15vw] md:text-[11vw] lg:text-[9vw] font-black text-white leading-[0.82]"
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
            className="text-[15vw] md:text-[11vw] lg:text-[9vw] font-black leading-[0.82]"
            style={{ fontFamily: "var(--font-heading)" }}
            initial={{ y: "110%" }}
            whileInView={{ y: "0%" }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, delay: 0.1, ease: EASE }}
          >
            <span className="text-[#0085ca]">BUILD</span>
            <span className="text-white/25"> THE</span>
          </motion.h2>
        </div>
        <div className="overflow-hidden mb-14 md:mb-20">
          <motion.h2
            className="text-[15vw] md:text-[11vw] lg:text-[9vw] font-black text-white/25 leading-[0.82]"
            style={{ fontFamily: "var(--font-heading)" }}
            initial={{ y: "110%" }}
            whileInView={{ y: "0%" }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, delay: 0.2, ease: EASE }}
          >
            FUTURE?
          </motion.h2>
        </div>

        {/* Sub text — readable contrast */}
        <motion.p
          className="text-sm md:text-base lg:text-lg text-white/70 max-w-xl mx-auto mb-16 leading-relaxed"
          style={{ fontFamily: "var(--font-body)" }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5, ease: EASE }}
        >
          Assemble your team. Build on Hela. Compete for ₹50,000+ in prizes.
          Registrations are open — secure your spot.
        </motion.p>

        {/* CTA button with pulse ring */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.7, ease: EASE }}
          className="inline-block relative"
        >
          {/* Pulse ring */}
          <motion.div
            className="absolute inset-0 border border-[#0085ca]/30 pointer-events-none"
            animate={{
              scale: [1, 1.15, 1.15],
              opacity: [0.6, 0, 0],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeOut",
            }}
          />

          <MagneticButton
            href={UNSTOP_URL}
            external
            strength={0.4}
            className="group relative inline-flex items-center gap-4 px-14 py-7 bg-[#0085ca] text-white font-semibold text-sm uppercase tracking-[0.3em] hover:bg-[#0085ca]/85 transition-colors duration-500"
          >
            Register on Unstop
            <svg
              className="w-5 h-5 transition-transform duration-500 group-hover:translate-x-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </MagneticButton>
        </motion.div>

        {/* Bottom signature */}
        <motion.div
          className="flex items-center justify-center gap-4 mt-24 md:mt-36"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 1 }}
        >
          <div className="w-16 h-px bg-linear-to-r from-transparent to-white/10" />
          <span
            className="text-[9px] tracking-[0.5em] text-white/25 uppercase"
            style={{ fontFamily: "var(--font-body)" }}
          >
            GGSIPU EDC ACM × Hela Labs
          </span>
          <div className="w-16 h-px bg-linear-to-l from-transparent to-white/10" />
        </motion.div>
      </motion.div>

      {/* Corner accents — glowing */}
      <motion.div
        className="absolute top-8 left-8 w-5 h-5 border-t border-l border-[#0085ca]/15 z-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1.5, duration: 1 }}
      />
      <motion.div
        className="absolute top-8 right-8 w-5 h-5 border-t border-r border-[#0085ca]/15 z-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1.5, duration: 1 }}
      />
      <motion.div
        className="absolute bottom-8 left-8 w-5 h-5 border-b border-l border-[#0085ca]/15 z-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1.5, duration: 1 }}
      />
      <motion.div
        className="absolute bottom-8 right-8 w-5 h-5 border-b border-r border-[#0085ca]/15 z-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1.5, duration: 1 }}
      />
    </section>
  );
}

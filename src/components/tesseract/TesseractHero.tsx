"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import { motion, useScroll, useTransform } from "framer-motion";
import MagneticButton from "./MagneticButton";

const TesseractScene = dynamic(() => import("./TesseractScene"), { ssr: false });

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const UNSTOP_URL = "https://unstop.com";

export default function TesseractHero() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.7], [0, 150]);
  const sceneScale = useTransform(scrollYProgress, [0, 0.7], [1, 1.3]);
  const sceneOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative h-[200vh] w-full bg-black overflow-hidden"
    >
      {/* ── 3D Scene (fixed background to prevent sticky jitter) ── */}
      <motion.div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{ opacity: sceneOpacity }}
      >
        <TesseractScene className="w-full h-full" />
      </motion.div>

      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        {/* ── Vignette overlays ── */}
        <div className="absolute inset-0 z-1 bg-radial-[ellipse_at_center] from-transparent via-transparent to-black/80 pointer-events-none" />
        <div className="absolute inset-0 z-1 bg-linear-to-b from-black/30 via-transparent to-black/60 pointer-events-none" />

        {/* ── Content ── */}
        <motion.div
          className="relative z-10 w-full max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20"
          style={{ opacity, y: textY }}
        >
          {/* Top bar: label + date */}
          <div className="flex items-center justify-between mb-12 md:mb-20">
            <motion.div
              className="flex items-center gap-3"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.8, ease: EASE }}
            >
              <div className="w-10 h-px bg-[#0085ca]/80" />
              <span
                className="text-[9px] md:text-[10px] tracking-[0.6em] text-white/70 uppercase"
                style={{ fontFamily: "var(--font-body)" }}
              >
                GGSIPU EDC ACM
              </span>
            </motion.div>

            <motion.span
              className="text-[9px] md:text-[10px] tracking-[0.6em] text-white/50 uppercase font-mono"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.8, ease: EASE }}
            >
              22 . 02 . 26
            </motion.span>
          </div>

          {/* Main title — viewport-filling typography */}
          <div className="relative">
            {/* "TESSERACT" massive display */}
            <div className="overflow-hidden">
              <motion.h1
                className="text-[20vw] md:text-[16vw] lg:text-[14vw] font-black leading-[0.82] tracking-[-0.02em] text-white"
                style={{ fontFamily: "var(--font-heading)" }}
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 1.4, delay: 0.2, ease: EASE }}
              >
                TESSE
              </motion.h1>
            </div>
            <div className="overflow-hidden -mt-[1vw]">
              <motion.h1
                className="text-[20vw] md:text-[16vw] lg:text-[14vw] font-black leading-[0.82] tracking-[-0.02em]"
                style={{ fontFamily: "var(--font-heading)" }}
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 1.4, delay: 0.35, ease: EASE }}
              >
                <span className="text-white/40">RA</span>
                <span className="text-[#0085ca]">CT</span>
              </motion.h1>
            </div>

            {/* Floating tagline positioned over the title */}
            <motion.div
              className="absolute right-0 bottom-0 md:bottom-4 max-w-xs md:max-w-sm text-right"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.2, ease: EASE }}
            >
              <p
                className="text-[10px] md:text-xs text-white/80 leading-[1.8] tracking-wide"
                style={{ fontFamily: "var(--font-body)" }}
              >
                A Web3 hackathon where builders deploy
                <br />
                real projects on the Hela blockchain
              </p>
            </motion.div>
          </div>

          {/* Bottom bar: CTA + scroll hint */}
          <div className="flex items-end justify-between mt-12 md:mt-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.5, ease: EASE }}
            >
              <MagneticButton
                href={UNSTOP_URL}
                external
                className="group inline-flex items-center gap-4 px-8 py-4 bg-[#0085ca] text-white font-medium text-xs uppercase tracking-[0.25em] hover:bg-[#0085ca]/85 transition-colors duration-500"
              >
                Register Now
                <svg
                  className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </MagneticButton>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
              className="hidden md:flex flex-col items-center gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.2, duration: 1.5 }}
            >
              <span
                className="text-[8px] tracking-[0.5em] text-white/20 uppercase"
                style={{ fontFamily: "var(--font-body)", writingMode: "vertical-rl" }}
              >
                Scroll
              </span>
              <motion.div
                className="w-px h-12 bg-linear-to-b from-white/30 to-transparent"
                animate={{ scaleY: [1, 0.4, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
          </div>
        </motion.div>

        {/* Corner accents */}
        <motion.div
          className="absolute top-6 left-6 w-6 h-6 border-t border-l border-white/10 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
        />
        <motion.div
          className="absolute top-6 right-6 w-6 h-6 border-t border-r border-white/10 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
        />
        <motion.div
          className="absolute bottom-6 left-6 w-6 h-6 border-b border-l border-white/10 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
        />
        <motion.div
          className="absolute bottom-6 right-6 w-6 h-6 border-b border-r border-white/10 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
        />
      </div>
    </section>
  );
}

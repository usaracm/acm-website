"use client";

import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef } from "react";
import { WordReveal } from "../TextReveal";

interface StoryTransitionProps {
  topLabel?: string;
  mainText: string;
  subText?: string;
  accentWord?: string;
}

export default function StoryTransition({
  topLabel = "Chapter",
  mainText,
  subText,
  accentWord,
}: StoryTransitionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(textRef, { once: true, amount: 0.3 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Parallax effects
  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);

  // Split mainText to find and highlight accent word
  const renderMainText = () => {
    if (!accentWord) {
      return <WordReveal text={mainText} />;
    }

    const parts = mainText.split(new RegExp(`(${accentWord})`, "i"));
    return parts.map((part, i) => {
      if (part.toLowerCase() === accentWord.toLowerCase()) {
        return (
          <span key={i} className="text-acm-blue">
            <WordReveal text={part} delay={0.3} />
          </span>
        );
      }
      return <WordReveal key={i} text={part} delay={i * 0.1} />;
    });
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[50vh] sm:min-h-[60vh] flex items-center justify-center bg-[#030303] overflow-hidden py-20 sm:py-32 md:py-48"
    >
      {/* Background Decorative Elements */}
      <motion.div
        style={{ y: y1, opacity }}
        className="absolute top-1/4 left-10 w-64 h-64 border border-white/5 rounded-full"
      />
      <motion.div
        style={{ y: y2, opacity }}
        className="absolute bottom-1/4 right-10 w-48 h-48 border border-acm-blue/10 rounded-full"
      />

      {/* Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-acm-blue/3 rounded-full blur-[150px] pointer-events-none" />

      {/* Content */}
      <motion.div
        ref={textRef}
        style={{ scale }}
        className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 text-center"
      >
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-4 mb-8"
        >
          <div className="w-8 h-px bg-white/20" />
          <span
            className="text-[10px] tracking-[0.5em] text-white/30 uppercase"
            style={{ fontFamily: "var(--font-body)" }}
          >
            {topLabel}
          </span>
          <div className="w-8 h-px bg-white/20" />
        </motion.div>

        {/* Main Text */}
        <h2
          className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-[var(--foreground)] tracking-normal leading-[1.1] mb-6 sm:mb-8"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {renderMainText()}
        </h2>

        {/* Sub Text */}
        {subText && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-white/40 text-base sm:text-lg md:text-xl max-w-2xl mx-auto px-4 sm:px-0"
            style={{ fontFamily: "var(--font-body)" }}
          >
            {subText}
          </motion.p>
        )}
      </motion.div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-linear-to-t from-[var(--background)] to-transparent pointer-events-none" />
    </section>
  );
}

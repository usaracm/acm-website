"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface MarqueeProps {
  textRow1: string;
  textRow2: string;
  repeatCount?: number;
}

export default function Marquee({ textRow1, textRow2, repeatCount = 6 }: MarqueeProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const x1 = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const x2 = useTransform(scrollYProgress, [0, 1], ["-20%", "10%"]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-[var(--background)] py-8 sm:py-12 md:py-16 z-20"
    >
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-acm-blue/2 to-transparent pointer-events-none" />

      {/* First Marquee Row - Outlined text */}
      <div className="relative mb-2 overflow-hidden">
        <motion.div
          style={{ x: x1 }}
          className="flex whitespace-nowrap items-center gap-8"
        >
          {Array.from({ length: repeatCount }).map((_, i) => (
            <span
              key={`row1-${i}`}
              className="text-[8vw] sm:text-[6vw] md:text-[5vw] font-bold leading-none tracking-normal"
              style={{
                fontFamily: "var(--font-heading)",
                WebkitTextStroke: "1px rgba(255, 255, 255, 0.15)",
                color: "transparent",
              }}
            >
              {textRow1}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Second Marquee Row - Solid ACM Blue */}
      <div className="relative overflow-hidden">
        <motion.div
          style={{ x: x2 }}
          className="flex whitespace-nowrap items-center gap-12"
        >
          {Array.from({ length: repeatCount }).map((_, i) => (
            <span
              key={`row2-${i}`}
              className="text-[12vw] sm:text-[10vw] md:text-[8vw] font-bold leading-[0.85] tracking-normal text-acm-blue"
              style={{
                fontFamily: "var(--font-heading)",
              }}
            >
              {textRow2}
              <span className="mx-4 sm:mx-8 text-acm-blue/30">—</span>
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

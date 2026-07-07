"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function MarqueeSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  
  const x1 = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const x2 = useTransform(scrollYProgress, [0, 1], ["-20%", "10%"]);

  const marqueeText = "CURATED EVENTS";
  const repeatCount = 6;

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-[var(--background)] py-12 sm:py-20 md:py-32 z-20"
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
              className="text-[10vw] sm:text-[8vw] md:text-[6vw] font-black leading-none tracking-normal"
              style={{
                fontFamily: "var(--font-heading)",
                WebkitTextStroke: "1px rgba(255, 255, 255, 0.15)",
                color: "transparent",
              }}
            >
              {marqueeText}
              <span className="mx-4 sm:mx-6 text-white/10">•</span>
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
              className="text-[16vw] sm:text-[14vw] md:text-[11vw] font-black leading-[0.85] tracking-normal text-acm-blue"
              style={{
                fontFamily: "var(--font-heading)",
              }}
            >
              {marqueeText}
              <span className="mx-4 sm:mx-8 text-acm-blue/30">—</span>
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

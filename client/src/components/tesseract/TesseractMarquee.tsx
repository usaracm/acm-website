"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const WORDS = [
  "HACK",
  "BUILD",
  "DEPLOY",
  "WEB3",
  "HELA",
  "INNOVATE",
  "BLOCKCHAIN",
  "SHIP",
];

/**
 * Contained marquee divider — scroll-linked horizontal movement,
 * no rotation overflow. Two strips moving in opposite directions.
 */
export default function TesseractMarquee() {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const x1 = useTransform(scrollYProgress, [0, 1], ["0%", "-25%"]);
  const x2 = useTransform(scrollYProgress, [0, 1], ["-25%", "0%"]);

  const strip = WORDS.map((w) => `${w} ×`).join("  ");
  const repeated = `${strip}  ${strip}  ${strip}  ${strip}`;

  return (
    <section ref={ref} className="relative bg-black overflow-hidden">
      {/* Top edge glow */}
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-[#0085ca]/40 to-transparent" />

      {/* Scanner / data-stream glow */}
      <div className="absolute inset-0 bg-linear-to-b from-[#0085ca]/5 via-transparent to-[#0085ca]/5 pointer-events-none" />

      <div className="py-14 md:py-20">
        {/* First strip — filled text, higher contrast */}
        <motion.div className="whitespace-nowrap mb-3" style={{ x: x1 }}>
          <p
            className="text-[10vw] md:text-[6vw] font-black text-white/30 leading-none tracking-tight inline-block"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {repeated}
          </p>
        </motion.div>

        {/* Second strip — outlined stroke text with blue glow */}
        <motion.div className="whitespace-nowrap" style={{ x: x2 }}>
          <p
            className="text-[10vw] md:text-[6vw] font-black leading-none tracking-tight inline-block"
            style={{
              fontFamily: "var(--font-heading)",
              WebkitTextStroke: "1.5px rgba(0,133,202,0.4)",
              color: "transparent",
            }}
          >
            {repeated}
          </p>
        </motion.div>
      </div>

      {/* Bottom edge glow */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-[#0085ca]/40 to-transparent" />
    </section>
  );
}

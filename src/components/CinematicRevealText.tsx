"use client";

import { motion, useInView } from "framer-motion";
import { ReactNode, useRef } from "react";

interface CinematicRevealTextProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export default function CinematicRevealText({
  children,
  className = "",
  delay = 0,
}: CinematicRevealTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, {
    once: true,
    margin: "-10%",
  });

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div
        initial={{ y: "100%", opacity: 0 }}
        animate={inView ? { y: "0%", opacity: 1 } : {}}
        transition={{
          duration: 1,
          delay,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="relative z-10"
      >
        {children}
      </motion.div>
      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 bg-linear-to-r from-white/40 via-acm-blue/30 to-transparent"
        initial={{ x: "-120%" }}
        animate={inView ? { x: "120%" } : {}}
        transition={{
          duration: 1.2,
          delay: delay + 0.15,
          ease: "easeInOut",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-black/20 opacity-40" />
    </div>
  );
}

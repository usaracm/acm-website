"use client";

import { motion, useScroll, useTransform } from "framer-motion";

export default function CinematicScroll() {
  const { scrollYProgress } = useScroll();
  const progressHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div className="fixed right-6 md:right-10 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col items-center gap-4">
      {/* Progress Track */}
      <div className="relative w-px h-32 bg-white/10 overflow-hidden">
        {/* Progress Fill */}
        <motion.div
          className="absolute top-0 left-0 w-full bg-acm-blue"
          style={{ height: progressHeight }}
        />

        {/* Glow Effect */}
        <motion.div
          className="absolute top-0 left-0 w-full bg-acm-blue blur-[2px]"
          style={{ height: progressHeight }}
        />
      </div>

      {/* Indicator Dot */}
      <motion.div
        className="relative"
        animate={{ y: [0, 5, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-2 h-2 bg-acm-blue rounded-full" />
        <div className="absolute inset-0 w-2 h-2 bg-acm-blue rounded-full animate-ping opacity-30" />
      </motion.div>

      {/* Label */}
      <motion.span
        className="text-[8px] tracking-[0.4em] text-white/30 uppercase"
        style={{
          fontFamily: "var(--font-body)",
          writingMode: "vertical-lr",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        Scroll
      </motion.span>
    </div>
  );
}

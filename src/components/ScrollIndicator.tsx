"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function ScrollIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.5, duration: 1 }}
      className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
    >
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="flex flex-col items-center"
      >
        <div className="text-xs uppercase tracking-[0.3em] text-[var(--text-subtle)] mb-3">
          Scroll
        </div>
        <ChevronDown className="w-5 h-5 text-acm-blue" strokeWidth={1.5} />
      </motion.div>
    </motion.div>
  );
}

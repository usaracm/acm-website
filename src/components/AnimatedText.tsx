"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface AnimatedTextProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
}

export default function AnimatedText({
  children,
  className = "",
  delay = 0,
  duration = 0.8,
}: AnimatedTextProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

"use client";

import { motion } from "framer-motion";

interface SplitTextProps {
  children: string;
  className?: string;
  delay?: number;
  wordDelay?: number;
}

export default function SplitText({
  children,
  className = "",
  delay = 0,
  wordDelay = 0.015,
}: SplitTextProps) {
  const words = children.split(" ");

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: {
        staggerChildren: wordDelay,
        delayChildren: delay,
      },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        damping: 20,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
    },
  };

  return (
    <motion.div
      className={className}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {words.map((word, index) => (
        <motion.span
          variants={child}
          key={index}
          style={{ display: "inline-block", marginRight: "0.3em" }}
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
}

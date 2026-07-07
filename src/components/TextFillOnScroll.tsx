"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function TextFillOnScroll({
  children,
  className = "",
}: {
  children: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.5"],
  });

  const words = children.split(" ");

  return (
    <div ref={ref} className={className}>
      {words.map((word, index) => {
        const start = index / words.length;
        const end = start + 1 / words.length;
        return (
          <Word key={index} progress={scrollYProgress} range={[start, end]}>
            {word}
          </Word>
        );
      })}
    </div>
  );
}

function Word({
  children,
  progress,
  range,
}: {
  children: string;
  progress: any;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.2, 1]);
  const color = useTransform(progress, range, ["#404040", "#ffffff"]);

  return (
    <motion.span
      style={{ opacity, color }}
      className="inline-block mr-2 md:mr-3"
    >
      {children}
    </motion.span>
  );
}

"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Users, Rocket, Award } from "lucide-react";

// Water Fill Effect Component
function WaterFillText({
  children,
  className = "",
}: {
  children: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.6", "end 0.5"],
  });

  const clipPath = useTransform(
    scrollYProgress,
    [0, 1],
    ["inset(100% 0 0 0)", "inset(0% 0 0 0)"]
  );

  return (
    <div ref={ref} className={`relative inline-block ${className}`}>
      {/* Fill Layer - Rising Water */}
      <motion.span
        className="bg-linear-to-r absolute inset-0 z-0 bg-gray-50 bg-clip-text text-transparent"
        style={{ clipPath }}
        aria-hidden="true"
      >
        {children}
      </motion.span>

      {/* Outline Layer - Glass Container */}
      <span
        className="relative z-10 block bg-clip-text text-transparent"
        style={{
          WebkitTextStroke: "1px rgba(255, 255, 255, 0.8)",
        }}
      >
        {children}
      </span>
    </div>
  );
}

const stats = [
  { icon: Users, label: "50+ Active Members" },
  { icon: Rocket, label: "20+ Events Annually" },
  { icon: Award, label: "Industry Recognition" },
];

export default function StoryIntro() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 0.5, 1], [100, 0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-screen w-full items-center justify-center bg-[var(--background)] px-4 py-20 md:px-12 md:py-32"
    >
      <motion.div
        style={{ opacity, y }}
        className="mx-auto max-w-5xl space-y-8 text-center md:space-y-12"
      >
        <div className="font-display text-3xl font-bold leading-tight text-[var(--foreground)] sm:text-4xl md:text-5xl lg:text-6xl">
          <WaterFillText>
            Beyond launch, we offer ongoing support and community partnerships
            to help you scale your potential.
          </WaterFillText>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-3 gap-2 pt-6 md:gap-8 md:pt-12"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="flex flex-col items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface)]/20 p-3 backdrop-blur-sm transition-all duration-300 hover:border-acm-blue/30 hover:bg-[var(--surface)]/40 md:gap-4 md:rounded-2xl md:p-6"
            >
              <stat.icon
                className="h-5 w-5 text-acm-blue md:h-10 md:w-10"
                strokeWidth={1.5}
              />
              <span className="text-center text-xs font-medium text-[var(--text-muted)] md:text-lg">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}

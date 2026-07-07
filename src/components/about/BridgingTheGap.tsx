"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Code, Palette, Users } from "lucide-react";
import TextFillOnScroll from "@/components/TextFillOnScroll";

const bridgeItems = [
  {
    icon: Code,
    title: "Technical",
    desc: "ML, Web Dev, DSA",
    color: "from-blue-600 to-acm-blue",
  },
  {
    icon: Palette,
    title: "Creative",
    desc: "Design, Content, Media",
    color: "from-purple-600 to-pink-600",
  },
  {
    icon: Users,
    title: "United",
    desc: "One Community",
    color: "from-acm-blue to-acm-blue-light",
  },
];

export default function BridgingTheGap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0.8, 1, 1, 0.8]
  );

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-screen w-full items-center justify-center bg-[var(--background)] px-4 py-20 md:px-12 md:py-32"
    >
      <motion.div
        style={{ opacity, scale }}
        className="mx-auto max-w-6xl text-center"
      >
        <TextFillOnScroll className="mb-8 font-display text-3xl font-bold leading-tight sm:text-4xl md:mb-16 md:text-5xl lg:text-7xl">
          We believe the future belongs to those who can bridge worlds. The
          coder who understands design. The artist who speaks in algorithms. The
          storyteller who builds with code.
        </TextFillOnScroll>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mt-8 grid grid-cols-3 gap-2 md:mt-20 md:gap-8"
        >
          {bridgeItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="group relative rounded-xl border border-[var(--border)] bg-[var(--surface)]/20 p-3 transition-all duration-500 hover:border-acm-blue/50 md:rounded-3xl md:p-8"
            >
              <div
                className={`absolute inset-0 rounded-xl bg-linear-to-br ${item.color} opacity-0 transition-opacity duration-500 group-hover:opacity-10 md:rounded-3xl`}
              />
              <item.icon className="mx-auto mb-2 h-6 w-6 text-acm-blue transition-transform duration-300 group-hover:scale-110 md:mb-4 md:h-12 md:w-12" />
              <h3 className="mb-0.5 font-display text-sm font-bold text-[var(--foreground)] md:mb-2 md:text-2xl">
                {item.title}
              </h3>
              <p className="text-xs text-[var(--text-muted)] md:text-base">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}

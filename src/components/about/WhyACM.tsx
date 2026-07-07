"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Zap, Palette, Users, Globe, LucideIcon } from "lucide-react";
import TextFillOnScroll from "@/components/TextFillOnScroll";

const values: {
  title: string;
  description: string;
  icon: LucideIcon;
}[] = [
  {
    title: "Technical Excellence",
    description:
      "Deep expertise in cutting-edge technologies, from machine learning to web development.",
    icon: Zap,
  },
  {
    title: "Creative Innovation",
    description:
      "Design thinking and creative problem-solving that makes technology accessible and beautiful.",
    icon: Palette,
  },
  {
    title: "Inclusive Community",
    description:
      "A welcoming space where diverse perspectives converge to create extraordinary outcomes.",
    icon: Users,
  },
  {
    title: "Real-World Impact",
    description:
      "Projects and initiatives that make a tangible difference in our campus and beyond.",
    icon: Globe,
  },
];

export default function WhyACM() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-[var(--background)] px-4 py-20 md:px-12 md:py-32"
    >
      <motion.div
        style={{ y: backgroundY }}
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute left-1/3 top-1/2 h-64 w-64 rounded-full bg-purple-900/10 blur-[100px] md:h-96 md:w-96 md:blur-[150px]" />
      </motion.div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-8 text-center md:mb-20">
          <TextFillOnScroll className="mb-4 font-display text-3xl font-bold md:mb-6 md:text-6xl lg:text-7xl">
            Why ACM?
          </TextFillOnScroll>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false }}
            className="mx-auto max-w-xl text-base text-[var(--text-muted)] md:max-w-2xl md:text-xl"
          >
            What sets us apart in the tech community
          </motion.p>
        </div>

        {/* Desktop Grid - hidden on mobile */}
        <div className="hidden gap-6 sm:grid sm:grid-cols-2 lg:gap-8">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.8, delay: index * 0.15 }}
                className="group relative overflow-hidden rounded-3xl border border-[var(--border)] bg-linear-to-br from-gray-900/30 to-[var(--background)] p-8 transition-all duration-500 hover:border-acm-blue/30"
              >
                <div className="absolute inset-0 bg-linear-to-br from-acm-blue/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <div className="relative z-10">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-[var(--border)] bg-[var(--surface)]/50 transition-all duration-300 group-hover:border-acm-blue/50 group-hover:bg-acm-blue/10">
                    <Icon className="h-7 w-7 text-acm-blue" strokeWidth={1.5} />
                  </div>
                  <h3 className="mb-3 font-display text-2xl font-bold text-[var(--foreground)]">
                    {value.title}
                  </h3>
                  <p className="text-base leading-relaxed text-[var(--text-muted)]">
                    {value.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Mobile Layout - Compact list */}
        <div className="sm:hidden">
          <div className="space-y-3">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false, amount: 0.5 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group relative flex items-start gap-4 rounded-xl border border-[var(--border)] bg-[var(--surface)]/30 p-4 backdrop-blur-sm transition-all duration-300 hover:border-acm-blue/30"
                >
                  {/* Icon */}
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--surface)]/80">
                    <Icon className="h-5 w-5 text-acm-blue" strokeWidth={1.5} />
                  </div>

                  {/* Content */}
                  <div className="min-w-0 flex-1">
                    <h3 className="mb-1 font-display text-base font-bold text-[var(--foreground)]">
                      {value.title}
                    </h3>
                    <p className="line-clamp-2 text-xs leading-relaxed text-[var(--text-muted)]">
                      {value.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

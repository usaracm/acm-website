"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  return (
    <section ref={containerRef} className="relative h-[110vh] overflow-hidden">
      {/* Sticky container */}
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Background */}
        <div
          className="absolute inset-0 bg-[var(--background)]"
          style={{
            background:
              "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(0, 133, 202, 0.15), transparent), linear-gradient(180deg, #000 0%, #050510 100%)",
          }}
        />

        {/* Floating particles - optimized, fewer on mobile */}
        <FloatingParticles />

        {/* Grid lines - smaller grid on mobile */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(90deg, white 1px, transparent 1px), linear-gradient(white 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Main content */}
        <motion.div
          style={{ y, opacity, scale }}
          className="relative z-10 flex h-full flex-col items-center justify-center px-4 will-change-transform md:px-6"
        >
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-6 flex items-center gap-3 md:mb-8 md:gap-4"
          >
            <span className="h-px w-8 bg-acm-blue/50 md:w-12" />
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/50 md:text-xs md:tracking-[0.5em]">
              Our Work
            </span>
            <span className="h-px w-8 bg-acm-blue/50 md:w-12" />
          </motion.div>

          {/* Main title */}
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, ease: [0.25, 1, 0.5, 1], delay: 0.4 }}
              className="text-center font-display text-5xl font-bold leading-[0.9] tracking-normal md:text-8xl lg:text-9xl"
            >
              <span className="block text-[var(--foreground)]">Projects that</span>
              <span className="block text-acm-blue">breathe.</span>
            </motion.h1>
          </div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-6 max-w-md px-4 text-center text-base leading-relaxed text-white/60 md:mt-8 md:max-w-2xl md:px-0 md:text-xl"
          >
            Every pixel tells a story. Every interaction is choreographed.
            <span className="hidden md:inline">
              <br />
            </span>
            <span className="md:hidden"> </span>
            Welcome to the ACM portfolio.
          </motion.p>

          {/* Stats row - Mobile: smaller gap, stacked feel */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="mt-10 flex gap-6 md:mt-16 md:gap-20"
          >
            {[
              { value: "05", label: "Projects" },
              { value: "∞", label: "Iterations" },
              { value: "24/7", label: "Dedication" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 + index * 0.1 }}
              >
                <div className="text-2xl font-bold text-[var(--foreground)] md:text-5xl">
                  {stat.value}
                </div>
                <div className="mt-1 font-mono text-[8px] uppercase tracking-[0.2em] text-white/40 md:text-xs md:tracking-[0.3em]">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Scroll indicator - Mobile: more compact */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 md:bottom-12"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="flex flex-col items-center gap-2"
            >
              <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-white/30 md:text-[10px] md:tracking-[0.3em]">
                Scroll to explore
              </span>
              <div className="h-8 w-px bg-acm-blue/30 md:h-12" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function FloatingParticles() {
  // Fewer particles on mobile for performance
  const particles = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    x: (i * 37) % 100,
    y: (i * 53) % 100,
    size: 1.5 + (i % 3),
    duration: 15 + (i % 10) * 2,
    delay: i * 0.3,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-acm-blue/30 will-change-transform"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
          }}
          animate={{
            y: [0, -80, 0],
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}

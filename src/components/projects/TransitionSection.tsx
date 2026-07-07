"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

/* =============================================================================
   MOBILE-ONLY ANIMATED CONNECTOR - Vertical flowing design
   ============================================================================= */
function MobileAnimatedConnector() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start end", "end start"],
  });

  const dashOffset = useTransform(scrollYProgress, [0, 1], [200, 0]);
  const glow = useTransform(scrollYProgress, [0, 1], [0.3, 0.8]);

  return (
    <motion.div ref={wrapperRef} className="flex justify-center py-4">
      <motion.svg
        width="100"
        height="160"
        viewBox="0 0 100 160"
        fill="none"
        className="text-acm-blue"
        aria-hidden
      >
        {/* Vertical flowing path */}
        <motion.path
          d="M50 8 C25 40, 75 60, 50 90 C25 120, 75 140, 50 152"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="6 6"
          style={{ strokeDashoffset: dashOffset, opacity: glow }}
        />
        {/* Animated dots along path */}
        {[20, 75, 130].map((cy, i) => (
          <motion.circle
            key={cy}
            cx={50}
            cy={cy}
            r="4"
            className="fill-acm-blue"
            animate={{ scale: [1, 1.3, 1], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
          />
        ))}
      </motion.svg>
    </motion.div>
  );
}

/* =============================================================================
   DESKTOP-ONLY ANIMATED CONNECTOR - Original horizontal design
   ============================================================================= */
function AnimatedConnector() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start end", "end start"],
  });

  const dashOffset = useTransform(scrollYProgress, [0, 1], [180, 0]);
  const glow = useTransform(scrollYProgress, [0, 1], [0.2, 0.6]);

  return (
    <motion.div ref={wrapperRef} className="flex justify-center">
      <motion.svg
        width="320"
        height="140"
        viewBox="0 0 320 140"
        fill="none"
        className="text-acm-blue"
        aria-hidden
      >
        <motion.path
          d="M4 120C60 40 120 120 180 40C220 -5 280 20 316 4"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="12 12"
          style={{ strokeDashoffset: dashOffset, opacity: glow }}
        />
        {[40, 140, 260].map((cx) => (
          <motion.circle
            key={cx}
            cx={cx}
            cy={cx === 260 ? 24 : cx === 140 ? 40 : 110}
            r="6"
            className="fill-acm-blue"
            animate={{ scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 3, repeat: Infinity, delay: cx / 200 }}
          />
        ))}
      </motion.svg>
    </motion.div>
  );
}

/* =============================================================================
   MOBILE TRANSITION SECTION - Completely reimagined for small screens
   ============================================================================= */
function MobileTransitionSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const backgroundOpacity = useTransform(scrollYProgress, [0, 1], [0.15, 0.35]);

  const stats = [
    { label: "Micro loops", value: "120", icon: "◎" },
    { label: "Prototype states", value: "38", icon: "◇" },
    { label: "Latency budget", value: "16ms", icon: "⚡" },
  ];

  const features = [
    { title: "Handover", text: "Stories take over without jitter.", icon: "→" },
    { title: "Dynamics", text: "Buttery smooth 0.8 macro easing.", icon: "⟳" },
    { title: "Integrity", text: "60fps on all devices.", icon: "✓" },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[var(--background)] py-16 md:hidden"
    >
      {/* Background glow - mobile optimized */}
      <motion.div
        style={{ opacity: backgroundOpacity }}
        className="absolute inset-0"
      >
        <div className="absolute left-1/2 top-1/3 h-40 w-40 -translate-x-1/2 rounded-full bg-acm-blue/20 blur-[80px]" />
        <div className="absolute bottom-1/4 right-0 h-32 w-32 rounded-full bg-white/5 blur-[60px]" />
      </motion.div>

      <div className="relative z-10 px-5">
        {/* Header with accent line */}
        <div className="mb-8 text-center">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 48 }}
            viewport={{ once: false, amount: 0.6 }}
            className="mx-auto mb-4 h-0.5 bg-acm-blue"
          />
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.6 }}
            transition={{ duration: 0.5 }}
            className="font-mono text-[10px] uppercase tracking-[0.3em] text-acm-blue"
          >
            Continuum
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.6 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-3 font-display text-2xl font-semibold leading-tight text-[var(--foreground)]"
          >
            We choreograph the drop into each story.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.6 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-white/50"
          >
            We align visuals, motion systems, and narrative pacing so scrolling
            feels like a single cinematic take.
          </motion.p>
        </div>

        {/* Stats - Grid layout that fits screen */}
        <div className="mb-8 grid grid-cols-3 gap-2 px-1">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false, amount: 0.5 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="relative rounded-xl border border-white/10 bg-white/5 p-3 backdrop-blur-sm"
            >
              <span className="absolute -top-1.5 -right-0.5 text-sm text-acm-blue/40">
                {stat.icon}
              </span>
              <div className="text-lg font-bold text-[var(--foreground)]">{stat.value}</div>
              <p className="mt-0.5 text-[8px] uppercase tracking-[0.15em] text-white/40">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Motion Blueprint Card - Compact */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-8 max-w-sm rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm"
        >
          <div className="mb-3 flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-acm-blue" />
            <p className="text-[10px] uppercase tracking-[0.25em] text-white/50">
              Motion Blueprint
            </p>
          </div>
          <p className="text-sm leading-relaxed text-white/70">
            Scroll velocity is sampled and eased into parallax, snap
            translations, and touch cursor trails.
          </p>

          {/* Tags - compact horizontal scroll */}
          <div className="mt-4 flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {["Seeded noise", "Framer Motion", "RAF budgets"].map((tag) => (
              <span
                key={tag}
                className="shrink-0 whitespace-nowrap rounded-full border border-white/10 px-2.5 py-1 text-[10px] text-white/40"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Animated Connector */}
          <MobileAnimatedConnector />
        </motion.div>

        {/* Feature Cards - Vertical stack with stagger */}
        <div className="space-y-3">
          {features.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.5 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative flex items-start gap-4 rounded-xl border border-white/10 bg-black/60 p-4"
            >
              {/* Icon badge */}
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-acm-blue/10 text-sm text-acm-blue">
                {item.icon}
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-[var(--foreground)]">
                  {item.title}
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-white/50">
                  {item.text}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =============================================================================
   DESKTOP TRANSITION SECTION - Original design preserved
   ============================================================================= */
function DesktopTransitionSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const backgroundOpacity = useTransform(scrollYProgress, [0, 1], [0.2, 0.4]);
  const translateY = useTransform(scrollYProgress, [0, 1], [40, -20]);

  return (
    <section
      ref={sectionRef}
      className="relative hidden overflow-hidden bg-[var(--background)] py-24 md:block"
    >
      <motion.div
        style={{ opacity: backgroundOpacity }}
        className="absolute inset-0"
      >
        <div className="absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 rounded-full bg-acm-blue/10 blur-[120px]" />
        <div className="absolute right-24 bottom-0 h-48 w-48 rounded-full bg-white/5 blur-[100px]" />
      </motion.div>

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-16 px-6 md:px-12">
        <div className="grid gap-10 lg:grid-cols-[3fr_2fr] lg:items-center">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.6 }}
              transition={{ duration: 0.6 }}
              className="font-mono text-xs uppercase tracking-[0.4em] text-acm-blue"
            >
              Continuum
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.6 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mt-4 font-display text-4xl font-semibold text-[var(--foreground)] md:text-5xl"
            >
              We choreograph the drop into each story.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.6 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="mt-6 max-w-2xl text-base leading-relaxed text-white/60"
            >
              Between the introduction and the showcase we run a calibration
              layer: we align visuals, motion systems, and narrative pacing so
              scrolling feels like gliding through a single cinematic take.
            </motion.p>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {[
                { label: "Micro loops", value: "120" },
                { label: "Prototype states", value: "38" },
                { label: "Latency budget", value: "16ms" },
              ].map((stat) => (
                <motion.div
                  key={stat.label}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.5 }}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.25 }}
                >
                  <div className="text-2xl font-semibold text-[var(--foreground)]">
                    {stat.value}
                  </div>
                  <p className="mt-1 text-xs uppercase tracking-[0.3em] text-white/40">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            style={{ y: translateY }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.6 }}
            transition={{ duration: 0.7 }}
            className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-[0_25px_80px_rgba(0,0,0,0.45)]"
          >
            <p className="text-sm uppercase tracking-[0.3em] text-white/50">
              Motion Blueprint
            </p>
            <p className="mt-4 text-lg text-white/80">
              Scroll velocity is sampled and eased into composable systems:
              parallax, snap-to-project translations, and live cursor trails for
              touch devices. Everything stays deterministic for hydration
              safety.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3 text-sm text-white/50">
              {"Seeded noise • Framer Motion drivers • requestAnimationFrame budgets"
                .split(" • ")
                .map((token) => (
                  <span
                    key={token}
                    className="rounded-full border border-white/10 px-3 py-1"
                  >
                    {token}
                  </span>
                ))}
            </div>
            <div className="mt-10 flex flex-col gap-6">
              <AnimatedConnector />
            </div>
          </motion.div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              title: "Handover",
              text: "We pre-compute focus targets so each story takes over the viewport without jitter.",
            },
            {
              title: "Dynamics",
              text: "Inertia curves borrow from physical rigs—ease-in micro 0.45, macro 0.8 for buttery scroll.",
            },
            {
              title: "Integrity",
              text: "Everything ships with deterministic seeds and 60fps budgets on mid-tier hardware.",
            },
          ].map((item) => (
            <motion.div
              key={item.title}
              className="rounded-3xl border border-white/10 bg-black/60 p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.4 }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.02, transition: { duration: 0.25 } }}
            >
              <h3 className="text-lg font-semibold text-[var(--foreground)]">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/60">
                {item.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =============================================================================
   MAIN EXPORT - Renders both mobile and desktop versions
   ============================================================================= */
export default function TransitionSection() {
  return (
    <>
      {/* Mobile version - hidden on md and above */}
      <MobileTransitionSection />
      {/* Desktop version - hidden below md */}
      <DesktopTransitionSection />
    </>
  );
}

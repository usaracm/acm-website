"use client";

import {
  motion,
  useScroll,
  useTransform,
  MotionValue,
  useSpring,
  useMotionValue,
  useMotionValueEvent,
} from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { type Project } from "@/data/projectsData";

interface ProjectsShowcaseProps {
  projects: Project[];
}

export default function ProjectsShowcase({ projects }: ProjectsShowcaseProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const totalSlides = projects.length;
  const slideSteps = Math.max(totalSlides - 1, 1);
  const snappedProgress = useMotionValue(0);
  const prevStepRef = useRef(0);

  useMotionValueEvent(scrollYProgress, "change", (value: number | null) => {
    if (totalSlides <= 1) {
      snappedProgress.set(0);
      return;
    }

    const clamped = Math.min(Math.max(value ?? 0, 0), 1);
    const rawStep = Math.round(clamped * slideSteps);
    const prev = prevStepRef.current;
    const delta = rawStep - prev;
    const nextStep = Math.abs(delta) > 1 ? prev + Math.sign(delta) : rawStep;

    prevStepRef.current = Math.min(Math.max(nextStep, 0), slideSteps);
    snappedProgress.set(prevStepRef.current / slideSteps);
  });

  useEffect(() => {
    prevStepRef.current = 0;
    snappedProgress.set(0);
  }, [totalSlides, snappedProgress]);

  const smoothProgress = useSpring(snappedProgress, {
    stiffness: 270,
    damping: 40,
    mass: 0.8,
  });

  const driver = totalSlides <= 1 ? scrollYProgress : smoothProgress;

  const x = useTransform(
    driver,
    [0, 1],
    ["0%", `-${Math.max(totalSlides - 1, 0) * 100}%`]
  );

  const activeIndex = useTransform(snappedProgress, (value) =>
    totalSlides <= 1 ? 0 : Math.round(value * slideSteps)
  );

  const handleNavigate = useCallback(
    (index: number) => {
      if (!containerRef.current || totalSlides <= 1) return;

      const section = containerRef.current;
      const sectionTop = section.getBoundingClientRect().top + window.scrollY;
      const sectionHeight = section.offsetHeight;
      const denominator = slideSteps === 0 ? 1 : slideSteps;
      const targetProgress = index / denominator;
      const target = sectionTop + targetProgress * sectionHeight;

      window.scrollTo({ top: target, behavior: "smooth" });
    },
    [slideSteps, totalSlides]
  );

  return (
    <section
      id="showcase"
      ref={containerRef}
      className="relative"
      style={{ height: `${projects.length * 100}vh` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-[var(--background)]" />

        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className="absolute left-4 top-6 z-20 md:left-12 md:top-8"
        >
          <div className="flex items-center gap-3 md:gap-4">
            <span className="h-px w-6 bg-acm-blue/50 md:w-8" />
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/40 md:text-xs md:tracking-[0.5em]">
              Featured Work
            </span>
          </div>
        </motion.div>

        {/* Project counter */}
        <div className="absolute bottom-6 left-4 z-20 md:bottom-8 md:left-12">
          <ProjectCounter activeIndex={activeIndex} total={projects.length} />
        </div>

        {/* Mobile: Bottom navigation dots */}
        <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-2 md:hidden">
          {projects.map((project, i) => (
            <MobileProgressDot
              key={project.id}
              index={i}
              activeIndex={activeIndex}
              onNavigate={handleNavigate}
            />
          ))}
        </div>

        {/* Desktop: Right side progress indicator */}
        <div className="absolute right-6 top-1/2 z-20 hidden -translate-y-1/2 flex-col gap-4 md:right-8 md:flex">
          {projects.map((project, i) => (
            <ProjectProgressDot
              key={project.id}
              index={i}
              activeIndex={activeIndex}
              total={projects.length}
              title={project.title}
              onNavigate={handleNavigate}
            />
          ))}
        </div>

        {/* Horizontal scroll container */}
        <motion.div style={{ x }} className="flex h-full will-change-transform">
          {projects.map((project, index) => (
            <ProjectSlide key={project.id} project={project} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function ProjectCounter({
  activeIndex,
  total,
}: {
  activeIndex: MotionValue<number>;
  total: number;
}) {
  const currentIndex = useTransform(activeIndex, (v) =>
    Math.min(Math.round(v) + 1, total)
  );

  return (
    <div className="flex items-baseline gap-1 font-mono md:gap-2">
      <motion.span className="text-xl font-bold text-[var(--foreground)] md:text-3xl">
        {currentIndex}
      </motion.span>
      <span className="text-white/30">/</span>
      <span className="text-sm text-white/30 md:text-lg">
        {String(total).padStart(2, "0")}
      </span>
    </div>
  );
}

function MobileProgressDot({
  index,
  activeIndex,
  onNavigate,
}: {
  index: number;
  activeIndex: MotionValue<number>;
  onNavigate: (index: number) => void;
}) {
  const isActive = useTransform(activeIndex, (v): number =>
    Math.round(v) === index ? 1 : 0
  );
  const width = useTransform(isActive, [0, 1], [8, 24]);
  const opacity = useTransform(isActive, [0, 1], [0.4, 1]);

  return (
    <motion.button
      type="button"
      onClick={() => onNavigate(index)}
      className="relative h-2 focus:outline-none"
      whileTap={{ scale: 0.9 }}
      aria-label={`Go to project ${index + 1}`}
    >
      <motion.div
        style={{ width, opacity }}
        className="h-full rounded-full bg-white transition-colors"
      />
    </motion.button>
  );
}

function ProjectProgressDot({
  index,
  activeIndex,
  total,
  title,
  onNavigate,
}: {
  index: number;
  activeIndex: MotionValue<number>;
  total: number;
  title: string;
  onNavigate: (index: number) => void;
}) {
  const isActive = useTransform(activeIndex, (v): number =>
    Math.round(v) === index ? 1 : 0
  );
  const opacity = useTransform(isActive, [0, 1], [0.35, 1]);
  const scale = useTransform(isActive, [0, 1], [0.9, 1.25]);
  const width = useTransform(isActive, [0, 1], [10, 28]);

  return (
    <motion.button
      type="button"
      onClick={() => onNavigate(index)}
      style={{ opacity: opacity }}
      className="group flex items-center gap-3 text-left focus:outline-none"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      aria-label={`Jump to project ${index + 1} of ${total}`}
    >
      <motion.div
        style={{ opacity, scale, width }}
        className="h-2 rounded-full bg-white/80 transition-colors group-hover:bg-white"
      />
      <motion.span
        style={{ opacity }}
        className="font-mono text-[10px] uppercase tracking-normalr text-white/60 opacity-0 transition-opacity group-hover:opacity-100"
      >
        {title}
      </motion.span>
    </motion.button>
  );
}

function ProjectSlide({ project, index }: { project: Project; index: number }) {
  return (
    <div className="relative flex h-full w-screen shrink-0 items-center justify-center px-4 pt-16 pb-20 md:px-16 md:py-0 lg:px-24">
      {/* Background tint */}
      <div className="absolute inset-0 bg-acm-blue/5" />

      {/* Content grid */}
      <div className="relative z-10 grid w-full max-w-7xl gap-6 md:gap-8 lg:grid-cols-2 lg:gap-16">
        {/* Mobile: Image first, then content */}
        {/* Visual - Show first on mobile */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="relative order-1 lg:order-2"
        >
          {/* Glow effect - smaller on mobile */}
          <div className="absolute -inset-4 rounded-2xl bg-acm-blue/10 blur-2xl md:-inset-8 md:rounded-3xl md:blur-3xl" />

          {/* Image container */}
          <div className="relative aspect-video overflow-hidden rounded-xl border border-white/10 md:aspect-4/3 lg:aspect-square lg:rounded-3xl">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-500 hover:scale-105"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/30" />

            {/* Year badge */}
            <div className="absolute bottom-3 right-3 rounded-full border border-white/20 bg-black/60 px-3 py-1.5 backdrop-blur-md md:bottom-6 md:right-6 md:px-4 md:py-2">
              <span className="font-mono text-[10px] uppercase tracking-normalr text-white/70 md:text-xs">
                {project.year}
              </span>
            </div>

            {/* Role badge */}
            <div className="absolute left-3 top-3 md:left-6 md:top-6">
              <span className="rounded-full border border-white/10 bg-black/40 px-2.5 py-1 font-mono text-[9px] uppercase tracking-normalr text-white/50 backdrop-blur-md md:px-3 md:py-1.5 md:text-[10px]">
                {project.role}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Project info */}
        <div className="flex flex-col justify-center order-2 lg:order-1">
          {/* Project number - smaller on mobile */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 0.6 }}
            className="mb-2 flex items-center gap-4 md:mb-4"
          >
            <span className="font-mono text-5xl font-bold text-white/5 md:text-9xl">
              {project.id}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="-mt-8 font-display text-2xl font-bold text-[var(--foreground)] md:-mt-16 md:text-6xl lg:text-7xl"
          >
            {project.title}
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-2 text-sm text-acm-blue md:mt-3 md:text-xl"
          >
            {project.subtitle}
          </motion.p>

          {/* Description - shorter on mobile */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-3 max-w-lg text-sm leading-relaxed text-white/60 line-clamp-3 md:mt-6 md:line-clamp-none md:text-lg"
          >
            {project.summary}
          </motion.p>

          {/* Tags - horizontal scroll on mobile */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-4 flex gap-2 overflow-x-auto pb-1 scrollbar-hide md:mt-8 md:flex-wrap md:overflow-visible md:pb-0"
          >
            {project.tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="shrink-0 rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-[10px] uppercase tracking-normalr text-white/50 md:px-4 md:py-1.5 md:text-xs"
              >
                {tag}
              </span>
            ))}
          </motion.div>

          {/* Metrics - compact on mobile */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-4 flex flex-wrap gap-3 border-t border-white/10 pt-4 md:mt-10 md:gap-6 md:pt-6"
          >
            {project.metrics.slice(0, 3).map((metric, i) => (
              <div key={metric} className="relative">
                {i > 0 && (
                  <span className="absolute -left-2 top-1/2 hidden h-3 w-px -translate-y-1/2 bg-white/10 md:-left-3 md:block" />
                )}
                <span className="font-mono text-[9px] uppercase tracking-normalr text-white/40 md:text-xs">
                  {metric}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

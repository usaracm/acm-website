"use client";

import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { type Project } from "@/data/projectsData";

interface FeaturedDeepDiveProps {
  projects: Project[];
}

export default function FeaturedDeepDive({ projects }: FeaturedDeepDiveProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const featuredProjects = projects.filter((p) => p.featured);
  const displayProjects =
    featuredProjects.length > 0 ? featuredProjects : projects.slice(0, 3);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen overflow-hidden bg-neutral-950 py-16 md:py-32"
    >
      {/* Subtle background glow - smaller on mobile */}
      <div className="absolute left-1/4 top-1/4 h-[300px] w-[300px] rounded-full bg-acm-blue/5 blur-[100px] md:h-[600px] md:w-[600px] md:blur-[150px]" />
      <div className="absolute bottom-1/4 right-1/4 h-[250px] w-[250px] rounded-full bg-acm-blue/3 blur-[100px] md:h-[500px] md:w-[500px] md:blur-[150px]" />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 px-4 md:px-12">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.55 }}
          transition={{ duration: 0.8 }}
          className="mb-12 max-w-4xl text-center md:mb-24 md:text-left"
        >
          <div className="mb-4 flex items-center justify-center gap-3 md:mb-6 md:justify-start md:gap-4">
            <div className="h-px w-10 bg-acm-blue/50 md:w-16" />
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-acm-blue md:text-xs md:tracking-[0.4em]">
              Deep Dive
            </span>
            <div className="h-px w-10 bg-acm-blue/50 md:hidden" />
          </div>
          <h2 className="font-display text-3xl font-bold md:text-6xl lg:text-7xl">
            <span className="text-[var(--foreground)]">Featured</span>
            <br />
            <span className="text-white/30">Projects</span>
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-white/40 md:mx-0 md:mt-6 md:max-w-xl md:text-lg">
            An in-depth look at our most impactful work — the challenges we
            faced, the solutions we crafted, and the results we achieved.
          </p>
        </motion.div>

        {/* Featured projects grid */}
        <div className="space-y-16 md:space-y-32">
          {displayProjects.map((project, index) => (
            <FeaturedProjectCard
              key={project.id}
              project={project}
              index={index}
              scrollProgress={scrollYProgress}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturedProjectCard({
  project,
  index,
  scrollProgress,
}: {
  project: Project;
  index: number;
  scrollProgress: MotionValue<number>;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: cardScroll } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(cardScroll, [0, 1], ["0%", "15%"]);
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ duration: 0.8 }}
      className={`grid gap-6 md:gap-8 lg:grid-cols-2 lg:gap-16 ${
        isEven ? "" : "lg:grid-flow-dense"
      }`}
    >
      {/* Image side */}
      <motion.div
        style={{ y: imageY }}
        className={`relative will-change-transform ${
          isEven ? "" : "lg:col-start-2"
        }`}
      >
        <div className="group relative overflow-hidden rounded-2xl md:rounded-3xl">
          {/* Glow effect - smaller on mobile */}
          <div className="absolute -inset-2 rounded-2xl bg-acm-blue/10 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100 md:-inset-4 md:rounded-3xl md:blur-2xl" />

          {/* Image */}
          <div className="relative aspect-video overflow-hidden rounded-2xl border border-white/10 md:aspect-16/10 md:rounded-3xl">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40" />

            {/* Floating number - smaller on mobile */}
            <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6">
              <span className="font-mono text-5xl font-bold text-white/5 md:text-8xl">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Content side */}
      <div
        className={`flex flex-col justify-center ${
          isEven ? "" : "lg:col-start-1 lg:row-start-1"
        }`}
      >
        {/* Meta info */}
        <motion.div
          initial={{ opacity: 0, x: isEven ? -20 : 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.55 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-3 flex items-center gap-3 md:mb-4 md:gap-4"
        >
          <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-normalr text-white/40 md:px-3 md:py-1 md:text-[10px]">
            {project.year}
          </span>
          <span className="h-px flex-1 bg-white/10" />
          <span className="font-mono text-[9px] uppercase tracking-normalr text-white/30 md:text-[10px]">
            {project.role}
          </span>
        </motion.div>

        {/* Title */}
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.55 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="font-display text-2xl font-bold text-[var(--foreground)] md:text-5xl"
        >
          {project.title}
        </motion.h3>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.55 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-1.5 text-sm text-acm-blue md:mt-2 md:text-lg"
        >
          {project.subtitle}
        </motion.p>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.55 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-4 max-w-lg text-sm leading-relaxed text-white/50 line-clamp-3 md:mt-6 md:line-clamp-none md:text-base"
        >
          {project.description}
        </motion.p>

        {/* Metrics - compact grid on mobile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.55 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-5 grid grid-cols-3 gap-2 md:mt-8 md:gap-4"
        >
          {project.metrics.slice(0, 3).map((metric) => (
            <div
              key={metric}
              className="border-l-2 border-acm-blue/30 pl-2 md:pl-4"
            >
              <span className="block font-mono text-[8px] uppercase leading-tight tracking-normalr text-white/40 md:text-xs">
                {metric}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Tags - wrapped on mobile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.55 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mt-4 flex flex-wrap gap-1.5 md:mt-8 md:gap-2"
        >
          {project.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 font-mono text-[8px] uppercase tracking-normalr text-white/40 md:px-3 md:py-1 md:text-xs"
            >
              {tag}
            </span>
          ))}
        </motion.div>

        {/* CTA */}
        {project.link && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.55 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-6 md:mt-10"
          >
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-normalr text-[var(--foreground)] transition-colors hover:text-acm-blue md:gap-3 md:text-sm"
            >
              <span>View Project</span>
              <span className="relative h-px w-8 bg-white/30 transition-all group-hover:w-12 group-hover:bg-acm-blue md:w-10 md:group-hover:w-16">
                <span className="absolute -top-[5px] right-0 text-white/50 transition-colors group-hover:text-acm-blue">
                  →
                </span>
              </span>
            </a>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

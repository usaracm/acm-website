"use client";

import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { type Project } from "@/data/projectsData";
import { ArrowUpRight } from "lucide-react";

interface ProjectsGalleryProps {
  projects: Project[];
}

export default function ProjectsGallery({ projects }: ProjectsGalleryProps) {
  return (
    <section className="relative bg-[#030303] py-16 sm:py-24 md:py-40">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-acm-blue/5 rounded-full blur-[200px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-900/5 rounded-full blur-[150px]" />
      </div>

      {/* Section Header */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 mb-12 sm:mb-16 md:mb-24">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-6"
        >
          <span 
            className="text-[10px] md:text-[11px] font-medium tracking-[0.3em] text-acm-blue uppercase"
            style={{ fontFamily: "var(--font-body)" }}
          >
            01
          </span>
          <div className="w-12 md:w-20 h-px bg-acm-blue/40" />
          <span 
            className="text-[10px] md:text-[11px] font-light tracking-[0.4em] text-white/30 uppercase"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Featured Work
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black text-[var(--foreground)] tracking-normal leading-[0.95]"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          SELECTED <span className="text-acm-blue">PROJECTS</span>
        </motion.h2>
      </div>

      {/* Projects Grid */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="space-y-16 sm:space-y-24 md:space-y-40">
          {projects.map((project, index) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              index={index}
              isReversed={index % 2 === 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ 
  project, 
  index,
  isReversed 
}: { 
  project: Project; 
  index: number;
  isReversed: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });
  
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  // Smooth parallax for image
  const imageY = useSpring(
    useTransform(scrollYProgress, [0, 1], [50, -50]),
    { stiffness: 100, damping: 30, restDelta: 0.001 }
  );

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 80 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="relative"
    >
      <div className={`grid lg:grid-cols-2 gap-8 lg:gap-16 items-center ${isReversed ? "lg:grid-flow-dense" : ""}`}>
        {/* Image Side */}
        <motion.div 
          className={`relative group ${isReversed ? "lg:col-start-2" : ""}`}
        >
          {/* Glow Effect */}
          <motion.div 
            className="absolute -inset-4 md:-inset-8 bg-acm-blue/10 rounded-3xl blur-2xl opacity-0 group-hover:opacity-60 transition-opacity duration-700"
          />
          
          {/* Main Card */}
          <div className="relative overflow-hidden bg-[var(--surface)] border border-white/5 group-hover:border-acm-blue/20 transition-colors duration-500">
            {/* Corner Accents */}
            <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-white/10 group-hover:border-acm-blue/40 transition-colors duration-500 z-10" />
            <div className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-white/10 group-hover:border-acm-blue/40 transition-colors duration-500 z-10" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 border-white/10 group-hover:border-acm-blue/40 transition-colors duration-500 z-10" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-white/10 group-hover:border-acm-blue/40 transition-colors duration-500 z-10" />
            
            {/* Image Container with Parallax */}
            <div className="relative aspect-4/3 overflow-hidden">
              <motion.div
                style={{ y: imageY }}
                className="absolute inset-0 scale-110"
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </motion.div>
              
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-linear-to-t from-[var(--surface)] via-black/20 to-transparent opacity-70" />
              
              {/* Scan Line Effect */}
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none"
                style={{
                  background: "linear-gradient(180deg, transparent 0%, rgba(0, 133, 202, 0.03) 50%, transparent 100%)",
                  backgroundSize: "100% 200%",
                }}
                animate={{
                  backgroundPosition: ["0% 0%", "0% 100%"],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
              
              {/* Year Badge */}
              <div className="absolute top-4 left-4 md:top-6 md:left-6 z-10">
                <div className="px-3 py-1.5 bg-black/60 backdrop-blur-md border border-white/10">
                  <span 
                    className="text-[10px] tracking-[0.2em] text-white/60 uppercase"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {project.year}
                  </span>
                </div>
              </div>
              
              {/* Role Badge */}
              <div className="absolute top-4 right-4 md:top-6 md:right-6 z-10">
                <div className="px-3 py-1.5 bg-acm-blue/20 backdrop-blur-md border border-acm-blue/30">
                  <span 
                    className="text-[10px] tracking-[0.2em] text-acm-blue uppercase"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {project.role}
                  </span>
                </div>
              </div>

              {/* Project Number */}
              <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 z-10">
                <span 
                  className="text-6xl md:text-8xl font-black text-white/5"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {project.id}
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Content Side */}
        <div className={`relative ${isReversed ? "lg:col-start-1 lg:row-start-1" : ""}`}>
          {/* Background Number */}
          <div className="absolute -top-8 -left-4 hidden lg:block pointer-events-none">
            <span 
              className="text-[180px] font-black text-white/[0.02] leading-none select-none"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {project.id}
            </span>
          </div>
          
          {/* Content */}
          <div className="relative z-10">
            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-acm-blue text-sm md:text-base mb-3"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {project.subtitle}
            </motion.p>
            
            {/* Title */}
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-black text-[var(--foreground)] mb-4 sm:mb-6 tracking-normal"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {project.title}
            </motion.h3>
            
            {/* Accent Line */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="w-16 h-0.5 bg-linear-to-r from-acm-blue to-transparent origin-left mb-6"
            />
            
            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-white/50 text-sm md:text-base leading-[1.8] max-w-lg mb-8"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {project.summary}
            </motion.p>
            
            {/* Metrics */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-wrap gap-6 mb-8"
            >
              {project.metrics.map((metric, i) => (
                <div key={i} className="relative pl-4 border-l-2 border-acm-blue/30">
                  <span 
                    className="text-xs md:text-sm text-white/60 uppercase tracking-wide"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {metric}
                  </span>
                </div>
              ))}
            </motion.div>
            
            {/* Tags */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex flex-wrap gap-2 mb-10"
            >
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 text-[10px] md:text-xs uppercase tracking-[0.15em] text-white/40 border border-white/10 bg-white/5 hover:border-acm-blue/30 hover:bg-acm-blue/5 hover:text-white/60 transition-all duration-300 cursor-default"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {tag}
                </span>
              ))}
            </motion.div>
            
            {/* CTA */}
            {project.link && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3"
                >
                  <span className="relative overflow-hidden">
                    <span 
                      className="relative z-10 px-6 py-3 inline-flex items-center gap-3 border border-white/20 group-hover:border-acm-blue/50 bg-white/5 group-hover:bg-acm-blue/10 transition-all duration-300"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      <span className="text-sm text-white/80 group-hover:text-[var(--foreground)] transition-colors">
                        View Project
                      </span>
                      <ArrowUpRight className="w-4 h-4 text-acm-blue transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </span>
                </a>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

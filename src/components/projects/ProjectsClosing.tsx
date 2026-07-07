"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight, Mail, Linkedin } from "lucide-react";

export default function ProjectsClosing() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0.5]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full overflow-hidden bg-[#030303] py-24 md:py-40"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-acm-blue/10 blur-[200px]"
        />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-purple-900/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-acm-blue/5 rounded-full blur-[120px]" />
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* Corner Accents */}
      <div className="absolute top-8 left-8 md:top-16 md:left-16">
        <div className="w-16 h-16 md:w-20 md:h-20 border-l-2 border-t-2 border-white/10" />
      </div>
      <div className="absolute top-8 right-8 md:top-16 md:right-16">
        <div className="w-16 h-16 md:w-20 md:h-20 border-r-2 border-t-2 border-white/10" />
      </div>
      <div className="absolute bottom-8 left-8 md:bottom-16 md:left-16">
        <div className="w-16 h-16 md:w-20 md:h-20 border-l-2 border-b-2 border-white/10" />
      </div>
      <div className="absolute bottom-8 right-8 md:bottom-16 md:right-16">
        <div className="w-16 h-16 md:w-20 md:h-20 border-r-2 border-b-2 border-white/10" />
      </div>

      {/* Main Content */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-12 text-center"
      >
        {/* Section Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-4 mb-10"
        >
          <div className="w-12 h-px bg-linear-to-r from-transparent to-acm-blue/50" />
          <span 
            className="text-[10px] md:text-[11px] tracking-[0.5em] text-white/30 uppercase"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Let's Build Together
          </span>
          <div className="w-12 h-px bg-linear-to-l from-transparent to-acm-blue/50" />
        </motion.div>

        {/* Main Title */}
        <div className="overflow-hidden mb-4">
          <motion.h2
            initial={{ y: "100%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl md:text-7xl lg:text-8xl font-black text-[var(--foreground)] tracking-normal leading-[0.95]"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            HAVE A PROJECT
          </motion.h2>
        </div>
        
        <div className="overflow-hidden mb-8">
          <motion.h2
            initial={{ y: "100%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl md:text-7xl lg:text-8xl font-black tracking-normal leading-[0.95]"
            style={{ 
              fontFamily: "var(--font-heading)",
              background: "linear-gradient(135deg, #0085CA 0%, #00A3E0 50%, #0085CA 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            IN MIND?
          </motion.h2>
        </div>

        {/* Decorative Line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="w-24 h-0.5 bg-linear-to-r from-transparent via-acm-blue to-transparent mx-auto mb-10"
        />

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-white/40 text-sm md:text-lg max-w-2xl mx-auto leading-relaxed mb-14"
          style={{ fontFamily: "var(--font-body)" }}
        >
          We&apos;re always looking for new challenges and exciting projects. 
          Whether you have a <span className="text-white/60">groundbreaking idea</span> or want to 
          <span className="text-acm-blue"> collaborate</span>, let&apos;s make something extraordinary together.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20"
        >
          {/* Primary CTA */}
          <a
            href="mailto:usaracm@ipu.ac.in"
            className="group relative px-8 py-4 bg-acm-blue hover:bg-acm-blue-light overflow-hidden transition-all duration-300"
          >
            {/* Shine Effect */}
            <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            
            <span className="relative flex items-center gap-3">
              <Mail className="w-4 h-4 text-[var(--foreground)]" />
              <span 
                className="text-sm font-medium text-[var(--foreground)] tracking-wide"
                style={{ fontFamily: "var(--font-body)" }}
              >
                Get In Touch
              </span>
              <ArrowUpRight className="w-4 h-4 text-[var(--foreground)] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </a>

          {/* Secondary CTA */}
          <a
            href="/teams"
            className="group px-8 py-4 border border-white/20 hover:border-acm-blue/50 bg-white/5 hover:bg-acm-blue/10 transition-all duration-300"
          >
            <span className="flex items-center gap-3">
              <span 
                className="text-sm font-medium text-white/80 group-hover:text-[var(--foreground)] tracking-wide transition-colors"
                style={{ fontFamily: "var(--font-body)" }}
              >
                Meet The Team
              </span>
              <ArrowUpRight className="w-4 h-4 text-white/50 group-hover:text-acm-blue transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </a>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-10 md:gap-16 mb-16"
        >
          {[
            { value: "05", label: "Projects Completed" },
            { value: "12+", label: "Technologies Used" },
            { value: "∞", label: "Possibilities" },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div 
                className="text-3xl md:text-5xl font-black text-[var(--foreground)] mb-2"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {stat.value}
              </div>
              <div 
                className="text-[9px] md:text-[10px] tracking-[0.25em] text-white/30 uppercase"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="flex items-center justify-center gap-4"
        >
          {[
            { icon: Linkedin, href: "https://linkedin.com/company/usaracm", label: "LinkedIn" },
            { icon: Mail, href: "mailto:usaracm@ipu.ac.in", label: "Email" },
          ].map((social, i) => (
            <a
              key={i}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-3 border border-white/10 hover:border-acm-blue/30 bg-white/5 hover:bg-acm-blue/10 transition-all duration-300"
              aria-label={social.label}
            >
              <social.icon className="w-5 h-5 text-white/40 group-hover:text-acm-blue transition-colors" />
            </a>
          ))}
        </motion.div>
      </motion.div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-[#030303] to-transparent pointer-events-none" />
    </section>
  );
}

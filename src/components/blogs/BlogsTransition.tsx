"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";

export default function BlogsTransition() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const opacity = useTransform(smoothProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const y = useTransform(smoothProgress, [0, 0.3, 0.7, 1], [80, 0, 0, -80]);
  const scale = useTransform(smoothProgress, [0, 0.3, 0.7, 1], [0.95, 1, 1, 0.95]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[80vh] overflow-hidden bg-[#030303] py-32 md:py-40"
    >
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Central glow */}
        <motion.div
          style={{ opacity }}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-acm-blue/[0.04] rounded-full blur-[200px]"
        />
        
        {/* Vertical line */}
        <div className="absolute left-1/2 top-0 -translate-x-1/2 w-px h-full">
          <motion.div
            className="h-full w-full bg-linear-to-b from-transparent via-acm-blue/20 to-transparent"
            style={{ scaleY: smoothProgress, transformOrigin: "top" }}
          />
        </div>

        {/* Horizontal lines */}
        <div className="absolute top-1/3 left-0 right-0 h-px bg-linear-to-r from-transparent via-white/[0.03] to-transparent" />
        <div className="absolute bottom-1/3 left-0 right-0 h-px bg-linear-to-r from-transparent via-white/[0.03] to-transparent" />
      </div>

      {/* Content */}
      <motion.div
        style={{ opacity, y, scale }}
        className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 flex flex-col items-center text-center"
      >
        {/* Decorative symbol */}
        <motion.div
          initial={{ scale: 0, rotate: -45 }}
          whileInView={{ scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12"
        >
          <div className="relative w-20 h-20">
            {/* Outer ring */}
            <motion.div
              className="absolute inset-0 border border-white/10 rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            />
            
            {/* Middle ring */}
            <motion.div
              className="absolute inset-2 border border-acm-blue/20 rounded-full"
              animate={{ rotate: -360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
            
            {/* Inner dot */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-3 h-3 bg-acm-blue/40 rounded-full" />
            </div>
            
            {/* Orbiting dot */}
            <motion.div
              className="absolute w-2 h-2 bg-acm-blue rounded-full"
              style={{
                top: "50%",
                left: "50%",
                marginTop: "-4px",
                marginLeft: "-4px",
              }}
              animate={{
                x: [0, 40, 0, -40, 0],
                y: [-40, 0, 40, 0, -40],
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            />
          </div>
        </motion.div>

        {/* Quote mark */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <span 
            className="text-8xl md:text-9xl font-black text-acm-blue/10 leading-none select-none"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            &ldquo;
          </span>
        </motion.div>

        {/* Quote */}
        <motion.blockquote
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <span 
            className="block text-2xl md:text-4xl lg:text-5xl font-black text-white/80 leading-[1.2] tracking-normal"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            EVERY STORY WE TELL IS A{" "}
            <span 
              className="relative inline-block"
              style={{
                background: "linear-gradient(135deg, #0085CA 0%, #00A3FF 50%, #0085CA 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              WINDOW
              <motion.span
                className="absolute -bottom-1 left-0 right-0 h-px bg-acm-blue/40 block"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.8 }}
              />
            </span>{" "}
            INTO THE MINDS THAT SHAPE OUR FUTURE
          </span>
        </motion.blockquote>

        {/* Attribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 flex items-center gap-6"
        >
          <div className="w-12 md:w-20 h-px bg-linear-to-r from-transparent to-white/20" />
          <span 
            className="text-[10px] md:text-[11px] tracking-[0.5em] text-white/30 uppercase"
            style={{ fontFamily: "var(--font-body)" }}
          >
            ACM Editorial Team
          </span>
          <div className="w-12 md:w-20 h-px bg-linear-to-l from-transparent to-white/20" />
        </motion.div>

        {/* Decorative line */}
        <motion.div
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 w-px h-24 bg-linear-to-b from-acm-blue/40 to-transparent origin-top"
        />
      </motion.div>
    </section>
  );
}

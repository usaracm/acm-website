"use client";

import { motion, useInView, useSpring, useTransform, MotionValue } from "framer-motion";
import { useRef, useEffect, useState } from "react";

/**
 * Hook to detect if element was scrolled into view from below (scrolling down)
 * Only triggers animation once when first scrolled into view from below
 */
export function useScrollDownInView(ref: React.RefObject<HTMLElement | null>, amount: number = 0.3) {
  const [hasAnimated, setHasAnimated] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const isInView = useInView(ref, { once: false, amount });

  useEffect(() => {
    if (hasAnimated) return; // Already animated, don't check anymore
    
    if (isInView) {
      const currentScrollY = window.scrollY;
      // Only animate if scrolling down (current scroll > last scroll) or first load
      if (currentScrollY >= lastScrollY || lastScrollY === 0) {
        setHasAnimated(true);
      }
      setLastScrollY(currentScrollY);
    }
  }, [isInView, hasAnimated, lastScrollY]);

  useEffect(() => {
    const handleScroll = () => {
      if (!hasAnimated) {
        setLastScrollY(window.scrollY);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasAnimated]);

  return hasAnimated;
}

/**
 * Character-by-character text reveal animation
 * Premium Awwwards-style effect - only plays once when scrolled into view from below
 */
interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
}

export function TextReveal({
  text,
  className = "",
  delay = 0,
  stagger = 0.03,
}: TextRevealProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const shouldAnimate = useScrollDownInView(ref, 0.3);
  const chars = text.split("");

  return (
    <span ref={ref} className={`inline-block ${className}`}>
      {chars.map((char, i) => (
        <motion.span
          key={`${char}-${i}`}
          className="inline-block"
          initial={{ opacity: 0, y: 40, rotateX: -90 }}
          animate={shouldAnimate ? { opacity: 1, y: 0, rotateX: 0 } : {}}
          transition={{
            duration: 0.6,
            delay: delay + i * stagger,
            ease: [0.25, 0.1, 0.25, 1],
          }}
          style={{ transformOrigin: "bottom" }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
}

/**
 * Word-by-word reveal with mask effect
 * Smoother for longer text
 */
interface WordRevealProps {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
}

export function WordReveal({
  text,
  className = "",
  delay = 0,
  stagger = 0.08,
}: WordRevealProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const shouldAnimate = useScrollDownInView(ref, 0.3);
  const words = text.split(" ");

  return (
    <span ref={ref} className={`inline-block ${className}`}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="inline-block overflow-hidden mr-[0.25em]">
          <motion.span
            className="inline-block"
            initial={{ y: "100%" }}
            animate={shouldAnimate ? { y: 0 } : {}}
            transition={{
              duration: 0.7,
              delay: delay + i * stagger,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/**
 * Line-by-line reveal animation
 * Great for paragraphs
 */
interface LineRevealProps {
  lines: string[];
  className?: string;
  lineClassName?: string;
  delay?: number;
  stagger?: number;
}

export function LineReveal({
  lines,
  className = "",
  lineClassName = "",
  delay = 0,
  stagger = 0.15,
}: LineRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldAnimate = useScrollDownInView(ref, 0.3);

  return (
    <div ref={ref} className={className}>
      {lines.map((line, i) => (
        <div key={i} className="overflow-hidden">
          <motion.div
            className={lineClassName}
            initial={{ y: "100%", opacity: 0 }}
            animate={shouldAnimate ? { y: 0, opacity: 1 } : {}}
            transition={{
              duration: 0.8,
              delay: delay + i * stagger,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          >
            {line}
          </motion.div>
        </div>
      ))}
    </div>
  );
}

/**
 * Animated Counter
 * Smooth spring-based number animation
 */
interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  className?: string;
  duration?: number;
}

function AnimatedNumber({ value, className }: { value: MotionValue<number>; className?: string }) {
  const [displayValue, setDisplayValue] = useState(0);
  
  useEffect(() => {
    const unsubscribe = value.on("change", (latest) => {
      setDisplayValue(Math.round(latest));
    });
    return unsubscribe;
  }, [value]);
  
  return <span className={className}>{displayValue}</span>;
}

export function AnimatedCounter({
  value,
  suffix = "",
  prefix = "",
  className = "",
  duration = 2,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const shouldAnimate = useScrollDownInView(ref, 0.3);
  
  const spring = useSpring(0, { 
    duration: duration * 1000,
    bounce: 0,
  });
  
  const display = useTransform(spring, (current) => Math.round(current));
  
  useEffect(() => {
    if (shouldAnimate) {
      spring.set(value);
    }
  }, [shouldAnimate, spring, value]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      <AnimatedNumber value={display} />
      {suffix}
    </span>
  );
}

/**
 * Gradient text reveal with clip path
 * Premium effect for headings
 */
interface GradientRevealProps {
  text: string;
  className?: string;
  gradientFrom?: string;
  gradientTo?: string;
  delay?: number;
}

export function GradientReveal({
  text,
  className = "",
  gradientFrom = "#0085ca",
  gradientTo = "#00c6ff",
  delay = 0,
}: GradientRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldAnimate = useScrollDownInView(ref, 0.3);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      {/* Background text (reveals as gradient wipes) */}
      <span className="text-white/20">{text}</span>
      
      {/* Gradient overlay text */}
      <motion.span
        className="absolute inset-0"
        style={{
          background: `linear-gradient(90deg, ${gradientFrom}, ${gradientTo})`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
        initial={{ clipPath: "inset(0 100% 0 0)" }}
        animate={shouldAnimate ? { clipPath: "inset(0 0% 0 0)" } : {}}
        transition={{
          duration: 1.2,
          delay,
          ease: [0.25, 0.1, 0.25, 1],
        }}
      >
        {text}
      </motion.span>
    </div>
  );
}

/**
 * Split text with staggered reveal from center
 * Great for impactful statements
 */
interface CenterSplitRevealProps {
  text: string;
  className?: string;
  delay?: number;
}

export function CenterSplitReveal({
  text,
  className = "",
  delay = 0,
}: CenterSplitRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldAnimate = useScrollDownInView(ref, 0.3);
  const chars = text.split("");
  const midIndex = Math.floor(chars.length / 2);

  return (
    <div ref={ref} className={`inline-block ${className}`}>
      {chars.map((char, i) => {
        const distanceFromCenter = Math.abs(i - midIndex);
        const charDelay = delay + distanceFromCenter * 0.04;
        
        return (
          <motion.span
            key={`${char}-${i}`}
            className="inline-block"
            initial={{ opacity: 0, scale: 0.5, filter: "blur(10px)" }}
            animate={shouldAnimate ? { opacity: 1, scale: 1, filter: "blur(0px)" } : {}}
            transition={{
              duration: 0.6,
              delay: charDelay,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        );
      })}
    </div>
  );
}

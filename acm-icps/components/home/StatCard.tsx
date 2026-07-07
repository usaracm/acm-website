"use client";

import { useEffect, useState, useRef } from "react";
import { useInView, useReducedMotion } from "framer-motion";

interface Stat {
  label: string;
  value: number;
  suffix?: string;
  isTarget?: boolean;
}

interface StatCardProps {
  stat: Stat;
}

export default function StatCard({ stat }: StatCardProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (!isInView) return;

    if (shouldReduceMotion) {
      const frameId = requestAnimationFrame(() => {
        setDisplayValue(stat.value);
      });
      return () => cancelAnimationFrame(frameId);
    }

    const start = 0;
    const end = stat.value;
    const duration = 1200; // 1.2s max duration
    const startTime = performance.now();
    let animationFrameId: number;

    const animateCount = (timestamp: number) => {
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // Easing out quad
      const easedProgress = progress * (2 - progress);
      const currentVal = Math.floor(easedProgress * (end - start) + start);

      setDisplayValue(currentVal);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animateCount);
      } else {
        setDisplayValue(end);
      }
    };

    animationFrameId = requestAnimationFrame(animateCount);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isInView, stat.value, shouldReduceMotion]);

  const fullSentenceLabel = `Statistic: ${stat.value}${stat.suffix || ""} for ${stat.label}`;

  return (
    <div
      ref={ref}
      className="flex flex-col items-center justify-center p-4 sm:p-6 bg-canvas border border-hairline rounded-none text-center select-none"
      aria-label={fullSentenceLabel}
    >
      <span className="font-sans text-[28px] sm:text-[36px] md:text-[44px] font-[300] tracking-[-1px] text-ink leading-none tnum">
        {/* Render final value initially for screen readers, displayValue dynamically on client */}
        <span aria-hidden="true">
          {displayValue}
          {stat.suffix}
        </span>
        {/* Fallback for screen reader accessibility */}
        <span className="sr-only">
          {stat.value}
          {stat.suffix}
        </span>
      </span>
      <span className="text-[12px] text-ink-secondary mt-3 font-sans">
        {stat.label}
      </span>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

interface CountdownProps {
  targetDate: string; // ISO string, e.g., "2026-11-06T09:00:00+05:30"
  variant?: "hero" | "compact";
}

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const ZERO_TIME: TimeRemaining = {
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
};

function calculateTime(target: string): TimeRemaining | null {
  const targetMs = Date.parse(target);
  if (Number.isNaN(targetMs)) return null;

  const diff = targetMs - Date.now();
  if (diff <= 0) return ZERO_TIME;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / 1000 / 60) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return { days, hours, minutes, seconds };
}

function TimeBlock({
  value,
  label,
  animate,
  shouldReduceMotion,
}: {
  value: number;
  label: string;
  animate?: boolean;
  shouldReduceMotion: boolean | null;
}) {
  const formattedValue = String(value).padStart(2, "0");

  return (
    <div className="flex flex-col items-center rounded-none border border-hairline bg-canvas-soft px-3 py-3 sm:px-4 sm:py-4">
      <div className="relative h-[36px] sm:h-[42px] min-w-[44px] sm:min-w-[52px] flex items-center justify-center overflow-hidden">
        {animate ? (
          <AnimatePresence mode="popLayout">
            <motion.span
              key={formattedValue}
              initial={shouldReduceMotion ? { opacity: 0 } : { transform: "translateY(12px)", opacity: 0 }}
              animate={{ transform: "translateY(0px)", opacity: 1 }}
              exit={shouldReduceMotion ? { opacity: 0 } : { transform: "translateY(-12px)", opacity: 0 }}
              transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] as const }}
              className="font-sans text-[28px] sm:text-[34px] font-[300] tracking-tight text-primary tnum leading-none"
            >
              {formattedValue}
            </motion.span>
          </AnimatePresence>
        ) : (
          <span className="font-sans text-[28px] sm:text-[34px] font-[300] tracking-tight text-primary tnum leading-none">
            {formattedValue}
          </span>
        )}
      </div>
      <span className="mt-1.5 text-[9px] sm:text-[10px] font-sans uppercase tracking-[0.14em] text-ink-mute">
        {label}
      </span>
    </div>
  );
}

export default function Countdown({ targetDate, variant = "hero" }: CountdownProps) {
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>(() => {
    const initial = calculateTime(targetDate);
    return initial ?? ZERO_TIME;
  });
  const isError = Number.isNaN(Date.parse(targetDate));
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (isError) return;

    const interval = setInterval(() => {
      const remaining = calculateTime(targetDate);
      if (remaining) {
        setTimeRemaining(remaining);
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate, isError]);

  // Error state: Render fallback date string safely
  if (isError) {
    return (
      <div className="text-[13px] font-sans text-ink-mute text-center" aria-label="Conference is live">
        {variant === "hero" ? "Event Date: January 14, 2027" : "Jan 14, 2027"}
      </div>
    );
  }

  const { days, hours, minutes, seconds } = timeRemaining;

  if (variant === "compact") {
    return (
      <div className="text-[13px] font-sans text-ink-mute tnum" aria-label="Compact countdown">
        {days}d {hours}h {minutes}m to IIC-AIR 27
      </div>
    );
  }

  const srAnnouncement = `Time remaining to conference: ${days} days, ${hours} hours, and ${minutes} minutes.`;

  return (
    <div
      className="flex w-full max-w-[360px] sm:max-w-[520px] flex-col items-center rounded-none border border-hairline bg-canvas px-3 py-4 sm:px-5 sm:py-5"
      aria-label="Live conference countdown"
    >
      {/* Hidden container for screen readers */}
      <div className="sr-only" aria-live="polite">
        {srAnnouncement}
      </div>

      <span className="mb-3 text-[10px] font-sans uppercase tracking-[0.15em] text-ink-mute sm:mb-4">
        Time Remaining to Main Event
      </span>

      <div className="grid w-full grid-cols-2 gap-2.5 sm:grid-cols-4 sm:gap-3" aria-hidden="true">
        <TimeBlock value={days} label="Days" shouldReduceMotion={shouldReduceMotion} />
        <TimeBlock value={hours} label="Hours" shouldReduceMotion={shouldReduceMotion} />
        <TimeBlock value={minutes} label="Mins" shouldReduceMotion={shouldReduceMotion} />
        <TimeBlock value={seconds} label="Secs" animate={true} shouldReduceMotion={shouldReduceMotion} />
      </div>
    </div>
  );
}

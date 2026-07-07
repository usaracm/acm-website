"use client";

import { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Milestone } from "@/lib/content";

interface TimelineItemProps {
  milestone: Milestone;
  index: number;
  status: "completed" | "current" | "upcoming";
}

export default function TimelineItem({ milestone, index, status }: TimelineItemProps) {
  const shouldReduceMotion = useReducedMotion();

  // Format the date for human reading
  const formattedDate = useMemo(() => {
    try {
      const parsedDate = new Date(milestone.date);
      if (isNaN(parsedDate.getTime())) {
        return milestone.date;
      }
      return parsedDate.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return milestone.date;
    }
  }, [milestone.date]);

  // Motion variants that degrade gracefully: fades in without offset under prefers-reduced-motion
  const itemVariants = {
    hidden: { opacity: 0, transform: shouldReduceMotion ? "translateY(0px)" : "translateY(16px)" },
    visible: {
      opacity: 1,
      transform: "translateY(0px)",
      transition: {
        duration: 0.4,
        ease: [0.23, 1, 0.32, 1] as const, // custom curve
      },
    },
  };

  return (
    <motion.li
      variants={itemVariants}
      className="relative flex gap-6 md:gap-8 pb-12 last:pb-0"
    >
      {/* Screen Reader accessibility status */}
      <span className="sr-only">
        Milestone {index + 1}: {milestone.label} on {formattedDate}. Status: {status}.
      </span>

      {/* Decorative vertical line connector (hairline color) */}
      <div
        className="absolute left-3 top-6 bottom-0 w-[2px] bg-hairline last:hidden"
        aria-hidden="true"
      />

      {/* Milestone Node (Flat square status block for IBM Carbon) */}
      <div className="relative flex items-center justify-center mt-1.5 z-10" aria-hidden="true">
        {status === "completed" && (
          <div className="h-6 w-6 rounded-none bg-primary/10 border border-primary flex items-center justify-center">
            <svg
              className="h-3.5 w-3.5 text-primary"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={3}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        )}

        {status === "current" && (
          <div className="relative flex h-6 w-6 items-center justify-center border border-primary bg-canvas rounded-none">
            <span className="inline-flex rounded-none h-2.5 w-2.5 bg-primary" />
          </div>
        )}

        {status === "upcoming" && (
          <div className="h-6 w-6 rounded-none bg-canvas border border-hairline flex items-center justify-center">
            <span className="h-2 w-2 rounded-none bg-ink-mute" />
          </div>
        )}
      </div>

      {/* Content block: styled using flat canvas and hairline borders, no shadows */}
      <div className="flex-1 flex flex-col md:flex-row md:items-start justify-between gap-2 md:gap-6 bg-canvas p-4 sm:p-5 border border-hairline rounded-none hover:border-primary transition-colors">
        <div>
          <h3
            className={cn(
              "text-[15px] font-semibold text-ink leading-tight",
              status === "completed" && "text-ink-mute"
            )}
          >
            {milestone.label}
          </h3>
          <span className="font-sans text-[12px] text-ink-mute mt-1.5 block tnum">
            {milestone.date}
          </span>
        </div>
        <div
          className={cn(
            "text-[12px] font-medium px-2.5 py-1 rounded-none self-start md:self-auto uppercase tracking-wider font-sans tnum border",
            status === "completed" && "bg-canvas-soft text-ink-mute border-hairline",
            status === "current" && "bg-primary/5 text-primary border-primary/20",
            status === "upcoming" && "bg-canvas-soft text-ink-mute border-hairline"
          )}
        >
          {status === "completed" && "Passed"}
          {status === "current" && "Active"}
          {status === "upcoming" && "Upcoming"}
        </div>
      </div>
    </motion.li>
  );
}

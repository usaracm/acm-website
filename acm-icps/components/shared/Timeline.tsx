"use client";

import { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import TimelineItem from "./TimelineItem";
import { Milestone } from "@/lib/content";

interface TimelineProps {
  milestones: Milestone[];
}

export default function Timeline({ milestones }: TimelineProps) {
  const shouldReduceMotion = useReducedMotion();

  // Classify milestone status dynamically
  const classifiedMilestones = useMemo(() => {
    // Current date for comparison: set to July 7, 2026 based on workspace context
    const currentDate = new Date("2026-07-07");

    // Find the index of the first milestone that is not past
    const firstUpcomingIndex = milestones.findIndex((milestone) => {
      const milestoneDate = new Date(milestone.date);
      return !(milestone.done || milestoneDate < currentDate);
    });

    return milestones.map((milestone, index) => {
      const milestoneDate = new Date(milestone.date);
      const isPast = milestone.done || milestoneDate < currentDate;

      let status: "completed" | "current" | "upcoming" = "upcoming";

      if (isPast) {
        status = "completed";
      } else if (index === firstUpcomingIndex) {
        status = "current";
      }

      return {
        milestone,
        status,
      };
    });
  }, [milestones]);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  if (milestones.length === 0) {
    return (
      <div className="p-8 border border-dashed border-hairline rounded-[12px] text-center bg-canvas-soft">
        <p className="text-[14px] text-ink-muted">Dates to be announced soon.</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-6">
      <motion.ol
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={shouldReduceMotion ? undefined : containerVariants}
        className="relative"
      >
        {classifiedMilestones.map(({ milestone, status }, index) => (
          <TimelineItem
            key={`${milestone.label}-${index}`}
            milestone={milestone}
            index={index}
            status={status}
          />
        ))}
      </motion.ol>
    </div>
  );
}

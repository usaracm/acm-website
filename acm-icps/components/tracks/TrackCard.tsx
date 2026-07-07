"use client";

import { useState } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { Database, Bot, Brain, Network, X, LucideIcon } from "lucide-react";
import { Track } from "@/lib/content";

interface TrackCardProps {
  track: Track;
  index: number;
}

// Icon dictionary to map string to Lucide components
const ICON_MAP: Record<string, LucideIcon> = {
  Database: Database,
  Bot: Bot,
  Brain: Brain,
  Network: Network,
};

// Per-track Carbon accent colors
const TRACK_COLORS: Record<number, { icon: string; badge: string; hover: string; bullet: string }> = {
  0: {
    icon: "bg-primary/10 text-primary",
    badge: "bg-primary/8 text-primary border-primary/20",
    hover: "hover:border-primary",
    bullet: "bg-primary/50",
  },
  1: {
    icon: "bg-[#24a148]/10 text-[#24a148]",
    badge: "bg-[#24a148]/8 text-[#24a148] border-[#24a148]/20",
    hover: "hover:border-[#24a148]",
    bullet: "bg-[#24a148]/50",
  },
  2: {
    icon: "bg-ruby/10 text-ruby",
    badge: "bg-ruby/8 text-ruby border-ruby/20",
    hover: "hover:border-ruby",
    bullet: "bg-ruby/50",
  },
  3: {
    icon: "bg-lemon/15 text-[#9b6829]",
    badge: "bg-lemon/10 text-[#9b6829] border-lemon/30",
    hover: "hover:border-[#9b6829]",
    bullet: "bg-[#9b6829]/40",
  },
};


export default function TrackCard({ track, index }: TrackCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const IconComponent = ICON_MAP[track.icon] || Database;
  const colors = TRACK_COLORS[index % 4] || TRACK_COLORS[0];

  const cardVariants = {
    hidden: { opacity: 0, transform: shouldReduceMotion ? "translateY(0px)" : "translateY(16px)" },
    visible: {
      opacity: 1,
      transform: "translateY(0px)",
      transition: {
        duration: 0.4,
        ease: [0.23, 1, 0.32, 1] as const,
        delay: index * 0.05,
      },
    },
  };

  return (
    <>
      <motion.div
        variants={cardVariants}
        onClick={() => setIsOpen(true)}
        className={`group relative flex flex-col justify-between p-5 sm:p-7 bg-canvas border border-hairline rounded-none transition-all duration-200 hover-lift cursor-pointer ${colors.hover}`}
      >
        <div>
          {/* Track Icon */}
          <div className={`flex h-11 w-11 items-center justify-center rounded-none transition-colors ${colors.icon}`}>
            <IconComponent className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
          </div>

          {/* Track Domain */}
          <h3 className="mt-5 text-[20px] font-[300] tracking-[-0.2px] text-ink leading-tight">
            {track.domain}
          </h3>

          {/* Track Description */}
          {track.description && (
            <p className="mt-3 text-[13px] text-ink-secondary leading-relaxed font-[300]">
              {track.description}
            </p>
          )}

          {/* Sub-topics list */}
          <ul className="mt-5 flex flex-col gap-2.5" aria-label={`Sub-topics for ${track.domain}`}>
            {track.topics.slice(0, 4).map((topic, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2.5 text-[14px] text-ink-secondary leading-relaxed font-[300]"
              >
                {/* Square Carbon bullet */}
                <span className={`mt-2.5 h-1 w-1 shrink-0 rounded-none ${colors.bullet}`} aria-hidden="true" />
                <span>{topic}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Footer: track index badge + CTA */}
        <div className="mt-6 flex items-center justify-between">
          <span className={`inline-flex items-center px-2 py-0.5 rounded-none text-[9px] font-sans uppercase tracking-widest border ${colors.badge}`}>
            Track {String(index + 1).padStart(2, "0")}
          </span>
          <div className="flex items-center text-[12px] font-medium text-primary group-hover:translate-x-1 transition-transform duration-200" aria-hidden="true">
            <span>View Details</span>
            <svg className="ml-1 h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </motion.div>

      {/* Modal Dialog */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-[#161616]/60 backdrop-blur-sm"
            />
            
            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
              className="relative w-full max-w-xl bg-canvas border border-hairline p-6 sm:p-8 shadow-2xl z-10 rounded-none flex flex-col gap-6"
            >
              {/* Close Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOpen(false);
                }}
                className="absolute top-4 right-4 text-ink-mute hover:text-ink transition-colors p-1.5 border border-transparent hover:border-hairline bg-canvas-soft rounded-none"
                aria-label="Close modal"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="flex flex-col gap-1.5 pr-8">
                <span className={`inline-flex self-start px-2 py-0.5 border text-[9px] font-sans uppercase tracking-widest ${colors.badge}`}>
                  Track {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="text-[22px] font-[300] tracking-[-0.3px] text-ink leading-tight mt-2">
                  {track.domain}
                </h3>
              </div>

              <div className="flex flex-col gap-5 text-[14px] leading-relaxed text-ink-secondary font-[300]">
                <div>
                  <h4 className="font-semibold text-ink text-[12px] uppercase tracking-wider font-sans mb-1.5">Track Scope</h4>
                  <p>{track.overview || track.description}</p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-ink text-[12px] uppercase tracking-wider font-sans mb-2">Expanded Areas of Interest</h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-[13px]">
                    {(track.expandedTopics || track.topics).map((topic, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className={`mt-2 h-1 w-1 shrink-0 rounded-none ${colors.bullet}`} />
                        <span>{topic}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-t border-hairline pt-4 mt-2 flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center">
                  <div className="text-[12px] text-ink-mute">
                    Submission Format: Double-Blind (ACM Template)
                  </div>
                  <a
                    href="https://openreview.net"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-9 items-center justify-center bg-primary text-white px-4 text-[13px] font-medium hover:bg-primary-deep transition-colors rounded-none"
                  >
                    Submit Paper →
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

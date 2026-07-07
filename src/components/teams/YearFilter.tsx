"use client";

import { motion } from "framer-motion";
import { type TeamYear } from "@/data/teamData";

interface YearFilterProps {
  selectedYear: TeamYear;
  onYearChange: (year: TeamYear) => void;
}

const years: { value: TeamYear; label: string; badge?: string }[] = [
  { value: "2025-26", label: "2025-26", badge: "Current" },
  { value: "2024-25", label: "2024-25", badge: "Founding" },
];

export default function YearFilter({ selectedYear, onYearChange }: YearFilterProps) {
  return (
    <div className="relative z-20 max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 py-8 md:py-12">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        {/* Label */}
        <div className="flex items-center gap-4">
          <div className="w-12 md:w-16 h-px bg-linear-to-r from-acm-blue/60 to-transparent" />
          <span
            className="text-[10px] md:text-[11px] font-light tracking-[0.4em] text-white/40 uppercase"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Select Year
          </span>
        </div>

        {/* Year Tabs */}
        <div className="flex items-center gap-2 p-1 bg-white/5 border border-white/10 backdrop-blur-sm">
          {years.map((year) => (
            <button
              key={year.value}
              onClick={() => onYearChange(year.value)}
              className={`relative px-4 md:px-6 py-2.5 md:py-3 transition-all duration-300 ${selectedYear === year.value
                  ? "text-[var(--foreground)]"
                  : "text-white/40 hover:text-white/60"
                }`}
            >
              {/* Active Background */}
              {selectedYear === year.value && (
                <motion.div
                  layoutId={undefined}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute inset-0 bg-acm-blue/20 border border-acm-blue/30"
                  transition={{ duration: 0.3 }}
                />
              )}

              <span className="relative z-10 flex items-center gap-2">
                <span
                  className="text-sm md:text-base font-medium tracking-wide"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {year.label}
                </span>
                {year.badge && selectedYear === year.value && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="px-2 py-0.5 text-[9px] tracking-[0.15em] uppercase bg-acm-blue/30 text-acm-blue border border-acm-blue/40"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {year.badge}
                  </motion.span>
                )}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Decorative Line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mt-8 h-px bg-linear-to-r from-transparent via-white/10 to-transparent"
      />
    </div>
  );
}

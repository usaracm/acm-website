"use client";

import { motion, useReducedMotion } from "framer-motion";
import TrackCard from "./TrackCard";
import { Track } from "@/lib/content";

interface TrackGridProps {
  tracks: Track[];
}

export default function TrackGrid({ tracks }: TrackGridProps) {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={shouldReduceMotion ? undefined : containerVariants}
      className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full"
    >
      {tracks.map((track, index) => (
        <TrackCard key={track.domain} track={track} index={index} />
      ))}
    </motion.div>
  );
}

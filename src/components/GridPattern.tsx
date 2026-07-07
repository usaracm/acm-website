"use client";

import { motion } from "framer-motion";

export default function GridPattern() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Animated grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.03 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, #ffffff 1px, transparent 1px),
            linear-gradient(to bottom, #ffffff 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Radial gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 30%, rgba(0, 133, 202, 0.08) 0%, transparent 50%)",
        }}
      />

      {/* Corner decorative elements */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 1.5 }}
        className="absolute top-0 right-0 w-[600px] h-[600px]"
        style={{
          background:
            "radial-gradient(circle, rgba(0, 133, 202, 0.1) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
    </div>
  );
}

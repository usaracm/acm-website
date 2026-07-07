"use client";

import { useRef, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

interface MagneticButtonProps {
  children: React.ReactNode;
  href: string;
  className?: string;
  strength?: number;
  external?: boolean;
}

/**
 * A button that subtly pulls toward the cursor on hover,
 * creating an organic "magnetic" feel. Uses framer-motion springs.
 */
export default function MagneticButton({
  children,
  href,
  className = "",
  strength = 0.35,
  external = false,
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [hovered, setHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * strength);
    y.set((e.clientY - cy) * strength);
  };

  const handleMouseLeave = () => {
    setHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={className}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      whileTap={{ scale: 0.96 }}
    >
      {/* Inner content with subtle counter-movement */}
      <motion.span
        className="relative z-10 flex items-center gap-3"
        animate={{ scale: hovered ? 1.03 : 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {children}
      </motion.span>
    </motion.a>
  );
}

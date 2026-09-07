'use client';

import { motion } from 'framer-motion';

interface SymbolProps {
  size?: number;
  className?: string;
  filled?: boolean;
  glowing?: boolean;
}

export function TriangleSymbol({ size = 40, className = '', filled = false, glowing = false }: SymbolProps) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      className={className}
      whileHover={{ scale: 1.15, filter: 'drop-shadow(0 0 12px rgba(255, 46, 136, 0.8))' }}
    >
      <polygon
        points="20,4 36,36 4,36"
        fill={filled ? '#ff2e88' : 'none'}
        stroke="#ff2e88"
        strokeWidth="1.5"
        style={glowing ? { filter: 'drop-shadow(0 0 6px rgba(255, 46, 136, 0.5))' } : {}}
      />
    </motion.svg>
  );
}

export function CircleSymbol({ size = 40, className = '', filled = false, glowing = false }: SymbolProps) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      className={className}
      whileHover={{ scale: 1.15, filter: 'drop-shadow(0 0 12px rgba(255, 46, 136, 0.8))' }}
    >
      <circle
        cx="20"
        cy="20"
        r="16"
        fill={filled ? '#ff2e88' : 'none'}
        stroke="#ff2e88"
        strokeWidth="1.5"
        style={glowing ? { filter: 'drop-shadow(0 0 6px rgba(255, 46, 136, 0.5))' } : {}}
      />
    </motion.svg>
  );
}

export function SquareSymbol({ size = 40, className = '', filled = false, glowing = false }: SymbolProps) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      className={className}
      whileHover={{ scale: 1.15, filter: 'drop-shadow(0 0 12px rgba(255, 46, 136, 0.8))' }}
    >
      <rect
        x="4"
        y="4"
        width="32"
        height="32"
        fill={filled ? '#ff2e88' : 'none'}
        stroke="#ff2e88"
        strokeWidth="1.5"
        style={glowing ? { filter: 'drop-shadow(0 0 6px rgba(255, 46, 136, 0.5))' } : {}}
      />
    </motion.svg>
  );
}
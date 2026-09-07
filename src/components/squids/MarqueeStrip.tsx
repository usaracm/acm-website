'use client';

import { motion } from 'framer-motion';
import { CircleSymbol, TriangleSymbol, SquareSymbol } from './SquidSymbols';

interface MarqueeStripProps {
  items?: string[];
  speed?: number;
  variant?: 'default' | 'accent' | 'subtle';
  reverse?: boolean;
  className?: string;
}

const SYMBOL_CYCLE = [CircleSymbol, TriangleSymbol, SquareSymbol];

export default function MarqueeStrip({
  items = ['SQUID GAME', 'DSA SURVIVAL', '25 DAYS', 'ELIMINATE OR BE ELIMINATED', 'THREE STRIKES', 'SOLVE OR DIE'],
  speed = 30,
  variant = 'default',
  reverse = false,
  className = '',
}: MarqueeStripProps) {
  const variants = {
    default: {
      wrapper: 'bg-zinc-900/50 border-y border-zinc-800/30',
      text: 'text-gray-400',
      symbol: 'text-gray-600',
      fadeFrom: 'from-black',
    },
    accent: {
      wrapper: 'bg-[#ff2e88]/5 border-y border-[#ff2e88]/20',
      text: 'text-[#ff2e88]',
      symbol: 'text-[#ff2e88]/50',
      fadeFrom: 'from-black',
    },
    subtle: {
      wrapper: 'bg-transparent border-y border-zinc-800/10',
      text: 'text-gray-600',
      symbol: 'text-gray-700',
      fadeFrom: 'from-black',
    },
  };

  const v = variants[variant];

  // One "track" = every item once, each followed by a rotating squid symbol.
  // Rendered twice back-to-back and animated exactly -50%, so the loop point
  // is mathematically seamless regardless of how long the item text is —
  // no magic repeat-count math, no visible jump.
  const track = (keyPrefix: string) => (
    <span className="inline-flex items-center shrink-0">
      {items.map((item, i) => {
        const Symbol = SYMBOL_CYCLE[i % SYMBOL_CYCLE.length];
        return (
          <span key={`${keyPrefix}-${i}`} className="inline-flex items-center shrink-0">
            <span className={`px-4 font-mono text-xs tracking-[0.25em] uppercase ${v.text}`}>
              {item}
            </span>
            <Symbol size={14} className={v.symbol} />
          </span>
        );
      })}
    </span>
  );

  return (
    <div className={`group relative overflow-hidden py-3 ${v.wrapper} ${className}`}>
      {/* Edge fade masks so text dissolves into the background instead of hard-cutting */}
      <div className={`pointer-events-none absolute inset-y-0 left-0 w-16 z-10 bg-gradient-to-r ${v.fadeFrom} to-transparent`} />
      <div className={`pointer-events-none absolute inset-y-0 right-0 w-16 z-10 bg-gradient-to-l ${v.fadeFrom} to-transparent`} />

      <motion.div
        className="flex whitespace-nowrap will-change-transform group-hover:[animation-play-state:paused]"
        animate={{ x: reverse ? ['-50%', '0%'] : ['0%', '-50%'] }}
        transition={{
          x: {
            duration: speed,
            repeat: Infinity,
            ease: 'linear',
          },
        }}
      >
        {track('a')}
        {track('b')}
      </motion.div>
    </div>
  );
}
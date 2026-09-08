'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { ChevronDown, Shield } from 'lucide-react';
import GlitchText from './GlitchText';
import CountdownTimer from './CountdownTimer';
import { CircleSymbol, TriangleSymbol, SquareSymbol } from './SquidSymbols';
import MarqueeStrip from './MarqueeStrip';
import RulesModal from './RulesModal';

interface HeroSectionProps {
  survivorCount?: number;
  eliminatedCount?: number;
  totalPlayers?: number;
  contestUrl?: string;
}

export default function HeroSection({ 
  survivorCount = 0, 
  eliminatedCount = 0, 
  totalPlayers = 0, 
  contestUrl = '' 
}: HeroSectionProps) {
  const [isRulesOpen, setIsRulesOpen] = useState(false);
  const challengeEndDate = '2026-09-12T00:00:01';

  const stats = [
    { label: 'SURVIVORS', value: survivorCount, color: 'text-[#00c7a5]' },
    { label: 'ELIMINATED', value: eliminatedCount, color: 'text-[#ff1a4a]' },
    { label: 'TOTAL', value: totalPlayers, color: 'text-[#ff2e88]' },
  ];

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden bg-black" id="hero">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,46,136,0.06)_0%,transparent_50%)]" />
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,46,136,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,46,136,0.5) 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
        }}
      />

      <div className="relative z-10 flex-1 flex flex-col items-center justify-start px-6 pt-6">
        
        {/* Top Branding */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-3 mb-4"
        >
          <div className="h-px w-12 bg-[#ff2e88]/40" />
          <span className="font-mono text-[11px] text-[#ff2e88]/70 tracking-[0.4em] uppercase">ACM Presents</span>
          <div className="h-px w-12 bg-[#ff2e88]/40" />
        </motion.div>

        {/* Symbols */}
        <motion.div
          className="flex items-center gap-5 mb-4"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <CircleSymbol size={32} glowing />
          <TriangleSymbol size={32} glowing />
          <SquareSymbol size={32} glowing />
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8, ease: 'easeOut' }}
          className="text-center"
        >
          <GlitchText
            text="SQUID"
            className="text-6xl sm:text-8xl md:text-9xl font-black text-white leading-[0.9] tracking-tight"
          />
          <div className="relative">
            <GlitchText
              text="GAME"
              className="text-6xl sm:text-8xl md:text-9xl font-black text-white leading-[0.9] tracking-tight"
            />
            <motion.div
              className="absolute -bottom-2 left-1/2 -translate-x-1/2 h-1 bg-[#ff2e88] rounded-full"
              initial={{ width: 0 }}
              animate={{ width: '60%' }}
              transition={{ delay: 1.2, duration: 0.8, ease: 'easeOut' }}
            />
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="flex items-center gap-8 md:gap-16 mt-6"
        >
          {stats.map((stat, i) => (
            <div key={stat.label} className="text-center">
              <motion.div
                className={`text-3xl md:text-5xl font-black ${stat.color}`}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2 + i * 0.15, type: 'spring', stiffness: 200 }}
              >
                {stat.value}
              </motion.div>
              <span className="text-gray-400 font-mono text-[10px] tracking-[0.2em] mt-1 block">{stat.label}</span>
            </div>
          ))}
        </motion.div>

        {/* Countdown */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }} className="mt-6">
          <p className="text-gray-500 font-mono text-[10px] tracking-[0.3em] text-center mb-4 uppercase">Arena Starts In</p>
          <CountdownTimer targetDate={challengeEndDate} />
        </motion.div>

        {/* Register + Rules CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6 }}
          className="mt-6 flex items-center gap-4"
        >
          <a
            href="https://forms.gle/XGNV6UDumY3wNf9M8"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#ff2e88] text-black font-mono text-xs font-bold tracking-[0.2em] uppercase hover:bg-[#ff2e88]/80 transition-all"
          >
            REGISTER NOW
          </a>

          <button
            onClick={() => setIsRulesOpen(true)}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl border border-[#ff2e88]/30 bg-black/50 text-white font-mono text-xs tracking-[0.2em] uppercase hover:bg-[#ff2e88]/10 hover:border-[#ff2e88] transition-all"
          >
            <Shield size={16} className="text-[#ff2e88]" />
            VIEW ARENA RULES
          </button>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="mt-6 flex flex-col items-center gap-2"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={20} className="text-[#ff2e88]/40" />
        </motion.div>
      </div>

      <div className="relative z-10 mt-auto">
        <MarqueeStrip variant="accent" speed={35} />
      </div>

      {/* Rules Modal Component */}
      <RulesModal isOpen={isRulesOpen} onClose={() => setIsRulesOpen(false)} />
    </section>
  );
}
// squids/RulesModal.tsx
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Trophy, ShieldAlert, Skull, Target } from 'lucide-react';
import { CircleSymbol, TriangleSymbol, SquareSymbol } from './SquidSymbols';

interface RulesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function RulesModal({ isOpen, onClose }: RulesModalProps) {
  const rules = [
    {
      icon: Target,
      title: 'The Challenge',
      color: '#00c7a5',
      text: 'Squid Game, presented by ACM, is a coding survival arena. Solve HackerRank problems to stay alive in the leaderboard.',
    },
    
    {
      icon: ShieldAlert,
      title: 'No Cheating',
      color: '#ff1a4a',
      text: 'No cheating, no copying, no hacks. Any player caught using unfair means will be eliminated instantly.',
    },
    {
      icon: Skull,
      title: 'Elimination',
      color: '#ff1a4a',
      text: "Miss a deadline or fall behind, and you're out. There are no second chances in the arena — don't miss it.",
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center px-4 py-10 overflow-y-auto"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-xl bg-black border border-[#ff2e88]/20 rounded-2xl p-6 sm:p-8"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
            >
              <X size={22} />
            </button>

            {/* Header */}
            <div className="flex items-center gap-3 mb-2">
              <CircleSymbol size={20} glowing />
              <TriangleSymbol size={20} glowing />
              <SquareSymbol size={20} glowing />
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-1">
              THE RULES
            </h2>
            <p className="text-gray-500 font-mono text-[11px] tracking-[0.3em] uppercase mb-6">
              Read before you enter the arena
            </p>

            {/* Rules list */}
            <div className="space-y-4">
              {rules.map((rule, i) => (
                <motion.div
                  key={rule.title}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.08 }}
                  className="flex gap-3 items-start border border-white/5 rounded-xl p-3.5 bg-white/[0.02]"
                >
                  <div
                    className="shrink-0 h-9 w-9 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${rule.color}1A` }}
                  >
                    <rule.icon size={18} color={rule.color} />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-sm tracking-wide mb-0.5">
                      {rule.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {rule.text}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Footer warning */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-6 flex items-center gap-2 justify-center border-t border-white/5 pt-5"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#ff1a4a] animate-pulse" />
              <p className="text-[#ff1a4a] font-mono text-[11px] tracking-[0.2em] uppercase">
                Don't miss. Don't cheat. Survive.
              </p>
            </motion.div>

            {/* CTA */}
            <button
              onClick={onClose}
              className="mt-6 w-full py-3 rounded-xl bg-[#ff2e88] text-black font-bold text-sm tracking-wide hover:bg-[#ff2e88]/90 transition-colors"
            >
              I AGREE
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
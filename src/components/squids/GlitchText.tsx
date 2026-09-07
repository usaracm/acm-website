'use client';

import React, { useEffect, useState } from 'react';

interface GlitchTextProps {
  text: string;
  className?: string;
  as?: React.ElementType;
}

export default function GlitchText({ text, className = '', as = 'h1' }: GlitchTextProps) {
  const Tag = as as any;
  const [isGlitching, setIsGlitching] = useState(false);

  // Random glitch bursts — irregular, like a signal cutting out, not a smooth loop
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    const scheduleGlitch = () => {
      const delay = 2500 + Math.random() * 4000; // fires every 2.5–6.5s
      timeout = setTimeout(() => {
        setIsGlitching(true);
        setTimeout(() => setIsGlitching(false), 220 + Math.random() * 180);
        scheduleGlitch();
      }, delay);
    };

    scheduleGlitch();
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className={`relative inline-block ${isGlitching ? 'squid-glitch-active' : ''}`}>
      {/* Base text */}
      <Tag className={`relative ${className} text-white`} style={{ textShadow: '0 0 30px rgba(255,46,136,0.25)' }}>
        {text}
      </Tag>

      {/* Magenta slice layer */}
      <Tag
        className={`squid-glitch-layer squid-glitch-magenta absolute top-0 left-0 w-full ${className} text-[#ff2e88]`}
        aria-hidden="true"
      >
        {text}
      </Tag>

      {/* Cyan slice layer */}
      <Tag
        className={`squid-glitch-layer squid-glitch-cyan absolute top-0 left-0 w-full ${className} text-cyan-400`}
        aria-hidden="true"
      >
        {text}
      </Tag>

      {/* Scanline sweep */}
      <span className="squid-scanline pointer-events-none absolute inset-0" aria-hidden="true" />

      <style jsx>{`
        .squid-glitch-layer {
          opacity: 0;
          mix-blend-mode: screen;
        }

        .squid-glitch-magenta {
          animation: squidFlicker 6s ease-in-out infinite;
        }

        .squid-glitch-cyan {
          animation: squidFlicker 6s ease-in-out infinite;
          animation-delay: 0.08s;
        }

        @keyframes squidFlicker {
          0%, 92%, 100% {
            opacity: 0;
            transform: translate(0, 0);
            clip-path: inset(0 0 0 0);
          }
          93% {
            opacity: 0.85;
            transform: translate(-3px, 1px);
            clip-path: inset(10% 0 60% 0);
          }
          94% {
            opacity: 0.7;
            transform: translate(3px, -1px);
            clip-path: inset(55% 0 15% 0);
          }
          95% {
            opacity: 0.9;
            transform: translate(-4px, 0);
            clip-path: inset(25% 0 45% 0);
          }
          96% {
            opacity: 0;
            transform: translate(0, 0);
          }
        }

        /* Active state — triggered on a random JS timer for an unpredictable "signal loss" feel */
        .squid-glitch-active .squid-glitch-magenta {
          animation: squidBurst 0.4s steps(2, end);
          opacity: 1;
        }

        .squid-glitch-active .squid-glitch-cyan {
          animation: squidBurst 0.4s steps(2, end) reverse;
          opacity: 1;
        }

        @keyframes squidBurst {
          0% {
            transform: translate(-6px, 2px);
            clip-path: inset(0 0 70% 0);
          }
          25% {
            transform: translate(5px, -2px);
            clip-path: inset(40% 0 20% 0);
          }
          50% {
            transform: translate(-4px, 1px);
            clip-path: inset(65% 0 5% 0);
          }
          75% {
            transform: translate(6px, -1px);
            clip-path: inset(10% 0 55% 0);
          }
          100% {
            transform: translate(0, 0);
            clip-path: inset(0 0 0 0);
          }
        }

        .squid-scanline {
          background: linear-gradient(
            to bottom,
            transparent 0%,
            rgba(255, 46, 136, 0.06) 50%,
            transparent 100%
          );
          background-size: 100% 6px;
          opacity: 0;
        }

        .squid-glitch-active .squid-scanline {
          opacity: 1;
          animation: squidScan 0.4s linear;
        }

        @keyframes squidScan {
          0% {
            background-position: 0 -20%;
          }
          100% {
            background-position: 0 120%;
          }
        }
      `}</style>
    </div>
  );
}
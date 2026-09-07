'use client';

import { useState, useEffect } from 'react';

interface CountdownTimerProps {
  targetDate: string;
}

export default function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(targetDate) - +new Date();
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  const timeBlocks = [
    { label: 'DAYS', value: timeLeft.days },
    { label: 'HOURS', value: timeLeft.hours },
    { label: 'MINS', value: timeLeft.minutes },
    { label: 'SECS', value: timeLeft.seconds },
  ];

  return (
    <div className="flex items-center justify-center gap-3 md:gap-6 font-mono">
      {timeBlocks.map((block, idx) => (
        <div key={block.label} className="flex items-center gap-3 md:gap-6">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-zinc-900/80 border border-[#ff2e88]/30 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(255,46,136,0.15)]">
              <span className="text-2xl md:text-3xl font-black text-white">
                {String(block.value).padStart(2, '0')}
              </span>
            </div>
            <span className="text-[10px] text-gray-500 tracking-[0.2em] mt-2 uppercase">{block.label}</span>
          </div>
          {idx < timeBlocks.length - 1 && (
            <span className="text-2xl font-bold text-[#ff2e88]/50 -mt-6">:</span>
          )}
        </div>
      ))}
    </div>
  );
}
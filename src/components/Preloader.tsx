"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Preloader({ onComplete }: { onComplete: () => void }) {
    const [count, setCount] = useState(0);
    const [isExiting, setIsExiting] = useState(false);

    // Counter animation - matches reference: 15ms intervals
    useEffect(() => {
        const timer = setInterval(() => {
            setCount((prev) => {
                if (prev >= 100) {
                    clearInterval(timer);
                    return 100;
                }
                return prev + 1;
            });
        }, 15);
        return () => clearInterval(timer);
    }, []);

    // Exit sequence - matches reference: 400ms pause, then isExiting, then 800ms for grid
    useEffect(() => {
        if (count === 100) {
            const timeout = setTimeout(() => {
                setIsExiting(true);
                setTimeout(onComplete, 800);
            }, 400);
            return () => clearTimeout(timeout);
        }
    }, [count, onComplete]);

    return (
        <div className="fixed inset-0 z-[9999] bg-transparent text-white font-mono cursor-wait">
            {/* Counter overlay - z-[30] - visible until isExiting */}
            {!isExiting && (
                <motion.div
                    className="fixed inset-0 z-[30] flex flex-col items-center justify-center bg-transparent pointer-events-none"
                    exit={{ opacity: 0 }}
                >
                    <div className="flex flex-col items-center gap-4">
                        <span className="text-xs text-acm-blue tracking-[0.3em] uppercase animate-pulse">
                            System Initialization
                        </span>

                        <div className="text-8xl font-black tracking-tighter tabular-nums text-white">
                            {count.toString().padStart(3, '0')}
                        </div>

                        <div className="h-[2px] w-32 bg-white/20 overflow-hidden relative">
                            <motion.div
                                className="absolute left-0 top-0 h-full bg-acm-blue"
                                initial={{ width: 0 }}
                                animate={{ width: `${count}%` }}
                            />
                        </div>
                    </div>

                    <div className="absolute bottom-10 left-10 text-[10px] text-white/30 uppercase tracking-widest">
                        GGSIPU EDC ACM<br />Version 2.0.24
                    </div>
                </motion.div>
            )}

            {/* Grid overlay - z-[10] - animates when isExiting */}
            <div className="fixed inset-0 z-[10] flex flex-col bg-transparent pointer-events-none">
                {[...Array(5)].map((_, rowIndex) => (
                    <div key={rowIndex} className="flex flex-1 w-full">
                        {[...Array(5)].map((_, colIndex) => (
                            <motion.div
                                key={rowIndex * 5 + colIndex}
                                className="flex-1 bg-[#050505] border-[0.5px] border-[#111]"
                                initial={{ scale: 1, opacity: 1 }}
                                animate={isExiting ? {
                                    scale: 0.5,
                                    opacity: 0,
                                    transition: {
                                        duration: 0.8,
                                        ease: [0.76, 0, 0.24, 1],
                                        delay: 0.2 + (colIndex * 0.05) + (rowIndex * 0.05)
                                    }
                                } : {}}
                            />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}

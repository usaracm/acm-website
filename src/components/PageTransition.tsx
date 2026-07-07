"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useMemo } from "react";

interface PageTransitionProps {
    isFirstLoad?: boolean;
    pathname?: string;
}

export default function PageTransition({ isFirstLoad = false, pathname = "" }: PageTransitionProps) {
    const [isRevealed, setIsRevealed] = useState(false);

    // Generate delays once
    const delays = useMemo(() => {
        return Array.from({ length: 25 }, () => Math.random() * 0.3);
    }, []);

    useEffect(() => {
        // Reset state when pathname changes
        setIsRevealed(false);

        // Force reveal animation shortly after mount
        const timer = setTimeout(() => {
            setIsRevealed(true);
        }, 50);

        return () => clearTimeout(timer);
    }, [pathname]);

    return (
        <div className={`fixed inset-0 z-[99999] pointer-events-none flex flex-col`}>
            {[...Array(5)].map((_, rowIndex) => (
                <div key={rowIndex} className="flex flex-1 w-full">
                    {[...Array(5)].map((_, colIndex) => {
                        const cellIndex = rowIndex * 5 + colIndex;
                        const exitDelay = delays[cellIndex];
                        const animateDelay = 0.1 + (colIndex * 0.05) + (rowIndex * 0.05);

                        return (
                            <motion.div
                                key={`${pathname}-${cellIndex}`}
                                className="flex-1 bg-[#111] border-[0.5px] border-[#222]"
                                initial={
                                    isFirstLoad
                                        ? { opacity: 0, scale: 0.5 }
                                        : { opacity: 1, scale: 1 }
                                }
                                animate={{
                                    opacity: isRevealed || isFirstLoad ? 0 : 1,
                                    scale: isRevealed || isFirstLoad ? 0.5 : 1,
                                }}
                                transition={{
                                    duration: 0.5,
                                    ease: "circIn",
                                    delay: animateDelay
                                }}
                                exit={{
                                    opacity: 1,
                                    scale: 1,
                                    transition: {
                                        duration: 0.4,
                                        ease: "circOut",
                                        delay: exitDelay
                                    }
                                }}
                            />
                        );
                    })}
                </div>
            ))}
        </div>
    );
}

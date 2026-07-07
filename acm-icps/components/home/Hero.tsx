"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import Countdown from "@/components/shared/Countdown";
import { resolveAssetPath } from "@/lib/utils";

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();

  const elementVariants = {
    hidden: { opacity: 0, transform: shouldReduceMotion ? "translateY(0px)" : "translateY(16px)" },
    visible: (custom: number) => ({
      opacity: 1,
      transform: "translateY(0px)",
      transition: {
        duration: 0.4,
        ease: [0.23, 1, 0.32, 1] as const,
        delay: custom * 0.08,
      },
    }),
  };

  const handleScrollToDates = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById("dates-section");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative w-full overflow-hidden bg-canvas min-h-[calc(100vh-48px)] flex items-center">
      {/* Full-bleed campus aerial image as hero backdrop */}
      <div className="absolute inset-0 z-0">
        <Image
          src={resolveAssetPath("/3.jpg")}
          alt="GGSIPU East Delhi Campus aerial view"
          fill
          priority
          className="object-cover object-center brightness-110 saturate-75"
          sizes="100vw"
        />
        {/* Light overlay to keep hero aligned with light theme */}
        <div className="absolute inset-0 bg-white/55" />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-white/90 via-[#f5f9ff]/85 to-transparent" />
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-6 pt-16 pb-24 md:pt-28 md:pb-40 flex flex-col items-center justify-center gap-10 sm:gap-12 z-10 text-center">
        {/* Main Box: Centered Messaging */}
        <div className="w-full max-w-3xl flex flex-col items-center bg-white/82 border border-white/80 backdrop-blur-[3px] px-6 py-8 sm:px-10 sm:py-12">
          {/* Eyebrow with ACM logo mark */}
          <motion.div
            custom={0}
            variants={elementVariants}
            initial="hidden"
            animate="visible"
            className="flex items-center justify-center gap-3 mb-5"
          >
            <Image
              src={resolveAssetPath("/BLUE WITH WHITE TEXT.png")}
              alt="GGSIPU EDC ACM Student Chapter"
              width={32}
              height={32}
              className="opacity-90 object-contain"
            />
            <span className="text-[13px] text-ink font-sans font-[400] tracking-wide">
              GGSIPU EDC ACM Student Chapter · USAR
            </span>
          </motion.div>

          {/* Headline — IBM display at weight 300 */}
          <motion.h1
            custom={1}
            variants={elementVariants}
            initial="hidden"
            animate="visible"
            className="text-[26px] sm:text-[46px] md:text-[56px] font-[300] tracking-[-1.5px] leading-[1.1] text-ink mb-5 font-sans"
          >
            1ST INDRAPRASTHA INTERNATIONAL CONFERENCE ON{" "}
            <span className="text-primary block sm:inline">ARTIFICIAL INTELLIGENCE, IoT &amp; ROBOTICS</span> (IIC-AIR)
          </motion.h1>

          {/* Date / Location strip */}
          <motion.div
            custom={2}
            variants={elementVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap items-center justify-center gap-4 mb-6 text-[14px]"
          >
            <span className="inline-flex items-center gap-2 text-ink font-[400]">
              <svg className="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              January 14–15, 2027
            </span>
            <span className="hidden sm:inline h-3 w-px bg-ink/20" />
            <span className="inline-flex items-center gap-2 text-ink font-[400]">
              <svg className="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Delhi, India
            </span>
          </motion.div>

          {/* Subtext */}
          <motion.p
            custom={3}
            variants={elementVariants}
            initial="hidden"
            animate="visible"
            className="text-[15px] sm:text-[17px] font-[400] leading-relaxed text-ink-secondary mb-8 max-w-[62ch]"
          >
            The flagship research forum presenting peer-reviewed breakthroughs in artificial intelligence, Internet of Things, and autonomous robotic systems.
          </motion.p>

          {/* CTAs */}
          <motion.div
            custom={4}
            variants={elementVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-row justify-center gap-4 w-full sm:w-auto mb-10"
          >
            <a
              href="https://openreview.net"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center justify-center bg-primary px-6 text-[14px] font-medium text-white transition-colors hover:bg-primary-deep active:bg-primary-press rounded-none"
            >
              Submit Paper
            </a>
            <a
              href="#dates-section"
              onClick={handleScrollToDates}
              className="inline-flex h-12 items-center justify-center border border-hairline bg-white/75 px-6 text-[14px] font-medium text-ink transition-colors hover:border-primary/40 hover:bg-white rounded-none"
            >
              Important Dates
            </a>
          </motion.div>

          {/* Countdown below the content */}
          <motion.div
            custom={5}
            variants={elementVariants}
            initial="hidden"
            animate="visible"
            className="w-full sm:w-auto flex-shrink-0 mt-2"
          >
            <div className="border border-hairline bg-canvas/92 backdrop-blur-sm p-1 shadow-[0_10px_28px_rgba(0,67,206,0.06)]">
              <Countdown targetDate="2027-01-14T09:00:00+05:30" variant="hero" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

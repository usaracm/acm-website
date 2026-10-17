"use client";

import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowDown, ArrowUpRight, Check, Trophy } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

const stages = [
  {
    number: "01",
    title: "Collect",
    body: "Gather cards. Build your lead. The teams with the highest card counts advance to Round 2.",
  },
  {
    number: "02",
    title: "Knockout",
    body: "Face competing teams, solve problem statements, and fight your way to the top.",
  },
];

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 42 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.9, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

export default function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const videoY = useSpring(useTransform(scrollYProgress, [0, 1], ["0%", "16%"]), {
    stiffness: 80,
    damping: 30,
  });
  const videoScale = useSpring(useTransform(scrollYProgress, [0, 1], [1.05, 1.16]), {
    stiffness: 80,
    damping: 30,
  });
  const heroContentY = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <main className="bg-[#08090b] text-white selection:bg-[#d6ff3f] selection:text-black">
      <section ref={heroRef} className="relative isolate min-h-[calc(100vh-5rem)] overflow-hidden border-b border-white/10">
        <motion.video
          className="absolute inset-0 -z-20 h-full w-full object-cover"
          src="/animeverse/acmvid-small.mp4"
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
          style={prefersReducedMotion ? undefined : { y: videoY, scale: videoScale }}
        />
        <div className="absolute inset-0 -z-10 bg-black/55" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,#08090b_0%,rgba(8,9,11,0.76)_34%,rgba(8,9,11,0.18)_100%)]" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(0deg,#08090b_0%,transparent_35%,rgba(0,0,0,0.35)_100%)]" />
        <div className="pointer-events-none absolute inset-0 -z-10 opacity-20 [background-image:linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:72px_72px] [mask-image:linear-gradient(to_bottom,black,transparent_80%)]" />

        <div className="mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-[1500px] flex-col justify-between px-6 pb-8 pt-20 md:px-12 md:pb-12 lg:px-20">
          <div className="flex items-center justify-between text-[9px] uppercase tracking-[0.45em] text-white/60">
            <span className="flex items-center gap-3">
              <span className="h-px w-8 bg-[#d6ff3f]" />
              ACM presents
            </span>
            <span className="hidden font-mono tracking-[0.25em] text-white/40 sm:block">
              01 / 03 — The arena
            </span>
          </div>

          <motion.div className="max-w-5xl py-16" style={prefersReducedMotion ? undefined : { y: heroContentY }}>
            <motion.p
              className="mb-5 text-[10px] uppercase tracking-[0.5em] text-[#d6ff3f]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
            >
              A strategy-driven campus challenge
            </motion.p>
            <div className="max-w-[1100px] overflow-hidden">
              <motion.h1
                className="whitespace-nowrap font-heading text-[clamp(3.75rem,10vw,8.5rem)] leading-[0.8] tracking-[-0.055em] text-white"
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.2, delay: 0.25, ease: EASE }}
              >
              Animeverse
              </motion.h1>
            </div>
            <motion.div
              className="mt-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.8, ease: EASE }}
            >
              <div>
                <h2 className="max-w-md text-2xl font-semibold leading-tight tracking-tight md:text-3xl">
                  Collect. Compete. <span className="text-[#d6ff3f]">Conquer.</span>
                </h2>
                <p className="mt-3 max-w-sm text-xs leading-6 text-white/60">
                  Two days. One challenge. Three winners. Your team&apos;s next
                  move changes everything.
                </p>
              </div>
              <a
                href="https://unstop.com/p/acm-silicon-quest-animeverse-ggsipu-usar-acm-student-chapter-1768368"
                className="group inline-flex w-fit items-center gap-5 border border-[#d6ff3f] bg-[#d6ff3f] px-6 py-4 text-[10px] font-bold uppercase tracking-[0.25em] text-black hover:bg-white hover:border-white"
              >
                Register now
                <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </a>
            </motion.div>
          </motion.div>

          <div className="flex items-end justify-between border-t border-white/20 pt-5 text-[9px] uppercase tracking-[0.35em] text-white/40">
            <span>GGSIPU EDC / 2026</span>
            <a href="#challenge" className="group flex items-center gap-3 text-white/60">
              Explore the challenge
              <ArrowDown className="h-3 w-3 transition-transform group-hover:translate-y-1" />
            </a>
          </div>
        </div>
      </section>

      <section id="challenge" className="mx-auto max-w-[1500px] px-6 py-24 md:px-12 md:py-36 lg:px-20">
        <div className="grid gap-16 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
          <Reveal>
            <p className="mb-5 text-[10px] uppercase tracking-[0.45em] text-[#d6ff3f]">The challenge</p>
            <h2 className="font-heading text-6xl leading-[0.85] tracking-tight text-white md:text-8xl">
              THE
              <br />
              <span className="text-white/30">ARENA</span>
            </h2>
            <p className="mt-8 max-w-xs text-sm leading-7 text-white/50">
              A battle of strategy, teamwork, and problem-solving. The prize
              isn&apos;t given. It&apos;s earned.
            </p>
          </Reveal>
          <div className="grid gap-0 border-t border-white/20">
            {stages.map((stage, index) => (
              <Reveal key={stage.number} delay={index * 0.12}>
                <article className="grid gap-5 border-b border-white/20 py-8 sm:grid-cols-[80px_1fr] sm:gap-8">
                <span className="font-mono text-xs text-[#d6ff3f]">{stage.number}</span>
                <div>
                  <h3 className="font-heading text-5xl tracking-wide">{stage.title}</h3>
                  <p className="mt-3 max-w-lg text-sm leading-7 text-white/50">{stage.body}</p>
                </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="overflow-hidden border-y border-white/10 bg-[#d6ff3f] py-5 text-black">
        <motion.div
          className="flex w-max items-center font-heading text-4xl tracking-wide md:text-6xl"
          animate={prefersReducedMotion ? undefined : { x: ["0%", "-50%"] }}
          transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
        >
          {[0, 1].map((copy) => (
            <div key={copy} className="flex items-center gap-8 pr-8" aria-hidden={copy === 1}>
              <span>COLLECT</span><span>→</span><span>QUALIFY</span><span>→</span>
              <span>COMPETE</span><span>→</span><span>CONQUER</span><span>→</span>
            </div>
          ))}
        </motion.div>
      </section>

      <section className="mx-auto grid max-w-[1500px] gap-16 px-6 py-24 md:px-12 md:py-36 lg:grid-cols-[1fr_0.8fr] lg:px-20">
        <Reveal>
          <p className="mb-5 text-[10px] uppercase tracking-[0.45em] text-[#d6ff3f]">The journey</p>
          <h2 className="max-w-2xl font-heading text-7xl leading-[0.82] tracking-tight md:text-[9rem]">
            ONLY THE
            <br />
            <span className="text-white/25">STRONGEST</span>
          </h2>
          <div className="mt-12 grid max-w-xl gap-4 sm:grid-cols-2">
            {["Build your lead", "Earn your place", "Solve under pressure", "Take the crown"].map((item, index) => (
              <div key={item} className="flex items-center gap-3 border-t border-white/15 pt-3 text-xs text-white/65">
                <Check className="h-3.5 w-3.5 text-[#d6ff3f]" />
                <span><span className="mr-2 font-mono text-white/30">0{index + 1}</span>{item}</span>
              </div>
            ))}
          </div>
        </Reveal>
        <Reveal className="flex items-end lg:justify-end" delay={0.15}>
          <motion.div
            className="w-full max-w-md border border-white/15 bg-white/[0.03] p-7 md:p-10"
            whileHover={{ y: -8, borderColor: "rgba(214,255,63,0.6)" }}
            transition={{ duration: 0.45, ease: EASE }}
          >
            <Trophy className="mb-16 h-8 w-8 text-[#d6ff3f]" strokeWidth={1.2} />
            <p className="text-[10px] uppercase tracking-[0.45em] text-white/40">The prize pool</p>
            <h3 className="mt-4 font-heading text-6xl leading-none">GLORY<br /><span className="text-[#d6ff3f]">AWAITS.</span></h3>
            <p className="mt-8 text-sm leading-7 text-white/50">Prize pool and rewards will be announced soon. Stay ready. Stay sharp.</p>
          </motion.div>
        </Reveal>
      </section>

      <section id="register" className="relative overflow-hidden border-t border-white/10 px-6 py-28 text-center md:py-40">
        <div className="absolute left-1/2 top-1/2 -z-10 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#d6ff3f]/10 blur-[120px]" />
        <p className="text-[10px] uppercase tracking-[0.5em] text-[#d6ff3f]">Your move</p>
        <motion.h2
          className="mx-auto mt-7 max-w-4xl font-heading text-7xl leading-[0.8] tracking-tight md:text-[10rem]"
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 1.1, ease: EASE }}
        >
          READY TO
          <br />
          <span className="text-white/25">COMPETE?</span>
        </motion.h2>
        <p className="mx-auto mt-10 max-w-sm text-sm leading-7 text-white/55">Your strategy. Your team. Your moment.</p>
        <a href="https://www.instagram.com/usaracm/?hl=en" className="group mt-10 inline-flex items-center gap-6 border border-white/30 px-7 py-4 text-[10px] font-bold uppercase tracking-[0.3em] hover:border-[#d6ff3f] hover:bg-[#d6ff3f] hover:text-black">
          Follow Us
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
        </a>
      </section>
    </main>
  );
}

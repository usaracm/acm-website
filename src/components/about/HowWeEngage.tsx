"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import {
  GraduationCap,
  Rocket,
  Globe,
  LucideIcon,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import TextFillOnScroll from "@/components/TextFillOnScroll";

const engagements = [
  {
    title: "Learn",
    subtitle: "Workshops & Bootcamps",
    price: "Free for Members",
    description:
      "Launch your journey with structured learning paths for both technical and creative skills.",
    features: [
      "Technical Workshops (ML, Web Dev, DSA)",
      "Creative Bootcamps (Design, Content)",
      "Cross-Domain Mentorship",
      "Learning Resources for All",
    ],
    icon: GraduationCap,
    gradient: "from-blue-600 to-acm-blue",
  },
  {
    title: "Build",
    subtitle: "Hackathons & Projects",
    price: "Ongoing Access",
    description:
      "Hands-on experience building real projects where tech meets creativity.",
    features: [
      "Hackathon Participation",
      "Tech + Creative Collaborations",
      "Portfolio Building",
      "Real-World Projects",
    ],
    icon: Rocket,
    gradient: "from-acm-blue to-purple-600",
  },
  {
    title: "Connect",
    subtitle: "Community & Network",
    price: "Lifetime Value",
    description:
      "Join a diverse community of developers, designers, and creators building together.",
    features: [
      "Industry Networking",
      "Cross-Functional Teams",
      "Alumni Network",
      "Career Opportunities",
    ],
    icon: Globe,
    gradient: "from-purple-600 to-pink-600",
  },
];

function EngagementCard({
  title,
  subtitle,
  price,
  description,
  features,
  icon: Icon,
  gradient,
  index,
}: {
  title: string;
  subtitle: string;
  price: string;
  description: string;
  features: string[];
  icon: LucideIcon;
  gradient: string;
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 0.5, 1], [100, 0, -50]);
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0, 1, 1, 0.3]
  );

  return (
    <motion.div
      ref={cardRef}
      style={{ y, opacity }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      className="group relative rounded-2xl border border-[var(--border)] bg-linear-to-br from-gray-900/50 to-[var(--background)] p-6 backdrop-blur-sm transition-all duration-500 hover:border-acm-blue/50 md:rounded-3xl md:p-8"
    >
      <div
        className={`absolute inset-0 rounded-2xl bg-linear-to-br ${gradient} opacity-0 transition-opacity duration-500 group-hover:opacity-5 md:rounded-3xl`}
      />

      <div className="relative z-10">
        {/* Icon */}
        <div className="mb-4 md:mb-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-gray-800 to-gray-900 transition-transform duration-300 group-hover:scale-110 md:h-16 md:w-16 md:rounded-2xl">
            <Icon
              className="h-6 w-6 text-acm-blue md:h-8 md:w-8"
              strokeWidth={1.5}
            />
          </div>
        </div>

        {/* Header */}
        <div className="mb-4 md:mb-6">
          <h3 className="mb-1 font-display text-2xl font-bold text-[var(--foreground)] md:mb-2 md:text-3xl">
            {title}
          </h3>
          <p className="mb-2 text-xs text-[var(--text-subtle)] md:mb-3 md:text-sm">
            {subtitle}
          </p>
          <p className="text-base font-medium text-acm-blue md:text-lg">
            {price}
          </p>
        </div>

        {/* Description */}
        <p className="mb-6 text-sm leading-relaxed text-[var(--text-muted)] md:mb-8 md:text-base">
          {description}
        </p>

        {/* Features */}
        <ul className="space-y-2 md:space-y-3">
          {features.map((feature, idx) => (
            <li
              key={idx}
              className="flex items-start gap-2 text-sm text-[var(--text-muted)] md:gap-3 md:text-base"
            >
              <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-acm-blue md:mt-2" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

export default function HowWeEngage() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -200]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-[var(--background)] px-4 py-20 md:px-12 md:py-32"
    >
      {/* Parallax Background */}
      <motion.div
        style={{ y: backgroundY }}
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute left-1/4 top-1/2 h-64 w-64 rounded-full bg-acm-blue/5 blur-[100px] md:h-96 md:w-96 md:blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 h-64 w-64 rounded-full bg-purple-900/5 blur-[100px] md:h-96 md:w-96 md:blur-[150px]" />
      </motion.div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-8 text-center md:mb-20">
          <TextFillOnScroll className="mb-4 font-display text-3xl font-bold md:mb-6 md:text-6xl lg:text-7xl">
            How we engage
          </TextFillOnScroll>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false }}
            className="mx-auto max-w-xl text-base text-[var(--text-muted)] md:max-w-2xl md:text-xl"
          >
            Three pathways to transform your potential into impact
          </motion.p>
        </div>

        {/* Desktop Grid - hidden on mobile */}
        <div className="hidden gap-8 md:grid lg:grid-cols-3">
          {engagements.map((engagement, index) => (
            <EngagementCard key={index} {...engagement} index={index} />
          ))}
        </div>

        {/* Mobile Carousel - visible only on mobile */}
        <MobileCarousel />
      </div>
    </section>
  );
}

// Mobile Carousel Component
function MobileCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % engagements.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + engagements.length) % engagements.length
    );
  };

  const engagement = engagements[currentIndex];
  const Icon = engagement.icon;

  return (
    <div className="md:hidden">
      {/* Carousel Card */}
      <motion.div
        key={currentIndex}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        transition={{ duration: 0.3 }}
        className="relative rounded-2xl border border-[var(--border)] bg-linear-to-br from-gray-900/50 to-[var(--background)] p-5"
      >
        <div
          className={`absolute inset-0 rounded-2xl bg-linear-to-br ${engagement.gradient} opacity-5`}
        />

        <div className="relative z-10">
          {/* Icon */}
          <div className="mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-gray-800 to-gray-900">
              <Icon className="h-6 w-6 text-acm-blue" strokeWidth={1.5} />
            </div>
          </div>

          {/* Header */}
          <div className="mb-4">
            <h3 className="mb-1 font-display text-2xl font-bold text-[var(--foreground)]">
              {engagement.title}
            </h3>
            <p className="mb-2 text-xs text-[var(--text-subtle)]">{engagement.subtitle}</p>
            <p className="text-sm font-medium text-acm-blue">
              {engagement.price}
            </p>
          </div>

          {/* Description */}
          <p className="mb-4 text-sm leading-relaxed text-[var(--text-muted)]">
            {engagement.description}
          </p>

          {/* Features */}
          <ul className="space-y-2">
            {engagement.features.map((feature, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2 text-sm text-[var(--text-muted)]"
              >
                <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-acm-blue" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>

      {/* Navigation Controls */}
      <div className="mt-6 flex items-center justify-center gap-4">
        <button
          onClick={prevSlide}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)]/50 text-[var(--foreground)] transition-colors hover:border-acm-blue hover:bg-acm-blue/10"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        {/* Dots */}
        <div className="flex gap-2">
          {engagements.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "w-6 bg-acm-blue"
                  : "w-2 bg-[var(--text-subtle)] hover:bg-gray-500"
              }`}
            />
          ))}
        </div>

        <button
          onClick={nextSlide}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)]/50 text-[var(--foreground)] transition-colors hover:border-acm-blue hover:bg-acm-blue/10"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}

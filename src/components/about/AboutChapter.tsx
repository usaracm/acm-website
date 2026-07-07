"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Target, Eye, Heart, Code, Palette, Users, Rocket, Calendar, Hash, Shield, ArrowUpRight } from "lucide-react";
import Image from "next/image";

export default function AboutChapter() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, amount: 0.3 });

  const pillars = [
    {
      icon: Code,
      title: "Technical Excellence",
      description: "Workshops on DSA, Web Development, Machine Learning, and emerging technologies.",
    },
    {
      icon: Palette,
      title: "Creative Innovation",
      description: "Design thinking, UI/UX, content creation, and multimedia production.",
    },
    {
      icon: Users,
      title: "Community Building",
      description: "Networking events, mentorship programs, and collaborative projects.",
    },
    {
      icon: Rocket,
      title: "Career Growth",
      description: "Industry talks, interview prep, hackathons, and placement support.",
    },
  ];

  // Official chapter details from ACM
  const chapterDetails = [
    { icon: Hash, label: "Group ID", value: "197623" },
    { icon: Shield, label: "Client Number", value: "0756388" },
    { icon: Calendar, label: "Charter Date", value: "November 22, 2024" },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#030303] overflow-hidden py-24 md:py-40"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-acm-blue/3 rounded-full blur-[200px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-900/5 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
        {/* Section Label */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0 }}
          animate={isHeaderInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-6 mb-8"
        >
          <div className="w-16 md:w-24 h-px bg-linear-to-r from-acm-blue/60 to-transparent" />
          <span
            className="text-[10px] md:text-[11px] font-light tracking-[0.5em] text-white/30 uppercase"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Our Chapter
          </span>
        </motion.div>

        {/* Main Title */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl lg:text-7xl font-black text-[var(--foreground)] tracking-normal leading-[0.95] mb-6"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          GGSIPU EDC <span className="text-acm-blue">ACM</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-lg md:text-xl text-white/30 mb-10 max-w-3xl"
          style={{ fontFamily: "var(--font-body)" }}
        >
          ACM Student Chapter — Where Curiosity Meets Code
        </motion.p>

        {/* Official Chapter Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="flex flex-wrap gap-6 mb-16"
        >
          {chapterDetails.map((detail, index) => (
            <div
              key={index}
              className="flex items-center gap-3 px-4 py-2 bg-white/2 border border-white/5"
            >
              <detail.icon className="w-4 h-4 text-acm-blue" strokeWidth={1.5} />
              <span
                className="text-xs text-white/40"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {detail.label}:
              </span>
              <span
                className="text-sm text-[var(--foreground)] font-medium"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {detail.value}
              </span>
            </div>
          ))}
          <div className="flex items-center gap-2 px-4 py-2 bg-acm-blue/10 border border-acm-blue/20">
            <div className="w-2 h-2 rounded-full bg-green-500" />
            <span
              className="text-sm text-[var(--foreground)] font-medium"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Active Chapter
            </span>
          </div>
        </motion.div>

        {/* Content Grid - Description and Logo */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20">
          {/* Left - Chapter Description */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              <p
                className="text-white/50 text-base md:text-lg leading-[1.8]"
                style={{ fontFamily: "var(--font-body)" }}
              >
                The <span className="text-[var(--foreground)] font-medium">GGSIPU EDC ACM Student Chapter</span> represents
                the East Delhi Campus of Guru Gobind Singh Indraprastha University. Founded in
                <span className="text-white/70"> November 2024</span> under the University School of Automation
                and Robotics (USAR), the chapter unites students from four schools
                <span className="text-acm-blue/80"> USAR, USDI, USMC and USAP</span> forming an
                interdisciplinary computing community.
              </p>

              <p
                className="text-white/40 text-sm md:text-base leading-[1.8]"
                style={{ fontFamily: "var(--font-body)" }}
              >
                Guided by ACM&apos;s mission to advance computing as a science and profession,
                the chapter promotes collaboration, innovation, and learning across domains like
                artificial intelligence, software engineering, robotics, and design.
              </p>

              <p
                className="text-white/40 text-sm md:text-base leading-[1.8]"
                style={{ fontFamily: "var(--font-body)" }}
              >
                Through hackathons, research forums, and community projects, we empower students
                to build impactful solutions that bridge creativity and computation.
              </p>

              {/* Join ACM Link */}
              <div className="pt-4">
                <a
                  href="https://www.acm.org/membership/join"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 px-5 py-2.5 border border-acm-blue/30 hover:border-acm-blue bg-acm-blue/10 hover:bg-acm-blue/20 transition-all duration-300"
                >
                  <span
                    className="text-sm text-white/80 group-hover:text-[var(--foreground)] transition-colors"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    Join ACM Global Membership
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-acm-blue transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            </motion.div>
          </div>

          {/* Right - Chapter Logo Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative bg-[var(--surface)] border border-white/5 p-12 md:p-16">
              {/* Corner Accents */}
              <div className="absolute top-0 left-0 w-6 h-6 border-l-2 border-t-2 border-acm-blue/40" />
              <div className="absolute top-0 right-0 w-6 h-6 border-r-2 border-t-2 border-acm-blue/40" />
              <div className="absolute bottom-0 left-0 w-6 h-6 border-l-2 border-b-2 border-acm-blue/40" />
              <div className="absolute bottom-0 right-0 w-6 h-6 border-r-2 border-b-2 border-acm-blue/40" />

              {/* ACM Logo with White Text */}
              <div className="relative w-full aspect-4/3 max-w-[250px] mx-auto">
                <Image
                  src="/ACM_Logo_white_text.webp"
                  alt="ACM Student Chapter Logo"
                  fill
                  className="object-contain"
                />
              </div>

              {/* Tagline */}
              <div className="mt-6 text-center">
                <p
                  className="text-white/30 text-sm tracking-normal uppercase"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  GGSIPU EDC Student Chapter
                </p>
              </div>
            </div>

            {/* Floating Badge - matching GGSIPU theme */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="absolute -bottom-6 -right-6 bg-acm-blue px-6 py-3"
            >
              <span
                className="text-[var(--foreground)] text-sm font-medium tracking-normal"
                style={{ fontFamily: "var(--font-body)" }}
              >
                Est. 2024
              </span>
            </motion.div>
          </motion.div>
        </div>

        {/* Mission & Vision Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-20">
          {/* Mission */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative bg-[var(--surface)] border border-white/5 p-8 md:p-10"
          >
            {/* Corner Accents */}
            <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-acm-blue/50" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-acm-blue/50" />

            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-acm-blue/10 border border-acm-blue/20">
                <Target className="w-6 h-6 text-acm-blue" strokeWidth={1.5} />
              </div>
              <h3
                className="text-2xl md:text-3xl font-black text-[var(--foreground)]"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                OUR MISSION
              </h3>
            </div>

            <p
              className="text-white/50 text-sm md:text-base leading-[1.8]"
              style={{ fontFamily: "var(--font-body)" }}
            >
              To cultivate a vibrant community of tech enthusiasts who learn, build,
              and grow together. We bridge the gap between academic knowledge and
              industry requirements through hands-on projects, workshops, and real-world
              experiences that prepare students for successful careers in technology.
            </p>
          </motion.div>

          {/* Vision */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative bg-[var(--surface)] border border-white/5 p-8 md:p-10"
          >
            {/* Corner Accents */}
            <div className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 border-acm-blue/50" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2 border-acm-blue/50" />

            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-acm-blue/10 border border-acm-blue/20">
                <Eye className="w-6 h-6 text-acm-blue" strokeWidth={1.5} />
              </div>
              <h3
                className="text-2xl md:text-3xl font-black text-[var(--foreground)]"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                OUR VISION
              </h3>
            </div>

            <p
              className="text-white/50 text-sm md:text-base leading-[1.8]"
              style={{ fontFamily: "var(--font-body)" }}
            >
              To be the premier student-led tech community at GGSIPU, recognized for
              producing industry-ready professionals and innovative thinkers. We envision
              a future where every member leaves with the skills, confidence, and network
              to make meaningful contributions to the tech industry.
            </p>
          </motion.div>
        </div>

        {/* Values */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-20"
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-acm-blue/10 border border-acm-blue/20">
              <Heart className="w-6 h-6 text-acm-blue" strokeWidth={1.5} />
            </div>
            <h3
              className="text-2xl md:text-3xl font-black text-[var(--foreground)]"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              OUR VALUES
            </h3>
          </div>

          <div className="grid md:grid-cols-3 gap-x-12 gap-y-6">
            {[
              { title: "Curiosity", desc: "Never stop asking why, never stop learning" },
              { title: "Collaboration", desc: "Together we achieve more than alone" },
              { title: "Excellence", desc: "Strive for the highest standards in everything" },
              { title: "Inclusivity", desc: "Everyone has a place in our community" },
              { title: "Innovation", desc: "Push boundaries and challenge conventions" },
              { title: "Integrity", desc: "Be honest, ethical, and transparent" },
            ].map((value, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 bg-acm-blue mt-2 shrink-0" />
                <div>
                  <span
                    className="text-[var(--foreground)] font-medium"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {value.title}
                  </span>
                  <span className="text-white/40 text-sm"> — {value.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Pillars */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <h3
            className="text-xl md:text-2xl font-black text-[var(--foreground)] mb-8"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            OUR FOUR PILLARS
          </h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {pillars.map((pillar, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                className="group relative bg-[var(--surface)] border border-white/5 p-6 transition-all duration-300 hover:border-acm-blue/20"
              >
                {/* Top Accent */}
                <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-acm-blue/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <pillar.icon className="w-8 h-8 text-acm-blue mb-4" strokeWidth={1.5} />

                <h4
                  className="text-lg font-bold text-[var(--foreground)] mb-2"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {pillar.title}
                </h4>

                <p
                  className="text-sm text-white/40 leading-relaxed"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {pillar.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

export default function WhatIsACM() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, amount: 0.3 });

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#030303] overflow-hidden py-24 md:py-40"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-acm-blue/3 rounded-full blur-[200px]" />
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
            The Organization
          </span>
        </motion.div>

        {/* Main Content Grid - ACM Global */}
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center mb-24">
          {/* Left Column - Text */}
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl lg:text-7xl font-black text-[var(--foreground)] tracking-normal leading-[0.95] mb-8"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              WHAT IS{" "}
              <span className="text-acm-blue">ACM</span>
              <span className="text-white/20">?</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-white/50 text-base md:text-lg leading-[1.8] mb-6"
              style={{ fontFamily: "var(--font-body)" }}
            >
              The <span className="text-[var(--foreground)] font-medium">Association for Computing Machinery</span> is
              the world&apos;s largest educational and scientific computing society,
              uniting educators, researchers, and professionals to inspire dialogue,
              share resources, and address the field&apos;s challenges.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-white/40 text-sm md:text-base leading-[1.8] mb-10"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Founded in 1947, ACM has grown to include more than 100,000 members
              from over 190 countries, making it a truly global community of computing professionals.
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-3 gap-6 mb-10"
            >
              {[
                { value: "1947", label: "Founded" },
                { value: "100K+", label: "Members" },
                { value: "190+", label: "Countries" },
              ].map((stat, i) => (
                <div key={i} className="border-l border-white/10 pl-4">
                  <div
                    className="text-2xl md:text-3xl font-black text-[var(--foreground)] mb-1"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {stat.value}
                  </div>
                  <div
                    className="text-[10px] md:text-xs tracking-normalr text-white/30 uppercase"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>

            {/* CTA Link */}
            <motion.a
              href="https://www.acm.org"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="group inline-flex items-center gap-3 text-sm text-white/50 hover:text-acm-blue transition-colors duration-300"
              style={{ fontFamily: "var(--font-body)" }}
            >
              <span className="tracking-normal">Visit ACM.org</span>
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </motion.a>
          </div>

          {/* Right Column - Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            {/* ACM Logo Card */}
            <div className="relative bg-[var(--surface)] border border-white/5 p-12 md:p-16">
              {/* Corner Accents */}
              <div className="absolute top-0 left-0 w-6 h-6 border-l-2 border-t-2 border-acm-blue/40" />
              <div className="absolute top-0 right-0 w-6 h-6 border-r-2 border-t-2 border-acm-blue/40" />
              <div className="absolute bottom-0 left-0 w-6 h-6 border-l-2 border-b-2 border-acm-blue/40" />
              <div className="absolute bottom-0 right-0 w-6 h-6 border-r-2 border-b-2 border-acm-blue/40" />

              {/* Logo */}
              <div className="relative w-full aspect-square max-w-[280px] mx-auto">
                <Image
                  src="/about/Association_for_Computing_Machinery_(ACM)_logo.webp"
                  alt="ACM Logo"
                  fill
                  className="object-contain"
                />
              </div>

              {/* Tagline */}
              <div className="mt-8 text-center">
                <p
                  className="text-white/30 text-sm tracking-normalst uppercase"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  Advancing Computing as a Science & Profession
                </p>
              </div>
            </div>

            {/* Floating Badge */}
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
                Est. 1947
              </span>
            </motion.div>
          </motion.div>
        </div>

        {/* ACM India Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          {/* Divider */}
          <div className="w-full h-px bg-linear-to-r from-transparent via-white/10 to-transparent mb-16" />

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left - ACM India Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative order-2 lg:order-1"
            >
              <div className="relative bg-[var(--surface)] border border-white/5 p-12 md:p-16">
                {/* Corner Accents */}
                <div className="absolute top-0 left-0 w-6 h-6 border-l-2 border-t-2 border-acm-blue/40" />
                <div className="absolute top-0 right-0 w-6 h-6 border-r-2 border-t-2 border-acm-blue/40" />
                <div className="absolute bottom-0 left-0 w-6 h-6 border-l-2 border-b-2 border-acm-blue/40" />
                <div className="absolute bottom-0 right-0 w-6 h-6 border-r-2 border-b-2 border-acm-blue/40" />

                {/* Logo */}
                <div className="relative w-full aspect-4/3 max-w-[300px] mx-auto">
                  <Image
                    src="/about/indiaacm_logo.webp"
                    alt="ACM India Logo"
                    fill
                    className="object-contain"
                  />
                </div>

                {/* Tagline */}
                <div className="mt-8 text-center">
                  <p
                    className="text-white/30 text-sm tracking-normal uppercase"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    Empowering Computing in India
                  </p>
                </div>
              </div>

              {/* Floating Badge */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="absolute -bottom-6 -left-6 bg-acm-blue px-6 py-3"
              >
                <span
                  className="text-[var(--foreground)] text-sm font-medium tracking-normal"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  Est. 2010
                </span>
              </motion.div>
            </motion.div>

            {/* Right - Content */}
            <div className="order-1 lg:order-2">
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-3xl md:text-5xl lg:text-6xl font-black text-[var(--foreground)] tracking-normal leading-[0.95] mb-6"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                ACM <span className="text-acm-blue">INDIA</span>
              </motion.h3>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-white/50 text-base md:text-lg leading-[1.8] mb-6"
                style={{ fontFamily: "var(--font-body)" }}
              >
                <span className="text-[var(--foreground)] font-medium">ACM India</span> is a council of ACM that
                serves the computing community in India. It aims to expand computing research,
                education, and community in India by organizing conferences, sponsoring events,
                and supporting student chapters across the country.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-white/40 text-sm md:text-base leading-[1.8] mb-8"
                style={{ fontFamily: "var(--font-body)" }}
              >
                With over 100+ professional chapters and 500+ student chapters, ACM India is one of
                the largest and most active ACM regions globally. It hosts flagship events like
                COMPUTE, organizes summer schools, and runs programs like the ACM India Doctoral
                Dissertation Award to recognize outstanding research.
              </motion.p>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="grid grid-cols-3 gap-6 mb-8"
              >
                {[
                  { value: "500+", label: "Student Chapters" },
                  { value: "100+", label: "Professional Chapters" },
                  { value: "2010", label: "Established" },
                ].map((stat, i) => (
                  <div key={i} className="border-l border-white/10 pl-4">
                    <div
                      className="text-xl md:text-2xl font-black text-[var(--foreground)] mb-1"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      {stat.value}
                    </div>
                    <div
                      className="text-[10px] md:text-xs tracking-normal text-white/30 uppercase"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      {stat.label}
                    </div>
                  </div>
                ))}
              </motion.div>

              {/* CTA Link */}
              <motion.a
                href="https://india.acm.org"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="group inline-flex items-center gap-3 text-sm text-white/50 hover:text-acm-blue transition-colors duration-300"
                style={{ fontFamily: "var(--font-body)" }}
              >
                <span className="tracking-normal">Visit ACM India</span>
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { ArrowRight, Instagram, Linkedin, Mail, Youtube } from "lucide-react";

const socialLinks = [
  {
    name: "Instagram",
    href: "https://instagram.com/usaracm",
    icon: Instagram
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/company/usaracm",
    icon: Linkedin
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/@usaracm",
    icon: Youtube
  },
  {
    name: "Email",
    href: "mailto:usaracm@ipu.ac.in",
    icon: Mail
  },
];

export default function CTASection() {
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
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-acm-blue/5 rounded-full blur-[200px]" />
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
        <div ref={headerRef} className="text-center max-w-4xl mx-auto">
          {/* Label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-4 mb-8"
          >
            <div className="w-12 h-px bg-white/20" />
            <span
              className="text-[10px] md:text-[11px] tracking-[0.5em] text-white/40 uppercase"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Join Us
            </span>
            <div className="w-12 h-px bg-white/20" />
          </motion.div>

          {/* Main Title */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl lg:text-8xl font-black text-[var(--foreground)] tracking-normal leading-[0.95] mb-8"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            READY TO <span className="text-acm-blue">BUILD</span>
            <br />
            SOMETHING <span className="text-white/20">GREAT?</span>
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white/40 text-base md:text-lg max-w-2xl mx-auto mb-12 leading-relaxed"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Join our community of innovators, creators, and tech enthusiasts.
            Whether you want to learn, build, or connect—there&apos;s a place for you here.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <Link
              href="/teams"
              className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-acm-blue text-[var(--foreground)] font-medium text-sm uppercase tracking-normalr transition-all duration-300 hover:bg-acm-blue/90"
              style={{ fontFamily: "var(--font-body)" }}
            >
              <span>Meet Our Team</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>

            <Link
              href="/blogs"
              className="group inline-flex items-center justify-center gap-3 px-8 py-4 border border-white/10 text-white/70 font-medium text-sm uppercase tracking-normalr transition-all duration-300 hover:border-white/30 hover:text-[var(--foreground)]"
              style={{ fontFamily: "var(--font-body)" }}
            >
              <span>Read Our Blog</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="w-full max-w-xl mx-auto h-px bg-linear-to-r from-transparent via-white/10 to-transparent mb-12"
          />

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex items-center justify-center gap-6"
          >
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-3 border border-white/5 bg-white/2 transition-all duration-300 hover:border-acm-blue/30 hover:bg-acm-blue/5"
              >
                <social.icon className="w-5 h-5 text-white/40 group-hover:text-acm-blue transition-colors duration-300" />
              </a>
            ))}
          </motion.div>

          {/* Contact Info */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-10 text-sm text-white/30"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Questions? Reach out at{" "}
            <a
              href="mailto:usaracm@ipu.ac.in"
              className="text-white/50 hover:text-acm-blue transition-colors duration-300"
            >
              usaracm@ipu.ac.in
            </a>
          </motion.p>
        </div>
      </div>
    </section>
  );
}

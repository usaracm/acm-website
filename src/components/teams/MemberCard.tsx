"use client";

import { motion } from "framer-motion";
import { TeamMember } from "@/data/teamData";
import { Linkedin } from "lucide-react";
import Image from "next/image";

interface MemberCardProps {
  member: TeamMember;
  index: number;
}

export default function MemberCard({ member, index }: MemberCardProps) {
  const isTBA = member.name === "TBF" || member.name === "To be filled" || member.name === "To Be Announced" || member.name === "TBD";
  const hasImage = !!member.imageUrl;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative"
    >
      {/* Main Card */}
      <div className="relative bg-[var(--surface)] border border-white/5 overflow-hidden transition-all duration-500 hover:border-acm-blue/30">
        {/* Corner Accents */}
        <div className="absolute top-0 left-0 w-4 h-4 border-l border-t border-white/10 group-hover:border-acm-blue/40 transition-colors duration-300 z-10" />
        <div className="absolute top-0 right-0 w-4 h-4 border-r border-t border-white/10 group-hover:border-acm-blue/40 transition-colors duration-300 z-10" />
        <div className="absolute bottom-0 left-0 w-4 h-4 border-l border-b border-white/10 group-hover:border-acm-blue/40 transition-colors duration-300 z-10" />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-r border-b border-white/10 group-hover:border-acm-blue/40 transition-colors duration-300 z-10" />

        {/* Photo Area */}
        <div className="relative aspect-4/5 overflow-hidden bg-[#080808]">
          {hasImage ? (
            <>
              <Image
                src={member.imageUrl!}
                alt={member.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-[var(--surface)] via-transparent to-transparent opacity-80" />
            </>
          ) : (
            <>
              {/* Placeholder Pattern */}
              <div className="absolute inset-0 opacity-20">
                <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern
                      id={`dots-${index}`}
                      width="20"
                      height="20"
                      patternUnits="userSpaceOnUse"
                    >
                      <circle cx="2" cy="2" r="1" fill="rgba(255,255,255,0.1)" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill={`url(#dots-${index})`} />
                </svg>
              </div>

              {/* Abstract Avatar */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ delay: index * 0.1 + 0.2, duration: 0.5 }}
                    className="w-24 h-24 rounded-full bg-linear-to-br from-acm-blue/20 to-acm-blue/5 blur-2xl"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div
                      className="text-4xl font-black text-white/10"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      {member.name.charAt(0)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Gradient Overlay for placeholder */}
              <div className="absolute inset-0 bg-linear-to-t from-[var(--surface)] via-[var(--surface)]/50 to-transparent" />
            </>
          )}

          {/* Hover Glow */}
          <motion.div
            className="absolute inset-0 bg-acm-blue/0 group-hover:bg-acm-blue/5 transition-colors duration-500 pointer-events-none"
          />

          {/* Index Badge */}
          <div className="absolute top-3 left-3 z-10">
            <span
              className="text-[10px] tracking-[0.2em] text-white/20 font-medium"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {String(index + 1).padStart(2, '0')}
            </span>
          </div>
        </div>

        {/* Info Section */}
        <div className="relative p-5 bg-[var(--surface)]">
          {/* Role Badge */}
          <div className="mb-3">
            <span
              className="inline-block px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-acm-blue/70 border border-acm-blue/20 bg-acm-blue/5 group-hover:bg-acm-blue/10 group-hover:border-acm-blue/30 transition-all duration-300"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {member.role}
            </span>
          </div>

          {/* Name */}
          <h3
            className={`text-lg md:text-xl font-black tracking-normal transition-all duration-300 mb-3 ${isTBA
              ? "text-white/20 italic"
              : "text-[var(--foreground)] group-hover:text-acm-blue"
              }`}
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {isTBA ? "To Be Announced" : member.name}
          </h3>

          {/* Accent Line */}
          <motion.div
            className="h-px bg-linear-to-r from-acm-blue/40 to-transparent mb-4"
            initial={{ width: 0 }}
            whileInView={{ width: "100%" }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
          />

          {/* Social Links */}
          <div className="flex items-center gap-3">
            {member.linkedin && !isTBA ? (
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${member.name}'s LinkedIn profile`}
                className="p-2 bg-white/5 border border-white/5 hover:border-acm-blue/30 hover:bg-acm-blue/10 transition-all duration-300"
              >
                <Linkedin className="w-4 h-4 text-white/40 hover:text-acm-blue transition-colors" />
              </a>
            ) : (
              <div className="p-2 bg-white/3 border border-white/5 opacity-30 cursor-not-allowed">
                <Linkedin className="w-4 h-4 text-white/20" />
              </div>
            )}
          </div>
        </div>

        {/* Hover Scan Line */}
        <motion.div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100"
          style={{
            background: "linear-gradient(180deg, transparent 0%, rgba(0, 133, 202, 0.05) 50%, transparent 100%)",
            backgroundSize: "100% 200%",
          }}
          animate={{
            backgroundPosition: ["0% 0%", "0% 100%"],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>
    </motion.div>
  );
}

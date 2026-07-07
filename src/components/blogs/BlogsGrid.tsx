"use client";

import { motion, AnimatePresence, useInView } from "framer-motion";
import { useState, useRef } from "react";
import { type BlogPost, categories } from "@/data/blogsData";
import { ArrowUpRight, Clock, Filter } from "lucide-react";
import Image from "next/image";

interface BlogsGridProps {
  posts: BlogPost[];
  onPostClick?: (post: BlogPost) => void;
}

export default function BlogsGrid({ posts, onPostClick }: BlogsGridProps) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });

  const filteredPosts =
    activeCategory === "All"
      ? posts
      : posts.filter((p) => p.category === activeCategory);

  return (
    <section className="relative bg-[#030303] py-20 sm:py-32 md:py-40 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-acm-blue/[0.02] rounded-full blur-[200px]" />
        <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-purple-900/[0.015] rounded-full blur-[150px]" />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
        {/* Section Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 40 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 md:mb-16"
        >
          <div className="flex items-center gap-4 mb-6">
            <span
              className="text-[10px] md:text-[11px] font-medium tracking-[0.3em] text-acm-blue uppercase"
              style={{ fontFamily: "var(--font-body)" }}
            >
              02
            </span>
            <div className="w-12 md:w-20 h-px bg-acm-blue/40" />
            <span
              className="text-[10px] md:text-[11px] font-light tracking-[0.4em] text-white/30 uppercase"
              style={{ fontFamily: "var(--font-body)" }}
            >
              All Stories
            </span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <h2
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[var(--foreground)] tracking-normal"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              EXPLORE THE <span className="text-acm-blue">ARCHIVE</span>
            </h2>

            {/* Post count */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-px bg-white/20" />
              <span
                className="text-sm text-white/40"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {filteredPosts.length} {filteredPosts.length === 1 ? "Story" : "Stories"}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 md:mb-16"
        >
          <div className="flex items-center gap-4 mb-6">
            <Filter size={14} className="text-white/30" />
            <span
              className="text-[10px] tracking-[0.3em] text-white/30 uppercase"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Filter by Category
            </span>
          </div>

          <div className="flex flex-wrap gap-2 md:gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`relative px-4 md:px-5 py-2 md:py-2.5 text-xs uppercase tracking-[0.15em] transition-all duration-300 border ${activeCategory === category
                  ? "bg-acm-blue/20 border-acm-blue/40 text-acm-blue"
                  : "bg-white/[0.02] border-white/10 text-white/40 hover:border-white/20 hover:text-white/60"
                  }`}
                style={{ fontFamily: "var(--font-body)" }}
              >
                {activeCategory === category && (
                  <motion.div
                    layoutId={undefined}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute inset-0 bg-acm-blue/10 border border-acm-blue/30"
                    transition={{ duration: 0.3 }}
                  />
                )}
                <span className="relative z-10">{category}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Posts Grid */}
        <motion.div className="grid gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filteredPosts.map((post, index) => (
              <BlogCard
                key={post.id}
                post={post}
                index={index}
                isHovered={hoveredId === post.id}
                onHover={() => setHoveredId(post.id)}
                onLeave={() => setHoveredId(null)}
                onClick={() => onPostClick?.(post)}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredPosts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-24 text-center"
          >
            <div className="w-16 h-16 mx-auto mb-6 border border-white/10 flex items-center justify-center">
              <Filter size={24} className="text-white/20" />
            </div>
            <p
              className="text-sm text-white/30 uppercase tracking-wider"
              style={{ fontFamily: "var(--font-body)" }}
            >
              No stories found in this category
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}

function BlogCard({
  post,
  index,
  isHovered,
  onHover,
  onLeave,
  onClick,
}: {
  post: BlogPost;
  index: number;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
  onClick: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });

  return (
    <motion.article
      ref={cardRef}
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      exit={{ opacity: 0, scale: 0.95, y: -20 }}
      transition={{
        duration: 0.5,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onClick={onClick}
      className="group cursor-pointer h-full"
    >
      <div className="relative h-full flex flex-col bg-[var(--surface)] border border-white/5 overflow-hidden transition-all duration-500 hover:border-acm-blue/20">
        {/* Corner Accents */}
        <div className="absolute top-0 left-0 w-6 h-6 border-l-2 border-t-2 border-white/10 group-hover:border-acm-blue/40 transition-colors duration-500 z-10" />
        <div className="absolute top-0 right-0 w-6 h-6 border-r-2 border-t-2 border-white/10 group-hover:border-acm-blue/40 transition-colors duration-500 z-10" />
        <div className="absolute bottom-0 left-0 w-6 h-6 border-l-2 border-b-2 border-white/10 group-hover:border-acm-blue/40 transition-colors duration-500 z-10" />
        <div className="absolute bottom-0 right-0 w-6 h-6 border-r-2 border-b-2 border-white/10 group-hover:border-acm-blue/40 transition-colors duration-500 z-10" />

        {/* Image Section */}
        <div className="relative aspect-[16/10] overflow-hidden">
          <motion.div
            className="absolute inset-0"
            animate={{ scale: isHovered ? 1.1 : 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
            />
          </motion.div>

          {/* Overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-[var(--surface)] via-black/40 to-transparent opacity-80" />

          {/* Category Badge */}
          <div className="absolute top-4 left-4 z-10">
            <span
              className="px-2.5 py-1 bg-black/60 backdrop-blur-sm border border-white/10 text-[9px] tracking-[0.15em] text-white/60 uppercase"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {post.category}
            </span>
          </div>

          {/* Read Time Badge */}
          <div className="absolute top-4 right-4 z-10 flex items-center gap-1.5 text-white/40">
            <Clock size={12} />
            <span
              className="text-[9px] tracking-wider uppercase"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {post.readTime}
            </span>
          </div>

          {/* Scan line effect on hover */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "linear-gradient(180deg, transparent 0%, rgba(0, 133, 202, 0.03) 50%, transparent 100%)",
              backgroundSize: "100% 200%",
            }}
            animate={isHovered ? {
              backgroundPosition: ["0% 0%", "0% 100%"],
            } : {}}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </div>

        {/* Content Section */}
        <div className="p-5 md:p-6 flex-1 flex flex-col">
          {/* Title */}
          <h3
            className="text-lg md:text-xl font-black text-[var(--foreground)] mb-2 group-hover:text-acm-blue transition-colors duration-300 tracking-normal line-clamp-2"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {post.title}
          </h3>

          {/* Subtitle */}
          <p
            className="text-white/40 text-sm mb-3 line-clamp-1"
            style={{ fontFamily: "var(--font-body)" }}
          >
            {post.subtitle}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {post.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 text-[9px] tracking-[0.1em] text-white/25 border border-white/5 bg-white/[0.02] uppercase"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-white/5 mt-auto">
            {/* Author */}
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-linear-to-br from-acm-blue/30 to-acm-blue/10 border border-white/10 flex items-center justify-center">
                <span className="text-[8px] font-bold text-acm-blue">
                  {post.author.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div className="flex flex-col">
                <span
                  className="text-xs text-white/50"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {post.author.name}
                </span>
                <span
                  className="text-[9px] text-acm-blue/60"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {post.author.team}
                </span>
              </div>
            </div>

            {/* Date */}
            <span
              className="text-[10px] text-white/30 uppercase tracking-wider"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {new Date(post.publishedAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
            </span>
          </div>

          {/* Read indicator on hover */}
          <motion.div
            className="absolute bottom-5 right-5 flex items-center gap-2 text-acm-blue"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -10 }}
            transition={{ duration: 0.3 }}
          >
            <span
              className="text-[10px] uppercase tracking-wider"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Read
            </span>
            <ArrowUpRight size={14} />
          </motion.div>
        </div>

        {/* Hover glow */}
        <motion.div
          className="absolute -inset-px pointer-events-none"
          animate={{
            boxShadow: isHovered
              ? "0 0 40px rgba(0,133,202,0.1), inset 0 0 30px rgba(0,133,202,0.03)"
              : "0 0 0px rgba(0,133,202,0), inset 0 0 0px rgba(0,133,202,0)",
          }}
          transition={{ duration: 0.4 }}
        />
      </div>
    </motion.article>
  );
}

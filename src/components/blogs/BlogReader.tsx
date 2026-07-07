"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useCallback, useMemo, useRef, useState } from "react";
import { X, Clock, Calendar, ArrowLeft, Share2, Bookmark, ChevronUp, Users } from "lucide-react";
import { type BlogPost } from "@/data/blogsData";
import Image from "next/image";
import React from "react";

interface BlogReaderProps {
  post: BlogPost | null;
  isOpen: boolean;
  onClose: () => void;
}

// Parse markdown-like content into JSX
function parseContent(content: string) {
  const lines = content.split('\n');
  const elements: React.ReactElement[] = [];
  let currentParagraph: string[] = [];
  let key = 0;

  const processInlineFormatting = (text: string): React.ReactNode => {
    // Handle inline code
    const parts = text.split(/(`[^`]+`)/g);
    return parts.map((part, i) => {
      if (part.startsWith('`') && part.endsWith('`')) {
        return (
          <code key={i} className="px-1.5 py-0.5 bg-white/10 rounded text-acm-blue font-mono text-sm">
            {part.slice(1, -1)}
          </code>
        );
      }
      // Handle bold
      const boldParts = part.split(/(\*\*[^*]+\*\*)/g);
      return boldParts.map((bp, j) => {
        if (bp.startsWith('**') && bp.endsWith('**')) {
          return <strong key={`${i}-${j}`} className="text-[var(--foreground)] font-semibold">{bp.slice(2, -2)}</strong>;
        }
        return bp;
      });
    });
  };

  const flushParagraph = () => {
    if (currentParagraph.length > 0) {
      const text = currentParagraph.join(' ').trim();
      if (text) {
        elements.push(
          <p key={key++} className="text-white/70 leading-[1.8] mb-6 text-base md:text-lg">
            {processInlineFormatting(text)}
          </p>
        );
      }
      currentParagraph = [];
    }
  };

  for (const line of lines) {
    const trimmed = line.trim();

    // Check for headers
    if (trimmed.startsWith('### ')) {
      flushParagraph();
      elements.push(
        <h3 key={key++} className="mt-10 mb-4 text-xl md:text-2xl font-bold text-[var(--foreground)]">
          {trimmed.replace('### ', '')}
        </h3>
      );
    } else if (trimmed.startsWith('## ')) {
      flushParagraph();
      elements.push(
        <h2 key={key++} className="mt-12 mb-6 text-2xl md:text-3xl font-bold text-[var(--foreground)] border-l-2 border-acm-blue pl-4">
          {trimmed.replace('## ', '')}
        </h2>
      );
    } else if (trimmed.startsWith('# ')) {
      flushParagraph();
      elements.push(
        <h1 key={key++} className="mt-12 mb-6 text-3xl md:text-4xl font-bold text-[var(--foreground)]">
          {trimmed.replace('# ', '')}
        </h1>
      );
    }
    // Check for numbered lists
    else if (/^\d+\.\s/.test(trimmed)) {
      flushParagraph();
      const content = trimmed.replace(/^\d+\.\s/, '');
      elements.push(
        <div key={key++} className="ml-4 md:ml-6 mb-3 flex gap-3 text-white/70">
          <span className="text-acm-blue font-mono text-sm flex-shrink-0">{trimmed.match(/^\d+/)?.[0]}.</span>
          <span className="text-base md:text-lg leading-relaxed">{processInlineFormatting(content)}</span>
        </div>
      );
    }
    // Check for bullet lists
    else if (trimmed.startsWith('- ')) {
      flushParagraph();
      elements.push(
        <div key={key++} className="ml-4 md:ml-6 mb-3 flex gap-3 text-white/70">
          <span className="text-acm-blue mt-2">•</span>
          <span className="text-base md:text-lg leading-relaxed">{processInlineFormatting(trimmed.replace('- ', ''))}</span>
        </div>
      );
    }
    // Empty line means end of paragraph
    else if (trimmed === '') {
      flushParagraph();
    }
    // Regular text
    else {
      currentParagraph.push(trimmed);
    }
  }

  flushParagraph();
  return elements;
}

export default function BlogReader({ post, isOpen, onClose }: BlogReaderProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [readProgress, setReadProgress] = useState(0);

  // Handle escape key
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  // Handle scroll for progress and back-to-top button
  const handleScroll = useCallback(() => {
    if (scrollContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
      const progress = (scrollTop / (scrollHeight - clientHeight)) * 100;
      setReadProgress(Math.min(progress, 100));
      setShowScrollTop(scrollTop > 500);
    }
  }, []);

  const scrollToTop = () => {
    scrollContainerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
      setReadProgress(0);
      setShowScrollTop(false);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  // Parse content
  const parsedContent = useMemo(() => {
    if (!post?.content) return null;
    return parseContent(post.content);
  }, [post?.content]);

  if (!post) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] bg-[#030303]"
        >
          {/* Reading progress bar */}
          <motion.div
            className="fixed top-0 left-0 right-0 h-1 bg-acm-blue/20 z-[110]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <motion.div
              className="h-full bg-acm-blue"
              style={{ width: `${readProgress}%` }}
            />
          </motion.div>

          {/* Fixed Header */}
          <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.2, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-0 left-0 right-0 z-[105] bg-[#030303]/80 backdrop-blur-xl border-b border-white/5"
          >
            <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 md:h-20 flex items-center justify-between">
              {/* Back button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onClose}
                className="group flex items-center gap-2 md:gap-3 text-white/60 hover:text-[var(--foreground)] transition-colors"
              >
                <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-acm-blue/50 group-hover:bg-acm-blue/10 transition-all">
                  <ArrowLeft className="w-4 h-4 group-hover:text-acm-blue transition-colors" />
                </div>
                <span className="hidden md:block text-sm font-medium">Back to Blogs</span>
              </motion.button>

              {/* Center - Category */}
              <div className="absolute left-1/2 -translate-x-1/2 hidden md:block">
                <span className="text-xs font-medium tracking-widest text-acm-blue uppercase">
                  {post.category}
                </span>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-acm-blue/50 hover:bg-acm-blue/10 transition-all"
                >
                  <Bookmark className="w-4 h-4 text-white/60" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-acm-blue/50 hover:bg-acm-blue/10 transition-all"
                >
                  <Share2 className="w-4 h-4 text-white/60" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onClose}
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-red-500/50 hover:bg-red-500/10 transition-all md:hidden"
                >
                  <X className="w-4 h-4 text-white/60" />
                </motion.button>
              </div>
            </div>
          </motion.header>

          {/* Main Content */}
          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="h-full overflow-y-auto overflow-x-hidden pt-16 md:pt-20"
          >
            {/* Hero Section */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="relative min-h-[60vh] md:min-h-[70vh] flex items-end"
            >
              {/* Hero Image */}
              <div className="absolute inset-0">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              
              {/* Background Overlay */}
              <div
                className="absolute inset-0"
                style={{
                  background: `
                    radial-gradient(ellipse 100% 60% at 50% 0%, rgba(0, 133, 202, 0.12), transparent 60%),
                    radial-gradient(ellipse 80% 40% at 80% 20%, rgba(99, 102, 241, 0.08), transparent 50%),
                    linear-gradient(180deg, rgba(3,3,3,0) 0%, rgba(3,3,3,1) 100%)
                  `,
                }}
              />

              {/* Content */}
              <div className="relative z-10 w-full max-w-4xl mx-auto px-6 md:px-8 pb-12 md:pb-20">
                {/* Category & Team */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex flex-wrap items-center gap-3 mb-6"
                >
                  <span className="px-4 py-1.5 bg-acm-blue/20 border border-acm-blue/30 text-xs font-medium tracking-wider text-acm-blue uppercase rounded-full">
                    {post.category}
                  </span>
                  <span className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-white/10 text-xs text-white/50 uppercase tracking-wider rounded-full">
                    <Users className="w-3 h-3" />
                    {post.author.team}
                  </span>
                </motion.div>

                {/* Title */}
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--foreground)] leading-[1.1] mb-4 md:mb-6"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {post.title}
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-lg md:text-xl lg:text-2xl text-white/50 mb-8"
                >
                  {post.subtitle}
                </motion.p>

                {/* Meta Row */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="flex flex-wrap items-center gap-4 md:gap-6"
                >
                  {/* Author */}
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-acm-blue/40 to-acm-blue/10 border border-white/10 flex items-center justify-center">
                      <span className="text-sm md:text-base font-bold text-acm-blue">
                        {post.author.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <span className="block text-sm md:text-base font-medium text-[var(--foreground)]">
                        {post.author.name}
                      </span>
                      <span className="block text-xs text-acm-blue/70">
                        {post.author.role}
                      </span>
                    </div>
                  </div>

                  <span className="hidden md:block h-6 w-px bg-white/10" />

                  {/* Date */}
                  <div className="flex items-center gap-2 text-white/40">
                    <Calendar className="w-4 h-4" />
                    <span className="text-xs md:text-sm">
                      {new Date(post.publishedAt).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>

                  <span className="hidden md:block h-6 w-px bg-white/10" />

                  {/* Read time */}
                  <div className="flex items-center gap-2 text-white/40">
                    <Clock className="w-4 h-4" />
                    <span className="text-xs md:text-sm">{post.readTime}</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Article Content */}
            <motion.article
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="relative w-full max-w-4xl mx-auto px-6 md:px-8 pb-24"
            >
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-10">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-white/5 border border-white/10 text-xs text-white/40 uppercase tracking-wider rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Divider */}
              <div className="mb-10 flex items-center gap-4">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                <div className="flex gap-1">
                  {[0, 1, 2].map((i) => (
                    <div key={i} className="w-1.5 h-1.5 rounded-full bg-acm-blue/40" />
                  ))}
                </div>
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              </div>

              {/* Opening Quote */}
              <blockquote className="relative border-l-2 border-acm-blue/50 pl-6 mb-12">
                <p className="text-lg md:text-xl italic text-white/60 leading-relaxed">
                  {post.excerpt}
                </p>
              </blockquote>

              {/* Dynamic content */}
              <div className="prose prose-invert prose-lg max-w-none">
                {parsedContent}
              </div>

              {/* End divider */}
              <div className="mt-16 mb-12 flex items-center justify-center gap-4">
                <div className="h-px w-20 bg-gradient-to-r from-transparent to-white/20" />
                <div className="text-xs uppercase tracking-widest text-white/20">End</div>
                <div className="h-px w-20 bg-gradient-to-l from-transparent to-white/20" />
              </div>

              {/* Author Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 md:p-8"
              >
                <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-acm-blue/40 to-acm-blue/10 border-2 border-white/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl md:text-3xl font-bold text-acm-blue">
                      {post.author.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg md:text-xl font-bold text-[var(--foreground)] mb-1">
                      {post.author.name}
                    </h4>
                    <p className="text-sm text-acm-blue mb-3">
                      {post.author.role} • {post.author.team}
                    </p>
                    <p className="text-sm text-white/50 leading-relaxed">
                      Passionate about technology and sharing knowledge with the community. 
                      Contributing to the tech ecosystem one article at a time.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Continue Reading */}
              <div className="mt-16 pt-12 border-t border-white/5">
                <h3 className="text-xl md:text-2xl font-bold text-[var(--foreground)] mb-6">
                  Continue Reading
                </h3>
                <button
                  onClick={onClose}
                  className="group inline-flex items-center gap-3 text-acm-blue hover:text-[var(--foreground)] transition-colors"
                >
                  <span className="text-sm font-medium">Explore more articles</span>
                  <ArrowLeft className="w-4 h-4 rotate-180 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.article>
          </div>

          {/* Scroll to top button */}
          <AnimatePresence>
            {showScrollTop && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 20 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={scrollToTop}
                className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50 w-12 h-12 rounded-full bg-acm-blue text-[var(--foreground)] flex items-center justify-center shadow-lg shadow-acm-blue/20"
              >
                <ChevronUp className="w-5 h-5" />
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

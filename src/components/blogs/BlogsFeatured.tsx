"use client";

import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";
import { type BlogPost } from "@/data/blogsData";
import { ArrowUpRight, Clock } from "lucide-react";

interface BlogsFeaturedProps {
  posts: BlogPost[];
  onPostClick?: (post: BlogPost) => void;
}

export default function BlogsFeatured({
  posts,
  onPostClick,
}: BlogsFeaturedProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });

  const featuredPosts = posts.filter((p) => p.featured).slice(0, 3);
  const mainPost = featuredPosts[0];
  const secondaryPosts = featuredPosts.slice(1, 3);

  return (
    <section
      ref={containerRef}
      className="relative bg-[#030303] py-32 md:py-40 overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-acm-blue/[0.03] rounded-full blur-[200px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-900/[0.02] rounded-full blur-[180px]" />
        
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
            backgroundSize: "80px 80px",
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
          className="mb-16 md:mb-24"
        >
          <div className="flex items-center gap-4 mb-6">
            <span 
              className="text-[10px] md:text-[11px] font-medium tracking-[0.3em] text-acm-blue uppercase"
              style={{ fontFamily: "var(--font-body)" }}
            >
              01
            </span>
            <div className="w-12 md:w-20 h-px bg-acm-blue/40" />
            <span 
              className="text-[10px] md:text-[11px] font-light tracking-[0.4em] text-white/30 uppercase"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Featured Stories
            </span>
          </div>
          
          <h2
            className="text-4xl md:text-6xl lg:text-7xl font-black text-[var(--foreground)] tracking-normal leading-[0.95]"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            TALES THAT <span className="text-acm-blue">INSPIRE</span>
          </h2>
        </motion.div>

        {/* Featured Grid */}
        <div className="grid lg:grid-cols-12 gap-6 md:gap-8">
          {/* Main Featured Post - Large Card */}
          {mainPost && (
            <motion.article
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              onClick={() => onPostClick?.(mainPost)}
              className="lg:col-span-7 group cursor-pointer"
            >
              <div className="relative h-full bg-[var(--surface)] border border-white/5 overflow-hidden transition-all duration-500 hover:border-acm-blue/20">
                {/* Corner Accents */}
                <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-white/10 group-hover:border-acm-blue/40 transition-colors duration-500 z-10" />
                <div className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-white/10 group-hover:border-acm-blue/40 transition-colors duration-500 z-10" />
                <div className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 border-white/10 group-hover:border-acm-blue/40 transition-colors duration-500 z-10" />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-white/10 group-hover:border-acm-blue/40 transition-colors duration-500 z-10" />

                {/* Image Section */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={mainPost.image}
                    alt={mainPost.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-linear-to-t from-[var(--surface)] via-black/40 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />
                  
                  {/* Category Badge */}
                  <div className="absolute top-6 left-6 z-10">
                    <span 
                      className="px-4 py-2 bg-acm-blue/20 backdrop-blur-md border border-acm-blue/30 text-[10px] tracking-[0.2em] text-acm-blue uppercase"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      {mainPost.category}
                    </span>
                  </div>

                  {/* Featured Badge */}
                  <div className="absolute top-6 right-6 z-10">
                    <span 
                      className="px-3 py-1.5 bg-white/10 backdrop-blur-md border border-white/10 text-[9px] tracking-[0.15em] text-white/60 uppercase"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      Featured
                    </span>
                  </div>

                  {/* Scan line effect */}
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none"
                    style={{
                      background: "linear-gradient(180deg, transparent 0%, rgba(0, 133, 202, 0.03) 50%, transparent 100%)",
                      backgroundSize: "100% 200%",
                    }}
                    animate={{
                      backgroundPosition: ["0% 0%", "0% 100%"],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                </div>

                {/* Content Section */}
                <div className="p-6 md:p-8">
                  {/* Title */}
                  <h3 
                    className="text-2xl md:text-3xl lg:text-4xl font-black text-[var(--foreground)] mb-3 group-hover:text-acm-blue transition-colors duration-300 tracking-normal"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {mainPost.title}
                  </h3>
                  
                  {/* Subtitle */}
                  <p 
                    className="text-white/50 text-base md:text-lg mb-4"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {mainPost.subtitle}
                  </p>
                  
                  {/* Excerpt */}
                  <p 
                    className="text-white/30 text-sm md:text-base leading-relaxed mb-6 line-clamp-2"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {mainPost.excerpt}
                  </p>

                  {/* Meta Row */}
                  <div className="flex items-center justify-between pt-6 border-t border-white/5">
                    <div className="flex items-center gap-4">
                      {/* Author */}
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-linear-to-br from-acm-blue/40 to-acm-blue/10 border border-white/10 flex items-center justify-center">
                          <span className="text-[10px] font-bold text-acm-blue">
                            {mainPost.author.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <span 
                            className="block text-sm text-white/70"
                            style={{ fontFamily: "var(--font-body)" }}
                          >
                            {mainPost.author.name}
                          </span>
                          <span 
                            className="text-[10px] text-acm-blue/70 uppercase tracking-wider"
                            style={{ fontFamily: "var(--font-body)" }}
                          >
                            {mainPost.author.team}
                          </span>
                        </div>
                      </div>
                      
                      <div className="w-px h-8 bg-white/10" />
                      
                      {/* Read Time */}
                      <div className="flex items-center gap-2 text-white/30">
                        <Clock size={14} />
                        <span 
                          className="text-xs"
                          style={{ fontFamily: "var(--font-body)" }}
                        >
                          {mainPost.readTime}
                        </span>
                      </div>
                    </div>

                    {/* Read More */}
                    <div className="flex items-center gap-2 text-white/40 group-hover:text-acm-blue transition-colors duration-300">
                      <span 
                        className="text-xs uppercase tracking-wider"
                        style={{ fontFamily: "var(--font-body)" }}
                      >
                        Read Story
                      </span>
                      <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                    </div>
                  </div>
                </div>

                {/* Hover glow */}
                <div className="absolute -inset-px bg-linear-to-br from-acm-blue/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </div>
            </motion.article>
          )}

          {/* Secondary Posts - Stacked */}
          <div className="lg:col-span-5 flex flex-col gap-6 md:gap-8">
            {secondaryPosts.map((post, index) => (
              <SecondaryCard 
                key={post.id} 
                post={post} 
                index={index}
                onClick={() => onPostClick?.(post)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function SecondaryCard({ 
  post, 
  index,
  onClick 
}: { 
  post: BlogPost; 
  index: number;
  onClick?: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });

  return (
    <motion.article
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      onClick={onClick}
      className="group cursor-pointer flex-1"
    >
      <div className="relative h-full bg-[var(--surface)] border border-white/5 overflow-hidden transition-all duration-500 hover:border-acm-blue/20">
        {/* Corner Accents */}
        <div className="absolute top-0 left-0 w-6 h-6 border-l-2 border-t-2 border-white/10 group-hover:border-acm-blue/40 transition-colors duration-500 z-10" />
        <div className="absolute bottom-0 right-0 w-6 h-6 border-r-2 border-b-2 border-white/10 group-hover:border-acm-blue/40 transition-colors duration-500 z-10" />

        <div className="flex flex-col sm:flex-row h-full">
          {/* Image */}
          <div className="relative w-full sm:w-2/5 aspect-video sm:aspect-auto overflow-hidden">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-linear-to-r from-transparent to-[var(--surface)] opacity-60" />
            
            {/* Category */}
            <div className="absolute top-4 left-4 z-10">
              <span 
                className="px-2.5 py-1 bg-black/60 backdrop-blur-sm border border-white/10 text-[9px] tracking-[0.15em] text-white/60 uppercase"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {post.category}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 p-5 md:p-6 flex flex-col justify-center">
            <h3 
              className="text-lg md:text-xl font-black text-[var(--foreground)] mb-2 group-hover:text-acm-blue transition-colors duration-300 tracking-normal line-clamp-2"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {post.title}
            </h3>
            
            <p 
              className="text-white/30 text-sm mb-4 line-clamp-2"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {post.excerpt}
            </p>

            {/* Meta */}
            <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-linear-to-br from-acm-blue/30 to-acm-blue/10 border border-white/10 flex items-center justify-center">
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
                <span className="text-white/20">·</span>
                <span 
                  className="text-xs text-white/30"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {post.readTime}
                </span>
              </div>
              
              <ArrowUpRight 
                size={14} 
                className="text-white/30 group-hover:text-acm-blue group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" 
              />
            </div>
          </div>
        </div>

        {/* Hover glow */}
        <div className="absolute -inset-px bg-linear-to-br from-acm-blue/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      </div>
    </motion.article>
  );
}

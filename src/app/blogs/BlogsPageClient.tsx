"use client";

import { useState, useCallback } from "react";
import BlogsHero from "@/components/blogs/BlogsHero";
import BlogsMarquee from "@/components/blogs/BlogsMarquee";
import BlogsTransition from "@/components/blogs/BlogsTransition";
import BlogsFeatured from "@/components/blogs/BlogsFeatured";
import BlogsGrid from "@/components/blogs/BlogsGrid";
import BlogsClosing from "@/components/blogs/BlogsClosing";
import BlogReader from "@/components/blogs/BlogReader";
import { blogPosts, type BlogPost } from "@/data/blogsData";

export default function BlogsPageClient() {
    const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
    const [isReaderOpen, setIsReaderOpen] = useState(false);

    const handlePostClick = useCallback((post: BlogPost) => {
        setSelectedPost(post);
        setIsReaderOpen(true);
    }, []);

    const handleCloseReader = useCallback(() => {
        setIsReaderOpen(false);
        // Delay clearing the post to allow exit animation
        setTimeout(() => setSelectedPost(null), 400);
    }, []);

    return (
        <main className="bg-[var(--background)] text-[var(--foreground)] selection:bg-acm-blue/30">
            {/* Cinematic hero with parallax */}
            <BlogsHero />

            {/* Marquee Section */}
            <BlogsMarquee />

            {/* Transition section with quote */}
            <BlogsTransition />

            {/* Featured stories highlight */}
            <BlogsFeatured posts={blogPosts} onPostClick={handlePostClick} />

            {/* All stories grid with filtering */}
            <BlogsGrid posts={blogPosts} onPostClick={handlePostClick} />

            {/* Closing CTA section */}
            <BlogsClosing />

            {/* Blog reader popup */}
            <BlogReader
                post={selectedPost}
                isOpen={isReaderOpen}
                onClose={handleCloseReader}
            />
        </main>
    );
}

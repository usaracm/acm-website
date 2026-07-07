import { Metadata } from "next";
import BlogsPageClient from "./BlogsPageClient";

export const metadata: Metadata = {
  title: "Blogs",
  description: "Read insights on web development, AI, blockchain, DSA, and more from GGSIPU EDC ACM community members and tech enthusiasts.",
};

export default function BlogsPage() {
  return <BlogsPageClient />;
}

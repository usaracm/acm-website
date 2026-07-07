import type { NextConfig } from "next";

const nextConfig = {
  output: 'export',
  trailingSlash: true, // Fixes 404s on cPanel/Apache by using folder structure

  // Optional: Add this if you get Image Optimization errors
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'private-user-images.githubusercontent.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/iic-air",
  trailingSlash: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.googleusercontent.com",
      },
    ],
  },
};

export default nextConfig;

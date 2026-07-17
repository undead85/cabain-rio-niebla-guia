import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export deployed to Cloudflare Pages (no Node server available).
  output: "export",
  images: {
    unoptimized: true,
  },
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;

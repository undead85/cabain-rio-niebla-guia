import type { NextConfig } from "next";
import { version } from "./package.json";

const nextConfig: NextConfig = {
  // Static export deployed to Cloudflare Pages (no Node server available).
  output: "export",
  env: {
    NEXT_PUBLIC_APP_VERSION: version,
  },
  images: {
    unoptimized: true,
  },
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;

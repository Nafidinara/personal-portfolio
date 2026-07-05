import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // NOTE: `output: "export"` was removed for the Ask Alfara chat — a static export
  // has no server to run app/api/chat. The app now deploys to a Node host (Vercel).
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;

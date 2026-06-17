import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@lumora/ui", "@lumora/icons"],
  outputFileTracingRoot: path.join(__dirname, "../.."),
  // Verification builds can target a separate dir (LUMORA_BUILD_DIR=.next-verify)
  // so a `next build` never clobbers a running `next dev` on `.next`.
  // Vercel and `next dev` leave the env unset and use the default `.next`.
  distDir: process.env.LUMORA_BUILD_DIR || ".next",
};

export default nextConfig;

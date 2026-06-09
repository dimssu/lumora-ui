import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@lumora/ui", "@lumora/icons"],
  outputFileTracingRoot: path.join(__dirname, "../.."),
};

export default nextConfig;

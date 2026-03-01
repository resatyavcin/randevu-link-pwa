import type { NextConfig } from "next";
import { withSerwist } from "@serwist/turbopack";

const nextConfig: NextConfig = {
  reactCompiler: true,
  transpilePackages: ["vaul"],
};

export default withSerwist(nextConfig);

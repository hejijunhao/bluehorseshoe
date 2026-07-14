import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keep native/WASM DB drivers out of the bundler; load them via Node at runtime.
  serverExternalPackages: ["@electric-sql/pglite", "@neondatabase/serverless"],
};

export default nextConfig;

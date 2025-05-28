import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  devIndicators: false,
  images: {
    unoptimized: true  // This prevents the Cloud Function creation
  }
};

export default nextConfig;

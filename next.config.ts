import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: { unoptimized: true },
  basePath: '/My-portfolio',
  assetPrefix: '/My-portfolio/',
};

export default nextConfig;

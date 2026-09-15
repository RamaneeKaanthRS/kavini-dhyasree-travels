import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  output: process.env.VERCEL ? undefined : 'standalone',
  turbopack: {
    root: path.resolve(__dirname),
  },
  serverExternalPackages: ['better-sqlite3'],
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion', 'motion'],
  },
  compress: true,
  poweredByHeader: false,
};

export default nextConfig;


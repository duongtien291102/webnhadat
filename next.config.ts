import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  deploymentId: process.env.DEPLOYMENT_VERSION,
  poweredByHeader: false,
  outputFileTracingExcludes: {
    '/api/uploads/**': ['./uploads/**/*', './next.config.ts'],
    '/api/admin/upload': ['./uploads/**/*', './next.config.ts'],
  },
  images: {
    formats: ['image/webp'],
    minimumCacheTTL: 31536000,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

export default nextConfig;

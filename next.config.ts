import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable Turbopack (default in Next.js 16)
  turbopack: {},
  
  // Configure external image domains
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
  
  // Suppress Node.js deprecation warnings from dependencies
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.infrastructureLogging = {
        level: 'error',
      };
    }
    return config;
  },
};

export default nextConfig;

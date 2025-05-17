import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['images.unsplash.com', 'www.google.com', 'unsplash.com'],
     remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // Allow all hostnames over HTTPS
      },
    ],
  },
};

export default nextConfig;

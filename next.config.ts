import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable React strict mode
  reactStrictMode: true,

  // Handle hydration errors gracefully
  onRecoverableError: (error: Error) => {
    if (error.message.includes('Hydration')) {
      console.warn('Hydration mismatch:', error);
    } else {
      console.error(error);
    }
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
    ],
  },
};

export default nextConfig;
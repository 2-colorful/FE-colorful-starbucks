import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'sitem.ssgcdn.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'image.istarbucks.co.kr',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;

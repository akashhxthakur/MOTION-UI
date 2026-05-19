import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@motionui/tokens'],
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
};

export default nextConfig;

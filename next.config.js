/* eslint-disable unicorn/prefer-module */
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: { domains: ['i.scdn.co', 'mosaic.scdn.co', 'p.scdn.co'], unoptimized: true },
  reactStrictMode: false,
};

module.exports = nextConfig;

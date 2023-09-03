/* eslint-disable unicorn/prefer-module */
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: { domains: ['i.scdn.co', 'mosaic.scdn.co', 'p.scdn.co'] },
};

module.exports = nextConfig;

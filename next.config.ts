import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  experimental: {
    turbo: {
      rules: {
        '*.scss': {
          loaders: ['sass-loader'],
          as: '*.css',
        },
      },
    },
  },
  async redirects() {
    return [
      {
        source: '/mockServiceWorker.js',
        destination: '/',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;

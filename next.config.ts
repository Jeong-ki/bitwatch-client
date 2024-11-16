import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  poweredByHeader: false,
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

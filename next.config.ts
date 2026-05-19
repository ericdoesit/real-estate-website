import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
  async redirects() {
    return [
      { source: '/sold', destination: '/properties', permanent: true },
      { source: '/sold/:path*', destination: '/properties/:path*', permanent: true },
      { source: '/neighborhoods', destination: '/local-guide', permanent: true },
      { source: '/neighborhoods/:path*', destination: '/local-guide/:path*', permanent: true },
      { source: '/services', destination: '/buying', permanent: true },
    ]
  },
};

export default nextConfig;

import million from 'million/compiler';

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    ppr: true,
    reactCompiler: true,
  },
  async redirects() {
    return [
      {
        source: '/music-playlist/:id',
        destination: '/playlists/:id',
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'shared.akamai.steamstatic.com',
        pathname: '/store_item_assets/steam/apps/**',
      },
      {
        protocol: 'https',
        hostname: 'steamcdn-a.akamaihd.net',
        pathname: '/steamcommunity/public/images/apps/**',
      },
      {
        protocol: 'https',
        hostname: 'media.steampowered.com',
        pathname: '/steamcommunity/public/images/apps/**',
      },
      {
        protocol: 'https',
        hostname: 'minio-api.dev.mattglei.ch',
        pathname: '/mapbox-maps/**',
      },
      {
        protocol: 'https',
        hostname: 'is1-ssl.mzstatic.com',
        pathname: '/image/**',
      },
    ],
  },
};

export default million.next(nextConfig);

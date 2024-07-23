import million from 'million/compiler';

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    ppr: true,
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
    ],
  },
  redirects: async () => [
    {
      source: '/insta',
      destination: 'https://www.instagram.com/mattglei.ch/',
      permanent: true,
    },
    {
      source: '/github',
      destination: 'https://github.com/gleich',
      permanent: true,
    },
    {
      source: '/linkedin',
      destination: 'https://www.linkedin.com/in/matt-gleich/',
      permanent: true,
    },
    {
      source: '/strava',
      destination: 'https://www.strava.com/athletes/mattgleich',
      permanent: true,
    },
  ],
};

export default million.next(nextConfig);

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'shared.akamai.steamstatic.com',
        port: '',
        pathname: '/store_item_assets/steam/apps/**',
      },
      {
        protocol: 'https',
        hostname: 'api.mapbox.com',
        port: '',
        pathname: '/styles/v1/mapbox/streets-v12/static/**',
      },
    ],
  },
};

export default nextConfig;

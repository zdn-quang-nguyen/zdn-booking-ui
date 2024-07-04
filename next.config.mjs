/** @type {import('next').NextConfig} */


const nextConfig = {
  env: {
    API_URL: process.env.NEXT_PUBLIC_API_HOST,
  },
  experimental: {
    typedRoutes: true,
  },
  images: {
    domains: ['picsum.photos', 'storage.googleapis.com/'],
    remotePatterns: [
      {
        protocol: process.env.REMOTE_PROTOCOL,
        hostname: process.env.REMOTE_HOSTNAME,
      },
      {
        hostname: process.env.REMOTE_PHOTO_MOCK_DATA,
      },
    ],
  },
};

export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Change this to your repo name after creating it
  basePath: process.env.NODE_ENV === 'production' ? '/calendar-app' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/calendar-app' : '',
};

export default nextConfig;

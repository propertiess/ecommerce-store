/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    API_URL: process.env.API_URL
  },
  images: {
    domains: ['fakestoreapi.com', 'framen.ru', 'm.media-amazon.com']
  }
};

module.exports = nextConfig;

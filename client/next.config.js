/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    API_URL: process.env.API_URL,
    SECOND_API_URL: process.env.SECOND_API_URL
  },
  images: {
    domains: [
      'fakestoreapi.com',
      'framen.ru',
      'm.media-amazon.com',
      'autoreview.ru',
      'www.bmw.ru',
      'im.kommersant.ru',
      'kolesa-uploads.ru',
      'upload.wikimedia.org',
      'avatars.mds.yandex.net',
      'www.mitsubishi-motors.ru',
      'optbk.ru',
      'www.pngplay.com'
    ]
  }
};

module.exports = nextConfig;

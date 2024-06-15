const withNextIntl = require('next-intl/plugin')();
const withVideos = require('next-videos');
const withPlugins = require('next-compose-plugins');

module.exports = withPlugins([
  withNextIntl,
  withVideos,
], {
  // Other Next.js configuration ...
  images: {
    domains: ['lh3.googleusercontent.com', 'cdn.discordapp.com'],
  },
  eslint: {
    ignoreDuringBuilds: true
  },
});

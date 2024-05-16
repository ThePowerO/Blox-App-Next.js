const withNextIntl = require('next-intl/plugin')();

module.exports = withNextIntl({
  // Other Next.js configuration ...
  images: {
    domains: ['lh3.googleusercontent.com', 'cdn.discordapp.com'],
  },
  eslint: {
    ignoreDuringBuilds: true
  },
});

/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    domains: ['static.azara-ai.com'],
    formats: ['image/avif', 'image/webp'],
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/dashboard',
        permanent: false,
      },
    ]
  },
}

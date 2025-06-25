/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/proxy/:path*',
        destination: 'https://next-docs-api.onrender.com/:path*',
      },
    ]
  },
}

module.exports = nextConfig

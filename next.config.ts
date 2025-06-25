/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    console.log("⚡ rewrites active")
    return [
      {
        source: '/api/proxy/:path*',
        destination: 'https://next-docs-api.onrender.com/:path*',
      },
    ]
  },
}

module.exports = nextConfig

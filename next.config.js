/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Optimize for Vercel deployment
  poweredByHeader: false,
  // Enable compression
  compress: true,
  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    domains: [],
  },
  // Environment variables that are safe to expose to the browser
  env: {
    NEXT_PUBLIC_APP_NAME: 'Jeff\'s Bucket List',
  },
}

module.exports = nextConfig

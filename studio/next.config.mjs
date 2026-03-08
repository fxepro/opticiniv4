import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true, // Temporarily ignore TypeScript errors
  },
  webpack: (config, { isServer }) => {
    // Increase memory limit for webpack
    config.optimization = {
      ...config.optimization,
      moduleIds: 'deterministic',
    };
    return config;
  },
  images: {
    unoptimized: true, // Required for Netlify deployment
  },
  // Set turbopack root to avoid workspace inference warnings
  turbopack: {
    root: __dirname,
  },
  async rewrites() {
    // Proxy /api/* to Django backend.
    // Development: always proxy to localhost:8000.
    // Production: no rewrites by default (nginx proxies); set BACKEND_URL for local "next start" (e.g. BACKEND_URL=http://localhost:8000).
    const backend =
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:8000'
        : process.env.BACKEND_URL;
    if (!backend) {
      return [];
    }
    return [
      {
        source: '/api/sitemap',
        destination: `${backend}/api/sitemap/`,
      },
      {
        source: '/api/:path*',
        destination: `${backend}/api/:path*`,
      },
      // Note: Django admin should be accessed directly at backend/django-admin/
      // to avoid redirect loops. Next.js rewrites don't handle Django's APPEND_SLASH redirects well.
    ];
  },
}

export default nextConfig

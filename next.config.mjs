/** @type {import('next').NextConfig} */
const nextConfig = {
  // better-sqlite3 is a native module — Next must require() it rather than bundle it
  serverExternalPackages: ["better-sqlite3"],
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/cafes",
        permanent: true,
      },
      {
        source: "/auth",
        destination: "/auth/login",
        permanent: true,
      },
      {
        source: "/login",
        destination: "/auth/login",
        permanent: true,
      },
      {
        source: "/signup",
        destination: "/auth/signup",
        permanent: true,
      },
      {
        source: "/admin",
        destination: "/admin/dashboard",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn0.iconfinder.com",
        pathname: "/data/icons/**",
      },
      {
        protocol: "https",
        hostname: "cdn4.iconfinder.com",
        pathname: "/data/icons/**",
      },
      {
        protocol: "https",
        hostname: "live.staticflickr.com",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "the-edit.co.kr",
        pathname: "/wp-content/**",
      },
    ],
  },
};

module.exports = nextConfig;

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
      {
        source: "/cafes/:cafe_id",
        destination: "/cafes/:cafe_id/info",
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
        hostname: "cago-storage.s3.ap-northeast-2.amazonaws.com",
        pathname: "/user-content/**",
      },
    ],
  },
};

module.exports = nextConfig;

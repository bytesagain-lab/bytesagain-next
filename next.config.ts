import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // sitemap变体全部指向正确路径
      { source: '/sitemap_index.xml', destination: '/sitemap-index.xml', permanent: true },
      { source: '/wp-sitemap.xml', destination: '/sitemap.xml', permanent: true },
      // 旧WP路径兜底
      { source: '/wp-login.php', destination: '/login', permanent: true },
      { source: '/wp-admin', destination: '/login', permanent: true },
      { source: '/wp-admin/:path*', destination: '/login', permanent: true },
    ]
  },
};

export default nextConfig;

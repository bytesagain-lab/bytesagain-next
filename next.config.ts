import type { NextConfig } from "next";

const EASYWP = 'https://ingress-earth.easywp.com';

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      // 登录/注册/WP管理 全部转发到EasyWP
      { source: '/login', destination: `${EASYWP}/login` },
      { source: '/login/:path*', destination: `${EASYWP}/login/:path*` },
      { source: '/register', destination: `${EASYWP}/register` },
      { source: '/register/:path*', destination: `${EASYWP}/register/:path*` },
      { source: '/wp-login.php', destination: `${EASYWP}/wp-login.php` },
      { source: '/wp-login.php/:path*', destination: `${EASYWP}/wp-login.php/:path*` },
      { source: '/wp-admin', destination: `${EASYWP}/wp-admin` },
      { source: '/wp-admin/:path*', destination: `${EASYWP}/wp-admin/:path*` },
      { source: '/wp-json/:path*', destination: `${EASYWP}/wp-json/:path*` },
    ]
  },
};

export default nextConfig;

import type { NextConfig } from "next";

const EASYWP = 'https://ingress-earth.easywp.com';

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      { source: '/login/', destination: `${EASYWP}/login/` },
      { source: '/login', destination: `${EASYWP}/login/` },
      { source: '/register/', destination: `${EASYWP}/register/` },
      { source: '/register', destination: `${EASYWP}/register/` },
      { source: '/wp-login.php', destination: `${EASYWP}/wp-login.php` },
      { source: '/wp-admin/', destination: `${EASYWP}/wp-admin/` },
      { source: '/wp-admin/:path*', destination: `${EASYWP}/wp-admin/:path*` },
      { source: '/wp-json/:path*', destination: `${EASYWP}/wp-json/:path*` },
    ]
  },
};

export default nextConfig;

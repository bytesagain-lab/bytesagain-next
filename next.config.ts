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

      // ── 老 EasyWP 页面 → Next.js 对应页面 ──────────────────────
      // GA4 有流量的页面
      { source: '/vision', destination: '/skill/vision', permanent: true },
      { source: '/vision/', destination: '/skill/vision', permanent: true },
      { source: '/fitness-plan', destination: '/use-case/health-wellness', permanent: true },
      { source: '/fitness-plan/', destination: '/use-case/health-wellness', permanent: true },
      { source: '/fitness-plan/:path*', destination: '/use-case/health-wellness', permanent: true },
      { source: '/cam', destination: '/skills', permanent: true },
      { source: '/cam/', destination: '/skills', permanent: true },

      // design-tool → wireframe skill（GSC排名19，penpot ai wireframe generator）
      { source: '/design-tool', destination: '/skill/wireframe', permanent: true },
      { source: '/design-tool/', destination: '/skill/wireframe', permanent: true },

      // 老 skill 页面（WP slug → Next.js /skill/slug）
      { source: '/excel-formula', destination: '/skill/excel-formula', permanent: true },
      { source: '/excel-formula/', destination: '/skill/excel-formula', permanent: true },
      { source: '/clawhub-crypto-trading-bot', destination: '/skill/clawhub-crypto-trading-bot', permanent: true },
      { source: '/clawhub-crypto-trading-bot/', destination: '/skill/clawhub-crypto-trading-bot', permanent: true },
      { source: '/data-analysis', destination: '/skill/data-analysis', permanent: true },
      { source: '/data-analysis/', destination: '/skill/data-analysis', permanent: true },
      { source: '/chart-generator', destination: '/skill/chart-generator', permanent: true },
      { source: '/chart-generator/', destination: '/skill/chart-generator', permanent: true },
      { source: '/task-planner', destination: '/skill/task-planner', permanent: true },
      { source: '/task-planner/', destination: '/skill/task-planner', permanent: true },
      { source: '/story-writer', destination: '/skill/story-writer', permanent: true },
      { source: '/story-writer/', destination: '/skill/story-writer', permanent: true },
      { source: '/translator-pro', destination: '/skill/translator-pro', permanent: true },
      { source: '/translator-pro/', destination: '/skill/translator-pro', permanent: true },
      { source: '/note-taker', destination: '/skill/note-taker', permanent: true },
      { source: '/note-taker/', destination: '/skill/note-taker', permanent: true },
      { source: '/shell', destination: '/skill/shell', permanent: true },
      { source: '/shell/', destination: '/skill/shell', permanent: true },
      { source: '/scheduler', destination: '/skill/scheduler', permanent: true },
      { source: '/scheduler/', destination: '/skill/scheduler', permanent: true },
      { source: '/code-generator', destination: '/skill/code-generator', permanent: true },
      { source: '/code-generator/', destination: '/skill/code-generator', permanent: true },

      // 老文章页面 → /articles
      { source: '/blog', destination: '/articles', permanent: true },
      { source: '/blog/', destination: '/articles', permanent: true },
      { source: '/blog/:path*', destination: '/articles', permanent: true },
      { source: '/category/:path*', destination: '/skills', permanent: true },
      { source: '/tag/:path*', destination: '/skills', permanent: true },

      // ── EasyWP "skill-{slug}" 格式老 URL → /skill/{slug} ────────
      // 覆盖：/skill-quiz-generator/ /skill-study-plan/ 等所有带 skill- 前缀的老页面
      { source: '/skill-:slug', destination: '/skill/:slug', permanent: true },
      { source: '/skill-:slug/', destination: '/skill/:slug', permanent: true },

      // ai-tools-directory 老页面 → /skills
      { source: '/ai-tools-directory', destination: '/skills', permanent: true },
      { source: '/ai-tools-directory/', destination: '/skills', permanent: true },

      // 兜底：老页面通配（WP permalink 结构 /year/month/...）
      { source: '/:year(\\d{4})/:month(\\d{2})/:path*', destination: '/articles', permanent: true },
    ]
  },
};

export default nextConfig;

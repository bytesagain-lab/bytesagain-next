import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // sitemap variants are served by App Router routes so strict crawlers get direct 200 responses.
      // 旧WP路径兜底
      { source: '/wp-login.php', destination: '/login', permanent: true },
      { source: '/wp-admin', destination: '/login', permanent: true },
      { source: '/wp-admin/:path*', destination: '/login', permanent: true },

      // ── 404 爬虫页面 → 相关页面 301 ─────────────────────────────
      { source: '/traceroute-visual', destination: '/skills', permanent: true },
      { source: '/traceroute-visual/', destination: '/skills', permanent: true },
      { source: '/bmi', destination: '/use-case/health-wellness', permanent: true },
      { source: '/shadow', destination: '/skills', permanent: true },
      { source: '/assert', destination: '/skills', permanent: true },
      { source: '/tidyup', destination: '/skills', permanent: true },
      { source: '/cache', destination: '/skills', permanent: true },
      { source: '/app-store-optimization', destination: '/use-case/app-store-optimization', permanent: false },
      // ── 文章 slug 兼容 ───────────────────────────────────────────
      { source: '/article/lora-fine-tuning-ai-skills-2026', destination: '/articles', permanent: false },

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

      // spec-workflow → spec-coder（GSC排名18，spec-workflow-mcp）
      { source: '/spec-workflow', destination: '/skill/clawhub-spec-coder', permanent: true },
      { source: '/spec-workflow/', destination: '/skill/clawhub-spec-coder', permanent: true },

      // macos-toolkit → 直接对应skill
      { source: '/macos-toolkit', destination: '/skill/macos-toolkit', permanent: true },
      { source: '/macos-toolkit/', destination: '/skill/macos-toolkit', permanent: true },

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

      // OpenClaw 2026.4.22 专题落地页
      { source: '/openclaw-2026-4-22', destination: '/collection/openclaw-update', permanent: false },
      { source: '/openclaw-2026-4-22/', destination: '/collection/openclaw-update', permanent: false },

      // 兜底：老页面通配（WP permalink 结构 /year/month/...）
      { source: '/:year(\\d{4})/:month(\\d{2})/:path*', destination: '/articles', permanent: true },
    ]
  },
};

export default nextConfig;

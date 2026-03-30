export interface UseCase {
  slug: string
  title: string
  description: string
  icon: string
  skills: {
    slug: string
    name: string
    reason: string
  }[]
}

export const USE_CASES: UseCase[] = [
  {
    slug: 'build-saas',
    title: 'Build a SaaS Product',
    description: 'The essential AI skill stack for indie hackers and small teams shipping a SaaS product — from architecture to deployment.',
    icon: '🚀',
    skills: [
      { slug: 'code-generator', name: 'Code Generator', reason: 'Generate boilerplate, API routes, and components instantly' },
      { slug: 'database-design', name: 'Database Design', reason: 'Schema design, migrations, and query optimization' },
      { slug: 'api-generator', name: 'API Generator', reason: 'REST and GraphQL API scaffolding in seconds' },
      { slug: 'debugger', name: 'Debugger', reason: 'Trace errors and fix issues across your stack' },
      { slug: 'geo-seo', name: 'GEO SEO', reason: 'Get your SaaS discovered by AI search engines from day one' },
    ],
  },
  {
    slug: 'content-creator',
    title: 'Content Creator Toolkit',
    description: 'AI skills for YouTubers, bloggers, and social media creators who want to produce more content with less effort.',
    icon: '🎬',
    skills: [
      { slug: 'story-writer', name: 'Story Writer', reason: 'Craft engaging narratives and scripts for any format' },
      { slug: 'translator-pro', name: 'Translator Pro', reason: 'Reach global audiences with accurate translations' },
      { slug: 'shell', name: 'Shell Toolkit', reason: 'Automate file renaming, batch processing, and uploads' },
      { slug: 'task-planner', name: 'Task Planner', reason: 'Plan your content calendar and publishing schedule' },
    ],
  },
  {
    slug: 'developer-workflow',
    title: 'Developer Daily Workflow',
    description: 'The skills that make your dev environment smarter — from writing code to shipping and monitoring.',
    icon: '⚡',
    skills: [
      { slug: 'shell', name: 'Shell Toolkit', reason: 'Master CLI operations and automate repetitive tasks' },
      { slug: 'debugger', name: 'Debugger', reason: 'Root cause analysis for any error or stack trace' },
      { slug: 'database-design', name: 'Database Design', reason: 'Design schemas and write optimized queries' },
      { slug: 'api-generator', name: 'API Generator', reason: 'Generate API specs and client code instantly' },
      { slug: 'code-generator', name: 'Code Generator', reason: 'Stop writing boilerplate, start writing logic' },
    ],
  },
  {
    slug: 'seo-geo',
    title: 'SEO & GEO Optimization',
    description: 'Optimize your website for both traditional search engines and the new generation of AI-powered search.',
    icon: '🔍',
    skills: [
      { slug: 'geo-seo', name: 'GEO SEO', reason: 'Complete guide to getting cited by ChatGPT, Perplexity, and Gemini' },
      { slug: 'legal-advisor', name: 'Legal Advisor', reason: 'Draft compliant privacy policies and terms of service' },
      { slug: 'task-planner', name: 'Task Planner', reason: 'Plan your content and link-building roadmap' },
    ],
  },
  {
    slug: 'crypto-research',
    title: 'Crypto & DeFi Research',
    description: 'Research protocols, track markets, and analyze on-chain data with AI-powered crypto skills.',
    icon: '🪙',
    skills: [
      { slug: 'black-scholes', name: 'Black-Scholes', reason: 'Options pricing and volatility analysis for crypto derivatives' },
      { slug: 'monte-carlo', name: 'Monte Carlo', reason: 'Simulate portfolio outcomes and risk scenarios' },
      { slug: 'npv', name: 'NPV Calculator', reason: 'Evaluate DeFi protocol economics and token models' },
      { slug: 'utxo', name: 'UTXO Tracker', reason: 'Understand Bitcoin and UTXO-based chain mechanics' },
    ],
  },
  {
    slug: 'job-hunting',
    title: 'Job Hunting & Career',
    description: 'Land your next role faster with AI skills that help you craft applications, prep for interviews, and negotiate offers.',
    icon: '💼',
    skills: [
      { slug: 'task-planner', name: 'Task Planner', reason: 'Organize your job search pipeline and follow-ups' },
      { slug: 'story-writer', name: 'Story Writer', reason: 'Write compelling cover letters and personal statements' },
      { slug: 'legal-advisor', name: 'Legal Advisor', reason: 'Understand employment contracts and negotiate terms' },
      { slug: 'translator-pro', name: 'Translator Pro', reason: 'Apply to international roles with localized materials' },
    ],
  },
  {
    slug: 'learn-programming',
    title: 'Learn Programming',
    description: 'Accelerate your coding journey with AI skills that explain concepts, debug your code, and guide your learning path.',
    icon: '📚',
    skills: [
      { slug: 'code-generator', name: 'Code Generator', reason: 'See working examples for any concept you\'re learning' },
      { slug: 'debugger', name: 'Debugger', reason: 'Understand why your code breaks and how to fix it' },
      { slug: 'shell', name: 'Shell Toolkit', reason: 'Get comfortable with the terminal from day one' },
      { slug: 'database-design', name: 'Database Design', reason: 'Learn SQL and data modeling with real examples' },
    ],
  },
  {
    slug: 'data-analysis',
    title: 'Data Analysis',
    description: 'Extract insights from data using AI skills for visualization, statistics, and pipeline automation.',
    icon: '📊',
    skills: [
      { slug: 'bytesagain-chart-generator', name: 'Chart Generator', reason: 'Create bar, line, and pie charts directly from CSV data' },
      { slug: 'excel-formula', name: 'Excel Formula', reason: 'Write complex formulas and automate spreadsheet tasks' },
      { slug: 'monte-carlo', name: 'Monte Carlo', reason: 'Statistical simulation for forecasting and risk analysis' },
      { slug: 'database-design', name: 'Database Design', reason: 'Query and transform datasets with optimized SQL' },
    ],
  },
  {
    slug: 'marketing-automation',
    title: 'Marketing Automation',
    description: 'Scale your marketing efforts with AI skills for content, email, analytics, and campaign management.',
    icon: '📣',
    skills: [
      { slug: 'story-writer', name: 'Story Writer', reason: 'Generate ad copy, email sequences, and blog posts' },
      { slug: 'task-planner', name: 'Task Planner', reason: 'Manage campaigns, deadlines, and team tasks' },
      { slug: 'geo-seo', name: 'GEO SEO', reason: 'Get your brand mentioned in AI-generated answers' },
      { slug: 'translator-pro', name: 'Translator Pro', reason: 'Localize campaigns for international markets' },
    ],
  },
  {
    slug: 'ecommerce',
    title: 'E-commerce Store',
    description: 'Run a smarter online store with AI skills for product descriptions, pricing, customer support, and analytics.',
    icon: '🛍️',
    skills: [
      { slug: 'story-writer', name: 'Story Writer', reason: 'Write compelling product descriptions that convert' },
      { slug: 'excel-formula', name: 'Excel Formula', reason: 'Manage inventory, pricing, and sales tracking' },
      { slug: 'translator-pro', name: 'Translator Pro', reason: 'Sell globally with localized product listings' },
      { slug: 'task-planner', name: 'Task Planner', reason: 'Coordinate suppliers, launches, and promotions' },
    ],
  },
]

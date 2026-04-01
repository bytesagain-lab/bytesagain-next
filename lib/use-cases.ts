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
  searchLink?: string
}

export const USE_CASES: UseCase[] = [
  // ── WORK ──────────────────────────────────────────────
  {
    slug: 'weekly-report',
    title: 'Write Weekly Reports',
    description: 'Generate professional weekly, daily, and monthly reports automatically — save 2+ hours every week.',
    icon: '📝',
    skills: [
      { slug: 'report-generator', name: 'Report Generator', reason: 'Auto-generate structured weekly/monthly reports' },
      { slug: 'note-taker', name: 'Note Taker', reason: 'Capture daily work logs to feed into reports' },
      { slug: 'excel-formula', name: 'Excel Formula', reason: 'Build data tables and charts for your reports' },
      { slug: 'story-writer', name: 'Story Writer', reason: 'Polish report language for executive audiences' },
      { slug: 'task-planner', name: 'Task Planner', reason: 'Track completed tasks to include in your summary' },
      { slug: 'scheduler', name: 'Scheduler', reason: 'Set automated reminders for report deadlines' },
    ],
    searchLink: '/skills?q=report+generator+weekly',
  },
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
    slug: 'remote-work',
    title: 'Remote Work Productivity',
    description: 'Stay focused and organized working from anywhere — AI tools for async communication, task tracking, and deep work.',
    icon: '🏠',
    skills: [
      { slug: 'task-planner', name: 'Task Planner', reason: 'Manage tasks and priorities across time zones' },
      { slug: 'note-taker', name: 'Note Taker', reason: 'Capture meeting notes and action items automatically' },
      { slug: 'scheduler', name: 'Scheduler', reason: 'Block deep work sessions and manage your calendar' },
      { slug: 'story-writer', name: 'Story Writer', reason: 'Write clear async updates and documentation' },
    ],
  },
  {
    slug: 'startup-founder',
    title: 'Startup Founder Toolkit',
    description: 'From idea to funding — AI skills to help founders move fast, pitch confidently, and build lean.',
    icon: '🦄',
    skills: [
      { slug: 'business-plan', name: 'Business Plan', reason: 'Structure your pitch deck and business model' },
      { slug: 'legal-advisor', name: 'Legal Advisor', reason: 'Draft founder agreements, NDAs, and term sheets' },
      { slug: 'data-analysis', name: 'Data Analysis', reason: 'Build metrics dashboards and investor reports' },
      { slug: 'geo-seo', name: 'GEO SEO', reason: 'Get found by early adopters through AI search' },
      { slug: 'task-planner', name: 'Task Planner', reason: 'Manage your roadmap and team priorities' },
    ],
  },
  {
    slug: 'project-manager',
    title: 'Project Management',
    description: 'Deliver projects on time with AI skills for planning, tracking, reporting, and stakeholder communication.',
    icon: '📋',
    skills: [
      { slug: 'task-planner', name: 'Task Planner', reason: 'Break down projects into trackable milestones' },
      { slug: 'scheduler', name: 'Scheduler', reason: 'Build timelines and spot scheduling conflicts early' },
      { slug: 'note-taker', name: 'Note Taker', reason: 'Capture meeting decisions and distribute action items' },
      { slug: 'excel-formula', name: 'Excel Formula', reason: 'Build project trackers and budget spreadsheets' },
    ],
  },
  {
    slug: 'hr-recruiting',
    title: 'HR & Recruiting',
    description: 'Hire better and faster — AI skills for writing job posts, screening candidates, and onboarding new hires.',
    icon: '🧑‍💼',
    skills: [
      { slug: 'hr-toolkit', name: 'HR Toolkit', reason: 'Draft JDs, offer letters, and onboarding plans' },
      { slug: 'interview-analysis', name: 'Interview Analysis', reason: 'Evaluate candidates with structured frameworks' },
      { slug: 'legal-advisor', name: 'Legal Advisor', reason: 'Stay compliant with labor laws and contracts' },
      { slug: 'task-planner', name: 'Task Planner', reason: 'Track pipeline stages and hiring deadlines' },
    ],
  },

  // ── CREATE ─────────────────────────────────────────────
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
    slug: 'video-creator',
    title: 'Video Creator & YouTuber',
    description: 'From script to upload — AI skills to speed up video production, optimize titles, and grow your channel.',
    icon: '📹',
    skills: [
      { slug: 'short-drama-writer', name: 'Script Writer', reason: 'Write engaging video scripts with hooks and pacing' },
      { slug: 'bilibili-helper', name: 'Video Optimizer', reason: 'Optimize titles, tags, and thumbnails for discovery' },
      { slug: 'story-writer', name: 'Story Writer', reason: 'Build narrative arcs for longer-form content' },
      { slug: 'task-planner', name: 'Task Planner', reason: 'Manage your filming and editing schedule' },
    ],
  },
  {
    slug: 'writer-author',
    title: 'Writer & Author',
    description: 'Write faster and better — AI skills for novelists, bloggers, journalists, and copywriters.',
    icon: '✍️',
    skills: [
      { slug: 'story-writer', name: 'Story Writer', reason: 'Develop characters, plot, and world-building' },
      { slug: 'note-taker', name: 'Note Taker', reason: 'Capture research and organize ideas with Zettelkasten' },
      { slug: 'translator-pro', name: 'Translator Pro', reason: 'Translate your work into multiple languages' },
      { slug: 'task-planner', name: 'Task Planner', reason: 'Hit writing goals with daily word count tracking' },
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
    slug: 'podcast-creator',
    title: 'Podcast Producer',
    description: 'Plan, record, and grow your podcast — AI skills for show notes, guest research, and audience building.',
    icon: '🎙️',
    skills: [
      { slug: 'note-taker', name: 'Note Taker', reason: 'Organize research notes for each episode' },
      { slug: 'story-writer', name: 'Story Writer', reason: 'Write show notes, episode summaries, and descriptions' },
      { slug: 'task-planner', name: 'Task Planner', reason: 'Manage guest outreach and release schedule' },
      { slug: 'translator-pro', name: 'Translator Pro', reason: 'Reach global listeners with translated transcripts' },
    ],
  },

  // ── LEARN ──────────────────────────────────────────────
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
    slug: 'language-learner',
    title: 'Language Learning',
    description: 'Pick up a new language faster with AI skills for translation, writing practice, and vocabulary building.',
    icon: '🌍',
    skills: [
      { slug: 'translator-pro', name: 'Translator Pro', reason: 'Instant translation with context and nuance explanations' },
      { slug: 'story-writer', name: 'Story Writer', reason: 'Practice writing in your target language with feedback' },
      { slug: 'note-taker', name: 'Note Taker', reason: 'Build your vocabulary notebook and review system' },
      { slug: 'task-planner', name: 'Task Planner', reason: 'Schedule daily practice sessions and track streaks' },
    ],
  },
  {
    slug: 'student',
    title: 'Student & Academic',
    description: 'Study smarter, write better papers, and manage deadlines with AI skills built for academic life.',
    icon: '🎓',
    skills: [
      { slug: 'note-taker', name: 'Note Taker', reason: 'Cornell notes, Zettelkasten, and lecture summaries' },
      { slug: 'math-solver', name: 'Math Solver', reason: 'Step-by-step solutions for calculus, stats, and more' },
      { slug: 'story-writer', name: 'Essay Writer', reason: 'Structure arguments and polish academic writing' },
      { slug: 'task-planner', name: 'Task Planner', reason: 'Manage deadlines, exams, and group projects' },
    ],
  },
  {
    slug: 'researcher',
    title: 'Researcher & Analyst',
    description: 'Synthesize information, build reports, and present findings with AI-powered research skills.',
    icon: '🔬',
    skills: [
      { slug: 'note-taker', name: 'Note Taker', reason: 'Organize literature reviews with Zettelkasten method' },
      { slug: 'data-analysis', name: 'Data Analysis', reason: 'Run statistical analysis and visualize findings' },
      { slug: 'story-writer', name: 'Report Writer', reason: 'Structure and write clear research reports' },
      { slug: 'mindmap', name: 'Mind Map', reason: 'Visualize complex relationships and frameworks' },
    ],
  },

  // ── INVEST ─────────────────────────────────────────────
  {
    slug: 'crypto-research',
    title: 'Crypto & DeFi Research',
    description: 'Research protocols, track markets, and analyze on-chain data with AI-powered crypto skills.',
    icon: '🪙',
    skills: [
      { slug: 'us-stock-analysis', name: 'Market Analysis', reason: 'Technical and fundamental analysis for crypto assets' },
      { slug: 'investment-portfolio', name: 'Portfolio Tracker', reason: 'Track your crypto holdings and P&L in real time' },
      { slug: 'data-analysis', name: 'Data Analysis', reason: 'Analyze on-chain metrics and market trends' },
      { slug: 'note-taker', name: 'Research Notes', reason: 'Build your investment thesis and track due diligence' },
    ],
  },
  {
    slug: 'stock-investor',
    title: 'Stock Market Investor',
    description: 'Research equities, analyze financials, and manage your portfolio with AI skills for serious investors.',
    icon: '📈',
    skills: [
      { slug: 'us-stock-analysis', name: 'US Stock Analysis', reason: 'Fundamental and technical analysis for any ticker' },
      { slug: 'fundamental-stock-analysis', name: 'Fundamental Analysis', reason: 'DCF, ratios, and quality scoring' },
      { slug: 'investment-portfolio', name: 'Portfolio Tracker', reason: 'Monitor allocation, returns, and risk exposure' },
      { slug: 'data-analysis', name: 'Data Analysis', reason: 'Build screeners and compare financial metrics' },
    ],
  },
  {
    slug: 'data-analysis',
    title: 'Data Analysis',
    description: 'Extract insights from data using AI skills for visualization, statistics, and pipeline automation.',
    icon: '📊',
    skills: [
      { slug: 'data-analysis', name: 'Data Analysis', reason: 'Query databases, generate reports, turn data into insights' },
      { slug: 'excel-formula', name: 'Excel Formula', reason: 'Write complex formulas and automate spreadsheet tasks' },
      { slug: 'data-visualizer', name: 'Data Visualizer', reason: 'Create charts and dashboards from CSV or JSON' },
      { slug: 'database-design', name: 'Database Design', reason: 'Query and transform datasets with optimized SQL' },
    ],
  },
  {
    slug: 'personal-finance',
    title: 'Personal Finance',
    description: 'Take control of your money — AI skills for budgeting, investment tracking, and financial planning.',
    icon: '💰',
    skills: [
      { slug: 'investment-portfolio', name: 'Portfolio Tracker', reason: 'Track all your investments in one place' },
      { slug: 'excel-formula', name: 'Excel Formula', reason: 'Build budget spreadsheets and expense trackers' },
      { slug: 'legal-advisor', name: 'Legal Advisor', reason: 'Understand financial contracts and tax obligations' },
      { slug: 'task-planner', name: 'Goal Planner', reason: 'Set savings goals and track your financial milestones' },
    ],
  },

  // ── LIFE ───────────────────────────────────────────────
  {
    slug: 'ecommerce',
    title: 'E-commerce Store',
    description: 'Run a smarter online store with AI skills for product descriptions, pricing, customer support, and analytics.',
    icon: '🛍️',
    skills: [
      { slug: 'story-writer', name: 'Story Writer', reason: 'Write compelling product descriptions that convert' },
      { slug: 'shopify-helper', name: 'Shopify Helper', reason: 'Set up and optimize your Shopify storefront' },
      { slug: 'translator-pro', name: 'Translator Pro', reason: 'Sell globally with localized product listings' },
      { slug: 'inventory-manager', name: 'Inventory Manager', reason: 'Track stock levels, SKUs, and reorder points' },
    ],
  },
  {
    slug: 'travel-planner',
    title: 'Travel Planning',
    description: 'Plan unforgettable trips with AI skills for itineraries, budgeting, language help, and local research.',
    icon: '✈️',
    skills: [
      { slug: 'task-planner', name: 'Trip Planner', reason: 'Build day-by-day itineraries with time estimates' },
      { slug: 'translator-pro', name: 'Translator Pro', reason: 'Communicate in any language on the road' },
      { slug: 'note-taker', name: 'Travel Notes', reason: 'Keep a travel journal and log recommendations' },
      { slug: 'excel-formula', name: 'Budget Tracker', reason: 'Track expenses and split costs with travel companions' },
    ],
  },
  {
    slug: 'health-fitness',
    title: 'Health & Fitness',
    description: 'Build sustainable healthy habits — AI skills for workout planning, nutrition tracking, and wellness goals.',
    icon: '💪',
    skills: [
      { slug: 'task-planner', name: 'Habit Tracker', reason: 'Build and track daily fitness routines' },
      { slug: 'scheduler', name: 'Workout Scheduler', reason: 'Plan training blocks and recovery days' },
      { slug: 'note-taker', name: 'Wellness Journal', reason: 'Log workouts, sleep, and nutrition for pattern spotting' },
      { slug: 'math-solver', name: 'Calorie Calculator', reason: 'Calculate macros, TDEE, and nutrition targets' },
    ],
  },
  {
    slug: 'home-cooking',
    title: 'Home Cooking & Recipes',
    description: 'Cook better meals at home — AI skills for recipe discovery, meal planning, and kitchen organization.',
    icon: '🍳',
    skills: [
      { slug: 'task-planner', name: 'Meal Planner', reason: 'Plan weekly menus and generate shopping lists' },
      { slug: 'note-taker', name: 'Recipe Notes', reason: 'Save and organize your favorite recipes' },
      { slug: 'translator-pro', name: 'Translator Pro', reason: 'Cook from foreign-language cookbooks with ease' },
      { slug: 'excel-formula', name: 'Grocery Budget', reason: 'Track grocery spending and reduce food waste' },
    ],
  },
  {
    slug: 'smart-home',
    title: 'Smart Home & Automation',
    description: 'Automate your home life with AI skills for device control, routines, and energy management.',
    icon: '🏡',
    skills: [
      { slug: 'shell', name: 'Shell Toolkit', reason: 'Write automation scripts for home systems' },
      { slug: 'scheduler', name: 'Scheduler', reason: 'Set up time-based routines and triggers' },
      { slug: 'task-planner', name: 'Home Planner', reason: 'Manage maintenance tasks and home improvement projects' },
      { slug: 'note-taker', name: 'Home Notes', reason: 'Keep appliance manuals, warranty info, and repair logs' },
    ],
  },
  {
    slug: 'legal-documents',
    title: 'Legal Documents & Compliance',
    description: 'Understand and create legal documents without a lawyer — contracts, policies, and compliance checklists.',
    icon: '⚖️',
    skills: [
      { slug: 'legal-advisor', name: 'Legal Advisor', reason: 'Draft and review contracts, NDAs, and agreements' },
      { slug: 'story-writer', name: 'Document Writer', reason: 'Write clear policies and compliance documentation' },
      { slug: 'translator-pro', name: 'Translator Pro', reason: 'Translate legal documents for international use' },
      { slug: 'task-planner', name: 'Compliance Tracker', reason: 'Track regulatory deadlines and audit requirements' },
    ],
  },

  // ── NEW: HackerNews-validated high-demand use cases ──
  {
    slug: 'crm-sales',
    title: 'CRM & Sales Management',
    description: 'Let your AI agent manage leads, track deals, and automate follow-ups — no more manual CRM updates.',
    icon: '💼',
    skills: [
      { slug: 'crm-manager', name: 'CRM Manager', reason: 'Create contacts, update deals, and log notes automatically' },
      { slug: 'email-assistant', name: 'Email Assistant', reason: 'Draft follow-up emails and outreach sequences' },
      { slug: 'task-planner', name: 'Pipeline Tracker', reason: 'Track deals through stages and set follow-up reminders' },
      { slug: 'data-analysis', name: 'Data Analysis', reason: 'Analyze win rates, pipeline velocity, and revenue forecasts' },
      { slug: 'scheduler', name: 'Meeting Scheduler', reason: 'Book demos and sync calendars without back-and-forth' },
      { slug: 'note-taker', name: 'Call Notes', reason: 'Capture meeting notes and extract action items instantly' },
    ],
    searchLink: '/skills?q=crm+sales+leads',
  },
  {
    slug: 'workflow-automation',
    title: 'Workflow Automation',
    description: 'Convert your n8n flows, Zapier zaps, and manual processes into AI agent skills that run automatically.',
    icon: '⚡',
    skills: [
      { slug: 'shell', name: 'Shell Toolkit', reason: 'Automate repetitive tasks with powerful scripts' },
      { slug: 'api-tester', name: 'API Connector', reason: 'Connect any service via REST API without code' },
      { slug: 'scheduler', name: 'Cron Scheduler', reason: 'Trigger workflows on time or on event' },
      { slug: 'task-planner', name: 'Workflow Planner', reason: 'Map out and optimize your automation pipelines' },
      { slug: 'note-taker', name: 'Run Logger', reason: 'Track automation runs and catch failures early' },
      { slug: 'excel-formula', name: 'Data Transformer', reason: 'Clean and transform data between workflow steps' },
    ],
    searchLink: '/skills?q=automation+workflow+n8n',
  },
  {
    slug: 'customer-support',
    title: 'Customer Support Automation',
    description: 'Handle support tickets, auto-reply to common questions, and escalate edge cases — 24/7 without a team.',
    icon: '🎧',
    skills: [
      { slug: 'email-assistant', name: 'Email Responder', reason: 'Auto-reply to common support requests with accurate answers' },
      { slug: 'story-writer', name: 'FAQ Writer', reason: 'Build a knowledge base from past tickets' },
      { slug: 'translator-pro', name: 'Translator Pro', reason: 'Support customers in multiple languages automatically' },
      { slug: 'task-planner', name: 'Ticket Tracker', reason: 'Route and prioritize tickets by urgency' },
      { slug: 'note-taker', name: 'Interaction Logger', reason: 'Log every customer interaction for quality review' },
      { slug: 'data-analysis', name: 'Support Analytics', reason: 'Track resolution time, CSAT, and ticket trends' },
    ],
    searchLink: '/skills?q=customer+support+helpdesk',
  },
  {
    slug: 'database-management',
    title: 'Database & Data Management',
    description: 'Query, migrate, and manage databases with AI — SQL generation, schema design, and data pipeline automation.',
    icon: '🗄️',
    skills: [
      { slug: 'sql-assistant', name: 'SQL Assistant', reason: 'Generate complex queries from plain English descriptions' },
      { slug: 'excel-formula', name: 'Data Processor', reason: 'Transform and clean datasets before loading' },
      { slug: 'shell', name: 'DB Scripts', reason: 'Automate backups, migrations, and maintenance tasks' },
      { slug: 'data-analysis', name: 'Data Analysis', reason: 'Visualize query results and spot anomalies' },
      { slug: 'api-tester', name: 'API Tester', reason: 'Test and validate database API endpoints' },
      { slug: 'note-taker', name: 'Schema Docs', reason: 'Auto-generate database documentation from schema' },
    ],
    searchLink: '/skills?q=database+sql+data',
  },
  {
    slug: 'security-audit',
    title: 'Security & Code Audit',
    description: 'Review AI agent skills, code, and configs for security risks — catch vulnerabilities before they become incidents.',
    icon: '🔒',
    skills: [
      { slug: 'code-reviewer', name: 'Code Reviewer', reason: 'Scan code for common security vulnerabilities' },
      { slug: 'shell', name: 'Security Scanner', reason: 'Run automated security checks and penetration tests' },
      { slug: 'api-tester', name: 'API Security Tester', reason: 'Test endpoints for auth issues and data leaks' },
      { slug: 'note-taker', name: 'Audit Logger', reason: 'Document findings and track remediation progress' },
      { slug: 'task-planner', name: 'Risk Tracker', reason: 'Prioritize vulnerabilities by severity and impact' },
      { slug: 'story-writer', name: 'Security Report', reason: 'Generate executive-ready security audit reports' },
    ],
    searchLink: '/skills?q=security+audit+vulnerability',
  },
]

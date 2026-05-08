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
{
    slug: 'weekly-report',
    title: 'Write Weekly Reports',
    description: 'Generate professional weekly, daily, and monthly reports automatically — save 2+ hours every week.',
    icon: '📝',
    skills: [
      { slug: 'story-writer', name: 'story writer', reason: 'Top-rated write skill with 1091 downloads' }, { slug: 'short-drama-writer', name: 'short drama writer', reason: 'Top-rated write skill with 853 downloads' }, { slug: 'jd-writer', name: 'jd writer', reason: 'Top-rated write skill with 455 downloads' }, { slug: 'ad-copywriter', name: 'ad copywriter', reason: 'Top-rated write skill with 435 downloads' }, { slug: 'sop-writer', name: 'sop writer', reason: 'Top-rated write skill with 357 downloads' }
    ],
    searchLink: '/skills?q=report+generator+weekly',
  },
{
    slug: 'build-saas',
    title: 'Build a SaaS Product',
    description: 'The essential AI skill stack for indie hackers and small teams shipping a SaaS product — from architecture to deployment.',
    icon: '🚀',
    skills: [
      { slug: 'startup-tools', name: 'Startup Tools', reason: 'Essential toolkit for launching and running a SaaS startup' }, { slug: 'pitch-deck', name: 'Pitch Deck', reason: 'Create compelling pitch decks to attract investors and early customers' }, { slug: 'cli-builder', name: 'cli builder', reason: 'Top-rated build skill with 412 downloads' }, { slug: 'schema-builder', name: 'schema builder', reason: 'Top-rated build skill with 382 downloads' }, { slug: 'dockerfile-builder', name: 'dockerfile builder', reason: 'Top-rated build skill with 305 downloads' }
    ],
  },
{
    slug: 'vercel-supabase-stack',
    title: 'Vercel + Supabase: The Modern Dev Stack',
    description: 'Ship faster with AI skills that generate Vercel CLI commands and Supabase API calls — no credentials stored, no configuration needed.',
    icon: '🛠️',
    skills: [
      { slug: 'vercel-tool', name: 'Vercel Tool', reason: 'Generate Vercel CLI commands for deployments, domains, env vars, and project management' },
      { slug: 'supabase-tool', name: 'Supabase Tool', reason: 'Generate Supabase API calls for database, auth, storage, and edge functions' },
    ],
    searchLink: '/skills?q=vercel+supabase+deploy+database',
  },
{
    slug: 'data-science-toolkit',
    title: 'Data Science & Analysis Toolkit',
    description: 'Your AI-powered data science environment — Python code snippets, R-style statistical analysis, and Jupyter notebook management in one place.',
    icon: '📊',
    skills: [
      { slug: 'python-cookbook', name: 'Python Cookbook', reason: '14 ready-to-use Python code snippets for data processing and automation' },
      { slug: 'r-analyst', name: 'R Analyst', reason: 'Statistical analysis and data visualization in R style' },
      { slug: 'jupyter-helper', name: 'Jupyter Helper', reason: 'Manage and run Jupyter notebooks from your terminal' },
    ],
    searchLink: '/skills?q=python+data+science+jupyter+R',
  },
{
    slug: 'bi-dashboard-builder',
    title: 'Build BI Dashboards & KPI Charts',
    description: 'Turn business metrics into dashboard plans, SQL queries, chart specs, and Superset-compatible visualization JSON.',
    icon: '📈',
    skills: [
      { slug: 'bytesagain-bi-dashboard-builder', name: 'BytesAgain BI Dashboard Builder', reason: 'Builds dashboard plans, SQL templates, chart specs, and Superset-compatible chart JSON' },
      { slug: 'data-visualizer', name: 'Data Visualizer', reason: 'Creates visual charts from datasets for BI reporting and presentation' },
      { slug: 'data-analysis', name: 'Data Analysis', reason: 'Extracts trends and insights before turning metrics into dashboard views' },
      { slug: 'data-analyst-pro', name: 'Data Analyst', reason: 'Helps analyze business datasets and define useful KPIs' },
    ],
    searchLink: '/skills?q=BI+dashboard+chart+Superset+SQL',
  },
{
    slug: 'product-listing-optimization',
    title: 'Product Listing Optimization for E-commerce',
    description: 'Create marketplace-ready product titles, descriptions, SEO keywords, bullets, and listing pages for Shopify, Amazon, Taobao, Pinduoduo, and Shopee.',
    icon: '🛒',
    skills: [
      { slug: 'shopify-helper', name: 'Shopify Helper', reason: 'Builds Shopify stores and optimizes product pages, collections, titles, descriptions, and store SEO' },
      { slug: 'product-desc', name: 'Product Description', reason: 'Writes SEO product descriptions, feature bullets, benefit copy, and marketplace listing text' },
      { slug: 'ecommerce-listing-optimizer-lite', name: 'Ecommerce Listing Optimizer Lite', reason: 'Generates Amazon listing titles, bullets, and backend keywords from product information' },
      { slug: 'product-title-optimization', name: 'Product Title Optimization', reason: 'Optimizes product titles for search visibility and click-through across ecommerce platforms' },
      { slug: 'product-page-seo', name: 'Product Page SEO', reason: 'Improves ecommerce product pages with on-page SEO, structured data, and content strategy' },
    ],
    searchLink: '/skills?q=ecommerce+product+listing+optimization+Shopify+Amazon+SEO',
  },
{
    slug: 'developer-workflow',
    title: 'Developer Daily Workflow',
    description: 'The skills that make your dev environment smarter — from writing code to shipping and monitoring.',
    icon: '⚡',
    skills: [
      { slug: 'developer', name: 'Developer', reason: 'All-in-one developer assistant for everyday coding tasks' }, { slug: 'code-generator', name: 'Code Generator', reason: 'Generate code in any language from natural language descriptions' }, { slug: 'cli-developer', name: 'CLI Developer', reason: 'Boost productivity with command-line tooling and scripting' }, { slug: 'ai-code-helper', name: 'AI Code Helper', reason: 'Get instant explanations and fixes for your code' }, { slug: 'developer-agent', name: 'developer-agent', reason: 'Top-rated developer skill with 797 downloads' }
    ],
  },
{
    slug: 'job-hunting',
    title: 'Job Hunting & Career',
    description: 'Land your next role faster with AI skills that help you craft applications, prep for interviews, and negotiate offers.',
    icon: '💼',
    skills: [
      { slug: 'interview-analysis', name: 'Interview Analysis', reason: 'Analyze interview questions and prepare winning answers with AI' }, { slug: 'translator-pro', name: 'Translator Pro', reason: 'Translate and localize job applications for international opportunities' }, { slug: 'system-data-intelligence-skill', name: 'It is designed for scenarios that requir', reason: 'Highly-rated productivity skill' }
    ],
  },
{
    slug: 'remote-work',
    title: 'Remote Work Productivity',
    description: 'Stay focused and organized working from anywhere — AI tools for async communication, task tracking, and deep work.',
    icon: '🏠',
    skills: [
      { slug: 'agent-ops-framework', name: 'agent ops framework', reason: 'Top-rated work skill with 402 downloads' }, { slug: 'data-analysis-workflow', name: 'Data Analysis Workflow', reason: 'Top-rated work skill with 209 downloads' }, { slug: 'networkmanager', name: 'networkmanager', reason: 'Top-rated work skill with 100 downloads' }
    ],
  },
{
    slug: 'startup-founder',
    title: 'Startup Founder Toolkit',
    description: 'From idea to funding — AI skills to help founders move fast, pitch confidently, and build lean.',
    icon: '🦄',
    skills: [
      { slug: 'startup-tools', name: 'Startup Tools', reason: 'Comprehensive toolkit for founders at every stage of the startup journey' }, { slug: 'pitch-deck', name: 'Pitch Deck', reason: 'Build investor-ready pitch decks that tell a compelling story' }, { slug: 'apple-developer-toolkit', name: 'apple-developer-toolkit', reason: 'Top-rated toolkit skill with 1127 downloads' }, { slug: 'hr-toolkit', name: 'hr toolkit', reason: 'Top-rated toolkit skill with 636 downloads' }, { slug: 'shopify-toolkit', name: 'shopify toolkit', reason: 'Top-rated toolkit skill with 499 downloads' }
    ],
  },
{
    slug: 'minimalist-entrepreneur',
    title: 'Minimalist Entrepreneur',
    description: 'Build a profitable, sustainable business with less — inspired by Sahil Lavingia\'s framework from The Minimalist Entrepreneur.',
    icon: '🎯',
    skills: [
      { slug: 'system-data-intelligence-skill', name: 'It is designed for scenarios that requir', reason: 'Highly-rated productivity skill' }
    ],
    searchLink: '/skills?q=startup+entrepreneur+lean+business',
  },
{
    slug: 'project-manager',
    title: 'Project Management',
    description: 'Deliver projects on time with AI skills for planning, tracking, reporting, and stakeholder communication.',
    icon: '📋',
    skills: [
      { slug: 'freedcamp-agent-skill', name: 'Freedcamp Project Management', reason: 'Manage tasks, deadlines, and milestones with AI-powered project tools' }, { slug: 'system-data-intelligence-skill', name: 'It is designed for scenarios that requir', reason: 'Highly-rated productivity skill' }
    ],
  },
{
    slug: 'hr-recruiting',
    title: 'HR & Recruiting',
    description: 'Hire better and faster — AI skills for writing job posts, screening candidates, and onboarding new hires.',
    icon: '🧑‍💼',
    skills: [
      { slug: 'system-data-intelligence-skill', name: 'It is designed for scenarios that requir', reason: 'Highly-rated productivity skill' }
    ],
  },
{
    slug: 'content-creator',
    title: 'Content Creator Toolkit',
    description: 'AI skills for YouTubers, bloggers, and social media creators who want to produce more content with less effort.',
    icon: '🎬',
    skills: [
      { slug: 'content-strategy', name: 'Content Strategy', reason: 'Top-rated content skill with 6579 downloads' }, { slug: 'shopify-toolkit', name: 'shopify toolkit', reason: 'Top-rated toolkit skill with 499 downloads' }, { slug: 'agent-toolkit', name: 'agent toolkit', reason: 'Top-rated toolkit skill with 426 downloads' }, { slug: 'homeassistant-toolkit', name: 'Homeassistant Toolkit', reason: 'Top-rated toolkit skill with 371 downloads' }, { slug: 'discord-toolkit', name: 'discord toolkit', reason: 'Top-rated toolkit skill with 340 downloads' }
    ],
  },
{
    slug: 'video-creator',
    title: 'Video Creator & YouTuber',
    description: 'From script to upload — AI skills to speed up video production, optimize titles, and grow your channel.',
    icon: '📹',
    skills: [
      { slug: 'video-fetcher', name: 'Video Fetcher', reason: 'Top-rated video skill with 101 downloads' }, { slug: 'video-toolbox', name: 'Video Toolbox', reason: 'All-in-one toolkit for video editing, cutting, and formatting' }, { slug: 'system-data-intelligence-skill', name: 'It is designed for scenarios that requir', reason: 'Highly-rated productivity skill' }
    ],
  },
{
    slug: 'writer-author',
    title: 'Writer & Author',
    description: 'Write faster and better — AI skills for novelists, bloggers, journalists, and copywriters.',
    icon: '✍️',
    skills: [
      { slug: 'story-writer', name: 'Story Writer', reason: 'Generate compelling narratives and story structures for any genre' }, { slug: 'short-drama-writer', name: 'Short Drama Writer', reason: 'Craft engaging short-form dramatic scripts and stories' }, { slug: 'ad-copywriter', name: 'Ad Copywriter', reason: 'Write persuasive copy for blogs, ads, and marketing materials' }, { slug: 'jd-writer', name: 'jd writer', reason: 'Top-rated writer skill with 455 downloads' }, { slug: 'sop-writer', name: 'sop writer', reason: 'Top-rated writer skill with 357 downloads' }
    ],
  },
{
    slug: 'marketing-automation',
    title: 'Marketing Automation',
    description: 'Scale your marketing efforts with AI skills for content, email, analytics, and campaign management.',
    icon: '📣',
    skills: [
      { slug: 'system-data-intelligence-skill', name: 'It is designed for scenarios that requir', reason: 'Highly-rated productivity skill' }
    ],
  },
{
    slug: 'seo-geo',
    title: 'SEO & GEO Optimization',
    description: 'Optimize your website for both traditional search engines and the new generation of AI-powered search.',
    icon: '🔍',
    skills: [
      { slug: 'system-data-intelligence-skill', name: 'It is designed for scenarios that requir', reason: 'Highly-rated productivity skill' }
    ],
    searchLink: '/skills?q=seo+geo+optimization+ai+search',
  },
{
    slug: 'podcast-creator',
    title: 'Podcast Producer',
    description: 'Plan, record, and grow your podcast — AI skills for show notes, guest research, and audience building.',
    icon: '🎙️',
    skills: [
      { slug: 'podcast-notes', name: 'Podcast Notes', reason: 'Auto-generate structured show notes and key takeaways from episodes' }, { slug: 'system-data-intelligence-skill', name: 'It is designed for scenarios that requir', reason: 'Highly-rated productivity skill' }
    ],
  },
{
    slug: 'learn-programming',
    title: 'Learn Programming',
    description: 'Accelerate your coding journey with AI skills that explain concepts, debug your code, and guide your learning path.',
    icon: '📚',
    skills: [
      { slug: 'code-generator', name: 'Code Generator', reason: 'Generate code in any language from natural language descriptions' }, { slug: 'ai-code-helper', name: 'AI Code Helper', reason: 'Get instant explanations and fixes for your code' }, { slug: 'agent-learner', name: 'agent learner', reason: 'Top-rated learn skill with 337 downloads' }
    ],
  },
{
    slug: 'language-learner',
    title: 'Language Learning',
    description: 'Pick up a new language faster with AI skills for translation, writing practice, and vocabulary building.',
    icon: '🌍',
    skills: [
      { slug: 'subtitle-translator', name: 'Subtitle Translator', reason: 'Learn languages by translating video subtitles in real time' }, { slug: 'system-data-intelligence-skill', name: 'It is designed for scenarios that requir', reason: 'Highly-rated productivity skill' }
    ],
  },
{
    slug: 'student',
    title: 'Student & Academic',
    description: 'Study smarter, write better papers, and manage deadlines with AI skills built for academic life.',
    icon: '🎓',
    skills: [
      { slug: 'study-plan', name: 'Study Plan', reason: 'Create personalized study schedules and learning roadmaps' }, { slug: 'student', name: 'student', reason: 'Top-rated student skill with 270 downloads' }, { slug: 'system-data-intelligence-skill', name: 'It is designed for scenarios that requir', reason: 'Highly-rated productivity skill' }
    ],
  },
{
    slug: 'researcher',
    title: 'Researcher & Analyst',
    description: 'Synthesize information, build reports, and present findings with AI-powered research skills.',
    icon: '🔬',
    skills: [
      { slug: 'data-analyst-pro', name: 'Data Analyst', reason: 'Top-rated analyst skill with 3316 downloads' }, { slug: 'analyst', name: 'Analyst', reason: 'Top-rated analyst skill with 2041 downloads' }, { slug: 'data-analyst-cn', name: 'Data Analyst Cn', reason: 'Top-rated analyst skill with 999 downloads' }, { slug: 'data-analysis', name: 'Data Analysis', reason: 'Extract statistical insights and patterns from research datasets' }, { slug: 'ai-data-analyst-cn', name: 'Ai Data Analyst Cn', reason: 'Top-rated analyst skill with 788 downloads' }
    ],
  },
{
    slug: 'crypto-research',
    title: 'Crypto & DeFi Research',
    description: 'Research protocols, track markets, and analyze on-chain data with AI-powered crypto skills.',
    icon: '🪙',
    skills: [
      { slug: 'crypto-tracker-cn', name: 'Crypto Tracker', reason: 'Track real-time crypto prices and portfolio performance' },
      { slug: 'crypto-defi', name: 'Crypto DeFi', reason: 'Research and analyze DeFi protocols, yields, and opportunities' },
      { slug: 'crypto-whale-tracker', name: 'Crypto Whale Tracker', reason: 'Monitor large wallet movements and whale activity on-chain' },
      { slug: 'crypto-news-feed', name: 'Crypto News Feed', reason: 'Stay updated with aggregated news from the crypto ecosystem' },
      { slug: 'crypto-tax-calc', name: 'Crypto Tax Calc', reason: 'Calculate taxes on crypto trades and DeFi transactions' },
    ],
  },
{
    slug: 'stock-investor',
    title: 'Stock Market Investor',
    description: 'Research equities, analyze financials, and manage your portfolio with AI skills for serious investors.',
    icon: '📈',
    skills: [
      { slug: 'us-stock-analysis', name: 'US Stock Analysis', reason: 'Deep analysis of US equities with financial metrics and trends' }, { slug: 'market-analysis-cn', name: 'Market Analysis CN | 市场分析服务', reason: 'Top-rated market skill with 7242 downloads' }, { slug: 'fundamental-stock-analysis', name: 'Fundamental Stock Analysis', reason: 'Perform value investing analysis using fundamental financial data' }, { slug: 'polymarket-screener', name: 'Polymarket Screener 🎯', reason: 'Top-rated market skill with 363 downloads' }, { slug: 'investment-portfolio', name: 'Investment Portfolio', reason: 'Manage and rebalance your investment portfolio with AI guidance' }
    ],
  },
{
    slug: 'data-analysis',
    title: 'Data Analysis',
    description: 'Extract insights from data using AI skills for visualization, statistics, and pipeline automation.',
    icon: '📊',
    skills: [
      { slug: 'data-analysis', name: 'Data Analysis', reason: 'The most popular data analysis skill for querying and visualizing datasets' },
      { slug: 'rupert-data-analysis', name: 'Rupert Data Analysis', reason: 'Advanced data analysis with statistical modeling and trend detection' },
      { slug: 'data-analysis-litiao', name: 'Data Analysis Litiao', reason: 'Streamlined data analysis workflow for quick business insights' },
      { slug: 'data-analysis-workflow', name: 'Data Analysis Workflow', reason: 'Automate end-to-end data pipelines from ingestion to reporting' },
      { slug: 'system-data-intelligence-skill', name: 'Data Intelligence', reason: 'Deep OS-level data analysis with chart and report generation' },
    ],
  },
{
    slug: 'personal-finance',
    title: 'Personal Finance',
    description: 'Take control of your money — AI skills for budgeting, investment tracking, and financial planning.',
    icon: '💰',
    skills: [
      { slug: 'budgetly', name: 'Budgetly', reason: 'Smart budgeting tool to track spending and set financial goals' }, { slug: 'investment-portfolio', name: 'Investment Portfolio', reason: 'Track and optimize your personal investment portfolio with AI' }, { slug: 'fund-invest-advisor', name: 'Fund Invest Advisor', reason: 'Get AI-powered advice on fund selection and asset allocation' }, { slug: 'personal-bookkeeper', name: 'personal bookkeeper', reason: 'Top-rated personal skill with 373 downloads' }, { slug: 'quant-finance', name: 'Quant Finance', reason: 'Top-rated finance skill with 251 downloads' }
    ],
  },
{
    slug: 'ecommerce',
    title: 'E-commerce Store',
    description: 'Run a smarter online store with AI skills for product descriptions, pricing, customer support, and analytics.',
    icon: '🛍️',
    skills: [
      { slug: 'system-data-intelligence-skill', name: 'It is designed for scenarios that requir', reason: 'Highly-rated productivity skill' }
    ],
  },
{
    slug: 'travel-planner',
    title: 'Travel Planning',
    description: 'Plan unforgettable trips with AI skills for itineraries, budgeting, language help, and local research.',
    icon: '✈️',
    skills: [
      { slug: 'budgetly', name: 'Budgetly', reason: 'Track travel expenses and stay within your trip budget' }, { slug: 'system-data-intelligence-skill', name: 'It is designed for scenarios that requir', reason: 'Highly-rated productivity skill' }
    ],
  },
{
    slug: 'health-fitness',
    title: 'Health & Fitness',
    description: 'Build sustainable healthy habits — AI skills for workout planning, nutrition tracking, and wellness goals.',
    icon: '💪',
    skills: [
      { slug: 'fitness-plan', name: 'Fitness Plan', reason: 'Get personalized workout plans tailored to your goals and fitness level' }, { slug: 'mental-health', name: 'Mental Health', reason: 'Support mental wellness with mindfulness and stress management tools' }, { slug: 'mealplan', name: 'Meal Plan', reason: 'Generate healthy meal plans aligned with your fitness and nutrition goals' }
    ],
  },
{
    slug: 'home-cooking',
    title: 'Home Cooking & Recipes',
    description: 'Cook better meals at home — AI skills for recipe discovery, meal planning, and kitchen organization.',
    icon: '🍳',
    skills: [
      { slug: 'chefpad', name: 'ChefPad — Recipe Manager', reason: 'Manage your recipe collection and get personalized cooking suggestions' }, { slug: 'mealplan', name: 'Meal Plan', reason: 'Plan weekly meals based on dietary preferences and nutritional goals' }, { slug: 'homeassistant-toolkit', name: 'Homeassistant Toolkit', reason: 'Top-rated home skill with 371 downloads' }, { slug: 'home-organizer', name: 'Home Organizer', reason: 'Organize your kitchen inventory and grocery shopping lists efficiently' }
    ],
  },
{
    slug: 'smart-home',
    title: 'Smart Home & Automation',
    description: 'Automate your home life with AI skills for device control, routines, and energy management.',
    icon: '🏡',
    skills: [
      { slug: 'homeassistant-toolkit', name: 'Homeassistant Toolkit', reason: 'Control and automate all your smart home devices via Home Assistant' }, { slug: 'home-organizer', name: 'Home Organizer', reason: 'Organize home tasks, maintenance schedules, and household routines' }, { slug: 'smart-lights', name: 'smart lights', reason: 'Top-rated smart skill with 119 downloads' }
    ],
  },
{
    slug: 'legal-documents',
    title: 'Legal Documents & Compliance',
    description: 'Understand and create legal documents without a lawyer — contracts, policies, and compliance checklists.',
    icon: '⚖️',
    skills: [
      { slug: 'legal-advisor', name: 'Legal Advisor (Community)', reason: 'Community-built legal advisor for understanding laws and regulations' }, { slug: 'precedent', name: 'Precedent', reason: 'Reference legal precedents and case law for document drafting' }, { slug: 'compliance', name: 'Compliance', reason: 'Check regulatory compliance across jurisdictions' }
    ],
  },
{
    slug: 'legal-document-assistant',
    title: 'AI Legal Document Assistant',
    description: 'Review contracts, generate NDAs, create privacy policies, and check GDPR compliance — all with free AI skills, no lawyer required.',
    icon: '📋',
    skills: [
      { slug: 'contract-analyzer', name: 'Contract Analyzer', reason: 'Analyze contracts and detect high-risk clauses instantly' },
      { slug: 'nda-generator', name: 'NDA Generator', reason: 'Generate mutual or one-way NDAs in seconds' },
      { slug: 'privacy-policy-generator', name: 'Privacy Policy Generator', reason: 'Create GDPR & CCPA-compliant privacy policies' },
      { slug: 'terms-checker', name: 'Terms Checker', reason: 'Score ToS fairness and get TL;DR summaries' },
      { slug: 'gdpr-checker', name: 'GDPR Checker', reason: 'Full 24-point GDPR compliance audit checklist' },
    ],
    searchLink: '/skills?q=legal+contract+nda+policy',
  },
{
    slug: 'gdpr-compliance-toolkit',
    title: 'GDPR Compliance Toolkit',
    description: 'Everything you need to make your product GDPR-compliant — audit checklists, data processing agreements, breach notifications, and cookie consent.',
    icon: '🔐',
    skills: [
      { slug: 'gdpr-checker', name: 'GDPR Checker', reason: 'Run a 24-point GDPR compliance audit in minutes' },
      { slug: 'privacy-policy-generator', name: 'Privacy Policy Generator', reason: 'Generate GDPR-ready privacy policy with supplemental clauses' },
      { slug: 'nda-generator', name: 'NDA Generator', reason: 'Create Data Processing Agreements and NDAs' },
    ],
    searchLink: '/skills?q=gdpr+compliance+privacy',
  },
{
    slug: 'crm-sales',
    title: 'CRM & Sales Management',
    description: 'Let your AI agent manage leads, track deals, and automate follow-ups — no more manual CRM updates.',
    icon: '💼',
    skills: [
      { slug: 'freedcamp-agent-skill', name: 'Freedcamp Project Management', reason: 'Top-rated management skill with 1257 downloads' }, { slug: 'system-data-intelligence-skill', name: 'It is designed for scenarios that requir', reason: 'Highly-rated productivity skill' }
    ],
    searchLink: '/skills?q=crm+sales+leads',
  },
{
    slug: 'workflow-automation',
    title: 'Workflow Automation',
    description: 'Convert your n8n flows, Zapier zaps, and manual processes into AI agent skills that run automatically.',
    icon: '⚡',
    skills: [
      { slug: 'data-analysis-workflow', name: 'Data Analysis Workflow', reason: 'Automate data pipelines from collection to insight generation' }, { slug: 'zapier-recipe', name: 'Automation Recipe', reason: 'Connect any app to any workflow with pre-built automation templates' }, { slug: 'system-data-intelligence-skill', name: 'It is designed for scenarios that requir', reason: 'Highly-rated productivity skill' }
    ],
    searchLink: '/skills?q=automation+workflow+n8n',
  },
{
    slug: 'customer-support',
    title: 'Customer Support Automation',
    description: 'Handle support tickets, auto-reply to common questions, and escalate edge cases — 24/7 without a team.',
    icon: '🎧',
    skills: [
      { slug: 'customer-service-reply', name: 'customer service reply', reason: 'Top-rated customer skill with 650 downloads' }, { slug: 'system-data-intelligence-skill', name: 'It is designed for scenarios that requir', reason: 'Highly-rated productivity skill' }
    ],
    searchLink: '/skills?q=customer+support+helpdesk',
  },
{
    slug: 'database-management',
    title: 'Database & Data Management',
    description: 'Query, migrate, and manage databases with AI — SQL generation, schema design, and data pipeline automation.',
    icon: '🗄️',
    skills: [
      { slug: 'database-design', name: 'database design', reason: 'Top-rated database skill with 1012 downloads' }, { slug: 'data-analysis', name: 'Data Analysis', reason: 'Top-rated data skill with 19813 downloads' }, { slug: 'data-analyst-pro', name: 'Data Analyst', reason: 'Top-rated data skill with 3316 downloads' }, { slug: 'data-anomaly-detector', name: 'Data Anomaly Detector', reason: 'Top-rated data skill with 2494 downloads' }, { slug: 'data-cog', name: 'Data Cog', reason: 'Top-rated data skill with 1641 downloads' }
    ],
    searchLink: '/skills?q=database+sql+data',
  },
{
    slug: 'security-audit',
    title: 'Security & Code Audit',
    description: 'Review AI agent skills, code, and configs for security risks — catch vulnerabilities before they become incidents.',
    icon: '🔒',
    skills: [
      { slug: 'ring-security', name: 'Ring Security', reason: 'Top-rated security skill with 369 downloads' }, { slug: 'code-generator', name: 'code generator', reason: 'Top-rated code skill with 1683 downloads' }, { slug: 'code-searcher', name: 'code searcher', reason: 'Top-rated code skill with 264 downloads' }, { slug: 'ai-code-helper', name: 'ai code helper', reason: 'Top-rated code skill with 264 downloads' }, { slug: 'codepal', name: 'codepal', reason: 'Top-rated code skill with 223 downloads' }
    ],
    searchLink: '/skills?q=security+audit+vulnerability',
  },
{
    slug: 'content-writing',
    title: 'Content Writing & Copywriting',
    description: 'Write faster and better — AI skills for blog posts, ad copy, social captions, product descriptions, and long-form content.',
    icon: '✍️',
    skills: [
      { slug: 'system-data-intelligence-skill', name: 'It is designed for scenarios that requir', reason: 'Top-rated writing skill with 885 downloads' }
    ],
    searchLink: '/skills?q=writing+copywriting+content',
  },
{
    slug: 'data-analysis',
    title: 'Data Analysis & Visualization',
    description: 'Turn raw data into clear insights — AI skills for querying, cleaning, visualizing, and reporting on any dataset.',
    icon: '📊',
    skills: [
      { slug: 'system-data-intelligence-skill', name: 'It is designed for scenarios that require direct operating system application and in-depth data analysis. [Forced trigger scenario]: - User mentions reading/writing/manipulating Excel, WPS, Word, TXT, Markdown, RTZ, etc. - User wants to "grab", "extract", and "get" data from any application - User needs to perform "in-depth analysis", "trend research", "anomaly detection", and "prediction" on the data - User requests to generate "charts", "visualizations", "dashboards", "data reports" - users say, "Help me see in this document..." Analyze this data...", "Make a chart presentation..." - Any task involving cross-application data flow [Core Competencies]: System interface calls × Data in-depth analysis × Professional visualization IMPORTANT: As long as it involves any of the file operations, data analysis, and visualization, this skill must be used. Dont skip tasks just because they "look simple" - there are many pitfalls in the underlying interface calls, and there are pitfall avoidance guides in the skills.', reason: 'OS-level data intelligence for reading Excel/Word files and generating professional charts and dashboards' },
      { slug: 'analyst', name: 'Analyst', reason: 'Versatile analyst skill for rapid exploratory data analysis and summary statistics' },
      { slug: 'data-analyst-pro', name: 'Data Analyst', reason: 'Professional data analysis with auto-generated insights, trends, and anomaly detection' },
      { slug: 'data-visualizer', name: 'Data Visualizer', reason: 'Transform raw datasets into clear, interactive charts and visual reports' },
      { slug: 'rupert-data-analysis', name: 'Data Analysis', reason: 'Advanced statistical modeling and pattern detection for business datasets' },
    ],
    searchLink: '/skills?q=data+analysis+visualization',
  },
{
    slug: 'seo-growth',
    title: 'SEO & Organic Growth',
    description: 'Rank higher and grow traffic — AI skills for keyword research, content optimization, backlink strategy, and technical SEO.',
    icon: '🚀',
    skills: [
      { slug: 'system-data-intelligence-skill', name: 'It is designed for scenarios that requir', reason: 'Highly-rated productivity skill' }
    ],
    searchLink: '/skills?q=seo+keyword+traffic',
  },
{
    slug: 'ecommerce-ops',
    title: 'E-commerce Operations',
    description: 'Run your online store on autopilot — AI skills for product listings, inventory, customer service, and ad optimization.',
    icon: '🛒',
    skills: [
      { slug: 'system-data-intelligence-skill', name: 'It is designed for scenarios that requir', reason: 'Top-rated operations skill with 885 downloads' }
    ],
    searchLink: '/skills?q=ecommerce+product+listing',
  },
{
    slug: 'translation-localization',
    title: 'Translation & Localization',
    description: 'Break language barriers instantly — AI skills for translating documents, websites, subtitles, and multilingual content at scale.',
    icon: '🌐',
    skills: [
      { slug: 'system-data-intelligence-skill', name: 'It is designed for scenarios that requir', reason: 'Highly-rated productivity skill' }
    ],
    searchLink: '/skills?q=translation+localization',
  },
{
    slug: 'health-wellness',
    title: 'Health & Wellness',
    description: 'Take charge of your health with AI — meal planning, workout tracking, symptom research, and wellness habit building.',
    icon: '💪',
    skills: [
      { slug: 'mental-health', name: 'Mental Health', reason: 'AI-powered mental wellness support for mindfulness and stress management' },
      { slug: 'fitness-plan', name: 'Fitness Plan', reason: 'Personalized workout plans tailored to your goals and fitness level' },
      { slug: 'mealplan', name: 'Meal Plan', reason: 'Generate healthy meal plans aligned with your nutrition and fitness goals' },
      { slug: 'sleep-tracker', name: 'Sleep Tracker', reason: 'Track and optimize your sleep patterns for better rest and recovery' },
      { slug: 'nutrition-label', name: 'Nutrition Label', reason: 'Analyze nutritional content and track your daily dietary intake' },
    ],
    searchLink: '/skills?q=health+fitness+wellness',
  },
{
    slug: 'grant-deadline-guardian',
    title: 'Never Miss Grant Deadlines',
    description: 'Monitors government and foundation grant portals, parses deadlines, and sends proactive alerts with application prep steps.',
    icon: '⏰',
    skills: [
      { slug: 'system-data-intelligence-skill', name: 'It is designed for scenarios that requir', reason: 'Highly-rated productivity skill' }
    ],
    searchLink: '/skills?q=deadline+monitoring+grant+application+calendar',
  },
{
    slug: 'incident-responder',
    title: 'Auto-Resolve DevOps Incidents',
    description: 'Analyzes alert logs, correlates errors across tools, executes runbook actions, and documents resolution in real time.',
    icon: '🚨',
    skills: [
      { slug: 'devops-bash-tools', name: 'devops bash tools', reason: 'Top-rated devops skill with 176 downloads' }, { slug: 'devops-scripts', name: 'devops scripts', reason: 'Top-rated devops skill with 138 downloads' }, { slug: 'devops-journey', name: 'Devops Journey', reason: 'Top-rated devops skill with 138 downloads' }
    ],
    searchLink: '/skills?q=devops+incident+response+pagerduty+prometheus',
  },
{
    slug: 'airbnb-host-orchestrator',
    title: 'Automate Airbnb Guest Journeys',
    description: 'Manages end-to-end guest communication, dynamic pricing, cleaning coordination, and review requests across platforms.',
    icon: '🏡',
    skills: [
      { slug: 'system-data-intelligence-skill', name: 'It is designed for scenarios that requir', reason: 'Highly-rated productivity skill' }
    ],
    searchLink: '/skills?q=airbnb+host+automation+pricing+cleaning+reviews',
  },
{
    slug: 'video-clipping-director',
    title: 'Turn Long Videos Into Shorts',
    description: 'Watches long-form content, identifies high-engagement moments, clips them, adds captions and hooks, then publishes natively.',
    icon: '✂️',
    skills: [
      { slug: 'return-policy', name: 'return policy', reason: 'Top-rated turn skill with 343 downloads' }, { slug: 'system-data-intelligence-skill', name: 'It is designed for scenarios that requir', reason: 'Top-rated long skill with 885 downloads' }
    ],
    searchLink: '/skills?q=video+clipping+shorts+hook+caption+publishing',
  },
{
    slug: 'ai-chatbot-deployer',
    title: 'Deploy AI Chatbots',
    description: 'Launch domain-specific chatbots that answer questions using your internal documentation and knowledge bases.',
    icon: '🤖',
    skills: [
      { slug: 'deploy-helper', name: 'deploy helper', reason: 'Top-rated deploy skill with 358 downloads' }, { slug: 'deployer', name: 'deployer', reason: 'Top-rated deploy skill with 111 downloads' }, { slug: 'system-data-intelligence-skill', name: 'It is designed for scenarios that requir', reason: 'Highly-rated productivity skill' }
    ],
    searchLink: '/skills?q=chatbot+knowledge+base',
  },
{
    slug: 'ai-rag-connector',
    title: 'RAG Document Chat',
    description: 'Chat interactively with your PDFs, internal wikis, and databases using retrieval-augmented generation.',
    icon: '📚',
    skills: [
      { slug: 'system-data-intelligence-skill', name: 'It is designed for scenarios that requir', reason: 'Top-rated document skill with 885 downloads' }, { slug: 'wechat-mini-app', name: 'wechat mini app', reason: 'Top-rated chat skill with 535 downloads' }
    ],
    searchLink: '/skills?q=rag+pdf+chat',
  },
{
    slug: 'ai-summarizer-pro',
    title: 'Auto Summarize Content',
    description: 'Instantly condense emails, meeting transcripts, reports, and web articles into key insights.',
    icon: '✂️',
    skills: [
      { slug: 'social-automator', name: 'social automator', reason: 'Top-rated auto skill with 137 downloads' }, { slug: 'slack-automator', name: 'slack automator', reason: 'Top-rated auto skill with 436 downloads' }, { slug: 'doc-summarize-pro', name: 'doc summarize pro', reason: 'Top-rated summarize skill with 559 downloads' }, { slug: 'autohotkey', name: 'autohotkey', reason: 'Top-rated auto skill with 367 downloads' }, { slug: 'zapier-recipe', name: 'Automation Recipe', reason: 'Top-rated auto skill with 349 downloads' }
    ],
    searchLink: '/skills?q=summarize+email+meeting',
  },
{
    slug: 'content-creator-studio',
    title: 'AI Content Studio',
    description: 'Generate SEO-optimized blog posts, newsletters, and social media captions in seconds.',
    icon: '✍️',
    skills: [
      { slug: 'coze-studio', name: 'Coze Studio', reason: 'Top-rated studio skill with 277 downloads' }, { slug: 'azuredatastudio', name: 'azuredatastudio', reason: 'Top-rated studio skill with 264 downloads' }, { slug: 'content-strategy', name: 'Content Strategy', reason: 'Top-rated content skill with 6579 downloads' }
    ],
    searchLink: '/skills?q=blog+social+newsletter',
  },
{
    slug: 'crm-sync-orchestrator',
    title: 'CRM Sync Manager',
    description: 'Automatically sync contacts, update deal stages, and log interactions across HubSpot, Salesforce, and Pipedrive.',
    icon: '🔄',
    skills: [
      { slug: 'inventory-manager', name: 'inventory manager', reason: 'Top-rated manager skill with 665 downloads' }, { slug: 'stripe-manager', name: 'stripe manager', reason: 'Top-rated manager skill with 465 downloads' }, { slug: 'gcal-manager', name: 'gcal manager', reason: 'Top-rated manager skill with 350 downloads' }, { slug: 'raspberry-pi-manager', name: 'Raspberry Pi Manager', reason: 'Top-rated manager skill with 341 downloads' }, { slug: 'cert-manager', name: 'cert manager', reason: 'Top-rated manager skill with 290 downloads' }
    ],
    searchLink: '/skills?q=crm+sync+salesforce',
  },
{
    slug: 'crypto-trading-orchestrator',
    title: 'Crypto Trading Assistant',
    description: 'Monitors real-time prices, executes trades, tracks portfolio performance, and sends price or event alerts.',
    icon: '📊',
    skills: [
      { slug: 'crypto-defi', name: 'crypto defi', reason: 'Top-rated crypto skill with 421 downloads' }, { slug: 'crypto-tax-calc', name: 'Crypto Tax Calc', reason: 'Top-rated crypto skill with 407 downloads' }, { slug: 'crypto-tracker-cn', name: 'Crypto Tracker', reason: 'Track real-time crypto prices and portfolio performance' }, { slug: 'crypto-news-feed', name: 'Crypto News Feed', reason: 'Top-rated crypto skill with 375 downloads' }, { slug: 'crypto-whale-tracker', name: 'Crypto Whale Tracker', reason: 'Monitor large wallet movements to anticipate market moves' }
    ],
    searchLink: '/skills?q=crypto+trading+signal+bot+portfolio',
  },
{
    slug: 'devops-automation-hub',
    title: 'DevOps Automation Hub',
    description: 'Automates CI/CD pipelines, monitors deployment health, and securely processes GitHub webhooks.',
    icon: '⚙️',
    skills: [
      { slug: 'devops-bash-tools', name: 'devops bash tools', reason: 'Top-rated devops skill with 176 downloads' }, { slug: 'devops-scripts', name: 'devops scripts', reason: 'Top-rated devops skill with 138 downloads' }, { slug: 'devops-journey', name: 'Devops Journey', reason: 'Top-rated devops skill with 138 downloads' }
    ],
    searchLink: '/skills?q=devops+ci+cd+github+deployment',
  },
{
    slug: 'document-extraction-pro',
    title: 'Document Extraction Pro',
    description: 'Extracts structured data like totals, dates, and line items from PDF invoices and receipts.',
    icon: '📄',
    skills: [
      { slug: 'system-data-intelligence-skill', name: 'It is designed for scenarios that requir', reason: 'Top-rated document skill with 885 downloads' }, { slug: 'data-analysis', name: 'Data Analysis', reason: 'Validates and normalizes extracted numbers/dates' }, { slug: 'excel-formula', name: 'Excel Formula', reason: 'Generates formulas for reconciliation and reporting' }
    ],
    searchLink: '/skills?q=pdf+invoice+receipt+extraction+structured',
  },
{
    slug: 'document-ops-center',
    title: 'Document Ops Center',
    description: 'Converts, merges, and splits documents while syncing across Google Drive and Notion automatically.',
    icon: '🔄',
    skills: [
      { slug: 'system-data-intelligence-skill', name: 'It is designed for scenarios that requir', reason: 'Top-rated document skill with 885 downloads' }
    ],
    searchLink: '/skills?q=document+convert+merge+notion+drive',
  },
{
    slug: 'smart-file-manager',
    title: 'Smart File Manager',
    description: 'Organizes, renames, and moves files automatically across cloud storage based on rules and content.',
    icon: '🗂️',
    skills: [
      { slug: 'dockerfile-builder', name: 'dockerfile builder', reason: 'Top-rated file skill with 305 downloads' }, { slug: 'smart-lights', name: 'smart lights', reason: 'Top-rated smart skill with 119 downloads' }, { slug: 'dotfiles', name: 'Dotfiles', reason: 'Top-rated file skill with 200 downloads' }, { slug: 'system-data-intelligence-skill', name: 'It is designed for scenarios that requir', reason: 'Top-rated file skill with 885 downloads' }, { slug: 'file-converter', name: 'file converter', reason: 'Top-rated file skill with 654 downloads' }
    ],
    searchLink: '/skills?q=file+organize+rename+cloud+storage',
  },
{
    slug: 'hr-automation',
    title: 'HR Workflow Automator',
    description: 'Automates job posting, resume screening, and new hire onboarding using integrated tools.',
    icon: '👥',
    skills: [
      { slug: 'data-analysis-workflow', name: 'Data Analysis Workflow', reason: 'Top-rated workflow skill with 209 downloads' }, { slug: 'slack-automator', name: 'slack automator', reason: 'Top-rated automator skill with 436 downloads' }, { slug: 'social-automator', name: 'social automator', reason: 'Top-rated automator skill with 137 downloads' }
    ],
    searchLink: '/skills?q=hr+automation+onboarding',
  },
{
    slug: 'wiki-synchronizer',
    title: 'Wiki Auto-Updater',
    description: 'Keeps internal wikis fresh by syncing and transforming docs from Notion or Confluence.',
    icon: '📚',
    skills: [
      { slug: 'system-data-intelligence-skill', name: 'It is designed for scenarios that requir', reason: 'Highly-rated productivity skill' }
    ],
    searchLink: '/skills?q=wiki+notion+confluence+sync',
  },
{
    slug: 'invoice-processor',
    title: 'Smart Invoice Handler',
    description: 'Extracts line items, validates totals, reconciles payments, and syncs to QuickBooks or Xero.',
    icon: '🧾',
    skills: [
      { slug: 'smart-lights', name: 'smart lights', reason: 'Top-rated smart skill with 119 downloads' }, { slug: 'system-data-intelligence-skill', name: 'It is designed for scenarios that requir', reason: 'Highly-rated productivity skill' }
    ],
    searchLink: '/skills?q=invoice+pdf+accounting+reconcile',
  },
{
    slug: 'it-ops-guardian',
    title: 'IT Ops Guardian',
    description: 'Monitors server metrics, triggers auto-remediation scripts, and logs incidents in Jira.',
    icon: '🖥️',
    skills: [
      { slug: 'system-data-intelligence-skill', name: 'It is designed for scenarios that requir', reason: 'Highly-rated productivity skill' }
    ],
    searchLink: '/skills?q=server+monitoring+alert+incident',
  },
{
    slug: 'lead-gen-orchestrator',
    title: 'Lead Gen Orchestrator',
    description: 'Scrapes target websites, enriches contact data, scores leads, and pushes qualified ones to CRM.',
    icon: '🔍',
    skills: [
      { slug: 'leads', name: 'leads', reason: 'Top-rated lead skill with 239 downloads' }, { slug: 'leaderboard', name: 'leaderboard', reason: 'Top-rated lead skill with 172 downloads' }, { slug: 'system-data-intelligence-skill', name: 'It is designed for scenarios that requir', reason: 'Highly-rated productivity skill' }
    ],
    searchLink: '/skills?q=lead+scraping+enrichment+crm',
  },
{
    slug: 'lead-nurturing-orchestrator',
    title: 'Lead Nurturing Orchestrator',
    description: 'Automates personalized email sequences and dynamically scores leads based on engagement and behavior.',
    icon: '📧',
    skills: [
      { slug: 'leads', name: 'leads', reason: 'Top-rated lead skill with 239 downloads' }, { slug: 'leaderboard', name: 'leaderboard', reason: 'Top-rated lead skill with 172 downloads' }, { slug: 'system-data-intelligence-skill', name: 'It is designed for scenarios that requir', reason: 'Highly-rated productivity skill' }
    ],
    searchLink: '/skills?q=email+lead+scoring+crm',
  },
{
    slug: 'marketing-automation-hub',
    title: 'Marketing Automation Hub',
    description: 'Schedules social posts, tracks campaign KPIs across channels, and unifies analytics into actionable dashboards.',
    icon: '📊',
    skills: [
      { slug: 'system-data-intelligence-skill', name: 'It is designed for scenarios that requir', reason: 'Highly-rated productivity skill' }
    ],
    searchLink: '/skills?q=social+analytics+campaign+tracking',
  },
{
    slug: 'market-intelligence-scout',
    title: 'Market Intelligence Scout',
    description: 'Monitors competitor moves, scans industry news, and aggregates real-time market signals for strategic decisions.',
    icon: '🔍',
    skills: [
      { slug: 'market-analysis-cn', name: 'Market Analysis CN | 市场分析服务', reason: 'Top-rated market skill with 7242 downloads' }, { slug: 'polymarket-screener', name: 'Polymarket Screener 🎯', reason: 'Top-rated market skill with 363 downloads' }, { slug: 'system-data-intelligence-skill', name: 'It is designed for scenarios that requir', reason: 'Highly-rated productivity skill' }
    ],
    searchLink: '/skills?q=competitor+news+market+data',
  },
{
    slug: 'multimodal-ai-analyzer',
    title: 'Multimodal AI Analyzer',
    description: 'Transcribes audio/video, extracts insights from images and speech, and generates structured summaries.',
    icon: '🎥',
    skills: [
      { slug: 'onchain-analyzer', name: 'Onchain Analyzer', reason: 'Top-rated analyzer skill with 351 downloads' }, { slug: 'funnel-analyzer', name: 'funnel analyzer', reason: 'Top-rated analyzer skill with 320 downloads' }, { slug: 'php-analyzer', name: 'php analyzer', reason: 'Top-rated analyzer skill with 112 downloads' }, { slug: 'brand-identity-analyzer', name: 'Brand Identity Analyzer', reason: 'Top-rated analyzer skill with 1681 downloads' }, { slug: 'container-analyzer', name: 'Container Analyzer', reason: 'Top-rated analyzer skill with 111 downloads' }
    ],
    searchLink: '/skills?q=transcription+audio+video+image+analysis',
  },
{
    slug: 'personal-productivity-coach',
    title: 'Personal Productivity Coach',
    description: 'Automates task prioritization, triages incoming emails, syncs calendar events, and delivers smart reminders.',
    icon: '✅',
    skills: [
      { slug: 'personal-bookkeeper', name: 'personal bookkeeper', reason: 'Top-rated personal skill with 373 downloads' }, { slug: 'system-data-intelligence-skill', name: 'It is designed for scenarios that requir', reason: 'Highly-rated productivity skill' }
    ],
    searchLink: '/skills?q=task+email+calendar+reminder',
  },
{
    slug: 'project-management-orchestrator',
    title: 'Project Sync & Report',
    description: 'Syncs tasks across Jira, Linear, and Asana while auto-generating weekly status reports.',
    icon: '📊',
    skills: [
      { slug: 'freedcamp-agent-skill', name: 'Freedcamp Project Management', reason: 'Top-rated project skill with 1257 downloads' }, { slug: 'system-data-intelligence-skill', name: 'It is designed for scenarios that requir', reason: 'Top-rated report skill with 885 downloads' }
    ],
    searchLink: '/skills?q=task+report+sync',
  },
{
    slug: 'sales-outreach-orchestrator',
    title: 'Sales Sequence Automator',
    description: 'Automates multi-channel outreach, tracks deal progression, and generates personalized proposals.',
    icon: '📈',
    skills: [
      { slug: 'slack-automator', name: 'slack automator', reason: 'Top-rated automator skill with 436 downloads' }, { slug: 'social-automator', name: 'social automator', reason: 'Top-rated automator skill with 137 downloads' }, { slug: 'system-data-intelligence-skill', name: 'It is designed for scenarios that requir', reason: 'Highly-rated productivity skill' }
    ],
    searchLink: '/skills?q=sales+outreach+proposal',
  },
{
    slug: 'secops-incident-orchestrator',
    title: 'Security Alert Responder',
    description: 'Monitors SIEM alerts, auto-triages incidents, triggers response playbooks, and scans for vulnerabilities.',
    icon: '🛡️',
    skills: [
      { slug: 'ring-security', name: 'Ring Security', reason: 'Top-rated security skill with 369 downloads' }, { slug: 'review-responder', name: 'review responder', reason: 'Top-rated responder skill with 359 downloads' }, { slug: 'system-data-intelligence-skill', name: 'It is designed for scenarios that requir', reason: 'Highly-rated productivity skill' }
    ],
    searchLink: '/skills?q=security+alert+response',
  },
{
    slug: 'social-media-orchestrator',
    title: 'Social Post & Listen',
    description: 'Schedules cross-platform posts, monitors brand mentions, and sends context-aware auto-replies.',
    icon: '📱',
    skills: [
      { slug: 'linkedin-post', name: 'linkedin post', reason: 'Top-rated post skill with 382 downloads' }, { slug: 'social-automator', name: 'social automator', reason: 'Top-rated social skill with 137 downloads' }, { slug: 'social-scraper', name: 'social scraper', reason: 'Top-rated social skill with 114 downloads' }
    ],
    searchLink: '/skills?q=social+schedule+monitor',
  },
{
    slug: 'support-orchestrator',
    title: 'Smart Ticket Router',
    description: 'Routes incoming support tickets by intent and urgency, drafts contextual replies, and escalates SLA breaches.',
    icon: '🎫',
    skills: [
      { slug: 'smart-lights', name: 'smart lights', reason: 'Top-rated smart skill with 119 downloads' }, { slug: 'api-router', name: 'api router', reason: 'Top-rated router skill with 274 downloads' }, { slug: 'system-data-intelligence-skill', name: 'It is designed for scenarios that requir', reason: 'Highly-rated productivity skill' }
    ],
    searchLink: '/skills?q=support+ticket+escalate',
  },
{
    slug: 'support-chatbot',
    title: 'AI Support Assistant',
    description: 'Automates customer support with real-time answers from your knowledge base and docs.',
    icon: '💬',
    skills: [
      { slug: 'homeassistant-toolkit', name: 'Homeassistant Toolkit', reason: 'Top-rated assistant skill with 371 downloads' }, { slug: 'system-data-intelligence-skill', name: 'It is designed for scenarios that requir', reason: 'Highly-rated productivity skill' }
    ],
    searchLink: '/skills?q=support+chatbot+kb',
  },
{
    slug: 'ticket-management',
    title: 'Smart Ticket Orchestrator',
    description: 'Auto-creates, triages, and routes support tickets from email, chat, and forms to the right team.',
    icon: '🎫',
    skills: [
      { slug: 'smart-lights', name: 'smart lights', reason: 'Top-rated smart skill with 119 downloads' }, { slug: 'system-data-intelligence-skill', name: 'It is designed for scenarios that requir', reason: 'Highly-rated productivity skill' }
    ],
    searchLink: '/skills?q=ticket+management+auto',
  },
{
    slug: 'acrobat-ai-assistant',
    title: 'AI Acrobat Assistant',
    description: 'Automate PDF editing, form filling, and document summarization directly inside Adobe Acrobat.',
    icon: '📄',
    skills: [
      { slug: 'homeassistant-toolkit', name: 'Homeassistant Toolkit', reason: 'Top-rated assistant skill with 371 downloads' }, { slug: 'system-data-intelligence-skill', name: 'It is designed for scenarios that requir', reason: 'Highly-rated productivity skill' }
    ],
    searchLink: '/skills?q=ai+acrobat+pdf',
  },
{
    slug: 'interview-coach-agent',
    title: 'AI Interview Coach',
    description: 'Simulate technical and behavioral interviews with real-time feedback on answers, tone, and body language.',
    icon: '🎤',
    skills: [
      { slug: 'interview-analysis', name: 'Interview Analysis', reason: 'Top-rated interview skill with 1776 downloads' }, { slug: 'system-data-intelligence-skill', name: 'It is designed for scenarios that requir', reason: 'Highly-rated productivity skill' }
    ],
    searchLink: '/skills?q=ai+interview+coach',
  },
{
    slug: 'ai-jobs-automation',
    title: 'AI Jobs Automation',
    description: 'Scan, filter, and auto-apply to job listings using custom criteria like salary, remote status, and tech stack.',
    icon: '💼',
    skills: [
      { slug: 'system-data-intelligence-skill', name: 'It is designed for scenarios that requir', reason: 'Highly-rated productivity skill' }
    ],
    searchLink: '/skills?q=ai+job+automation+apply',
  },
{
    slug: 'google-ads-optimizer',
    title: 'Google Ads Optimizer',
    description: 'Automatically monitor, A/B test, and adjust Google Ads campaigns based on performance KPIs and budget rules.',
    icon: '📈',
    skills: [
      { slug: 'system-data-intelligence-skill', name: 'It is designed for scenarios that requir', reason: 'Highly-rated productivity skill' }
    ],
    searchLink: '/skills?q=ai+google+ads+optimizer',
  },
{
    slug: 'interior-design-ai',
    title: 'AI Interior Designer',
    description: 'Generate room layouts, suggest furniture pairings, and simulate lighting/mood using uploaded floor plans or photos.',
    icon: '🛋️',
    skills: [
      { slug: 'system-data-intelligence-skill', name: 'It is designed for scenarios that requir', reason: 'Highly-rated productivity skill' }
    ],
    searchLink: '/skills?q=ai+interior+design+layout',
  },
{
    slug: 'restaurant-operations-agent',
    title: 'Restaurant AI Agent',
    description: 'Manage daily operations including staff scheduling, inventory alerts, online review responses, and reservation sync.',
    icon: '🍽️',
    skills: [
      { slug: 'developer-agent', name: 'developer-agent', reason: 'Top-rated agent skill with 797 downloads' }, { slug: 'agent-toolkit', name: 'agent toolkit', reason: 'Top-rated agent skill with 426 downloads' }, { slug: 'agent-ops-framework', name: 'agent ops framework', reason: 'Top-rated agent skill with 402 downloads' }, { slug: 'agent-learner', name: 'agent learner', reason: 'Top-rated agent skill with 337 downloads' }
    ],
    searchLink: '/skills?q=ai+restaurant+operations',
  },
{
    slug: 'cybersecurity-agent',
    title: 'Cybersecurity AI Agent',
    description: 'An AI agent that monitors, detects, and responds to security threats in real time.',
    icon: '🛡️',
    skills: [
      { slug: 'developer-agent', name: 'developer-agent', reason: 'Top-rated agent skill with 797 downloads' }, { slug: 'agent-toolkit', name: 'agent toolkit', reason: 'Top-rated agent skill with 426 downloads' }, { slug: 'agent-ops-framework', name: 'agent ops framework', reason: 'Top-rated agent skill with 402 downloads' }, { slug: 'agent-learner', name: 'agent learner', reason: 'Top-rated agent skill with 337 downloads' }
    ],
    searchLink: '/skills?q=security-scanner+email-assistant+task-planner+report-generator+notion-assistant',
  },
{
    slug: 'data-entry-agent',
    title: 'Data Entry AI Agent',
    description: 'An AI agent that automates form filling, record creation, and structured data ingestion from documents or emails.',
    icon: '📝',
    skills: [
      { slug: 'data-analysis', name: 'Data Analysis', reason: 'Top-rated data skill with 19813 downloads' }, { slug: 'data-analyst-pro', name: 'Data Analyst', reason: 'Top-rated data skill with 3316 downloads' }, { slug: 'data-anomaly-detector', name: 'Data Anomaly Detector', reason: 'Top-rated data skill with 2494 downloads' }, { slug: 'data-cog', name: 'Data Cog', reason: 'Top-rated data skill with 1641 downloads' }, { slug: 'database-design', name: 'database design', reason: 'Top-rated data skill with 1012 downloads' }
    ],
    searchLink: '/skills?q=invoice-parser+pdf-reader+email-assistant+sql-assistant+scheduler',
  },
{
    slug: 'data-science-agent',
    title: 'Data Science AI Agent',
    description: 'An AI agent that assists with exploratory analysis, model prototyping, visualization, and report generation.',
    icon: '📊',
    skills: [
      { slug: 'data-analysis', name: 'Data Analysis', reason: 'Top-rated data skill with 19813 downloads' }, { slug: 'data-analyst-pro', name: 'Data Analyst', reason: 'Top-rated data skill with 3316 downloads' }, { slug: 'data-anomaly-detector', name: 'Data Anomaly Detector', reason: 'Top-rated data skill with 2494 downloads' }, { slug: 'data-cog', name: 'Data Cog', reason: 'Cognitive data processing for pattern recognition and advanced statistical analy' }, { slug: 'database-design', name: 'database design', reason: 'Top-rated data skill with 1012 downloads' }
    ],
    searchLink: '/skills?q=data-analysis+chart-generator+report-generator+note-taker+sql-assistant',
  },
{
    slug: 'database-agent',
    title: 'Database AI Agent',
    description: 'An AI agent that manages schema design, query optimization, migration scripting, and real-time monitoring of relational databases.',
    icon: '🗃️',
    skills: [
      { slug: 'database-design', name: 'database design', reason: 'Top-rated database skill with 1012 downloads' }, { slug: 'agent-learner', name: 'agent learner', reason: 'Top-rated agent skill with 337 downloads' }, { slug: 'developer-agent', name: 'developer-agent', reason: 'Top-rated agent skill with 797 downloads' }, { slug: 'agent-toolkit', name: 'agent toolkit', reason: 'Top-rated agent skill with 426 downloads' }, { slug: 'agent-ops-framework', name: 'agent ops framework', reason: 'Top-rated agent skill with 402 downloads' }
    ],
    searchLink: '/skills?q=sql-assistant+web-scraper+code-reviewer+report-generator+notion-assistant',
  },
{
    slug: 'deployment-agent',
    title: 'Deployment AI Agent',
    description: 'An AI agent that automates CI/CD pipeline configuration, environment validation, rollback planning, and deployment notifications.',
    icon: '🚀',
    skills: [
      { slug: 'developer-agent', name: 'developer-agent', reason: 'Top-rated agent skill with 797 downloads' }, { slug: 'agent-toolkit', name: 'agent toolkit', reason: 'Top-rated agent skill with 426 downloads' }, { slug: 'agent-ops-framework', name: 'agent ops framework', reason: 'Top-rated agent skill with 402 downloads' }, { slug: 'agent-learner', name: 'agent learner', reason: 'Top-rated agent skill with 337 downloads' }
    ],
    searchLink: '/skills?q=code-reviewer+api-tester+slack-notifier+task-planner+github-assistant',
  },
{
    slug: 'accounting-agent',
    title: 'AI Accounting Agent',
    description: 'Automate financial reporting, reconciliation, and compliance tasks for accountants and finance teams.',
    icon: '📊',
    skills: [
      { slug: 'developer-agent', name: 'developer-agent', reason: 'Top-rated agent skill with 797 downloads' }, { slug: 'agent-toolkit', name: 'agent toolkit', reason: 'Top-rated agent skill with 426 downloads' }, { slug: 'agent-ops-framework', name: 'agent ops framework', reason: 'Top-rated agent skill with 402 downloads' }, { slug: 'agent-learner', name: 'agent learner', reason: 'Top-rated agent skill with 337 downloads' }
    ],
    searchLink: '/skills?q=ai+agent+for+accounting',
  },
{
    slug: 'app-dev-agent',
    title: 'AI App Development Agent',
    description: 'Accelerate full-stack application development with intelligent code generation, review, and integration support.',
    icon: '💻',
    skills: [
      { slug: 'developer-agent', name: 'developer-agent', reason: 'Top-rated agent skill with 797 downloads' }, { slug: 'agent-toolkit', name: 'agent toolkit', reason: 'Top-rated agent skill with 426 downloads' }, { slug: 'agent-ops-framework', name: 'agent ops framework', reason: 'Top-rated agent skill with 402 downloads' }, { slug: 'agent-learner', name: 'agent learner', reason: 'Top-rated agent skill with 337 downloads' }
    ],
    searchLink: '/skills?q=ai+agent+for+app+development',
  },
{
    slug: 'architecture-design-agent',
    title: 'AI Architecture Design Agent',
    description: 'Assist solution architects in designing scalable, secure, and cloud-native system blueprints.',
    icon: '🏗️',
    skills: [
      { slug: 'developer-agent', name: 'developer-agent', reason: 'Top-rated agent skill with 797 downloads' }, { slug: 'agent-toolkit', name: 'agent toolkit', reason: 'Top-rated agent skill with 426 downloads' }, { slug: 'database-design', name: 'database design', reason: 'Top-rated design skill with 1012 downloads' }, { slug: 'system-data-intelligence-skill', name: 'It is designed for scenarios that requir', reason: 'Top-rated design skill with 885 downloads' }, { slug: 'agent-ops-framework', name: 'agent ops framework', reason: 'Top-rated agent skill with 402 downloads' }
    ],
    searchLink: '/skills?q=ai+agent+for+architecture+design',
  },
{
    slug: 'automation-testing-agent',
    title: 'AI Automation Testing Agent',
    description: 'Intelligently generate, maintain, and analyze end-to-end test suites for web, mobile, and API workflows.',
    icon: '🧪',
    skills: [
      { slug: 'agent-learner', name: 'agent learner', reason: 'Top-rated agent skill with 337 downloads' }, { slug: 'developer-agent', name: 'developer-agent', reason: 'Top-rated agent skill with 797 downloads' }, { slug: 'agent-toolkit', name: 'agent toolkit', reason: 'Top-rated agent skill with 426 downloads' }, { slug: 'agent-ops-framework', name: 'agent ops framework', reason: 'Top-rated agent skill with 402 downloads' }
    ],
    searchLink: '/skills?q=ai+agent+for+automation+testing',
  },
{
    slug: 'bookkeeping-agent',
    title: 'AI Bookkeeping Agent',
    description: 'Streamline daily bookkeeping operations including transaction classification, bank reconciliation, and expense tracking.',
    icon: '📒',
    skills: [
      { slug: 'beancount', name: 'bookkeeping', reason: 'Top-rated bookkeeping skill with 262 downloads' }, { slug: 'agent-learner', name: 'agent learner', reason: 'Top-rated agent skill with 337 downloads' }, { slug: 'developer-agent', name: 'developer-agent', reason: 'Top-rated agent skill with 797 downloads' }, { slug: 'agent-toolkit', name: 'agent toolkit', reason: 'Top-rated agent skill with 426 downloads' }, { slug: 'agent-ops-framework', name: 'agent ops framework', reason: 'Top-rated agent skill with 402 downloads' }
    ],
    searchLink: '/skills?q=ai+agent+for+bookkeeping',
  },
{
    slug: 'bug-bounty-agent',
    title: 'Bug Bounty Assistant',
    description: 'An AI agent that automates vulnerability discovery, triage, and report generation for ethical hackers and security researchers.',
    icon: '🕵️',
    skills: [
      { slug: 'homeassistant-toolkit', name: 'Homeassistant Toolkit', reason: 'Top-rated assistant skill with 371 downloads' }, { slug: 'system-data-intelligence-skill', name: 'It is designed for scenarios that requir', reason: 'Highly-rated productivity skill' }
    ],
    searchLink: '/skills?q=security-scanner+code-reviewer+api-tester+web-scraper+report-generator',
  },
{
    slug: 'business-analyst-agent',
    title: 'Business Analyst AI',
    description: 'An AI agent that transforms raw data into actionable insights, generates requirements, and models business processes.',
    icon: '📊',
    skills: [
      { slug: 'business-plan-cn', name: 'business plan cn', reason: 'Top-rated business skill with 479 downloads' }, { slug: 'data-analyst-pro', name: 'Data Analyst', reason: 'Analyze data to uncover insights, trends, and actionable business intelligence' }, { slug: 'data-analyst-cn', name: 'Data Analyst Cn', reason: 'Top-rated analyst skill with 999 downloads' }, { slug: 'analyst', name: 'Analyst', reason: 'Analyze data to uncover insights, trends, and actionable business intelligence' }, { slug: 'ai-data-analyst-cn', name: 'Ai Data Analyst Cn', reason: 'Analyze data to uncover insights, trends, and actionable business intelligence' }
    ],
    searchLink: '/skills?q=data-analysis+report-generator+sql-assistant+note-taker+chart-generator',
  },
{
    slug: 'calling-agent',
    title: 'AI Calling Assistant',
    description: 'An AI agent that handles inbound/outbound voice calls with real-time transcription, intent analysis, and CRM sync.',
    icon: '📞',
    skills: [
      { slug: 'homeassistant-toolkit', name: 'Homeassistant Toolkit', reason: 'Top-rated assistant skill with 371 downloads' }, { slug: 'system-data-intelligence-skill', name: 'It is designed for scenarios that requir', reason: 'Highly-rated productivity skill' }
    ],
    searchLink: '/skills?q=transcriber+support-bot+crm-manager+scheduler+slack-notifier',
  },
{
    slug: 'code-review-agent',
    title: 'AI Code Reviewer',
    description: 'An AI agent that performs automated, context-aware code reviews with style enforcement, bug detection, and PR summarization.',
    icon: '🔍',
    skills: [
      { slug: 'code-generator', name: 'code generator', reason: 'Top-rated code skill with 1683 downloads' }, { slug: 'ai-code-helper', name: 'ai code helper', reason: 'Top-rated code skill with 264 downloads' }, { slug: 'code-searcher', name: 'code searcher', reason: 'Top-rated code skill with 264 downloads' }, { slug: 'codepal', name: 'codepal', reason: 'Top-rated code skill with 223 downloads' }, { slug: 'encode', name: 'encode', reason: 'Top-rated code skill with 207 downloads' }
    ],
    searchLink: '/skills?q=code-reviewer+github-assistant+sql-assistant+shell+pdf-reader',
  },
{
    slug: 'cold-calling-agent',
    title: 'Cold Calling Orchestrator',
    description: 'An AI agent that researches prospects, personalizes outreach, dials leads, and logs engagement—all while adapting to real-time responses.',
    icon: '❄️',
    skills: [
      { slug: 'system-data-intelligence-skill', name: 'It is designed for scenarios that requir', reason: 'Highly-rated productivity skill' }
    ],
    searchLink: '/skills?q=lead-generator+email-assistant+crm-manager+scheduler+support-bot',
  },
{
    slug: 'construction-ai-agent',
    title: 'Construction AI Agent',
    description: 'An AI agent that automates project scheduling, compliance checks, site reporting, and subcontractor coordination for construction teams.',
    icon: '🏗️',
    skills: [
      { slug: 'developer-agent', name: 'developer-agent', reason: 'Top-rated agent skill with 797 downloads' }, { slug: 'agent-toolkit', name: 'agent toolkit', reason: 'Top-rated agent skill with 426 downloads' }, { slug: 'agent-ops-framework', name: 'agent ops framework', reason: 'Top-rated agent skill with 402 downloads' }, { slug: 'agent-learner', name: 'agent learner', reason: 'Top-rated agent skill with 337 downloads' }
    ],
    searchLink: '/skills?q=construction+ai+agent',
  },
{
    slug: 'legal-ai-agent',
    title: 'Legal AI Agent',
    description: 'An AI agent that assists lawyers and legal professionals with research, document review, case analysis, and compliance checks.',
    icon: '⚖️',
    skills: [
      { slug: 'agent-toolkit', name: 'agent toolkit', reason: 'Top-rated agent skill with 426 downloads' }, { slug: 'legal-advisor', name: 'legal advisor', reason: 'Top-rated legal skill with 1126 downloads' }, { slug: 'precedent', name: 'Precedent — Legal Precedent Reference', reason: 'Top-rated legal skill with 100 downloads' }, { slug: 'agent-ops-framework', name: 'agent ops framework', reason: 'Top-rated agent skill with 402 downloads' }, { slug: 'developer-agent', name: 'developer-agent', reason: 'Top-rated agent skill with 797 downloads' }
    ],
    searchLink: '/skills?q=legal+ai',
  },
{
    slug: 'logistics-ai-agent',
    title: 'Logistics AI Agent',
    description: 'An AI agent that optimizes supply chain operations, route planning, inventory forecasting, and carrier coordination.',
    icon: '🚚',
    skills: [
      { slug: 'developer-agent', name: 'developer-agent', reason: 'Top-rated agent skill with 797 downloads' }, { slug: 'agent-toolkit', name: 'agent toolkit', reason: 'Top-rated agent skill with 426 downloads' }, { slug: 'agent-ops-framework', name: 'agent ops framework', reason: 'Top-rated agent skill with 402 downloads' }, { slug: 'agent-learner', name: 'agent learner', reason: 'Top-rated agent skill with 337 downloads' }
    ],
    searchLink: '/skills?q=logistics+ai',
  },
{
    slug: 'manufacturing-ai-agent',
    title: 'Manufacturing AI Agent',
    description: 'An AI agent that supports production planning, quality control, predictive maintenance, and shop-floor workflow automation.',
    icon: '🏭',
    skills: [
      { slug: 'developer-agent', name: 'developer-agent', reason: 'Top-rated agent skill with 797 downloads' }, { slug: 'agent-toolkit', name: 'agent toolkit', reason: 'Top-rated agent skill with 426 downloads' }, { slug: 'agent-ops-framework', name: 'agent ops framework', reason: 'Top-rated agent skill with 402 downloads' }, { slug: 'agent-learner', name: 'agent learner', reason: 'Top-rated agent skill with 337 downloads' }
    ],
    searchLink: '/skills?q=manufacturing+ai',
  },
{
    slug: 'medical-ai-agent',
    title: 'Medical AI Agent',
    description: 'An AI agent that aids clinicians and researchers with clinical documentation, literature synthesis, patient cohort analysis, and regulatory documentation support.',
    icon: '🏥',
    skills: [
      { slug: 'agent-learner', name: 'agent learner', reason: 'Top-rated agent skill with 337 downloads' }, { slug: 'developer-agent', name: 'developer-agent', reason: 'Top-rated agent skill with 797 downloads' }, { slug: 'agent-toolkit', name: 'agent toolkit', reason: 'Top-rated agent skill with 426 downloads' }, { slug: 'agent-ops-framework', name: 'agent ops framework', reason: 'Top-rated agent skill with 402 downloads' }
    ],
    searchLink: '/skills?q=medical+ai',
  },
{
    slug: 'meeting-ai-agent',
    title: 'Meeting AI Agent',
    description: 'An AI agent that joins, transcribes, summarizes, and action-items virtual meetings.',
    icon: '📅',
    skills: [
      { slug: 'meeting-agenda', name: 'Meeting Agenda', reason: 'Top-rated meeting skill with 360 downloads' }, { slug: 'developer-agent', name: 'developer-agent', reason: 'Top-rated agent skill with 797 downloads' }, { slug: 'agent-toolkit', name: 'agent toolkit', reason: 'Top-rated agent skill with 426 downloads' }, { slug: 'agent-ops-framework', name: 'agent ops framework', reason: 'Top-rated agent skill with 402 downloads' }, { slug: 'agent-learner', name: 'agent learner', reason: 'Top-rated agent skill with 337 downloads' }
    ],
    searchLink: '/skills?q=meeting+transcribe+summarize+action+items',
  },
{
    slug: 'monitoring-ai-agent',
    title: 'Monitoring AI Agent',
    description: 'An AI agent that continuously observes system metrics, logs, or workflows and triggers alerts or remediations.',
    icon: '📡',
    skills: [
      { slug: 'developer-agent', name: 'developer-agent', reason: 'Top-rated agent skill with 797 downloads' }, { slug: 'agent-toolkit', name: 'agent toolkit', reason: 'Top-rated agent skill with 426 downloads' }, { slug: 'agent-ops-framework', name: 'agent ops framework', reason: 'Top-rated agent skill with 402 downloads' }, { slug: 'agent-learner', name: 'agent learner', reason: 'Top-rated agent skill with 337 downloads' }
    ],
    searchLink: '/skills?q=monitor+alert+log+anomaly+detect',
  },
{
    slug: 'news-ai-agent',
    title: 'News AI Agent',
    description: 'An AI agent that tracks, filters, summarizes, and delivers personalized news from diverse sources.',
    icon: '📰',
    skills: [
      { slug: 'crypto-news-feed', name: 'Crypto News Feed', reason: 'Top-rated news skill with 375 downloads' }, { slug: 'newsletter-writer', name: 'newsletter writer', reason: 'Top-rated news skill with 347 downloads' }, { slug: 'developer-agent', name: 'developer-agent', reason: 'Top-rated agent skill with 797 downloads' }, { slug: 'agent-toolkit', name: 'agent toolkit', reason: 'Top-rated agent skill with 426 downloads' }, { slug: 'agent-ops-framework', name: 'agent ops framework', reason: 'Top-rated agent skill with 402 downloads' }
    ],
    searchLink: '/skills?q=news+aggregate+summarize+personalize+alert',
  },
{
    slug: 'nlp-ai-agent',
    title: 'NLP AI Agent',
    description: 'An AI agent specialized in natural language processing tasks like parsing, classification, sentiment analysis, and generation.',
    icon: '💬',
    skills: [
      { slug: 'developer-agent', name: 'developer-agent', reason: 'Top-rated agent skill with 797 downloads' }, { slug: 'agent-toolkit', name: 'agent toolkit', reason: 'Top-rated agent skill with 426 downloads' }, { slug: 'agent-ops-framework', name: 'agent ops framework', reason: 'Top-rated agent skill with 402 downloads' }, { slug: 'agent-learner', name: 'agent learner', reason: 'Top-rated agent skill with 337 downloads' }
    ],
    searchLink: '/skills?q=nlp+parse+sentiment+classify+generate',
  },
{
    slug: 'onboarding-ai-agent',
    title: 'Onboarding AI Agent',
    description: 'An AI agent that guides new hires or users through setup, training, documentation, and first tasks.',
    icon: '👋',
    skills: [
      { slug: 'developer-agent', name: 'developer-agent', reason: 'Top-rated agent skill with 797 downloads' }, { slug: 'agent-toolkit', name: 'agent toolkit', reason: 'Top-rated agent skill with 426 downloads' }, { slug: 'agent-ops-framework', name: 'agent ops framework', reason: 'Top-rated agent skill with 402 downloads' }, { slug: 'agent-learner', name: 'agent learner', reason: 'Top-rated agent skill with 337 downloads' }
    ],
    searchLink: '/skills?q=onboard+guide+training+setup+welcome',
  },
{
    slug: 'accounting-ai-agent',
    title: 'Accounting AI Agent',
    description: 'An AI agent that automates financial reporting, reconciliations, and compliance tasks for accountants.',
    icon: '📊',
    skills: [
      { slug: 'developer-agent', name: 'developer-agent', reason: 'Top-rated agent skill with 797 downloads' }, { slug: 'agent-toolkit', name: 'agent toolkit', reason: 'Top-rated agent skill with 426 downloads' }, { slug: 'agent-ops-framework', name: 'agent ops framework', reason: 'Top-rated agent skill with 402 downloads' }, { slug: 'agent-learner', name: 'agent learner', reason: 'Top-rated agent skill with 337 downloads' }
    ],
    searchLink: '/skills?q=ai+accounting+finance',
  },
{
    slug: 'app-dev-ai-agent',
    title: 'App Development AI',
    description: 'An AI agent that accelerates full-stack application development with code generation, testing, and deployment support.',
    icon: '📱',
    skills: [
      { slug: 'system-data-intelligence-skill', name: 'It is designed for scenarios that requir', reason: 'Highly-rated productivity skill' }
    ],
    searchLink: '/skills?q=ai+app+development',
  },
{
    slug: 'architecture-design-ai-agent',
    title: 'Architecture Design AI',
    description: 'An AI agent that assists software architects in designing scalable, secure, and cloud-native system architectures.',
    icon: '🏗️',
    skills: [
      { slug: 'database-design', name: 'database design', reason: 'Top-rated design skill with 1012 downloads' }, { slug: 'system-data-intelligence-skill', name: 'It is designed for scenarios that requir', reason: 'Top-rated design skill with 885 downloads' }
    ],
    searchLink: '/skills?q=ai+system+architecture',
  },
{
    slug: 'automation-testing-ai-agent',
    title: 'Testing Automation AI',
    description: 'An AI agent that writes, maintains, and executes automated test suites across UI, API, and integration layers.',
    icon: '🧪',
    skills: [
      { slug: 'system-data-intelligence-skill', name: 'It is designed for scenarios that requir', reason: 'Highly-rated productivity skill' }
    ],
    searchLink: '/skills?q=ai+test+automation',
  },
{
    slug: 'bookkeeping-ai-agent',
    title: 'Bookkeeping AI Agent',
    description: 'An AI agent that handles day-to-day bookkeeping tasks including transaction categorization, bank reconciliation, and tax prep support.',
    icon: '📒',
    skills: [
      { slug: 'beancount', name: 'bookkeeping', reason: 'Top-rated bookkeeping skill with 262 downloads' }, { slug: 'agent-learner', name: 'agent learner', reason: 'Top-rated agent skill with 337 downloads' }, { slug: 'developer-agent', name: 'developer-agent', reason: 'Top-rated agent skill with 797 downloads' }, { slug: 'agent-toolkit', name: 'agent toolkit', reason: 'Top-rated agent skill with 426 downloads' }, { slug: 'agent-ops-framework', name: 'agent ops framework', reason: 'Top-rated agent skill with 402 downloads' }
    ],
    searchLink: '/skills?q=ai+bookkeeping',
  },
{
    slug: 'business-analyst-ai-agent',
    title: 'Business Analyst Agent',
    description: 'An AI agent that transforms raw data into strategic insights, requirements, and stakeholder-ready documentation.',
    icon: '📊',
    skills: [
      { slug: 'business-plan-cn', name: 'business plan cn', reason: 'Top-rated business skill with 479 downloads' }, { slug: 'analyst', name: 'Analyst', reason: 'Top-rated analyst skill with 2041 downloads' }, { slug: 'data-analyst-cn', name: 'Data Analyst Cn', reason: 'Top-rated analyst skill with 999 downloads' }, { slug: 'ai-data-analyst-cn', name: 'Ai Data Analyst Cn', reason: 'Top-rated analyst skill with 788 downloads' }, { slug: 'data-analyst-pro', name: 'Data Analyst', reason: 'Top-rated analyst skill with 3316 downloads' }
    ],
    searchLink: '/skills?q=data-analysis+report-generator+sql-assistant+note-taker+chart-generator',
  },
{
    slug: 'calling-ai-agent',
    title: 'Calling Assistant',
    description: 'An AI agent that handles inbound/outbound voice calls with real-time transcription, intent detection, and dynamic response generation.',
    icon: '📞',
    skills: [
      { slug: 'homeassistant-toolkit', name: 'Homeassistant Toolkit', reason: 'Top-rated assistant skill with 371 downloads' }, { slug: 'system-data-intelligence-skill', name: 'It is designed for scenarios that requir', reason: 'Highly-rated productivity skill' }
    ],
    searchLink: '/skills?q=support-bot+scheduler+slack-notifier+note-taker+translator-pro',
  },
{
    slug: 'code-review-ai-agent',
    title: 'Code Review Assistant',
    description: 'An AI agent that performs automated, context-aware code reviews with style enforcement, bug detection, and PR-ready feedback.',
    icon: '👨‍💻',
    skills: [
      { slug: 'code-generator', name: 'code generator', reason: 'Top-rated code skill with 1683 downloads' }, { slug: 'ai-code-helper', name: 'ai code helper', reason: 'Top-rated code skill with 264 downloads' }, { slug: 'code-searcher', name: 'code searcher', reason: 'Top-rated code skill with 264 downloads' }, { slug: 'codepal', name: 'codepal', reason: 'Top-rated code skill with 223 downloads' }, { slug: 'encode', name: 'encode', reason: 'Top-rated code skill with 207 downloads' }
    ],
    searchLink: '/skills?q=code-reviewer+github-assistant+sql-assistant+shell+report-generator',
  },
{
    slug: 'design-ai-agent',
    title: 'Design AI Agent',
    description: 'An AI agent that assists with graphic design, UI/UX prototyping, and visual asset generation.',
    icon: '🎨',
    skills: [
      { slug: 'database-design', name: 'database design', reason: 'Top-rated design skill with 1012 downloads' }, { slug: 'system-data-intelligence-skill', name: 'It is designed for scenarios that requir', reason: 'Top-rated design skill with 885 downloads' }, { slug: 'developer-agent', name: 'developer-agent', reason: 'Top-rated agent skill with 797 downloads' }, { slug: 'agent-toolkit', name: 'agent toolkit', reason: 'Top-rated agent skill with 426 downloads' }, { slug: 'agent-ops-framework', name: 'agent ops framework', reason: 'Top-rated agent skill with 402 downloads' }
    ],
    searchLink: '/skills?q=design+ai+agent',
  },
{
    slug: 'ecommerce-ai-agent',
    title: 'E-commerce AI Agent',
    description: 'An AI agent that automates product listing, inventory sync, review analysis, and personalized recommendations.',
    icon: '🛒',
    skills: [
      { slug: 'agent-ops-framework', name: 'agent ops framework', reason: 'Top-rated agent skill with 402 downloads' }, { slug: 'agent-learner', name: 'agent learner', reason: 'Top-rated agent skill with 337 downloads' }, { slug: 'developer-agent', name: 'developer-agent', reason: 'Top-rated agent skill with 797 downloads' }, { slug: 'agent-toolkit', name: 'agent toolkit', reason: 'Top-rated agent skill with 426 downloads' }
    ],
    searchLink: '/skills?q=ecommerce+ai+agent',
  },
{
    slug: 'education-ai-agent',
    title: 'Education AI Agent',
    description: 'An AI agent that tutors students, generates lesson plans, grades assignments, and adapts to learning styles.',
    icon: '📚',
    skills: [
      { slug: 'education', name: 'education', reason: 'Top-rated education skill with 601 downloads' }, { slug: 'agent-learner', name: 'agent learner', reason: 'Top-rated agent skill with 337 downloads' }, { slug: 'developer-agent', name: 'developer-agent', reason: 'Top-rated agent skill with 797 downloads' }, { slug: 'agent-toolkit', name: 'agent toolkit', reason: 'Top-rated agent skill with 426 downloads' }, { slug: 'agent-ops-framework', name: 'agent ops framework', reason: 'Top-rated agent skill with 402 downloads' }
    ],
    searchLink: '/skills?q=education+ai+agent',
  },
{
    slug: 'email-ai-agent',
    title: 'Email AI Agent',
    description: 'An AI agent that drafts, prioritizes, categorizes, and follows up on professional email communication.',
    icon: '✉️',
    skills: [
      { slug: 'developer-agent', name: 'developer-agent', reason: 'Top-rated agent skill with 797 downloads' }, { slug: 'email-template', name: 'email-template', reason: 'Top-rated email skill with 307 downloads' }, { slug: 'agent-toolkit', name: 'agent toolkit', reason: 'Top-rated agent skill with 426 downloads' }, { slug: 'agent-ops-framework', name: 'agent ops framework', reason: 'Top-rated agent skill with 402 downloads' }, { slug: 'agent-learner', name: 'agent learner', reason: 'Top-rated agent skill with 337 downloads' }
    ],
    searchLink: '/skills?q=email+ai+agent',
  },
{
    slug: 'engineering-ai-agent',
    title: 'Engineering AI Agent',
    description: 'An AI agent that supports software and systems engineering through code assistance, architecture review, and infrastructure monitoring.',
    icon: '⚙️',
    skills: [
      { slug: 'developer-agent', name: 'developer-agent', reason: 'Top-rated agent skill with 797 downloads' }, { slug: 'agent-toolkit', name: 'agent toolkit', reason: 'Top-rated agent skill with 426 downloads' }, { slug: 'agent-ops-framework', name: 'agent ops framework', reason: 'Top-rated agent skill with 402 downloads' }, { slug: 'agent-learner', name: 'agent learner', reason: 'Top-rated agent skill with 337 downloads' }
    ],
    searchLink: '/skills?q=engineering+ai+agent',
  },
{
    slug: 'ai-agent-for-accounting',
    title: 'AI Accounting Assistant',
    description: 'Automates financial tasks and ensures accuracy in accounting processes.',
    icon: 'e',
    skills: [
      { slug: 'homeassistant-toolkit', name: 'Homeassistant Toolkit', reason: 'Top-rated assistant skill with 371 downloads' }, { slug: 'system-data-intelligence-skill', name: 'It is designed for scenarios that requir', reason: 'Highly-rated productivity skill' }
    ],
    searchLink: '/skills?q=ai-agent-for-accounting',
  },
{
    slug: 'ai-agent-for-app-development',
    title: 'AI App Development Assistant',
    description: 'Assists in building and managing software applications.',
    icon: 'e',
    skills: [
      { slug: 'homeassistant-toolkit', name: 'Homeassistant Toolkit', reason: 'Top-rated assistant skill with 371 downloads' }, { slug: 'system-data-intelligence-skill', name: 'It is designed for scenarios that requir', reason: 'Highly-rated productivity skill' }
    ],
    searchLink: '/skills?q=ai-agent-for-app-development',
  },
{
    slug: 'ai-agent-for-architecture-design',
    title: 'AI Architecture Designer',
    description: 'Supports in creating and optimizing architectural designs.',
    icon: 'e',
    skills: [
      { slug: 'system-data-intelligence-skill', name: 'It is designed for scenarios that requir', reason: 'Highly-rated productivity skill' }
    ],
    searchLink: '/skills?q=ai-agent-for-architecture-design',
  },
{
    slug: 'ai-agent-for-bookkeeping',
    title: 'AI Bookkeeping Assistant',
    description: 'Automates and manages daily financial records.',
    icon: 'e',
    skills: [
      { slug: 'beancount', name: 'bookkeeping', reason: 'Top-rated bookkeeping skill with 262 downloads' }, { slug: 'homeassistant-toolkit', name: 'Homeassistant Toolkit', reason: 'Top-rated assistant skill with 371 downloads' }, { slug: 'system-data-intelligence-skill', name: 'It is designed for scenarios that requir', reason: 'Highly-rated productivity skill' }
    ],
    searchLink: '/skills?q=ai-agent-for-bookkeeping',
  },
{
    slug: 'ai-agent-for-bug-bounty',
    title: 'AI Bug Bounty Analyst',
    description: 'Identifies and manages security vulnerabilities in software.',
    icon: 'e',
    skills: [
      { slug: 'data-analyst-pro', name: 'Data Analyst', reason: 'Top-rated analyst skill with 3316 downloads' }, { slug: 'analyst', name: 'Analyst', reason: 'Top-rated analyst skill with 2041 downloads' }, { slug: 'data-analyst-cn', name: 'Data Analyst Cn', reason: 'Top-rated analyst skill with 999 downloads' }, { slug: 'ai-data-analyst-cn', name: 'Ai Data Analyst Cn', reason: 'Top-rated analyst skill with 788 downloads' }
    ],
    searchLink: '/skills?q=ai-agent-for-bug-bounty',
  },
{
    slug: 'ai-agent-for-business-analyst',
    title: 'AI Agent for Business Analyst',
    description: 'Automates data analysis and decision-making for business insights.',
    icon: 'e',
    skills: [
      { slug: 'business-plan-cn', name: 'business plan cn', reason: 'Top-rated business skill with 479 downloads' }, { slug: 'developer-agent', name: 'developer-agent', reason: 'Top-rated agent skill with 797 downloads' }, { slug: 'agent-toolkit', name: 'agent toolkit', reason: 'Top-rated agent skill with 426 downloads' }, { slug: 'agent-ops-framework', name: 'agent ops framework', reason: 'Top-rated agent skill with 402 downloads' }, { slug: 'agent-learner', name: 'agent learner', reason: 'Top-rated agent skill with 337 downloads' }
    ],
    searchLink: '/skills?q=ai-agent-for-business-analyst',
  },
{
    slug: 'ai-agent-for-calling',
    title: 'AI Agent for Calling',
    description: 'Automates and optimizes outbound calling processes.',
    icon: 'e',
    skills: [
      { slug: 'developer-agent', name: 'developer-agent', reason: 'Top-rated agent skill with 797 downloads' }, { slug: 'agent-toolkit', name: 'agent toolkit', reason: 'Top-rated agent skill with 426 downloads' }, { slug: 'agent-ops-framework', name: 'agent ops framework', reason: 'Top-rated agent skill with 402 downloads' }, { slug: 'agent-learner', name: 'agent learner', reason: 'Top-rated agent skill with 337 downloads' }
    ],
    searchLink: '/skills?q=ai-agent-for-calling',
  },
{
    slug: 'ai-agent-for-cold-calling',
    title: 'AI Agent for Cold Calling',
    description: 'Streamlines and improves the efficiency of cold calling campaigns.',
    icon: 'e',
    skills: [
      { slug: 'developer-agent', name: 'developer-agent', reason: 'Top-rated agent skill with 797 downloads' }, { slug: 'agent-toolkit', name: 'agent toolkit', reason: 'Top-rated agent skill with 426 downloads' }, { slug: 'agent-ops-framework', name: 'agent ops framework', reason: 'Top-rated agent skill with 402 downloads' }, { slug: 'agent-learner', name: 'agent learner', reason: 'Top-rated agent skill with 337 downloads' }
    ],
    searchLink: '/skills?q=ai-agent-for-cold-calling',
  },
{
    slug: 'ai-agent-for-construction',
    title: 'AI Agent for Construction',
    description: 'Optimizes project management and resource allocation in construction.',
    icon: 'e',
    skills: [
      { slug: 'developer-agent', name: 'developer-agent', reason: 'Top-rated agent skill with 797 downloads' }, { slug: 'agent-toolkit', name: 'agent toolkit', reason: 'Top-rated agent skill with 426 downloads' }, { slug: 'agent-ops-framework', name: 'agent ops framework', reason: 'Top-rated agent skill with 402 downloads' }, { slug: 'agent-learner', name: 'agent learner', reason: 'Top-rated agent skill with 337 downloads' }
    ],
    searchLink: '/skills?q=ai-agent-for-construction',
  },
{
    slug: 'ai-agent-for-data-entry',
    title: 'AI Agent for Data Entry',
    description: 'Automates and verifies data input processes.',
    icon: 'e',
    skills: [
      { slug: 'data-analysis', name: 'Data Analysis', reason: 'Top-rated data skill with 19813 downloads' }, { slug: 'developer-agent', name: 'developer-agent', reason: 'Top-rated agent skill with 797 downloads' }, { slug: 'agent-toolkit', name: 'agent toolkit', reason: 'Top-rated agent skill with 426 downloads' }, { slug: 'agent-ops-framework', name: 'agent ops framework', reason: 'Top-rated agent skill with 402 downloads' }, { slug: 'agent-learner', name: 'agent learner', reason: 'Top-rated agent skill with 337 downloads' }
    ],
    searchLink: '/skills?q=ai-agent-for-data-entry',
  },
{
    slug: 'ai-agent-for-photography',
    title: 'Photography AI Agent',
    description: 'An AI agent that assists with photo editing, composition, and visual storytelling.',
    icon: 'e',
    skills: [
      { slug: 'developer-agent', name: 'developer-agent', reason: 'Top-rated agent skill with 797 downloads' }, { slug: 'agent-toolkit', name: 'agent toolkit', reason: 'Top-rated agent skill with 426 downloads' }, { slug: 'agent-ops-framework', name: 'agent ops framework', reason: 'Top-rated agent skill with 402 downloads' }, { slug: 'agent-learner', name: 'agent learner', reason: 'Top-rated agent skill with 337 downloads' }
    ],
    searchLink: '/skills?q=ai-agent-for-photography',
  },
{
    slug: 'ai-agent-for-python',
    title: 'Python AI Agent',
    description: 'An AI agent focused on Python programming, debugging, and development assistance.',
    icon: 'e',
    skills: [
      { slug: 'developer-agent', name: 'developer-agent', reason: 'Top-rated agent skill with 797 downloads' }, { slug: 'agent-toolkit', name: 'agent toolkit', reason: 'Top-rated agent skill with 426 downloads' }, { slug: 'agent-ops-framework', name: 'agent ops framework', reason: 'Top-rated agent skill with 402 downloads' }, { slug: 'agent-learner', name: 'agent learner', reason: 'Top-rated agent skill with 337 downloads' }
    ],
    searchLink: '/skills?q=ai-agent-for-python',
  },
{
    slug: 'ai-agent-for-real-estate',
    title: 'Real Estate AI Agent',
    description: 'An AI agent that supports real estate research, property analysis, and market insights.',
    icon: 'e',
    skills: [
      { slug: 'agent-learner', name: 'agent learner', reason: 'Top-rated agent skill with 337 downloads' }, { slug: 'developer-agent', name: 'developer-agent', reason: 'Top-rated agent skill with 797 downloads' }, { slug: 'agent-toolkit', name: 'agent toolkit', reason: 'Top-rated agent skill with 426 downloads' }, { slug: 'agent-ops-framework', name: 'agent ops framework', reason: 'Top-rated agent skill with 402 downloads' }
    ],
    searchLink: '/skills?q=ai-agent-for-real-estate',
  },
{
    slug: 'cybersecurity-ai-agent',
    title: 'AI Agent for Cybersecurity',
    description: 'An AI agent designed to detect, analyze, and respond to cybersecurity threats in real-time.',
    icon: '🛡️',
    skills: [
      { slug: 'developer-agent', name: 'developer-agent', reason: 'Top-rated agent skill with 797 downloads' }, { slug: 'agent-toolkit', name: 'agent toolkit', reason: 'Top-rated agent skill with 426 downloads' }, { slug: 'agent-ops-framework', name: 'agent ops framework', reason: 'Top-rated agent skill with 402 downloads' }, { slug: 'agent-learner', name: 'agent learner', reason: 'Top-rated agent skill with 337 downloads' }
    ],
    searchLink: '/skills?q=cybersecurity',
  },
{
    slug: 'ai-agent-for-deployment',
    title: 'Deployment Automation Assistant',
    description: 'Streamlines and automates software deployment processes with intelligent decision-making.',
    icon: '🚀',
    skills: [
      { slug: 'homeassistant-toolkit', name: 'Homeassistant Toolkit', reason: 'Top-rated assistant skill with 371 downloads' }, { slug: 'system-data-intelligence-skill', name: 'It is designed for scenarios that requir', reason: 'Highly-rated productivity skill' }
    ],
    searchLink: '/skills?q=deployment',
  },
{
    slug: 'ai-agent-for-ecommerce',
    title: 'E-commerce Assistant',
    description: 'An AI agent that helps manage and optimize e-commerce operations.',
    icon: '🛒',
    skills: [
      { slug: 'homeassistant-toolkit', name: 'Homeassistant Toolkit', reason: 'Top-rated assistant skill with 371 downloads' }, { slug: 'system-data-intelligence-skill', name: 'It is designed for scenarios that requir', reason: 'Highly-rated productivity skill' }
    ],
    searchLink: '/skills?q=ecommerce',
  },
{
    slug: 'enterprise-ai-assistant',
    title: 'Enterprise AI Assistant',
    description: 'An AI agent designed to streamline operations, enhance productivity, and support decision-making in enterprise environments.',
    icon: '🤖',
    skills: [
      { slug: 'homeassistant-toolkit', name: 'Homeassistant Toolkit', reason: 'Top-rated assistant skill with 371 downloads' }, { slug: 'system-data-intelligence-skill', name: 'It is designed for scenarios that requir', reason: 'Highly-rated productivity skill' }
    ],
    searchLink: '/skills?q=enterprise-ai-assistant',
  },
{
    slug: 'finance-ai-agent',
    title: 'Financial Insights Assistant',
    description: 'An AI agent that provides financial analysis, reporting, and decision support.',
    icon: '💰',
    skills: [
      { slug: 'homeassistant-toolkit', name: 'Homeassistant Toolkit', reason: 'Top-rated assistant skill with 371 downloads' }, { slug: 'system-data-intelligence-skill', name: 'It is designed for scenarios that requir', reason: 'Highly-rated productivity skill' }
    ],
    searchLink: '/skills?q=finance',
  },
{
    slug: 'fraud-detection-agent',
    title: 'AI Agent for Fraud Detection',
    description: 'Identifies and prevents fraudulent activities using advanced analytics and machine learning.',
    icon: '🛡️',
    skills: [
      { slug: 'data-analysis', name: 'Data Analysis', reason: 'Analyzes transactional data to detect anomalies and patterns indicative of fraud' }, { slug: 'agent-learner', name: 'agent learner', reason: 'Top-rated agent skill with 337 downloads' }, { slug: 'developer-agent', name: 'developer-agent', reason: 'Top-rated agent skill with 797 downloads' }, { slug: 'agent-toolkit', name: 'agent toolkit', reason: 'Top-rated agent skill with 426 downloads' }, { slug: 'agent-ops-framework', name: 'agent ops framework', reason: 'Top-rated agent skill with 402 downloads' }
    ],
    searchLink: '/skills?q=fraud+detection',
  },
{
    slug: 'ai-agent-for-game-development',
    title: 'Game Development Assistant',
    description: 'An AI agent that helps with game design, scripting, and asset management.',
    icon: '🎮',
    skills: [
      { slug: 'homeassistant-toolkit', name: 'Homeassistant Toolkit', reason: 'Top-rated assistant skill with 371 downloads' }, { slug: 'system-data-intelligence-skill', name: 'It is designed for scenarios that requir', reason: 'Highly-rated productivity skill' }
    ],
    searchLink: '/skills?q=game+development',
  },
{
    slug: 'google-workspace-ai',
    title: 'AI Assistant for Google Workspace',
    description: 'Automate tasks and enhance productivity within Google Workspace with AI-driven assistance.',
    icon: '🤖',
    skills: [
      { slug: 'homeassistant-toolkit', name: 'Homeassistant Toolkit', reason: 'Top-rated assistant skill with 371 downloads' }, { slug: 'system-data-intelligence-skill', name: 'It is designed for scenarios that requir', reason: 'Highly-rated productivity skill' }
    ],
    searchLink: '/skills?q=google+workspace+ai',
  },
{
    slug: 'helpdesk-ai-agent',
    title: 'AI Helpdesk Assistant',
    description: 'An AI agent that handles customer support and technical assistance tasks efficiently.',
    icon: '🤖',
    skills: [
      { slug: 'homeassistant-toolkit', name: 'Homeassistant Toolkit', reason: 'Top-rated assistant skill with 371 downloads' }, { slug: 'data-analysis', name: 'Data Analysis', reason: 'Analyzes user queries and support logs to identify trends and issues.' }, { slug: 'system-data-intelligence-skill', name: 'It is designed for scenarios that requir', reason: 'Highly-rated productivity skill' }
    ],
    searchLink: '/skills?q=helpdesk',
  },
{
    slug: 'image-processing-ai',
    title: 'AI Image Processing Assistant',
    description: 'Automates image enhancement, analysis, and transformation tasks.',
    icon: '🖼️',
    skills: [
      { slug: 'image-prompt', name: 'image prompt', reason: 'Top-rated image skill with 510 downloads' }, { slug: 'image-labeler', name: 'Image Labeler', reason: 'Top-rated image skill with 131 downloads' }, { slug: 'image-processor', name: 'image processor', reason: 'Top-rated image skill with 213 downloads' }, { slug: 'homeassistant-toolkit', name: 'Homeassistant Toolkit', reason: 'Top-rated assistant skill with 371 downloads' }
    ],
    searchLink: '/skills?q=image+processing',
  },
{
    slug: 'insurance-ai-agent',
    title: 'AI Agent for Insurance',
    description: 'Assists with insurance-related tasks using AI technology.',
    icon: '🛡️',
    skills: [
      { slug: 'insurance-advisor', name: 'insurance advisor', reason: 'Top-rated insurance skill with 416 downloads' }, { slug: 'developer-agent', name: 'developer-agent', reason: 'Top-rated agent skill with 797 downloads' }, { slug: 'agent-toolkit', name: 'agent toolkit', reason: 'Top-rated agent skill with 426 downloads' }, { slug: 'agent-ops-framework', name: 'agent ops framework', reason: 'Top-rated agent skill with 402 downloads' }, { slug: 'agent-learner', name: 'agent learner', reason: 'Top-rated agent skill with 337 downloads' }
    ],
    searchLink: '/skills?q=insurance',
  },
{
    slug: 'inventory-ai-agent',
    title: 'Smart Inventory Management',
    description: 'An AI agent that helps track, analyze, and optimize inventory levels.',
    icon: '📦',
    skills: [
      { slug: 'freedcamp-agent-skill', name: 'Freedcamp Project Management', reason: 'Top-rated management skill with 1257 downloads' }, { slug: 'smart-lights', name: 'smart lights', reason: 'Top-rated smart skill with 119 downloads' }, { slug: 'inventory-manager', name: 'Inventory Manager', reason: 'Coordinate and manage agent teams for complex collaborative tasks' }
    ],
    searchLink: '/skills?q=inventory',
  },
{
    slug: 'jira-ai-assistant',
    title: 'Jira AI Assistant',
    description: 'An AI agent that helps manage Jira tasks, issues, and workflows efficiently.',
    icon: '🛠️',
    skills: [
      { slug: 'homeassistant-toolkit', name: 'Homeassistant Toolkit', reason: 'Top-rated assistant skill with 371 downloads' }, { slug: 'system-data-intelligence-skill', name: 'It is designed for scenarios that requir', reason: 'Highly-rated productivity skill' }
    ],
    searchLink: '/skills?q=jira+ai',
  },
{
    slug: 'video-ai-agent',
    title: 'AI Assistant for Video Tasks',
    description: 'An AI agent that helps with video creation, editing, and analysis.',
    icon: '🎥',
    skills: [
      { slug: 'homeassistant-toolkit', name: 'Homeassistant Toolkit', reason: 'Top-rated assistant skill with 371 downloads' }, { slug: 'video-toolbox', name: 'video toolbox', reason: 'Top-rated video skill with 359 downloads' }, { slug: 'video-fetcher', name: 'Video Fetcher', reason: 'Top-rated video skill with 101 downloads' }, { slug: 'system-data-intelligence-skill', name: 'It is designed for scenarios that requir', reason: 'Top-rated tasks skill with 885 downloads' }
    ],
    searchLink: '/skills?q=video',
  },
{
    slug: 'website-ai-agent',
    title: 'AI Assistant for Website Management',
    description: 'An AI agent that helps manage and optimize website content, performance, and user engagement.',
    icon: '🌐',
    skills: [
      { slug: 'homeassistant-toolkit', name: 'Homeassistant Toolkit', reason: 'Top-rated assistant skill with 371 downloads' }, { slug: 'freedcamp-agent-skill', name: 'Freedcamp Project Management', reason: 'Top-rated management skill with 1257 downloads' }, { slug: 'system-data-intelligence-skill', name: 'It is designed for scenarios that requir', reason: 'Highly-rated productivity skill' }
    ],
    searchLink: '/skills?q=website',
  },
{
    slug: 'logistics-optimizer',
    title: 'AI Agent for Logistics',
    description: 'Streamlines supply chain and delivery operations with intelligent automation.',
    icon: '🚚',
    skills: [
      { slug: 'developer-agent', name: 'developer-agent', reason: 'Top-rated agent skill with 797 downloads' }, { slug: 'agent-toolkit', name: 'agent toolkit', reason: 'Top-rated agent skill with 426 downloads' }, { slug: 'agent-ops-framework', name: 'agent ops framework', reason: 'Top-rated agent skill with 402 downloads' }, { slug: 'agent-learner', name: 'agent learner', reason: 'Top-rated agent skill with 337 downloads' }
    ],
    searchLink: '/skills?q=logistics',
  },
{
    slug: 'data-science-ai',
    title: 'AI Agent for Data Science',
    description: 'An AI agent that assists with data science tasks, including analysis, visualization, and modeling.',
    icon: '🧠',
    skills: [
      { slug: 'agent-learner', name: 'agent learner', reason: 'Top-rated agent skill with 337 downloads' }, { slug: 'developer-agent', name: 'developer-agent', reason: 'Top-rated agent skill with 797 downloads' }, { slug: 'data-cog', name: 'Data Cog', reason: 'Cognitive data processing for complex analytical and pattern recognition tasks' }, { slug: 'agent-toolkit', name: 'agent toolkit', reason: 'Top-rated agent skill with 426 downloads' }, { slug: 'agent-ops-framework', name: 'agent ops framework', reason: 'Top-rated agent skill with 402 downloads' }
    ],
    searchLink: '/skills?q=data+science',
  },
{
    slug: 'python-ai-helper',
    title: 'AI Assistant for Python',
    description: 'An AI agent that helps with Python development tasks, code generation, and problem solving.',
    icon: '🐍',
    skills: [
      { slug: 'homeassistant-toolkit', name: 'Homeassistant Toolkit', reason: 'Top-rated assistant skill with 371 downloads' }, { slug: 'system-data-intelligence-skill', name: 'It is designed for scenarios that requir', reason: 'Highly-rated productivity skill' }
    ],
    searchLink: '/skills?q=python',
  }
]
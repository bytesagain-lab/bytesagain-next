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
    skills: [{ slug: 'health-mate', name: 'Health Mate', reason: 'Essential health & wellness tool — Health Mate helps you get the job done' }, { slug: 'health-manager', name: 'Health Manager', reason: 'Essential health & wellness tool — Health Manager helps you get the job done' }, { slug: 'health-data-analyzer', name: 'Health Data Analyzer', reason: 'Essential health & wellness tool — Health Data Analyzer helps you get the job done' }, { slug: 'garmin-health-analysis', name: 'Garmin Health Analysis', reason: 'Essential health & wellness tool — Garmin Health Analysis helps you get the job done' }, { slug: 'whoop-health-analysis', name: 'Whoop', reason: 'Essential health & wellness tool — Whoop helps you get the job done' }],
    searchLink: '/skills?q=health+fitness+wellness',
  },
{
    slug: 'grant-deadline-guardian',
    title: 'Never Miss Grant Deadlines',
    description: 'Monitors government and foundation grant portals, parses deadlines, and sends proactive alerts with application prep steps.',
    icon: '⏰',
    skills: [{ slug: 'grant', name: 'Grant', reason: 'Essential never miss grant deadlines tool — Grant helps you get the job done' }, { slug: 'deadline', name: 'deadline', reason: 'Essential never miss grant deadlines tool — deadline helps you get the job done' }, { slug: 'afrexai-grant-writer', name: 'Grant Writer', reason: 'Essential never miss grant deadlines tool — Grant Writer helps you get the job done' }, { slug: 'guardian-wall-azzar', name: 'Guardian Wall', reason: 'Essential never miss grant deadlines tool — Guardian Wall helps you get the job done' }, { slug: 'guardian-angel-protocol', name: 'Guardian Angel Protocol', reason: 'Essential never miss grant deadlines tool — Guardian Angel Protocol helps you get the job done' }],
    searchLink: '/skills?q=deadline+monitoring+grant+application+calendar',
  },
{
    slug: 'incident-responder',
    title: 'Auto-Resolve DevOps Incidents',
    description: 'Analyzes alert logs, correlates errors across tools, executes runbook actions, and documents resolution in real time.',
    icon: '🚨',
    skills: [{ slug: 'incident-pcn-evidence-appeal-corrective-actions-uk', name: 'Incident & PCN Handling Pack (UK)', reason: 'Essential auto-resolve devops incidents tool — Incident & PCN Handling Pack (UK) helps you get the job done' }, { slug: 'devops-bridge', name: 'DevOps Bridge', reason: 'Essential auto-resolve devops incidents tool — DevOps Bridge helps you get the job done' }, { slug: 'incident-hotfix', name: 'Incident Hotfix', reason: 'Essential auto-resolve devops incidents tool — Incident Hotfix helps you get the job done' }, { slug: 'devops-bash-tools', name: 'devops bash tools', reason: 'Essential auto-resolve devops incidents tool — devops bash tools helps you get the job done' }, { slug: 'incident-replay', name: 'Incident Replay', reason: 'Essential auto-resolve devops incidents tool — Incident Replay helps you get the job done' }],
    searchLink: '/skills?q=devops+incident+response+pagerduty+prometheus',
  },
{
    slug: 'airbnb-host-orchestrator',
    title: 'Automate Airbnb Guest Journeys',
    description: 'Manages end-to-end guest communication, dynamic pricing, cleaning coordination, and review requests across platforms.',
    icon: '🏡',
    skills: [{ slug: 'airbnb-search', name: 'Airbnb Search', reason: 'Essential automate airbnb guest journeys tool — Airbnb Search helps you get the job done' }, { slug: 'host-hardening', name: 'Host Hardening', reason: 'Essential automate airbnb guest journeys tool — Host Hardening helps you get the job done' }, { slug: 'host-security-audit', name: 'Host Security Audit', reason: 'Essential automate airbnb guest journeys tool — Host Security Audit helps you get the job done' }, { slug: 'clawspaces', name: 'ClawSpaces - Live Voice rooms where AI agents Join or Host conversations.', reason: 'Essential automate airbnb guest journeys tool — ClawSpaces - Live Voice rooms where AI agents Join or Host c helps you get the job done' }, { slug: 'fastmode', name: 'FastMode CMS - Host, Deploy, Manage Websites for Free', reason: 'Essential automate airbnb guest journeys tool — FastMode CMS - Host, Deploy, Manage Websites for Free helps you get the job done' }],
    searchLink: '/skills?q=airbnb+host+automation+pricing+cleaning+reviews',
  },
{
    slug: 'video-clipping-director',
    title: 'Turn Long Videos Into Shorts',
    description: 'Watches long-form content, identifies high-engagement moments, clips them, adds captions and hooks, then publishes natively.',
    icon: '✂️',
    skills: [{ slug: 'director', name: 'Directoryahu', reason: 'Essential turn long videos into shorts tool — Directoryahu helps you get the job done' }, { slug: 'video-subtitles', name: 'Video Subtitles', reason: 'Essential turn long videos into shorts tool — Video Subtitles helps you get the job done' }, { slug: 'video-cog', name: 'Video Cog', reason: 'Essential turn long videos into shorts tool — Video Cog helps you get the job done' }, { slug: 'video-agent', name: 'Video Agent (Deprecated)', reason: 'Essential turn long videos into shorts tool — Video Agent (Deprecated) helps you get the job done' }, { slug: 'avatar-video-messages', name: 'Video Messages from your openclaw', reason: 'Essential turn long videos into shorts tool — Video Messages from your openclaw helps you get the job done' }],
    searchLink: '/skills?q=video+clipping+shorts+hook+caption+publishing',
  },
{
    slug: 'ai-chatbot-deployer',
    title: 'Deploy AI Chatbots',
    description: 'Launch domain-specific chatbots that answer questions using your internal documentation and knowledge bases.',
    icon: '🤖',
    skills: [{ slug: 'deploy', name: 'Deploy', reason: 'Essential deploy chatbots tool — Deploy helps you get the job done' }, { slug: 'deploy-moltbot-to-fly', name: 'Deploy Moltbot To Fly', reason: 'Essential deploy chatbots tool — Deploy Moltbot To Fly helps you get the job done' }, { slug: 'warden-studio-deploy', name: 'Deploy Agent on Warden Studio', reason: 'Essential deploy chatbots tool — Deploy Agent on Warden Studio helps you get the job done' }, { slug: 'deploy-pilot', name: 'Deploy Pilot', reason: 'Essential deploy chatbots tool — Deploy Pilot helps you get the job done' }, { slug: 'deploy-public', name: 'Deploy Public', reason: 'Essential deploy chatbots tool — Deploy Public helps you get the job done' }],
    searchLink: '/skills?q=chatbot+knowledge+base',
  },
{
    slug: 'ai-rag-connector',
    title: 'RAG Document Chat',
    description: 'Chat interactively with your PDFs, internal wikis, and databases using retrieval-augmented generation.',
    icon: '📚',
    skills: [{ slug: 'rag-search', name: 'RAG Search', reason: 'Essential rag document chat tool — RAG Search helps you get the job done' }, { slug: 'rag-construction', name: 'Rag Construction', reason: 'Essential rag document chat tool — Rag Construction helps you get the job done' }, { slug: 'raglite-local-rag-cache', name: 'RAGLite', reason: 'Essential rag document chat tool — RAGLite helps you get the job done' }, { slug: 'chat-ui', name: 'Chat Ui', reason: 'Essential rag document chat tool — Chat Ui helps you get the job done' }, { slug: 'mupeng-rag-engineer', name: 'RAG Engineer', reason: 'Essential rag document chat tool — RAG Engineer helps you get the job done' }],
    searchLink: '/skills?q=rag+pdf+chat',
  },
{
    slug: 'ai-summarizer-pro',
    title: 'Auto Summarize Content',
    description: 'Instantly condense emails, meeting transcripts, reports, and web articles into key insights.',
    icon: '✂️',
    skills: [{ slug: 'content-strategy', name: 'Content Strategy', reason: 'Essential auto summarize content tool — Content Strategy helps you get the job done' }, { slug: 'content-creator', name: 'Content Creator', reason: 'Essential auto summarize content tool — Content Creator helps you get the job done' }, { slug: 'content-ideas-generator', name: 'Content Ideas Generator', reason: 'Essential auto summarize content tool — Content Ideas Generator helps you get the job done' }, { slug: 'content-generation', name: 'Content Generation', reason: 'Essential auto summarize content tool — Content Generation helps you get the job done' }, { slug: 'content-id-guide', name: 'Content Id Guide', reason: 'Essential auto summarize content tool — Content Id Guide helps you get the job done' }],
    searchLink: '/skills?q=summarize+email+meeting',
  },
{
    slug: 'content-creator-studio',
    title: 'AI Content Studio',
    description: 'Generate SEO-optimized blog posts, newsletters, and social media captions in seconds.',
    icon: '✍️',
    skills: [{ slug: 'creator', name: 'creator', reason: 'Essential content studio tool — creator helps you get the job done' }, { slug: 'content-creator', name: 'Content Creator', reason: 'Essential content studio tool — Content Creator helps you get the job done' }, { slug: 'content-remix-studio', name: 'Content Remix Studio', reason: 'Essential content studio tool — Content Remix Studio helps you get the job done' }, { slug: 'content-creator-skill', name: 'Content Creator', reason: 'Essential content studio tool — Content Creator helps you get the job done' }, { slug: 'content-strategy', name: 'Content Strategy', reason: 'Essential content studio tool — Content Strategy helps you get the job done' }],
    searchLink: '/skills?q=blog+social+newsletter',
  },
{
    slug: 'crm-sync-orchestrator',
    title: 'CRM Sync Manager',
    description: 'Automatically sync contacts, update deal stages, and log interactions across HubSpot, Salesforce, and Pipedrive.',
    icon: '🔄',
    skills: [{ slug: 'sync', name: 'Sync', reason: 'Essential crm sync manager tool — Sync helps you get the job done' }, { slug: 'sync-trending', name: 'sync-trending', reason: 'Essential crm sync manager tool — sync-trending helps you get the job done' }, { slug: 'sync-backup', name: 'Sync Backup', reason: 'Essential crm sync manager tool — Sync Backup helps you get the job done' }, { slug: 'zoho-crm', name: 'Zoho CRM', reason: 'Essential crm sync manager tool — Zoho CRM helps you get the job done' }, { slug: 'obsidian-ontology-sync', name: 'Obsidian Ontology Sync', reason: 'Essential crm sync manager tool — Obsidian Ontology Sync helps you get the job done' }],
    searchLink: '/skills?q=crm+sync+salesforce',
  },
{
    slug: 'crypto-trading-orchestrator',
    title: 'Crypto Trading Assistant',
    description: 'Monitors real-time prices, executes trades, tracks portfolio performance, and sends price or event alerts.',
    icon: '📊',
    skills: [{ slug: 'crypto-trading-bot-playbook', name: 'Crypto Trading Bot Playbook', reason: 'Essential crypto trading assistant tool — Crypto Trading Bot Playbook helps you get the job done' }, { slug: 'trading-research', name: 'Trading Research', reason: 'Essential crypto trading assistant tool — Trading Research helps you get the job done' }, { slug: 'crypto-whale-monitor', name: 'Crypto Whale Monitor', reason: 'Essential crypto trading assistant tool — Crypto Whale Monitor helps you get the job done' }, { slug: 'crypto-cog', name: 'Crypto Cog', reason: 'Essential crypto trading assistant tool — Crypto Cog helps you get the job done' }, { slug: 'crypto-levels', name: 'Crypto Levels Analyzer', reason: 'Essential crypto trading assistant tool — Crypto Levels Analyzer helps you get the job done' }],
    searchLink: '/skills?q=crypto+trading+signal+bot+portfolio',
  },
{
    slug: 'devops-automation-hub',
    title: 'DevOps Automation Hub',
    description: 'Automates CI/CD pipelines, monitors deployment health, and securely processes GitHub webhooks.',
    icon: '⚙️',
    skills: [{ slug: 'automation-runner', name: 'Automation Runner', reason: 'Essential devops automation hub tool — Automation Runner helps you get the job done' }, { slug: 'devops-bridge', name: 'DevOps Bridge', reason: 'Essential devops automation hub tool — DevOps Bridge helps you get the job done' }, { slug: 'devops-bash-tools', name: 'devops bash tools', reason: 'Essential devops automation hub tool — devops bash tools helps you get the job done' }, { slug: 'devops-journey', name: 'Devops Journey', reason: 'Essential devops automation hub tool — Devops Journey helps you get the job done' }, { slug: 'devops-scripts', name: 'devops scripts', reason: 'Essential devops automation hub tool — devops scripts helps you get the job done' }],
    searchLink: '/skills?q=devops+ci+cd+github+deployment',
  },
{
    slug: 'document-extraction-pro',
    title: 'Document Extraction Pro',
    description: 'Extracts structured data like totals, dates, and line items from PDF invoices and receipts.',
    icon: '📄',
    skills: [{ slug: 'extraction', name: 'Skill Extraction', reason: 'Essential document extraction pro tool — Skill Extraction helps you get the job done' }, { slug: 'document-processor', name: 'Document Processor', reason: 'Essential document extraction pro tool — Document Processor helps you get the job done' }, { slug: 'document-workflow', name: 'Document Workflow', reason: 'Essential document extraction pro tool — Document Workflow helps you get the job done' }, { slug: 'doc-spellcheck', name: 'Document Spell Check', reason: 'Essential document extraction pro tool — Document Spell Check helps you get the job done' }, { slug: 'document-handler', name: 'Document Handler', reason: 'Essential document extraction pro tool — Document Handler helps you get the job done' }],
    searchLink: '/skills?q=pdf+invoice+receipt+extraction+structured',
  },
{
    slug: 'document-ops-center',
    title: 'Document Ops Center',
    description: 'Converts, merges, and splits documents while syncing across Google Drive and Notion automatically.',
    icon: '🔄',
    skills: [{ slug: 'document-processor', name: 'Document Processor', reason: 'Essential document ops center tool — Document Processor helps you get the job done' }, { slug: 'document-workflow', name: 'Document Workflow', reason: 'Essential document ops center tool — Document Workflow helps you get the job done' }, { slug: 'doc-spellcheck', name: 'Document Spell Check', reason: 'Essential document ops center tool — Document Spell Check helps you get the job done' }, { slug: 'document-handler', name: 'Document Handler', reason: 'Essential document ops center tool — Document Handler helps you get the job done' }, { slug: 'document-format-skills', name: 'Document Format Skills', reason: 'Essential document ops center tool — Document Format Skills helps you get the job done' }],
    searchLink: '/skills?q=document+convert+merge+notion+drive',
  },
{
    slug: 'smart-file-manager',
    title: 'Smart File Manager',
    description: 'Organizes, renames, and moves files automatically across cloud storage based on rules and content.',
    icon: '🗂️',
    skills: [{ slug: 'file-search', name: 'File Search', reason: 'Essential smart file manager tool — File Search helps you get the job done' }, { slug: 'file-manager', name: 'File Manager', reason: 'Essential smart file manager tool — File Manager helps you get the job done' }, { slug: 'file-organizer-skill', name: 'File Organizer Skill', reason: 'Essential smart file manager tool — File Organizer Skill helps you get the job done' }, { slug: 'file-deduplicator', name: 'File Deduplicator', reason: 'Essential smart file manager tool — File Deduplicator helps you get the job done' }, { slug: 'file-manager-1-0-0', name: 'File Manager 1.0.0', reason: 'Essential smart file manager tool — File Manager 1.0.0 helps you get the job done' }],
    searchLink: '/skills?q=file+organize+rename+cloud+storage',
  },
{
    slug: 'hr-automation',
    title: 'HR Workflow Automator',
    description: 'Automates job posting, resume screening, and new hire onboarding using integrated tools.',
    icon: '👥',
    skills: [{ slug: 'automation-runner', name: 'Automation Runner', reason: 'Essential hr workflow automator tool — Automation Runner helps you get the job done' }, { slug: 'browser-automation', name: 'Browser Automation', reason: 'Essential hr workflow automator tool — Browser Automation helps you get the job done' }, { slug: 'xiaohongshu-mcp', name: 'Xiaohongshu (小红书) Automation', reason: 'Essential hr workflow automator tool — Xiaohongshu (小红书) Automation helps you get the job done' }, { slug: 'playwright', name: 'Playwright (Automation + MCP + Scraper)', reason: 'Essential hr workflow automator tool — Playwright (Automation + MCP + Scraper) helps you get the job done' }, { slug: 'openclaw-anything', name: 'Comprehensive skill for installing, configuring, and managing the OpenClaw ecosystem (Gateway, Channels, Models, Automation, Nodes, and Deployment)', reason: 'Essential hr workflow automator tool — Comprehensive skill for installing, configuring, and managin helps you get the job done' }],
    searchLink: '/skills?q=hr+automation+onboarding',
  },
{
    slug: 'wiki-synchronizer',
    title: 'Wiki Auto-Updater',
    description: 'Keeps internal wikis fresh by syncing and transforming docs from Notion or Confluence.',
    icon: '📚',
    skills: [{ slug: 'wikijs', name: 'Wiki.js CLI', reason: 'Essential wiki auto-updater tool — Wiki.js CLI helps you get the job done' }, { slug: 'wiki-js', name: 'Wiki.js', reason: 'Essential wiki auto-updater tool — Wiki.js helps you get the job done' }, { slug: 'auto-updater', name: 'Auto-Updater Skill', reason: 'Essential wiki auto-updater tool — Auto-Updater Skill helps you get the job done' }, { slug: 'feishu-wiki', name: 'feishu-wiki', reason: 'Essential wiki auto-updater tool — feishu-wiki helps you get the job done' }, { slug: 'auto-updater-gateway', name: 'Auto-Updater (Gateway)', reason: 'Essential wiki auto-updater tool — Auto-Updater (Gateway) helps you get the job done' }],
    searchLink: '/skills?q=wiki+notion+confluence+sync',
  },
{
    slug: 'invoice-processor',
    title: 'Smart Invoice Handler',
    description: 'Extracts line items, validates totals, reconciles payments, and syncs to QuickBooks or Xero.',
    icon: '🧾',
    skills: [{ slug: 'invoice-forge', name: 'Invoice Forge', reason: 'Essential smart invoice handler tool — Invoice Forge helps you get the job done' }, { slug: 'arxiv-paper-processor', name: 'Arxiv Paper Processor', reason: 'Essential smart invoice handler tool — Arxiv Paper Processor helps you get the job done' }, { slug: 'medical-document-processor', name: 'Medical Document Processor', reason: 'Essential smart invoice handler tool — Medical Document Processor helps you get the job done' }, { slug: 'morning-green-invoice', name: 'Morning (Green Invoice)', reason: 'Essential smart invoice handler tool — Morning (Green Invoice) helps you get the job done' }, { slug: 'objection-handler', name: 'Objection Handler', reason: 'Essential smart invoice handler tool — Objection Handler helps you get the job done' }],
    searchLink: '/skills?q=invoice+pdf+accounting+reconcile',
  },
{
    slug: 'it-ops-guardian',
    title: 'IT Ops Guardian',
    description: 'Monitors server metrics, triggers auto-remediation scripts, and logs incidents in Jira.',
    icon: '🖥️',
    skills: [{ slug: 'guardian-wall-azzar', name: 'Guardian Wall', reason: 'Essential it ops guardian tool — Guardian Wall helps you get the job done' }, { slug: 'guardian-angel-protocol', name: 'Guardian Angel Protocol', reason: 'Essential it ops guardian tool — Guardian Angel Protocol helps you get the job done' }, { slug: 'config-guardian', name: 'Config Guardian', reason: 'Essential it ops guardian tool — Config Guardian helps you get the job done' }, { slug: 'mmxagent-guardian', name: 'mmxagent-guardian', reason: 'Essential it ops guardian tool — mmxagent-guardian helps you get the job done' }, { slug: 'soul-guardian', name: 'soul-guardian', reason: 'Essential it ops guardian tool — soul-guardian helps you get the job done' }],
    searchLink: '/skills?q=server+monitoring+alert+incident',
  },
{
    slug: 'lead-gen-orchestrator',
    title: 'Lead Gen Orchestrator',
    description: 'Scrapes target websites, enriches contact data, scores leads, and pushes qualified ones to CRM.',
    icon: '🔍',
    skills: [{ slug: 'lead', name: 'Lead', reason: 'Essential lead gen orchestrator tool — Lead helps you get the job done' }, { slug: 'lead-gen-pipeline', name: 'Lead Gen Pipeline', reason: 'Essential lead gen orchestrator tool — Lead Gen Pipeline helps you get the job done' }, { slug: 'lead-hunter', name: 'Lead Hunter', reason: 'Essential lead gen orchestrator tool — Lead Hunter helps you get the job done' }, { slug: 'lead-magnets', name: 'Lead Magnets', reason: 'Essential lead gen orchestrator tool — Lead Magnets helps you get the job done' }, { slug: 'lead-enrichment', name: 'Lead Enrichment', reason: 'Essential lead gen orchestrator tool — Lead Enrichment helps you get the job done' }],
    searchLink: '/skills?q=lead+scraping+enrichment+crm',
  },
{
    slug: 'lead-nurturing-orchestrator',
    title: 'Lead Nurturing Orchestrator',
    description: 'Automates personalized email sequences and dynamically scores leads based on engagement and behavior.',
    icon: '📧',
    skills: [{ slug: 'lead', name: 'Lead', reason: 'Essential lead nurturing orchestrator tool — Lead helps you get the job done' }, { slug: 'lead-hunter', name: 'Lead Hunter', reason: 'Essential lead nurturing orchestrator tool — Lead Hunter helps you get the job done' }, { slug: 'lead-magnets', name: 'Lead Magnets', reason: 'Essential lead nurturing orchestrator tool — Lead Magnets helps you get the job done' }, { slug: 'lead-enrichment', name: 'Lead Enrichment', reason: 'Essential lead nurturing orchestrator tool — Lead Enrichment helps you get the job done' }, { slug: 'afrexai-lead-scorer', name: 'Lead Scorer', reason: 'Essential lead nurturing orchestrator tool — Lead Scorer helps you get the job done' }],
    searchLink: '/skills?q=email+lead+scoring+crm',
  },
{
    slug: 'marketing-automation-hub',
    title: 'Marketing Automation Hub',
    description: 'Schedules social posts, tracks campaign KPIs across channels, and unifies analytics into actionable dashboards.',
    icon: '📊',
    skills: [{ slug: 'marketing-skills', name: 'Marketing Skills', reason: 'Essential marketing automation hub tool — Marketing Skills helps you get the job done' }, { slug: 'marketing-demand-acquisition', name: 'Marketing Demand Acquisition', reason: 'Essential marketing automation hub tool — Marketing Demand Acquisition helps you get the job done' }, { slug: 'marketing-copy-knowledge', name: 'Marketing Copy Knowledge', reason: 'Essential marketing automation hub tool — Marketing Copy Knowledge helps you get the job done' }, { slug: 'automation-runner', name: 'Automation Runner', reason: 'Essential marketing automation hub tool — Automation Runner helps you get the job done' }, { slug: 'marketing-orchestrator-adarsh', name: 'Marketing Orchestrator Adarsh', reason: 'Essential marketing automation hub tool — Marketing Orchestrator Adarsh helps you get the job done' }],
    searchLink: '/skills?q=social+analytics+campaign+tracking',
  },
{
    slug: 'market-intelligence-scout',
    title: 'Market Intelligence Scout',
    description: 'Monitors competitor moves, scans industry news, and aggregates real-time market signals for strategic decisions.',
    icon: '🔍',
    skills: [{ slug: 'market-analysis-cn', name: 'Market Analysis CN | 市场分析服务', reason: 'Essential market intelligence scout tool — Market Analysis CN | 市场分析服务 helps you get the job done' }, { slug: 'market-news-analyst', name: 'Market News Analyst', reason: 'Essential market intelligence scout tool — Market News Analyst helps you get the job done' }, { slug: 'market-sentiment-pulse', name: 'Market Sentiment Pulse', reason: 'Essential market intelligence scout tool — Market Sentiment Pulse helps you get the job done' }, { slug: 'market-pulse', name: 'market pulse', reason: 'Essential market intelligence scout tool — market pulse helps you get the job done' }, { slug: 'market-sentiment', name: 'Market Sentiment', reason: 'Essential market intelligence scout tool — Market Sentiment helps you get the job done' }],
    searchLink: '/skills?q=competitor+news+market+data',
  },
{
    slug: 'multimodal-ai-analyzer',
    title: 'Multimodal AI Analyzer',
    description: 'Transcribes audio/video, extracts insights from images and speech, and generates structured summaries.',
    icon: '🎥',
    skills: [{ slug: 'geo-multimodal-tagger', name: 'Multimodal Asset Tagger', reason: 'Essential multimodal analyzer tool — Multimodal Asset Tagger helps you get the job done' }, { slug: 'minimax-multimodal', name: 'Minimax-Multimodal-Toolkit', reason: 'Essential multimodal analyzer tool — Minimax-Multimodal-Toolkit helps you get the job done' }, { slug: 'ezviz-open-multimodal-analysis', name: 'Ezviz Open Multimodal Analysis', reason: 'Essential multimodal analyzer tool — Ezviz Open Multimodal Analysis helps you get the job done' }],
    searchLink: '/skills?q=transcription+audio+video+image+analysis',
  },
{
    slug: 'personal-productivity-coach',
    title: 'Personal Productivity Coach',
    description: 'Automates task prioritization, triages incoming emails, syncs calendar events, and delivers smart reminders.',
    icon: '✅',
    skills: [{ slug: 'coach', name: 'Coach', reason: 'Essential personal productivity coach tool — Coach helps you get the job done' }, { slug: 'personal-finance', name: 'Personal Finance Tracker', reason: 'Essential personal productivity coach tool — Personal Finance Tracker helps you get the job done' }, { slug: 'afrexai-productivity-system', name: 'Productivity Operating System', reason: 'Essential personal productivity coach tool — Productivity Operating System helps you get the job done' }, { slug: 'pkm', name: 'Personal Knowledge Base', reason: 'Essential personal productivity coach tool — Personal Knowledge Base helps you get the job done' }, { slug: 'personal-genomics', name: 'Personal Genomics', reason: 'Essential personal productivity coach tool — Personal Genomics helps you get the job done' }],
    searchLink: '/skills?q=task+email+calendar+reminder',
  },
{
    slug: 'project-management-orchestrator',
    title: 'Project Sync & Report',
    description: 'Syncs tasks across Jira, Linear, and Asana while auto-generating weekly status reports.',
    icon: '📊',
    skills: [{ slug: 'management', name: 'Management', reason: 'Essential project sync & report tool — Management helps you get the job done' }, { slug: 'sync', name: 'Sync', reason: 'Essential project sync & report tool — Sync helps you get the job done' }, { slug: 'project-context-sync', name: 'Project Context Sync', reason: 'Essential project sync & report tool — Project Context Sync helps you get the job done' }, { slug: 'project-summary', name: 'Project Summary', reason: 'Essential project sync & report tool — Project Summary helps you get the job done' }, { slug: 'sync-trending', name: 'sync-trending', reason: 'Essential project sync & report tool — sync-trending helps you get the job done' }],
    searchLink: '/skills?q=task+report+sync',
  },
{
    slug: 'sales-outreach-orchestrator',
    title: 'Sales Sequence Automator',
    description: 'Automates multi-channel outreach, tracks deal progression, and generates personalized proposals.',
    icon: '📈',
    skills: [{ slug: 'afrexai-sales-playbook', name: 'Sales Playbook', reason: 'Essential sales sequence automator tool — Sales Playbook helps you get the job done' }, { slug: 'outreach-and-prospecting', name: 'Outreach And Prospecting', reason: 'Essential sales sequence automator tool — Outreach And Prospecting helps you get the job done' }, { slug: 'sales-engineer', name: 'Sales Engineer', reason: 'Essential sales sequence automator tool — Sales Engineer helps you get the job done' }, { slug: 'outreach-integration', name: 'Outreach', reason: 'Essential sales sequence automator tool — Outreach helps you get the job done' }, { slug: 'smb-sales-boost-leads', name: 'SMB Sales Boost — B2B Lead Database of SMBs for Cold Outreach & GTM', reason: 'Essential sales sequence automator tool — SMB Sales Boost — B2B Lead Database of SMBs for Cold Outreac helps you get the job done' }],
    searchLink: '/skills?q=sales+outreach+proposal',
  },
{
    slug: 'secops-incident-orchestrator',
    title: 'Security Alert Responder',
    description: 'Monitors SIEM alerts, auto-triages incidents, triggers response playbooks, and scans for vulnerabilities.',
    icon: '🛡️',
    skills: [{ slug: 'sona-security-audit', name: 'Security Audit (Sona)', reason: 'Essential security alert responder tool — Security Audit (Sona) helps you get the job done' }, { slug: 'openclaw-skills-security-checker', name: 'Security Skill Scanner', reason: 'Essential security alert responder tool — Security Skill Scanner helps you get the job done' }, { slug: 'arc-security-audit', name: 'Security Audit', reason: 'Essential security alert responder tool — Security Audit helps you get the job done' }, { slug: 'incident-pcn-evidence-appeal-corrective-actions-uk', name: 'Incident & PCN Handling Pack (UK)', reason: 'Essential security alert responder tool — Incident & PCN Handling Pack (UK) helps you get the job done' }, { slug: 'shenmeng-security-defense-line', name: 'Security Defense Line 安全防线', reason: 'Essential security alert responder tool — Security Defense Line 安全防线 helps you get the job done' }],
    searchLink: '/skills?q=security+alert+response',
  },
{
    slug: 'social-media-orchestrator',
    title: 'Social Post & Listen',
    description: 'Schedules cross-platform posts, monitors brand mentions, and sends context-aware auto-replies.',
    icon: '📱',
    skills: [{ slug: 'social', name: 'Social Network. 社交。Red social.', reason: 'Essential social post & listen tool — Social Network. 社交。Red social. helps you get the job done' }, { slug: 'postiz', name: 'Postiz is a tool to schedule social media and chat posts to 28+ channels X, LinkedIn, LinkedIn Page, Reddit, Instagram, Facebook Page, Threads, YouTube, Google My Business, TikTok, Pinterest, Dribbble', reason: 'Essential social post & listen tool — Postiz is a tool to schedule social media and chat posts to  helps you get the job done' }, { slug: 'social-media-management', name: 'Social Media Management', reason: 'Essential social post & listen tool — Social Media Management helps you get the job done' }, { slug: 'social-media-analyzer', name: 'Social Media Analyzer', reason: 'Essential social post & listen tool — Social Media Analyzer helps you get the job done' }, { slug: 'bolta-skills-index', name: 'Social Media Automation Skills Registry', reason: 'Essential social post & listen tool — Social Media Automation Skills Registry helps you get the job done' }],
    searchLink: '/skills?q=social+schedule+monitor',
  },
{
    slug: 'support-orchestrator',
    title: 'Smart Ticket Router',
    description: 'Routes incoming support tickets by intent and urgency, drafts contextual replies, and escalates SLA breaches.',
    icon: '🎫',
    skills: [{ slug: 'router', name: 'SwitchBoard', reason: 'Essential smart ticket router tool — SwitchBoard helps you get the job done' }, { slug: 'ticket-monitor-ichinosuke', name: 'Ticket Monitor Ichinosuke', reason: 'Essential smart ticket router tool — Ticket Monitor Ichinosuke helps you get the job done' }, { slug: 'ticket-tailor', name: 'Ticket Tailor', reason: 'Essential smart ticket router tool — Ticket Tailor helps you get the job done' }, { slug: 'model-router-premium', name: 'Model Router', reason: 'Essential smart ticket router tool — Model Router helps you get the job done' }, { slug: 'hyperliquid-cli', name: 'Hyperliquid CLI (with HIP3 Support)', reason: 'Essential smart ticket router tool — Hyperliquid CLI (with HIP3 Support) helps you get the job done' }],
    searchLink: '/skills?q=support+ticket+escalate',
  },
{
    slug: 'support-chatbot',
    title: 'AI Support Assistant',
    description: 'Automates customer support with real-time answers from your knowledge base and docs.',
    icon: '💬',
    skills: [{ slug: 'hyperliquid-cli', name: 'Hyperliquid CLI (with HIP3 Support)', reason: 'Essential support assistant tool — Hyperliquid CLI (with HIP3 Support) helps you get the job done' }, { slug: 'alicloud-ai-chatbot', name: 'Alicloud Ai Chatbot', reason: 'Essential support assistant tool — Alicloud Ai Chatbot helps you get the job done' }, { slug: 'srs-support', name: 'SRS Support', reason: 'Essential support assistant tool — SRS Support helps you get the job done' }, { slug: 'consensus-support-reply-guard', name: 'consensus-support-reply-guard', reason: 'Essential support assistant tool — consensus-support-reply-guard helps you get the job done' }, { slug: 'zoho-support-claw', name: 'zoho-support-claw', reason: 'Essential support assistant tool — zoho-support-claw helps you get the job done' }],
    searchLink: '/skills?q=support+chatbot+kb',
  },
{
    slug: 'ticket-management',
    title: 'Smart Ticket Orchestrator',
    description: 'Auto-creates, triages, and routes support tickets from email, chat, and forms to the right team.',
    icon: '🎫',
    skills: [{ slug: 'management', name: 'Management', reason: 'Essential smart ticket orchestrator tool — Management helps you get the job done' }, { slug: 'ticket-monitor-ichinosuke', name: 'Ticket Monitor Ichinosuke', reason: 'Essential smart ticket orchestrator tool — Ticket Monitor Ichinosuke helps you get the job done' }, { slug: 'ticket-tailor', name: 'Ticket Tailor', reason: 'Essential smart ticket orchestrator tool — Ticket Tailor helps you get the job done' }, { slug: 'social-media-management', name: 'Social Media Management', reason: 'Essential smart ticket orchestrator tool — Social Media Management helps you get the job done' }, { slug: 'todo-management-1-1-2', name: 'Todo Management 1.1.2', reason: 'Essential smart ticket orchestrator tool — Todo Management 1.1.2 helps you get the job done' }],
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
    skills: [{ slug: 'coach', name: 'Coach', reason: 'Essential interview coach tool — Coach helps you get the job done' }, { slug: 'interview', name: 'Interview', reason: 'Essential interview coach tool — Interview helps you get the job done' }, { slug: 'interview-coach-ai', name: 'Interview Coach', reason: 'Essential interview coach tool — Interview Coach helps you get the job done' }, { slug: 'interview-simulator', name: 'Interview Simulator', reason: 'Essential interview coach tool — Interview Simulator helps you get the job done' }, { slug: 'interview-analysis', name: 'Interview Analysis', reason: 'Essential interview coach tool — Interview Analysis helps you get the job done' }],
    searchLink: '/skills?q=ai+interview+coach',
  },
{
    slug: 'ai-jobs-automation',
    title: 'AI Jobs Automation',
    description: 'Scan, filter, and auto-apply to job listings using custom criteria like salary, remote status, and tech stack.',
    icon: '💼',
    skills: [{ slug: 'automation-runner', name: 'Automation Runner', reason: 'Essential jobs automation tool — Automation Runner helps you get the job done' }, { slug: 'browser-automation', name: 'Browser Automation', reason: 'Essential jobs automation tool — Browser Automation helps you get the job done' }, { slug: 'xiaohongshu-mcp', name: 'Xiaohongshu (小红书) Automation', reason: 'Essential jobs automation tool — Xiaohongshu (小红书) Automation helps you get the job done' }, { slug: 'playwright', name: 'Playwright (Automation + MCP + Scraper)', reason: 'Essential jobs automation tool — Playwright (Automation + MCP + Scraper) helps you get the job done' }, { slug: 'openclaw-anything', name: 'Comprehensive skill for installing, configuring, and managing the OpenClaw ecosystem (Gateway, Channels, Models, Automation, Nodes, and Deployment)', reason: 'Essential jobs automation tool — Comprehensive skill for installing, configuring, and managin helps you get the job done' }],
    searchLink: '/skills?q=ai+job+automation+apply',
  },
{
    slug: 'google-ads-optimizer',
    title: 'Google Ads Optimizer',
    description: 'Automatically monitor, A/B test, and adjust Google Ads campaigns based on performance KPIs and budget rules.',
    icon: '📈',
    skills: [{ slug: 'google-slides', name: 'Google Slides', reason: 'Essential google ads optimizer tool — Google Slides helps you get the job done' }, { slug: 'google-meet', name: 'Google Meet', reason: 'Essential google ads optimizer tool — Google Meet helps you get the job done' }, { slug: 'google-play', name: 'Google Play', reason: 'Essential google ads optimizer tool — Google Play helps you get the job done' }, { slug: 'google-calendar', name: 'Google Calendar', reason: 'Essential google ads optimizer tool — Google Calendar helps you get the job done' }, { slug: 'google-workspace-mcp', name: 'Google Workspace (No Cloud Console)', reason: 'Essential google ads optimizer tool — Google Workspace (No Cloud Console) helps you get the job done' }],
    searchLink: '/skills?q=ai+google+ads+optimizer',
  },
{
    slug: 'interior-design-ai',
    title: 'AI Interior Designer',
    description: 'Generate room layouts, suggest furniture pairings, and simulate lighting/mood using uploaded floor plans or photos.',
    icon: '🛋️',
    skills: [{ slug: 'interior-design', name: 'Interior Design', reason: 'Essential interior designer tool — Interior Design helps you get the job done' }, { slug: 'design-critique', name: 'Designers Eye', reason: 'Essential interior designer tool — Designers Eye helps you get the job done' }, { slug: 'designer-intelligence-station', name: 'Designer Intelligence Station', reason: 'Essential interior designer tool — Designer Intelligence Station helps you get the job done' }, { slug: 'frontend-design-ultimate', name: 'Frontend Design Ultimate', reason: 'Essential interior designer tool — Frontend Design Ultimate helps you get the job done' }, { slug: 'frontend', name: 'Frontend Design', reason: 'Essential interior designer tool — Frontend Design helps you get the job done' }],
    searchLink: '/skills?q=ai+interior+design+layout',
  },
{
    slug: 'restaurant-operations-agent',
    title: 'Restaurant AI Agent',
    description: 'Manage daily operations including staff scheduling, inventory alerts, online review responses, and reservation sync.',
    icon: '🍽️',
    skills: [{ slug: 'afrexai-restaurant-ops', name: 'Restaurant Operations', reason: 'Essential restaurant tool — Restaurant Operations helps you get the job done' }, { slug: 'restaurant-crosscheck-cn', name: 'Restaurant Crosscheck CN', reason: 'Essential restaurant tool — Restaurant Crosscheck CN helps you get the job done' }, { slug: 'revenue-operations', name: 'Revenue Operations', reason: 'Essential restaurant tool — Revenue Operations helps you get the job done' }, { slug: 'dellight-cfo-financial-ops', name: 'DELLIGHT CFO Financial Operations', reason: 'Essential restaurant tool — DELLIGHT CFO Financial Operations helps you get the job done' }, { slug: 'afrexai-warehouse-ops', name: 'Warehouse Operations Optimizer', reason: 'Essential restaurant tool — Warehouse Operations Optimizer helps you get the job done' }],
    searchLink: '/skills?q=ai+restaurant+operations',
  },
{
    slug: 'cybersecurity-agent',
    title: 'Cybersecurity AI Agent',
    description: 'An AI agent that monitors, detects, and responds to security threats in real time.',
    icon: '🛡️',
    skills: [{ slug: 'cybersecurity', name: 'Cybersecurity', reason: 'Essential cybersecurity tool — Cybersecurity helps you get the job done' }, { slug: 'afrexai-cybersecurity', name: 'Cybersecurity Risk Assessment', reason: 'Essential cybersecurity tool — Cybersecurity Risk Assessment helps you get the job done' }, { slug: 'gov-cybersecurity', name: 'Government Cybersecurity Vulnerability Intel', reason: 'Essential cybersecurity tool — Government Cybersecurity Vulnerability Intel helps you get the job done' }],
    searchLink: '/skills?q=security-scanner+email-assistant+task-planner+report-generator+notion-assistant',
  },
{
    slug: 'data-entry-agent',
    title: 'Data Entry AI Agent',
    description: 'An AI agent that automates form filling, record creation, and structured data ingestion from documents or emails.',
    icon: '📝',
    skills: [{ slug: 'data-analysis', name: 'Data Analysis', reason: 'Essential data entry tool — Data Analysis helps you get the job done' }, { slug: 'data-analyst-pro', name: 'Data Analyst', reason: 'Essential data entry tool — Data Analyst helps you get the job done' }, { slug: 'data-anomaly-detector', name: 'Data Anomaly Detector', reason: 'Essential data entry tool — Data Anomaly Detector helps you get the job done' }, { slug: 'data-validation', name: 'Data Validation', reason: 'Essential data entry tool — Data Validation helps you get the job done' }, { slug: 'data-analyst-cn', name: 'Data Analyst Cn', reason: 'Essential data entry tool — Data Analyst Cn helps you get the job done' }],
    searchLink: '/skills?q=invoice-parser+pdf-reader+email-assistant+sql-assistant+scheduler',
  },
{
    slug: 'data-science-agent',
    title: 'Data Science AI Agent',
    description: 'An AI agent that assists with exploratory analysis, model prototyping, visualization, and report generation.',
    icon: '📊',
    skills: [{ slug: 'science', name: 'Science', reason: 'Essential data science tool — Science helps you get the job done' }, { slug: 'data-analysis', name: 'Data Analysis', reason: 'Essential data science tool — Data Analysis helps you get the job done' }, { slug: 'data-analyst-pro', name: 'Data Analyst', reason: 'Essential data science tool — Data Analyst helps you get the job done' }, { slug: 'data-anomaly-detector', name: 'Data Anomaly Detector', reason: 'Essential data science tool — Data Anomaly Detector helps you get the job done' }, { slug: 'data-validation', name: 'Data Validation', reason: 'Essential data science tool — Data Validation helps you get the job done' }],
    searchLink: '/skills?q=data-analysis+chart-generator+report-generator+note-taker+sql-assistant',
  },
{
    slug: 'database-agent',
    title: 'Database AI Agent',
    description: 'An AI agent that manages schema design, query optimization, migration scripting, and real-time monitoring of relational databases.',
    icon: '🗃️',
    skills: [{ slug: 'database-design', name: 'database design', reason: 'Essential database tool — database design helps you get the job done' }, { slug: 'database-migrations', name: 'database-migrations', reason: 'Essential database tool — database-migrations helps you get the job done' }, { slug: 'afrexai-database-engineer', name: 'Database Engineering Mastery', reason: 'Essential database tool — Database Engineering Mastery helps you get the job done' }, { slug: 'database-schema-differ', name: 'Database Schema Differ', reason: 'Essential database tool — Database Schema Differ helps you get the job done' }, { slug: 'mx-macro-data', name: 'Global Macro Database Assistant', reason: 'Essential database tool — Global Macro Database Assistant helps you get the job done' }],
    searchLink: '/skills?q=sql-assistant+web-scraper+code-reviewer+report-generator+notion-assistant',
  },
{
    slug: 'deployment-agent',
    title: 'Deployment AI Agent',
    description: 'An AI agent that automates CI/CD pipeline configuration, environment validation, rollback planning, and deployment notifications.',
    icon: '🚀',
    skills: [{ slug: 'openclaw-anything', name: 'Comprehensive skill for installing, configuring, and managing the OpenClaw ecosystem (Gateway, Channels, Models, Automation, Nodes, and Deployment)', reason: 'Essential deployment tool — Comprehensive skill for installing, configuring, and managin helps you get the job done' }, { slug: 'azd-deployment', name: 'Azd Deployment for Azure', reason: 'Essential deployment tool — Azd Deployment for Azure helps you get the job done' }, { slug: 'rocm-vllm-deployment', name: 'ROCm vLLM Deployment', reason: 'Essential deployment tool — ROCm vLLM Deployment helps you get the job done' }, { slug: 'aleph-cloud-self-deployment', name: 'aleph-cloud-self-deployment', reason: 'Essential deployment tool — aleph-cloud-self-deployment helps you get the job done' }],
    searchLink: '/skills?q=code-reviewer+api-tester+slack-notifier+task-planner+github-assistant',
  },
{
    slug: 'accounting-agent',
    title: 'AI Accounting Agent',
    description: 'Automate financial reporting, reconciliation, and compliance tasks for accountants and finance teams.',
    icon: '📊',
    skills: [{ slug: 'accounting-finance-system-skill', name: 'Accounting Finance System Research Skill', reason: 'Essential accounting tool — Accounting Finance System Research Skill helps you get the job done' }, { slug: 'dashboard-greek-accounting', name: 'Dashboard Greek Accounting', reason: 'Essential accounting tool — Dashboard Greek Accounting helps you get the job done' }, { slug: 'qb', name: 'QuickBooks for Beginners | Accounting skills', reason: 'Essential accounting tool — QuickBooks for Beginners | Accounting skills helps you get the job done' }],
    searchLink: '/skills?q=ai+agent+for+accounting',
  },
{
    slug: 'app-dev-agent',
    title: 'AI App Development Agent',
    description: 'Accelerate full-stack application development with intelligent code generation, review, and integration support.',
    icon: '💻',
    skills: [{ slug: 'app', name: 'App', reason: 'Essential app development tool — App helps you get the job done' }, { slug: 'app-store-changelog', name: 'App Store Changelog', reason: 'Essential app development tool — App Store Changelog helps you get the job done' }, { slug: 'app-store-optimization', name: 'App Store Optimization', reason: 'Essential app development tool — App Store Optimization helps you get the job done' }, { slug: 'app-store-screenshots', name: 'App Store Screenshots', reason: 'Essential app development tool — App Store Screenshots helps you get the job done' }, { slug: 'app-store-connect', name: 'App Store Connect', reason: 'Essential app development tool — App Store Connect helps you get the job done' }],
    searchLink: '/skills?q=ai+agent+for+app+development',
  },
{
    slug: 'architecture-design-agent',
    title: 'AI Architecture Design Agent',
    description: 'Assist solution architects in designing scalable, secure, and cloud-native system blueprints.',
    icon: '🏗️',
    skills: [{ slug: 'architecture', name: 'Architecture', reason: 'Essential architecture design tool — Architecture helps you get the job done' }, { slug: 'design-critique', name: 'Designers Eye', reason: 'Essential architecture design tool — Designers Eye helps you get the job done' }, { slug: 'frontend-design-ultimate', name: 'Frontend Design Ultimate', reason: 'Essential architecture design tool — Frontend Design Ultimate helps you get the job done' }, { slug: 'frontend', name: 'Frontend Design', reason: 'Essential architecture design tool — Frontend Design helps you get the job done' }, { slug: 'anthropic-frontend-design', name: 'Anthropic Frontend Design', reason: 'Essential architecture design tool — Anthropic Frontend Design helps you get the job done' }],
    searchLink: '/skills?q=ai+agent+for+architecture+design',
  },
{
    slug: 'automation-testing-agent',
    title: 'AI Automation Testing Agent',
    description: 'Intelligently generate, maintain, and analyze end-to-end test suites for web, mobile, and API workflows.',
    icon: '🧪',
    skills: [{ slug: 'automation-runner', name: 'Automation Runner', reason: 'Essential automation testing tool — Automation Runner helps you get the job done' }, { slug: 'browser-automation', name: 'Browser Automation', reason: 'Essential automation testing tool — Browser Automation helps you get the job done' }, { slug: 'xiaohongshu-mcp', name: 'Xiaohongshu (小红书) Automation', reason: 'Essential automation testing tool — Xiaohongshu (小红书) Automation helps you get the job done' }, { slug: 'playwright', name: 'Playwright (Automation + MCP + Scraper)', reason: 'Essential automation testing tool — Playwright (Automation + MCP + Scraper) helps you get the job done' }, { slug: 'openclaw-anything', name: 'Comprehensive skill for installing, configuring, and managing the OpenClaw ecosystem (Gateway, Channels, Models, Automation, Nodes, and Deployment)', reason: 'Essential automation testing tool — Comprehensive skill for installing, configuring, and managin helps you get the job done' }],
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
    skills: [{ slug: 'bug-bounty', name: 'Bug Bounty', reason: 'Essential bug bounty assistant tool — Bug Bounty helps you get the job done' }, { slug: 'bounty-hunter-pro', name: 'Bounty Hunter Pro', reason: 'Essential bug bounty assistant tool — Bounty Hunter Pro helps you get the job done' }, { slug: 'bug-reaper', name: 'Bug Reaper', reason: 'Essential bug bounty assistant tool — Bug Reaper helps you get the job done' }, { slug: 'evomap-bounty-hunter', name: 'Evomap Bounty Hunter', reason: 'Essential bug bounty assistant tool — Evomap Bounty Hunter helps you get the job done' }, { slug: 'github-bounty-hunter', name: 'Github Bounty Hunter', reason: 'Essential bug bounty assistant tool — Github Bounty Hunter helps you get the job done' }],
    searchLink: '/skills?q=security-scanner+code-reviewer+api-tester+web-scraper+report-generator',
  },
{
    slug: 'business-analyst-agent',
    title: 'Business Analyst AI',
    description: 'An AI agent that transforms raw data into actionable insights, generates requirements, and models business processes.',
    icon: '📊',
    skills: [{ slug: 'analyst', name: 'Analyst', reason: 'Essential business analyst ai tool — Analyst helps you get the job done' }, { slug: 'business', name: 'Business Strategy', reason: 'Essential business analyst ai tool — Business Strategy helps you get the job done' }, { slug: 'business-model-canvas', name: 'Business Model Canvas', reason: 'Essential business analyst ai tool — Business Model Canvas helps you get the job done' }, { slug: 'business-plan', name: 'Business Plan', reason: 'Essential business analyst ai tool — Business Plan helps you get the job done' }, { slug: 'business-administration', name: 'Business Administration', reason: 'Essential business analyst ai tool — Business Administration helps you get the job done' }],
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
    skills: [{ slug: 'review', name: 'Review', reason: 'Essential code reviewer tool — Review helps you get the job done' }, { slug: 'code-review', name: 'Code Review', reason: 'Essential code reviewer tool — Code Review helps you get the job done' }, { slug: 'code-review-assistant', name: 'Code Review Assistant', reason: 'Essential code reviewer tool — Code Review Assistant helps you get the job done' }, { slug: 'code-review-sr', name: 'Code Review', reason: 'Essential code reviewer tool — Code Review helps you get the job done' }, { slug: 'code-review-for-gitcode', name: 'code-review-for-gitcode', reason: 'Essential code reviewer tool — code-review-for-gitcode helps you get the job done' }],
    searchLink: '/skills?q=code-reviewer+github-assistant+sql-assistant+shell+pdf-reader',
  },
{
    slug: 'cold-calling-agent',
    title: 'Cold Calling Orchestrator',
    description: 'An AI agent that researches prospects, personalizes outreach, dials leads, and logs engagement—all while adapting to real-time responses.',
    icon: '❄️',
    skills: [{ slug: 'afrexai-email-crafter', name: 'Cold Email Writer', reason: 'Essential cold calling orchestrator tool — Cold Email Writer helps you get the job done' }, { slug: 'cold-outreach-skill', name: 'Cold Outreach Skill', reason: 'Essential cold calling orchestrator tool — Cold Outreach Skill helps you get the job done' }, { slug: 'skill-cold-email-outreach', name: 'Cold Email Outreach', reason: 'Essential cold calling orchestrator tool — Cold Email Outreach helps you get the job done' }, { slug: 'cold-outreach-pack', name: 'Cold Outreach Pack', reason: 'Essential cold calling orchestrator tool — Cold Outreach Pack helps you get the job done' }, { slug: 'cold-email', name: 'MachFive Cold Email', reason: 'Essential cold calling orchestrator tool — MachFive Cold Email helps you get the job done' }],
    searchLink: '/skills?q=lead-generator+email-assistant+crm-manager+scheduler+support-bot',
  },
{
    slug: 'construction-ai-agent',
    title: 'Construction AI Agent',
    description: 'An AI agent that automates project scheduling, compliance checks, site reporting, and subcontractor coordination for construction teams.',
    icon: '🏗️',
    skills: [{ slug: 'open-construction-estimate', name: 'Open Construction Estimate', reason: 'Essential construction tool — Open Construction Estimate helps you get the job done' }, { slug: 'pandas-construction-analysis', name: 'Pandas Construction Analysis', reason: 'Essential construction tool — Pandas Construction Analysis helps you get the job done' }, { slug: 'rag-construction', name: 'Rag Construction', reason: 'Essential construction tool — Rag Construction helps you get the job done' }, { slug: 'afrexai-building-permits', name: 'Building Permit & Construction Permitting', reason: 'Essential construction tool — Building Permit & Construction Permitting helps you get the job done' }],
    searchLink: '/skills?q=construction+ai+agent',
  },
{
    slug: 'legal-ai-agent',
    title: 'Legal AI Agent',
    description: 'An AI agent that assists lawyers and legal professionals with research, document review, case analysis, and compliance checks.',
    icon: '⚖️',
    skills: [{ slug: 'legal-advisor', name: 'legal advisor', reason: 'Essential legal tool — legal advisor helps you get the job done' }, { slug: 'legal-docs-fr', name: 'Legal Docs FR', reason: 'Essential legal tool — Legal Docs FR helps you get the job done' }, { slug: 'legal-site-generator', name: 'Legal Site Generator', reason: 'Essential legal tool — Legal Site Generator helps you get the job done' }],
    searchLink: '/skills?q=legal+ai',
  },
{
    slug: 'logistics-ai-agent',
    title: 'Logistics AI Agent',
    description: 'An AI agent that optimizes supply chain operations, route planning, inventory forecasting, and carrier coordination.',
    icon: '🚚',
    skills: [{ slug: 'logistics-tracking', name: 'Logistics Tracking', reason: 'Essential logistics tool — Logistics Tracking helps you get the job done' }, { slug: 'logistics-watcher', name: 'Logistics Watcher', reason: 'Essential logistics tool — Logistics Watcher helps you get the job done' }, { slug: 'express', name: 'Express Logistics Track - 快递物流查询', reason: 'Essential logistics tool — Express Logistics Track - 快递物流查询 helps you get the job done' }, { slug: 'returns-reverse-logistics', name: 'Returns Reverse Logistics', reason: 'Essential logistics tool — Returns Reverse Logistics helps you get the job done' }, { slug: 'kuaidi100-logistics', name: 'kuaidi100-logistics', reason: 'Essential logistics tool — kuaidi100-logistics helps you get the job done' }],
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
    skills: [{ slug: 'medical-specialty-briefs', name: 'Medical Briefs', reason: 'Essential medical tool — Medical Briefs helps you get the job done' }, { slug: 'medical-document-processor', name: 'Medical Document Processor', reason: 'Essential medical tool — Medical Document Processor helps you get the job done' }, { slug: 'medical-triage', name: 'Medical Triage', reason: 'Essential medical tool — Medical Triage helps you get the job done' }, { slug: 'medical-record-structurer', name: 'Medical Record Structurer', reason: 'Essential medical tool — Medical Record Structurer helps you get the job done' }, { slug: 'medical-imaging-suite', name: 'Medical Imaging Suite', reason: 'Essential medical tool — Medical Imaging Suite helps you get the job done' }],
    searchLink: '/skills?q=medical+ai',
  },
{
    slug: 'meeting-ai-agent',
    title: 'Meeting AI Agent',
    description: 'An AI agent that joins, transcribes, summarizes, and action-items virtual meetings.',
    icon: '📅',
    skills: [{ slug: 'meeting', name: 'Meeting', reason: 'Essential meeting tool — Meeting helps you get the job done' }, { slug: 'meeting-to-action', name: 'Meeting To Action', reason: 'Essential meeting tool — Meeting To Action helps you get the job done' }, { slug: 'meeting-notes-pro', name: 'Meeting Notes Pro', reason: 'Essential meeting tool — Meeting Notes Pro helps you get the job done' }, { slug: 'meeting-prep-agent', name: 'Meeting Prep Agent', reason: 'Essential meeting tool — Meeting Prep Agent helps you get the job done' }, { slug: 'meeting-autopilot', name: 'meeting-autopilot', reason: 'Essential meeting tool — meeting-autopilot helps you get the job done' }],
    searchLink: '/skills?q=meeting+transcribe+summarize+action+items',
  },
{
    slug: 'monitoring-ai-agent',
    title: 'Monitoring AI Agent',
    description: 'An AI agent that continuously observes system metrics, logs, or workflows and triggers alerts or remediations.',
    icon: '📡',
    skills: [{ slug: 'competitor-monitoring', name: 'Competitor Monitoring', reason: 'Essential monitoring tool — Competitor Monitoring helps you get the job done' }, { slug: 'ipwebcam', name: 'Android IP Webcam monitoring and alert', reason: 'Essential monitoring tool — Android IP Webcam monitoring and alert helps you get the job done' }, { slug: 'tommy-monitoring-dashboard', name: 'Live Monitoring Dashboard', reason: 'Essential monitoring tool — Live Monitoring Dashboard helps you get the job done' }],
    searchLink: '/skills?q=monitor+alert+log+anomaly+detect',
  },
{
    slug: 'news-ai-agent',
    title: 'News AI Agent',
    description: 'An AI agent that tracks, filters, summarizes, and delivers personalized news from diverse sources.',
    icon: '📰',
    skills: [{ slug: 'news', name: 'News', reason: 'Essential news tool — News helps you get the job done' }, { slug: 'news-summary', name: 'News Summary', reason: 'Essential news tool — News Summary helps you get the job done' }, { slug: 'news-aggregator', name: 'News Aggregator', reason: 'Essential news tool — News Aggregator helps you get the job done' }, { slug: 'news-aggregator-skill-2', name: 'News Aggregator Skill', reason: 'Essential news tool — News Aggregator Skill helps you get the job done' }, { slug: 'news-market', name: 'News Market', reason: 'Essential news tool — News Market helps you get the job done' }],
    searchLink: '/skills?q=news+aggregate+summarize+personalize+alert',
  },
{
    slug: 'nlp-ai-agent',
    title: 'NLP AI Agent',
    description: 'An AI agent specialized in natural language processing tasks like parsing, classification, sentiment analysis, and generation.',
    icon: '💬',
    skills: [{ slug: 'nlp', name: 'nlp', reason: 'Essential nlp tool — nlp helps you get the job done' }, { slug: 'chinese-nlp-toolkit', name: 'Chinese NLP Toolkit', reason: 'Essential nlp tool — Chinese NLP Toolkit helps you get the job done' }],
    searchLink: '/skills?q=nlp+parse+sentiment+classify+generate',
  },
{
    slug: 'onboarding-ai-agent',
    title: 'Onboarding AI Agent',
    description: 'An AI agent that guides new hires or users through setup, training, documentation, and first tasks.',
    icon: '👋',
    skills: [{ slug: 'onboarding-cro', name: 'onboarding-cro', reason: 'Essential onboarding tool — onboarding-cro helps you get the job done' }, { slug: 'clawver-onboarding', name: 'Clawver Onboarding', reason: 'Essential onboarding tool — Clawver Onboarding helps you get the job done' }, { slug: 'context-onboarding', name: 'Context Onboarding', reason: 'Essential onboarding tool — Context Onboarding helps you get the job done' }, { slug: 'aifrens-onboard', name: 'AI Frens Onboarding', reason: 'Essential onboarding tool — AI Frens Onboarding helps you get the job done' }, { slug: 'customer-onboarding-2', name: 'Customer Onboarding', reason: 'Essential onboarding tool — Customer Onboarding helps you get the job done' }],
    searchLink: '/skills?q=onboard+guide+training+setup+welcome',
  },
{
    slug: 'accounting-ai-agent',
    title: 'Accounting AI Agent',
    description: 'An AI agent that automates financial reporting, reconciliations, and compliance tasks for accountants.',
    icon: '📊',
    skills: [{ slug: 'accounting-finance-system-skill', name: 'Accounting Finance System Research Skill', reason: 'Essential accounting tool — Accounting Finance System Research Skill helps you get the job done' }, { slug: 'dashboard-greek-accounting', name: 'Dashboard Greek Accounting', reason: 'Essential accounting tool — Dashboard Greek Accounting helps you get the job done' }, { slug: 'qb', name: 'QuickBooks for Beginners | Accounting skills', reason: 'Essential accounting tool — QuickBooks for Beginners | Accounting skills helps you get the job done' }],
    searchLink: '/skills?q=ai+accounting+finance',
  },
{
    slug: 'app-dev-ai-agent',
    title: 'App Development AI',
    description: 'An AI agent that accelerates full-stack application development with code generation, testing, and deployment support.',
    icon: '📱',
    skills: [{ slug: 'app', name: 'App', reason: 'Essential app development ai tool — App helps you get the job done' }, { slug: 'app-store-changelog', name: 'App Store Changelog', reason: 'Essential app development ai tool — App Store Changelog helps you get the job done' }, { slug: 'app-store-optimization', name: 'App Store Optimization', reason: 'Essential app development ai tool — App Store Optimization helps you get the job done' }, { slug: 'app-store-screenshots', name: 'App Store Screenshots', reason: 'Essential app development ai tool — App Store Screenshots helps you get the job done' }, { slug: 'app-store-connect', name: 'App Store Connect', reason: 'Essential app development ai tool — App Store Connect helps you get the job done' }],
    searchLink: '/skills?q=ai+app+development',
  },
{
    slug: 'architecture-design-ai-agent',
    title: 'Architecture Design AI',
    description: 'An AI agent that assists software architects in designing scalable, secure, and cloud-native system architectures.',
    icon: '🏗️',
    skills: [{ slug: 'architecture', name: 'Architecture', reason: 'Essential architecture design ai tool — Architecture helps you get the job done' }, { slug: 'design-critique', name: 'Designers Eye', reason: 'Essential architecture design ai tool — Designers Eye helps you get the job done' }, { slug: 'frontend-design-ultimate', name: 'Frontend Design Ultimate', reason: 'Essential architecture design ai tool — Frontend Design Ultimate helps you get the job done' }, { slug: 'frontend', name: 'Frontend Design', reason: 'Essential architecture design ai tool — Frontend Design helps you get the job done' }, { slug: 'anthropic-frontend-design', name: 'Anthropic Frontend Design', reason: 'Essential architecture design ai tool — Anthropic Frontend Design helps you get the job done' }],
    searchLink: '/skills?q=ai+system+architecture',
  },
{
    slug: 'automation-testing-ai-agent',
    title: 'Testing Automation AI',
    description: 'An AI agent that writes, maintains, and executes automated test suites across UI, API, and integration layers.',
    icon: '🧪',
    skills: [{ slug: 'automation-runner', name: 'Automation Runner', reason: 'Essential testing automation ai tool — Automation Runner helps you get the job done' }, { slug: 'browser-automation', name: 'Browser Automation', reason: 'Essential testing automation ai tool — Browser Automation helps you get the job done' }, { slug: 'xiaohongshu-mcp', name: 'Xiaohongshu (小红书) Automation', reason: 'Essential testing automation ai tool — Xiaohongshu (小红书) Automation helps you get the job done' }, { slug: 'playwright', name: 'Playwright (Automation + MCP + Scraper)', reason: 'Essential testing automation ai tool — Playwright (Automation + MCP + Scraper) helps you get the job done' }, { slug: 'openclaw-anything', name: 'Comprehensive skill for installing, configuring, and managing the OpenClaw ecosystem (Gateway, Channels, Models, Automation, Nodes, and Deployment)', reason: 'Essential testing automation ai tool — Comprehensive skill for installing, configuring, and managin helps you get the job done' }],
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
    skills: [{ slug: 'analyst', name: 'Analyst', reason: 'Essential business analyst tool — Analyst helps you get the job done' }, { slug: 'business', name: 'Business Strategy', reason: 'Essential business analyst tool — Business Strategy helps you get the job done' }, { slug: 'business-model-canvas', name: 'Business Model Canvas', reason: 'Essential business analyst tool — Business Model Canvas helps you get the job done' }, { slug: 'business-plan', name: 'Business Plan', reason: 'Essential business analyst tool — Business Plan helps you get the job done' }, { slug: 'business-administration', name: 'Business Administration', reason: 'Essential business analyst tool — Business Administration helps you get the job done' }],
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
    skills: [{ slug: 'review', name: 'Review', reason: 'Essential code review assistant tool — Review helps you get the job done' }, { slug: 'code-review', name: 'Code Review', reason: 'Essential code review assistant tool — Code Review helps you get the job done' }, { slug: 'code-review-assistant', name: 'Code Review Assistant', reason: 'Essential code review assistant tool — Code Review Assistant helps you get the job done' }, { slug: 'code-review-sr', name: 'Code Review', reason: 'Essential code review assistant tool — Code Review helps you get the job done' }, { slug: 'code-review-for-gitcode', name: 'code-review-for-gitcode', reason: 'Essential code review assistant tool — code-review-for-gitcode helps you get the job done' }],
    searchLink: '/skills?q=code-reviewer+github-assistant+sql-assistant+shell+report-generator',
  },
{
    slug: 'design-ai-agent',
    title: 'Design AI Agent',
    description: 'An AI agent that assists with graphic design, UI/UX prototyping, and visual asset generation.',
    icon: '🎨',
    skills: [{ slug: 'design-critique', name: 'Designers Eye', reason: 'Essential design tool — Designers Eye helps you get the job done' }, { slug: 'frontend-design-ultimate', name: 'Frontend Design Ultimate', reason: 'Essential design tool — Frontend Design Ultimate helps you get the job done' }, { slug: 'frontend', name: 'Frontend Design', reason: 'Essential design tool — Frontend Design helps you get the job done' }, { slug: 'anthropic-frontend-design', name: 'Anthropic Frontend Design', reason: 'Essential design tool — Anthropic Frontend Design helps you get the job done' }, { slug: 'ui-design-system', name: 'Ui Design System', reason: 'Essential design tool — Ui Design System helps you get the job done' }],
    searchLink: '/skills?q=design+ai+agent',
  },
{
    slug: 'ecommerce-ai-agent',
    title: 'E-commerce AI Agent',
    description: 'An AI agent that automates product listing, inventory sync, review analysis, and personalized recommendations.',
    icon: '🛒',
    skills: [{ slug: 'ecommerce-copy-humanizer-zh', name: 'Ecommerce Copy Humanizer Zh', reason: 'Essential e-commerce tool — Ecommerce Copy Humanizer Zh helps you get the job done' }, { slug: 'ecommerce-image-asset-generator', name: 'Ecommerce Image Asset Generator', reason: 'Essential e-commerce tool — Ecommerce Image Asset Generator helps you get the job done' }, { slug: 'agent-commerce-engine', name: 'Agent Commerce Engine', reason: 'Essential e-commerce tool — Agent Commerce Engine helps you get the job done' }, { slug: 'agentic-commerce', name: 'Agentic Commerce - Buy IRL Items With USDC', reason: 'Essential e-commerce tool — Agentic Commerce - Buy IRL Items With USDC helps you get the job done' }, { slug: 'mpc-accept-crypto-payments', name: 'MoonPay Commerce (Helio) Accept Crypto Payments', reason: 'Essential e-commerce tool — MoonPay Commerce (Helio) Accept Crypto Payments helps you get the job done' }],
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
    skills: [{ slug: 'email-triage', name: 'email-triage', reason: 'Essential email tool — email-triage helps you get the job done' }, { slug: 'email-management', name: 'Email Management', reason: 'Essential email tool — Email Management helps you get the job done' }, { slug: 'email-news-digest', name: 'Email News Digest', reason: 'Essential email tool — Email News Digest helps you get the job done' }, { slug: 'email-sender', name: 'Email Sender', reason: 'Essential email tool — Email Sender helps you get the job done' }, { slug: 'email-security', name: 'Email Security', reason: 'Essential email tool — Email Security helps you get the job done' }],
    searchLink: '/skills?q=email+ai+agent',
  },
{
    slug: 'engineering-ai-agent',
    title: 'Engineering AI Agent',
    description: 'An AI agent that supports software and systems engineering through code assistance, architecture review, and infrastructure monitoring.',
    icon: '⚙️',
    skills: [{ slug: 'engineering-as-marketing', name: 'Engineering as Marketing', reason: 'Essential engineering tool — Engineering as Marketing helps you get the job done' }, { slug: 'afrexai-engineering-manager', name: 'Engineering Manager OS', reason: 'Essential engineering tool — Engineering Manager OS helps you get the job done' }, { slug: 'em-intel', name: 'Engineering Manager Intelligence — Team Performance & Project Health', reason: 'Essential engineering tool — Engineering Manager Intelligence — Team Performance & Projec helps you get the job done' }, { slug: 'context-engineering', name: 'Agent-Skills-for-Context-Engineering', reason: 'Essential engineering tool — Agent-Skills-for-Context-Engineering helps you get the job done' }, { slug: 'mampe-industrial-core', name: 'MAMPE Industrial Engineering Expertise', reason: 'Essential engineering tool — MAMPE Industrial Engineering Expertise helps you get the job done' }],
    searchLink: '/skills?q=engineering+ai+agent',
  },
{
    slug: 'ai-agent-for-accounting',
    title: 'AI Accounting Assistant',
    description: 'Automates financial tasks and ensures accuracy in accounting processes.',
    icon: 'e',
    skills: [{ slug: 'accounting-finance-system-skill', name: 'Accounting Finance System Research Skill', reason: 'Essential accounting assistant tool — Accounting Finance System Research Skill helps you get the job done' }, { slug: 'dashboard-greek-accounting', name: 'Dashboard Greek Accounting', reason: 'Essential accounting assistant tool — Dashboard Greek Accounting helps you get the job done' }, { slug: 'qb', name: 'QuickBooks for Beginners | Accounting skills', reason: 'Essential accounting assistant tool — QuickBooks for Beginners | Accounting skills helps you get the job done' }],
    searchLink: '/skills?q=ai-agent-for-accounting',
  },
{
    slug: 'ai-agent-for-app-development',
    title: 'AI App Development Assistant',
    description: 'Assists in building and managing software applications.',
    icon: 'e',
    skills: [{ slug: 'app', name: 'App', reason: 'Essential app development assistant tool — App helps you get the job done' }, { slug: 'app-store-changelog', name: 'App Store Changelog', reason: 'Essential app development assistant tool — App Store Changelog helps you get the job done' }, { slug: 'app-store-optimization', name: 'App Store Optimization', reason: 'Essential app development assistant tool — App Store Optimization helps you get the job done' }, { slug: 'app-store-screenshots', name: 'App Store Screenshots', reason: 'Essential app development assistant tool — App Store Screenshots helps you get the job done' }, { slug: 'app-store-connect', name: 'App Store Connect', reason: 'Essential app development assistant tool — App Store Connect helps you get the job done' }],
    searchLink: '/skills?q=ai-agent-for-app-development',
  },
{
    slug: 'ai-agent-for-architecture-design',
    title: 'AI Architecture Designer',
    description: 'Supports in creating and optimizing architectural designs.',
    icon: 'e',
    skills: [{ slug: 'architecture', name: 'Architecture', reason: 'Essential architecture designer tool — Architecture helps you get the job done' }, { slug: 'design-critique', name: 'Designers Eye', reason: 'Essential architecture designer tool — Designers Eye helps you get the job done' }, { slug: 'designer-intelligence-station', name: 'Designer Intelligence Station', reason: 'Essential architecture designer tool — Designer Intelligence Station helps you get the job done' }, { slug: 'frontend-design-ultimate', name: 'Frontend Design Ultimate', reason: 'Essential architecture designer tool — Frontend Design Ultimate helps you get the job done' }, { slug: 'frontend', name: 'Frontend Design', reason: 'Essential architecture designer tool — Frontend Design helps you get the job done' }],
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
    skills: [{ slug: 'analyst', name: 'Analyst', reason: 'Essential bug bounty analyst tool — Analyst helps you get the job done' }, { slug: 'bug-bounty', name: 'Bug Bounty', reason: 'Essential bug bounty analyst tool — Bug Bounty helps you get the job done' }, { slug: 'bounty-hunter-pro', name: 'Bounty Hunter Pro', reason: 'Essential bug bounty analyst tool — Bounty Hunter Pro helps you get the job done' }, { slug: 'analyst-watchdog', name: 'Analyst Watchdog', reason: 'Essential bug bounty analyst tool — Analyst Watchdog helps you get the job done' }, { slug: 'bug-reaper', name: 'Bug Reaper', reason: 'Essential bug bounty analyst tool — Bug Reaper helps you get the job done' }],
    searchLink: '/skills?q=ai-agent-for-bug-bounty',
  },
{
    slug: 'ai-agent-for-business-analyst',
    title: 'AI Agent for Business Analyst',
    description: 'Automates data analysis and decision-making for business insights.',
    icon: 'e',
    skills: [{ slug: 'analyst', name: 'Analyst', reason: 'Essential agent for business analyst tool — Analyst helps you get the job done' }, { slug: 'business', name: 'Business Strategy', reason: 'Essential agent for business analyst tool — Business Strategy helps you get the job done' }, { slug: 'business-model-canvas', name: 'Business Model Canvas', reason: 'Essential agent for business analyst tool — Business Model Canvas helps you get the job done' }, { slug: 'business-plan', name: 'Business Plan', reason: 'Essential agent for business analyst tool — Business Plan helps you get the job done' }, { slug: 'business-administration', name: 'Business Administration', reason: 'Essential agent for business analyst tool — Business Administration helps you get the job done' }],
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
    skills: [{ slug: 'afrexai-email-crafter', name: 'Cold Email Writer', reason: 'Essential agent for cold calling tool — Cold Email Writer helps you get the job done' }, { slug: 'cold-outreach-skill', name: 'Cold Outreach Skill', reason: 'Essential agent for cold calling tool — Cold Outreach Skill helps you get the job done' }, { slug: 'skill-cold-email-outreach', name: 'Cold Email Outreach', reason: 'Essential agent for cold calling tool — Cold Email Outreach helps you get the job done' }, { slug: 'cold-outreach-pack', name: 'Cold Outreach Pack', reason: 'Essential agent for cold calling tool — Cold Outreach Pack helps you get the job done' }, { slug: 'cold-email', name: 'MachFive Cold Email', reason: 'Essential agent for cold calling tool — MachFive Cold Email helps you get the job done' }],
    searchLink: '/skills?q=ai-agent-for-cold-calling',
  },
{
    slug: 'ai-agent-for-construction',
    title: 'AI Agent for Construction',
    description: 'Optimizes project management and resource allocation in construction.',
    icon: 'e',
    skills: [{ slug: 'open-construction-estimate', name: 'Open Construction Estimate', reason: 'Essential agent for construction tool — Open Construction Estimate helps you get the job done' }, { slug: 'pandas-construction-analysis', name: 'Pandas Construction Analysis', reason: 'Essential agent for construction tool — Pandas Construction Analysis helps you get the job done' }, { slug: 'rag-construction', name: 'Rag Construction', reason: 'Essential agent for construction tool — Rag Construction helps you get the job done' }, { slug: 'afrexai-building-permits', name: 'Building Permit & Construction Permitting', reason: 'Essential agent for construction tool — Building Permit & Construction Permitting helps you get the job done' }],
    searchLink: '/skills?q=ai-agent-for-construction',
  },
{
    slug: 'ai-agent-for-data-entry',
    title: 'AI Agent for Data Entry',
    description: 'Automates and verifies data input processes.',
    icon: 'e',
    skills: [{ slug: 'data-analysis', name: 'Data Analysis', reason: 'Essential agent for data entry tool — Data Analysis helps you get the job done' }, { slug: 'data-analyst-pro', name: 'Data Analyst', reason: 'Essential agent for data entry tool — Data Analyst helps you get the job done' }, { slug: 'data-anomaly-detector', name: 'Data Anomaly Detector', reason: 'Essential agent for data entry tool — Data Anomaly Detector helps you get the job done' }, { slug: 'data-validation', name: 'Data Validation', reason: 'Essential agent for data entry tool — Data Validation helps you get the job done' }, { slug: 'data-analyst-cn', name: 'Data Analyst Cn', reason: 'Essential agent for data entry tool — Data Analyst Cn helps you get the job done' }],
    searchLink: '/skills?q=ai-agent-for-data-entry',
  },
{
    slug: 'ai-agent-for-photography',
    title: 'Photography AI Agent',
    description: 'An AI agent that assists with photo editing, composition, and visual storytelling.',
    icon: 'e',
    skills: [{ slug: 'photography', name: 'Photography', reason: 'Essential photography tool — Photography helps you get the job done' }, { slug: 'afrexai-photography-mastery', name: 'Photography Mastery', reason: 'Essential photography tool — Photography Mastery helps you get the job done' }, { slug: 'ai-product-photography', name: 'Ai Product Photography', reason: 'Essential photography tool — Ai Product Photography helps you get the job done' }],
    searchLink: '/skills?q=ai-agent-for-photography',
  },
{
    slug: 'ai-agent-for-python',
    title: 'Python AI Agent',
    description: 'An AI agent focused on Python programming, debugging, and development assistance.',
    icon: 'e',
    skills: [{ slug: 'python-harmony-compatibility-checker', name: 'Python包鸿蒙兼容性测试技能', reason: 'Essential python tool — Python包鸿蒙兼容性测试技能 helps you get the job done' }, { slug: 'py-env-setup', name: 'Python Env Setup', reason: 'Essential python tool — Python Env Setup helps you get the job done' }, { slug: 'python-cookbook', name: 'python-cookbook', reason: 'Essential python tool — python-cookbook helps you get the job done' }, { slug: 'python-venv', name: 'Python Venv', reason: 'Essential python tool — Python Venv helps you get the job done' }, { slug: 'azure-cosmos-py', name: 'Azure Cosmos DB Python', reason: 'Essential python tool — Azure Cosmos DB Python helps you get the job done' }],
    searchLink: '/skills?q=ai-agent-for-python',
  },
{
    slug: 'ai-agent-for-real-estate',
    title: 'Real Estate AI Agent',
    description: 'An AI agent that supports real estate research, property analysis, and market insights.',
    icon: 'e',
    skills: [{ slug: 'camino-real-estate', name: 'Real Estate Intelligence', reason: 'Essential real estate tool — Real Estate Intelligence helps you get the job done' }, { slug: 'afrexai-real-estate-engine', name: 'Real Estate Engine', reason: 'Essential real estate tool — Real Estate Engine helps you get the job done' }, { slug: 'real-estate-agent', name: 'Real Estate Agent', reason: 'Essential real estate tool — Real Estate Agent helps you get the job done' }, { slug: 'real-estate-debt-analysis-skill', name: 'Real Estate Debt Analysis', reason: 'Essential real estate tool — Real Estate Debt Analysis helps you get the job done' }, { slug: 're-master', name: 'Real Estate Master', reason: 'Essential real estate tool — Real Estate Master helps you get the job done' }],
    searchLink: '/skills?q=ai-agent-for-real-estate',
  },
{
    slug: 'cybersecurity-ai-agent',
    title: 'AI Agent for Cybersecurity',
    description: 'An AI agent designed to detect, analyze, and respond to cybersecurity threats in real-time.',
    icon: '🛡️',
    skills: [{ slug: 'cybersecurity', name: 'Cybersecurity', reason: 'Essential agent for cybersecurity tool — Cybersecurity helps you get the job done' }, { slug: 'afrexai-cybersecurity', name: 'Cybersecurity Risk Assessment', reason: 'Essential agent for cybersecurity tool — Cybersecurity Risk Assessment helps you get the job done' }, { slug: 'gov-cybersecurity', name: 'Government Cybersecurity Vulnerability Intel', reason: 'Essential agent for cybersecurity tool — Government Cybersecurity Vulnerability Intel helps you get the job done' }],
    searchLink: '/skills?q=cybersecurity',
  },
{
    slug: 'ai-agent-for-deployment',
    title: 'Deployment Automation Assistant',
    description: 'Streamlines and automates software deployment processes with intelligent decision-making.',
    icon: '🚀',
    skills: [{ slug: 'automation-runner', name: 'Automation Runner', reason: 'Essential deployment automation assistant tool — Automation Runner helps you get the job done' }, { slug: 'browser-automation', name: 'Browser Automation', reason: 'Essential deployment automation assistant tool — Browser Automation helps you get the job done' }, { slug: 'xiaohongshu-mcp', name: 'Xiaohongshu (小红书) Automation', reason: 'Essential deployment automation assistant tool — Xiaohongshu (小红书) Automation helps you get the job done' }, { slug: 'playwright', name: 'Playwright (Automation + MCP + Scraper)', reason: 'Essential deployment automation assistant tool — Playwright (Automation + MCP + Scraper) helps you get the job done' }, { slug: 'openclaw-anything', name: 'Comprehensive skill for installing, configuring, and managing the OpenClaw ecosystem (Gateway, Channels, Models, Automation, Nodes, and Deployment)', reason: 'Essential deployment automation assistant tool — Comprehensive skill for installing, configuring, and managin helps you get the job done' }],
    searchLink: '/skills?q=deployment',
  },
{
    slug: 'ai-agent-for-ecommerce',
    title: 'E-commerce Assistant',
    description: 'An AI agent that helps manage and optimize e-commerce operations.',
    icon: '🛒',
    skills: [{ slug: 'ecommerce-copy-humanizer-zh', name: 'Ecommerce Copy Humanizer Zh', reason: 'Essential e-commerce assistant tool — Ecommerce Copy Humanizer Zh helps you get the job done' }, { slug: 'ecommerce-image-asset-generator', name: 'Ecommerce Image Asset Generator', reason: 'Essential e-commerce assistant tool — Ecommerce Image Asset Generator helps you get the job done' }, { slug: 'agent-commerce-engine', name: 'Agent Commerce Engine', reason: 'Essential e-commerce assistant tool — Agent Commerce Engine helps you get the job done' }, { slug: 'agentic-commerce', name: 'Agentic Commerce - Buy IRL Items With USDC', reason: 'Essential e-commerce assistant tool — Agentic Commerce - Buy IRL Items With USDC helps you get the job done' }, { slug: 'mpc-accept-crypto-payments', name: 'MoonPay Commerce (Helio) Accept Crypto Payments', reason: 'Essential e-commerce assistant tool — MoonPay Commerce (Helio) Accept Crypto Payments helps you get the job done' }],
    searchLink: '/skills?q=ecommerce',
  },
{
    slug: 'enterprise-ai-assistant',
    title: 'Enterprise AI Assistant',
    description: 'An AI agent designed to streamline operations, enhance productivity, and support decision-making in enterprise environments.',
    icon: '🤖',
    skills: [{ slug: 'enterprise', name: 'Enterprise', reason: 'Essential enterprise assistant tool — Enterprise helps you get the job done' }, { slug: 'enterprisecontact', name: 'Enterprise Contact Information Query - 企业联系方式查询', reason: 'Essential enterprise assistant tool — Enterprise Contact Information Query - 企业联系方式查询 helps you get the job done' }, { slug: 'claw-desktop-pet', name: 'Claw Desktop Pet - Enterprise-grade 7x24 AI Assistant', reason: 'Essential enterprise assistant tool — Claw Desktop Pet - Enterprise-grade 7x24 AI Assistant helps you get the job done' }, { slug: 'operation-platform-enterprise-knowledge', name: '运营平台知识检索', reason: 'Essential enterprise assistant tool — 运营平台知识检索 helps you get the job done' }, { slug: 'jvs-enterprise-wechat', name: '企业微信 AI Bot 对接', reason: 'Essential enterprise assistant tool — 企业微信 AI Bot 对接 helps you get the job done' }],
    searchLink: '/skills?q=enterprise-ai-assistant',
  },
{
    slug: 'finance-ai-agent',
    title: 'Financial Insights Assistant',
    description: 'An AI agent that provides financial analysis, reporting, and decision support.',
    icon: '💰',
    skills: [{ slug: 'finance-news', name: 'Finance News Briefings', reason: 'Essential financial insights assistant tool — Finance News Briefings helps you get the job done' }, { slug: 'financial-calculator', name: 'Financial Calculator Pro', reason: 'Essential financial insights assistant tool — Financial Calculator Pro helps you get the job done' }, { slug: 'financial-analyst', name: 'Financial Analyst', reason: 'Essential financial insights assistant tool — Financial Analyst helps you get the job done' }, { slug: 'finance-skill', name: 'Finance Skill', reason: 'Essential financial insights assistant tool — Finance Skill helps you get the job done' }, { slug: 'afrexai-financial-due-diligence', name: 'Financial Due Diligence Analyzer', reason: 'Essential financial insights assistant tool — Financial Due Diligence Analyzer helps you get the job done' }],
    searchLink: '/skills?q=finance',
  },
{
    slug: 'fraud-detection-agent',
    title: 'AI Agent for Fraud Detection',
    description: 'Identifies and prevents fraudulent activities using advanced analytics and machine learning.',
    icon: '🛡️',
    skills: [{ slug: 'agent-tinman', name: 'Tinman -  AI Failure Mode Research, Prompt Injection & Tool Exfil Detection', reason: 'Essential agent for fraud detection tool — Tinman -  AI Failure Mode Research, Prompt Injection & Tool  helps you get the job done' }, { slug: 'detect-injection', name: 'Prompt injection detection skill', reason: 'Essential agent for fraud detection tool — Prompt injection detection skill helps you get the job done' }, { slug: 'data-silo-detection', name: 'Data Silo Detection', reason: 'Essential agent for fraud detection tool — Data Silo Detection helps you get the job done' }, { slug: 'image-detection', name: 'Image Detection', reason: 'Essential agent for fraud detection tool — Image Detection helps you get the job done' }, { slug: 'secret-detection', name: 'Secret Detection', reason: 'Essential agent for fraud detection tool — Secret Detection helps you get the job done' }],
    searchLink: '/skills?q=fraud+detection',
  },
{
    slug: 'ai-agent-for-game-development',
    title: 'Game Development Assistant',
    description: 'An AI agent that helps with game design, scripting, and asset management.',
    icon: '🎮',
    skills: [{ slug: 'game-development', name: 'Game Development', reason: 'Essential game development assistant tool — Game Development helps you get the job done' }, { slug: 'game-developer-skill', name: 'game-developer-skill', reason: 'Essential game development assistant tool — game-developer-skill helps you get the job done' }, { slug: 'game-changing-features', name: 'Game Changing Features', reason: 'Essential game development assistant tool — Game Changing Features helps you get the job done' }, { slug: 'game-engine', name: 'Game Engine', reason: 'Essential game development assistant tool — Game Engine helps you get the job done' }, { slug: 'game-designer-toolkit', name: 'Game Designer Toolkit', reason: 'Essential game development assistant tool — Game Designer Toolkit helps you get the job done' }],
    searchLink: '/skills?q=game+development',
  },
{
    slug: 'google-workspace-ai',
    title: 'AI Assistant for Google Workspace',
    description: 'Automate tasks and enhance productivity within Google Workspace with AI-driven assistance.',
    icon: '🤖',
    skills: [{ slug: 'google-workspace-mcp', name: 'Google Workspace (No Cloud Console)', reason: 'Essential assistant for google workspace tool — Google Workspace (No Cloud Console) helps you get the job done' }, { slug: 'google-slides', name: 'Google Slides', reason: 'Essential assistant for google workspace tool — Google Slides helps you get the job done' }, { slug: 'google-meet', name: 'Google Meet', reason: 'Essential assistant for google workspace tool — Google Meet helps you get the job done' }, { slug: 'google-play', name: 'Google Play', reason: 'Essential assistant for google workspace tool — Google Play helps you get the job done' }, { slug: 'google-calendar', name: 'Google Calendar', reason: 'Essential assistant for google workspace tool — Google Calendar helps you get the job done' }],
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
    skills: [{ slug: 'image-ocr', name: 'Image Ocr', reason: 'Essential image processing assistant tool — Image Ocr helps you get the job done' }, { slug: 'wangziiiii', name: 'Image Processing Toolkit', reason: 'Essential image processing assistant tool — Image Processing Toolkit helps you get the job done' }, { slug: 'image-gen', name: 'Image Gen', reason: 'Essential image processing assistant tool — Image Gen helps you get the job done' }, { slug: 'image-vision', name: 'Image Vision', reason: 'Essential image processing assistant tool — Image Vision helps you get the job done' }, { slug: 'bria-ai', name: 'Image generation and editing', reason: 'Essential image processing assistant tool — Image generation and editing helps you get the job done' }],
    searchLink: '/skills?q=image+processing',
  },
{
    slug: 'insurance-ai-agent',
    title: 'AI Agent for Insurance',
    description: 'Assists with insurance-related tasks using AI technology.',
    icon: '🛡️',
    skills: [{ slug: 'insurance', name: 'Insurance', reason: 'Essential agent for insurance tool — Insurance helps you get the job done' }, { slug: 'insurance-advisor', name: 'insurance advisor', reason: 'Essential agent for insurance tool — insurance advisor helps you get the job done' }, { slug: 'afrexai-insurance-automation', name: 'Insurance Operations Automation', reason: 'Essential agent for insurance tool — Insurance Operations Automation helps you get the job done' }, { slug: 'afrexai-insurance-claims', name: 'Insurance Claims Processor', reason: 'Essential agent for insurance tool — Insurance Claims Processor helps you get the job done' }, { slug: 'insurance-broker', name: 'Insurance Broker', reason: 'Essential agent for insurance tool — Insurance Broker helps you get the job done' }],
    searchLink: '/skills?q=insurance',
  },
{
    slug: 'inventory-ai-agent',
    title: 'Smart Inventory Management',
    description: 'An AI agent that helps track, analyze, and optimize inventory levels.',
    icon: '📦',
    skills: [{ slug: 'management', name: 'Management', reason: 'Essential smart inventory management tool — Management helps you get the job done' }, { slug: 'inventory-manager', name: 'inventory manager', reason: 'Essential smart inventory management tool — inventory manager helps you get the job done' }, { slug: 'social-media-management', name: 'Social Media Management', reason: 'Essential smart inventory management tool — Social Media Management helps you get the job done' }, { slug: 'todo-management-1-1-2', name: 'Todo Management 1.1.2', reason: 'Essential smart inventory management tool — Todo Management 1.1.2 helps you get the job done' }, { slug: 'email-management', name: 'Email Management', reason: 'Essential smart inventory management tool — Email Management helps you get the job done' }],
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
    skills: [{ slug: 'video-subtitles', name: 'Video Subtitles', reason: 'Essential assistant for video tasks tool — Video Subtitles helps you get the job done' }, { slug: 'video-cog', name: 'Video Cog', reason: 'Essential assistant for video tasks tool — Video Cog helps you get the job done' }, { slug: 'video-agent', name: 'Video Agent (Deprecated)', reason: 'Essential assistant for video tasks tool — Video Agent (Deprecated) helps you get the job done' }, { slug: 'avatar-video-messages', name: 'Video Messages from your openclaw', reason: 'Essential assistant for video tasks tool — Video Messages from your openclaw helps you get the job done' }, { slug: 'no-nonsense-tasks', name: 'Tasks Skill', reason: 'Essential assistant for video tasks tool — Tasks Skill helps you get the job done' }],
    searchLink: '/skills?q=video',
  },
{
    slug: 'website-ai-agent',
    title: 'AI Assistant for Website Management',
    description: 'An AI agent that helps manage and optimize website content, performance, and user engagement.',
    icon: '🌐',
    skills: [{ slug: 'management', name: 'Management', reason: 'Essential assistant for website management tool — Management helps you get the job done' }, { slug: 'website-usability-test-nova-act', name: 'Website Usability Testing using Nova Act', reason: 'Essential assistant for website management tool — Website Usability Testing using Nova Act helps you get the job done' }, { slug: 'website-monitor', name: 'Website Monitor', reason: 'Essential assistant for website management tool — Website Monitor helps you get the job done' }, { slug: 'nova-act-usability', name: 'Website Usability Test Nova Act', reason: 'Essential assistant for website management tool — Website Usability Test Nova Act helps you get the job done' }, { slug: 'website-auditor', name: 'Website Auditor', reason: 'Essential assistant for website management tool — Website Auditor helps you get the job done' }],
    searchLink: '/skills?q=website',
  },
{
    slug: 'logistics-optimizer',
    title: 'AI Agent for Logistics',
    description: 'Streamlines supply chain and delivery operations with intelligent automation.',
    icon: '🚚',
    skills: [{ slug: 'logistics-tracking', name: 'Logistics Tracking', reason: 'Essential agent for logistics tool — Logistics Tracking helps you get the job done' }, { slug: 'logistics-watcher', name: 'Logistics Watcher', reason: 'Essential agent for logistics tool — Logistics Watcher helps you get the job done' }, { slug: 'express', name: 'Express Logistics Track - 快递物流查询', reason: 'Essential agent for logistics tool — Express Logistics Track - 快递物流查询 helps you get the job done' }, { slug: 'returns-reverse-logistics', name: 'Returns Reverse Logistics', reason: 'Essential agent for logistics tool — Returns Reverse Logistics helps you get the job done' }, { slug: 'kuaidi100-logistics', name: 'kuaidi100-logistics', reason: 'Essential agent for logistics tool — kuaidi100-logistics helps you get the job done' }],
    searchLink: '/skills?q=logistics',
  },
{
    slug: 'data-science-ai',
    title: 'AI Agent for Data Science',
    description: 'An AI agent that assists with data science tasks, including analysis, visualization, and modeling.',
    icon: '🧠',
    skills: [{ slug: 'science', name: 'Science', reason: 'Essential agent for data science tool — Science helps you get the job done' }, { slug: 'data-analysis', name: 'Data Analysis', reason: 'Essential agent for data science tool — Data Analysis helps you get the job done' }, { slug: 'data-analyst-pro', name: 'Data Analyst', reason: 'Essential agent for data science tool — Data Analyst helps you get the job done' }, { slug: 'data-anomaly-detector', name: 'Data Anomaly Detector', reason: 'Essential agent for data science tool — Data Anomaly Detector helps you get the job done' }, { slug: 'data-validation', name: 'Data Validation', reason: 'Essential agent for data science tool — Data Validation helps you get the job done' }],
    searchLink: '/skills?q=data+science',
  },
{
    slug: 'python-ai-helper',
    title: 'AI Assistant for Python',
    description: 'An AI agent that helps with Python development tasks, code generation, and problem solving.',
    icon: '🐍',
    skills: [{ slug: 'python-harmony-compatibility-checker', name: 'Python包鸿蒙兼容性测试技能', reason: 'Essential assistant for python tool — Python包鸿蒙兼容性测试技能 helps you get the job done' }, { slug: 'py-env-setup', name: 'Python Env Setup', reason: 'Essential assistant for python tool — Python Env Setup helps you get the job done' }, { slug: 'python-cookbook', name: 'python-cookbook', reason: 'Essential assistant for python tool — python-cookbook helps you get the job done' }, { slug: 'python-venv', name: 'Python Venv', reason: 'Essential assistant for python tool — Python Venv helps you get the job done' }, { slug: 'azure-cosmos-py', name: 'Azure Cosmos DB Python', reason: 'Essential assistant for python tool — Azure Cosmos DB Python helps you get the job done' }],
    searchLink: '/skills?q=python',
  }
]
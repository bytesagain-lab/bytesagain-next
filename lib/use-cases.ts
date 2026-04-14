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

  // ── CREATE ─────────────────────────────────────────────
  {
    slug: 'content-creator',
    title: 'Content Creator Toolkit',
    description: 'AI skills for YouTubers, bloggers, and social media creators who want to produce more content with less effort.',
    icon: '🎬',
    skills: [
      { slug: 'clawhub-content-strategy', name: 'Content Strategy', reason: 'Top-rated content skill with 6579 downloads' }, { slug: 'shopify-toolkit', name: 'shopify toolkit', reason: 'Top-rated toolkit skill with 499 downloads' }, { slug: 'agent-toolkit', name: 'agent toolkit', reason: 'Top-rated toolkit skill with 426 downloads' }, { slug: 'homeassistant-toolkit', name: 'Homeassistant Toolkit', reason: 'Top-rated toolkit skill with 371 downloads' }, { slug: 'discord-toolkit', name: 'discord toolkit', reason: 'Top-rated toolkit skill with 340 downloads' }
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

  // ── LEARN ──────────────────────────────────────────────
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

  // ── INVEST ─────────────────────────────────────────────
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

  // ── LIFE ───────────────────────────────────────────────
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

  // ── NEW: HackerNews-validated high-demand use cases ──
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

  // ── DATA-DRIVEN: tag gap analysis (writing/data/seo/ecommerce/translation/health) ──
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


  // ── AUTO-GENERATED: 2026-04-02 ──
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


  // ── n8n categories ──
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
      { slug: 'coze-studio', name: 'Coze Studio', reason: 'Top-rated studio skill with 277 downloads' }, { slug: 'azuredatastudio', name: 'azuredatastudio', reason: 'Top-rated studio skill with 264 downloads' }, { slug: 'clawhub-content-strategy', name: 'Content Strategy', reason: 'Top-rated content skill with 6579 downloads' }
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


  // ── n8n categories ──
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


  // ── n8n categories ──
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


  // ── n8n categories ──
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


  // ── n8n categories ──
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


  // ── n8n categories ──
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


  // ── Google 补全驱动 ──
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


  // ── Google Autocomplete ──
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


  // ── Google Autocomplete ──
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


  // ── Google Autocomplete ──
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


  // ── Google Autocomplete ──
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
    slug: 'data-entry-ai-agent',
    title: 'Data Entry AI Agent',
    description: 'An AI agent that auto-populates forms, cleans spreadsheets, validates inputs, and syncs across CRMs, ERPs, and legacy systems.',
    icon: '📋',
    skills: [
      { slug: 'data-analysis', name: 'Data Analysis', reason: 'Top-rated data skill with 19813 downloads' }, { slug: 'data-analyst-pro', name: 'Data Analyst', reason: 'Top-rated data skill with 3316 downloads' }, { slug: 'data-anomaly-detector', name: 'Data Anomaly Detector', reason: 'Top-rated data skill with 2494 downloads' }, { slug: 'data-cog', name: 'Data Cog', reason: 'Top-rated data skill with 1641 downloads' }, { slug: 'database-design', name: 'database design', reason: 'Top-rated data skill with 1012 downloads' }
    ],
    searchLink: '/skills?q=data+entry+ai+agent',
  },
  {
    slug: 'data-science-ai-agent',
    title: 'Data Science AI Agent',
    description: 'An AI agent that assists with exploratory analysis, model prototyping, experiment tracking, and ML pipeline orchestration.',
    icon: '🔬',
    skills: [
      { slug: 'data-analysis', name: 'Data Analysis', reason: 'Top-rated data skill with 19813 downloads' }, { slug: 'data-analyst-pro', name: 'Data Analyst', reason: 'Top-rated data skill with 3316 downloads' }, { slug: 'data-anomaly-detector', name: 'Data Anomaly Detector', reason: 'Top-rated data skill with 2494 downloads' }, { slug: 'data-cog', name: 'Data Cog', reason: 'Cognitive data processing for complex analytical and pattern recognition tasks' }, { slug: 'database-design', name: 'database design', reason: 'Top-rated data skill with 1012 downloads' }
    ],
    searchLink: '/skills?q=data+science+ai+agent',
  },
  {
    slug: 'database-ai-agent',
    title: 'Database AI Agent',
    description: 'An AI agent that writes, tests, optimizes, and documents SQL queries while monitoring schema health and access patterns.',
    icon: '🗃️',
    skills: [
      { slug: 'database-design', name: 'database design', reason: 'Top-rated database skill with 1012 downloads' }, { slug: 'agent-learner', name: 'agent learner', reason: 'Top-rated agent skill with 337 downloads' }, { slug: 'developer-agent', name: 'developer-agent', reason: 'Top-rated agent skill with 797 downloads' }, { slug: 'agent-toolkit', name: 'agent toolkit', reason: 'Top-rated agent skill with 426 downloads' }, { slug: 'agent-ops-framework', name: 'agent ops framework', reason: 'Top-rated agent skill with 402 downloads' }
    ],
    searchLink: '/skills?q=database+ai+agent',
  },
  {
    slug: 'deployment-ai-agent',
    title: 'Deployment AI Agent',
    description: 'An AI agent that automates CI/CD pipelines, environment provisioning, health checks, rollback triggers, and infrastructure-as-code validation.',
    icon: '🚀',
    skills: [
      { slug: 'developer-agent', name: 'developer-agent', reason: 'Top-rated agent skill with 797 downloads' }, { slug: 'agent-toolkit', name: 'agent toolkit', reason: 'Top-rated agent skill with 426 downloads' }, { slug: 'agent-ops-framework', name: 'agent ops framework', reason: 'Top-rated agent skill with 402 downloads' }, { slug: 'agent-learner', name: 'agent learner', reason: 'Top-rated agent skill with 337 downloads' }
    ],
    searchLink: '/skills?q=deployment+ai+agent',
  },


  // ── Google Autocomplete ──
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


  // ── Google Autocomplete ──
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


  // ── Google Autocomplete ──
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


  // ── Google Autocomplete ──
  {
    slug: 'bug-bounty-ai-agent',
    title: 'Bug Bounty Assistant',
    description: 'An AI agent that automates vulnerability discovery, triage, and report generation for ethical hackers.',
    icon: '🕵️',
    skills: [
      { slug: 'homeassistant-toolkit', name: 'Homeassistant Toolkit', reason: 'Top-rated assistant skill with 371 downloads' }, { slug: 'system-data-intelligence-skill', name: 'It is designed for scenarios that requir', reason: 'Highly-rated productivity skill' }
    ],
    searchLink: '/skills?q=security-scanner+code-reviewer+web-scraper+api-tester+report-generator',
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
    slug: 'cold-calling-ai-agent',
    title: 'Cold Calling Orchestrator',
    description: 'An AI agent that automates prospect research, script personalization, call execution, and post-call CRM updates.',
    icon: '📈',
    skills: [
      { slug: 'system-data-intelligence-skill', name: 'It is designed for scenarios that requir', reason: 'Highly-rated productivity skill' }
    ],
    searchLink: '/skills?q=lead-generator+support-bot+crm-manager+note-taker+email-assistant',
  },


  // ── Google Autocomplete ──
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


  // ── Google Autocomplete ──
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


  // ── Google Autocomplete ──
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


  // ── Google Autocomplete ──
  {
    slug: 'ai-agent-for-medical',
    title: 'Medical AI Agent',
    description: 'An AI agent specialized in medical information, diagnosis support, and health-related tasks.',
    icon: 'e',
    skills: [
      { slug: 'agent-learner', name: 'agent learner', reason: 'Top-rated agent skill with 337 downloads' }, { slug: 'developer-agent', name: 'developer-agent', reason: 'Top-rated agent skill with 797 downloads' }, { slug: 'agent-toolkit', name: 'agent toolkit', reason: 'Top-rated agent skill with 426 downloads' }, { slug: 'agent-ops-framework', name: 'agent ops framework', reason: 'Top-rated agent skill with 402 downloads' }
    ],
    searchLink: '/skills?q=ai-agent-for-medical',
  },
  {
    slug: 'ai-agent-for-news',
    title: 'News AI Agent',
    description: 'An AI agent that curates, summarizes, and analyzes news content from various sources.',
    icon: 'e',
    skills: [
      { slug: 'crypto-news-feed', name: 'Crypto News Feed', reason: 'Top-rated news skill with 375 downloads' }, { slug: 'newsletter-writer', name: 'newsletter writer', reason: 'Top-rated news skill with 347 downloads' }, { slug: 'developer-agent', name: 'developer-agent', reason: 'Top-rated agent skill with 797 downloads' }, { slug: 'agent-toolkit', name: 'agent toolkit', reason: 'Top-rated agent skill with 426 downloads' }, { slug: 'agent-ops-framework', name: 'agent ops framework', reason: 'Top-rated agent skill with 402 downloads' }
    ],
    searchLink: '/skills?q=ai-agent-for-news',
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

  // retry
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

  // retry
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

  // retry
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

  // retry
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

  // retry
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

  // retry
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

  // retry
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

  // retry
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

  // retry
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

  // retry
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

  // retry
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

  // retry
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

  // retry
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

  // retry
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

  // retry
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
  },

  {
    slug: 'test-automation-ai',
    title: 'AI Agent for Test Automation',
    description: 'Automates software testing processes using AI-driven test case generation and execution.',
    icon: '🧪',
    skills: [
      { slug: 'test-generator', name: 'test generator', reason: 'Top-rated test skill with 855 downloads' }, { slug: 'developer-agent', name: 'developer-agent', reason: 'Top-rated agent skill with 797 downloads' }, { slug: 'agent-toolkit', name: 'agent toolkit', reason: 'Top-rated agent skill with 426 downloads' }, { slug: 'agent-ops-framework', name: 'agent ops framework', reason: 'Top-rated agent skill with 402 downloads' }, { slug: 'agent-learner', name: 'agent learner', reason: 'Top-rated agent skill with 337 downloads' }
    ],
    searchLink: '/skills?q=test-automation',
  },

  {
    slug: 'software-testing-ai',
    title: 'AI Agent for Software Testing',
    description: 'Automates and optimizes the software testing process with intelligent test case generation and execution.',
    icon: '🧪',
    skills: [
      { slug: 'developer-agent', name: 'developer-agent', reason: 'Top-rated agent skill with 797 downloads' }, { slug: 'agent-toolkit', name: 'agent toolkit', reason: 'Top-rated agent skill with 426 downloads' }, { slug: 'agent-ops-framework', name: 'agent ops framework', reason: 'Top-rated agent skill with 402 downloads' }, { slug: 'agent-learner', name: 'agent learner', reason: 'Top-rated agent skill with 337 downloads' }
    ],
    searchLink: '/skills?q=software+testing',
  },

  {
    slug: 'bug-bounty-hunter',
    title: 'AI Agent for Bug Bounty Hunting',
    description: 'Automates the discovery and reporting of security vulnerabilities in web applications.',
    icon: '🐞',
    skills: [
      { slug: 'developer-agent', name: 'developer-agent', reason: 'Top-rated agent skill with 797 downloads' }, { slug: 'agent-toolkit', name: 'agent toolkit', reason: 'Top-rated agent skill with 426 downloads' }, { slug: 'agent-ops-framework', name: 'agent ops framework', reason: 'Top-rated agent skill with 402 downloads' }, { slug: 'agent-learner', name: 'agent learner', reason: 'Top-rated agent skill with 337 downloads' }
    ],
    searchLink: '/skills?q=bug+bounty',
  },

  {
    slug: 'ai-research-assistant',
    title: 'AI Research Assistant',
    description: 'An AI agent designed to support academic research with data analysis, literature review, and report generation.',
    icon: '🧠',
    skills: [
      { slug: 'system-data-intelligence-skill', name: 'It is designed for scenarios that requir', reason: 'Top-rated research skill with 885 downloads' }, { slug: 'homeassistant-toolkit', name: 'Homeassistant Toolkit', reason: 'Top-rated assistant skill with 371 downloads' }
    ],
    searchLink: '/skills?q=research+assistant',
  },

  {
    slug: 'photo-ai-helper',
    title: 'Smart Photography Assistant',
    description: 'An AI agent that helps with photo editing, composition suggestions, and camera settings.',
    icon: '📷',
    skills: [
      { slug: 'smart-lights', name: 'smart lights', reason: 'Top-rated smart skill with 119 downloads' }, { slug: 'homeassistant-toolkit', name: 'Homeassistant Toolkit', reason: 'Top-rated assistant skill with 371 downloads' }, { slug: 'system-data-intelligence-skill', name: 'It is designed for scenarios that requir', reason: 'Highly-rated productivity skill' }
    ],
    searchLink: '/skills?q=photo',
  },

  {
    slug: 'game-ai-developer',
    title: 'AI Agent for Game Development',
    description: 'Assists in creating and optimizing game development processes using AI.',
    icon: '🕹️',
    skills: [
      { slug: 'developer-agent', name: 'developer-agent', reason: 'Top-rated agent skill with 797 downloads' }, { slug: 'agent-toolkit', name: 'agent toolkit', reason: 'Top-rated agent skill with 426 downloads' }, { slug: 'agent-ops-framework', name: 'agent ops framework', reason: 'Top-rated agent skill with 402 downloads' }, { slug: 'agent-learner', name: 'agent learner', reason: 'Top-rated agent skill with 337 downloads' }
    ],
    searchLink: '/skills?q=game-development',
  },

  {
    slug: 'customer-onboarding-agent',
    title: 'AI Agent for Customer Onboarding',
    description: 'Streamlines the customer onboarding process with automated tasks and personalized support.',
    icon: '🤝',
    skills: [
      { slug: 'customer-service-reply', name: 'customer service reply', reason: 'Top-rated customer skill with 650 downloads' }, { slug: 'developer-agent', name: 'developer-agent', reason: 'Top-rated agent skill with 797 downloads' }, { slug: 'agent-toolkit', name: 'agent toolkit', reason: 'Top-rated agent skill with 426 downloads' }, { slug: 'agent-ops-framework', name: 'agent ops framework', reason: 'Top-rated agent skill with 402 downloads' }, { slug: 'agent-learner', name: 'agent learner', reason: 'Top-rated agent skill with 337 downloads' }
    ],
    searchLink: '/skills?q=customer+onboarding',
  },

  {
    slug: 'contract-ai-agent',
    title: 'AI Agent for Contract Management',
    description: 'Automates contract creation, review, and management with AI-powered insights.',
    icon: '📄',
    skills: [
      { slug: 'freedcamp-agent-skill', name: 'Freedcamp Project Management', reason: 'Top-rated management skill with 1257 downloads' }, { slug: 'developer-agent', name: 'developer-agent', reason: 'Top-rated agent skill with 797 downloads' }, { slug: 'agent-toolkit', name: 'agent toolkit', reason: 'Top-rated agent skill with 426 downloads' }, { slug: 'agent-ops-framework', name: 'agent ops framework', reason: 'Top-rated agent skill with 402 downloads' }, { slug: 'agent-learner', name: 'agent learner', reason: 'Top-rated agent skill with 337 downloads' }
    ],
    searchLink: '/skills?q=contract-management',
  },

  {
    slug: 'tax-filing-assistant',
    title: 'AI Tax Filing Assistant',
    description: 'An AI agent that simplifies tax filing by gathering information, calculating deductions, and generating forms.',
    icon: '💰',
    skills: [
      { slug: 'icp-filing', name: 'icp filing', reason: 'Top-rated filing skill with 360 downloads' }, { slug: 'homeassistant-toolkit', name: 'Homeassistant Toolkit', reason: 'Top-rated assistant skill with 371 downloads' }, { slug: 'system-data-intelligence-skill', name: 'It is designed for scenarios that requir', reason: 'Highly-rated productivity skill' }
    ],
    searchLink: '/skills?q=tax+filing',
  },

  {
    slug: 'supply-chain-optimizer',
    title: 'AI Agent for Supply Chain',
    description: 'Automates and optimizes supply chain operations using AI.',
    icon: '📦',
    skills: [
      { slug: 'onchain-analyzer', name: 'Onchain Analyzer', reason: 'Top-rated chain skill with 351 downloads' }, { slug: 'developer-agent', name: 'developer-agent', reason: 'Top-rated agent skill with 797 downloads' }, { slug: 'agent-toolkit', name: 'agent toolkit', reason: 'Top-rated agent skill with 426 downloads' }, { slug: 'agent-ops-framework', name: 'agent ops framework', reason: 'Top-rated agent skill with 402 downloads' }, { slug: 'agent-learner', name: 'agent learner', reason: 'Top-rated agent skill with 337 downloads' }
    ],
    searchLink: '/skills?q=supply+chain',
  },

  {
    slug: 'talent-hunter',
    title: 'AI Agent for Recruitment',
    description: 'Automates and optimizes the recruitment process with intelligent candidate matching and communication.',
    icon: '👩‍💼',
    skills: [
      { slug: 'developer-agent', name: 'developer-agent', reason: 'Top-rated agent skill with 797 downloads' }, { slug: 'agent-toolkit', name: 'agent toolkit', reason: 'Top-rated agent skill with 426 downloads' }, { slug: 'agent-ops-framework', name: 'agent ops framework', reason: 'Top-rated agent skill with 402 downloads' }, { slug: 'agent-learner', name: 'agent learner', reason: 'Top-rated agent skill with 337 downloads' }
    ],
    searchLink: '/skills?q=recruitment',
  },

  {
    slug: 'compliance-ai-agent',
    title: 'Compliance Monitoring Assistant',
    description: 'An AI agent that ensures adherence to regulations and standards across various industries.',
    icon: '⚖️',
    skills: [
      { slug: 'homeassistant-toolkit', name: 'Homeassistant Toolkit', reason: 'Top-rated assistant skill with 371 downloads' }, { slug: 'compliance', name: 'Compliance', reason: 'Top-rated compliance skill with 148 downloads' }, { slug: 'system-data-intelligence-skill', name: 'It is designed for scenarios that requir', reason: 'Highly-rated productivity skill' }
    ],
    searchLink: '/skills?q=compliance',
  },

  {
    slug: 'financial-reporting-ai',
    title: 'AI Agent for Financial Reporting',
    description: 'Automates financial data collection, analysis, and reporting with accuracy and efficiency.',
    icon: '💰',
    skills: [
      { slug: 'developer-agent', name: 'developer-agent', reason: 'Top-rated agent skill with 797 downloads' }, { slug: 'agent-toolkit', name: 'agent toolkit', reason: 'Top-rated agent skill with 426 downloads' }, { slug: 'agent-ops-framework', name: 'agent ops framework', reason: 'Top-rated agent skill with 402 downloads' }, { slug: 'agent-learner', name: 'agent learner', reason: 'Top-rated agent skill with 337 downloads' }
    ],
    searchLink: '/skills?q=financial+reporting',
  },

  {
    slug: 'product-management-ai',
    title: 'AI Agent for Product Management',
    description: 'Assists with product strategy, roadmap planning, and user feedback analysis.',
    icon: '🎯',
    skills: [
      { slug: 'product-desc', name: 'product desc', reason: 'Top-rated product skill with 402 downloads' }, { slug: 'developer-agent', name: 'developer-agent', reason: 'Top-rated agent skill with 797 downloads' }, { slug: 'agent-toolkit', name: 'agent toolkit', reason: 'Top-rated agent skill with 426 downloads' }, { slug: 'agent-ops-framework', name: 'agent ops framework', reason: 'Top-rated agent skill with 402 downloads' }, { slug: 'agent-learner', name: 'agent learner', reason: 'Top-rated agent skill with 337 downloads' }
    ],
    searchLink: '/skills?q=product-management',
  },

  {
    slug: 'ux-design-ai',
    title: 'AI Agent for UX Design',
    description: 'Assists in creating and optimizing user experiences through AI-driven insights and design recommendations.',
    icon: '🎨',
    skills: [
      { slug: 'database-design', name: 'database design', reason: 'Top-rated design skill with 1012 downloads' }, { slug: 'developer-agent', name: 'developer-agent', reason: 'Top-rated agent skill with 797 downloads' }, { slug: 'agent-toolkit', name: 'agent toolkit', reason: 'Top-rated agent skill with 426 downloads' }, { slug: 'agent-ops-framework', name: 'agent ops framework', reason: 'Top-rated agent skill with 402 downloads' }, { slug: 'agent-learner', name: 'agent learner', reason: 'Top-rated agent skill with 337 downloads' }
    ],
    searchLink: '/skills?q=ux-design',
  },

  {
    slug: 'api-integration-ai',
    title: 'API Integration Assistant',
    description: 'Streamlines API connections and data flow between applications.',
    icon: '🔌',
    skills: [
      { slug: 'homeassistant-toolkit', name: 'Homeassistant Toolkit', reason: 'Top-rated assistant skill with 371 downloads' }, { slug: 'system-data-intelligence-skill', name: 'It is designed for scenarios that requir', reason: 'Highly-rated productivity skill' }
    ],
    searchLink: '/skills?q=api-integration',
  },

  {
    slug: 'cloud-orchestrator',
    title: 'AI Agent for Cloud Infrastructure',
    description: 'Automates and optimizes cloud infrastructure management with intelligent decision-making.',
    icon: '☁️',
    skills: [
      { slug: 'awesome-cloudflare', name: 'Awesome Cloudflare', reason: 'Top-rated cloud skill with 266 downloads' }, { slug: 'developer-agent', name: 'developer-agent', reason: 'Top-rated agent skill with 797 downloads' }, { slug: 'agent-toolkit', name: 'agent toolkit', reason: 'Top-rated agent skill with 426 downloads' }, { slug: 'agent-ops-framework', name: 'agent ops framework', reason: 'Top-rated agent skill with 402 downloads' }, { slug: 'agent-learner', name: 'agent learner', reason: 'Top-rated agent skill with 337 downloads' }
    ],
    searchLink: '/skills?q=cloud-infrastructure',
  },

  {
    slug: 'network-security-ai',
    title: 'AI Agent for Network Security',
    description: 'An AI agent that monitors, detects, and responds to network security threats in real-time.',
    icon: '🛡️',
    skills: [
      { slug: 'networkmanager', name: 'networkmanager', reason: 'Top-rated network skill with 100 downloads' }, { slug: 'developer-agent', name: 'developer-agent', reason: 'Top-rated agent skill with 797 downloads' }, { slug: 'agent-toolkit', name: 'agent toolkit', reason: 'Top-rated agent skill with 426 downloads' }, { slug: 'agent-ops-framework', name: 'agent ops framework', reason: 'Top-rated agent skill with 402 downloads' }, { slug: 'agent-learner', name: 'agent learner', reason: 'Top-rated agent skill with 337 downloads' }
    ],
    searchLink: '/skills?q=network+security',
  },

  {
    slug: 'sales-forecasting-ai',
    title: 'AI Agent for Sales Forecasting',
    description: 'Predict future sales trends using historical data and market insights.',
    icon: '📈',
    skills: [
      { slug: 'agent-learner', name: 'agent learner', reason: 'Top-rated agent skill with 337 downloads' }, { slug: 'developer-agent', name: 'developer-agent', reason: 'Top-rated agent skill with 797 downloads' }, { slug: 'agent-toolkit', name: 'agent toolkit', reason: 'Top-rated agent skill with 426 downloads' }, { slug: 'ai-data-analyst-cn', name: 'Ai Data Analyst Cn', reason: 'Analyze data to uncover insights, trends, and actionable business intelligence' }, { slug: 'agent-ops-framework', name: 'agent ops framework', reason: 'Top-rated agent skill with 402 downloads' }
    ],
    searchLink: '/skills?q=sales+forecasting',
  },

  {
    slug: 'price-optimizer',
    title: 'Dynamic Price Optimization',
    description: 'AI agent that adjusts pricing strategies in real-time based on market demand, competition, and sales data.',
    icon: '💰',
    skills: [
      { slug: 'system-data-intelligence-skill', name: 'It is designed for scenarios that requir', reason: 'Highly-rated productivity skill' }
    ],
    searchLink: '/skills?q=price+optimization',
  },

  {
    slug: 'ai-lead-scorer',
    title: 'AI Lead Scorer',
    description: 'Automates and optimizes lead scoring based on user behavior and data analysis.',
    icon: '🤖',
    skills: [
      { slug: 'leads', name: 'leads', reason: 'Top-rated lead skill with 239 downloads' }, { slug: 'leaderboard', name: 'leaderboard', reason: 'Top-rated lead skill with 172 downloads' }, { slug: 'system-data-intelligence-skill', name: 'It is designed for scenarios that requir', reason: 'Highly-rated productivity skill' }
    ],
    searchLink: '/skills?q=lead+scoring',
  },

  {
    slug: 'customer-feedback-analyzer',
    title: 'Customer Feedback Analyzer',
    description: 'AI agent that collects, analyzes, and acts on customer feedback.',
    icon: '💬',
    skills: [
      { slug: 'customer-service-reply', name: 'customer service reply', reason: 'Top-rated customer skill with 650 downloads' }, { slug: 'onchain-analyzer', name: 'Onchain Analyzer', reason: 'Top-rated analyzer skill with 351 downloads' }, { slug: 'funnel-analyzer', name: 'funnel analyzer', reason: 'Top-rated analyzer skill with 320 downloads' }, { slug: 'brand-identity-analyzer', name: 'Brand Identity Analyzer', reason: 'Top-rated analyzer skill with 1681 downloads' }, { slug: 'php-analyzer', name: 'php analyzer', reason: 'Top-rated analyzer skill with 112 downloads' }
    ],
    searchLink: '/skills?q=customer+feedback',
  },

  {
    slug: 'employee-training-ai',
    title: 'AI Agent for Employee Training',
    description: 'An AI agent that provides personalized and interactive employee training solutions.',
    icon: '🎓',
    skills: [
      { slug: 'developer-agent', name: 'developer-agent', reason: 'Top-rated agent skill with 797 downloads' }, { slug: 'agent-toolkit', name: 'agent toolkit', reason: 'Top-rated agent skill with 426 downloads' }, { slug: 'agent-ops-framework', name: 'agent ops framework', reason: 'Top-rated agent skill with 402 downloads' }, { slug: 'agent-learner', name: 'agent learner', reason: 'Top-rated agent skill with 337 downloads' }
    ],
    searchLink: '/skills?q=training',
  },

  {
    slug: 'patent-search-agent',
    title: 'AI Patent Search Assistant',
    description: 'Efficiently search and analyze patents using AI-powered tools.',
    icon: '🔍',
    skills: [
      { slug: 'code-searcher', name: 'code searcher', reason: 'Top-rated search skill with 264 downloads' }, { slug: 'homeassistant-toolkit', name: 'Homeassistant Toolkit', reason: 'Top-rated assistant skill with 371 downloads' }, { slug: 'system-data-intelligence-skill', name: 'It is designed for scenarios that requir', reason: 'Top-rated search skill with 885 downloads' }
    ],
    searchLink: '/skills?q=patent+search',
  },

  {
    slug: 'market-analysis-ai',
    title: 'AI Agent for Market Analysis',
    description: 'Analyzes market trends, competitor data, and consumer behavior to provide actionable insights.',
    icon: '📊',
    skills: [
      { slug: 'market-analysis-cn', name: 'Market Analysis CN | 市场分析服务', reason: 'Top-rated market skill with 7242 downloads' }, { slug: 'developer-agent', name: 'developer-agent', reason: 'Top-rated agent skill with 797 downloads' }, { slug: 'agent-toolkit', name: 'agent toolkit', reason: 'Top-rated agent skill with 426 downloads' }, { slug: 'agent-ops-framework', name: 'agent ops framework', reason: 'Top-rated agent skill with 402 downloads' }, { slug: 'agent-learner', name: 'agent learner', reason: 'Top-rated agent skill with 337 downloads' }
    ],
    searchLink: '/skills?q=market+analysis',
  },

  {
    slug: 'content-moderator-ai',
    title: 'Automated Content Moderation',
    description: 'AI agent for detecting and filtering inappropriate or harmful content.',
    icon: '🛡️',
    skills: [
      { slug: 'system-data-intelligence-skill', name: 'It is designed for scenarios that requir', reason: 'Highly-rated productivity skill' }
    ],
    searchLink: '/skills?q=content+moderation',
  },

  {
    slug: 'sentiment-analyzer',
    title: 'AI Sentiment Analysis Agent',
    description: 'Analyzes text to determine the emotional tone behind words.',
    icon: '🧠',
    skills: [
      { slug: 'fundamental-stock-analysis', name: 'Fundamental Stock Analysis', reason: 'Top-rated analysis skill with 6948 downloads' }, { slug: 'interview-analysis', name: 'Interview Analysis', reason: 'Top-rated analysis skill with 1776 downloads' }, { slug: 'data-analysis', name: 'Data Analysis', reason: 'Top-rated analysis skill with 19813 downloads' }, { slug: 'us-stock-analysis', name: 'Us Stock Analysis', reason: 'Top-rated analysis skill with 13837 downloads' }, { slug: 'market-analysis-cn', name: 'Market Analysis CN | 市场分析服务', reason: 'Top-rated analysis skill with 7242 downloads' }
    ],
    searchLink: '/skills?q=sentiment+analysis',
  },

  {
    slug: 'document-review-agent',
    title: 'Document Review Assistant',
    description: 'An AI agent that reviews and analyzes documents for accuracy, compliance, and key information extraction.',
    icon: '📄',
    skills: [
      { slug: 'system-data-intelligence-skill', name: 'It is designed for scenarios that requir', reason: 'Top-rated document skill with 885 downloads' }, { slug: 'movie-review', name: 'movie review', reason: 'Top-rated review skill with 305 downloads' }, { slug: 'fontpreview', name: 'Fontpreview', reason: 'Top-rated review skill with 112 downloads' }, { slug: 'performance-review', name: 'performance review', reason: 'Top-rated review skill with 453 downloads' }, { slug: 'review-responder', name: 'review responder', reason: 'Top-rated review skill with 359 downloads' }
    ],
    searchLink: '/skills?q=document+review',
  },

  {
    slug: 'due-diligence-ai',
    title: 'AI Agent for Due Diligence',
    description: 'Automates and streamlines the due diligence process with AI-driven analysis and insights.',
    icon: '🔍',
    skills: [
      { slug: 'developer-agent', name: 'developer-agent', reason: 'Top-rated agent skill with 797 downloads' }, { slug: 'agent-toolkit', name: 'agent toolkit', reason: 'Top-rated agent skill with 426 downloads' }, { slug: 'agent-ops-framework', name: 'agent ops framework', reason: 'Top-rated agent skill with 402 downloads' }, { slug: 'agent-learner', name: 'agent learner', reason: 'Top-rated agent skill with 337 downloads' }
    ],
    searchLink: '/skills?q=due+diligence',
  },

  {
    slug: 'risk-assessment-ai',
    title: 'AI Risk Assessment Agent',
    description: 'Automates and enhances risk evaluation processes using AI-driven analysis.',
    icon: '🛡️',
    skills: [
      { slug: 'developer-agent', name: 'developer-agent', reason: 'Top-rated agent skill with 797 downloads' }, { slug: 'agent-toolkit', name: 'agent toolkit', reason: 'Top-rated agent skill with 426 downloads' }, { slug: 'agent-ops-framework', name: 'agent ops framework', reason: 'Top-rated agent skill with 402 downloads' }, { slug: 'agent-learner', name: 'agent learner', reason: 'Top-rated agent skill with 337 downloads' }
    ],
    searchLink: '/skills?q=risk+assessment',
  },

  {
    slug: 'medical-diagnosis-ai',
    title: 'AI Medical Diagnostic Assistant',
    description: 'An AI agent that assists in diagnosing medical conditions based on symptoms and patient data.',
    icon: '🩺',
    skills: [
      { slug: 'homeassistant-toolkit', name: 'Homeassistant Toolkit', reason: 'Top-rated assistant skill with 371 downloads' }, { slug: 'system-data-intelligence-skill', name: 'It is designed for scenarios that requir', reason: 'Highly-rated productivity skill' }
    ],
    searchLink: '/skills?q=medical+diagnosis',
  },

  {
    slug: 'drug-discovery-ai',
    title: 'AI Agent for Drug Discovery',
    description: 'Accelerates the drug discovery process using AI-driven analysis and prediction.',
    icon: '🧪',
    skills: [
      { slug: 'developer-agent', name: 'developer-agent', reason: 'Top-rated agent skill with 797 downloads' }, { slug: 'agent-toolkit', name: 'agent toolkit', reason: 'Top-rated agent skill with 426 downloads' }, { slug: 'agent-ops-framework', name: 'agent ops framework', reason: 'Top-rated agent skill with 402 downloads' }, { slug: 'agent-learner', name: 'agent learner', reason: 'Top-rated agent skill with 337 downloads' }
    ],
    searchLink: '/skills?q=drug+discovery',
  },

  {
    slug: 'clinical-trials-ai',
    title: 'AI Agent for Clinical Trials',
    description: 'Assists in managing and optimizing clinical trial processes.',
    icon: '🧪',
    skills: [
      { slug: 'developer-agent', name: 'developer-agent', reason: 'Top-rated agent skill with 797 downloads' }, { slug: 'agent-toolkit', name: 'agent toolkit', reason: 'Top-rated agent skill with 426 downloads' }, { slug: 'agent-ops-framework', name: 'agent ops framework', reason: 'Top-rated agent skill with 402 downloads' }, { slug: 'agent-learner', name: 'agent learner', reason: 'Top-rated agent skill with 337 downloads' }
    ],
    searchLink: '/skills?q=clinical+trials',
  },

  {
    slug: 'property-management-agent',
    title: 'Smart Property Management Assistant',
    description: 'An AI agent that streamlines property management tasks with automation and insights.',
    icon: '🏠',
    skills: [
      { slug: 'smart-lights', name: 'smart lights', reason: 'Top-rated smart skill with 119 downloads' }, { slug: 'freedcamp-agent-skill', name: 'Freedcamp Project Management', reason: 'Top-rated management skill with 1257 downloads' }, { slug: 'system-data-intelligence-skill', name: 'It is designed for scenarios that requir', reason: 'Highly-rated productivity skill' }
    ],
    searchLink: '/skills?q=property-management',
  },

  {
    slug: 'loan-processor-agent',
    title: 'AI Loan Processing Assistant',
    description: 'Automates and streamlines the loan application and approval process using AI.',
    icon: '💰',
    skills: [
      { slug: 'data-analysis', name: 'Data Analysis', reason: 'Analyzes customer financial data to assess creditworthiness.' }, { slug: 'loan-calculator', name: 'loan calculator', reason: 'Top-rated loan skill with 346 downloads' }, { slug: 'task-planner', name: 'Task Planner', reason: 'Organizes and manages the loan processing workflow efficiently.' }, { slug: 'homeassistant-toolkit', name: 'Homeassistant Toolkit', reason: 'Top-rated assistant skill with 371 downloads' }
    ],
    searchLink: '/skills?q=loan+processing',
  },

  {
    slug: 'claims-processor-ai',
    title: 'AI Agent for Claims Processing',
    description: 'Automates and streamlines the claims processing workflow using AI.',
    icon: '🛡️',
    skills: [
      { slug: 'developer-agent', name: 'developer-agent', reason: 'Top-rated agent skill with 797 downloads' }, { slug: 'agent-toolkit', name: 'agent toolkit', reason: 'Top-rated agent skill with 426 downloads' }, { slug: 'agent-ops-framework', name: 'agent ops framework', reason: 'Top-rated agent skill with 402 downloads' }, { slug: 'agent-learner', name: 'agent learner', reason: 'Top-rated agent skill with 337 downloads' }
    ],
    searchLink: '/skills?q=claims+processing',
  },

  {
    slug: 'performance-review-ai',
    title: 'AI Assistant for Performance Reviews',
    description: 'An AI agent that helps with conducting and analyzing employee performance reviews.',
    icon: '📊',
    skills: [
      { slug: 'homeassistant-toolkit', name: 'Homeassistant Toolkit', reason: 'Top-rated assistant skill with 371 downloads' }, { slug: 'performance-review', name: 'performance review', reason: 'Top-rated performance skill with 453 downloads' }, { slug: 'system-data-intelligence-skill', name: 'It is designed for scenarios that requir', reason: 'Highly-rated productivity skill' }
    ],
    searchLink: '/skills?q=performance+review',
  },

  {
    slug: 'okr-tracker',
    title: 'AI OKR Tracker',
    description: 'An AI agent that helps users set, track, and achieve their Objectives and Key Results.',
    icon: '🎯',
    skills: [
      { slug: 'crypto-tracker-cn', name: 'crypto-tracker-cn', reason: 'Top-rated tracker skill with 543 downloads' }, { slug: 'hydration-tracker', name: 'Hydration Tracker', reason: 'Top-rated tracker skill with 239 downloads' }, { slug: 'wallet-tracker', name: 'Wallet Tracker', reason: 'Top-rated tracker skill with 438 downloads' }, { slug: 'sleep-tracker', name: 'sleep-tracker', reason: 'Top-rated tracker skill with 401 downloads' }, { slug: 'crypto-whale-tracker', name: 'Crypto Whale Tracker', reason: 'Top-rated tracker skill with 385 downloads' }
    ],
    searchLink: '/skills?q=okr',
  },

  {
    slug: 'expense-report-ai',
    title: 'AI Assistant for Expense Reports',
    description: 'Automates and simplifies the creation and management of expense reports.',
    icon: '💰',
    skills: [
      { slug: 'homeassistant-toolkit', name: 'Homeassistant Toolkit', reason: 'Top-rated assistant skill with 371 downloads' }, { slug: 'system-data-intelligence-skill', name: 'It is designed for scenarios that requir', reason: 'Top-rated reports skill with 885 downloads' }
    ],
    searchLink: '/skills?q=expense+report',
  },

  {
    slug: 'time-tracker-ai',
    title: 'Smart Time Tracking Assistant',
    description: 'Automate and optimize your time tracking with AI-powered insights and scheduling.',
    icon: '⏱️',
    skills: [
      { slug: 'wakatime-lite', name: 'Wakatime Lite', reason: 'Top-rated time skill with 107 downloads' }, { slug: 'smart-lights', name: 'smart lights', reason: 'Top-rated smart skill with 119 downloads' }, { slug: 'timezone', name: 'timezone', reason: 'Top-rated time skill with 105 downloads' }, { slug: 'unixtime', name: 'UnixTime', reason: 'Top-rated time skill with 249 downloads' }
    ],
    searchLink: '/skills?q=time-tracking',
  },

  {
    slug: 'meeting-notes-ai',
    title: 'Smart Meeting Notes',
    description: 'Automatically generate and organize meeting notes using AI.',
    icon: '📝',
    skills: [
      { slug: 'podcast-notes', name: 'podcast notes', reason: 'Top-rated notes skill with 350 downloads' }, { slug: 'smart-lights', name: 'smart lights', reason: 'Top-rated smart skill with 119 downloads' }, { slug: 'meeting-agenda', name: 'Meeting Agenda', reason: 'Top-rated meeting skill with 360 downloads' }
    ],
    searchLink: '/skills?q=meeting+notes',
  },

  {
    slug: 'standup-report-ai',
    title: 'Daily Standup Assistant',
    description: 'An AI agent that helps teams create and manage daily standup reports efficiently.',
    icon: '🤖',
    skills: [
      { slug: 'dailylog', name: 'dailylog', reason: 'Top-rated daily skill with 286 downloads' }, { slug: 'homeassistant-toolkit', name: 'Homeassistant Toolkit', reason: 'Top-rated assistant skill with 371 downloads' }, { slug: 'system-data-intelligence-skill', name: 'It is designed for scenarios that requir', reason: 'Highly-rated productivity skill' }
    ],
    searchLink: '/skills?q=standup',
  },

  {
    slug: 'job-description-helper',
    title: 'AI Job Description Assistant',
    description: 'Generate and optimize job descriptions with AI.',
    icon: '💼',
    skills: [
      { slug: 'homeassistant-toolkit', name: 'Homeassistant Toolkit', reason: 'Top-rated assistant skill with 371 downloads' }, { slug: 'system-data-intelligence-skill', name: 'It is designed for scenarios that requir', reason: 'Highly-rated productivity skill' }
    ],
    searchLink: '/skills?q=job+description',
  },

  {
    slug: 'salary-negotiation-ai',
    title: 'Salary Negotiation Assistant',
    description: 'Helps users negotiate better salaries using data and strategy.',
    icon: '💼',
    skills: [
      { slug: 'homeassistant-toolkit', name: 'Homeassistant Toolkit', reason: 'Top-rated assistant skill with 371 downloads' }, { slug: 'system-data-intelligence-skill', name: 'It is designed for scenarios that requir', reason: 'Highly-rated productivity skill' }
    ],
    searchLink: '/skills?q=salary+negotiation',
  },

  {
    slug: 'background-check-agent',
    title: 'AI Agent for Background Check',
    description: 'Automates and streamlines the background check process using AI.',
    icon: '🕵️‍♂️',
    skills: [
      { slug: 'link-checker', name: 'link checker', reason: 'Top-rated check skill with 734 downloads' }, { slug: 'developer-agent', name: 'developer-agent', reason: 'Top-rated agent skill with 797 downloads' }, { slug: 'agent-toolkit', name: 'agent toolkit', reason: 'Top-rated agent skill with 426 downloads' }, { slug: 'agent-ops-framework', name: 'agent ops framework', reason: 'Top-rated agent skill with 402 downloads' }, { slug: 'agent-learner', name: 'agent learner', reason: 'Top-rated agent skill with 337 downloads' }
    ],
    searchLink: '/skills?q=background+check',
  },

  {
    slug: 'seo-audit-agent',
    title: 'AI SEO Audit Tool',
    description: 'Comprehensive AI-powered tool for analyzing and improving website SEO performance.',
    icon: '🔍',
    skills: [
      { slug: 'hr-toolkit', name: 'hr toolkit', reason: 'Top-rated tool skill with 636 downloads' }, { slug: 'shopify-toolkit', name: 'shopify toolkit', reason: 'Top-rated tool skill with 499 downloads' }, { slug: 'agent-toolkit', name: 'agent toolkit', reason: 'Top-rated tool skill with 426 downloads' }, { slug: 'homeassistant-toolkit', name: 'Homeassistant Toolkit', reason: 'Top-rated tool skill with 371 downloads' }, { slug: 'video-toolbox', name: 'video toolbox', reason: 'Top-rated tool skill with 359 downloads' }
    ],
    searchLink: '/skills?q=seo-audit',
  },

  {
    slug: 'keyword-research-agent',
    title: 'AI Keyword Research Assistant',
    description: 'Find high-value keywords and optimize your content strategy.',
    icon: '🔍',
    skills: [
      { slug: 'homeassistant-toolkit', name: 'Homeassistant Toolkit', reason: 'Top-rated assistant skill with 371 downloads' }, { slug: 'system-data-intelligence-skill', name: 'It is designed for scenarios that requir', reason: 'Top-rated research skill with 885 downloads' }
    ],
    searchLink: '/skills?q=keywords',
  },

  {
    slug: 'competitor-intelligence-agent',
    title: 'Competitor Analysis AI Agent',
    description: 'Automates the collection and analysis of competitor data to provide strategic insights.',
    icon: '🕵️‍♂️',
    skills: [
      { slug: 'interview-analysis', name: 'Interview Analysis', reason: 'Top-rated analysis skill with 1776 downloads' }, { slug: 'data-analysis', name: 'Data Analysis', reason: 'Top-rated analysis skill with 19813 downloads' }, { slug: 'us-stock-analysis', name: 'Us Stock Analysis', reason: 'Top-rated analysis skill with 13837 downloads' }, { slug: 'market-analysis-cn', name: 'Market Analysis CN | 市场分析服务', reason: 'Top-rated analysis skill with 7242 downloads' }, { slug: 'fundamental-stock-analysis', name: 'Fundamental Stock Analysis', reason: 'Top-rated analysis skill with 6948 downloads' }
    ],
    searchLink: '/skills?q=competitor+analysis',
  },

  {
    slug: 'ad-copywriter-ai',
    title: 'AI Ad Copywriter',
    description: 'Generate compelling ad copy tailored to your brand and audience.',
    icon: '📝',
    skills: [
      { slug: 'ad-copywriter', name: 'ad copywriter', reason: 'Top-rated copywriter skill with 435 downloads' }, { slug: 'adwords', name: 'Copywriter ✍️', reason: 'Top-rated copywriter skill with 294 downloads' }, { slug: 'system-data-intelligence-skill', name: 'It is designed for scenarios that requir', reason: 'Highly-rated productivity skill' }
    ],
    searchLink: '/skills?q=ad+copywriting',
  },

  {
    slug: 'a-b-testing-agent',
    title: 'A/B Testing Assistant',
    description: 'Automates and optimizes A/B testing processes with AI insights.',
    icon: '🧪',
    skills: [
      { slug: 'homeassistant-toolkit', name: 'Homeassistant Toolkit', reason: 'Top-rated assistant skill with 371 downloads' }, { slug: 'system-data-intelligence-skill', name: 'It is designed for scenarios that requir', reason: 'Highly-rated productivity skill' }
    ],
    searchLink: '/skills?q=a+b+testing',
  },

  {
    slug: 'funnel-optimizer',
    title: 'AI Agent for Funnel Optimization',
    description: 'Automates and improves conversion rates through data-driven funnel analysis.',
    icon: '🚀',
    skills: [
      { slug: 'funnel-analyzer', name: 'funnel analyzer', reason: 'Top-rated funnel skill with 320 downloads' }, { slug: 'developer-agent', name: 'developer-agent', reason: 'Top-rated agent skill with 797 downloads' }, { slug: 'agent-toolkit', name: 'agent toolkit', reason: 'Top-rated agent skill with 426 downloads' }, { slug: 'agent-ops-framework', name: 'agent ops framework', reason: 'Top-rated agent skill with 402 downloads' }, { slug: 'agent-learner', name: 'agent learner', reason: 'Top-rated agent skill with 337 downloads' }
    ],
    searchLink: '/skills?q=funnel+optimization',
  },

  {
    slug: 'affiliate-marketing-ai',
    title: 'Smart Affiliate Marketing Assistant',
    description: 'Automate and optimize affiliate marketing campaigns with AI-driven insights and actions.',
    icon: '💰',
    skills: [
      { slug: 'smart-lights', name: 'smart lights', reason: 'Top-rated smart skill with 119 downloads' }, { slug: 'system-data-intelligence-skill', name: 'It is designed for scenarios that requir', reason: 'Highly-rated productivity skill' }
    ],
    searchLink: '/skills?q=affiliate+marketing',
  },

  {
    slug: 'influencer-outreach-agent',
    title: 'AI Agent for Influencer Outreach',
    description: 'Automates and optimizes outreach to influencers for brand collaborations.',
    icon: '🤝',
    skills: [
      { slug: 'developer-agent', name: 'developer-agent', reason: 'Top-rated agent skill with 797 downloads' }, { slug: 'agent-toolkit', name: 'agent toolkit', reason: 'Top-rated agent skill with 426 downloads' }, { slug: 'agent-ops-framework', name: 'agent ops framework', reason: 'Top-rated agent skill with 402 downloads' }, { slug: 'agent-learner', name: 'agent learner', reason: 'Top-rated agent skill with 337 downloads' }
    ],
    searchLink: '/skills?q=influencer+outreach',
  },

  {
    slug: 'press-release-ai',
    title: 'Press Release Assistant',
    description: 'Automates the creation and distribution of professional press releases.',
    icon: '📰',
    skills: [
      { slug: 'press-release', name: 'press release', reason: 'Top-rated press skill with 355 downloads' }, { slug: 'homeassistant-toolkit', name: 'Homeassistant Toolkit', reason: 'Top-rated assistant skill with 371 downloads' }, { slug: 'system-data-intelligence-skill', name: 'It is designed for scenarios that requir', reason: 'Highly-rated productivity skill' }
    ],
    searchLink: '/skills?q=press+release',
  },

  {
    slug: 'code-documentor',
    title: 'AI Code Documentation Assistant',
    description: 'Automatically generates and maintains high-quality code documentation.',
    icon: '📝',
    skills: [
      { slug: 'code-generator', name: 'code generator', reason: 'Top-rated code skill with 1683 downloads' }, { slug: 'ai-code-helper', name: 'ai code helper', reason: 'Top-rated code skill with 264 downloads' }, { slug: 'code-searcher', name: 'code searcher', reason: 'Top-rated code skill with 264 downloads' }, { slug: 'codepal', name: 'codepal', reason: 'Top-rated code skill with 223 downloads' }, { slug: 'encode', name: 'encode', reason: 'Top-rated code skill with 207 downloads' }
    ],
    searchLink: '/skills?q=code+documentation',
  },

  {
    slug: 'code-refactorer',
    title: 'Smart Code Refactoring',
    description: 'An AI agent that improves code quality and structure automatically.',
    icon: '🤖',
    skills: [
      { slug: 'code-searcher', name: 'code searcher', reason: 'Top-rated code skill with 264 downloads' }, { slug: 'smart-lights', name: 'smart lights', reason: 'Top-rated smart skill with 119 downloads' }, { slug: 'ai-code-helper', name: 'ai code helper', reason: 'Top-rated code skill with 264 downloads' }, { slug: 'developer', name: 'Developer', reason: 'Developer skill for automating and enhancing relevant tasks and workflows' }, { slug: 'code-generator', name: 'code generator', reason: 'Top-rated code skill with 1683 downloads' }
    ],
    searchLink: '/skills?q=code+refactoring',
  },

  {
    slug: 'pr-review-helper',
    title: 'PR Review Assistant',
    description: 'An AI agent that reviews pull requests and provides actionable feedback.',
    icon: '🤖',
    skills: [
      { slug: 'performance-review', name: 'performance review', reason: 'Top-rated review skill with 453 downloads' }, { slug: 'review-responder', name: 'review responder', reason: 'Top-rated review skill with 359 downloads' }, { slug: 'movie-review', name: 'movie review', reason: 'Top-rated review skill with 305 downloads' }, { slug: 'fontpreview', name: 'Fontpreview', reason: 'Top-rated review skill with 112 downloads' }, { slug: 'homeassistant-toolkit', name: 'Homeassistant Toolkit', reason: 'Top-rated assistant skill with 371 downloads' }
    ],
    searchLink: '/skills?q=pr+review',
  },

  {
    slug: 'api-docs-ai',
    title: 'API Documentation Assistant',
    description: 'An AI agent that simplifies and enhances API documentation processes.',
    icon: '📦',
    skills: [
      { slug: 'homeassistant-toolkit', name: 'Homeassistant Toolkit', reason: 'Top-rated assistant skill with 371 downloads' }, { slug: 'system-data-intelligence-skill', name: 'It is designed for scenarios that requir', reason: 'Highly-rated productivity skill' }
    ],
    searchLink: '/skills?q=api+documentation',
  },

  {
    slug: 'database-schema-helper',
    title: 'Database Schema Assistant',
    description: 'An AI agent that helps with understanding, generating, and optimizing database schemas.',
    icon: '📊',
    skills: [
      { slug: 'database-design', name: 'database design', reason: 'Top-rated database skill with 1012 downloads' }, { slug: 'schema-builder', name: 'schema builder', reason: 'Top-rated schema skill with 382 downloads' }, { slug: 'schema', name: 'schema', reason: 'Top-rated schema skill with 102 downloads' }, { slug: 'homeassistant-toolkit', name: 'Homeassistant Toolkit', reason: 'Top-rated assistant skill with 371 downloads' }
    ],
    searchLink: '/skills?q=database+schema',
  },

  {
    slug: 'unit-test-ai',
    title: 'AI Agent for Unit Testing',
    description: 'Automates and optimizes the process of writing and executing unit tests.',
    icon: '🧪',
    skills: [
      { slug: 'communityhub', name: 'communityhub', reason: 'Top-rated unit skill with 258 downloads' }, { slug: 'developer-agent', name: 'developer-agent', reason: 'Top-rated agent skill with 797 downloads' }, { slug: 'agent-toolkit', name: 'agent toolkit', reason: 'Top-rated agent skill with 426 downloads' }, { slug: 'agent-ops-framework', name: 'agent ops framework', reason: 'Top-rated agent skill with 402 downloads' }, { slug: 'agent-learner', name: 'agent learner', reason: 'Top-rated agent skill with 337 downloads' }
    ],
    searchLink: '/skills?q=unit+testing',
  },

  {
    slug: 'ci-cd-ai-guardian',
    title: 'AI Agent for CI/CD Pipeline',
    description: 'Automates and optimizes continuous integration and delivery processes with intelligent decision-making.',
    icon: '⚙️',
    skills: [
      { slug: 'developer-agent', name: 'developer-agent', reason: 'Top-rated agent skill with 797 downloads' }, { slug: 'agent-toolkit', name: 'agent toolkit', reason: 'Top-rated agent skill with 426 downloads' }, { slug: 'agent-ops-framework', name: 'agent ops framework', reason: 'Top-rated agent skill with 402 downloads' }, { slug: 'agent-learner', name: 'agent learner', reason: 'Top-rated agent skill with 337 downloads' }
    ],
    searchLink: '/skills?q=ci/cd+pipeline',
  },

  {
    slug: 'k8s-ai-helper',
    title: 'Kubernetes AI Assistant',
    description: 'An AI agent that simplifies Kubernetes management and troubleshooting.',
    icon: '⎈',
    skills: [
      { slug: 'homeassistant-toolkit', name: 'Homeassistant Toolkit', reason: 'Top-rated assistant skill with 371 downloads' }, { slug: 'system-data-intelligence-skill', name: 'It is designed for scenarios that requir', reason: 'Highly-rated productivity skill' }
    ],
    searchLink: '/skills?q=kubernetes',
  },

  {
    slug: 'terraform-ai-helper',
    title: 'Terraform AI Assistant',
    description: 'An AI agent that assists with Terraform infrastructure as code.',
    icon: '🧱',
    skills: [
      { slug: 'terraform-helper', name: 'terraform helper', reason: 'Top-rated terraform skill with 342 downloads' }, { slug: 'homeassistant-toolkit', name: 'Homeassistant Toolkit', reason: 'Top-rated assistant skill with 371 downloads' }, { slug: 'system-data-intelligence-skill', name: 'It is designed for scenarios that requir', reason: 'Highly-rated productivity skill' }
    ],
    searchLink: '/skills?q=terraform',
  },

  {
    slug: 'invoice-automator',
    title: 'AI Agent for Invoice Automation',
    description: 'Streamlines invoice processing and management with intelligent data extraction and workflow automation.',
    icon: '📄',
    skills: [
      { slug: 'developer-agent', name: 'developer-agent', reason: 'Top-rated agent skill with 797 downloads' }, { slug: 'agent-toolkit', name: 'agent toolkit', reason: 'Top-rated agent skill with 426 downloads' }, { slug: 'agent-ops-framework', name: 'agent ops framework', reason: 'Top-rated agent skill with 402 downloads' }, { slug: 'agent-learner', name: 'agent learner', reason: 'Top-rated agent skill with 337 downloads' }
    ],
    searchLink: '/skills?q=invoice+automation',
  },

  {
    slug: 'expense-tracker-ai',
    title: 'Smart Expense Tracking Assistant',
    description: 'An AI agent that helps track and manage personal or business expenses effortlessly.',
    icon: '💰',
    skills: [
      { slug: 'smart-lights', name: 'smart lights', reason: 'Top-rated smart skill with 119 downloads' }, { slug: 'system-data-intelligence-skill', name: 'It is designed for scenarios that requir', reason: 'Highly-rated productivity skill' }
    ],
    searchLink: '/skills?q=expense+tracking',
  },

  {
    slug: 'budget-planner-ai',
    title: 'Smart Budget Planning Assistant',
    description: 'An AI agent that helps users create and manage personal or business budgets efficiently.',
    icon: '💰',
    skills: [
      { slug: 'smart-lights', name: 'smart lights', reason: 'Top-rated smart skill with 119 downloads' }, { slug: 'budgetly', name: 'budgetly', reason: 'Top-rated budget skill with 266 downloads' }, { slug: 'system-data-intelligence-skill', name: 'It is designed for scenarios that requir', reason: 'Highly-rated productivity skill' }
    ],
    searchLink: '/skills?q=budget+planning',
  },

  {
    slug: 'audit-report-ai',
    title: 'Audit Report Assistant',
    description: 'An AI agent that generates and analyzes audit reports efficiently.',
    icon: '📄',
    skills: [
      { slug: 'system-data-intelligence-skill', name: 'It is designed for scenarios that requir', reason: 'Top-rated report skill with 885 downloads' }, { slug: 'homeassistant-toolkit', name: 'Homeassistant Toolkit', reason: 'Top-rated assistant skill with 371 downloads' }
    ],
    searchLink: '/skills?q=audit+report',
  },

  {
    slug: 'contract-creator',
    title: 'AI Agent for Contract Drafting',
    description: 'Automates the creation and review of legal contracts with accuracy and efficiency.',
    icon: '📄',
    skills: [
      { slug: 'developer-agent', name: 'developer-agent', reason: 'Top-rated agent skill with 797 downloads' }, { slug: 'agent-toolkit', name: 'agent toolkit', reason: 'Top-rated agent skill with 426 downloads' }, { slug: 'agent-ops-framework', name: 'agent ops framework', reason: 'Top-rated agent skill with 402 downloads' }, { slug: 'agent-learner', name: 'agent learner', reason: 'Top-rated agent skill with 337 downloads' }
    ],
    searchLink: '/skills?q=contract+drafting',
  },

  {
    slug: 'nda-reviewer',
    title: 'AI Agent for NDA Review',
    description: 'Automates the review and analysis of non-disclosure agreements to identify key terms, risks, and compliance issues.',
    icon: '🛡️',
    skills: [
      { slug: 'agent-ops-framework', name: 'agent ops framework', reason: 'Top-rated agent skill with 402 downloads' }, { slug: 'developer-agent', name: 'developer-agent', reason: 'Top-rated agent skill with 797 downloads' }, { slug: 'translator-pro', name: 'Translator Pro', reason: 'To translate NDAs into different languages for global teams.' }, { slug: 'task-planner', name: 'Task Planner', reason: 'To outline actions required after reviewing an NDA.' }, { slug: 'agent-toolkit', name: 'agent toolkit', reason: 'Top-rated agent skill with 426 downloads' }
    ],
    searchLink: '/skills?q=nda+review',
  },

  {
    slug: 'gdpr-compliance-agent',
    title: 'GDPR Compliance Assistant',
    description: 'An AI agent that helps organizations ensure compliance with GDPR regulations.',
    icon: '🛡️',
    skills: [
      { slug: 'gdpr-checker', name: 'gdpr checker', reason: 'Top-rated gdpr skill with 355 downloads' }, { slug: 'gdpr', name: 'gdpr', reason: 'Top-rated gdpr skill with 134 downloads' }, { slug: 'homeassistant-toolkit', name: 'Homeassistant Toolkit', reason: 'Top-rated assistant skill with 371 downloads' }, { slug: 'compliance', name: 'Compliance', reason: 'Top-rated compliance skill with 148 downloads' }
    ],
    searchLink: '/skills?q=gdpr',
  },

  {
    slug: 'terms-ai-agent',
    title: 'Terms of Service Assistant',
    description: 'AI agent that simplifies and explains legal terms for users.',
    icon: '⚖️',
    skills: [
      { slug: 'terms', name: 'terms', reason: 'Top-rated terms skill with 117 downloads' }, { slug: 'terms-of-service', name: 'Terms Of Service', reason: 'Draft clear, enforceable Terms of Service tailored to your product and jurisdict' }, { slug: 'customer-service-reply', name: 'customer service reply', reason: 'Top-rated service skill with 650 downloads' }, { slug: 'homeassistant-toolkit', name: 'Homeassistant Toolkit', reason: 'Top-rated assistant skill with 371 downloads' }
    ],
    searchLink: '/skills?q=terms',
  },

  {
    slug: 'privacy-policy-helper',
    title: 'Privacy Policy Assistant',
    description: 'An AI agent that helps generate, analyze, and explain privacy policies.',
    icon: '🔒',
    skills: [
      { slug: 'privacy-policy', name: 'Privacy Policy', reason: 'Generate a complete Privacy Policy covering data collection, usage, and user rig' }, { slug: 'privacy', name: 'privacy', reason: 'Top-rated privacy skill with 153 downloads' }, { slug: 'policy', name: 'policy', reason: 'Top-rated policy skill with 163 downloads' }, { slug: 'policy-reader', name: 'policy reader', reason: 'Top-rated policy skill with 383 downloads' }, { slug: 'return-policy', name: 'return policy', reason: 'Top-rated policy skill with 343 downloads' }
    ],
    searchLink: '/skills?q=privacy+policy',
  },

  {
    slug: 'product-descriptor',
    title: 'Smart Product Describer',
    description: 'Generate compelling and accurate product descriptions using AI.',
    icon: '📦',
    skills: [
      { slug: 'smart-lights', name: 'smart lights', reason: 'Top-rated smart skill with 119 downloads' }, { slug: 'product-desc', name: 'product desc', reason: 'Top-rated product skill with 402 downloads' }, { slug: 'system-data-intelligence-skill', name: 'It is designed for scenarios that requir', reason: 'Highly-rated productivity skill' }
    ],
    searchLink: '/skills?q=product+descriptions',
  },

  {
    slug: 'review-response-helper',
    title: 'Smart Review Response Assistant',
    description: 'Automates and enhances responses to customer reviews with AI.',
    icon: '🤖',
    skills: [
      { slug: 'movie-review', name: 'movie review', reason: 'Top-rated review skill with 305 downloads' }, { slug: 'smart-lights', name: 'smart lights', reason: 'Top-rated smart skill with 119 downloads' }, { slug: 'fontpreview', name: 'Fontpreview', reason: 'Top-rated review skill with 112 downloads' }, { slug: 'performance-review', name: 'performance review', reason: 'Top-rated review skill with 453 downloads' }, { slug: 'review-responder', name: 'review responder', reason: 'Top-rated review skill with 359 downloads' }
    ],
    searchLink: '/skills?q=review+response',
  },

  {
    slug: 'return-processor',
    title: 'AI Agent for Return Processing',
    description: 'Automates and streamlines the return and refund process for customers.',
    icon: '📦',
    skills: [
      { slug: 'return-policy', name: 'return policy', reason: 'Top-rated return skill with 343 downloads' }, { slug: 'developer-agent', name: 'developer-agent', reason: 'Top-rated agent skill with 797 downloads' }, { slug: 'agent-toolkit', name: 'agent toolkit', reason: 'Top-rated agent skill with 426 downloads' }, { slug: 'agent-ops-framework', name: 'agent ops framework', reason: 'Top-rated agent skill with 402 downloads' }, { slug: 'agent-learner', name: 'agent learner', reason: 'Top-rated agent skill with 337 downloads' }
    ],
    searchLink: '/skills?q=return+processing',
  },

  {
    slug: 'order-tracker-ai',
    title: 'Real-Time Order Tracking',
    description: 'Track orders across multiple platforms with an AI-powered assistant.',
    icon: '📦',
    skills: [
      { slug: 'orders', name: 'orders', reason: 'Top-rated order skill with 227 downloads' }, { slug: 'system-data-intelligence-skill', name: 'It is designed for scenarios that requir', reason: 'Highly-rated productivity skill' }
    ],
    searchLink: '/skills?q=order+tracking',
  },

  {
    slug: 'dropshipping-ai-agent',
    title: 'AI Agent for Dropshipping',
    description: 'Automates and optimizes dropshipping operations with intelligent decision-making.',
    icon: '🛒',
    skills: [
      { slug: 'developer-agent', name: 'developer-agent', reason: 'Top-rated agent skill with 797 downloads' }, { slug: 'agent-toolkit', name: 'agent toolkit', reason: 'Top-rated agent skill with 426 downloads' }, { slug: 'agent-ops-framework', name: 'agent ops framework', reason: 'Top-rated agent skill with 402 downloads' }, { slug: 'agent-learner', name: 'agent learner', reason: 'Top-rated agent skill with 337 downloads' }
    ],
    searchLink: '/skills?q=dropshipping',
  },

  {
    slug: 'amazon-listing-helper',
    title: 'Amazon Listing Assistant',
    description: 'Generate optimized product listings with AI.',
    icon: '📦',
    skills: [
      { slug: 'pinduoduo-listing', name: 'pinduoduo listing', reason: 'Top-rated listing skill with 465 downloads' }, { slug: 'taobao-listing', name: 'taobao listing', reason: 'Top-rated listing skill with 458 downloads' }, { slug: 'homeassistant-toolkit', name: 'Homeassistant Toolkit', reason: 'Top-rated assistant skill with 371 downloads' }
    ],
    searchLink: '/skills?q=amazon+listing',
  },

  {
    slug: 'lesson-planner-ai',
    title: 'AI Lesson Planner',
    description: 'An AI agent that helps teachers create effective and engaging lesson plans.',
    icon: '📚',
    skills: [
      { slug: 'task-planner', name: 'task planner', reason: 'Top-rated planner skill with 1495 downloads' }, { slug: 'okr-planner', name: 'OKR Planner', reason: 'Top-rated planner skill with 356 downloads' }, { slug: 'system-data-intelligence-skill', name: 'It is designed for scenarios that requir', reason: 'Highly-rated productivity skill' }
    ],
    searchLink: '/skills?q=lesson-planning',
  },

  {
    slug: 'quiz-creator',
    title: 'AI Quiz Generator',
    description: 'Create personalized quizzes with AI-powered question generation.',
    icon: '🧠',
    skills: [
      { slug: 'trivia-quiz', name: 'Trivia Quiz', reason: 'Top-rated quiz skill with 343 downloads' }, { slug: 'code-generator', name: 'code generator', reason: 'Top-rated generator skill with 1683 downloads' }, { slug: 'api-generator', name: 'api generator', reason: 'Top-rated generator skill with 1081 downloads' }, { slug: 'test-generator', name: 'test generator', reason: 'Top-rated generator skill with 855 downloads' }, { slug: 'sql-generator', name: 'sql generator', reason: 'Top-rated generator skill with 596 downloads' }
    ],
    searchLink: '/skills?q=quiz',
  },

  {
    slug: 'study-aid',
    title: 'Smart Study Notes',
    description: 'An AI agent that helps create, organize, and review study notes efficiently.',
    icon: '📚',
    skills: [
      { slug: 'podcast-notes', name: 'podcast notes', reason: 'Top-rated notes skill with 350 downloads' }, { slug: 'smart-lights', name: 'smart lights', reason: 'Top-rated smart skill with 119 downloads' }, { slug: 'study-plan', name: 'Study Plan', reason: 'Top-rated study skill with 558 downloads' }
    ],
    searchLink: '/skills?q=study+notes',
  },

  {
    slug: 'essay-writer-ai',
    title: 'AI Essay Writer',
    description: 'Generate well-structured and original essays on any topic.',
    icon: '✍️',
    skills: [
      { slug: 'gaokao-essay', name: 'gaokao essay', reason: 'Top-rated essay skill with 362 downloads' }, { slug: 'story-writer', name: 'story writer', reason: 'Top-rated writer skill with 1091 downloads' }, { slug: 'short-drama-writer', name: 'short drama writer', reason: 'Top-rated writer skill with 853 downloads' }, { slug: 'jd-writer', name: 'jd writer', reason: 'Top-rated writer skill with 455 downloads' }, { slug: 'ad-copywriter', name: 'ad copywriter', reason: 'Top-rated writer skill with 435 downloads' }
    ],
    searchLink: '/skills?q=essay',
  },

  {
    slug: 'thesis-research-ai',
    title: 'AI Agent for Thesis Research',
    description: 'Assists with literature review, data analysis, and writing support for academic theses.',
    icon: '📚',
    skills: [
      { slug: 'thesis-helper', name: 'thesis helper', reason: 'Top-rated thesis skill with 628 downloads' }, { slug: 'developer-agent', name: 'developer-agent', reason: 'Top-rated agent skill with 797 downloads' }, { slug: 'agent-toolkit', name: 'agent toolkit', reason: 'Top-rated agent skill with 426 downloads' }, { slug: 'agent-ops-framework', name: 'agent ops framework', reason: 'Top-rated agent skill with 402 downloads' }, { slug: 'agent-learner', name: 'agent learner', reason: 'Top-rated agent skill with 337 downloads' }
    ],
    searchLink: '/skills?q=thesis+research',
  },

  {
    slug: 'citation-helper',
    title: 'AI Citation Manager',
    description: 'Automate and organize your academic citations with ease.',
    icon: '📚',
    skills: [
      { slug: 'inventory-manager', name: 'inventory manager', reason: 'Top-rated manager skill with 665 downloads' }, { slug: 'stripe-manager', name: 'stripe manager', reason: 'Top-rated manager skill with 465 downloads' }, { slug: 'gcal-manager', name: 'gcal manager', reason: 'Top-rated manager skill with 350 downloads' }, { slug: 'raspberry-pi-manager', name: 'Raspberry Pi Manager', reason: 'Top-rated manager skill with 341 downloads' }, { slug: 'cert-manager', name: 'cert manager', reason: 'Top-rated manager skill with 290 downloads' }
    ],
    searchLink: '/skills?q=citation+management',
  },

  {
    slug: 'meal-planner-ai',
    title: 'Smart Meal Planner',
    description: 'An AI agent that helps plan healthy and personalized meals based on dietary preferences and goals.',
    icon: '🍽️',
    skills: [
      { slug: 'task-planner', name: 'task planner', reason: 'Top-rated planner skill with 1495 downloads' }, { slug: 'smart-lights', name: 'smart lights', reason: 'Top-rated smart skill with 119 downloads' }, { slug: 'okr-planner', name: 'OKR Planner', reason: 'Top-rated planner skill with 356 downloads' }, { slug: 'mealplan', name: 'mealplan', reason: 'Top-rated meal skill with 229 downloads' }
    ],
    searchLink: '/skills?q=meal+planning',
  },

  {
    slug: 'workout-planner-ai',
    title: 'Personalized Fitness Assistant',
    description: 'An AI agent that creates customized workout plans based on user goals and preferences.',
    icon: '💪',
    skills: [
      { slug: 'fitness-plan', name: 'fitness plan', reason: 'Top-rated fitness skill with 489 downloads' }, { slug: 'homeassistant-toolkit', name: 'Homeassistant Toolkit', reason: 'Top-rated assistant skill with 371 downloads' }, { slug: 'system-data-intelligence-skill', name: 'It is designed for scenarios that requir', reason: 'Highly-rated productivity skill' }
    ],
    searchLink: '/skills?q=workout+plan',
  },

  {
    slug: 'sleep-tracker-agent',
    title: 'Smart Sleep Monitoring',
    description: 'An AI agent that tracks and analyzes your sleep patterns to improve sleep quality.',
    icon: '🌙',
    skills: [
      { slug: 'smart-lights', name: 'smart lights', reason: 'Top-rated smart skill with 119 downloads' }, { slug: 'sleep-tracker', name: 'sleep-tracker', reason: 'Top-rated sleep skill with 401 downloads' }, { slug: 'sleepwell', name: 'sleepwell', reason: 'Top-rated sleep skill with 232 downloads' }
    ],
    searchLink: '/skills?q=sleep+tracking',
  },

  {
    slug: 'habit-tracker-ai',
    title: 'Smart Habit Tracker',
    description: 'An AI agent that helps users build and maintain daily habits with personalized reminders and progress tracking.',
    icon: '🌱',
    skills: [
      { slug: 'crypto-tracker-cn', name: 'crypto-tracker-cn', reason: 'Top-rated tracker skill with 543 downloads' }, { slug: 'smart-lights', name: 'smart lights', reason: 'Top-rated smart skill with 119 downloads' }, { slug: 'wallet-tracker', name: 'Wallet Tracker', reason: 'Top-rated tracker skill with 438 downloads' }, { slug: 'habithero', name: 'HabitHero', reason: 'Top-rated habit skill with 214 downloads' }, { slug: 'habit', name: 'habit', reason: 'Top-rated habit skill with 127 downloads' }
    ],
    searchLink: '/skills?q=habit+tracking',
  },

  {
    slug: 'meditation-helper',
    title: 'Guided Meditation Assistant',
    description: 'An AI agent that helps users with meditation practices and mindfulness techniques.',
    icon: '🧘‍♂️',
    skills: [
      { slug: 'meditation-guide', name: 'meditation guide', reason: 'Top-rated meditation skill with 364 downloads' }, { slug: 'homeassistant-toolkit', name: 'Homeassistant Toolkit', reason: 'Top-rated assistant skill with 371 downloads' }, { slug: 'system-data-intelligence-skill', name: 'It is designed for scenarios that requir', reason: 'Highly-rated productivity skill' }
    ],
    searchLink: '/skills?q=meditation',
  },

  {
    slug: 'mental-health-helper',
    title: 'AI Companion for Mental Wellness',
    description: 'A supportive AI agent designed to help with mental health tracking, mood management, and emotional support.',
    icon: '🧠',
    skills: [
      { slug: 'fundamental-stock-analysis', name: 'Fundamental Stock Analysis', reason: 'Top-rated mental skill with 6948 downloads' }, { slug: 'mental-health', name: 'mental-health', reason: 'Top-rated mental skill with 341 downloads' }, { slug: 'system-data-intelligence-skill', name: 'It is designed for scenarios that requir', reason: 'Highly-rated productivity skill' }
    ],
    searchLink: '/skills?q=mental+health',
  },

  {
    slug: 'ai-email-automation',
    title: 'Automate email workflows with AI',
    description: 'Streamline email tasks using natural language commands.',
    icon: '💼',
    skills: [
      { slug: 'email-template', name: 'email-template', reason: 'Top-rated email skill with 307 downloads' }, { slug: 'system-data-intelligence-skill', name: 'It is designed for scenarios that requir', reason: 'Highly-rated productivity skill' }
    ],
  },
  {
    slug: 'git-agent-tool',
    title: 'Automate Git with AI agents',
    description: 'Simplify version control with intelligent automation.',
    icon: '💼',
    skills: [
      { slug: 'system-data-intelligence-skill', name: 'It is designed for scenarios that requir', reason: 'Highly-rated productivity skill' }
    ],
  },
  {
    slug: 'browser-task-creator',
    title: 'Generate browser scripts from English',
    description: 'Turn tasks into code with natural language input.',
    icon: '💼',
    skills: [
      { slug: 'system-data-intelligence-skill', name: 'It is designed for scenarios that requir', reason: 'Top-rated generate skill with 885 downloads' }, { slug: 'generate', name: 'generate', reason: 'Top-rated generate skill with 106 downloads' }, { slug: 'browser-fingerprinting', name: 'browser fingerprinting', reason: 'Top-rated browser skill with 313 downloads' }, { slug: 'browser-devtools', name: 'browser devtools', reason: 'Top-rated browser skill with 297 downloads' }
    ],
  },
  {
    slug: 'python-to-mcp',
    title: 'Expose Python functions as tools',
    description: 'Integrate Python functions into AI workflows instantly.',
    icon: '💼',
    skills: [
      { slug: 'code-generator', name: 'Code Generator', reason: 'Generate Python functions and scripts from natural language' }, { slug: 'shell-script', name: 'Shell Script', reason: 'Run and automate scripts in your AI workflow' }, { slug: 'zapier-recipe', name: 'Automation Recipe', reason: 'Connect Python tools to any workflow with automation recipes' }
    ],
  },
  {
    slug: 'sales-agent-builder',
    title: 'Build AI agents for sales tasks',
    description: 'Automate sales workflows with customizable agents.',
    icon: '💼',
    skills: [
      { slug: 'cli-builder', name: 'cli builder', reason: 'Top-rated build skill with 412 downloads' }, { slug: 'leads', name: 'Leads', reason: 'Generate and qualify sales leads with AI' }, { slug: 'schema-builder', name: 'schema builder', reason: 'Top-rated build skill with 382 downloads' }, { slug: 'dockerfile-builder', name: 'dockerfile builder', reason: 'Top-rated build skill with 305 downloads' }, { slug: 'graphql-builder', name: 'graphql builder', reason: 'Top-rated build skill with 300 downloads' }
    ],
  },

  {
    slug: 'ai-gmail-automation',
    title: 'Automate Email Workflows with AI',
    description: 'Streamline email management using AI-powered automation.',
    icon: '💼',
    skills: [
      { slug: 'email-template', name: 'email-template', reason: 'Top-rated email skill with 307 downloads' }, { slug: 'system-data-intelligence-skill', name: 'It is designed for scenarios that requir', reason: 'Highly-rated productivity skill' }
    ],
  },
  {
    slug: 'git-agent-automation',
    title: 'Automate Git Tasks with AI',
    description: 'Simplify version control with intelligent AI-driven workflows.',
    icon: '💼',
    skills: [
      { slug: 'system-data-intelligence-skill', name: 'It is designed for scenarios that requir', reason: 'Top-rated tasks skill with 885 downloads' }
    ],
  },
  {
    slug: 'python-tool-exposer',
    title: 'Expose Python Functions as Tools',
    description: 'Make Python functions available for AI agents to use.',
    icon: '💼',
    skills: [
      { slug: 'system-data-intelligence-skill', name: 'It is designed for scenarios that requir', reason: 'Highly-rated productivity skill' }
    ],
  },
  {
    slug: 'sales-automation-agent',
    title: 'Automate Sales Tasks with AI',
    description: 'Boost sales efficiency with AI-powered task automation.',
    icon: '💼',
    skills: [
      { slug: 'system-data-intelligence-skill', name: 'It is designed for scenarios that requir', reason: 'Top-rated tasks skill with 885 downloads' }
    ],
  },
  {
    slug: 'legal-documents-ai',
    title: 'Draft & Review Legal Documents',
    description: 'Use AI to draft contracts, review agreements, check compliance, and get legal guidance — without the billable hours.',
    icon: '⚖️',
    skills: [
      { slug: 'performance-review', name: 'performance review', reason: 'Top-rated review skill with 453 downloads' }, { slug: 'legal-advisor', name: 'Legal Advisor Pro', reason: 'Draft and review legal documents with AI guidance (1,126 downloads)' }, { slug: 'precedent', name: 'Precedent', reason: 'Reference legal precedents and case law instantly' }, { slug: 'compliance', name: 'Compliance', reason: 'Check regulatory compliance across jurisdictions (148 downloads)' }, { slug: 'review-responder', name: 'review responder', reason: 'Top-rated review skill with 359 downloads' }
    ],
    searchLink: '/skills?q=legal+contract+compliance',
  },
  {
    slug: 'daily-reddit-digest',
    icon: '📰',
    title: 'Daily Reddit Digest',
    description: 'Stay updated with top Reddit posts daily.',
    skills: [
      { slug: 'newsletter-writer', name: 'Newsletter Writer', reason: 'Essential for compiling and formatting daily content digests.' }, { slug: 'dailylog', name: 'dailylog', reason: 'Top-rated daily skill with 328 downloads' }, { slug: 'system-data-intelligence-skill', name: 'It is designed for scenarios that requir', reason: 'Highly-rated productivity skill' }
    ],
    searchLink: '/skills?q=reddit+news+digest',
  },
  {
    slug: 'daily-youtube-digest',
    icon: '▶️',
    title: 'Daily YouTube Digest',
    description: 'Get fresh video content summaries daily.',
    skills: [
      { slug: 'youtube-script', name: 'YouTube Script', reason: 'Structures and summarizes video content automatically.' },
      { slug: 'video-fetcher', name: 'Video Fetcher', reason: 'Automates gathering new videos from your favorite channels.' },
    ],
    searchLink: '/skills?q=youtube+video+summary',
  },
  {
    slug: 'custom-morning-brief',
    icon: '🌅',
    title: 'Custom Morning Brief',
    description: 'Start every day with a personalized AI briefing.',
    skills: [
      { slug: 'meeting-agenda', name: 'Meeting Agenda', reason: 'Organizes your day\'s tasks and priorities into a clear plan.' },
      { slug: 'newsletter-writer', name: 'Newsletter Writer', reason: 'Creates concise summaries of news and updates each morning.' },
    ],
    searchLink: '/skills?q=morning+briefing+daily',
  },
  {
    slug: 'inbox-declutter',
    icon: '📬',
    title: 'Inbox Declutter',
    description: 'Tame email overload — read only what matters.',
    skills: [
      { slug: 'email-template', name: 'Email Template', reason: 'Streamlines responses and saves time on repetitive emails.' },
      { slug: 'newsletter-writer', name: 'Newsletter Writer', reason: 'Condenses newsletters into quick summaries you actually read.' },
    ],
    searchLink: '/skills?q=email+inbox+summary',
  },
  {
    slug: 'personal-crm',
    icon: '🤝',
    title: 'Personal CRM',
    description: 'Never forget a follow-up — track every relationship.',
    skills: [
      { slug: 'contact-book', name: 'Contact Book', reason: 'Centralizes all contact info and interaction history in one place.' },
      { slug: 'meeting-agenda', name: 'Meeting Agenda', reason: 'Prepares context-rich agendas before every important meeting.' },
    ],
    searchLink: '/skills?q=crm+contacts+relationship',
  },
  {
    slug: 'health-symptom-tracker',
    icon: '🏥',
    title: 'Health & Symptom Tracker',
    description: 'Track symptoms daily and spot health patterns over time.',
    skills: [
      { slug: 'mental-health', name: 'Mental Health', reason: 'Monitors emotional well-being alongside physical symptoms.' },
      { slug: 'symptom', name: 'Symptom Checker', reason: 'Identifies potential triggers and flags patterns early.' },
    ],
    searchLink: '/skills?q=health+symptom+tracker',
  },
  {
    slug: 'habit-tracker-accountability',
    icon: '✅',
    title: 'Habit Tracker & Coach',
    description: 'Build lasting habits with daily check-ins and AI coaching.',
    skills: [
      { slug: 'sleep-tracker', name: 'Sleep Tracker', reason: 'Tracks sleep patterns to build a healthier daily routine.' },
      { slug: 'mental-health', name: 'Mental Health', reason: 'Keeps motivation high during habit streaks and slumps.' },
    ],
    searchLink: '/skills?q=habit+tracker+productivity',
  },
  {
    slug: 'meeting-notes-actions',
    icon: '📋',
    title: 'Meeting Notes & Action Items',
    description: 'Turn messy transcripts into structured tasks automatically.',
    skills: [
      { slug: 'meeting-agenda', name: 'Meeting Agenda', reason: 'Structures meetings upfront so notes are easier to capture.' },
      { slug: 'podcast-notes', name: 'Podcast Notes', reason: 'Extracts key points and action items from any audio or transcript.' },
    ],
    searchLink: '/skills?q=meeting+notes+action+items',
  },
  {
    slug: 'knowledge-base-rag',
    icon: '🧠',
    title: 'Personal Knowledge Base',
    description: 'Drop links and notes into chat — search everything instantly.',
    skills: [
      { slug: 'database-design', name: 'Database Design', reason: 'Structures your knowledge so retrieval is fast and accurate.' },
      { slug: 'newsletter-writer', name: 'Newsletter Writer', reason: 'Summarizes saved articles into digestible reference notes.' },
    ],
    searchLink: '/skills?q=knowledge+base+notes+search',
  },
  {
    slug: 'podcast-production',
    icon: '🎙️',
    title: 'Podcast Production Pipeline',
    description: 'Automate your full podcast workflow from idea to publish.',
    skills: [
      { slug: 'podcast-notes', name: 'Podcast Notes', reason: 'Generates show notes and key takeaways from episode content.' },
      { slug: 'video-toolbox', name: 'Video Toolbox', reason: 'Handles audio/video editing and format conversion for publishing.' },
    ],
    searchLink: '/skills?q=podcast+production+audio',
  },

  {
    slug: 'ai-property-analyst',
    title: 'Analyze real estate data quickly',
    description: 'Automate property insights and market trends for agents.',
    icon: '💼',
    skills: [{ slug: 'data-analysis', name: 'Data Analysis', reason: 'Data Analysis' }, { slug: 'us-stock-analysis', name: 'Us Stock Analysis', reason: 'Us Stock Analysis' }, { slug: 'market-analysis-cn', name: 'Market Analysis CN | 市场分析服务', reason: 'Market Analysis CN | 市场分析服务' }, { slug: 'fundamental-stock-analysis', name: 'Fundamental Stock Analysis', reason: 'Fundamental Stock Analysis' }],
  },
  {
    slug: 'newsroom-ai-editor',
    title: 'Edit and optimize news content',
    description: 'Improve journalism quality with AI-driven editing tools.',
    icon: '✍️',
    skills: [{ slug: 'newsletter-writer', name: 'newsletter writer', reason: 'newsletter writer' }, { slug: 'zip', name: 'zip', reason: 'zip' }, { slug: 'communityhub', name: 'communityhub', reason: 'communityhub' }, { slug: 'campaign', name: 'campaign', reason: 'campaign' }],
  },
  {
    slug: 'legal-doc-generator',
    title: 'Generate legal documents fast',
    description: 'Create contracts and forms using AI templates.',
    icon: '💼',
    skills: [
      { slug: 'system-data-intelligence-skill', name: 'It is designed for scenarios t', reason: 'It is designed for scenarios t' }, { slug: 'bookmark-keeper', name: 'bookmark keeper', reason: 'bookmark keeper' }, { slug: 'clawhub-generate-drama', name: 'generate-drama', reason: 'Top-rated generate skill with 156 downloads' }, { slug: 'zapier-recipe', name: 'Automation Recipe', reason: 'Automation Recipe' }
    ],
  },
  {
    slug: 'task-automation-pro',
    title: 'Automate repetitive work tasks',
    description: 'Streamline workflows with AI-powered automation tools.',
    icon: '💼',
    skills: [{ slug: 'youtube-script', name: 'youtube script', reason: 'youtube script' }, { slug: 'instagram-caption', name: 'instagram caption', reason: 'instagram caption' }, { slug: 'newsletter-writer', name: 'newsletter writer', reason: 'newsletter writer' }, { slug: 'funnel-analyzer', name: 'funnel analyzer', reason: 'funnel analyzer' }],
  },
  {
    slug: 'market-trend-insight',
    title: 'Track real estate market changes',
    description: 'Get real-time updates on property trends and prices.',
    icon: '📈',
    skills: [{ slug: 'data-analysis', name: 'Data Analysis', reason: 'Data Analysis' }, { slug: 'us-stock-analysis', name: 'Us Stock Analysis', reason: 'Us Stock Analysis' }, { slug: 'market-analysis-cn', name: 'Market Analysis CN | 市场分析服务', reason: 'Market Analysis CN | 市场分析服务' }, { slug: 'fundamental-stock-analysis', name: 'Fundamental Stock Analysis', reason: 'Fundamental Stock Analysis' }],
  },
  {
    slug: 'youtube-script-writer',
    title: 'YouTube Script Writer',
    description: 'Generate structured YouTube video scripts with hooks, story arcs, and strong CTAs that keep viewers watching.',
    icon: '🎬',
    skills: [
      { slug: 'youtube-script', name: 'youtube script', reason: 'Top-rated youtube skill with 477 downloads' }, { slug: 'shell-script', name: 'shell script', reason: 'Top-rated script skill with 800 downloads' }, { slug: 'comic-script', name: 'Comic Script', reason: 'Top-rated script skill with 563 downloads' }
    ],
  },
  {
    slug: 'instagram-caption-writer',
    title: 'Instagram Caption Writer',
    description: 'Craft scroll-stopping Instagram captions with emojis, hashtags, and calls-to-action tailored to your brand voice.',
    icon: '📸',
    skills: [
      { slug: 'instagram-caption', name: 'instagram caption', reason: 'Top-rated instagram skill with 363 downloads' }, { slug: 'caption', name: 'caption', reason: 'Top-rated caption skill with 249 downloads' }, { slug: 'story-writer', name: 'story writer', reason: 'Top-rated writer skill with 1091 downloads' }
    ],
  },
  {
    slug: 'linkedin-post-writer',
    title: 'LinkedIn Post Writer',
    description: 'Write professional LinkedIn posts that build thought leadership, generate engagement, and grow your network.',
    icon: '💼',
    skills: [
      { slug: 'linkedin-post', name: 'linkedin post', reason: 'Top-rated linkedin skill with 382 downloads' }, { slug: 'clawhub-stackunderflow', name: 'StackUnderflow Search and Post', reason: 'Top-rated post skill with 1841 downloads' }, { slug: 'clawhub-postthatlater', name: 'PostThatLater', reason: 'Top-rated post skill with 215 downloads' }
    ],
  },
  {
    slug: 'resume-optimizer',
    title: 'Resume Optimizer',
    description: 'Tailor your resume to specific job descriptions, pass ATS filters, and highlight your most relevant achievements.',
    icon: '📄',
    skills: [
      { slug: 'clawhub-resume-master', name: 'Resume Master', reason: 'Top-rated resume skill with 127 downloads' }, { slug: 'clawhub-seo-optimizer-cn', name: 'SEO Optimizer 违禁词检查', reason: 'Top-rated optimizer skill with 458 downloads' }, { slug: 'task-planner', name: 'Task Planner', reason: 'Organizes job search tasks' }
    ],
  },
  {
    slug: 'cover-letter-writer',
    title: 'Cover Letter Writer',
    description: 'Generate personalized cover letters that tell your story and make hiring managers want to meet you.',
    icon: '✉️',
    skills: [
      { slug: 'cover-letter', name: 'cover letter', reason: 'Top-rated cover skill with 493 downloads' }, { slug: 'newsletter-writer', name: 'newsletter writer', reason: 'Top-rated letter skill with 347 downloads' }, { slug: 'system-data-intelligence-skill', name: 'It is designed for scenarios that requir', reason: 'Highly-rated productivity skill' }
    ],
  },
  {
    slug: 'code-review-assistant',
    title: 'Code Review Assistant',
    description: 'Get automated code reviews that catch bugs, suggest improvements, and enforce best practices across your codebase.',
    icon: '🔍',
    skills: [
      { slug: 'code-generator', name: 'Code Generator', reason: 'Generates and reviews code' }, { slug: 'clawhub-ai-code-assistant', name: 'Ai Code Assistant', reason: 'Top-rated code skill with 758 downloads' }, { slug: 'sql-generator', name: 'Clawhub Sql Assistant', reason: 'Reviews database queries' }
    ],
  },
  {
    slug: 'api-documentation-writer',
    title: 'API Documentation Writer',
    description: 'Auto-generate clear, developer-friendly API docs with examples, error codes, and interactive references.',
    icon: '📚',
    skills: [
      { slug: 'story-writer', name: 'story writer', reason: 'Top-rated writer skill with 1091 downloads' }, { slug: 'code-generator', name: 'Code Generator', reason: 'Generates code examples' }, { slug: 'short-drama-writer', name: 'short drama writer', reason: 'Top-rated writer skill with 853 downloads' }
    ],
  },
  {
    slug: 'unit-test-generator',
    title: 'Unit Test Generator',
    description: 'Automatically generate comprehensive unit tests for your code, improving coverage and catching edge cases.',
    icon: '🧪',
    skills: [
      { slug: 'code-generator', name: 'Code Generator', reason: 'Generates test code' }, { slug: 'communityhub', name: 'communityhub', reason: 'Top-rated unit skill with 290 downloads' }, { slug: 'system-data-intelligence-skill', name: 'It is designed for scenarios that requir', reason: 'Highly-rated productivity skill' }
    ],
  },
  {
    slug: 'pricing-strategy',
    title: 'Pricing Strategy Advisor',
    description: 'Analyze your market, competitors, and value proposition to build a data-driven pricing model for your product.',
    icon: '💰',
    skills: [{ slug: 'data-analysis', name: 'Data Analysis', reason: 'Analyzes pricing data' }, { slug: 'leads', name: 'Clawhub Lead Gen', reason: 'Market research insights' }, { slug: 'fundamental-stock-analysis', name: 'Fundamental Stock Analysis', reason: 'Competitor valuation analysis' }],
  },
  {
    slug: 'landing-page-copy',
    title: 'Landing Page Copywriter',
    description: 'Write high-converting landing page copy with compelling headlines, benefit-driven bullet points, and powerful CTAs.',
    icon: '🚀',
    skills: [
      { slug: 'landing', name: 'landing', reason: 'Top-rated landing skill with 200 downloads' }, { slug: 'page-saver', name: 'page saver', reason: 'Top-rated page skill with 103 downloads' }, { slug: 'email-template', name: 'Clawhub Email Drip', reason: 'Consistent brand messaging' }
    ],
  },
  {
    slug: 'email-marketing-campaign',
    title: 'Email Marketing Campaign',
    description: 'Design end-to-end email campaigns from subject lines to sequences that nurture leads and drive conversions.',
    icon: '📧',
    skills: [
      { slug: 'email-template', name: 'Clawhub Email Drip', reason: 'Automates email sequences' }, { slug: 'clawhub-unione', name: 'UniOne Email API', reason: 'Top-rated email skill with 1384 downloads' }, { slug: 'leads', name: 'Clawhub Lead Gen', reason: 'Identifies target audience segments' }
    ],
  },
  {
    slug: 'whitepaper-analyzer',
    title: 'Crypto Whitepaper Analyzer',
    description: 'Deep-dive into crypto project whitepapers — extract tokenomics, team credibility, tech stack, and red flags.',
    icon: '📑',
    skills: [
      { slug: 'clawhub-asrai-x402', name: 'Asrai Crypto Analysis (x402)', reason: 'Top-rated crypto skill with 614 downloads' }, { slug: 'crypto-tracker-cn', name: 'crypto-tracker-cn', reason: 'Top-rated crypto skill with 543 downloads' }, { slug: 'data-analysis', name: 'Data Analysis', reason: 'Structures whitepaper insights' }
    ],
  },
  {
    slug: 'defi-yield-tracker',
    title: 'DeFi Yield Tracker',
    description: 'Monitor DeFi protocols for the best yield opportunities, track APY changes, and manage liquidity positions.',
    icon: '🌾',
    skills: [
      { slug: 'crypto-defi', name: 'crypto defi', reason: 'Top-rated defi skill with 421 downloads' }, { slug: 'crypto-tracker-cn', name: 'crypto-tracker-cn', reason: 'Top-rated tracker skill with 543 downloads' }, { slug: 'wallet-tracker', name: 'Wallet Tracker', reason: 'Top-rated tracker skill with 438 downloads' }
    ],
  },
  {
    slug: 'whale-wallet-tracker',
    title: 'Whale Wallet Tracker',
    description: 'Track large crypto wallet movements to spot early market signals before they hit mainstream news.',
    icon: '🐋',
    skills: [
      { slug: 'crypto-whale-tracker', name: 'Crypto Whale Tracker', reason: 'Top-rated whale skill with 385 downloads' }, { slug: 'wallet-tracker', name: 'Wallet Tracker', reason: 'Top-rated wallet skill with 438 downloads' }, { slug: 'data-analysis', name: 'Data Analysis', reason: 'Wallet activity analysis' }
    ],
  },
  {
    slug: 'earnings-report-analyzer',
    title: 'Earnings Report Analyzer',
    description: 'Automatically parse quarterly earnings reports, extract key metrics, and compare against analyst expectations.',
    icon: '📊',
    skills: [
      { slug: 'fundamental-stock-analysis', name: 'Fundamental Stock Analysis', reason: 'Core earnings analysis' }, { slug: 'data-analysis', name: 'Data Analysis', reason: 'Financial data processing' }, { slug: 'system-data-intelligence-skill', name: 'It is designed for scenarios that requir', reason: 'Top-rated report skill with 1200 downloads' }
    ],
  },
  {
    slug: 'workout-plan-generator',
    title: 'Workout Plan Generator',
    description: 'Create personalized workout plans based on your fitness goals, available equipment, and schedule.',
    icon: '💪',
    skills: [{ slug: 'task-planner', name: 'Task Planner', reason: 'Structures workout schedules' }, { slug: 'data-analysis', name: 'Data Analysis', reason: 'Tracks fitness progress' }],
  },
  {
    slug: 'meal-prep-planner',
    title: 'Meal Prep Planner',
    description: 'Plan weekly meals, generate shopping lists, and optimize nutrition based on dietary preferences and goals.',
    icon: '🥗',
    skills: [
      { slug: 'task-planner', name: 'Task Planner', reason: 'Weekly meal planning' }, { slug: 'mealplan', name: 'mealplan', reason: 'Top-rated meal skill with 229 downloads' }, { slug: 'system-data-intelligence-skill', name: 'It is designed for scenarios that requir', reason: 'Highly-rated productivity skill' }
    ],
  },
  {
    slug: 'product-description-writer',
    title: 'Product Description Writer',
    description: 'Write SEO-optimized product descriptions that highlight benefits, build desire, and convert browsers to buyers.',
    icon: '🛍️',
    skills: [
      { slug: 'product-desc', name: 'product desc', reason: 'Top-rated product skill with 402 downloads' }, { slug: 'clawhub-skill-dropship-product-pipeline', name: 'Dropship Product Pipeline', reason: 'Top-rated product skill with 305 downloads' }, { slug: 'clawhub-amazon-product-research-skill', name: 'Amazon Product Research', reason: 'Top-rated product skill with 201 downloads' }
    ],
  },
  {
    slug: 'customer-review-responder',
    title: 'Customer Review Responder',
    description: 'Craft professional, empathetic responses to customer reviews that protect your brand reputation.',
    icon: '⭐',
    skills: [
      { slug: 'customer-service-reply', name: 'customer service reply', reason: 'Top-rated customer skill with 650 downloads' }, { slug: 'performance-review', name: 'performance review', reason: 'Top-rated review skill with 453 downloads' }, { slug: 'system-data-intelligence-skill', name: 'It is designed for scenarios that requir', reason: 'Highly-rated productivity skill' }
    ],
  },
  {
    slug: 'git-commit-message',
    title: 'Git Commit Message Writer',
    description: 'Generate clear, conventional commit messages from your code diffs that make git history readable.',
    icon: '📝',
    skills: [
      { slug: 'code-generator', name: 'Code Generator', reason: 'Code change analysis' }, { slug: 'commit-helper', name: 'commit helper', reason: 'Top-rated commit skill with 294 downloads' }, { slug: 'system-data-intelligence-skill', name: 'It is designed for scenarios that requir', reason: 'Highly-rated productivity skill' }
    ],
  },
  {
    slug: 'readme-generator',
    title: 'README Generator',
    description: 'Auto-generate professional README files with badges, installation guides, API docs, and contribution guidelines.',
    icon: '📖',
    skills: [
      { slug: 'readme-template', name: 'readme template', reason: 'Top-rated readme skill with 349 downloads' }, { slug: 'code-generator', name: 'Code Generator', reason: 'Code example generation' }, { slug: 'system-data-intelligence-skill', name: 'It is designed for scenarios that requir', reason: 'Highly-rated productivity skill' }
    ],
  },
  {
    slug: 'influencer-outreach',
    title: 'Influencer Outreach',
    description: 'Find relevant influencers, craft personalized pitches, and manage outreach campaigns to amplify your brand.',
    icon: '🤝',
    skills: [
      { slug: 'leads', name: 'Clawhub Lead Gen', reason: 'Influencer prospect research' }, { slug: 'email-template', name: 'Clawhub Email Drip', reason: 'Automated outreach sequences' }, { slug: 'clawhub-influencer-plan', name: 'Influencer-Plan', reason: 'Top-rated influencer skill with 145 downloads' }
    ],
  },
  {
    slug: 'ad-creative-generator',
    title: 'Ad Creative Generator',
    description: 'Generate multiple ad copy variations for A/B testing across Facebook, Google, and TikTok campaigns.',
    icon: '🎯',
    skills: [
      { slug: 'clawhub-content-ideas-generator', name: 'Content Ideas Generator', reason: 'Top-rated generator skill with 2941 downloads' }, { slug: 'code-generator', name: 'code generator', reason: 'Top-rated generator skill with 1683 downloads' }, { slug: 'api-generator', name: 'api generator', reason: 'Top-rated generator skill with 1081 downloads' }
    ],
  },
  {
    slug: 'salary-negotiation-guide',
    title: 'Salary Negotiation Guide',
    description: 'Research market rates, prepare negotiation scripts, and practice responses to counter-offers with confidence.',
    icon: '💵',
    skills: [{ slug: 'data-analysis', name: 'Data Analysis', reason: 'Market salary data analysis' }, { slug: 'task-planner', name: 'Task Planner', reason: 'Negotiation preparation checklist' }],
  },
  {
    slug: 'sleep-optimizer',
    title: 'Sleep Optimizer',
    description: 'Analyze your sleep patterns and get personalized recommendations to improve sleep quality and wake up energized.',
    icon: '😴',
    skills: [{ slug: 'data-analysis', name: 'Data Analysis', reason: 'Sleep data pattern analysis' }, { slug: 'task-planner', name: 'Task Planner', reason: 'Sleep routine scheduling' }],
  },
  {
    slug: 'language-flashcard-creator',
    title: 'Language Flashcard Creator',
    description: 'Automatically generate spaced-repetition flashcards from texts, articles, or vocabulary lists for faster language learning.',
    icon: '🃏',
    skills: [
      { slug: 'flashcard', name: 'flashcard', reason: 'Top-rated flashcard skill with 383 downloads' }, { slug: 'task-planner', name: 'Task Planner', reason: 'Spaced repetition scheduling' }, { slug: 'system-data-intelligence-skill', name: 'It is designed for scenarios that requir', reason: 'Highly-rated productivity skill' }
    ],
  },
  {
    slug: 'research-paper-summarizer',
    title: 'Research Paper Summarizer',
    description: 'Extract key findings, methodology, and conclusions from academic papers in minutes instead of hours.',
    icon: '🔬',
    skills: [
      { slug: 'clawhub-deep-research-pro', name: 'Deep Research Pro', reason: 'Top-rated research skill with 25135 downloads' }, { slug: 'data-analysis', name: 'Data Analysis', reason: 'Research data synthesis' }, { slug: 'system-data-intelligence-skill', name: 'It is designed for scenarios that requir', reason: 'Top-rated research skill with 1200 downloads' }
    ],
  },
  {
    slug: 'grant-writing-assistant',
    title: 'Grant Writing Assistant',
    description: 'Research funding opportunities, draft compelling grant proposals, and format applications to meet submission requirements.',
    icon: '🏆',
    skills: [
      { slug: 'system-data-intelligence-skill', name: 'It is designed for scenarios that requir', reason: 'Top-rated writing skill with 1200 downloads' }, { slug: 'clawhub-ai-code-assistant', name: 'Ai Code Assistant', reason: 'Top-rated assistant skill with 758 downloads' }, { slug: 'task-planner', name: 'Task Planner', reason: 'Grant deadline management' }
    ],
  },
  {
    slug: 'personal-budget-tracker',
    title: 'Personal Budget Tracker',
    description: 'Track income and expenses, identify spending patterns, and build a savings plan tailored to your financial goals.',
    icon: '💳',
    skills: [
      { slug: 'personal-bookkeeper', name: 'personal bookkeeper', reason: 'Top-rated personal skill with 373 downloads' }, { slug: 'budgetly', name: 'budgetly', reason: 'Top-rated budget skill with 266 downloads' }, { slug: 'data-analysis', name: 'Data Analysis', reason: 'Spending pattern analysis' }
    ],
  },
  {
    slug: 'tax-prep-assistant',
    title: 'Tax Prep Assistant',
    description: 'Organize tax documents, identify deductions, and prepare summaries to make tax filing faster and stress-free.',
    icon: '🧾',
    skills: [
      { slug: 'court-prep', name: 'court prep', reason: 'Top-rated prep skill with 371 downloads' }, { slug: 'clawhub-ai-code-assistant', name: 'Ai Code Assistant', reason: 'Top-rated assistant skill with 758 downloads' }, { slug: 'legal-advisor', name: 'Legal Document Analyzer', reason: 'Tax document review' }
    ],
  },

  {
    slug: 'startup-founder-toolkit',
    title: 'Discover AI tools for startup founders',
    description: 'Find the best AI tools tailored for startup founders.',
    icon: '💼',
    skills: [
      { slug: 'gizmolab-tools', name: 'gizmolab-tools', reason: 'Top-rated tools skill with 1093 downloads' }, { slug: 'startup-tools', name: 'startup tools', reason: 'Top-rated tools skill with 334 downloads' }, { slug: 'notion-powertools', name: 'notion powertools', reason: 'Top-rated tools skill with 331 downloads' }, { slug: 'browser-devtools', name: 'browser devtools', reason: 'Top-rated tools skill with 327 downloads' }
    ],
  },
  {
    slug: 'freelancer-writing-ai',
    title: 'Boost freelance writing with AI',
    description: 'Use AI to enhance content creation for freelancers.',
    icon: '✍️',
    skills: [
      { slug: 'system-data-intelligence-skill', name: 'It is designed for scenarios that requir', reason: 'Top-rated writing skill with 1200 downloads' }
    ],
  },
  {
    slug: 'legal-ai-assistant',
    title: 'Automate legal tasks with AI',
    description: 'Streamline legal workflows using AI-powered tools.',
    icon: '💼',
    skills: [
      { slug: 'clawhub-tavily', name: 'Tavily AI Search', reason: 'Tavily AI Search' }, { slug: 'legal-advisor', name: 'legal advisor', reason: 'Top-rated legal skill with 1126 downloads' }, { slug: 'clawhub-deep-research-pro', name: 'Deep Research Pro', reason: 'Deep Research Pro' }, { slug: 'precedent', name: 'Precedent — Legal Precedent Reference', reason: 'Top-rated legal skill with 100 downloads' }
    ],
  },
  {
    slug: 'seo-tool-for-startups',
    title: 'Optimize SEO for startups',
    description: 'Leverage AI SEO tools to boost startup visibility.',
    icon: '💼',
    skills: [
      { slug: 'clawhub-seo-optimizer-cn', name: 'SEO Optimizer 违禁词检查', reason: 'Top-rated optimize skill with 458 downloads' }, { slug: 'system-data-intelligence-skill', name: 'It is designed for scenarios that requir', reason: 'Highly-rated productivity skill' }
    ],
  },
  {
    slug: 'freelance-marketing-ai',
    title: 'Enhance freelance marketing with AI',
    description: 'Use AI to manage and grow freelance marketing efforts.',
    icon: '💼',
    skills: [
      { slug: 'clawhub-marketing-copy-knowledge', name: 'Marketing Copy Knowledge', reason: 'Top-rated marketing skill with 1290 downloads' }, { slug: 'system-data-intelligence-skill', name: 'It is designed for scenarios that requir', reason: 'Highly-rated productivity skill' }
    ],
  },

  {
    slug: 'freelance-writing-ai',
    title: 'Automate content creation for writers',
    description: 'Streamline writing tasks with AI-powered tools.',
    icon: '💼',
    skills: [{ slug: 'clawhub-youtube-watcher', name: 'YouTube Watcher', reason: 'YouTube Watcher' }, { slug: 'clawhub-imap-smtp-email', name: 'imap-smtp-email', reason: 'imap-smtp-email' }, { slug: 'clawhub-liang-tavily-search', name: 'Tavily Search', reason: 'Tavily Search' }, { slug: 'clawhub-xiaohongshu-mcp', name: 'Xiaohongshu (小红书) Automation', reason: 'Xiaohongshu (小红书) Automation' }],
  },
  {
    slug: 'video-production-ai',
    title: 'Generate professional videos quickly',
    description: 'Create high-quality video content with AI tools.',
    icon: '✍️',
    skills: [{ slug: 'clawhub-ffmpeg-video-editor', name: 'ffmpeg-video-editor', reason: 'ffmpeg-video-editor' }, { slug: 'clawhub-image-edit', name: 'Image Editing', reason: 'Image Editing' }, { slug: 'clawhub-image-generation', name: 'AI Image Generation', reason: 'AI Image Generation' }, { slug: 'clawhub-ai-video-gen', name: 'Ai Video Gen', reason: 'Ai Video Gen' }],
  },
  {
    slug: 'legal-doc-automation',
    title: 'Automate legal document drafting',
    description: 'Generate legal documents faster with AI.',
    icon: '💼',
    skills: [{ slug: 'clawhub-tavily', name: 'Tavily AI Search', reason: 'Tavily AI Search' }, { slug: 'clawhub-web-search', name: 'Web Search', reason: 'Web Search' }, { slug: 'clawhub-web-search-exa', name: 'Web Search by Exa', reason: 'Web Search by Exa' }, { slug: 'clawhub-deep-research-pro', name: 'Deep Research Pro', reason: 'Deep Research Pro' }],
  },
  {
    slug: 'freelancer-marketing-tool',
    title: 'Boost freelance marketing efforts',
    description: 'Use AI to enhance client acquisition and branding.',
    icon: '💼',
    skills: [{ slug: 'clawhub-mailchimp', name: 'Mailchimp', reason: 'Mailchimp' }, { slug: 'clawhub-marketing-skills', name: 'Marketing Skills', reason: 'Marketing Skills' }, { slug: 'clawhub-frontend-design-ultimate', name: 'Frontend Design Ultimate', reason: 'Frontend Design Ultimate' }, { slug: 'clawhub-marketing-strategy-pmm', name: 'Marketing Strategy Pmm', reason: 'Marketing Strategy Pmm' }],
  },
  {
    slug: 'video-editing-assistant',
    title: 'Enhance video editing with AI',
    description: 'Simplify the editing process using smart tools.',
    icon: '✍️',
    skills: [{ slug: 'clawhub-ffmpeg-video-editor', name: 'ffmpeg-video-editor', reason: 'ffmpeg-video-editor' }, { slug: 'clawhub-image-edit', name: 'Image Editing', reason: 'Image Editing' }, { slug: 'clawhub-image-generation', name: 'AI Image Generation', reason: 'AI Image Generation' }, { slug: 'clawhub-ai-video-gen', name: 'Ai Video Gen', reason: 'Ai Video Gen' }],
  },

  {
    slug: 'video-automation-suite',
    title: 'Automate video production workflows',
    description: 'Streamline video creation with AI-driven automation.',
    icon: '💼',
    skills: [{ slug: 'clawhub-humanizer', name: 'Humanizer', reason: 'Humanizer' }, { slug: 'clawhub-image-cog', name: 'Image Cog', reason: 'Image Cog' }, { slug: 'clawhub-ffmpeg-video-editor', name: 'ffmpeg-video-editor', reason: 'ffmpeg-video-editor' }, { slug: 'clawhub-best-image-generation', name: 'Best Image Generation', reason: 'Best Image Generation' }],
  },
  {
    slug: 'podcast-audio-enhancer',
    title: 'Enhance podcast audio quality',
    description: 'Improve clarity and professionalism of audio tracks.',
    icon: '✍️',
    skills: [{ slug: 'clawhub-markdown-converter', name: 'Markdown Converter', reason: 'Markdown Converter' }, { slug: 'clawhub-pdf-extract', name: 'Pdf Extract', reason: 'Pdf Extract' }, { slug: 'clawhub-pdf-text-extractor', name: 'PDF Text Extractor', reason: 'PDF Text Extractor' }, { slug: 'clawhub-adaptive-reasoning', name: 'Adaptive Reasoning', reason: 'Adaptive Reasoning' }],
  },
  {
    slug: 'legal-doc-automator',
    title: 'Automate legal document drafting',
    description: 'Generate and review legal documents quickly.',
    icon: '💼',
    skills: [{ slug: 'clawhub-tavily', name: 'Tavily AI Search', reason: 'Tavily AI Search' }, { slug: 'clawhub-web-search-exa', name: 'Web Search by Exa', reason: 'Web Search by Exa' }, { slug: 'clawhub-web-search', name: 'Web Search', reason: 'Web Search' }, { slug: 'clawhub-deep-research-pro', name: 'Deep Research Pro', reason: 'Deep Research Pro' }],
  },
  {
    slug: 'content-clip-editor',
    title: 'Edit video clips efficiently',
    description: 'Quickly trim, arrange, and enhance video clips.',
    icon: '✍️',
    skills: [{ slug: 'clawhub-humanizer', name: 'Humanizer', reason: 'Humanizer' }, { slug: 'clawhub-image-cog', name: 'Image Cog', reason: 'Image Cog' }, { slug: 'clawhub-ffmpeg-video-editor', name: 'ffmpeg-video-editor', reason: 'ffmpeg-video-editor' }, { slug: 'clawhub-best-image-generation', name: 'Best Image Generation', reason: 'Best Image Generation' }],
  },
  {
    slug: 'podcast-transcription-tool',
    title: 'Transcribe podcast episodes',
    description: 'Convert audio to text for easy reference.',
    icon: '💼',
    skills: [{ slug: 'clawhub-voice-wake-say', name: 'Voice Wake Say', reason: 'Voice Wake Say' }, { slug: 'clawhub-speech-recognition', name: 'speech-recognition', reason: 'speech-recognition' }, { slug: 'clawhub-tradingview-quantitative-skills', name: 'Tradingview Quantitative', reason: 'Tradingview Quantitative' }, { slug: 'clawhub-clawdbot-skill-voice-wake-say', name: 'Voice Wake Say TTS Responses (', reason: 'Voice Wake Say TTS Responses (' }],
  },
]

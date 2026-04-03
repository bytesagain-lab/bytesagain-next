'use client'

import { useState } from 'react'

const CATEGORIES = [
  {
    id: 'work',
    icon: '💼',
    label: 'Work',
    roles: [
      { id: 'developer', icon: '⚡', label: 'Developer' },
      { id: 'devops', icon: '🐳', label: 'DevOps Engineer' },
      { id: 'designer', icon: '🎨', label: 'Designer' },
      { id: 'product', icon: '🗺️', label: 'Product Manager' },
      { id: 'marketer', icon: '📣', label: 'Marketer' },
      { id: 'seo', icon: '🔍', label: 'SEO Specialist' },
      { id: 'sales', icon: '🤝', label: 'Sales' },
      { id: 'hr', icon: '👥', label: 'HR / Recruiter' },
      { id: 'legal', icon: '⚖️', label: 'Legal / Compliance' },
      { id: 'finance', icon: '💰', label: 'Finance / Accounting' },
      { id: 'ecommerce', icon: '🛍️', label: 'E-commerce' },
      { id: 'freelancer', icon: '🧳', label: 'Freelancer' },
      { id: 'job-seeker', icon: '🎯', label: 'Job Seeker' },
      { id: 'founder', icon: '🚀', label: 'Founder / CEO' },
      { id: 'consultant', icon: '🧠', label: 'Consultant' },
      { id: 'customer-support', icon: '🎧', label: 'Customer Support' },
    ],
  },
  {
    id: 'create',
    icon: '🎬',
    label: 'Create',
    roles: [
      { id: 'blogger', icon: '✍️', label: 'Blogger / Writer' },
      { id: 'youtuber', icon: '▶️', label: 'YouTuber' },
      { id: 'podcaster', icon: '🎙️', label: 'Podcaster' },
      { id: 'social', icon: '📱', label: 'Social Media' },
      { id: 'newsletter', icon: '📧', label: 'Newsletter Creator' },
      { id: 'video-editor', icon: '🎞️', label: 'Video Editor' },
      { id: 'photographer', icon: '📷', label: 'Photographer' },
      { id: 'musician', icon: '🎵', label: 'Musician / Producer' },
      { id: 'game-dev', icon: '🎮', label: 'Game Developer' },
      { id: 'creator', icon: '✨', label: 'Content Creator' },
    ],
  },
  {
    id: 'learn',
    icon: '📚',
    label: 'Learn & Research',
    roles: [
      { id: 'student', icon: '🎓', label: 'Student' },
      { id: 'self-taught', icon: '💡', label: 'Self-taught' },
      { id: 'researcher', icon: '🔬', label: 'Researcher' },
      { id: 'teacher', icon: '🏫', label: 'Teacher / Educator' },
      { id: 'language-learner', icon: '🗣️', label: 'Language Learner' },
      { id: 'data-scientist', icon: '📊', label: 'Data Scientist' },
      { id: 'academic', icon: '📄', label: 'Academic / PhD' },
      { id: 'journalist', icon: '📰', label: 'Journalist' },
    ],
  },
  {
    id: 'invest',
    icon: '📈',
    label: 'Invest & Trade',
    roles: [
      { id: 'trader', icon: '🪙', label: 'Crypto Trader' },
      { id: 'investor', icon: '📊', label: 'Stock Investor' },
      { id: 'analyst', icon: '🔍', label: 'Financial Analyst' },
      { id: 'defi', icon: '🌐', label: 'DeFi / Web3' },
      { id: 'real-estate', icon: '🏠', label: 'Real Estate' },
    ],
  },
  {
    id: 'life',
    icon: '🌱',
    label: 'Life & Hobby',
    roles: [
      { id: 'traveler', icon: '✈️', label: 'Traveler' },
      { id: 'cook', icon: '🍳', label: 'Home Cook' },
      { id: 'fitness', icon: '💪', label: 'Fitness / Health' },
      { id: 'gamer', icon: '🕹️', label: 'Gamer' },
      { id: 'parent', icon: '👨‍👩‍👧', label: 'Parent' },
    ],
  },
]

// role → /skills?tags=xxx 映射
const ROLE_TAG: Record<string, string> = {
  developer: 'coding', devops: 'devops', designer: 'writing', product: 'productivity',
  marketer: 'social-media', seo: 'seo', sales: 'communication', hr: 'hr',
  legal: 'legal', finance: 'finance', ecommerce: 'ecommerce', freelancer: 'productivity',
  founder: 'automation', consultant: 'data', 'customer-support': 'communication',
  blogger: 'writing', youtuber: 'video', podcaster: 'audio', social: 'social-media',
  newsletter: 'email-marketing', 'video-editor': 'video', photographer: 'image-gen',
  musician: 'audio', 'game-dev': 'coding', creator: 'writing',
  student: 'education', 'self-taught': 'coding', researcher: 'research',
  teacher: 'education', 'data-scientist': 'data', academic: 'research', journalist: 'writing',
  trader: 'crypto-defi', investor: 'finance', analyst: 'data', defi: 'crypto-defi', 'real-estate': 'real-estate',
  traveler: 'travel', cook: 'cooking', fitness: 'health', gamer: 'gaming',
  'language-learner': 'education', parent: 'education', 'job-seeker': 'hr',
}

const SKILL_PACKS: Record<string, { slug: string; name: string; reason: string }[]> = {
  // Work
  developer:        [{ slug: 'clawhub-autonomous-code-review', name: 'Code Review AI', reason: 'AI-powered code review' }, { slug: 'clawhub-git-assist', name: 'Git Assist', reason: 'Git workflow automation' }, { slug: 'clawhub-code-review-automation', name: 'Code Review Automation', reason: 'Automate PR reviews' }, { slug: 'clawhub-legend-git-helper', name: 'Git Helper', reason: 'Git commands helper' }],
  devops:           [{ slug: 'clawhub-server-watchdog', name: 'Server Watchdog', reason: 'Server uptime monitoring' }, { slug: 'clawhub-ci-cd-compliance', name: 'CI/CD Compliance', reason: 'CI/CD pipeline checks' }, { slug: 'clawhub-ssh-server-watchdog', name: 'SSH Watchdog', reason: 'SSH server monitor' }, { slug: 'clawhub-docker-lwops-deployer', name: 'Docker Deployer', reason: 'Docker deployment' }],
  designer:         [{ slug: 'superdesign', name: 'SuperDesign', reason: 'Figma to code' }, { slug: 'frontend-design-3', name: 'Frontend Design', reason: 'UI component builder' }, { slug: 'ui-ux-pro-max', name: 'UI/UX Pro Max', reason: 'Design system AI' }],
  product:          [{ slug: 'clawhub-prd-skill2026', name: 'PRD Writer 2026', reason: 'PRD writing assistant' }, { slug: 'clawhub-prd-writer', name: 'PRD Writer', reason: 'Product requirements doc' }, { slug: 'clawhub-prd', name: 'PRD Generator', reason: 'PRD generator' }, { slug: 'clawhub-prd-skill', name: 'Product Spec Writer', reason: 'Product spec writer' }],
  marketer:         [{ slug: 'clawhub-brand-voice', name: 'Brand Voice', reason: 'Brand voice consistency' }, { slug: 'clawhub-afrexai-copywriting-mastery', name: 'Copywriting Mastery', reason: 'Copywriting mastery' }, { slug: 'clawhub-ad-creative-brief-generator', name: 'Ad Creative Brief', reason: 'Ad creative briefs' }, { slug: 'clawhub-content-agency', name: 'Content Agency AI', reason: 'Content at scale' }],
  seo:              [{ slug: 'seo-keyword-researcher', name: 'Keyword Researcher', reason: 'Find winning keywords' }, { slug: 'seo-optimization', name: 'SEO Optimizer', reason: 'On-page optimization' }, { slug: 'keyword-research-seo', name: 'Keyword Research', reason: 'Topic discovery' }, { slug: 'content-writer', name: 'Content Writer', reason: 'SEO articles' }],
  sales:            [{ slug: 'clawhub-cold-outreach', name: 'Cold Outreach', reason: 'Cold outreach sequences' }, { slug: 'clawhub-cold-email-personalization', name: 'Cold Email Pro', reason: 'Personalized cold email' }, { slug: 'gh-cold-mail-by-domore-ai', name: 'Cold Mail AI', reason: 'AI cold email writer' }, { slug: 'clawhub-cold-email-engine', name: 'Cold Email Engine', reason: 'Cold email engine' }],
  hr:               [{ slug: 'jd-writer', name: 'JD Writer', reason: 'Job description writer' }, { slug: 'clawhub-jd-writer', name: 'JD Generator', reason: 'JD generator' }, { slug: 'clawhub-writing-assistant', name: 'Writing Assistant', reason: 'HR writing assistant' }, { slug: 'clawhub-resume-writing', name: 'Resume Writing', reason: 'Resume screening' }],
  legal:            [{ slug: 'afrexai-contract-analyzer', name: 'Contract Analyzer', reason: 'Review agreements' }, { slug: 'legal-advisor', name: 'Legal Advisor', reason: 'General legal Q&A' }, { slug: 'gdpr-compliance-tracker', name: 'GDPR Compliance', reason: 'Data protection' }, { slug: 'translator-pro', name: 'Translator Pro', reason: 'Multi-jurisdiction docs' }],
  finance:          [{ slug: 'excel-formula', name: 'Excel Formula', reason: 'Financial modeling' }, { slug: 'npv', name: 'NPV Calculator', reason: 'Project valuation' }, { slug: 'monte-carlo', name: 'Monte Carlo', reason: 'Risk simulation' }, { slug: 'clawhub-invoice-generator', name: 'Invoice Generator', reason: 'Billing automation' }],
  ecommerce:        [{ slug: 'product-description-generator', name: 'Product Description', reason: 'Listings that convert' }, { slug: 'shopify-product-description-generator', name: 'Shopify Descriptions', reason: 'Store optimization' }, { slug: 'seo-optimization', name: 'SEO Optimizer', reason: 'Product discoverability' }, { slug: 'excel-formula', name: 'Excel Formula', reason: 'Inventory & pricing' }],
  freelancer:       [{ slug: 'ai-invoice-generator', name: 'Invoice Generator', reason: 'Get paid faster' }, { slug: 'task-planner', name: 'Task Planner', reason: 'Client project tracking' }, { slug: 'legal-advisor', name: 'Legal Advisor', reason: 'Contract basics' }, { slug: 'cold-email-writer', name: 'Cold Email Writer', reason: 'Win new clients' }],
  founder:          [{ slug: 'business-plan', name: 'Business Plan', reason: 'Pitch-ready strategy' }, { slug: 'landing-page-generator', name: 'Landing Page', reason: 'Launch fast' }, { slug: 'monte-carlo', name: 'Monte Carlo', reason: 'Financial modeling' }, { slug: 'legal-advisor', name: 'Legal Advisor', reason: 'Cap table & terms' }, { slug: 'seo-optimization', name: 'SEO Optimizer', reason: 'Organic growth' }],
  consultant:       [{ slug: 'weekly-report-generator', name: 'Report Generator', reason: 'Client deliverables' }, { slug: 'chart-image', name: 'Chart Builder', reason: 'Data visualization' }, { slug: 'task-planner', name: 'Task Planner', reason: 'Engagement tracking' }, { slug: 'translator-pro', name: 'Translator Pro', reason: 'Global clients' }],
  'customer-support':[{ slug: 'cold-email-writer', name: 'Email Writer', reason: 'Response templates' }, { slug: 'translator-pro', name: 'Translator Pro', reason: 'Multi-language support' }, { slug: 'task-planner', name: 'Task Planner', reason: 'Ticket management' }],

  // Create
  blogger:          [{ slug: 'clawhub-ai-seo-writer', name: 'AI SEO Writer', reason: 'SEO article writer' }, { slug: 'clawhub-afrexai-seo-writer', name: 'SEO Writer Pro', reason: 'AI SEO content' }, { slug: 'clawhub-seo-content-writer', name: 'SEO Content Writer', reason: 'Blog SEO writer' }, { slug: 'clawhub-wp-article-publisher', name: 'WP Publisher', reason: 'WordPress publisher' }],
  youtuber:         [{ slug: 'story-writer', name: 'Story Writer', reason: 'Scripts & hooks' }, { slug: 'clawhub-youtube-summarizer', name: 'YouTube Summarizer', reason: 'Research faster' }, { slug: 'translator-pro', name: 'Translator Pro', reason: 'Subtitles & localization' }, { slug: 'seo-optimization', name: 'SEO Optimizer', reason: 'Video discoverability' }],
  podcaster:        [{ slug: 'podcast-notes', name: 'Podcast Notes', reason: 'Podcast show notes' }, { slug: 'clawhub-book-summary', name: 'Book Summary', reason: 'Episode research' }, { slug: 'clawhub-podcast-notes', name: 'Podcast Notes AI', reason: 'Auto show notes' }, { slug: 'clawhub-speech-notes', name: 'Speech Notes', reason: 'Speech to notes' }],
  social:           [{ slug: 'clawhub-content-calendar', name: 'Content Calendar', reason: 'Content calendar' }, { slug: 'clawhub-twitter-thread-creation', name: 'Twitter Threads', reason: 'Twitter thread writer' }, { slug: 'clawhub-instagram-caption-scraper', name: 'Instagram Captions', reason: 'Caption generator' }, { slug: 'image-cog', name: 'Image Tools', reason: 'Visual content' }],
  newsletter:       [{ slug: 'newsletter-writer', name: 'Newsletter Writer', reason: 'Newsletter writing' }, { slug: 'clawhub-newsletter-writer', name: 'Newsletter AI', reason: 'AI newsletter tool' }, { slug: 'clawhub-newsletter', name: 'Newsletter Generator', reason: 'Issue generator' }, { slug: 'clawhub-newsletter-signup-generator', name: 'Signup Generator', reason: 'Grow subscribers' }],
  'video-editor':   [{ slug: 'clawhub-auto-caption-generator', name: 'Auto Caption', reason: 'Auto captions' }, { slug: 'clawhub-auto-subtitle-generator-free-ab-old', name: 'Subtitle Generator', reason: 'Subtitle generator' }, { slug: 'clawhub-auto-caption', name: 'Caption AI', reason: 'Caption automation' }, { slug: 'clawhub-video-transition', name: 'Video Transition', reason: 'Video transitions' }],
  photographer:     [{ slug: 'image-cog', name: 'Image Tools', reason: 'Edit & enhance' }, { slug: 'creative-toolkit', name: 'AI Image Generator', reason: 'Creative assets' }, { slug: 'story-writer', name: 'Caption Writer', reason: 'Social captions' }],
  musician:         [{ slug: 'clawhub-audio-mastering-cli', name: 'Audio Mastering', reason: 'Audio mastering' }, { slug: 'mix', name: 'Mix', reason: 'Mix & produce' }, { slug: 'clawhub-audio', name: 'Audio Tools', reason: 'Audio tools' }, { slug: 'lobehub-letrista-internacional', name: 'Lyrics Writer', reason: 'Lyrics writing' }],
  'game-dev':       [{ slug: 'code-generator', name: 'Code Generator', reason: 'Game logic & scripts' }, { slug: 'debugger', name: 'Debugger', reason: 'Fix game bugs' }, { slug: 'game-cog', name: 'Game Cog', reason: 'Game design tools' }, { slug: 'brainstorming', name: 'Brainstorming', reason: 'Level & story design' }],
  creator:          [{ slug: 'clawhub-cross-platform-recut-planner', name: 'Recut Planner', reason: 'Multi-platform repurpose' }, { slug: 'clawhub-ad-creative-brief-generator', name: 'Creative Brief', reason: 'Ad creative briefs' }, { slug: 'gh-creative-bloq', name: 'Creative Bloq', reason: 'Creative inspiration' }, { slug: 'clawhub-video-multi-publish', name: 'Multi-Publish', reason: 'Video multi-publish' }],

  // Learn
  student:          [{ slug: 'flashcards', name: 'Flashcard Maker', reason: 'Active recall' }, { slug: 'quiz-generator-cp3d', name: 'Quiz Generator', reason: 'Test yourself' }, { slug: 'summarize', name: 'Summarize', reason: 'Condense readings' }, { slug: 'translator-pro', name: 'Translator Pro', reason: 'Understand any source' }],
  'self-taught':    [{ slug: 'code-generator', name: 'Code Generator', reason: 'Learn by example' }, { slug: 'debugger', name: 'Debugger', reason: 'Fix your own bugs' }, { slug: 'study-habits', name: 'Study Habits', reason: 'Build learning routines' }, { slug: 'quiz-generator-cp3d', name: 'Quiz Generator', reason: 'Test yourself' }, { slug: 'translator-pro', name: 'Translator Pro', reason: 'Learn from any source' }],
  researcher:       [{ slug: 'ai-powered-literature-review-skills', name: 'Literature Review', reason: 'Survey papers fast' }, { slug: 'literature-review', name: 'Literature Reviewer', reason: 'Academic research' }, { slug: 'task-planner', name: 'Task Planner', reason: 'Research tracking' }, { slug: 'translator-pro', name: 'Translator Pro', reason: 'Multi-language sources' }],
  teacher:          [{ slug: 'curriculum-generator', name: 'Curriculum Generator', reason: 'Lesson planning' }, { slug: 'quiz-generator-cp3d', name: 'Quiz Generator', reason: 'Auto assessment' }, { slug: 'ppt-generator', name: 'PPT Generator', reason: 'Slide decks' }, { slug: 'language-learning', name: 'Language Tutor', reason: 'Multilingual students' }],
  'data-scientist': [{ slug: 'clawhub-data-visualization-pro-automaton', name: 'Data Viz Pro', reason: 'Data visualization' }, { slug: 'clawhub-data-visualization-2', name: 'Data Visualization', reason: 'Chart automation' }, { slug: 'clawhub-chart-data-viz', name: 'Chart Data Viz', reason: 'Chart & data viz' }, { slug: 'clawhub-chartai', name: 'Chart AI', reason: 'AI chart builder' }],
  academic:         [{ slug: 'lobehub-academic-writing-assistant', name: 'Academic Writing', reason: 'Academic writing' }, { slug: 'clawhub-research-paper-writer', name: 'Research Paper AI', reason: 'Research paper writer' }, { slug: 'clawhub-pr-review-expert', name: 'Paper Reviewer', reason: 'Paper review expert' }, { slug: 'lobehub-academic-revision-specialist', name: 'Paper Revision', reason: 'Paper revision' }],
  journalist:       [{ slug: 'story-writer', name: 'Story Writer', reason: 'Articles & interviews' }, { slug: 'clawhub-fact-checker', name: 'Fact Checker', reason: 'Verify claims' }, { slug: 'translator-pro', name: 'Translator Pro', reason: 'Foreign sources' }, { slug: 'task-planner', name: 'Task Planner', reason: 'Story pipeline' }],

  // Invest
  trader:           [{ slug: 'clawhub-trading-signals-pro', name: 'Trading Signals', reason: 'Trading signals' }, { slug: 'gh-coindera', name: 'Coindera', reason: 'Crypto price alerts' }, { slug: 'clawhub-trading-research', name: 'Trading Research', reason: 'Market research' }, { slug: 'clawhub-market-structure-scan', name: 'Market Structure', reason: 'Market structure scan' }],
  investor:         [{ slug: 'clawhub-portfolio-manager', name: 'Portfolio Manager', reason: 'Portfolio manager' }, { slug: 'clawhub-afrexai-portfolio-risk', name: 'Portfolio Risk', reason: 'Portfolio risk analysis' }, { slug: 'investment-portfolio', name: 'Investment Portfolio', reason: 'Investment tracker' }, { slug: 'clawhub-a-share-stock-dossier', name: 'Stock Dossier', reason: 'Stock analysis' }],
  analyst:          [{ slug: 'clawhub-dashboard-greek-accounting', name: 'Analytics Dashboard', reason: 'Financial dashboard' }, { slug: 'clawhub-financial-data', name: 'Financial Data', reason: 'Financial data tools' }, { slug: 'clawhub-client-dashboard', name: 'Client Dashboard', reason: 'Client analytics' }, { slug: 'clawhub-aisa-financial-data', name: 'AI Financial Data', reason: 'AI financial data' }],
  defi:             [{ slug: 'gh-awesome-stacks-chain', name: 'DeFi Stacks', reason: 'DeFi stack guide' }, { slug: 'clawhub-crypto-defi', name: 'Crypto DeFi', reason: 'Crypto DeFi tools' }, { slug: 'gh-hawk', name: 'Hawk', reason: 'On-chain monitoring' }, { slug: 'crypto-defi', name: 'DeFi Assistant', reason: 'DeFi assistant' }],
  'real-estate':    [{ slug: 'npv', name: 'NPV Calculator', reason: 'Property valuation' }, { slug: 'monte-carlo', name: 'Monte Carlo', reason: 'ROI simulation' }, { slug: 'excel-formula', name: 'Excel Formula', reason: 'Mortgage modeling' }, { slug: 'open-house-video-maker', name: 'Property Analyzer', reason: 'Market analysis' }],

  // Life
  traveler:         [{ slug: 'clawhub-travel-planning', name: 'Travel Planning', reason: 'Travel planning' }, { slug: 'clawhub-aerobase-travel-hotels', name: 'Travel Hotels', reason: 'Hotels & flights' }, { slug: 'gh-12bay-vn', name: 'Travel Guide', reason: 'Destination guide' }, { slug: 'translator-pro', name: 'Translator Pro', reason: 'Communicate anywhere' }],
  cook:             [{ slug: 'gh-meal-mate', name: 'Meal Mate', reason: 'Meal planning' }, { slug: 'clawhub-cook-from-scratch', name: 'Cook from Scratch', reason: 'Cook from scratch' }, { slug: 'clawhub-paprika', name: 'Paprika', reason: 'Recipe manager' }, { slug: 'mealplan', name: 'Meal Plan', reason: 'Weekly meal plan' }],
  fitness:          [{ slug: 'fitness-skill', name: 'Workout Planner', reason: 'Personalized training' }, { slug: 'healthy-eating', name: 'Nutrition Analyzer', reason: 'Diet tracking' }, { slug: 'flashcards', name: 'Flashcard Maker', reason: 'Learn exercise form' }],
  gamer:            [{ slug: 'cultivation-chronicle-cn', name: 'Game Guide', reason: 'Walkthroughs & tips' }, { slug: 'game-cog', name: 'Game Cog', reason: 'Strategy tools' }, { slug: 'code-generator', name: 'Code Generator', reason: 'Mod scripting' }],
  'language-learner':[{ slug: 'clawhub-jpeng-ai-grammar-checker', name: 'Grammar Checker', reason: 'Grammar checker' }, { slug: 'lobehub-grammar-corrector', name: 'Grammar Corrector', reason: 'Grammar correction' }, { slug: 'clawhub-grammar', name: 'Grammar AI', reason: 'Grammar assistant' }, { slug: 'grammar-check', name: 'Grammar Check', reason: 'Grammar & style check' }],
  parent:           [{ slug: 'story-teller', name: 'Story Teller', reason: 'Bedtime stories' }, { slug: 'bedtime-radio', name: 'Bedtime Radio', reason: 'Kids audio stories' }, { slug: 'flashcards', name: 'Flashcard Maker', reason: 'Kids learning' }, { slug: 'cooking-recipe', name: 'Recipe Generator', reason: 'Family meals' }],
  'job-seeker':     [{ slug: 'resume-cv-builder', name: 'Resume Builder', reason: 'Stand out to recruiters' }, { slug: 'interview-simulator', name: 'Interview Coach', reason: 'Practice & improve' }, { slug: 'cold-email-writer', name: 'Cold Email Writer', reason: 'Reach out to companies' }, { slug: 'translator-pro', name: 'Translator Pro', reason: 'International jobs' }],
}

export default function RoleSelector({ onRoleChange }: { onRoleChange?: (role: string | null) => void }) {
  const [cat, setCat] = useState<string | null>(null)
  const [role, setRole] = useState<string | null>(null)

  const handleRoleSelect = (r: string) => {
    const newRole = role === r ? null : r
    setRole(newRole)
    onRoleChange?.(newRole)
  }

  const handleCatSelect = (c: string) => {
    setCat(cat === c ? null : c)
    setRole(null)
    onRoleChange?.(null)
  }

  const selectedCat = CATEGORIES.find(c => c.id === cat)
  const skills = role ? SKILL_PACKS[role] : null

  return (
    <div>
      {/* Layer 1: Big categories */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 10, marginBottom: 24 }}>
        {CATEGORIES.map(c => (
          <button key={c.id} onClick={() => handleCatSelect(c.id)}
            style={{
              padding: '18px 8px', borderRadius: 14, cursor: 'pointer', textAlign: 'center',
              background: cat === c.id ? 'linear-gradient(135deg,#667eea22,#00d4ff22)' : '#0f0f23',
              border: cat === c.id ? '1px solid #667eea' : '1px solid #1a1a3e',
              transition: 'all .2s', color: cat === c.id ? '#e0e0e0' : '#aaa',
            }}>
            <div style={{ fontSize: '1.6em', marginBottom: 6 }}>{c.icon}</div>
            <div style={{ fontWeight: 700, fontSize: '.85em' }}>{c.label}</div>
          </button>
        ))}
      </div>

      {/* Layer 2: Roles within category */}
      {selectedCat && (
        <div style={{ marginBottom: 28, padding: '20px', background: '#0a0a1a', borderRadius: 14, border: '1px solid #1a1a3e' }}>
          <div style={{ color: '#555', fontSize: '.8em', marginBottom: 14, textTransform: 'uppercase', letterSpacing: 1 }}>
            I am a...
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {selectedCat.roles.map(r => (
              <button key={r.id} onClick={() => handleRoleSelect(r.id)}
                style={{
                  padding: '8px 16px', borderRadius: 20, cursor: 'pointer',
                  background: role === r.id ? 'linear-gradient(135deg,#667eea,#00d4ff)' : '#111128',
                  border: role === r.id ? '1px solid transparent' : '1px solid #1a1a3e',
                  color: role === r.id ? '#fff' : '#aaa',
                  fontSize: '.88em', fontWeight: role === r.id ? 700 : 400,
                  transition: 'all .15s',
                }}>
                {r.icon} {r.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Skill pack result */}
      {skills && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <div style={{ color: '#888', fontSize: '.82em', textTransform: 'uppercase', letterSpacing: 1 }}>
              Your Starter Pack
            </div>
            <a href={role ? `/skills?cat=${ROLE_TAG[role] || 'productivity'}` : '/skills'} style={{ color: '#667eea', fontSize: '.82em', textDecoration: 'none' }}>
              See all {role || ''} skills →
            </a>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {skills.map((s, i) => (
              <a key={s.slug} href={`/skill/${s.slug}`} style={{
                display: 'flex', alignItems: 'center', gap: 14, padding: '12px 16px',
                background: '#0f0f23', border: '1px solid #1a1a3e', borderRadius: 10,
                textDecoration: 'none',
              }}>
                <div style={{
                  width: 24, height: 24, borderRadius: '50%', flexShrink: 0,
                  background: 'linear-gradient(135deg,#667eea,#00d4ff)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '.75em', fontWeight: 800, color: '#fff',
                }}>{i + 1}</div>
                <div style={{ flex: 1 }}>
                  <span style={{ fontWeight: 600, color: '#e0e0e0', fontSize: '.92em' }}>{s.name}</span>
                  <span style={{ color: '#555', fontSize: '.82em', marginLeft: 8 }}>{s.reason}</span>
                </div>
                <span style={{ color: '#333' }}>→</span>
              </a>
            ))}
          </div>
        </div>
      )}

      {!cat && (
        <p style={{ textAlign: 'center', color: '#333', fontSize: '.88em', margin: 0 }}></p>
      )}
      {cat && !role && (
        <p style={{ textAlign: 'center', color: '#333', fontSize: '.88em', margin: 0 }}>
          ↑ Now pick your role
        </p>
      )}
    </div>
  )
}

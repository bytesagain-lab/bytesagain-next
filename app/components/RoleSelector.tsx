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
  developer:        [{ slug: 'autonomous-code-review', name: 'Code Review AI', reason: 'AI-powered code review' }, { slug: 'git-assist', name: 'Git Assist', reason: 'Git workflow automation' }, { slug: 'code-review-automation', name: 'Code Review Automation', reason: 'Automate PR reviews' }, { slug: 'legend-git-helper', name: 'Git Helper', reason: 'Git commands helper' }],
  devops:           [{ slug: 'server-watchdog', name: 'Server Watchdog', reason: 'Server uptime monitoring' }, { slug: 'ci-cd-compliance', name: 'CI/CD Compliance', reason: 'CI/CD pipeline checks' }, { slug: 'ssh-server-watchdog', name: 'SSH Watchdog', reason: 'SSH server monitor' }, { slug: 'docker-lwops-deployer', name: 'Docker Deployer', reason: 'Docker deployment' }],
  designer:         [{ slug: 'ui-prototype-generator', name: 'UI Prototype', reason: 'UI prototype generator' }, { slug: 'ui-ux-pro-max', name: 'UI/UX Pro Max', reason: 'UI/UX Pro Max' }, { slug: 'ui-ux-pro-max-0-1-0', name: 'UI/UX Design System', reason: 'UI/UX design system' }, { slug: 'figma-to-static', name: 'Figma to Static', reason: 'Figma to static' }],
  product:          [{ slug: 'prd-skill2026', name: 'PRD Writer 2026', reason: 'PRD writing assistant' }, { slug: 'prd-writer', name: 'PRD Writer', reason: 'Product requirements doc' }, { slug: 'prd', name: 'PRD Generator', reason: 'PRD generator' }, { slug: 'prd-skill', name: 'Product Spec Writer', reason: 'Product spec writer' }],
  marketer:         [{ slug: 'brand-voice', name: 'Brand Voice', reason: 'Brand voice consistency' }, { slug: 'afrexai-copywriting-mastery', name: 'Copywriting Mastery', reason: 'Copywriting mastery' }, { slug: 'ad-creative-brief-generator', name: 'Ad Creative Brief', reason: 'Ad creative briefs' }, { slug: 'content-agency', name: 'Content Agency AI', reason: 'Content at scale' }],
  seo:              [{ slug: 'ai-seo-optimizer-pro', name: 'AI SEO Optimizer', reason: 'AI SEO optimizer' }, { slug: 'wordpress-seo-autopilot', name: 'WP SEO Autopilot', reason: 'WordPress SEO auto' }, { slug: 'wacai-zhishudashi-baidu-ranking', name: 'Baidu Ranking Tool', reason: 'Baidu ranking tool' }, { slug: 'douyin-keyword-search', name: 'Keyword Search', reason: 'Keyword research' }],
  sales:            [{ slug: 'cold-outreach', name: 'Cold Outreach', reason: 'Cold outreach sequences' }, { slug: 'cold-email-personalization', name: 'Cold Email Pro', reason: 'Personalized cold email' }, { slug: 'gh-cold-mail-by-domore-ai', name: 'Cold Mail AI', reason: 'AI cold email writer' }, { slug: 'cold-email-engine', name: 'Cold Email Engine', reason: 'Cold email engine' }],
  hr:               [{ slug: 'jd-writer', name: 'JD Writer', reason: 'Job description writer' }, { slug: 'jd-writer', name: 'JD Generator', reason: 'JD generator' }, { slug: 'writing-assistant', name: 'Writing Assistant', reason: 'HR writing assistant' }, { slug: 'resume-writing', name: 'Resume Writing', reason: 'Resume screening' }],
  legal:            [{ slug: 'contract-review-cn', name: 'Contract Review', reason: 'Contract review' }, { slug: 'compl', name: 'Compliance AI', reason: 'Compliance check' }, { slug: 'compliance-review', name: 'Compliance Review', reason: 'Compliance review' }, { slug: 'coi-insurance-compliance-tracker', name: 'Insurance Compliance', reason: 'Insurance compliance' }],
  finance:          [{ slug: 'excel-formula', name: 'Excel Formula', reason: 'Financial modeling' }, { slug: 'npv', name: 'NPV Calculator', reason: 'Project valuation' }, { slug: 'monte-carlo', name: 'Monte Carlo', reason: 'Risk simulation' }, { slug: 'invoice-generator', name: 'Invoice Generator', reason: 'Billing automation' }],
  ecommerce:        [{ slug: 'ecommerce-assistant', name: 'Ecommerce Assistant', reason: 'Ecommerce assistant' }, { slug: 'product-launch-strategy', name: 'Product Launch Strategy', reason: 'Product launch strategy' }, { slug: '1688-sourcing', name: '1688 Sourcing', reason: 'Sourcing & procurement' }, { slug: 'amazon-listing-images', name: 'Amazon Listing', reason: 'Amazon listing' }],
  freelancer:       [{ slug: 'freelance-proposal-writer-lvjunjie', name: 'Proposal Writer', reason: 'Proposal writer' }, { slug: 'invoiceforge-api', name: 'InvoiceForge', reason: 'Invoice generator' }, { slug: 'ai-freelance-helper', name: 'Freelance Helper', reason: 'Freelance AI helper' }, { slug: 'freelancer-os', name: 'Freelancer OS', reason: 'Freelancer OS' }],
  founder:          [{ slug: 'startup-0-to-1-workflow', name: 'Startup 0-to-1', reason: '0-to-1 workflow' }, { slug: 'afrexai-startup-fundraising', name: 'Fundraising Engine', reason: 'Fundraising AI' }, { slug: 'afrexai-pitch-deck-reviewer', name: 'Pitch Deck Reviewer', reason: 'Pitch deck reviewer' }, { slug: 'startup-launch', name: 'Startup Launch', reason: 'Startup launch' }],
  consultant:       [{ slug: 'consulting', name: 'Consulting AI', reason: 'Consulting AI' }, { slug: 'afrexai-presentation-mastery', name: 'Presentation Mastery', reason: 'Presentation mastery' }, { slug: 'cro-advisor', name: 'CRO Advisor', reason: 'CRO advisor' }, { slug: 'uplo-consulting', name: 'Uplo Consulting', reason: 'Consulting tools' }],
  'customer-support':[{ slug: 'ticket-monitor-ichinosuke', name: 'Ticket Monitor', reason: 'Track and manage support tickets automatically' }, { slug: 'translator-pro', name: 'Translator Pro', reason: 'Handle multi-language customer inquiries' }, { slug: 'task-planner', name: 'Task Planner', reason: 'Organize support workflows and priorities' }, { slug: 'email-automation', name: 'Email Automation', reason: 'Auto-respond and route customer emails' }],

  // Create
  blogger:          [{ slug: 'ai-seo-writer', name: 'AI SEO Writer', reason: 'SEO article writer' }, { slug: 'afrexai-seo-writer', name: 'SEO Writer Pro', reason: 'AI SEO content' }, { slug: 'seo-content-writer', name: 'SEO Content Writer', reason: 'Blog SEO writer' }, { slug: 'wp-article-publisher', name: 'WP Publisher', reason: 'WordPress publisher' }],
  youtuber:         [{ slug: 'youtube-content-manager-intl', name: 'YouTube Manager', reason: 'YouTube content manager' }, { slug: 'ytb-transcript', name: 'YT Transcript', reason: 'Transcript & summary' }, { slug: 'linkedin-video-creator', name: 'Video Creator', reason: 'Video content creator' }, { slug: 'transcript', name: 'Transcript AI', reason: 'Auto transcription' }],
  podcaster:        [{ slug: 'podcast-notes', name: 'Podcast Notes', reason: 'Podcast show notes' }, { slug: 'book-summary', name: 'Book Summary', reason: 'Episode research' }, { slug: 'podcast-notes', name: 'Podcast Notes AI', reason: 'Auto show notes' }, { slug: 'speech-notes', name: 'Speech Notes', reason: 'Speech to notes' }],
  social:           [{ slug: 'content-calendar', name: 'Content Calendar', reason: 'Content calendar' }, { slug: 'twitter-thread-creation', name: 'Twitter Threads', reason: 'Twitter thread writer' }, { slug: 'instagram-caption-scraper', name: 'Instagram Captions', reason: 'Caption generator' }, { slug: 'bytesagain-x-algorithm-guide', name: 'X Algorithm Guide', reason: '2026 X algorithm rules, tweet auditor & AI draft generator' }],
  newsletter:       [{ slug: 'newsletter-writer', name: 'Newsletter Writer', reason: 'Newsletter writing' }, { slug: 'newsletter-writer', name: 'Newsletter AI', reason: 'AI newsletter tool' }, { slug: 'newsletter', name: 'Newsletter Generator', reason: 'Issue generator' }, { slug: 'newsletter-signup-generator', name: 'Signup Generator', reason: 'Grow subscribers' }],
  'video-editor':   [{ slug: 'nemo-subtitle', name: 'Nemo Subtitle', reason: 'Auto-generate accurate subtitles for videos' }, { slug: 'video-toolbox', name: 'Video Toolbox', reason: 'All-in-one video editing and processing tools' }, { slug: 'bilibili-video-transcribe-summary', name: 'Video Transcribe', reason: 'Transcribe and summarize video content' }, { slug: 'caption', name: 'Caption Generator', reason: 'Generate engaging captions for social media videos' }, { slug: 'subtitle-translator', name: 'Subtitle Translator', reason: 'Translate subtitles into multiple languages' }],
  photographer:     [{ slug: 'ai-image-editor-ab2n-0330', name: 'AI Image Editor', reason: 'Edit & enhance photos' }, { slug: 'image-generation', name: 'AI Image Generation', reason: 'AI image generation' }, { slug: 'yearbook-photo-skill', name: 'Yearbook Photo', reason: 'Photo style tool' }, { slug: 'image-generation-zhouli', name: 'Image Generation', reason: 'Creative image AI' }],
  musician:         [{ slug: 'audio-mastering-cli', name: 'Audio Mastering', reason: 'Audio mastering' }, { slug: 'mix', name: 'Mix', reason: 'Mix & produce' }, { slug: 'audio', name: 'Audio Tools', reason: 'Audio tools' }, { slug: 'lobehub-letrista-internacional', name: 'Lyrics Writer', reason: 'Lyrics writing' }],
  'game-dev':       [{ slug: 'code-generator', name: 'Code Generator', reason: 'Generate game logic and scripts' }, { slug: 'senseaudio-game-npc-director', name: 'NPC Director', reason: 'Create dynamic NPC dialogue and behavior' }, { slug: 'story-writer', name: 'Story Writer', reason: 'Write compelling game narratives and lore' }, { slug: 'english-game', name: 'English Game', reason: 'Build language-learning game mechanics' }],
  creator:          [{ slug: 'cross-platform-recut-planner', name: 'Recut Planner', reason: 'Multi-platform repurpose' }, { slug: 'ad-creative-brief-generator', name: 'Creative Brief', reason: 'Ad creative briefs' }, { slug: 'gh-creative-bloq', name: 'Creative Bloq', reason: 'Creative inspiration' }, { slug: 'video-multi-publish', name: 'Multi-Publish', reason: 'Video multi-publish' }],

  // Learn
  student:          [{ slug: 'anki', name: 'Anki Flashcards', reason: 'Active recall' }, { slug: 'flash-forge', name: 'FlashForge', reason: 'AI flashcard generator' }, { slug: 'studying', name: 'Studying AI', reason: 'Study assistant' }, { slug: 'gh-examor', name: 'Examor', reason: 'Exam practice' }],
  'self-taught':    [{ slug: 'study-plan', name: 'Study Plan', reason: 'Build a personalized learning roadmap' }, { slug: 'note-taker', name: 'Note Taker', reason: 'Capture and organize what you learn' }, { slug: 'doc-summarize-pro', name: 'Doc Summarizer', reason: 'Summarize books, articles and PDFs fast' }, { slug: 'trivia-quiz', name: 'Trivia Quiz', reason: 'Test yourself with AI-generated quizzes' }, { slug: 'translator-pro', name: 'Translator Pro', reason: 'Learn from content in any language' }],
  researcher:       [{ slug: 'literature-review-2', name: 'Literature Review', reason: 'Literature review' }, { slug: 'scholarsearch', name: 'Scholar Search', reason: 'Scholar search' }, { slug: 'academic-survey-self-improve', name: 'Academic Survey', reason: 'Academic survey' }, { slug: 'aminer-academic-search', name: 'AMiner Search', reason: 'AMiner search' }],
  teacher:          [{ slug: 'afrexai-learning-engine', name: 'Learning Engine', reason: 'Skill acquisition AI' }, { slug: 'learning-loop-skill', name: 'Learning Loop', reason: 'GEARS learning system' }, { slug: 'davidme6-self-learning', name: 'Self Learning', reason: 'Self-paced learning' }, { slug: 'dapianke', name: 'Dapianke', reason: 'Teaching tools' }],
  'data-scientist': [{ slug: 'system-data-intelligence-skill', name: 'Data Intelligence', reason: 'End-to-end data analysis and reporting' }, { slug: 'chart-py-generator', name: 'Chart Generator', reason: 'Generate Python charts from data' }, { slug: 'data-analysis', name: 'Data Analysis', reason: 'Statistical analysis and insight extraction' }, { slug: 'chartmaker', name: 'Chart Maker', reason: 'Create professional charts for presentations' }],
  academic:         [{ slug: 'lobehub-academic-writing-assistant', name: 'Academic Writing', reason: 'Academic writing' }, { slug: 'research-paper-writer', name: 'Research Paper AI', reason: 'Research paper writer' }, { slug: 'pr-review-expert', name: 'Paper Reviewer', reason: 'Paper review expert' }, { slug: 'lobehub-academic-revision-specialist', name: 'Paper Revision', reason: 'Paper revision' }],
  journalist:       [{ slug: 'story-writer', name: 'Story Writer', reason: 'Articles & interviews' }, { slug: 'fact-checker', name: 'Fact Checker', reason: 'Verify claims' }, { slug: 'translator-pro', name: 'Translator Pro', reason: 'Foreign sources' }, { slug: 'task-planner', name: 'Task Planner', reason: 'Story pipeline' }],

  // Invest
  trader:           [{ slug: 'trading-signals-pro', name: 'Trading Signals', reason: 'Trading signals' }, { slug: 'gh-coindera', name: 'Coindera', reason: 'Crypto price alerts' }, { slug: 'trading-research', name: 'Trading Research', reason: 'Market research' }, { slug: 'market-structure-scan', name: 'Market Structure', reason: 'Market structure scan' }],
  investor:         [{ slug: 'portfolio-manager', name: 'Portfolio Manager', reason: 'Portfolio manager' }, { slug: 'afrexai-portfolio-risk', name: 'Portfolio Risk', reason: 'Portfolio risk analysis' }, { slug: 'investment-portfolio', name: 'Investment Portfolio', reason: 'Investment tracker' }, { slug: 'a-share-stock-dossier', name: 'Stock Dossier', reason: 'Stock analysis' }],
  analyst:          [{ slug: 'dashboard-greek-accounting', name: 'Analytics Dashboard', reason: 'Financial dashboard' }, { slug: 'financial-data', name: 'Financial Data', reason: 'Financial data tools' }, { slug: 'client-dashboard', name: 'Client Dashboard', reason: 'Client analytics' }, { slug: 'aisa-financial-data', name: 'AI Financial Data', reason: 'AI financial data' }],
  defi:             [{ slug: 'gh-awesome-stacks-chain', name: 'DeFi Stacks', reason: 'DeFi stack guide' }, { slug: 'crypto-defi', name: 'Crypto DeFi', reason: 'Crypto DeFi tools' }, { slug: 'gh-hawk', name: 'Hawk', reason: 'On-chain monitoring' }, { slug: 'crypto-defi', name: 'DeFi Assistant', reason: 'DeFi assistant' }],
  'real-estate':    [{ slug: 'mortgage-calculator', name: 'Mortgage Calculator', reason: 'Calculate mortgage payments and affordability' }, { slug: 'investment-portfolio', name: 'Investment Portfolio', reason: 'Track real estate investment performance' }, { slug: 'excel-formula', name: 'Excel Formula', reason: 'Build property valuation spreadsheets' }, { slug: 'report-generator', name: 'Report Generator', reason: 'Generate property analysis reports' }],

  // Life
  traveler:         [{ slug: 'travel-planning', name: 'Travel Planning', reason: 'Travel planning' }, { slug: 'aerobase-travel-hotels', name: 'Travel Hotels', reason: 'Hotels & flights' }, { slug: 'gh-12bay-vn', name: 'Travel Guide', reason: 'Destination guide' }, { slug: 'translator-pro', name: 'Translator Pro', reason: 'Communicate anywhere' }],
  cook:             [{ slug: 'gh-meal-mate', name: 'Meal Mate', reason: 'Meal planning' }, { slug: 'cook-from-scratch', name: 'Cook from Scratch', reason: 'Cook from scratch' }, { slug: 'paprika', name: 'Paprika', reason: 'Recipe manager' }, { slug: 'mealplan', name: 'Meal Plan', reason: 'Weekly meal plan' }],
  fitness:          [{ slug: 'fitness-skill', name: 'Fitness Manager', reason: 'Workout manager' }, { slug: 'lofy-fitness', name: 'Lofy Fitness', reason: 'Fitness AI coach' }, { slug: 'runstr-fitness', name: 'RUNSTR Fitness', reason: 'Running tracker' }, { slug: 'nutrigenomics', name: 'Nutrigenomics', reason: 'Nutrition & diet' }],
  gamer:            [{ slug: 'gh-video-game-almanac', name: 'Video Game Almanac', reason: 'Game guide & almanac' }, { slug: 'gh-game-qa-strategist', name: 'Game QA Strategist', reason: 'Game strategy' }, { slug: 'code-generator', name: 'Code Generator', reason: 'Mod scripting' }, { slug: 'lobehub-unity-maestro', name: 'Unity Maestro', reason: 'Unity game dev' }],
  'language-learner':[{ slug: 'translator-pro', name: 'Translator Pro', reason: 'Translate between languages instantly with high accuracy' }, { slug: 'flashcard', name: 'Flashcard', reason: 'Build vocabulary with smart flashcards and spaced repetition' }, { slug: 'subtitle-translator', name: 'Subtitle Translator', reason: 'Learn languages through translated video subtitles' }, { slug: 'trivia-quiz', name: 'Trivia Quiz', reason: 'Test and reinforce your language knowledge with AI quizzes' }, { slug: 'cet4word300', name: 'CET-4 Vocabulary', reason: 'Master core English vocabulary for exams and daily use' }],
  parent:           [{ slug: 'gh-story-buddy', name: 'Story Buddy', reason: 'Interactive kids stories' }, { slug: 'gh-bedtime-stories', name: 'Bedtime Stories', reason: 'Kids bedtime stories' }, { slug: 'anki', name: 'Anki Flashcards', reason: 'Kids learning' }, { slug: 'translator-pro', name: 'Translator Pro', reason: 'Bilingual family' }],
  'job-seeker':     [{ slug: 'interview-analysis', name: 'Interview Analysis', reason: 'Analyze and prepare for job interviews with AI' }, { slug: 'ai-interview-system', name: 'AI Interview System', reason: 'Practice interviews with AI coaching' }, { slug: 'resume-writer', name: 'Resume Writer', reason: 'Create compelling resumes and cover letters' }, { slug: 'translator-pro', name: 'Translator Pro', reason: 'Translate job applications for international roles' }],
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

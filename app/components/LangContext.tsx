'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

type Lang = 'en' | 'zh'

const LangContext = createContext<{ lang: Lang; setLang: (l: Lang) => void }>({
  lang: 'en',
  setLang: () => {},
})

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('en')

  useEffect(() => {
    // 优先 URL 参数，其次 localStorage，其次浏览器语言
    const params = new URLSearchParams(window.location.search)
    const urlLang = params.get('lang')
    const stored = localStorage.getItem('ba-lang')
    const browserZh = navigator.language.startsWith('zh')

    if (urlLang === 'zh' || urlLang === 'en') {
      setLangState(urlLang)
    } else if (stored === 'zh' || stored === 'en') {
      setLangState(stored as Lang)
    } else if (browserZh) {
      setLangState('zh')
    }
  }, [])

  const setLang = (l: Lang) => {
    setLangState(l)
    localStorage.setItem('ba-lang', l)
  }

  return <LangContext.Provider value={{ lang, setLang }}>{children}</LangContext.Provider>
}

export function useLang() {
  return useContext(LangContext)
}

// 所有文案
export const T = {
  en: {
    nav_articles: 'Articles',
    nav_skills: 'Skills',
    nav_cases: 'Cases',
    hero_title: 'Find Your AI Skill Stack',
    hero_sub: 'Discover the best AI agent skills from ClawHub, GitHub, LobeHub, MCP and more.',
    search_placeholder: 'Search skills... e.g. "resume writer", "code review"',
    skills_count_label: 'skills indexed',
    role_prompt: 'What do you do?',
    see_all: 'See all skills →',
    source_clawhub: 'ClawHub',
    source_github: 'GitHub',
    source_mcp: 'MCP',
    source_lobehub: 'LobeHub',
    source_dify: 'Dify',
    view_on: 'View on',
    safety_disclaimer: '⚠️ BytesAgain does not review or verify third-party content. Proceed at your own risk.',
    footer_disclaimer: 'BytesAgain is an independent skill directory. We index and link to third-party content (ClawHub, GitHub, LobeHub, Dify, etc.) for informational purposes only. All trademarks, skill names, and content are the property of their respective owners. BytesAgain does not claim ownership of any indexed content.',
    footer_explore: 'Explore',
    footer_company: 'Company',
    footer_about: 'About',
    footer_contact: 'Contact',
    footer_privacy: 'Privacy Policy',
    footer_terms: 'Terms',
    footer_feedback: 'Feedback',
    all_sources: 'All Sources',
    filter_by: 'Filter',
    sort_by: 'Sort',
    downloads: 'downloads',
    no_results: 'No results found. Try a different keyword.',
    related_skills: 'Related Skills',
    show_more: 'Show more ↓',
  },
  zh: {
    nav_articles: '文章',
    nav_skills: 'Skills',
    nav_cases: '使用场景',
    hero_title: '找到你的 AI Skill 组合',
    hero_sub: '收录 ClawHub、GitHub、LobeHub、MCP 等平台的优质 AI 智能体 Skill。',
    search_placeholder: '搜索 skill... 例如 "简历优化"、"代码审查"',
    skills_count_label: '个 skill 已收录',
    role_prompt: '你是做什么的？',
    see_all: '查看全部 →',
    source_clawhub: 'ClawHub',
    source_github: 'GitHub',
    source_mcp: 'MCP',
    source_lobehub: 'LobeHub',
    source_dify: 'Dify',
    view_on: '在以下平台查看',
    safety_disclaimer: '⚠️ BytesAgain 不对第三方内容进行审核或验证，请自行评估风险后使用。',
    footer_disclaimer: 'BytesAgain 是独立的 Skill 导购目录，仅收录并链接第三方内容（ClawHub、GitHub、LobeHub、Dify 等），所有版权归原作者所有。BytesAgain 不主张对任何收录内容的所有权。',
    footer_explore: '探索',
    footer_company: '关于',
    footer_about: '关于我们',
    footer_contact: '联系我们',
    footer_privacy: '隐私政策',
    footer_terms: '服务条款',
    footer_feedback: '反馈',
    all_sources: '全部来源',
    filter_by: '筛选',
    sort_by: '排序',
    downloads: '次安装',
    no_results: '没有找到结果，换个关键词试试。',
    related_skills: '相关 Skill',
    show_more: '显示更多 ↓',
  },
}

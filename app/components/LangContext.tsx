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
    // ── Requests Page ──
    req_title: 'Skill Request Wall',
    req_sub: 'Post what AI skill you need. The more specific, the easier for Creators to match.',
    req_publish: 'Post a Request',
    req_label_title: 'One-line Title',
    req_hint_title: 'e.g. Need a stock analysis skill',
    req_ph_title: 'Summarize your need in one line',
    req_label_desc: 'Detailed Description *',
    req_hint_desc: 'Min 10 chars. Be specific.',
    req_ph_desc: 'What features? What problem?\n\ne.g. I need a skill that does A-share technical analysis — candlestick patterns, MACD, RSI, with automatic buy/sell signals and daily report generation.',
    req_label_scene: 'Use Case',
    req_hint_scene: 'What workflow will this skill fit into?',
    req_ph_scene: 'e.g. Post-market analysis + trade plan generation',
    req_label_plat: 'Agent Platform',
    req_label_budget: 'Budget',
    req_hint_budget: 'Give Creators a price expectation',
    req_ph_budget: 'e.g. $50, negotiable, free preferred',
    req_label_contact: 'Contact (optional)',
    req_ph_contact: 'TG / Email (Creators will reach you here)',
    req_any_plat: 'Any platform',
    req_submit: 'Publish Request →',
    req_submitting: 'Publishing…',
    req_done: 'Request published!',
    req_empty: 'No requests yet. Be the first!',
    req_no_contact: 'No contact left',
    req_scene_prefix: '💡 Use case:',
    req_error_short: 'Description too short (min 10 chars)',
    req_loading: 'Loading…',

    // ── Creators Page ──
    cr_title: 'Creator Registration',
    cr_sub: 'Get listed on BytesAgain Creator Marketplace. No fees, no commission, no middleman.',
    cr_label_github: 'GitHub Username *',
    cr_hint_github: 'ClawHub uses GitHub login. We verify skill ownership via GitHub.',
    cr_ph_github: 'e.g. abdur-rahmaanj',
    cr_label_name: 'Display Name *',
    cr_label_contact_method: 'Contact Method *',
    cr_label_contact_value: 'Contact Detail *',
    cr_hint_contact: 'Buyers will reach you here',
    cr_ph_contact: '@yourhandle / your@email.com',
    cr_label_skills: 'Skills You Offer *',
    cr_hint_skills: 'List skill names, one per line',
    cr_ph_skills: 'e.g. shell, crypto-trading-bot, data-analysis',
    cr_label_pricing: 'Pricing',
    cr_hint_pricing: 'Give buyers a ballpark',
    cr_ph_pricing: 'e.g. $50/skill, $200/custom',
    cr_label_bio: 'Creator Bio',
    cr_ph_bio: 'Short intro to show your expertise (optional)',
    cr_submit: 'Submit Registration →',
    cr_submitting: 'Submitting…',
    cr_done_title: 'Registration Submitted!',
    cr_done_text: 'We will verify your GitHub account within 1-2 business days. Once approved, your skills will appear on the BytesAgain Creator Marketplace.',
    cr_back_home: '← Back to Home',
    cr_error: 'Submission failed',

    // ── existing ──
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
    // ── Requests Page ──
    req_title: 'Skill 需求墙',
    req_sub: '写下你需要的 AI Skill。描述得越具体，创作者越容易匹配。',
    req_publish: '发布需求',
    req_label_title: '一句话标题',
    req_hint_title: '如：需要股票技术分析 skill',
    req_ph_title: '简短概括你的需求',
    req_label_desc: '详细描述 *',
    req_hint_desc: '最少 10 个字，越具体越好',
    req_ph_desc: '需要什么功能？解决什么问题？\n\n例如：我需要一个分析 A 股技术指标的 skill，能看 K 线形态、MACD、RSI，最好还能自动标注买卖信号。',
    req_label_scene: '使用场景',
    req_hint_scene: '这个 skill 用在什么工作流里？',
    req_ph_scene: '如：每天收盘后分析 + 生成交易计划',
    req_label_plat: 'Agent 平台',
    req_label_budget: '预算',
    req_hint_budget: '让创作者知道你的预期价格',
    req_ph_budget: '如：$50, 议价, 免费最好',
    req_label_contact: '联系方式（选填）',
    req_ph_contact: 'TG / Email（创作者会通过这个联系你）',
    req_any_plat: '不限',
    req_submit: '发布需求 →',
    req_submitting: '发布中…',
    req_done: '需求已发布！',
    req_empty: '还没有需求。成为第一个发布的！',
    req_no_contact: '未留联系方式',
    req_scene_prefix: '💡 场景：',
    req_error_short: '需求描述太短（最少 10 个字）',
    req_loading: '加载中…',

    // ── Creators Page ──
    cr_title: '创作者登记',
    cr_sub: '登记后出现在 BytesAgain Creator 集市。不收费，不抽成，不碰交易。',
    cr_label_github: 'GitHub 用户名 *',
    cr_hint_github: 'ClawHub 用 GitHub 登录，这个用来核实你的 skill 所有权',
    cr_ph_github: '如：abdur-rahmaanj',
    cr_label_name: '展示名称 *',
    cr_label_contact_method: '联系方式 *',
    cr_label_contact_value: '联系方式详情 *',
    cr_hint_contact: '买家会通过这个联系你',
    cr_ph_contact: '@你的账号 / 邮箱',
    cr_label_skills: '你能提供的 Skill *',
    cr_hint_skills: '列出 skill 名称，一行一个',
    cr_ph_skills: '如：shell, crypto-trading-bot, data-analysis',
    cr_label_pricing: '定价',
    cr_hint_pricing: '让买家有个心理预期',
    cr_ph_pricing: '如：$50/个, $200/定制',
    cr_label_bio: '创作者介绍',
    cr_ph_bio: '简短介绍自己，展示专业度（选填）',
    cr_submit: '提交登记 →',
    cr_submitting: '提交中…',
    cr_done_title: '登记成功！',
    cr_done_text: '我们会在 1-2 个工作日内核实你的 GitHub 账号，通过后你的 Skill 会在 BytesAgain Creator 集市展示。',
    cr_back_home: '← 返回首页',
    cr_error: '提交失败',

    // ── existing ──
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

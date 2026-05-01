'use client'
import { useState, useRef, useEffect } from 'react'
import { USE_CASES } from '@/lib/use-cases'
import { useLang } from '@/app/components/LangContext'

// 意图关键词 → use case slug 映射
const INTENT_MAP: { keywords: string[]; slugs: string[] }[] = [
  { keywords: ['商业计划', '商业策划', '创业计划', '融资', '投资人', '路演', 'bp', '商业模式', 'pitch', '创业', '融资计划', 'ppt'], slugs: ['startup-founder', 'business-plan'] },
  { keywords: ['saas', '产品', '软件', '网站', '开发', 'app', '程序', '代码', '编程', 'web app', 'webapp', '做网站', '开发产品'], slugs: ['build-saas', 'developer-workflow'] },
  { keywords: ['招聘', '面试', '简历', '求职', '找工作', '跳槽', 'offer', '薪资', '工作', 'resume', 'cv', '投递', '内推'], slugs: ['job-hunting', 'hr-recruiting'] },
  { keywords: ['远程', '在家办公', '居家', 'wfh', '专注', '番茄', '任务管理', 'todo', '效率', '工作效率'], slugs: ['remote-work', 'project-manager'] },
  { keywords: ['项目管理', '甘特', '里程碑', '进度', '排期', '计划表', 'pmp', 'jira', 'sprint', '敏捷'], slugs: ['project-manager'] },
  { keywords: ['周报', '日报', '月报', '汇报', '写报告', '工作汇报', '工作总结', '总结报告', '述职', '周总结', '日总结', 'weekly report', 'daily report', '报告', '报表生成'], slugs: ['weekly-report', 'project-manager'] },
  { keywords: ['hr', '人力', '员工', '绩效', '入职', '离职', '劳动合同', '招人', '用人', 'onboarding'], slugs: ['hr-recruiting'] },
  { keywords: ['视频', 'youtube', 'b站', 'bilibili', '短视频', '剪辑', '脚本', '直播', 'vlog', '拍视频', '视频号'], slugs: ['video-creator', 'content-creator'] },
  { keywords: ['播客', 'podcast', '音频', '录音', '节目', '频道'], slugs: ['podcast-creator'] },
  { keywords: ['写作', '文章', '博客', 'blog', '小说', '故事', '内容', '文案', '营销文字', '种草', '公众号', '写文章', '写稿', '写邮件', '邮件回复', '商务邮件'], slugs: ['writer-author', 'content-creator'] },
  { keywords: ['seo', '搜索优化', '关键词', '排名', '收录', '爬虫', 'ai搜索', 'geo', '百度', 'google排名', '搜索引擎'], slugs: ['seo-geo'] },
  { keywords: ['营销', '推广', '广告', '邮件', '社媒', '社交', '获客', '引流', '投放', 'crm', '增长', '用户增长'], slugs: ['marketing-automation'] },
  { keywords: ['学编程', '学代码', '入门', '自学', 'python', 'javascript', 'java', '前端', '后端', '零基础', '学习编程'], slugs: ['learn-programming'] },
  { keywords: ['学语言', '英语', '日语', '法语', '翻译', '口语', '外语', '学英文', '学日语', 'duolingo', '语言学习'], slugs: ['language-learner'] },
  { keywords: ['学生', '作业', '论文', '考试', '课程', '大学', '研究生', '备考', '高考', '考研', '写论文'], slugs: ['student'] },
  { keywords: ['研究', '调研', '分析报告', '竞品', '行业报告', '市场调研', '数据分析', '可视化', '报表', '图表', '洞察'], slugs: ['researcher', 'data-analysis'] },
  { keywords: ['股票', 'a股', '美股', '港股', '基金', '炒股', '价值投资', '财报', '选股', '股市', '散户', '牛市'], slugs: ['stock-investor'] },
  { keywords: ['crypto', '加密', 'defi', '比特币', 'eth', '以太', '币', '链上', 'nft', 'web3', '数字货币', 'usdt', 'btc', '合约', 'dex', 'dao'], slugs: ['crypto-research'] },
  { keywords: ['理财', '记账', '预算', '存钱', '保险', '财务', '个人财富', '省钱', '资产', '投资理财', '基金定投'], slugs: ['personal-finance'] },
  { keywords: ['电商', '淘宝', '拼多多', '亚马逊', '独立站', '选品', '货', '店铺', 'shopify', '卖货', '跨境', '开店'], slugs: ['ecommerce'] },
  { keywords: ['旅游', '旅行', '出行', '机票', '酒店', '攻略', '签证', '行程', '自由行', '出国', '玩', '度假'], slugs: ['travel-planner'] },
  { keywords: ['健身', '减肥', '跑步', '健康', '营养', '饮食', '锻炼', '运动', '体重', '增肌', '瘦身', '卡路里'], slugs: ['health-fitness'] },
  { keywords: ['做饭', '烹饪', '食谱', '菜谱', '下厨', '厨房', '料理', '美食', '菜'], slugs: ['home-cooking'] },
  { keywords: ['智能家居', '家庭自动化', '家务', '装修', '家里', 'homeassistant', '智能', '自动化'], slugs: ['smart-home'] },
  { keywords: ['合同', '法律', '律师', '版权', '协议', '隐私政策', '合规', '诉讼', '法务', '法规', 'gdpr', '条款'], slugs: ['legal-documents'] },
  { keywords: ['excel', '表格', '数据', 'csv', 'sql', '数据库', '统计', '分析', '数据处理', 'pandas', 'tableau'], slugs: ['data-analysis'] },
  { keywords: ['自动化', 'automation', '脚本', 'shell', 'bash', 'python脚本', '定时任务', 'cron', '批处理', 'n8n', 'zapier', '工作流', '流程自动化'], slugs: ['workflow-automation', 'developer-workflow'] },
  { keywords: ['crm', '销售', '客户管理', '线索', '跟单', '销售漏斗', '商机', '客户跟进', '销售报告', 'deal', 'lead'], slugs: ['crm-sales'] },
  { keywords: ['客服', '工单', '售后', '投诉', '回复客户', '客户支持', 'support', 'helpdesk', '用户反馈', '退款', '退货'], slugs: ['customer-support'] },
  { keywords: ['数据库', 'sql', 'mysql', 'postgres', 'mongodb', '查询', '建表', '数据迁移', 'database', 'schema', '数据管道'], slugs: ['database-management'] },
  { keywords: ['写文章', '写文案', '写博客', '写内容', '内容创作', 'copywriting', '广告文案', '产品描述', '写作助手', '自媒体', '写稿'], slugs: ['content-writing', 'content-creator'] },
  { keywords: ['数据分析', '数据可视化', '做图表', 'excel', '表格分析', 'sql', '数据处理', '数据清洗', '报表', 'chart', 'dashboard'], slugs: ['data-analysis', 'database-management'] },
  { keywords: ['seo', '搜索引擎优化', '关键词', '流量', '排名', '谷歌排名', '百度排名', '增长', 'organic', 'keyword research'], slugs: ['seo-growth'] },
  { keywords: ['电商', '淘宝', '亚马逊', 'shopify', '产品上架', '店铺运营', '跨境电商', 'ecommerce', '选品', '卖货'], slugs: ['ecommerce-ops'] },
  { keywords: ['翻译', 'translate', '多语言', '本地化', 'localization', '字幕翻译', '文档翻译', '英译中', '中译英'], slugs: ['translation-localization'] },
  { keywords: ['健康', '健身', '减肥', '饮食', '食谱', '运动', '体重', '营养', 'fitness', 'health', 'workout', 'diet', 'meal'], slugs: ['health-wellness'] },
]

function matchUseCases(query: string) {
  const q = query.toLowerCase()
  const matched = new Set<string>()
  for (const { keywords, slugs } of INTENT_MAP) {
    if (keywords.some(k => q.includes(k))) {
      slugs.forEach(s => matched.add(s))
    }
  }
  if (matched.size === 0) return []
  return USE_CASES.filter(uc => matched.has(uc.slug)).slice(0, 6)
}

export default function IntentSearch() {
  const { lang } = useLang()
  const zh = lang === 'zh'
  const [query, setQuery] = useState('')
  const [mode, setMode] = useState<'skills' | 'usecase'>('skills')
  const [results, setResults] = useState<typeof USE_CASES>([])
  const [dailyUseCases, setDailyUseCases] = useState<any[]>([])
  const [dailySkills, setDailySkills] = useState<any[]>([])
  const [skillResults, setSkillResults] = useState<any[]>([])

  // Fetch daily recommendations on mount
  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const SB_URL = 'https://jfpeycpiyayrpjldppzq.supabase.co'
        const SB_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpmcGV5Y3BpeWF5cnBqbGRwcHpxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQyMzgxMTIsImV4cCI6MjA4OTgxNDExMn0.KnRmNBKeUPmJQz3m46uNx5kvBf_ZXBVWSUTXOLjW4Ps'
        // Fetch latest use cases with evaluation
        const ucRes = await fetch(`${SB_URL}/rest/v1/use_cases?select=slug,title,description,icon,skills,evaluation&skills=not.is.null&order=created_at.desc&limit=2`, {
          headers: { apikey: SB_KEY },
        })
        if (ucRes.ok) setDailyUseCases(await ucRes.json())
        // Fetch top skills (high downloads, is_ours)
        const skRes = await fetch(`${SB_URL}/rest/v1/skills?select=slug,name,description,downloads,category&is_ours=eq.true&order=downloads.desc&limit=2`, {
          headers: { apikey: SB_KEY },
        })
        if (skRes.ok) setDailySkills(await skRes.json())
      } catch {}
    }
    fetchRecommendations()
  }, [])
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const doSearch = async (q: string, m: 'skills' | 'usecase' = mode) => {
    if (!q.trim()) { setResults([]); setSkillResults([]); setSearched(false); return }
    setSearched(true)
    if (m === 'usecase') {
      const ucMatches = matchUseCases(q)
      setResults(ucMatches)
      setSkillResults([])
    } else {
      setResults([])
      setLoading(true)
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(q)}&limit=6`)
        const data = await res.json()
        setSkillResults(data.results || [])
      } catch { setSkillResults([]) }
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value
    setQuery(v)
    if (timer.current) clearTimeout(timer.current)
    timer.current = setTimeout(() => doSearch(v), 400)
  }

  const handleModeChange = (m: 'skills' | 'usecase') => {
    setMode(m)
    if (query.trim()) {
      // 切换 tab 时直接跳转到对应搜索页
      window.location.href = m === 'usecase'
        ? `/use-case?q=${encodeURIComponent(query)}`
        : `/skills?q=${encodeURIComponent(query)}`
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && query.trim()) {
      window.location.href = mode === 'usecase'
        ? `/use-case?q=${encodeURIComponent(query)}`
        : `/skills?q=${encodeURIComponent(query)}`
    }
  }

  const hasResults = results.length > 0 || skillResults.length > 0
  const defaultQueries = zh
    ? ['网站没流量怎么办', '优化商品 listing', '帮我做 SEO', '自动化工作流']
    : ['website has no traffic', 'optimize product listing', 'SEO agent workflow', 'automate my workflow']

  return (
    <div style={{ maxWidth: 860, margin: '0 auto', padding: '0 20px' }}>
      <style>{`
        .search-wrap { display: flex; flex-direction: column; gap: 10px; }
        .search-tabs { display: flex; gap: 8px; }
        @media (min-width: 600px) {
          .search-wrap { flex-direction: row; align-items: center; }
          .search-input-box { flex: 1; }
          .search-tabs { flex-shrink: 0; }
        }
      `}</style>
      <div className="search-wrap">
        <div className="search-input-box" style={{ position: 'relative' }}>
          <span style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', fontSize: '1.1em' }}>🔍</span>
          <input
            value={query}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder={zh ? "搜 skill 或使用场景，比如：帮我写周报 / automate email…" : "Search skills & use cases, e.g. write a report, automate email…"}
            style={{
              width: '100%', padding: '14px 16px 14px 44px',
              background: '#0f0f23', border: '1px solid #2a2a4e',
              borderRadius: 12, color: '#e0e0e0', fontSize: '1em',
              outline: 'none', boxSizing: 'border-box',
            }}
          />
        </div>
        <div className="search-tabs">
          <button
            onClick={() => handleModeChange('skills')}
            style={{
              flex: 1, padding: '13px 18px', borderRadius: 10, border: 'none', cursor: 'pointer',
              fontWeight: 700, fontSize: '.85em',
              background: mode === 'skills' ? 'linear-gradient(135deg,#667eea,#6366f1)' : '#1a1a3e',
              color: mode === 'skills' ? '#fff' : '#888',
              transition: 'all .15s', whiteSpace: 'nowrap',
            }}
          >⚡ Skills</button>
          <button
            onClick={() => handleModeChange('usecase')}
            style={{
              flex: 1, padding: '13px 18px', borderRadius: 10, border: 'none', cursor: 'pointer',
              fontWeight: 700, fontSize: '.85em',
              background: mode === 'usecase' ? 'linear-gradient(135deg,#34d399,#0ea5e9)' : '#1a1a3e',
              color: mode === 'usecase' ? '#fff' : '#888',
              transition: 'all .15s', whiteSpace: 'nowrap',
            }}
          >🗺️ Use Cases</button>
        </div>
      </div>

      {/* 空状态：用户还没输入时，也要给明确入口，不能留白 */}
      {!searched && (
        <div style={{ marginTop: 14, background: 'linear-gradient(180deg,#0a0a1a,#080817)', border: '1px solid #1a1a3e', borderRadius: 16, overflow: 'hidden', textAlign: 'left' }}>
          <div style={{ padding: '16px 18px 10px' }}>
            <div style={{ color: '#e5e7eb', fontWeight: 800, fontSize: '.95em', marginBottom: 5 }}>
              {zh ? '不知道搜什么？从你的 AI 哪里不满意开始。' : 'Not sure what to search? Start from what your AI failed to do.'}
            </div>
            <div style={{ color: '#64748b', fontSize: '.84em', lineHeight: 1.55 }}>
              {zh ? 'BytesAgain 会把问题拆成 Work Hub → Use Case → Skill，推荐正确 skill 并告诉你怎么安装使用。' : 'BytesAgain turns a problem into a Work Hub → Use Case → Skill path, then shows the right skills and how to use them.'}
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(190px,1fr))', gap: 10, padding: '0 14px 14px' }}>
            {/* 今日推荐 Use Case */}
            {dailyUseCases.length > 0 && dailyUseCases.map(uc => (
              <a key={uc.slug} href={`/use-case/${uc.slug}`} style={{ display: 'block', textDecoration: 'none', color: 'inherit', padding: 14, borderRadius: 13, background: 'linear-gradient(180deg, #0d2d1a, #101027)', border: '1px solid #34d39944' }}>
                <div style={{ fontSize: '1.3em', marginBottom: 4 }}>{uc.icon || '📊'}</div>
                <div style={{ fontSize: '.68em', color: '#34d399', fontWeight: 700, marginBottom: 4, textTransform: 'uppercase' }}>🔥 推荐 Use Case</div>
                <div style={{ color: '#f1f5f9', fontWeight: 800, fontSize: '.9em', marginBottom: 5 }}>{uc.title}</div>
                <div style={{ color: '#64748b', fontSize: '.78em', lineHeight: 1.45 }}>{uc.description?.slice(0, 70)}…</div>
                {uc.evaluation && <div style={{ fontSize: '.68em', color: '#86efac', marginTop: 6 }}>✅ 已评测 · {uc.evaluation.total_skills}个skill</div>}
              </a>
            ))}
            {/* 今日推荐 Skill */}
            {dailySkills.length > 0 && dailySkills.map(sk => (
              <a key={sk.slug} href={`/skill/${sk.slug}`} style={{ display: 'block', textDecoration: 'none', color: 'inherit', padding: 14, borderRadius: 13, background: 'linear-gradient(180deg, #1a1a3e, #101027)', border: '1px solid #667eea44' }}>
                <div style={{ fontSize: '1.3em', marginBottom: 4 }}>⚡</div>
                <div style={{ fontSize: '.68em', color: '#667eea', fontWeight: 700, marginBottom: 4, textTransform: 'uppercase' }}>⭐ 推荐 Skill</div>
                <div style={{ color: '#f1f5f9', fontWeight: 800, fontSize: '.9em', marginBottom: 5 }}>{sk.name}</div>
                <div style={{ color: '#64748b', fontSize: '.78em', lineHeight: 1.45 }}>{sk.description?.slice(0, 70)}…</div>
                {sk.downloads > 0 && <div style={{ fontSize: '.68em', color: '#555', marginTop: 6 }}>{sk.downloads >= 1000 ? `${(sk.downloads/1000).toFixed(1)}k dl` : `${sk.downloads} dl`}</div>}
              </a>
            ))}
          </div>
          <div style={{ padding: '0 14px 16px', display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {defaultQueries.map(q => (
              <button key={q} onClick={() => { setQuery(q); doSearch(q) }} style={{ padding: '7px 10px', borderRadius: 999, border: '1px solid #2a2a4e', background: '#0f0f23', color: '#a5b4fc', cursor: 'pointer', fontSize: '.78em', fontWeight: 700 }}>
                {q}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 结果面板 */}
      {searched && (
        <div style={{ marginTop: 12, background: '#0a0a1a', border: '1px solid #1a1a3e', borderRadius: 12, overflow: 'hidden' }}>
          {!hasResults && !loading && (
            <div style={{ padding: '20px 20px', color: '#888', textAlign: 'center', fontSize: '.9em' }}>
              <div style={{ marginBottom: 10 }}>No use cases found for &quot;{query}&quot;</div>
              <a
                href={`/skills?q=${encodeURIComponent(query)}`}
                style={{
                  display: 'inline-block', padding: '8px 20px',
                  background: 'linear-gradient(135deg,#667eea,#00d4ff)',
                  borderRadius: 8, color: '#fff', textDecoration: 'none',
                  fontWeight: 700, fontSize: '.88em',
                }}
              >
                ⚡ Search "{query}" in Skills →
              </a>
            </div>
          )}
          {results.length > 0 && (
            <div>
              <div style={{ padding: '10px 16px 6px', fontSize: '.72em', color: '#667eea', fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase' }}>
                📦 Matching Use Cases
              </div>
              {results.map(uc => (
                <a key={uc.slug} href={`/use-case/${uc.slug}`}
                  style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 16px', textDecoration: 'none', borderTop: '1px solid #111' }}>
                  <span style={{ fontSize: '1.4em' }}>{uc.icon}</span>
                  <div>
                    <div style={{ color: '#e0e0e0', fontWeight: 600, fontSize: '.9em' }}>{uc.title}</div>
                    <div style={{ color: '#555', fontSize: '.78em', marginTop: 2 }}>{uc.description.slice(0, 70)}…</div>
                  </div>
                </a>
              ))}
            </div>
          )}
          {skillResults.length > 0 && (
            <div>
              <div style={{ padding: '10px 16px 6px', fontSize: '.72em', color: '#00d4ff', fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', borderTop: results.length > 0 ? '1px solid #1a1a3e' : undefined }}>
                ⚡ Related Skills
              </div>
              {skillResults.slice(0, 5).map((sk: any) => (
                <a key={sk.slug} href={`/skill/${sk.slug}`}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 16px', textDecoration: 'none', borderTop: '1px solid #111' }}>
                  <div style={{ color: '#e0e0e0', fontSize: '.88em', fontWeight: 500 }}>{sk.name || sk.slug}</div>
                  {sk.downloads > 0 && <div style={{ color: '#555', fontSize: '.75em' }}>{Number(sk.downloads) >= 1000 ? `${(sk.downloads/1000).toFixed(1)}k` : sk.downloads} dl</div>}
                </a>
              ))}
            </div>
          )}
          {loading && (
            <div style={{ padding: '12px 16px', color: '#444', fontSize: '.85em' }}>Searching…</div>
          )}
        </div>
      )}
    </div>
  )
}
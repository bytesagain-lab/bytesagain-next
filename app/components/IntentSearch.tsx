'use client'
import { useState, useRef } from 'react'
import { USE_CASES } from '@/lib/use-cases'

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
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<typeof USE_CASES>([])
  const [skillResults, setSkillResults] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const doSearch = async (q: string) => {
    if (!q.trim()) { setResults([]); setSkillResults([]); setSearched(false); return }
    setSearched(true)
    // 1. 意图匹配 use case
    const ucMatches = matchUseCases(q)
    setResults(ucMatches)
    // 2. 同时搜索 skill
    setLoading(true)
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(q)}&limit=6`)
      const data = await res.json()
      setSkillResults(data.results || [])
    } catch { setSkillResults([]) }
    setLoading(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value
    setQuery(v)
    if (timer.current) clearTimeout(timer.current)
    timer.current = setTimeout(() => doSearch(v), 400)
  }

  const hasResults = results.length > 0 || skillResults.length > 0

  return (
    <div style={{ maxWidth: 680, margin: '0 auto', padding: '0 20px' }}>
      {/* 搜索框 */}
      <div style={{ position: 'relative' }}>
        <span style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', fontSize: '1.1em' }}>🔍</span>
        <input
          value={query}
          onChange={handleChange}
          placeholder="描述你的需求，比如：帮我写周报 / learn Python…"
          style={{
            width: '100%', padding: '14px 16px 14px 44px',
            background: '#0f0f23', border: '1px solid #2a2a4e',
            borderRadius: 12, color: '#e0e0e0', fontSize: '1em',
            outline: 'none', boxSizing: 'border-box',
          }}
        />
      </div>

      {/* 结果面板 */}
      {searched && (
        <div style={{ marginTop: 12, background: '#0a0a1a', border: '1px solid #1a1a3e', borderRadius: 12, overflow: 'hidden' }}>
          {!hasResults && !loading && (
            <div style={{ padding: '20px', color: '#555', textAlign: 'center', fontSize: '.9em' }}>
              No skills found for &quot;{query}&quot;
            </div>
          )}

          {/* Use Case 匹配 */}
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

          {/* Skill 匹配 */}
          {skillResults.length > 0 && (
            <div>
              <div style={{ padding: '10px 16px 6px', fontSize: '.72em', color: '#00d4ff', fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', borderTop: results.length > 0 ? '1px solid #1a1a3e' : undefined }}>
                ⚡ Related Skills
              </div>
              {skillResults.slice(0, 4).map((sk: any) => (
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

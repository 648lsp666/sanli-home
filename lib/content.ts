export type Lang = 'zh' | 'en'

export interface LS { zh: string; en: string }
export const t = (s: LS, lang: Lang) => s[lang]

// ─── Projects ─────────────────────────────────────────────────────────────
export const PROJECTS = [
  {
    number: '01',
    name:        { zh: '见微 Prowl',    en: 'Prowl' },
    description: {
      zh: '副业机会雷达，帮你发现 AI 时代真实可行的赚钱方向。已上线。',
      en: 'Side hustle opportunity radar — discover real, viable directions in the AI era. Live now.',
    },
    tags: [
      { zh: 'AI',     en: 'AI' },
      { zh: 'Next.js', en: 'Next.js' },
      { zh: '副业',   en: 'Side Project' },
    ],
    url: 'https://opradar.indevs.in',
    accentColor: 'var(--color-accent-green)',
  },
  {
    number: '02',
    name:        { zh: 'AI IDS Demo', en: 'AI IDS Demo' },
    description: {
      zh: '基于多源日志关联分析的 Web 应用入侵检测系统演示。',
      en: 'Web app intrusion detection demo via multi-source log correlation analysis.',
    },
    tags: [
      { zh: '安全', en: 'Security' },
      { zh: 'Python', en: 'Python' },
      { zh: 'ML',   en: 'ML' },
    ],
    url: '#',
    accentColor: 'var(--color-accent-cyan)',
  },
]

// ─── About ────────────────────────────────────────────────────────────────
export const STACK = [
  { dot: 'var(--color-accent-green)', key: { zh: '前端',  en: 'Frontend' }, value: 'React · Next.js · TypeScript' },
  { dot: 'var(--color-accent-pink)',  key: { zh: '后端',  en: 'Backend'  }, value: 'Python · Node.js' },
  { dot: 'var(--color-accent-cyan)',  key: { zh: 'AI',    en: 'AI'       }, value: 'Claude · LLM Apps' },
  { dot: 'var(--color-ink)',          key: { zh: '当前',  en: 'Current'  }, value: 'ByteDance 2026 →' },
]

// ─── Articles ─────────────────────────────────────────────────────────────
export const ARTICLES = [
  {
    category:      { zh: '精选',   en: 'Featured' },
    categoryColor: 'var(--color-accent-green)',
    title:         { zh: 'AI 时代独立开发者的副业脱身路径推演', en: 'Simulating the AI-Era Indie Exit Path' },
    date:          '2026-05-25',
    readTime:      '12 min',
    excerpt: {
      zh: '模拟分析 2026 年副业转正的可行路径——黄金笼子、AI 自媒体、独立产品三条线的真实胜算。confidence 7/10。',
      en: 'Simulating viable paths to going independent in 2026 — golden cage, AI media, indie product. confidence 7/10.',
    },
    isFeatured: true,
    url: '#',
  },
  {
    category:      { zh: '碎碎念', en: 'Notes' },
    categoryColor: 'var(--color-accent-pink)',
    title:         { zh: '入职倒计时 30 天，我在想什么', en: '30 Days to Onboarding — What I\'m Thinking' },
    date:          '2026-05-28',
    isNew:         true,
    url:           '#',
  },
  {
    category:      { zh: '技术', en: 'Tech' },
    categoryColor: '#888',
    title:         { zh: '用 Claude Code 做毕业论文格式化', en: 'Using Claude Code for Thesis Formatting' },
    date:          '2026-05-20',
    url:           '#',
  },
  {
    category:      { zh: '产品', en: 'Product' },
    categoryColor: '#888',
    title:         { zh: '见微 Prowl 上线复盘', en: 'Prowl Launch Retrospective' },
    date:          '2026-05-15',
    url:           '#',
  },
  {
    category:      { zh: '碎碎念', en: 'Notes' },
    categoryColor: 'var(--color-accent-cyan)',
    title:         { zh: '字节实习第一周感受', en: 'First Week at ByteDance' },
    date:          '2026-04-10',
    url:           '#',
  },
]

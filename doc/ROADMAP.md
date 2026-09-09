# NextHsCode 开发规划 (Roadmap)

> 编写时间：2026-05-19
> 文档状态：**待审核（Draft）**
> 编写者：基于现有代码库自动分析生成

---

## 一、当前状态盘点

### 1.1 技术栈

| 类别 | 选型 |
| --- | --- |
| 框架 | Next.js 16 (App Router) + React 19 + React Compiler |
| 语言 | TypeScript 5 |
| 数据库 | PostgreSQL + Drizzle ORM 0.45 |
| 鉴权 | NextAuth 5 (Beta, Credentials + JWT) |
| 样式 | Tailwind CSS 4 + shadcn/ui |
| 表单 | React Hook Form + Zod 4 |
| 部署 | Docker（已配置 CI 构建流程） |

### 1.2 已交付功能

- **HS Code 查询**：首页 Hero 搜索、分类导航卡片、章节聚合统计搜索（含 facets 筛选）、详情页（税率/监管/申报要素/章节归属）。
- **分类浏览**：21 大类 / 98 章节的层级浏览（`/category`）。
- **税费计算器**（`/tools/tax`）：CIF / FOB / CFR / EXW 四种贸易条款，从详情页可一键带参跳转。
- **用户体系**：注册 / 登录 / 个人中心（资料 + 密码修改），数据库 `users` 表已预留 `role` 字段。
- **基础设施**：Drizzle schema 三大模块（hscode / account / system）、unstable_cache 缓存、Docker 镜像、Postgres 连接池单例。

### 1.3 已存在但未使用的"伏笔"

代码中已经埋了几处明确的扩展点，目前是"建好但没接上"的状态：

- `hscodes.agreements` (jsonb) — 协议税率字段，预留但全为空。
- `hscodes.supervision` / `inspection` (jsonb) — 监管/检疫详细解释字段。
- `sys_references` 表（字典表）— 完整建模但 0 调用。
- `users.role` 字段 — 区分 user/admin 但无后台。
- `verificationTokens` 表 — 邮箱验证流程未实现。
- `accounts` 表 — OAuth Provider 未启用（auth.ts 已注释说明）。

---

## 二、识别出的关键差距

下面是按"用户感知度 × 实现成本"打分的差距，从最值得做开始排：

| # | 差距 | 影响面 | 备注 |
| --- | --- | --- | --- |
| 1 | 无收藏 / 浏览历史 | 用户已登录但没有"我的内容"，留存极弱 | 数据库需要新表 |
| 2 | 搜索仅 ILIKE 模糊匹配 | 中文长尾词命中差，无智能联想 | 需要 PG 全文搜索或外部引擎 |
| 3 | 无 AI 归类辅助 | 这是同类产品（关务通、Sino-tariff）的核心竞争力 | 需要接入大模型 |
| 4 | 无 Admin 后台 | 数据无法在线维护，全靠 seed 脚本 | role 字段已就位 |
| 5 | SEO 基本缺失 | 详情页没有 metadata/sitemap/OG，搜索引擎流量被浪费 | Next.js 原生支持 |
| 6 | 无 OAuth / 邮件验证 / 忘记密码 | 注册门槛和找回流程不完整 | NextAuth 现成 |
| 7 | 协议税率字段为空 | RCEP / 东盟 / CEPA 等卖点未释放 | 数据 + UI |
| 8 | 暗色模式未启用 | next-themes 已装但没用 | 低成本 |
| 9 | 无测试 / 无监控 | 难以放心快速迭代 | 工程质量 |
| 10 | 法律页面缺失 | 备案与合规风险 | 合规 |

---

## 三、推荐路线图

按"先把已登录用户的价值做满，再升级查询智能化，最后补齐数据治理与增长"的顺序排。每期 1–3 周，可独立上线。

### Phase 1 · 用户价值深化（约 2 周）

**目标**：让已登录用户有「回来」的理由。

- [ ] **收藏夹**
  - 新表：`user_favorites(userId, hscodeId, note, createdAt)`
  - 详情页 / 搜索结果卡片增加收藏按钮
  - 新页面：`/profile/favorites`
- [ ] **浏览历史**
  - 新表：`user_history(userId, hscodeId, visitedAt)`，唯一键 (userId, hscodeId)，最近一次访问时间更新
  - 个人中心新增 Tab：最近浏览
- [ ] **认证流程补全**
  - OAuth：GitHub + Google（auth.ts 已留口子）
  - 忘记密码 → 邮箱链接重置
  - 邮箱验证（启用现有 `verificationTokens` 表）
- [ ] **暗色模式**
  - 接通 next-themes，Navbar 加切换按钮，shadcn 组件颜色已就绪
- [ ] **小修小补**
  - `TaxResultCard` 的「立即计算」按钮：当前是自动计算+按钮，二选一（建议改为"复制结果"）
  - `Footer` 的"联系支持"链接全是占位 — 至少链到 issue / 邮件

**产出**：用户从"查一次就走"变成"会回来看自己的清单"。

---

### Phase 2 · 智能化升级（约 3 周）

**目标**：差异化竞争力，从"目录工具"升级为"归类助手"。

- [ ] **AI 归类推荐**
  - 输入：商品中文描述（含材质、用途、规格）
  - 输出：Top 3 HS 编码 + 推理依据 + 风险提示
  - 选型：Claude 4.X（Anthropic SDK，启用 prompt caching 把 HS 章节定义喂进去）
  - 入口：首页 Hero 旁加「AI 归类」Tab、`/tools/ai-classify` 独立页
- [ ] **申报要素辅助生成**
  - 详情页"申报要素"卡片增加「AI 填充」按钮，结合商品描述生成符合规范的申报字段
- [ ] **自然语言问答（可选 / Phase 2.5）**
  - "8517 的产品出口到越南有 RCEP 优惠吗？" 这类问题
  - 基于站内数据做 RAG，避免幻觉
- [ ] **搜索体验升级**
  - 启用 Postgres 全文搜索：`tsvector` + 中文分词（pg_jieba 或 zhparser）
  - 加 trigram 索引解决错别字
  - 搜索框加入实时联想（debounced server action）

**关键架构决策**：
- AI 调用走 server action，**严禁**把 API Key 暴露到前端。
- Prompt caching 必开 — HS 章节 / 申报要素规则是天然的高复用静态内容。
- 速率限制：未登录用户每日 N 次，登录用户 M 次，避免成本失控。

---

### Phase 3 · 后台与数据治理（约 2 周）

**目标**：让数据可以在线维护，激活已建好但未用的字典表。

- [ ] **Admin 路由组** `/admin/*`
  - 中间件按 `users.role === 'admin'` 拦截
  - 仪表盘：搜索量、热门编码、用户数趋势
- [ ] **HS 编码维护**
  - 列表 / 编辑 / 历史版本
  - 协议税率 (`agreements`) 表单化编辑：RCEP / ASEAN / CEPA / 中欧等
- [ ] **字典表正式启用** (`sys_references`)
  - 监管证件代码、检疫代码、计量单位、贸易国别 — 全部迁入
  - 详情页/搜索页从字典表 hover 展开解释（如「监管 A」→「自动进口许可证」）
- [ ] **用户管理**
  - 列表 / 禁用 / 角色调整

---

### Phase 4 · SEO 与开放能力（约 2 周）

**目标**：拿到搜索引擎流量，并对外提供能力。

- [ ] **SEO**
  - 详情页 `generateMetadata` — title/description/canonical
  - `sitemap.ts` 动态输出全部 HS Code URL（chunk 分文件）
  - `robots.ts`
  - OG 图片：用 `next/og` 动态生成（编码 + 商品名 + 税率徽章）
  - 结构化数据 JSON-LD（Product / BreadcrumbList）
  - 详情页改为 SSG + ISR（revalidate 每天）
- [ ] **公开 API**
  - `/api/v1/hscode/[code]`、`/api/v1/search`
  - API Key 管理：新表 `api_keys`，profile 页申请
  - 速率限制（Upstash / Redis 或 PG-based）
- [ ] **国际化对照**（如果资源允许）
  - 至少做中国 HS ↔ 美国 HTS 8 位的对照表

---

### Phase 5 · 工程质量（穿插进行，不单独占期）

- [ ] 测试：Vitest（单元）+ Playwright（关键流程：搜索→详情→计算器）
- [ ] 错误监控：Sentry（或自托管的 GlitchTip）
- [ ] 性能预算：Lighthouse CI 在 PR 跑
- [ ] 类型清理：搜索结果 `results: any[]` 这类替换成精确类型
- [ ] 合规：服务条款 / 隐私政策 / 关于我们 / ICP 备案位

---

## 四、Phase 1 的具体落地建议

如果要立刻开干，建议从 Phase 1 的「收藏夹」开始，因为它：

1. **闭环短**：表 + Action + 一个按钮 + 一个列表页，1–2 天可上线。
2. **价值显性**：用户能立刻感知到登录的意义。
3. **架构铺路**：会引入 `user_favorites` 这第一张「用户内容表」，后续历史、API Key、订阅都沿着同一套范式走。

**首张表草案**：

```ts
// src/db/schema/userContent.ts
export const userFavorites = pgTable('user_favorite', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('userId').notNull().references(() => users.id, { onDelete: 'cascade' }),
  hscodeId: uuid('hscodeId').notNull().references(() => hscodes.id, { onDelete: 'cascade' }),
  note: text('note'),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
}, (t) => ({
  userHscodeIdx: uniqueIndex('user_favorite_user_hscode_idx').on(t.userId, t.hscodeId),
  userIdx: index('user_favorite_user_idx').on(t.userId),
}));
```

---

## 五、开放问题（请审核回复）

1. **优先级**：是否同意「Phase 1 → 2 → 3 → 4」这个顺序？还是有商业上的强约束（比如 demo 要先有 AI）？
2. **AI 选型**：Claude / OpenAI / 国产模型（通义千问、DeepSeek）有偏好吗？是否有现成 API 配额？
3. **协议税率数据源**：是否有现成的 RCEP/CEPA 数据可以导入？没有的话需要先规划数据采集。
4. **目标用户**：是 B 端外贸企业为主，还是 C 端学生 / 海淘党？这影响是否要做"AI 归类"还是优先做"中英对照 / 国际版"。
5. **预算**：是否有外部服务（Sentry、Upstash、Resend、AI Token）的可用预算？这会决定 Phase 5 用付费 SaaS 还是自托管。

---

> 审核通过后，我会把同意的项拆成 issue / 任务列表，再逐项实现。

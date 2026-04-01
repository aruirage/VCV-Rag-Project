# Buy-side Insight - 企业投资研究AI系统

<div align="center">

![Version](https://img.shields.io/badge/version-0.0.1-blue)
![React](https://img.shields.io/badge/React-18.3.1-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1-38B2AC?logo=tailwind-css)
![License](https://img.shields.io/badge/license-MIT-green)

一个专为买方投资机构设计的AI知识库检索与研究报告生成系统

[演示视频](#) · [在线Demo](#) · [问题反馈](https://github.com/yourusername/buy-side-insight/issues)

</div>

---

## 📋 目录

- [项目简介](#-项目简介)
- [核心功能](#-核心功能)
- [技术栈](#️-技术栈)
- [快速开始](#-快速开始)
- [项目结构](#-项目结构)
- [功能演示](#-功能演示)
- [配置说明](#️-配置说明)
- [开发指南](#-开发指南)
- [部署](#-部署)
- [路线图](#️-路线图)
- [贡献指南](#-贡献指南)
- [License](#-license)

---

## 🎯 项目简介

**Buy-side Insight** 是一个专为买方投资研究团队打造的企业级AI系统，旨在解决投资研究过程中的三大痛点：

1. **知识分散** - 研究报告、行业数据散落各处，检索效率低
2. **研究重复** - 相同问题重复查找，缺少知识沉淀
3. **报告耗时** - 手动整理素材、编写报告占用大量时间

### 核心价值

- 🎯 **精准检索** - 基于RAG技术的语义检索，快速定位相关文档
- 📊 **知识沉淀** - 研究板功能收集对话片段，结构化沉淀研究成果
- 📝 **自动报告** - 基于研究板素材一键生成投资备忘录、行业简报等
- 🔒 **合规管理** - 完整的文档审批流程，满足金融机构合规要求
- 👥 **协作管理** - 多角色权限管理，支持团队协作

---

## ✨ 核心功能

### 1. 知识库管理

- **公共文档库** - 全机构共享的研究报告、行业数据
- **我的文档库** - 个人私有文档管理
- **智能分类** - 按公司、行业、宏观、另类四大类自动分类
- **文档审批** - 上传文档需经审批后入库，保证内容质量

### 2. AI对话检索

- **语义检索** - 自然语言提问，AI理解意图并检索相关内容
- **置信度显示** - 每个回答显示置信度分数（0-100）
- **来源追溯** - 标注回答的文档来源和页码
- **回答风格** - 支持严谨精确、均衡、深度洞察三种风格

### 3. 研究板（Research Board）

- **片段收集** - 从对话中提取有价值的内容加入研究板
- **结构化管理** - 为每个片段添加标题、问题、来源、备注
- **拖拽排序** - 自由调整片段顺序，组织研究逻辑
- **持久化保存** - 研究板内容独立保存，支持长期积累

### 4. 报告生成

- **模板系统** - 投资备忘录、公司研究报告、行业简报三种模板
- **一键生成** - 基于研究板素材自动生成完整报告
- **多格式导出** - 支持导出PPT、Word、PDF三种格式
- **引用标注** - 自动标注参考文献来源

### 5. 权限管理

- **三种角色** - 研究员（成员）、审批者、管理员
- **审批流程** - 文档上传后需审批者审核
- **成员管理** - 管理员可添加/移除成员，分配权限

---

## 🛠️ 技术栈

### 前端核心

- **React 18.3.1** - UI框架
- **TypeScript 5.0+** - 类型安全
- **Tailwind CSS 4.1** - 原子化CSS框架
- **React Router 7.13** - 路由管理
- **Vite 6.3** - 构建工具

### UI组件库

- **Radix UI** - 无障碍访问的headless组件
- **Lucide React** - 图标库
- **Sonner** - Toast通知组件
- **Motion** - 动画库

### 数据管理

- **Supabase** - 后端即服务（可选）
- **Custom Hooks** - 状态管理和数据获取

### 设计风格

- **OpenAI极简风格** - 纯白背景 + 黑色主色调
- **Glass Card** - 毛玻璃卡片效果
- **紧凑布局** - 小字体、高信息密度

---

## 🚀 快速开始

### 前置要求

- Node.js >= 18.0.0
- pnpm >= 8.0.0（推荐）或 npm >= 9.0.0

### 安装依赖

```bash
# 克隆项目
git clone https://github.com/yourusername/buy-side-insight.git
cd buy-side-insight

# 安装依赖
pnpm install
# 或
npm install
```

### 启动开发服务器

```bash
pnpm dev
# 或
npm run dev
```

访问 `http://localhost:5173` 查看应用。

### 构建生产版本

```bash
pnpm build
# 或
npm run build
```

---

## 📁 项目结构

```
buy-side-insight/
├── src/
│   ├── app/
│   │   ├── components/          # React组件
│   │   │   ├── ui/              # 通用UI组件
│   │   │   │   ├── button.tsx
│   │   │   │   ├── dialog.tsx
│   │   │   │   ├── loading.tsx
│   │   │   │   └── ...
│   │   │   ├── layout.tsx       # 应用布局
│   │   │   ├── login-page.tsx   # 登录页
│   │   │   ├── index-page.tsx   # 知识检索主页
│   │   │   ├── conversations-page.tsx  # 对话页
│   │   │   ├── library-page.tsx # 公共文档库
│   │   │   ├── documents-page.tsx  # 我的文档
│   │   │   ├── upload-page.tsx  # 上传文档
│   │   │   ├── research-board-page.tsx  # 研究输出
│   │   │   ├── review-page.tsx  # 审批管理
│   │   │   ├── members-page.tsx # 成员管理
│   │   │   ├── settings-page.tsx # 系统设置
│   │   │   └── profile-page.tsx # 个人设置
│   │   ├── routes.ts            # 路由配置
│   │   └── App.tsx              # 应用入口
│   ├── hooks/                   # 自定义Hooks
│   │   └── useDocuments.ts      # 文档数据管理
│   ├── lib/                     # 工具库
│   │   └── supabase.ts          # Supabase配置
│   ├── types/                   # TypeScript类型定义
│   │   └── index.ts
│   └── styles/                  # 样式文件
│       ├── index.css
│       ├── theme.css            # 主题变量
│       └── custom.css
├── public/                      # 静态资源
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

## 🎬 功能演示

### 1. 登录页面

简洁的登录界面，支持邮箱+密码登录。

### 2. 知识检索

![知识检索](docs/screenshots/search.png)

- 输入问题，AI检索相关文档并生成回答
- 显示置信度和来源文档
- 支持加入研究板

### 3. 对话页

![对话页](docs/screenshots/conversations.png)

- 完整的对话历史
- 消息折叠/展开
- 快速加入研究板

### 4. 研究板与报告生成

![研究板](docs/screenshots/research-board.png)

- 收集对话片段
- 选择报告模板
- 一键生成报告预览
- 导出多种格式

### 5. 文档管理

![文档管理](docs/screenshots/documents.png)

- 查看已上传文档
- 筛选待审核/已入库/已拒绝
- 显示拒绝原因

---

## ⚙️ 配置说明

### 环境变量

创建 `.env.local` 文件（可选，用于Supabase集成）：

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Mock数据 vs 真实数据

- **默认模式** - 使用内置Mock数据，无需配置后端
- **Supabase模式** - 配置环境变量后自动切换到真实数据

### 角色权限配置

在 `localStorage` 中设置用户角色：

```javascript
// 登录后设置
localStorage.setItem('userRole', 'admin'); // 'member' | 'approver' | 'admin'
```

---

## 💻 开发指南

### 添加新页面

1. 在 `src/app/components/` 创建页面组件
2. 在 `src/app/routes.ts` 添加路由
3. 在 `src/app/components/layout.tsx` 添加导航链接

### 添加新的数据Hook

```typescript
// src/hooks/useYourData.ts
import { useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

export function useYourData() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // 实现数据获取逻辑...
  
  return { data, loading };
}
```

### 使用Toast通知

```typescript
import { toast } from 'sonner';

toast.success('操作成功');
toast.error('操作失败');
toast.info('提示信息');
toast.warning('警告信息');
```

---

## 🌐 部署

### Vercel部署

```bash
# 安装Vercel CLI
npm i -g vercel

# 部署
vercel
```

### Docker部署

```dockerfile
# Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install
COPY . .
RUN pnpm build
EXPOSE 5173
CMD ["pnpm", "preview"]
```

---

## 🗺️ 路线图

### v0.2.0 (计划中)

- [ ] 完整的Supabase集成
- [ ] 文档全文搜索
- [ ] 协作编辑研究板
- [ ] 导出真实的PPT/Word文件

### v0.3.0 (规划中)

- [ ] RAG向量检索集成
- [ ] 流式输出
- [ ] 多轮对话上下文记忆
- [ ] 自定义报告模板编辑器

### v1.0.0 (未来)

- [ ] 移动端适配
- [ ] 多语言支持
- [ ] 数据可视化仪表板
- [ ] 第三方API集成（Bloomberg、Wind等）

---

## 🤝 贡献指南

欢迎贡献代码、提出建议或报告Bug！

### 贡献流程

1. Fork本项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启Pull Request

### 代码规范

- 使用TypeScript编写所有新代码
- 遵循ESLint规则
- 组件使用函数式组件 + Hooks
- 提交信息遵循Conventional Commits规范

---

## 📄 License

本项目采用 MIT License - 详见 [LICENSE](LICENSE) 文件

---

## 👥 作者

**Jade Qian**

- GitHub: [@aruirage](https://github.com/aruirage)
- Email: jadekupo@163.com

---

## 🙏 致谢

- OpenAI - 设计灵感来源
- Radix UI - 优秀的组件库
- Tailwind CSS - 高效的样式系统
- Vercel - 出色的部署平台

---

<div align="center">

**如果这个项目对你有帮助，请给个⭐️Star支持一下！**

Made with ❤️ for the Buy-side Community

</div>

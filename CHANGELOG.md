# 更新日志

本文档记录 Buy-side Insight 项目的所有重要更改。

格式基于 [Keep a Changelog](https://keepachangelog.com/)，
版本号遵循 [Semantic Versioning](https://semver.org/)。

---

## [0.1.0] - 2025-04-01

### ✨ 新增功能

#### 核心功能
- ✅ 知识库检索主页 - 基于AI的语义检索
- ✅ 对话页面 - 完整的对话历史和上下文管理
- ✅ 研究板系统 - 收集、组织研究素材
- ✅ 报告生成 - 基于模板自动生成投资报告
- ✅ 文档管理 - 公共库和私有库双轨制
- ✅ 审批流程 - 文档上传审批机制
- ✅ 成员管理 - 多角色权限系统
- ✅ 系统设置 - 知识库分区、检索参数、模型配置

#### 数据管理
- ✅ **Supabase集成** - 支持真实数据持久化
- ✅ **双模式支持** - Mock数据 + Supabase数据无缝切换
- ✅ **自定义Hooks** - `useDocuments` 封装数据逻辑
- ✅ **TypeScript类型** - 完整的类型定义系统

#### UI/UX改进
- ✅ **Toast通知系统** - 基于Sonner的优雅提示
- ✅ **Loading状态** - LoadingCard、LoadingSpinner、LoadingOverlay组件
- ✅ **错误处理** - 友好的错误提示和降级处理
- ✅ **OpenAI极简风格** - 纯白背景 + 黑色主色调
- ✅ **Glass Card效果** - 毛玻璃卡片设计
- ✅ **响应式布局** - 适配不同屏幕尺寸

### 📚 文档完善

- ✅ **README.md** - 完整的项目介绍和使用指南
- ✅ **ARCHITECTURE.md** - 详细的架构设计文档
- ✅ **CONTRIBUTING.md** - 贡献指南和代码规范
- ✅ **DEPLOYMENT.md** - 多平台部署指南
- ✅ **LICENSE** - MIT开源协议
- ✅ **.env.example** - 环境变量示例

### 🛠️ 开发体验

- ✅ **项目结构规范化** - 清晰的文件组织
- ✅ **TypeScript严格模式** - 类型安全
- ✅ **ESLint配置** - 代码规范检查
- ✅ **Git工作流** - .gitignore配置
- ✅ **CI/CD** - GitHub Actions自动构建

### 🔧 技术栈

- React 18.3.1
- TypeScript 5.0+
- Tailwind CSS 4.1
- React Router 7.13
- Vite 6.3
- Supabase 2.101+
- Radix UI组件库
- Sonner Toast
- Motion动画库

### 📦 新增依赖

```json
{
  "@supabase/supabase-js": "^2.101.1",
  "sonner": "2.0.3"
}
```

### 🎨 设计系统

- 主色调：`#000000` (纯黑)
- 背景色：`#ffffff` (纯白)
- 次要文字：`#737373` (灰色)
- 卡片效果：glass-card (毛玻璃)
- 字体大小：紧凑布局，小字体

### 🗂️ 项目结构

```
buy-side-insight/
├── src/
│   ├── app/              # 应用核心
│   ├── hooks/            # 自定义Hooks
│   ├── lib/              # 工具库
│   ├── types/            # TypeScript类型
│   └── styles/           # 样式文件
├── .github/              # GitHub配置
├── README.md
├── ARCHITECTURE.md
├── CONTRIBUTING.md
├── DEPLOYMENT.md
├── LICENSE
└── package.json
```

---

## [未来计划]

### v0.2.0 (下一版本)

#### 核心功能
- [ ] RAG向量检索集成
- [ ] 流式输出
- [ ] 实时协作编辑
- [ ] 文档全文搜索

#### 数据管理
- [ ] 完整的Supabase Schema设计
- [ ] 数据库迁移脚本
- [ ] 数据备份和恢复

#### 测试
- [ ] 单元测试（Vitest）
- [ ] 组件测试（React Testing Library）
- [ ] E2E测试（Playwright）

#### 性能优化
- [ ] 虚拟滚动优化长列表
- [ ] Service Worker离线支持
- [ ] 图片懒加载和优化

### v0.3.0 (规划中)

- [ ] 移动端适配
- [ ] 暗色模式
- [ ] 多语言支持（i18n）
- [ ] 数据可视化仪表板
- [ ] 导出真实的PPT/Word/PDF文件

### v1.0.0 (未来)

- [ ] 微前端架构
- [ ] 第三方数据源集成（Bloomberg、Wind）
- [ ] AI模型自定义训练
- [ ] 企业级权限管理系统

---

## 贡献者

感谢以下贡献者：

- [@yourusername](https://github.com/yourusername) - 项目创建者

---

## 许可证

本项目采用 [MIT License](LICENSE)

---

**最后更新：2025-04-01**

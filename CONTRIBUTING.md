# 贡献指南

感谢你对 Buy-side Insight 项目的关注！我们欢迎任何形式的贡献。

## 🤝 如何贡献

### 报告Bug

如果你发现了Bug，请：

1. 检查[Issues](https://github.com/yourusername/buy-side-insight/issues)确认问题是否已被报告
2. 如果没有，创建新Issue，包含：
   - 清晰的标题
   - 详细的问题描述
   - 复现步骤
   - 期望行为 vs 实际行为
   - 截图（如果适用）
   - 环境信息（浏览器、Node版本等）

### 提出功能建议

1. 创建新Issue，标记为`enhancement`
2. 描述功能的使用场景和价值
3. 如果可能，提供设计草图或参考

### 提交代码

#### 准备工作

1. Fork本项目
2. 克隆你的Fork
```bash
git clone https://github.com/your-username/buy-side-insight.git
cd buy-side-insight
```

3. 添加上游仓库
```bash
git remote add upstream https://github.com/original-owner/buy-side-insight.git
```

4. 创建功能分支
```bash
git checkout -b feature/your-feature-name
```

#### 开发流程

1. **安装依赖**
```bash
pnpm install
```

2. **启动开发服务器**
```bash
pnpm dev
```

3. **编写代码**
   - 遵循项目代码风格
   - 添加必要的注释
   - 更新相关文档

4. **测试你的更改**
   - 手动测试所有改动的功能
   - 确保没有破坏现有功能

5. **提交更改**
```bash
git add .
git commit -m "feat: 添加xxx功能"
```

6. **推送到你的Fork**
```bash
git push origin feature/your-feature-name
```

7. **创建Pull Request**
   - 访问GitHub上的原始仓库
   - 点击"New Pull Request"
   - 选择你的分支
   - 填写PR描述

## 📝 代码规范

### 提交信息规范

遵循[Conventional Commits](https://www.conventionalcommits.org/)：

```
<type>(<scope>): <subject>

<body>

<footer>
```

**类型（type）**：
- `feat`: 新功能
- `fix`: Bug修复
- `docs`: 文档更新
- `style`: 代码格式（不影响功能）
- `refactor`: 重构
- `perf`: 性能优化
- `test`: 测试相关
- `chore`: 构建/工具链相关

**示例**：
```
feat(research-board): 添加报告模板选择器

添加了投资备忘录、公司研究报告、行业简报三种模板。
用户可以在研究板页面选择模板并预览报告。

Closes #123
```

### TypeScript规范

- 启用严格模式
- 避免使用`any`，优先使用`unknown`或具体类型
- 为所有函数参数和返回值添加类型
- 使用接口（interface）定义对象类型
- 使用类型别名（type）定义联合类型

```typescript
// ✅ 好的示例
interface User {
  id: string;
  name: string;
  email: string;
}

function getUserById(id: string): User | null {
  // ...
}

// ❌ 不好的示例
function getUser(id: any): any {
  // ...
}
```

### React组件规范

- 使用函数式组件
- 优先使用Hooks而非类组件
- 组件名使用PascalCase
- Props接口以组件名+Props命名

```typescript
// ✅ 好的示例
interface ButtonProps {
  text: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
}

export function Button({ text, onClick, variant = 'primary' }: ButtonProps) {
  return <button onClick={onClick}>{text}</button>;
}

// ❌ 不好的示例
export function button(props: any) {
  return <button onClick={props.onClick}>{props.text}</button>;
}
```

### 样式规范

- 使用Tailwind CSS utility classes
- 避免内联样式（除非必要）
- 遵循glass-card设计系统
- 颜色使用CSS变量

```tsx
// ✅ 好的示例
<div className="glass-card p-4 text-foreground">
  <h2 className="text-lg font-semibold mb-2">标题</h2>
  <p className="text-sm text-muted-foreground">描述</p>
</div>

// ❌ 不好的示例
<div style={{ background: '#fff', padding: '16px' }}>
  <h2 style={{ fontSize: '18px', fontWeight: 600 }}>标题</h2>
</div>
```

### 文件命名规范

- 组件文件：`kebab-case.tsx`（如 `research-board-page.tsx`）
- Hook文件：`camelCase.ts`（如 `useDocuments.ts`）
- 类型文件：`camelCase.ts`或`index.ts`
- 工具文件：`camelCase.ts`（如 `formatDate.ts`）

```
✅ src/app/components/research-board-page.tsx
✅ src/hooks/useDocuments.ts
✅ src/types/index.ts
✅ src/lib/utils.ts

❌ src/app/components/ResearchBoardPage.tsx
❌ src/hooks/use-documents.ts
```

## 🏗️ 项目结构

添加新功能时，请遵循项目结构：

```
src/
├── app/
│   ├── components/
│   │   ├── ui/              # 通用UI组件
│   │   └── [page-name].tsx  # 页面组件
│   ├── routes.ts
│   └── App.tsx
├── hooks/                   # 自定义Hooks
├── lib/                     # 工具函数和配置
├── types/                   # TypeScript类型定义
└── styles/                  # 样式文件
```

## 🧪 测试

目前项目使用手动测试。未来计划添加：

- 单元测试（Vitest）
- 组件测试（React Testing Library）
- E2E测试（Playwright）

## 📚 文档

更新代码时，请同步更新相关文档：

- `README.md` - 用户使用文档
- `ARCHITECTURE.md` - 架构设计文档
- 代码注释 - 复杂逻辑的说明

## 🔍 Code Review

PR提交后，维护者会进行Code Review。请：

- 及时回复Review评论
- 根据反馈进行修改
- 保持友好和专业的沟通

### Review关注点

- 代码质量和可维护性
- 是否符合项目规范
- 是否有潜在的Bug或性能问题
- 是否更新了相关文档

## 🎯 优先级

我们欢迎所有贡献，但以下方向优先级较高：

1. **Bug修复** - 影响用户体验的问题
2. **核心功能** - RAG检索、Supabase集成
3. **性能优化** - 加载速度、渲染性能
4. **文档完善** - 使用指南、API文档
5. **测试覆盖** - 单元测试、集成测试

## 💬 沟通渠道

- **GitHub Issues** - Bug报告和功能建议
- **Pull Requests** - 代码贡献和讨论
- **Discussions** - 一般性讨论和问答

## 📜 行为准则

- 尊重所有贡献者
- 提供建设性的反馈
- 专注于技术讨论
- 保持开放和包容的态度

## 🎁 致谢

所有贡献者都会在README中获得致谢。

感谢你的贡献！🙌

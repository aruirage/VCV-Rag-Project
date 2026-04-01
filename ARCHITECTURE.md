# Buy-side Insight 架构文档

## 系统架构概览

```
┌─────────────────────────────────────────────────────────────────┐
│                         用户界面层                                │
│  (React 18 + TypeScript + Tailwind CSS + React Router)         │
├─────────────────────────────────────────────────────────────────┤
│                         业务组件层                                │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐       │
│  │ 知识检索  │  │  对话页   │  │  研究板   │  │ 文档管理  │       │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘       │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐       │
│  │ 报告生成  │  │ 审批管理  │  │ 成员管理  │  │ 系统设置  │       │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘       │
├─────────────────────────────────────────────────────────────────┤
│                         数据管理层                                │
│  ┌──────────────────┐  ┌──────────────────┐                    │
│  │  Custom Hooks    │  │  State Management │                    │
│  │  (useDocuments)  │  │  (React State)    │                    │
│  └──────────────────┘  └──────────────────┘                    │
├─────────────────────────────────────────────────────────────────┤
│                         数据持久层                                │
│  ┌──────────────────┐  ┌──────────────────┐                    │
│  │  Supabase Client │  │  Mock Data       │                    │
│  │  (真实数据)       │  │  (演示数据)       │                    │
│  └──────────────────┘  └──────────────────┘                    │
└─────────────────────────────────────────────────────────────────┘
```

---

## 目录结构设计

### 1. `/src/app/` - 应用核心

**职责**：包含应用的主入口、路由配置和所有React组件

```
src/app/
├── App.tsx              # 应用根组件
├── routes.ts            # 路由配置
└── components/          # 所有React组件
    ├── ui/              # 通用UI组件（按钮、对话框等）
    └── [page-name].tsx  # 业务页面组件
```

### 2. `/src/types/` - 类型定义

**职责**：集中管理TypeScript类型定义，提供类型安全

```typescript
// 核心类型
- User: 用户信息
- Document: 文档元数据
- Message: 对话消息
- ResearchSnippet: 研究板片段
- GeneratedReport: 生成的报告
- ApprovalRequest: 审批请求
```

### 3. `/src/hooks/` - 自定义Hooks

**职责**：封装数据获取和业务逻辑，提供可复用的状态管理

**设计模式**：

```typescript
// 标准Hook结构
export function useXxx() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 数据获取
  const fetchData = async () => { ... };
  
  // CRUD操作
  const addItem = async () => { ... };
  const updateItem = async () => { ... };
  const deleteItem = async () = > { ... };

  useEffect(() => { fetchData(); }, []);

  return { data, loading, error, addItem, updateItem, deleteItem };
}
```

**现有Hooks**：
- `useDocuments.ts` - 文档管理（已实现Supabase集成）

**计划Hooks**：
- `useConversations.ts` - 对话历史管理
- `useResearchBoard.ts` - 研究板管理
- `useApprovals.ts` - 审批流程管理

### 4. `/src/lib/` - 工具库

**职责**：第三方服务配置、工具函数

```
src/lib/
├── supabase.ts          # Supabase客户端配置
├── utils.ts             # 通用工具函数
└── constants.ts         # 常量定义
```

### 5. `/src/styles/` - 样式文件

**职责**：全局样式、主题变量、自定义CSS

```
src/styles/
├── index.css            # 入口样式
├── theme.css            # Tailwind主题变量
├── custom.css           # 自定义样式
└── fonts.css            # 字体导入
```

---

## 核心技术选型

### 1. 前端框架 - React 18.3.1

**选择原因**：
- ✅ 成熟的生态系统
- ✅ Hooks提供优雅的状态管理
- ✅ 虚拟DOM优化性能
- ✅ 强大的开发者工具

**使用模式**：
- 函数式组件 + Hooks
- 受控组件处理表单
- 组件组合优于继承

### 2. 类型系统 - TypeScript 5.0+

**选择原因**：
- ✅ 编译时类型检查，减少运行时错误
- ✅ 优秀的IDE支持和代码补全
- ✅ 接口和泛型提高代码可维护性

**类型策略**：
- 严格模式（`strict: true`）
- 集中的类型定义（`/src/types/`）
- 避免使用`any`，优先使用`unknown`

### 3. 样式方案 - Tailwind CSS 4.1

**选择原因**：
- ✅ 原子化CSS，无需命名烦恼
- ✅ 按需生成，生产包体积小
- ✅ 响应式设计开箱即用
- ✅ 通过主题变量统一设计系统

**设计系统**：
```css
/* theme.css */
@theme {
  --color-foreground: #000000;     /* 黑色主色调 */
  --color-background: #ffffff;     /* 纯白背景 */
  --color-muted: #f5f5f5;         /* 浅灰色 */
  --color-muted-foreground: #737373; /* 灰色文字 */
}
```

### 4. 路由管理 - React Router 7.13

**选择原因**：
- ✅ Data Router模式支持更好的数据加载
- ✅ 嵌套路由和布局共享
- ✅ 类型安全的路由参数

**路由结构**：
```typescript
createBrowserRouter([
  {
    path: "/",
    Component: Layout,  // 共享布局
    children: [
      { index: true, Component: IndexPage },
      { path: "conversations", Component: ConversationsPage },
      { path: "research-board", Component: ResearchBoardPage },
      // ... 其他路由
    ],
  },
]);
```

### 5. UI组件库 - Radix UI

**选择原因**：
- ✅ Headless组件，完全自定义样式
- ✅ 无障碍访问（ARIA）开箱即用
- ✅ 无样式依赖，与Tailwind完美配合

**使用的组件**：
- Dialog（对话框）
- Dropdown Menu（下拉菜单）
- Tabs（标签页）
- Tooltip（提示框）
- Checkbox、Switch等表单组件

### 6. 数据持久化 - Supabase（可选）

**选择原因**：
- ✅ 后端即服务（BaaS），快速开发
- ✅ 基于PostgreSQL，支持复杂查询
- ✅ 实时订阅功能
- ✅ 内置身份认证

**集成策略**：
- 双模式设计：Mock数据 + Supabase数据
- 通过环境变量切换
- Hook层抽象，业务组件无需关心数据来源

---

## 数据流设计

### 1. 文档管理数据流

```
用户操作
    ↓
业务组件 (DocumentsPage)
    ↓
自定义Hook (useDocuments)
    ↓
┌─────────────────┐
│ 判断数据源       │
│ - 有Supabase配置 │ → Supabase Client → PostgreSQL
│ - 无配置         │ → Mock Data
└─────────────────┘
    ↓
更新状态 (setState)
    ↓
UI重新渲染
```

### 2. 研究板数据流

```
对话页 → 点击"加入研究板"
    ↓
提取消息内容
    ↓
创建ResearchSnippet对象
    ↓
┌─────────────────────┐
│ useResearchBoard    │
│ - addSnippet()      │
│ - updateSnippet()   │
│ - deleteSnippet()   │
│ - reorderSnippets() │
└─────────────────────┘
    ↓
研究板页面显示
    ↓
选择模板 → 生成报告预览 → 导出文件
```

### 3. 审批流程数据流

```
用户上传文档
    ↓
DocumentsPage → useDocuments.addDocument()
    ↓
文档状态：pending
    ↓
审批管理页面 (ReviewPage)
    ↓
审批者操作：approve / reject
    ↓
useApprovals.updateApproval()
    ↓
文档状态更新：approved / rejected
    ↓
通知上传者（Toast）
```

---

## 状态管理策略

### 1. 本地组件状态

**使用场景**：UI交互状态（展开/折叠、选中Tab等）

```typescript
const [expanded, setExpanded] = useState(false);
const [activeTab, setActiveTab] = useState('all');
```

### 2. Custom Hooks状态

**使用场景**：需要跨组件共享或需要持久化的数据

```typescript
// 在多个组件中复用
const { documents, loading, addDocument } = useDocuments();
```

### 3. URL状态

**使用场景**：可分享的状态（搜索关键词、页码等）

```typescript
const [searchParams] = useSearchParams();
const query = searchParams.get('q');
```

### 4. localStorage状态

**使用场景**：用户偏好、登录状态等

```typescript
const userRole = localStorage.getItem('userRole');
localStorage.setItem('userRole', 'admin');
```

---

## 性能优化策略

### 1. 代码分割

```typescript
// 懒加载路由组件
const ConversationsPage = lazy(() => import('./components/conversations-page'));
```

### 2. 虚拟化长列表

```typescript
// 对话历史、文档列表等使用虚拟滚动
import { VirtualList } from 'react-virtual';
```

### 3. 防抖与节流

```typescript
// 搜索输入防抖
const debouncedSearch = useMemo(
  () => debounce((value) => search(value), 300),
  []
);
```

### 4. 缓存策略

```typescript
// Supabase查询缓存
const { data, error } = await supabase
  .from('documents')
  .select()
  .cache({ ttl: 60 }); // 60秒缓存
```

---

## 错误处理机制

### 1. API错误处理

```typescript
try {
  const { data, error } = await supabase.from('documents').select();
  if (error) throw error;
} catch (err) {
  toast.error('加载失败：' + err.message);
  // 降级到Mock数据
  setData(mockData);
}
```

### 2. 全局错误边界

```typescript
// 计划实现
class ErrorBoundary extends React.Component {
  componentDidCatch(error, info) {
    logErrorToService(error, info);
  }
  render() {
    if (this.state.hasError) {
      return <ErrorFallback />;
    }
    return this.props.children;
  }
}
```

### 3. Loading状态

```typescript
if (loading) return <LoadingCard />;
if (error) return <ErrorCard message={error} />;
return <DataDisplay data={data} />;
```

---

## 安全性考虑

### 1. XSS防护

- 使用React的自动转义
- 避免使用`dangerouslySetInnerHTML`
- 用户输入严格验证

### 2. CSRF防护

- Supabase自动处理
- API请求包含token

### 3. 权限控制

```typescript
// 路由级权限控制
const isAdmin = userRole === 'admin';
if (!isAdmin) return <Redirect to="/" />;
```

### 4. 数据验证

```typescript
// Zod schema验证
import { z } from 'zod';
const DocumentSchema = z.object({
  filename: z.string().min(1),
  size: z.string(),
  // ...
});
```

---

## 未来架构演进

### v0.2.0

- [ ] 完整的Supabase集成
- [ ] 全局状态管理（Zustand/Jotai）
- [ ] 错误边界和日志系统

### v0.3.0

- [ ] 微前端架构（拆分研究、知识库、管理三大模块）
- [ ] WebSocket实时通信
- [ ] Service Worker离线支持

### v1.0.0

- [ ] 服务端渲染（Next.js）
- [ ] GraphQL API层
- [ ] 多租户架构

---

## 贡献指南

### 架构变更流程

1. 提出Issue讨论架构变更
2. 更新本文档说明设计决策
3. 实现并提交PR
4. Code Review关注架构一致性

### 架构原则

- **单一职责** - 每个模块只做一件事
- **开放封闭** - 对扩展开放，对修改封闭
- **依赖倒置** - 依赖抽象而非具体实现
- **组合优于继承** - 使用组合和Hooks而非类继承

---

<div align="center">

**架构即代码，代码即架构**

Last Updated: 2025-04-01

</div>

# 快速开始指南 🚀

5分钟快速上手 Buy-side Insight！

## 📋 前置要求

- ✅ Node.js 18+ ([下载](https://nodejs.org/))
- ✅ pnpm 8+ (推荐) 或 npm 9+

检查版本：
```bash
node -v  # 应显示 v18.0.0 或更高
pnpm -v  # 应显示 8.0.0 或更高
```

---

## 🎯 三步启动

### 1️⃣ 克隆项目

```bash
git clone https://github.com/yourusername/buy-side-insight.git
cd buy-side-insight
```

### 2️⃣ 安装依赖

```bash
pnpm install
```

或使用npm：
```bash
npm install
```

### 3️⃣ 启动开发服务器

```bash
pnpm dev
```

打开浏览器访问：**http://localhost:5173** 🎉

---

## 🌟 首次使用

### 登录系统

1. 访问 http://localhost:5173
2. 默认账号：`demo@example.com`
3. 默认密码：`password123`
4. 点击"登录"

### 体验核心功能

#### 1. 知识检索
- 在首页搜索框输入问题：`光伏行业PE估值是多少？`
- AI会检索知识库并生成回答
- 查看置信度和来源文档

#### 2. 对话交互
- 点击左侧导航"对话"
- 发送消息与AI对话
- 点击消息右上角"加入研究板"收集素材

#### 3. 生成报告
- 点击"研究输出"进入研究板
- 选择报告模板（投资备忘录/公司研究报告/行业简报）
- 点击"生成报告"查看预览
- 选择导出格式（PPT/Word/PDF）

#### 4. 文档管理
- 点击"公共文档库"浏览已有文档
- 点击"上传文档"添加新文档
- 在"我的文档"查看上传状态

---

## ⚙️ 可选配置

### Supabase集成（真实数据库）

默认使用Mock数据，如需真实数据库：

1. **注册Supabase**
   - 访问 https://supabase.com
   - 创建免费账号和项目

2. **获取凭证**
   - 进入项目 Settings > API
   - 复制 `URL` 和 `anon/public key`

3. **配置环境变量**

```bash
# 复制环境变量模板
cp .env.example .env.local

# 编辑 .env.local，填入你的Supabase凭证
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

4. **重启开发服务器**

```bash
pnpm dev
```

现在应用会自动使用Supabase存储数据！

---

## 📱 功能导览

### 侧边栏导航

#### 研究区
- **知识检索** - AI语义搜索知识库
- **对话** - 多轮对话交互
- **研究输出** - 研究板和报告生成

#### 知识库区
- **公共文档库** - 全机构共享文档
- **我的文档** - 个人私有文档
- **上传文档** - 添加新文档（需审批）

#### 管理区（管理员可见）
- **审核管理** - 审批待审文档
- **成员管理** - 管理团队成员

#### 设置区
- **系统设置** - 知识库分区、检索参数、模型配置
- **个人设置** - 个人信息和偏好

---

## 🎨 界面风格

### OpenAI极简设计
- ⚪ 纯白背景 `#ffffff`
- ⚫ 黑色主色调 `#000000`
- 🔳 Glass Card毛玻璃卡片
- 📏 紧凑布局，高信息密度

### 交互细节
- ✨ 消息折叠/展开动画
- 🎯 置信度实时显示
- 📋 来源文档追溯
- 🔔 优雅的Toast通知

---

## 🛠️ 开发工具

### 推荐VSCode扩展

```json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "bradlc.vscode-tailwindcss",
    "ms-vscode.vscode-typescript-next"
  ]
}
```

### 快捷命令

```bash
# 开发模式
pnpm dev

# 构建生产版本
pnpm build

# 预览生产构建
pnpm preview

# 类型检查
pnpm type-check

# 代码格式化
pnpm format
```

---

## 🐛 常见问题

### Q1: 启动失败 - 端口占用

```bash
# 修改端口（vite.config.ts）
server: {
  port: 3000, // 改为其他端口
}
```

### Q2: 依赖安装失败

```bash
# 清除缓存重试
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

### Q3: Supabase连接失败

- 检查 `.env.local` 中的URL和KEY是否正确
- 确保Supabase项目已创建并处于Active状态
- 检查网络连接

### Q4: 构建失败

```bash
# 清除构建缓存
rm -rf dist .vite
pnpm build
```

---

## 📚 下一步

### 深入学习
- 📖 阅读 [完整文档](README.md)
- 🏗️ 了解 [架构设计](ARCHITECTURE.md)
- 🤝 查看 [贡献指南](CONTRIBUTING.md)

### 功能探索
- 🧪 尝试不同的报告模板
- 🔍 体验知识库分区检索
- ⚙️ 调整系统参数优化检索效果
- 👥 创建多个用户测试权限

### 定制开发
- 🎨 修改设计主题（`/src/styles/theme.css`）
- 📝 添加自定义报告模板
- 🔌 集成第三方API
- 🚀 部署到生产环境（[部署指南](DEPLOYMENT.md)）

---

## 💬 需要帮助？

- 📌 [GitHub Issues](https://github.com/yourusername/buy-side-insight/issues)
- 💡 [功能建议](https://github.com/yourusername/buy-side-insight/issues/new?labels=enhancement)
- 🐞 [Bug报告](https://github.com/yourusername/buy-side-insight/issues/new?labels=bug)
- 📧 Email: your.email@example.com

---

## 🎉 开始使用吧！

现在你已经准备好探索 Buy-side Insight 的所有功能了。

**祝研究愉快！📊💡**

---

<div align="center">

Made with ❤️ for the Investment Research Community

[⬆ 返回顶部](#快速开始指南-)

</div>

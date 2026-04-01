# 部署指南

本指南介绍如何将 Buy-side Insight 部署到生产环境。

## 目录

- [环境要求](#环境要求)
- [构建准备](#构建准备)
- [Vercel部署](#vercel部署)
- [Netlify部署](#netlify部署)
- [自托管部署](#自托管部署)
- [Docker部署](#docker部署)
- [环境变量配置](#环境变量配置)
- [性能优化](#性能优化)
- [监控和日志](#监控和日志)

---

## 环境要求

### 最低要求

- Node.js >= 18.0.0
- pnpm >= 8.0.0 或 npm >= 9.0.0
- 2GB RAM
- 10GB 磁盘空间

### 推荐配置

- Node.js 20.x LTS
- pnpm 8.x
- 4GB RAM
- 20GB 磁盘空间

---

## 构建准备

### 1. 安装依赖

```bash
pnpm install --frozen-lockfile
```

### 2. 环境变量配置

创建 `.env.production` 文件：

```env
# Supabase配置（可选）
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-production-anon-key

# 其他配置
VITE_APP_VERSION=1.0.0
VITE_API_BASE_URL=https://api.yourdomain.com
```

### 3. 构建项目

```bash
pnpm build
```

构建输出位于 `dist/` 目录。

### 4. 本地预览

```bash
pnpm preview
```

访问 `http://localhost:4173` 预览生产构建。

---

## Vercel部署

### 方式1：GitHub自动部署（推荐）

1. **推送代码到GitHub**

```bash
git push origin main
```

2. **连接Vercel**
   - 访问 [vercel.com](https://vercel.com)
   - 点击 "Import Project"
   - 选择你的GitHub仓库

3. **配置项目**
   - Framework Preset: Vite
   - Build Command: `pnpm build`
   - Output Directory: `dist`
   - Install Command: `pnpm install`

4. **环境变量**
   - 在Vercel项目设置中添加环境变量
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`

5. **部署**
   - 点击 "Deploy"
   - Vercel会自动构建并部署

### 方式2：CLI部署

```bash
# 安装Vercel CLI
npm i -g vercel

# 登录
vercel login

# 部署
vercel

# 部署到生产环境
vercel --prod
```

### Vercel配置文件

创建 `vercel.json`：

```json
{
  "buildCommand": "pnpm build",
  "devCommand": "pnpm dev",
  "installCommand": "pnpm install",
  "framework": "vite",
  "outputDirectory": "dist",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

---

## Netlify部署

### 方式1：GitHub自动部署

1. **连接Netlify**
   - 访问 [netlify.com](https://netlify.com)
   - 点击 "New site from Git"
   - 选择你的GitHub仓库

2. **构建设置**
   - Build command: `pnpm build`
   - Publish directory: `dist`
   - Base directory: (留空)

3. **环境变量**
   - 在Site settings > Build & deploy > Environment添加环境变量

4. **部署**
   - 点击 "Deploy site"

### 方式2：拖拽部署

1. 本地构建：`pnpm build`
2. 访问 [app.netlify.com/drop](https://app.netlify.com/drop)
3. 拖拽 `dist` 文件夹到页面

### Netlify配置文件

创建 `netlify.toml`：

```toml
[build]
  command = "pnpm build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[build.environment]
  NODE_VERSION = "20"
```

---

## 自托管部署

### Nginx配置

1. **构建项目**

```bash
pnpm build
```

2. **复制文件到服务器**

```bash
scp -r dist/* user@server:/var/www/buy-side-insight/
```

3. **配置Nginx**

创建 `/etc/nginx/sites-available/buy-side-insight`:

```nginx
server {
    listen 80;
    server_name yourdomain.com;
    root /var/www/buy-side-insight;
    index index.html;

    # 启用gzip压缩
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml text/javascript;
    gzip_min_length 1000;

    # 处理React Router路由
    location / {
        try_files $uri $uri/ /index.html;
    }

    # 静态资源缓存
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # 安全头
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
}
```

4. **启用站点**

```bash
sudo ln -s /etc/nginx/sites-available/buy-side-insight /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

5. **配置SSL（推荐使用Let's Encrypt）**

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com
```

---

## Docker部署

### Dockerfile

创建 `Dockerfile`：

```dockerfile
# 构建阶段
FROM node:20-alpine AS builder

WORKDIR /app

# 复制package文件
COPY package.json pnpm-lock.yaml ./

# 安装pnpm
RUN npm install -g pnpm

# 安装依赖
RUN pnpm install --frozen-lockfile

# 复制源代码
COPY . .

# 构建
RUN pnpm build

# 生产阶段
FROM nginx:alpine

# 复制构建产物
COPY --from=builder /app/dist /usr/share/nginx/html

# 复制Nginx配置
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

### nginx.conf

```nginx
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml text/javascript;
}
```

### docker-compose.yml

```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "80:80"
    environment:
      - NODE_ENV=production
    restart: unless-stopped
```

### 构建和运行

```bash
# 构建镜像
docker build -t buy-side-insight .

# 运行容器
docker run -d -p 80:80 --name buy-side-insight buy-side-insight

# 使用docker-compose
docker-compose up -d
```

---

## 环境变量配置

### 开发环境

`.env.development`:

```env
VITE_SUPABASE_URL=http://localhost:54321
VITE_SUPABASE_ANON_KEY=dev-key
```

### 生产环境

`.env.production`:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=prod-key
VITE_APP_VERSION=1.0.0
```

### 安全提示

- ⚠️ 不要在代码中硬编码敏感信息
- ⚠️ 生产环境使用强密钥
- ⚠️ 定期轮换API密钥
- ⚠️ 使用环境变量管理配置

---

## 性能优化

### 1. 代码分割

Vite自动进行代码分割，但可以手动优化：

```typescript
// 懒加载路由组件
const ConversationsPage = lazy(() => import('./components/conversations-page'));
```

### 2. 资源压缩

确保在 `vite.config.ts` 中启用压缩：

```typescript
export default defineConfig({
  build: {
    minify: 'esbuild',
    cssMinify: true,
  },
});
```

### 3. CDN配置

使用CDN加速静态资源：

```typescript
export default defineConfig({
  base: 'https://cdn.yourdomain.com/',
});
```

### 4. 缓存策略

设置合适的缓存头：

- HTML: `Cache-Control: no-cache`
- JS/CSS: `Cache-Control: max-age=31536000, immutable`
- 图片: `Cache-Control: max-age=31536000`

---

## 监控和日志

### 错误监控

推荐使用 Sentry:

```bash
pnpm add @sentry/react
```

```typescript
// src/main.tsx
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "your-sentry-dsn",
  environment: import.meta.env.MODE,
});
```

### 性能监控

使用 Web Vitals:

```bash
pnpm add web-vitals
```

```typescript
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

getCLS(console.log);
getFID(console.log);
getFCP(console.log);
getLCP(console.log);
getTTFB(console.log);
```

### 日志收集

推荐使用 LogRocket 或 Datadog。

---

## CI/CD流程

### GitHub Actions

已配置在 `.github/workflows/ci.yml`：

- 自动构建
- 运行测试（未来）
- 部署到Vercel/Netlify

### 手动触发部署

```bash
# Vercel
vercel --prod

# Netlify
netlify deploy --prod
```

---

## 故障排查

### 构建失败

```bash
# 清除缓存
rm -rf node_modules dist .vite
pnpm install
pnpm build
```

### 路由404错误

确保服务器配置了SPA回退：

```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

### 环境变量不生效

- 检查变量名以 `VITE_` 开头
- 重启开发服务器
- 清除浏览器缓存

---

## 支持

如有部署问题，请：

1. 查看 [Issues](https://github.com/yourusername/buy-side-insight/issues)
2. 创建新Issue并提供：
   - 部署平台
   - 错误日志
   - 环境信息

---

**祝部署顺利！🚀**

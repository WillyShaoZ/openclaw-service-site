# OpenClaw 墨尔本上门安装服务网站

科技感设计的上门服务展示网站，带预约表单和 Telegram 通知。

## 功能

- 🎨 科技感 Dark Mode 设计
- 📱 联系信息展示（电话 + 微信）
- 📋 在线预约表单
- 🔔 Telegram 订单通知
- 💾 本地订单记录

## 快速开始

### 1. 安装依赖

```bash
cd openclaw-service
npm install
```

### 2. 配置 Telegram 通知

```bash
cp .env.example .env.local
```

编辑 `.env.local`，填入：
- `TELEGRAM_BOT_TOKEN`: 从 @BotFather 获取
- `TELEGRAM_CHAT_ID`: 你的 Telegram Chat ID

### 3. 本地运行

```bash
npm run dev
```

访问 http://localhost:3000

## 部署到 Vercel

### 前端部署（Vercel）

```bash
npm install -g vercel
vercel
```

按提示操作，Vercel 会自动部署。

**注意**：Vercel 部署的是前端，后端 API 需要本地运行才能接收表单提交。

### 本地后端运行

Vercel 部署的页面无法访问本地后端。有两种方案：

#### 方案 A：纯前端 + 外部服务（推荐）

将表单提交到 Telegram Bot API（需要 webhook 服务器），或使用第三方表单服务。

#### 方案 B：本地后端 + 内网穿透

1. 本地运行后端：`npm run start`（生产模式）
2. 使用 ngrok 暴露本地端口：
   ```bash
   ngrok http 3000
   ```
3. 将 ngrok URL 配置到前端环境变量

#### 方案 C：Vercel Serverless Functions（需要 Pro）

免费版 Vercel 无法接收来自表单的外部请求。

---

## 目录结构

```
openclaw-service/
├── app/
│   ├── page.tsx          # 首页
│   ├── layout.tsx        # 布局
│   └── api/
│       └── booking/
│           └── route.ts  # 预约 API
├── package.json
├── next.config.js
├── .env.example
└── README.md
```

## 配置

| 变量 | 说明 |
|------|------|
| TELEGRAM_BOT_TOKEN | Telegram Bot Token |
| TELEGRAM_CHAT_ID | 接收通知的 Chat ID |

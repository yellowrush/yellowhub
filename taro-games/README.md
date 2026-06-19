# taro-games

YellowHub 小游戏 — Taro 项目，支持 H5 + 微信小程序发布

## 架构说明

这 5 个游戏（dragUp、alignUp、catUp、findUp、lineUp）是独立的 JavaScript/Canvas 游戏引擎（每个约 300~2700 行），直接将它们重写为 Taro 组件工程量巨大。

**采用方案：Taro + WebView 壳包装**

```
WeChat Mini-Program
└── Taro App (taro-games/)
    ├── pages/index     ← 游戏列表页（原生 Taro 组件，暖色风格）
    ├── pages/dragUp    ← WebView 包装页（加载 H5 游戏 URL）
    ├── pages/alignUp   ← WebView 包装页
    ├── pages/catUp     ← WebView 包装页
    ├── pages/findUp    ← WebView 包装页
    └── pages/lineUp    ← WebView 包装页
```

- **游戏列表页**：原生 Taro 组件，展示 5 个游戏卡片，采用 animal-island-ui 暖色风格
- **游戏页面**：使用 Taro `<WebView>` 组件，加载部署在 HTTPS 域名下的 H5 游戏文件
  - 小程序端 → `wx.webview` 全屏展示游戏
  - H5 端 → `<iframe>` 展示游戏

## 快速开始

```bash
# 安装依赖
npm install

# H5 开发模式
npm run dev:h5

# 微信小程序开发模式
npm run dev:weapp

# 构建 H5
npm run build:h5

# 构建微信小程序
npm run build:weapp
```

## 发布小程序前的配置

1. **替换游戏 URL**：在 `src/pages/index/index.tsx` 中，将 `h5Url` 的 `yoursite.com` 替换为你的实际域名
2. **微信后台配置**：在微信公众平台 → 小程序设置 → 开发管理 → 业务域名，添加你的游戏 H5 域名
3. **使用微信开发者工具**：打开 `dist/weapp` 目录进行预览和发布

## 后续扩展

如需将游戏完全移植为 Taro 原生组件（无需 WebView），需要：
1. 提取每个游戏的核心逻辑到独立 JS/TS 模块
2. 用 Taro `<Canvas>` 组件替换 HTML5 Canvas
3. 用 Taro 触摸事件替换 DOM 事件
4. 这是长期工程，建议按游戏优先级逐一完成

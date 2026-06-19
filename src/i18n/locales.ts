/* ============================================
   YellowHub i18n Locale Definitions
   Supports: en (English), zh (简体中文)
   ============================================ */

export type Locale = 'en' | 'zh';

export interface Translations {
  hero: {
    title: string;
    titleLine2: string;
    version: string;
    subtitle: string[];   // typewriter lines
    badge_years: string;
    badge_medtech: string;
    badge_ai: string;
    cta_explore: string;
    trust_opensource: string;
    trust_location: string;
  };
  footer: {
    tagline: string;
    nav_title: string;
    nav_home: string;
    nav_blog: string;
    nav_games: string;
    connect_title: string;
    connect_github: string;
    connect_resume: string;
    copyright: string;
    toggle_lang: string;
    toggle_darkmode: string;
    toggle_lightmode: string;
    sea_label: string;
  };
    games: {
    title: string;
    description: string;
    view_all: string;
    back_to_games: string;
    loading: string;
    dragUp_title: string;
    dragUp_desc: string;
    alignUp_title: string;
    alignUp_desc: string;
    catUp_title: string;
    catUp_desc: string;
    findUp_title: string;
    findUp_desc: string;
    lineUp_title: string;
    lineUp_desc: string;
    play_button: string;
  };
  time: {
    greeting_morning: string;
    greeting_afternoon: string;
    greeting_evening: string;
    greeting_night: string;
    location: string;
  };
}

export const translations: Record<Locale, Translations> = {
  en: {
    hero: {
      title: 'Yellow',
      titleLine2: 'Hub',
      version: 'v0.1',
      subtitle: [
        "Hi, I'm Tom — a frontend engineer in Tokyo 🗼",
        '10+ years crafting web experiences 🚀',
        'Vue · Nuxt.js · React · Node.js',
        'Building AI-powered tools & products 🤖',
        'MedTech meets Open Source 🍃',
      ],
      badge_years: '🍃 10+ years',
      badge_medtech: 'MedTech',
      badge_ai: 'AI',
      cta_explore: '🔍 Start Exploring',
      trust_opensource: '⭐ Open Source',
      trust_location: '🗼 Tokyo, Japan',
    },
    footer: {
      tagline: 'A warm digital island for code, creativity & connection.',
      nav_title: 'Navigate',
      nav_home: 'Home',
      nav_blog: 'Blog',
      nav_games: 'Games',
      connect_title: 'Connect',
      connect_github: 'GitHub',
      connect_resume: 'Resume',
      copyright: '© 2026 Tom Huang',
      toggle_lang: '中文',
      toggle_darkmode: '🌙 Dark',
      toggle_lightmode: '☀️ Light',
      sea_label: '🌊',
    },
    games: {
      title: 'Mini Games',
      description: 'Fun web games to relax and challenge your mind.',
      view_all: 'View All Games',
      back_to_games: '← Back to Games',
      loading: 'Loading game…',
      dragUp_title: 'Drag Up',
      dragUp_desc: 'Drag the bear cub through rotating grids to reach the star.',
      alignUp_title: 'Align Up',
      alignUp_desc: 'Drop pieces into the grid and connect four in a row to win.',
      catUp_title: 'Cat Up',
      catUp_desc: 'Guide the cat across the grid — plan every move wisely!',
      findUp_title: 'Find Up',
      findUp_desc: 'Flip cards to find matching pairs in this memory challenge.',
      lineUp_title: 'Line Up',
      lineUp_desc: 'Place pieces strategically to get five in a line.',
      play_button: 'Play Now',
    },
    time: {
      greeting_morning: 'Good morning',
      greeting_afternoon: 'Good afternoon',
      greeting_evening: 'Good evening',
      greeting_night: 'Good night',
      location: 'Tokyo, Japan',
    },
  },
  zh: {
    hero: {
      title: 'Yellow',
      titleLine2: 'Hub',
      version: 'v0.1',
      subtitle: [
        '你好，我是 Tom，东京前端工程师 🗼',
        '10+ 年 Web 开发经验 🚀',
        'Vue · Nuxt.js · React · Node.js',
        '构建 AI 驱动的工具与产品 🤖',
        '医疗科技 × 开源 🍃',
      ],
      badge_years: '🍃 10+ 年经验',
      badge_medtech: '医疗科技',
      badge_ai: 'AI',
      cta_explore: '🔍 开始探索',
      trust_opensource: '⭐ 开源',
      trust_location: '🗼 日本东京',
    },
    footer: {
      tagline: '一座温暖的数字岛屿，关于代码、创造力与连接。',
      nav_title: '导航',
      nav_home: '首页',
      nav_blog: '博客',
      nav_games: '小游戏',
      connect_title: '联系',
      connect_github: 'GitHub',
      connect_resume: '简历',
      copyright: '© 2026 Tom Huang',
      toggle_lang: 'EN',
      toggle_darkmode: '🌙 夜间',
      toggle_lightmode: '☀️ 白天',
      sea_label: '🌊',
    },
    games: {
      title: '小游戏',
      description: '放松心情、挑战思维的趣味小游戏。',
      view_all: '查看全部游戏',
      back_to_games: '← 返回游戏列表',
      loading: '游戏加载中…',
      dragUp_title: 'Drag Up',
      dragUp_desc: '拖动小熊穿过旋转网格，到达星星终点。',
      alignUp_title: 'Align Up',
      alignUp_desc: '将棋子落入网格，连成四子即可获胜。',
      catUp_title: 'Cat Up',
      catUp_desc: '引导小猫穿越网格，巧妙规划每一步！',
      findUp_title: 'Find Up',
      findUp_desc: '翻开卡片找出匹配对，挑战你的记忆力。',
      lineUp_title: 'Line Up',
      lineUp_desc: '巧妙落子，连成五子一线。',
      play_button: '开始游戏',
    },
    time: {
      greeting_morning: '早上好',
      greeting_afternoon: '下午好',
      greeting_evening: '晚上好',
      greeting_night: '深夜了',
      location: '日本 东京',
    },
  },
};

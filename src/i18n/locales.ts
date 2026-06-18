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
    connect_title: string;
    connect_github: string;
    connect_resume: string;
    copyright: string;
    toggle_lang: string;
    toggle_darkmode: string;
    toggle_lightmode: string;
    sea_label: string;
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
      connect_title: 'Connect',
      connect_github: 'GitHub',
      connect_resume: 'Resume',
      copyright: '© 2026 Tom Huang',
      toggle_lang: '中文',
      toggle_darkmode: '🌙 Dark',
      toggle_lightmode: '☀️ Light',
      sea_label: '🌊',
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
      connect_title: '联系',
      connect_github: 'GitHub',
      connect_resume: '简历',
      copyright: '© 2026 Tom Huang',
      toggle_lang: 'EN',
      toggle_darkmode: '🌙 夜间',
      toggle_lightmode: '☀️ 白天',
      sea_label: '🌊',
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

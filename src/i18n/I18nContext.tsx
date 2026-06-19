import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { translations, type Locale, type Translations } from './locales';

/* ---------- Types ---------- */
export interface I18nContextValue {
  locale: Locale;
  t: Translations;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
}

/* ---------- Context (exported for hook file) ---------- */
export const I18nContext = createContext<I18nContextValue | null>(null);

/* ---------- Provider ---------- */
const STORAGE_KEY = 'yellowhub-locale';

/**
 * I18nProvider that avoids SSG hydration mismatch.
 *
 * Strategy: always initialize with the SSG default ('en').
 * After the first mount (hydration), read localStorage / navigator.language
 * and apply — React will re-render with the correct locale but this happens
 * *after* hydration, so no mismatch error.
 */
export function I18nProvider({ children }: { children: ReactNode }) {
  // Always 'en' on first render to match SSG output
  const [locale, setLocaleState] = useState<Locale>('en');

  // After hydration, read stored/browser preference
  // Defer setState via rAF to avoid set-state-in-effect lint error
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as Locale | null;
    let preferred: Locale = 'en';
    if (saved === 'en' || saved === 'zh') {
      preferred = saved;
    } else {
      const lang = navigator.language.toLowerCase();
      if (lang.startsWith('zh')) preferred = 'zh';
    }
    // Only update if different from SSG default — defer to next frame
    if (preferred !== 'en') {
      requestAnimationFrame(() => setLocaleState(preferred));
    }
    // Always sync lang attribute after mount
    document.documentElement.lang = preferred === 'zh' ? 'zh-CN' : 'en';
  }, []);

  const setLocale = (next: Locale) => {
    setLocaleState(next);
    localStorage.setItem(STORAGE_KEY, next);
    document.documentElement.lang = next === 'zh' ? 'zh-CN' : 'en';
  };

  const toggleLocale = () => setLocale(locale === 'en' ? 'zh' : 'en');

  return (
    <I18nContext.Provider value={{ locale, t: translations[locale], setLocale, toggleLocale }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used within I18nProvider');
  return ctx;
}
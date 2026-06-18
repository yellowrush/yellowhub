import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

export type Theme = 'light' | 'dark';

export interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
  isDark: boolean;
}

export const ThemeContext = createContext<ThemeContextValue | null>(null);

const STORAGE_KEY = 'yellowhub-theme';

/**
 * ThemeProvider that avoids SSG hydration mismatch.
 *
 * Strategy: always initialize with the SSG default ('light').
 * After the first mount (hydration), read localStorage / system preference
 * and apply — React will re-render with the correct theme but this happens
 * *after* hydration, so no mismatch error.
 */
export function ThemeProvider({ children }: { children: ReactNode }) {
  // Always 'light' on first render to match SSG output
  const [theme, setTheme] = useState<Theme>('light');

  // After hydration, read stored/system preference
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as Theme | null;
    let preferred: Theme = 'light';
    if (saved === 'light' || saved === 'dark') {
      preferred = saved;
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      preferred = 'dark';
    }
    // Only update if different from SSG default
    if (preferred !== 'light') {
      setTheme(preferred);
    }
    // Always sync data-theme attribute after mount
    document.documentElement.setAttribute('data-theme', preferred);
  }, []);

  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    localStorage.setItem(STORAGE_KEY, next);
    document.documentElement.setAttribute('data-theme', next);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isDark: theme === 'dark' }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}
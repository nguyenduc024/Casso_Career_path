import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { translations, type Locale, type Theme, type Translation } from '../i18n/translations';

const THEME_KEY = 'casso-theme';
const LOCALE_KEY = 'casso-locale';

interface AppPreferencesContextValue {
  theme: Theme;
  locale: Locale;
  t: Translation;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  setLocale: (locale: Locale) => void;
}

const AppPreferencesContext = createContext<AppPreferencesContextValue | null>(null);

function readTheme(): Theme {
  const stored = localStorage.getItem(THEME_KEY);
  if (stored === 'light' || stored === 'dark') return stored;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function readLocale(): Locale {
  const stored = localStorage.getItem(LOCALE_KEY);
  if (stored === 'vi' || stored === 'en') return stored;
  const lang = navigator.language.toLowerCase();
  return lang.startsWith('vi') ? 'vi' : 'en';
}

export function AppPreferencesProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() => readTheme());
  const [locale, setLocaleState] = useState<Locale>(() => readLocale());

  const setTheme = useCallback((next: Theme) => {
    setThemeState(next);
    localStorage.setItem(THEME_KEY, next);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  }, [theme, setTheme]);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    localStorage.setItem(LOCALE_KEY, next);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark', theme === 'dark');
    root.lang = locale;
  }, [theme, locale]);

  const value = useMemo(
    () => ({
      theme,
      locale,
      t: translations[locale],
      setTheme,
      toggleTheme,
      setLocale,
    }),
    [theme, locale, setTheme, toggleTheme, setLocale]
  );

  return (
    <AppPreferencesContext.Provider value={value}>{children}</AppPreferencesContext.Provider>
  );
}

export function useAppPreferences(): AppPreferencesContextValue {
  const ctx = useContext(AppPreferencesContext);
  if (!ctx) {
    throw new Error('useAppPreferences must be used within AppPreferencesProvider');
  }
  return ctx;
}

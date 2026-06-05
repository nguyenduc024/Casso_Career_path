import { Moon, Sun } from 'lucide-react';
import { useAppPreferences } from '../context/AppPreferences';
import type { Locale } from '../i18n/translations';

export function HeaderToolbar() {
  const { theme, locale, t, toggleTheme, setLocale } = useAppPreferences();

  return (
    <div className="flex items-center gap-2 shrink-0">
      <div
        className="flex items-center rounded-full border border-[var(--cp-border)] bg-[var(--cp-surface)]/80 p-0.5"
        role="group"
        aria-label={t.language}
      >
        {(['vi', 'en'] as Locale[]).map((code) => (
          <button
            key={code}
            type="button"
            onClick={() => setLocale(code)}
            className={[
              'min-w-[2.25rem] px-2.5 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wide transition-colors duration-200',
              locale === code
                ? 'bg-[var(--cp-primary)] text-white shadow-sm'
                : 'text-[var(--cp-text-muted)] hover:text-[var(--cp-text)]',
            ].join(' ')}
          >
            {code}
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={toggleTheme}
        className="w-9 h-9 rounded-full border border-[var(--cp-border)] bg-[var(--cp-surface)]/80 flex items-center justify-center text-[var(--cp-primary)] hover:bg-[var(--cp-primary)]/10 transition-colors duration-200"
        title={theme === 'light' ? t.themeDark : t.themeLight}
        aria-label={theme === 'light' ? t.themeDark : t.themeLight}
      >
        {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
      </button>
    </div>
  );
}

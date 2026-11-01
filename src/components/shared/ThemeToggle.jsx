'use client';

import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide.react';

// Dark mode toggle - switches entire system including navbar, forms, cards, dialogs, footer and dashboards

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      className="w-10 h-10 rounded-full bg-sage border border-sage/40 flex items-center justify-center text-gray-700 dark:text-gray-200 dark:bg-[#1f2d26] hover:bg-white/30 dark:hover:bg-white/10 transition-all"
      aria-label="Toggle theme"
    >
      {theme === 'light' ? (
        <Moon className="w-5 h-5" />
      ) : (
        <Sun className="w-5 h-5" />
      )}
    </button>
  );
}

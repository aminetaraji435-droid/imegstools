'use client';

import React from 'react';
import { useApp } from '@/lib/context/AppContext';
import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
  className?: string;
  showLabel?: boolean;
}

export function ThemeToggle({ className = '', showLabel = false }: ThemeToggleProps) {
  const { theme, toggleTheme, t } = useApp();
  const isDark = theme === 'dark';

  return (
    <button
      id="theme-toggle-button"
      type="button"
      onClick={toggleTheme}
      className={`relative inline-flex items-center gap-2 p-2 rounded-xl border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/40 active:scale-95 ${
        isDark
          ? 'bg-slate-800 border-slate-700 text-amber-300 hover:bg-slate-700/80 hover:text-amber-200'
          : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-slate-900 shadow-xs'
      } ${className}`}
      title={isDark ? t.theme.switchToLight : t.theme.switchToDark}
      aria-label={isDark ? t.theme.switchToLight : t.theme.switchToDark}
    >
      <div className="relative w-5 h-5 flex items-center justify-center">
        {isDark ? (
          <Sun className="w-5 h-5 text-amber-400 transition-transform rotate-0 scale-100" />
        ) : (
          <Moon className="w-5 h-5 text-slate-700 transition-transform rotate-0 scale-100" />
        )}
      </div>

      {showLabel && (
        <span className="text-xs font-semibold select-none">
          {isDark ? t.theme.light : t.theme.dark}
        </span>
      )}
    </button>
  );
}

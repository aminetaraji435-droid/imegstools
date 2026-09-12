'use client';

import React, { createContext, useContext, useState, useMemo } from 'react';
import { Language, translations, TranslationDictionary } from '@/lib/i18n/translations';

interface AppContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  setTheme: (theme: 'light' | 'dark') => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  t: TranslationDictionary;
  dir: 'rtl' | 'ltr';
}

const AppContext = createContext<AppContextType | undefined>(undefined);

function applyThemeToDom(nextTheme: 'light' | 'dark') {
  if (typeof document !== 'undefined') {
    const root = document.documentElement;
    if (nextTheme === 'dark') {
      root.classList.add('dark');
      root.style.colorScheme = 'dark';
    } else {
      root.classList.remove('dark');
      root.style.colorScheme = 'light';
    }
  }
}

function applyLanguageToDom(nextLang: Language) {
  if (typeof document !== 'undefined') {
    const root = document.documentElement;
    root.setAttribute('lang', nextLang);
    const isRtl = nextLang === 'ar';
    root.setAttribute('dir', isRtl ? 'rtl' : 'ltr');
    if (isRtl) {
      root.classList.add('rtl');
    } else {
      root.classList.remove('rtl');
    }
  }
}

function getInitialTheme(): 'light' | 'dark' {
  if (typeof window === 'undefined') return 'light';
  try {
    const saved = localStorage.getItem('imagetools_theme') as 'light' | 'dark' | null;
    if (saved === 'dark' || saved === 'light') return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  } catch {
    return 'light';
  }
}

function getInitialLanguage(): Language {
  if (typeof window === 'undefined') return 'ar';
  try {
    const saved = localStorage.getItem('imagetools_lang') as Language | null;
    if (saved === 'ar' || saved === 'fr' || saved === 'en') return saved;
    const browserLang = navigator.language?.toLowerCase() || '';
    if (browserLang.startsWith('fr')) return 'fr';
    if (browserLang.startsWith('en')) return 'en';
    return 'ar';
  } catch {
    return 'ar';
  }
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<'light' | 'dark'>(getInitialTheme);
  const [language, setLanguageState] = useState<Language>(getInitialLanguage);

  const setTheme = (nextTheme: 'light' | 'dark') => {
    setThemeState(nextTheme);
    applyThemeToDom(nextTheme);
    try {
      localStorage.setItem('imagetools_theme', nextTheme);
    } catch {}
  };

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
  };

  const setLanguage = (nextLang: Language) => {
    setLanguageState(nextLang);
    applyLanguageToDom(nextLang);
    try {
      localStorage.setItem('imagetools_lang', nextLang);
    } catch {}
  };

  const t = useMemo(() => {
    return translations[language] || translations.ar;
  }, [language]);

  const dir: 'rtl' | 'ltr' = language === 'ar' ? 'rtl' : 'ltr';

  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
        setTheme,
        language,
        setLanguage,
        t,
        dir,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}

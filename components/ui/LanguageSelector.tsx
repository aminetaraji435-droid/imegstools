'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '@/lib/context/AppContext';
import { Language } from '@/lib/i18n/translations';
import { Globe, Check, ChevronDown } from 'lucide-react';

interface LanguageSelectorProps {
  className?: string;
  variant?: 'dropdown' | 'inline';
}

const LANGUAGES: { code: Language; label: string; native: string; flag: string }[] = [
  { code: 'ar', label: 'Arabic', native: 'العربية', flag: '🇹🇳' },
  { code: 'fr', label: 'French', native: 'Français', flag: '🇫🇷' },
  { code: 'en', label: 'English', native: 'English', flag: '🇬🇧' },
];

export function LanguageSelector({ className = '', variant = 'dropdown' }: LanguageSelectorProps) {
  const { language, setLanguage, t, dir } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLang = LANGUAGES.find((l) => l.code === language) || LANGUAGES[0];

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (variant === 'inline') {
    return (
      <div className={`flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 ${className}`}>
        {LANGUAGES.map((lang) => {
          const active = lang.code === language;
          return (
            <button
              key={lang.code}
              id={`lang-inline-btn-${lang.code}`}
              type="button"
              onClick={() => setLanguage(lang.code)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                active
                  ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <span className="mr-1 rtl:mr-0 rtl:ml-1">{lang.flag}</span>
              <span>{lang.native}</span>
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div ref={dropdownRef} className={`relative inline-block ${className}`}>
      <button
        id="language-selector-button"
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        className="flex items-center gap-2 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/70 text-xs font-semibold shadow-xs transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/40"
        title={t.lang.select}
      >
        <Globe className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
        <span className="flex items-center gap-1.5">
          <span>{currentLang.flag}</span>
          <span>{currentLang.native}</span>
        </span>
        <ChevronDown
          className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div
          id="language-dropdown-menu"
          role="listbox"
          className={`absolute ${
            dir === 'rtl' ? 'left-0' : 'right-0'
          } mt-2 w-44 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-lg py-1 z-50 animate-in fade-in zoom-in-95 duration-150`}
        >
          <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 border-b border-slate-100 dark:border-slate-700/60 mb-1">
            {t.lang.select}
          </div>
          {LANGUAGES.map((lang) => {
            const isSelected = lang.code === language;
            return (
              <button
                key={lang.code}
                id={`lang-option-${lang.code}`}
                type="button"
                role="option"
                aria-selected={isSelected}
                onClick={() => {
                  setLanguage(lang.code);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium transition-colors text-start ${
                  isSelected
                    ? 'bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 font-semibold'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/60'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-sm">{lang.flag}</span>
                  <span>{lang.native}</span>
                </div>
                {isSelected && <Check className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

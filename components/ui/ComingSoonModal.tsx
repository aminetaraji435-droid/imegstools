'use client';

import React, { createContext, useContext, useState } from 'react';
import { Sparkles, Clock, CheckCircle2, X } from 'lucide-react';
import { Button } from './Button';
import { Badge } from './Badge';
import { useApp } from '@/lib/context/AppContext';

interface ComingSoonContextType {
  openComingSoon: (toolName: string, phase: number, features?: string[]) => void;
  closeComingSoon: () => void;
}

const ComingSoonContext = createContext<ComingSoonContextType | null>(null);

export function useComingSoon() {
  const context = useContext(ComingSoonContext);
  if (!context) {
    return {
      openComingSoon: () => {},
      closeComingSoon: () => {},
    };
  }
  return context;
}

export function ComingSoonProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTool, setActiveTool] = useState<{
    name: string;
    phase: number;
    features: string[];
  }>({
    name: '',
    phase: 2,
    features: [],
  });

  const { t } = useApp();

  const openComingSoon = (name: string, phase: number, features: string[] = []) => {
    setActiveTool({ name, phase, features });
    setIsOpen(true);
  };

  const closeComingSoon = () => {
    setIsOpen(false);
  };

  return (
    <ComingSoonContext.Provider value={{ openComingSoon, closeComingSoon }}>
      {children}

      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="coming-soon-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in-0 duration-200"
          onClick={closeComingSoon}
        >
          <div
            className="relative w-full max-w-md rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-2xl space-y-5 animate-in zoom-in-95 duration-200 text-start"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/70 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <Badge variant="subtle" size="sm" className="mb-1">
                    {t.common?.phase || 'Phase'} {activeTool.phase} • {t.common?.inProgress || 'In Progress'}
                  </Badge>
                  <h3 id="coming-soon-title" className="text-lg font-bold text-slate-900 dark:text-white leading-tight">
                    {activeTool.name}
                  </h3>
                </div>
              </div>

              <button
                type="button"
                onClick={closeComingSoon}
                aria-label={t.common?.close || 'Close'}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {t.common?.phase2Note ||
                'This tool is currently scheduled for implementation in the next phase. The core design system and client-side shell are fully functional.'}
            </p>

            {activeTool.features.length > 0 && (
              <div className="space-y-2 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Planned Capabilities
                </p>
                <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                  {activeTool.features.map((feat, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex items-center justify-end gap-2 pt-2">
              <Button variant="primary" size="md" onClick={closeComingSoon}>
                {t.common?.close || 'Got it'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </ComingSoonContext.Provider>
  );
}

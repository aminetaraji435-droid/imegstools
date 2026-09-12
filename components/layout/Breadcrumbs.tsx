'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useApp } from '@/lib/context/AppContext';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  isCurrent?: boolean;
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
  showHome?: boolean;
}

export function Breadcrumbs({ items, className, showHome = true }: BreadcrumbsProps) {
  const { t } = useApp();

  return (
    <nav aria-label="Breadcrumb" className={cn('flex items-center text-xs sm:text-sm text-slate-500 dark:text-slate-400 py-3', className)}>
      <ol className="flex items-center flex-wrap gap-1.5 sm:gap-2">
        {showHome && (
          <li className="inline-flex items-center">
            <Link
              href="/"
              className="inline-flex items-center gap-1 hover:text-slate-900 dark:hover:text-white transition-colors py-1 px-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800"
              aria-label={t.common?.home || 'Home'}
            >
              <Home className="w-3.5 h-3.5" />
              <span className="sr-only sm:not-sr-only">{t.common?.home || 'Home'}</span>
            </Link>
          </li>
        )}

        {items.map((item, index) => {
          const isLast = index === items.length - 1 || item.isCurrent;

          return (
            <React.Fragment key={index}>
              <li aria-hidden="true" className="text-slate-400 dark:text-slate-600 select-none">
                <ChevronRight className="w-3.5 h-3.5 rtl:rotate-180" />
              </li>
              <li className="inline-flex items-center">
                {isLast || !item.href ? (
                  <span
                    aria-current="page"
                    className="font-semibold text-slate-900 dark:text-white py-1 px-1.5"
                  >
                    {item.label}
                  </span>
                ) : (
                  <Link
                    href={item.href}
                    className="hover:text-slate-900 dark:hover:text-white transition-colors py-1 px-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
}

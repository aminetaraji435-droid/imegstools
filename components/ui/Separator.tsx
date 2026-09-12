import React from 'react';
import { cn } from '@/lib/utils';

export interface SeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: 'horizontal' | 'vertical';
  label?: React.ReactNode;
}

export function Separator({
  orientation = 'horizontal',
  label,
  className,
  ...props
}: SeparatorProps) {
  if (orientation === 'vertical') {
    return (
      <div
        role="separator"
        aria-orientation="vertical"
        className={cn('inline-block h-full w-[1px] bg-slate-200 dark:bg-slate-800 self-stretch', className)}
        {...props}
      />
    );
  }

  if (label) {
    return (
      <div
        role="separator"
        aria-orientation="horizontal"
        className={cn('relative flex items-center justify-center my-4', className)}
        {...props}
      >
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-200 dark:border-slate-800" />
        </div>
        <div className="relative bg-white dark:bg-slate-900 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
          {label}
        </div>
      </div>
    );
  }

  return (
    <div
      role="separator"
      aria-orientation="horizontal"
      className={cn('h-[1px] w-full bg-slate-200 dark:bg-slate-800 my-4', className)}
      {...props}
    />
  );
}

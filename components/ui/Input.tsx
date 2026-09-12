'use client';

import React, { forwardRef, useId } from 'react';
import { cn } from '@/lib/utils';
import { AlertCircle } from 'lucide-react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  suffix?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = 'text',
      label,
      helperText,
      error,
      startIcon,
      endIcon,
      suffix,
      disabled,
      id,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const inputId = id || generatedId;
    const errorId = `${inputId}-error`;
    const helperId = `${inputId}-helper`;

    return (
      <div className="w-full space-y-1.5 text-start">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-xs font-semibold text-slate-800 dark:text-slate-200"
          >
            {label}
          </label>
        )}

        <div className="relative flex items-center">
          {startIcon && (
            <div className="absolute start-3 pointer-events-none text-slate-400 dark:text-slate-500 flex items-center justify-center">
              {startIcon}
            </div>
          )}

          <input
            ref={ref}
            id={inputId}
            type={type}
            disabled={disabled}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? errorId : helperText ? helperId : undefined}
            className={cn(
              'flex h-11 w-full rounded-xl border bg-white dark:bg-slate-900 px-3.5 py-2 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-1 dark:focus-visible:ring-offset-slate-950 disabled:cursor-not-allowed disabled:opacity-50 min-h-[44px]',
              startIcon ? 'ps-10' : '',
              endIcon || suffix ? 'pe-10' : '',
              error
                ? 'border-rose-500 focus-visible:ring-rose-500 text-rose-900 dark:text-rose-100'
                : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700',
              className
            )}
            {...props}
          />

          {suffix && !endIcon && (
            <div className="absolute end-3 pointer-events-none text-xs font-medium text-slate-400 dark:text-slate-500">
              {suffix}
            </div>
          )}

          {endIcon && (
            <div className="absolute end-3 flex items-center justify-center text-slate-400 dark:text-slate-500">
              {endIcon}
            </div>
          )}
        </div>

        {error && (
          <p id={errorId} className="flex items-center gap-1 text-xs text-rose-600 dark:text-rose-400 font-medium">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            <span>{error}</span>
          </p>
        )}

        {helperText && !error && (
          <p id={helperId} className="text-xs text-slate-500 dark:text-slate-400">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

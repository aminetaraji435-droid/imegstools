'use client';

import React, { useId } from 'react';
import { cn } from '@/lib/utils';

export interface SliderProps {
  label?: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
  disabled?: boolean;
  className?: string;
  helperText?: string;
  showValueBadge?: boolean;
  marks?: { value: number; label: string }[];
}

export function Slider({
  label,
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  unit = '',
  disabled = false,
  className,
  helperText,
  showValueBadge = true,
  marks,
}: SliderProps) {
  const id = useId();
  const percentage = Math.min(Math.max(((value - min) / (max - min)) * 100, 0), 100);

  return (
    <div className={cn('w-full space-y-2 select-none text-start', className)}>
      {(label || showValueBadge) && (
        <div className="flex items-center justify-between">
          {label && (
            <label
              htmlFor={id}
              className="text-sm font-semibold text-slate-900 dark:text-white flex items-center gap-1.5"
            >
              {label}
            </label>
          )}
          {showValueBadge && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-xs font-mono font-bold text-slate-800 dark:text-slate-200 tabular-nums border border-slate-200 dark:border-slate-700">
              {value}
              {unit && <span className="ms-0.5 text-[11px] font-normal text-slate-500">{unit}</span>}
            </span>
          )}
        </div>
      )}

      <div className="relative flex items-center">
        <input
          id={id}
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          disabled={disabled}
          onChange={(e) => onChange(Number(e.target.value))}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={value}
          aria-label={label || 'Range slider'}
          className={cn(
            'w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950',
            // Custom background fill using dynamic style gradient for smooth progress feel
            'range-sm'
          )}
          style={{
            background: `linear-gradient(to right, #2563eb 0%, #2563eb ${percentage}%, var(--tw-range-bg, #cbd5e1) ${percentage}%, var(--tw-range-bg, #cbd5e1) 100%)`,
          }}
        />
      </div>

      {marks && marks.length > 0 && (
        <div className="flex justify-between text-[10px] text-slate-400 dark:text-slate-500 px-1 pt-0.5">
          {marks.map((m, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => !disabled && onChange(m.value)}
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              {m.label}
            </button>
          ))}
        </div>
      )}

      {helperText && (
        <p className="text-xs text-slate-500 dark:text-slate-400">{helperText}</p>
      )}
    </div>
  );
}

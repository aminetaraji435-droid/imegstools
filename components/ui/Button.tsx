'use client';

import React, { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950 disabled:pointer-events-none disabled:opacity-50 select-none cursor-pointer active:scale-[0.98]',
  {
    variants: {
      variant: {
        primary:
          'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 shadow-xs dark:bg-blue-600 dark:hover:bg-blue-500',
        secondary:
          'bg-slate-100 text-slate-900 hover:bg-slate-200 active:bg-slate-300 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700',
        outline:
          'border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/70 hover:border-slate-300 dark:hover:border-slate-700',
        ghost:
          'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800',
        success:
          'bg-emerald-600 text-white hover:bg-emerald-700 active:bg-emerald-800 shadow-xs dark:bg-emerald-600 dark:hover:bg-emerald-500',
        destructive:
          'bg-rose-600 text-white hover:bg-rose-700 active:bg-rose-800 shadow-xs dark:bg-rose-600 dark:hover:bg-rose-500',
        subtle:
          'bg-blue-50 text-blue-700 hover:bg-blue-100 dark:bg-blue-950/60 dark:text-blue-300 dark:hover:bg-blue-900/60',
      },
      size: {
        sm: 'h-9 px-3.5 text-xs rounded-lg min-h-[36px]',
        md: 'h-11 px-5 text-sm rounded-xl min-h-[44px]',
        lg: 'h-13 px-6 text-base rounded-xl min-h-[48px]',
        icon: 'h-10 w-10 p-0 rounded-xl min-h-[40px] min-w-[40px]',
        iconLg: 'h-11 w-11 p-0 rounded-xl min-h-[44px] min-w-[44px]',
      },
      fullWidth: {
        true: 'w-full',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      fullWidth,
      isLoading = false,
      disabled,
      startIcon,
      endIcon,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(buttonVariants({ variant, size, fullWidth }), className)}
        {...props}
      >
        {isLoading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin shrink-0" />
            <span>{children}</span>
          </>
        ) : (
          <>
            {startIcon && <span className="shrink-0">{startIcon}</span>}
            {children}
            {endIcon && <span className="shrink-0">{endIcon}</span>}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

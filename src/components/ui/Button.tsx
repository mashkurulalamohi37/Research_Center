import React from 'react';
import { cn } from '../../lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'cyan';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading = false, children, disabled, ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none rounded-xl active:scale-[0.98]";
    
    const variants = {
      primary: "bg-cyan-600 hover:bg-cyan-500 text-white font-semibold shadow-md shadow-cyan-600/20 hover:shadow-cyan-600/30 dark:bg-cyan-500 dark:hover:bg-cyan-400 dark:text-navy-950",
      secondary: "bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 dark:bg-slate-800/80 dark:hover:bg-slate-700/80 dark:text-slate-100 dark:border-slate-700/50 backdrop-blur-sm",
      outline: "border border-slate-300 hover:border-cyan-600 text-slate-700 hover:text-cyan-700 hover:bg-cyan-50/50 dark:border-slate-700 dark:hover:border-cyan-500/50 dark:text-slate-200 dark:hover:text-cyan-400 dark:hover:bg-cyan-500/5",
      ghost: "hover:bg-slate-100 text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800/50",
      destructive: "bg-red-600 hover:bg-red-500 text-white shadow-md shadow-red-600/20",
      cyan: "bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold shadow-md shadow-cyan-600/25 dark:from-cyan-500 dark:to-blue-600 dark:hover:from-cyan-400 dark:hover:to-blue-500 dark:text-slate-950",
    };

    const sizes = {
      sm: "h-8 px-3 text-xs gap-1.5",
      md: "h-10 px-4 text-sm gap-2",
      lg: "h-12 px-6 text-base gap-2.5",
      icon: "h-9 w-9 p-0",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {isLoading && (
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        )}
        {children}
      </button>
    );
  }
);
Button.displayName = 'Button';

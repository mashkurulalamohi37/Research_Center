import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSubtitle?: boolean;
  className?: string;
  asLink?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  size = 'md',
  showSubtitle = true,
  className = '',
  asLink = true,
}) => {
  const sizeMap = {
    sm: { img: 'w-8 h-8', text: 'text-base', sub: 'text-[10px]' },
    md: { img: 'w-10 h-10', text: 'text-lg sm:text-xl', sub: 'text-[11px]' },
    lg: { img: 'w-14 h-14', text: 'text-2xl', sub: 'text-xs' },
    xl: { img: 'w-20 h-20', text: 'text-3xl', sub: 'text-sm' },
  };

  const { img, text, sub } = sizeMap[size];

  const content = (
    <div className={`inline-flex items-center gap-3 shrink-0 group ${className}`}>
      <div className="relative shrink-0">
        <img
          src="/iricc-logo.jpg"
          alt="AIRIC Official Seal"
          width="40"
          height="40"
          className={`${img} rounded-full object-cover shadow-sm ring-2 ring-amber-400/30 group-hover:ring-amber-500/60 transition-all duration-300`}
          loading="eager"
        />
      </div>
      <div className="flex flex-col text-left">
        <div className="flex items-center gap-2">
          <span className={`${text} font-black tracking-wider text-slate-900 dark:text-white font-sans leading-none`}>
            AIRIC
          </span>
          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-50 dark:bg-cyan-500/15 text-cyan-800 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-500/30 font-bold tracking-wider leading-none">
            INSTITUTE
          </span>
        </div>
        {showSubtitle && (
          <span className={`${sub} font-medium text-slate-600 dark:text-slate-300 tracking-tight mt-0.5 hidden sm:block leading-tight`}>
            Advanced Intelligence Research, Innovation & Commercialization Institute
          </span>
        )}
      </div>
    </div>
  );

  if (!asLink) {
    return content;
  }

  return (
    <Link to="/" aria-label="AIRIC Home" className="focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:outline-none rounded-xl">
      {content}
    </Link>
  );
};

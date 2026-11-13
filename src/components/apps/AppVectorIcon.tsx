import React from 'react';

interface AppVectorIconProps {
  iconKey: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  accentColor?: string;
}

export const AppVectorIcon: React.FC<AppVectorIconProps> = ({
  iconKey,
  size = 'md',
  className = '',
  accentColor = 'cyan',
}) => {
  const sizeMap = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-16 h-16',
    xl: 'w-20 h-20',
  };

  const currentSize = sizeMap[size];

  // Bespoke SVG renderings for all 10 applications
  const renderSvg = () => {
    switch (iconKey.toLowerCase()) {
      case 'bchat':
        return (
          <svg viewBox="0 0 48 48" fill="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <rect width="48" height="48" rx="12" className="fill-cyan-500/10 dark:fill-cyan-500/20" />
            <path
              d="M14 16C14 13.7909 15.7909 12 18 12H30C32.2091 12 34 13.7909 34 16V26C34 28.2091 32.2091 30 30 30H20L14 36V16Z"
              className="stroke-cyan-600 dark:stroke-cyan-400"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Neural communication nodes */}
            <circle cx="20" cy="21" r="2" className="fill-cyan-600 dark:fill-cyan-400" />
            <circle cx="28" cy="21" r="2" className="fill-cyan-600 dark:fill-cyan-400" />
            <path d="M22 21H26" className="stroke-cyan-600 dark:stroke-cyan-400" strokeWidth="2" strokeDasharray="1 1" />
            <path d="M21 26C22.5 27 25.5 27 27 26" className="stroke-cyan-600 dark:stroke-cyan-400" strokeWidth="2" strokeLinecap="round" />
          </svg>
        );

      case 'myhealth':
        return (
          <svg viewBox="0 0 48 48" fill="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <rect width="48" height="48" rx="12" className="fill-emerald-500/10 dark:fill-emerald-500/20" />
            {/* Health Shield */}
            <path
              d="M24 10L34 14V22C34 29 29.5 35 24 38C18.5 35 14 29 14 22V14L24 10Z"
              className="stroke-emerald-600 dark:stroke-emerald-400"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
            {/* Vital Pulse */}
            <path
              d="M17 24H21L23 20L25 28L27 22L29 25H31"
              className="stroke-emerald-600 dark:stroke-emerald-400"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        );

      case 'bsmart':
        return (
          <svg viewBox="0 0 48 48" fill="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <rect width="48" height="48" rx="12" className="fill-blue-500/10 dark:fill-blue-500/20" />
            {/* Smart Infrastructure Hexagon */}
            <path
              d="M24 11L35 17.5V30.5L24 37L13 30.5V17.5L24 11Z"
              className="stroke-blue-600 dark:stroke-blue-400"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
            {/* Central IoT Hub & Waves */}
            <circle cx="24" cy="24" r="3.5" className="fill-blue-600 dark:fill-blue-400" />
            <path d="M24 16V14" className="stroke-blue-600 dark:stroke-blue-400" strokeWidth="2" strokeLinecap="round" />
            <path d="M24 34V32" className="stroke-blue-600 dark:stroke-blue-400" strokeWidth="2" strokeLinecap="round" />
            <path d="M17 20L15.5 19" className="stroke-blue-600 dark:stroke-blue-400" strokeWidth="2" strokeLinecap="round" />
            <path d="M31 28L32.5 29" className="stroke-blue-600 dark:stroke-blue-400" strokeWidth="2" strokeLinecap="round" />
          </svg>
        );

      case 'mymedicine':
        return (
          <svg viewBox="0 0 48 48" fill="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <rect width="48" height="48" rx="12" className="fill-rose-500/10 dark:fill-rose-500/20" />
            {/* Pill Capsule at 45 degree angle */}
            <g transform="rotate(-45 24 24)">
              <rect x="18" y="12" width="12" height="24" rx="6" className="stroke-rose-600 dark:stroke-rose-400" strokeWidth="2.5" />
              <line x1="18" y1="24" x2="30" y2="24" className="stroke-rose-600 dark:stroke-rose-400" strokeWidth="2.5" />
              {/* Medicine Cross */}
              <path d="M22 18H26" className="stroke-rose-600 dark:stroke-rose-400" strokeWidth="2" strokeLinecap="round" />
              <path d="M24 16V20" className="stroke-rose-600 dark:stroke-rose-400" strokeWidth="2" strokeLinecap="round" />
            </g>
          </svg>
        );

      case 'examscriptai':
        return (
          <svg viewBox="0 0 48 48" fill="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <rect width="48" height="48" rx="12" className="fill-indigo-500/10 dark:fill-indigo-500/20" />
            {/* Exam paper sheet */}
            <path
              d="M15 12H27L33 18V36H15V12Z"
              className="stroke-indigo-600 dark:stroke-indigo-400"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
            <path d="M27 12V18H33" className="stroke-indigo-600 dark:stroke-indigo-400" strokeWidth="2" strokeLinejoin="round" />
            {/* Text lines */}
            <path d="M19 22H29" className="stroke-indigo-600 dark:stroke-indigo-400" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M19 26H26" className="stroke-indigo-600 dark:stroke-indigo-400" strokeWidth="1.5" strokeLinecap="round" />
            {/* AI Verified Checkmark */}
            <circle cx="28" cy="30" r="5" className="fill-indigo-600 dark:fill-indigo-500" />
            <path d="M26 30L27.5 31.5L30.5 28.5" className="stroke-white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        );

      case 'baustai':
        return (
          <svg viewBox="0 0 48 48" fill="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <rect width="48" height="48" rx="12" className="fill-amber-500/10 dark:fill-amber-500/20" />
            {/* Academic Cap / Mortarboard */}
            <path
              d="M24 13L37 19L24 25L11 19L24 13Z"
              className="stroke-amber-600 dark:stroke-amber-400"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
            <path
              d="M16 22V29C16 33 24 35 24 35C24 35 32 33 32 29V22"
              className="stroke-amber-600 dark:stroke-amber-400"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            {/* AI circuitry nodes */}
            <circle cx="24" cy="19" r="2" className="fill-amber-600 dark:fill-amber-400" />
            <path d="M37 19V27" className="stroke-amber-600 dark:stroke-amber-400" strokeWidth="2" strokeLinecap="round" />
          </svg>
        );

      case 'myheart':
        return (
          <svg viewBox="0 0 48 48" fill="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <rect width="48" height="48" rx="12" className="fill-rose-500/10 dark:fill-rose-500/20" />
            {/* Anatomical Heart Contour */}
            <path
              d="M24 37C24 37 12 28.5 12 19.5C12 14.5 16 11 20.5 11C23 11 24 13 24 13C24 13 25 11 27.5 11C32 11 36 14.5 36 19.5C36 28.5 24 37 24 37Z"
              className="stroke-rose-600 dark:stroke-rose-400"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
            {/* ECG Sinus Wave Overlay */}
            <path
              d="M15 22H19L21 16L23 27L25 19L27 24H33"
              className="stroke-white dark:stroke-rose-200"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        );

      case 'flowerdoctor':
        return (
          <svg viewBox="0 0 48 48" fill="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <rect width="48" height="48" rx="12" className="fill-emerald-500/10 dark:fill-emerald-500/20" />
            {/* Botanical Flower Petals */}
            <circle cx="24" cy="18" r="4.5" className="stroke-emerald-600 dark:stroke-emerald-400" strokeWidth="2" />
            <circle cx="24" cy="30" r="4.5" className="stroke-emerald-600 dark:stroke-emerald-400" strokeWidth="2" />
            <circle cx="18" cy="24" r="4.5" className="stroke-emerald-600 dark:stroke-emerald-400" strokeWidth="2" />
            <circle cx="30" cy="24" r="4.5" className="stroke-emerald-600 dark:stroke-emerald-400" strokeWidth="2" />
            {/* Health Center Cross */}
            <circle cx="24" cy="24" r="4" className="fill-emerald-600 dark:fill-emerald-400" />
            <path d="M22 24H26" className="stroke-white" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M24 22V26" className="stroke-white" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        );

      case 'flowerdoctorai':
        return (
          <svg viewBox="0 0 48 48" fill="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <rect width="48" height="48" rx="12" className="fill-cyan-500/10 dark:fill-cyan-500/20" />
            {/* AI Computer Vision Bounding Box */}
            <path d="M12 18V12H18" className="stroke-cyan-600 dark:stroke-cyan-400" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M30 12H36V18" className="stroke-cyan-600 dark:stroke-cyan-400" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M36 30V36H30" className="stroke-cyan-600 dark:stroke-cyan-400" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M18 36H12V30" className="stroke-cyan-600 dark:stroke-cyan-400" strokeWidth="2.5" strokeLinecap="round" />
            {/* Scanned Flower Blossom */}
            <circle cx="24" cy="24" r="6" className="stroke-cyan-600 dark:stroke-cyan-400" strokeWidth="2" />
            <circle cx="24" cy="24" r="2.5" className="fill-cyan-600 dark:fill-cyan-400" />
            <path d="M24 15V18" className="stroke-cyan-600 dark:stroke-cyan-400" strokeWidth="1.5" />
            <path d="M24 30V33" className="stroke-cyan-600 dark:stroke-cyan-400" strokeWidth="1.5" />
            <path d="M15 24H18" className="stroke-cyan-600 dark:stroke-cyan-400" strokeWidth="1.5" />
            <path d="M30 24H33" className="stroke-cyan-600 dark:stroke-cyan-400" strokeWidth="1.5" />
          </svg>
        );

      case 'flowerdoctorbd':
        return (
          <svg viewBox="0 0 48 48" fill="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <rect width="48" height="48" rx="12" className="fill-emerald-500/10 dark:fill-emerald-500/20" />
            {/* Bangladesh Geographic / Green Sun Motif */}
            <circle cx="24" cy="24" r="14" className="stroke-emerald-600 dark:stroke-emerald-400" strokeWidth="2" strokeDasharray="3 3" />
            <circle cx="24" cy="24" r="8" className="fill-rose-500/80 dark:fill-rose-500/90" />
            {/* Water Lily / Lotus Petals */}
            <path
              d="M24 16C24 16 27 21 27 24C27 26 25.5 27 24 27C22.5 27 21 26 21 24C21 21 24 16 24 16Z"
              className="fill-white"
            />
            <path
              d="M17 24C17 24 21 26 23 25C24 24.5 24 23 23 22C21.5 20.5 17 24 17 24Z"
              className="fill-white/80"
            />
            <path
              d="M31 24C31 24 27 26 25 25C24 24.5 24 23 25 22C26.5 20.5 31 24 31 24Z"
              className="fill-white/80"
            />
          </svg>
        );

      default:
        return (
          <svg viewBox="0 0 48 48" fill="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <rect width="48" height="48" rx="12" className="fill-slate-500/10 dark:fill-slate-500/20" />
            <circle cx="24" cy="24" r="10" className="stroke-slate-600 dark:stroke-slate-400" strokeWidth="2.5" />
            <path d="M24 18V24L28 28" className="stroke-slate-600 dark:stroke-slate-400" strokeWidth="2" strokeLinecap="round" />
          </svg>
        );
    }
  };

  return (
    <div className={`shrink-0 inline-flex items-center justify-center ${currentSize} ${className}`}>
      {renderSvg()}
    </div>
  );
};

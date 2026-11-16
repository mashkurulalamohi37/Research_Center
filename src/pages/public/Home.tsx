import React from 'react';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { DivisionsNavRail } from '../../components/home/DivisionsNavRail';
import { CenterHeroStage } from '../../components/home/CenterHeroStage';
import { VideoCarousel } from '../../components/home/VideoCarousel';

export const Home: React.FC = () => {
  useDocumentTitle('AIRIC | Advanced Intelligence Research Innovation Commercialization Institute');

  return (
    <div className="flex-1 min-h-0 h-full w-full flex flex-col lg:flex-row overflow-hidden relative bg-slate-100/70 dark:bg-slate-950">
      {/* Left Navigation Rail (10 Divisions with Subtitles & Hover Flyouts) */}
      <div className="w-full lg:w-[275px] xl:w-[295px] h-auto lg:h-full shrink-0 z-30">
        <DivisionsNavRail />
      </div>

      {/* Main Stage: Upper Hero Stage + Bottom-Right Studio Video Carousel */}
      <div className="flex-1 min-w-0 h-full flex flex-col justify-between p-2 sm:p-3 lg:p-4 overflow-hidden relative">
        {/* Center Hero Stage (Starts directly from nav bar) */}
        <div className="shrink-0 w-full pt-0.5">
          <CenterHeroStage />
        </div>

        {/* Bottom-Right Video Carousel Module */}
        <div className="w-full max-w-3xl xl:max-w-4xl ml-auto h-[255px] sm:h-[280px] md:h-[300px] xl:h-[320px] shrink-0 z-10">
          <VideoCarousel />
        </div>
      </div>
    </div>
  );
};

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Maximize2,
  Sliders,
  Plus,
  Copy,
  Trash2,
  Sparkles,
  Layers,
  Film,
  Type,
  Music,
  Video,
  LayoutTemplate,
  Wand2,
  Check
} from 'lucide-react';

interface SceneItem {
  id: string;
  sceneNumber: string;
  title: string;
  duration: number; // in seconds
  durationLabel: string;
  badge: string;
  headline: string;
  tagline: string;
  bgGradient: string;
  textColor: string;
  tags: string[];
}

const SCENES: SceneItem[] = [
  {
    id: 'scene-1',
    sceneNumber: 'Scene 01',
    title: 'Quantum Neural Synthesis',
    duration: 5.0,
    durationLabel: '0:05',
    badge: 'AI & Quantum Lab',
    headline: 'MAKE A CAROUSEL VIDEO',
    tagline: 'High-Dimensional Neural Modeling & Quantum Simulation',
    bgGradient: 'from-slate-900 via-indigo-950 to-slate-950',
    textColor: 'text-cyan-400',
    tags: ['Stock Video', 'Neural Net', 'Quantum'],
  },
  {
    id: 'scene-2',
    sceneNumber: 'Scene 02',
    title: 'Genomics & Precision Diagnostics',
    duration: 6.5,
    durationLabel: '0:06',
    badge: 'Healthcare Division',
    headline: 'PRECISION HEALTH AI',
    tagline: 'Real-time multi-omic sequencing and clinical intelligence',
    bgGradient: 'from-slate-900 via-emerald-950 to-slate-950',
    textColor: 'text-emerald-400',
    tags: ['Biotech', 'Genomics', 'Realtime'],
  },
  {
    id: 'scene-3',
    sceneNumber: 'Scene 03',
    title: 'Autonomous Cyber Defense',
    duration: 4.8,
    durationLabel: '0:05',
    badge: 'Cybersecurity Hub',
    headline: 'ZERO-TRUST THREAT SHIELD',
    tagline: 'Autonomous lattice cryptography and active vector interception',
    bgGradient: 'from-slate-900 via-sky-950 to-slate-950',
    textColor: 'text-sky-400',
    tags: ['Cyber', 'Zero-Trust', 'Defense'],
  },
  {
    id: 'scene-4',
    sceneNumber: 'Scene 04',
    title: 'Commercial Enterprise Hub',
    duration: 7.2,
    durationLabel: '0:07',
    badge: 'Commercial Division',
    headline: 'VENTURE ACCELERATOR',
    tagline: 'Translating breakthrough IP into scalable global enterprises',
    bgGradient: 'from-slate-900 via-blue-950 to-slate-950',
    textColor: 'text-blue-400',
    tags: ['Venture', 'Commercial', 'Fintech'],
  },
];

type AspectRatio = '16:9' | '1:1' | '9:16' | '4:5' | '21:9';

export const StudioVideoCarousel: React.FC = () => {
  const [activeSceneIndex, setActiveSceneIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(1.7);
  const [isMuted, setIsMuted] = useState(true);
  const [selectedRatio, setSelectedRatio] = useState<AspectRatio>('16:9');
  const [activeStudioTab, setActiveStudioTab] = useState('Video');
  const [activeFilter, setActiveFilter] = useState('Stock Video');

  const currentScene = SCENES[activeSceneIndex];
  const progressPercent = (currentTime / currentScene.duration) * 100;

  // Auto-play timer loop
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= currentScene.duration) {
            // Next scene
            setActiveSceneIndex((idx) => (idx + 1) % SCENES.length);
            return 0;
          }
          return Math.min(prev + 0.1, currentScene.duration);
        });
      }, 100);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, currentScene.duration]);

  // Handle scene change
  const handlePrevScene = () => {
    setActiveSceneIndex((prev) => (prev === 0 ? SCENES.length - 1 : prev - 1));
    setCurrentTime(0);
  };

  const handleNextScene = () => {
    setActiveSceneIndex((prev) => (prev + 1) % SCENES.length);
    setCurrentTime(0);
  };

  const formatTime = (time: number) => {
    const mins = Math.floor(time / 60);
    const secs = (time % 60).toFixed(1);
    const formattedSecs = Number(secs) < 10 ? `0${secs}` : secs;
    return `00:0${mins}.${formattedSecs}`.slice(0, 7);
  };

  const studioTabs = [
    { label: 'Templates', icon: LayoutTemplate },
    { label: 'Media', icon: Film },
    { label: 'Text', icon: Type },
    { label: 'Video', icon: Video },
    { label: 'Audio', icon: Music },
    { label: 'Elements', icon: Sparkles },
    { label: 'Overlays', icon: Layers },
  ];

  const aspectRatios: AspectRatio[] = ['16:9', '1:1', '9:16', '4:5', '21:9'];

  return (
    <div 
      id="studio-video-carousel"
      className="flex flex-col h-full w-full bg-slate-900/95 dark:bg-slate-950/95 border border-slate-700/60 dark:border-slate-800 rounded-xl shadow-2xl backdrop-blur-xl overflow-hidden select-none text-white"
    >
      {/* Top Studio Control Bar */}
      <div className="flex items-center justify-between px-3 py-1.5 border-b border-slate-800 bg-slate-900/80 text-[11px] font-mono">
        <div className="flex items-center gap-1.5 text-slate-300">
          <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-semibold text-white">AIRIC STUDIO</span>
          <span className="text-slate-500">•</span>
          <span className="text-slate-400">Preview Engine</span>
        </div>

        {/* Studio Tools Pills */}
        <div className="flex items-center gap-2">
          {['Transform', 'Filter', 'Adjust', 'Animation'].map((tool) => (
            <button
              key={tool}
              className="px-2 py-0.5 rounded text-[10px] text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              {tool}
            </button>
          ))}
          <button className="text-slate-400 hover:text-white p-1">
            <Sliders className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Main Studio Middle Area: Sidebar + Aspect Ratios + Gallery + Stage */}
      <div className="flex-1 min-h-0 flex overflow-hidden">
        {/* Left Studio Tab Rail (Templates, Media, Text, Video, etc.) */}
        <div className="w-14 sm:w-16 border-r border-slate-800/80 bg-slate-950/60 flex flex-col items-center py-2 gap-2 shrink-0">
          {studioTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeStudioTab === tab.label;
            return (
              <button
                key={tab.label}
                onClick={() => setActiveStudioTab(tab.label)}
                className={`flex flex-col items-center justify-center w-11 h-10 rounded-lg text-[9px] font-medium transition-all ${
                  isActive
                    ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
                title={tab.label}
              >
                <Icon className="w-3.5 h-3.5 mb-0.5" />
                <span className="leading-none scale-90">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Aspect Ratio Switcher Column */}
        <div className="w-12 border-r border-slate-800/60 bg-slate-900/40 flex flex-col items-center py-2 gap-1.5 shrink-0">
          {aspectRatios.map((ratio) => {
            const isSelected = selectedRatio === ratio;
            return (
              <button
                key={ratio}
                onClick={() => setSelectedRatio(ratio)}
                className={`w-9 h-7 rounded border text-[10px] font-mono font-medium flex items-center justify-center transition-all ${
                  isSelected
                    ? 'bg-white text-slate-950 border-white shadow-sm'
                    : 'border-slate-700/80 text-slate-400 hover:text-white hover:border-slate-500'
                }`}
              >
                {ratio}
              </button>
            );
          })}
        </div>

        {/* Mini Scene Cards / Stock Media Gallery (matching wireframe) */}
        <div className="w-36 sm:w-44 border-r border-slate-800/60 bg-slate-900/30 p-2 overflow-y-auto hidden md:flex flex-col gap-2 shrink-0">
          <div className="flex items-center justify-between text-[10px] font-medium text-slate-400 pb-1 border-b border-slate-800/60">
            <span>Stock Clips</span>
            <span className="text-cyan-400 hover:underline cursor-pointer">See all</span>
          </div>

          <div className="grid grid-cols-2 gap-1.5">
            {SCENES.map((scene, idx) => {
              const isActive = idx === activeSceneIndex;
              return (
                <button
                  key={scene.id}
                  onClick={() => {
                    setActiveSceneIndex(idx);
                    setCurrentTime(0);
                  }}
                  className={`group relative rounded-md overflow-hidden border p-1 text-left transition-all ${
                    isActive
                      ? 'border-cyan-500 ring-1 ring-cyan-500/40 bg-cyan-950/20'
                      : 'border-slate-800 hover:border-slate-700 bg-slate-950/40'
                  }`}
                >
                  <div className={`h-10 rounded bg-gradient-to-br ${scene.bgGradient} flex items-center justify-center relative overflow-hidden`}>
                    <span className="text-[8px] font-mono text-cyan-300 font-bold opacity-80">
                      {scene.sceneNumber}
                    </span>
                    <span className="absolute bottom-0.5 right-1 text-[8px] font-mono bg-black/70 px-1 rounded text-white">
                      {scene.durationLabel}
                    </span>
                  </div>
                  <p className="text-[9px] font-medium text-slate-300 truncate mt-1 group-hover:text-white">
                    {scene.title}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Center/Right Video Preview Canvas */}
        <div className="flex-1 min-h-0 flex flex-col items-center justify-center p-1.5 sm:p-2 relative bg-slate-950/80 overflow-hidden">
          {/* Animated Canvas Stage */}
          <div 
            className={`w-full max-w-lg h-full max-h-[175px] rounded-xl bg-gradient-to-br ${currentScene.bgGradient} border border-slate-700/60 shadow-inner relative flex flex-col justify-between p-2 sm:p-3 overflow-hidden`}
          >
            {/* Ambient Animated Light */}
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />

            {/* Top Stage Overlay Info */}
            <div className="flex items-center justify-between z-10">
              <span className="px-2 py-0.5 rounded bg-black/60 backdrop-blur-md text-[9px] font-mono font-semibold text-cyan-300 border border-cyan-500/30">
                {currentScene.badge}
              </span>
              <div className="flex items-center gap-1.5 text-slate-400">
                <span className="text-[9px] font-mono bg-black/50 px-1.5 py-0.5 rounded">
                  {selectedRatio}
                </span>
                <button 
                  onClick={() => setIsMuted(!isMuted)} 
                  className="p-1 rounded bg-black/50 hover:bg-black/80 text-white"
                >
                  {isMuted ? <VolumeX className="w-3 h-3" /> : <Volume2 className="w-3 h-3" />}
                </button>
              </div>
            </div>

            {/* Center Graphic matching wireframe ("MAKE A CAROUSEL VIDEO" & Chevrons) */}
            <div className="flex flex-col items-center justify-center my-auto text-center z-10 py-0.5">
              <div className="flex items-center gap-2 sm:gap-3">
                <span className="text-base sm:text-lg font-black text-slate-500/70 select-none tracking-tighter">
                  &lt;&lt;&lt;
                </span>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentScene.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col items-center"
                  >
                    <span className="text-[9px] tracking-widest text-slate-300 uppercase font-mono">
                      Interactive Showcase
                    </span>
                    <h2 className="text-sm sm:text-base md:text-lg font-black tracking-tight text-white drop-shadow-md font-sans leading-tight">
                      {currentScene.headline}
                    </h2>
                    <p className="text-[9px] sm:text-[10px] text-cyan-300/90 font-medium max-w-xs truncate">
                      {currentScene.tagline}
                    </p>
                  </motion.div>
                </AnimatePresence>
                <span className="text-base sm:text-lg font-black text-slate-500/70 select-none tracking-tighter">
                  &gt;&gt;&gt;
                </span>
              </div>
            </div>

            {/* Bottom Preview State Watermark */}
            <div className="flex items-center justify-between text-[9px] text-slate-400 z-10">
              <div className="flex items-center gap-1.5 font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                <span>AIRIC R&D PREVIEW</span>
              </div>
              <span className="font-mono text-slate-400">
                {formatTime(currentTime)} / 00:0{currentScene.durationLabel.replace('0:', '')}.0
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Playback Controls & Scene Navigation Bar (matching wireframe bottom controls) */}
      <div className="px-3 py-1.5 bg-slate-900 border-t border-slate-800 flex items-center justify-between gap-3 text-xs">
        {/* Left: Active Scene Badge */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-800 border border-slate-700 text-cyan-400 font-mono text-[11px] font-semibold">
            <Play className="w-2.5 h-2.5 fill-current" />
            <span>{currentScene.sceneNumber}</span>
          </div>
          <span className="text-[11px] text-slate-400 font-mono hidden sm:inline">
            {activeSceneIndex + 1} / {SCENES.length}
          </span>
        </div>

        {/* Center: Transport Controls (Prev, Play/Pause, Next) */}
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrevScene}
            className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title="Previous Scene"
          >
            <SkipBack className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-7 h-7 rounded-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 flex items-center justify-center shadow-md shadow-cyan-500/30 transition-transform active:scale-95"
            title={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? (
              <Pause className="w-3.5 h-3.5 fill-current" />
            ) : (
              <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
            )}
          </button>

          <button
            onClick={handleNextScene}
            className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title="Next Scene"
          >
            <SkipForward className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Right: Time Readout & Volume */}
        <div className="flex items-center gap-3 font-mono text-[11px] text-slate-400">
          <span>{formatTime(currentTime)} / 00:0{currentScene.durationLabel.replace('0:', '')}.0</span>
          <button 
            onClick={() => setIsMuted(!isMuted)}
            className="hover:text-white"
          >
            {isMuted ? <VolumeX className="w-3 h-3 text-slate-500" /> : <Volume2 className="w-3 h-3 text-cyan-400" />}
          </button>
        </div>
      </div>

      {/* Bottom Timeline Bar (matching wireframe) */}
      <div className="px-3 py-1.5 bg-slate-950 border-t border-slate-800/80 flex items-center gap-2 text-[10px]">
        {/* Timeline Label & Add Scene */}
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="font-semibold text-slate-300 font-mono">Timeline</span>
          <button 
            onClick={handleNextScene}
            className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700/60"
          >
            <Plus className="w-2.5 h-2.5" />
            <span>Add Scene</span>
          </button>
          <div className="flex items-center text-slate-500 gap-1 ml-1">
            <Copy className="w-2.5 h-2.5 hover:text-slate-300 cursor-pointer" />
            <Trash2 className="w-2.5 h-2.5 hover:text-slate-300 cursor-pointer" />
          </div>
        </div>

        {/* Multi-Scene Timeline Tracks with active scrubber */}
        <div className="flex-1 flex items-center gap-1.5 bg-slate-900/90 rounded-md p-1 border border-slate-800">
          {SCENES.map((scene, idx) => {
            const isActive = idx === activeSceneIndex;
            return (
              <div
                key={scene.id}
                onClick={() => {
                  setActiveSceneIndex(idx);
                  setCurrentTime(0);
                }}
                className={`h-4 rounded flex-1 cursor-pointer relative overflow-hidden transition-all ${
                  isActive ? 'bg-slate-800 ring-1 ring-cyan-500/50' : 'bg-slate-950/60 hover:bg-slate-800/50'
                }`}
              >
                {isActive && (
                  <div
                    className="absolute top-0 bottom-0 left-0 bg-cyan-500/70"
                    style={{ width: `${progressPercent}%` }}
                  />
                )}
                <div className="absolute inset-0 flex items-center justify-between px-1.5 text-[8px] font-mono text-slate-300 z-10 pointer-events-none">
                  <span className="truncate">{scene.sceneNumber}</span>
                  <span className="text-slate-500">{scene.durationLabel}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  Volume2,
  VolumeX,
  Maximize2,
  Film,
  Sparkles,
  Clock,
  User,
  ExternalLink,
  Layers,
  Radio,
  Tv
} from 'lucide-react';

export interface VideoSlide {
  id: string;
  title: string;
  division: string;
  divisionSlug: string;
  speaker: string;
  role: string;
  duration: string;
  durationSeconds: number;
  tag: string;
  description: string;
  gradient: string;
  accentBadge: string;
  accentText: string;
}

const VIDEO_SLIDES: VideoSlide[] = [
  {
    id: 'vid-1',
    title: 'Quantum Neural Computing: Cryogenic Testbed Keynote',
    division: 'AI & Quantum Division',
    divisionSlug: '/divisions/ai-quantum',
    speaker: 'Dr. Elena Vance',
    role: 'Lead Quantum Scientist',
    duration: '03:45',
    durationSeconds: 225,
    tag: 'Annual Keynote',
    description: 'Demonstrating 128-qubit quantum-classical co-processing for ultra-fast deep neural network parameter optimization.',
    gradient: 'from-indigo-950 via-slate-900 to-cyan-950',
    accentBadge: 'bg-cyan-500/15 border-cyan-500/30 text-cyan-300',
    accentText: 'text-cyan-400',
  },
  {
    id: 'vid-2',
    title: 'Sub-Millimeter 3D Neural Vascular Splatting in Surgery',
    division: 'Healthcare Division',
    divisionSlug: '/divisions/healthcare',
    speaker: 'Dr. Marcus Sterling',
    role: 'Surgical AI Director',
    duration: '02:30',
    durationSeconds: 150,
    tag: 'Live Clinical Demo',
    description: 'Real-time stereo endoscopic video streams rendering hidden arterial structures at 120 FPS with 0.38mm precision.',
    gradient: 'from-emerald-950 via-slate-900 to-teal-950',
    accentBadge: 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300',
    accentText: 'text-emerald-400',
  },
  {
    id: 'vid-3',
    title: 'Post-Quantum Lattice Cryptography & Zero-Trust Defense',
    division: 'Cybersecurity Division',
    divisionSlug: '/divisions/cybersecurity',
    speaker: 'Dr. Sarah Lin',
    role: 'Principal Cryptographer',
    duration: '04:15',
    durationSeconds: 255,
    tag: 'Technical Briefing',
    description: 'Autonomous lattice encryption defending against simulated sovereign quantum decryption vectors in high-load clusters.',
    gradient: 'from-sky-950 via-slate-900 to-blue-950',
    accentBadge: 'bg-sky-500/15 border-sky-500/30 text-sky-300',
    accentText: 'text-sky-400',
  },
  {
    id: 'vid-4',
    title: 'Translational Deep-Tech: From Lab IP to Scaled Enterprise',
    division: 'Commercial Division',
    divisionSlug: '/divisions/commercialization',
    speaker: 'Alexander Wright',
    role: 'Head of Tech Transfer',
    duration: '05:10',
    durationSeconds: 310,
    tag: 'Venture Documentary',
    description: 'How AIRIC incubated 14 deep-tech spinouts and transferred patented neural computing IP to global industry partners.',
    gradient: 'from-blue-950 via-slate-900 to-indigo-950',
    accentBadge: 'bg-blue-500/15 border-blue-500/30 text-blue-300',
    accentText: 'text-blue-400',
  },
  {
    id: 'vid-5',
    title: 'Autonomous Swarm Robotics in Extreme Environments',
    division: 'Innovation Division',
    divisionSlug: '/divisions/innovation',
    speaker: 'Dr. Tariq Al-Mansoor',
    role: 'Robotics Fellow',
    duration: '03:20',
    durationSeconds: 200,
    tag: 'Field Demonstration',
    description: 'Decentralized mesh networks coordinating multi-agent robotic search and 3D topological mapping in GPS-denied environments.',
    gradient: 'from-purple-950 via-slate-900 to-slate-950',
    accentBadge: 'bg-purple-500/15 border-purple-500/30 text-purple-300',
    accentText: 'text-purple-400',
  },
];

export const VideoCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progressPercent, setProgressPercent] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const activeVideo = VIDEO_SLIDES[currentIndex];
  const ROTATE_INTERVAL_MS = 5000; // Auto-cycle every 5 seconds

  // Continuous auto-rotation loop: always keeps changing slides automatically
  useEffect(() => {
    if (!isPlaying) return;

    const tickMs = 50;
    const increment = (tickMs / ROTATE_INTERVAL_MS) * 100;

    const timer = setInterval(() => {
      setProgressPercent((prev) => {
        if (prev >= 100) {
          // Advance to next video slide
          setCurrentIndex((idx) => (idx + 1) % VIDEO_SLIDES.length);
          return 0;
        }
        return prev + increment;
      });
    }, tickMs);

    return () => clearInterval(timer);
  }, [isPlaying]);

  // Animated canvas visualizer (neural wave simulation)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let step = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const width = canvas.width;
      const height = canvas.height;

      // Draw subtle grid
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
      ctx.lineWidth = 1;
      const gridSize = 24;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw dynamic animated sine waves if playing
      if (isPlaying) {
        step += 0.03;
        const waves = [
          { freq: 0.02, amp: 22, color: 'rgba(6, 182, 212, 0.35)', speed: step },
          { freq: 0.035, amp: 14, color: 'rgba(56, 189, 248, 0.25)', speed: step * 1.3 },
          { freq: 0.015, amp: 28, color: 'rgba(99, 102, 241, 0.2)', speed: step * 0.7 },
        ];

        waves.forEach((w) => {
          ctx.beginPath();
          ctx.strokeStyle = w.color;
          ctx.lineWidth = 2;
          for (let x = 0; x < width; x += 4) {
            const y = height / 2 + Math.sin(x * w.freq + w.speed) * w.amp;
            if (x === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.stroke();
        });

        // Small audio equalizer bars on bottom left
        ctx.fillStyle = 'rgba(6, 182, 212, 0.7)';
        const barCount = 14;
        const barWidth = 3;
        for (let i = 0; i < barCount; i++) {
          const h = 4 + Math.sin(step * 2 + i * 0.8) * 12 + 6;
          ctx.fillRect(16 + i * 6, height - 16 - h, barWidth, h);
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [isPlaying]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? VIDEO_SLIDES.length - 1 : prev - 1));
    setProgressPercent(0);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % VIDEO_SLIDES.length);
    setProgressPercent(0);
  };

  const handleSelectSlide = (idx: number) => {
    setCurrentIndex(idx);
    setProgressPercent(0);
  };

  return (
    <div
      id="airic-video-carousel"
      className="flex flex-col h-full w-full bg-slate-900/90 dark:bg-slate-950/95 border border-slate-700/60 dark:border-slate-800 rounded-xl shadow-2xl backdrop-blur-xl overflow-hidden select-none text-white relative"
    >
      {/* Top Carousel Navigation Bar */}
      <div className="flex items-center justify-between px-3 py-1.5 border-b border-slate-800/80 bg-slate-900/70 text-[11px] font-mono shrink-0">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-semibold text-[10px]">
            <Radio className="w-2.5 h-2.5 animate-pulse text-cyan-400" />
            <span>AIRIC MEDIA CAROUSEL</span>
          </div>
          <span className="text-[10px] font-mono text-cyan-400/90 bg-cyan-950/40 px-1.5 py-0.5 rounded border border-cyan-500/20 hidden sm:inline">
            AUTO-CHANGING (5s)
          </span>
        </div>

        {/* Carousel Slide Navigator & Arrows */}
        <div className="flex items-center gap-2">
          <span className="text-slate-400 text-[10px] font-mono">
            {currentIndex + 1} / {VIDEO_SLIDES.length}
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={handlePrev}
              className="p-1 rounded bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
              title="Previous Video"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleNext}
              className="p-1 rounded bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
              title="Next Video"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Carousel Split Stage */}
      <div className="flex-1 min-h-0 flex flex-col md:flex-row overflow-hidden">
        {/* Left: Video Player Stage */}
        <div className="h-[195px] sm:h-[220px] md:h-auto md:flex-1 min-h-0 relative flex flex-col justify-between overflow-hidden bg-slate-950 shrink-0 md:shrink">
          {/* Background Canvas simulation with animated waves */}
          <div className={`absolute inset-0 bg-gradient-to-br ${activeVideo.gradient} opacity-90`} />
          <canvas
            ref={canvasRef}
            width={480}
            height={260}
            className="absolute inset-0 w-full h-full object-cover pointer-events-none opacity-80"
          />

          {/* Top Video Stage Overlay (Tag + Live status + Volume) */}
          <div className="relative z-10 flex items-center justify-between p-2.5">
            <div className="flex items-center gap-1.5">
              <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold border backdrop-blur-md ${activeVideo.accentBadge}`}>
                {activeVideo.tag}
              </span>
              <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-black/60 text-slate-300 border border-white/10">
                1080p HD
              </span>
            </div>

            <button
              onClick={() => setIsMuted(!isMuted)}
              className="p-1 rounded-md bg-black/60 hover:bg-black/90 text-slate-300 hover:text-white transition-colors"
              title={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5 text-slate-400" /> : <Volume2 className="w-3.5 h-3.5 text-cyan-400" />}
            </button>
          </div>

          {/* Center Big Play/Pause Action Button with animated beacon */}
          <div className="relative z-10 flex items-center justify-center my-auto">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-11 h-11 rounded-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 flex items-center justify-center shadow-lg shadow-cyan-500/40 transition-transform hover:scale-105 active:scale-95 group"
              title={isPlaying ? 'Pause Video' : 'Play Video'}
            >
              {isPlaying ? (
                <Pause className="w-5 h-5 fill-current" />
              ) : (
                <Play className="w-5 h-5 fill-current ml-0.5" />
              )}
            </button>
          </div>

          {/* Bottom Player Transport Bar */}
          <div className="relative z-10 p-2.5 pt-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent">
            {/* Continuous Autoplay Progress Bar */}
            <div
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const clickX = e.clientX - rect.left;
                const ratio = Math.max(0, Math.min(1, clickX / rect.width));
                setProgressPercent(ratio * 100);
              }}
              className="w-full h-1.5 bg-slate-800 hover:h-2 rounded-full overflow-hidden cursor-pointer relative mb-1.5 transition-all"
              title="Carousel Slide Progress (Auto-cycling every 5s)"
            >
              <div
                className="h-full bg-cyan-400 rounded-full transition-all duration-75 ease-linear"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            {/* Time Indicators & Equalizer */}
            <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                <span className="text-white font-medium">
                  {isPlaying ? `CYCLING (${Math.max(1, Math.ceil((100 - progressPercent) / 20))}s)` : 'PAUSED'}
                </span>
                <span className="text-slate-600">•</span>
                <span className="text-cyan-300 font-semibold">{activeVideo.duration}</span>
              </div>
              <span className="text-[9px] text-slate-400 tracking-wider">
                AIRIC BROADCAST • 0{currentIndex + 1}
              </span>
            </div>
          </div>
        </div>

        {/* Right: Active Video Information & Slide Selector Cards */}
        <div className="w-full md:w-[280px] xl:w-[310px] border-t md:border-t-0 md:border-l border-slate-800/80 bg-slate-950/60 p-3 flex flex-col justify-between shrink-0 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeVideo.id}
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.25 }}
              className="flex-1 flex flex-col justify-between"
            >
              <div>
                {/* Division Link */}
                <Link
                  to={activeVideo.divisionSlug}
                  className={`inline-flex items-center gap-1 text-[10px] font-mono font-bold ${activeVideo.accentText} hover:underline mb-1`}
                >
                  <span>{activeVideo.division}</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </Link>

                {/* Video Title */}
                <h3 className="text-xs sm:text-[13px] font-black text-white leading-snug line-clamp-2 mb-1">
                  {activeVideo.title}
                </h3>

                {/* Speaker & Role */}
                <div className="flex items-center gap-1.5 text-[10px] text-slate-400 mb-1.5">
                  <User className="w-3 h-3 text-slate-500 shrink-0" />
                  <span className="font-semibold text-slate-200">{activeVideo.speaker}</span>
                  <span className="text-slate-600">•</span>
                  <span className="text-slate-400 truncate">{activeVideo.role}</span>
                </div>

                {/* Brief Summary */}
                <p className="text-[10px] text-slate-400 leading-relaxed line-clamp-2 mb-2">
                  {activeVideo.description}
                </p>
              </div>

              {/* Slide Thumbnail Dots / Pager */}
              <div className="pt-2 border-t border-slate-800/80">
                <div className="flex items-center justify-between text-[9px] font-mono text-slate-500 mb-1.5">
                  <span>SELECT VIDEO SLIDE</span>
                  <span className="text-cyan-400 font-semibold">{currentIndex + 1} OF 5</span>
                </div>
                <div className="grid grid-cols-5 gap-1.5">
                  {VIDEO_SLIDES.map((slide, idx) => {
                    const isSelected = idx === currentIndex;
                    return (
                      <button
                        key={slide.id}
                        onClick={() => handleSelectSlide(idx)}
                        className={`h-7 rounded border flex flex-col items-center justify-center text-[9px] font-mono font-bold transition-all ${
                          isSelected
                            ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 ring-1 ring-cyan-500/50'
                            : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                        }`}
                        title={slide.title}
                      >
                        <span>0{idx + 1}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  alpha: number;
}

export const HeroCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 650);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
      if (prefersReducedMotion) {
        drawStaticBackground();
      }
    };
    window.addEventListener('resize', handleResize);

    const drawStaticBackground = () => {
      ctx.clearRect(0, 0, width, height);
      const isDark = document.documentElement.classList.contains('dark');
      const grad = ctx.createRadialGradient(width / 2, height / 2, 50, width / 2, height / 2, width / 1.5);
      if (isDark) {
        grad.addColorStop(0, 'rgba(0, 229, 255, 0.05)');
        grad.addColorStop(1, 'rgba(5, 11, 20, 0)');
      } else {
        grad.addColorStop(0, 'rgba(14, 165, 233, 0.05)');
        grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
      }
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);
    };

    if (prefersReducedMotion) {
      drawStaticBackground();
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }

    const particleCount = Math.min(Math.floor((width * height) / 18000), 45);
    const particles: Particle[] = [];
    const lightColors = ['#0284c7', '#0ea5e9', '#6366f1', '#2563eb', '#38bdf8'];
    const darkColors = ['#00e5ff', '#38bdf8', '#818cf8', '#67e8f9', '#ffffff'];

    const getColors = () => {
      const isDark = document.documentElement.classList.contains('dark');
      return isDark ? darkColors : lightColors;
    };

    const currentColors = getColors();

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 1.5 + 1,
        color: currentColors[Math.floor(Math.random() * currentColors.length)],
        alpha: Math.random() * 0.5 + 0.2,
      });
    }

    let mouseX = -1000;
    let mouseY = -1000;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      const isDark = document.documentElement.classList.contains('dark');

      // Draw subtle background radial gradient
      const grad = ctx.createRadialGradient(width / 2, height / 2, 50, width / 2, height / 2, width / 1.5);
      if (isDark) {
        grad.addColorStop(0, 'rgba(0, 229, 255, 0.05)');
        grad.addColorStop(1, 'rgba(5, 11, 20, 0)');
      } else {
        grad.addColorStop(0, 'rgba(14, 165, 233, 0.06)');
        grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
      }
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Update & Draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Interaction with mouse cursor
        const dx = mouseX - p.x;
        const dy = mouseY - p.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 100) {
          const force = (100 - dist) / 100;
          p.x -= (dx / dist) * force * 1.2;
          p.y -= (dy / dist) * force * 1.2;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha * (isDark ? 0.7 : 0.5);
        ctx.fill();
        ctx.globalAlpha = 1;

        // Draw connecting lines
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist2 = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist2 < 100) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = isDark ? '#00e5ff' : '#0284c7';
            ctx.globalAlpha = (1 - dist2 / 100) * (isDark ? 0.18 : 0.12);
            ctx.lineWidth = 0.7;
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-auto opacity-70"
    />
  );
};

import React, { useRef, useEffect } from 'react';
import { MemoryItem } from '../types/memory';
import { getMemoryCategoryType, getTargetDustColors, DustRgb } from '../logic/memoryGraph';

interface BackgroundMemoryDustProps {
  selectedMemory: MemoryItem | null;
}

interface DustParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  baseAlpha: number;
  alphaPhase: number;
  alphaSpeed: number;
  wobbleSpeed: number;
  wobbleDistance: number;
  isGlowMote: boolean;
  colorType: 'primary' | 'secondary' | 'glow';
}

export const BackgroundMemoryDust: React.FC<BackgroundMemoryDustProps> = ({ selectedMemory }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<DustParticle[]>([]);
  const animFrameRef = useRef<number | null>(null);

  // Current interpolated RGB colors (for smooth chromatic transitions)
  const currentColorsRef = useRef<{
    primary: DustRgb;
    secondary: DustRgb;
    glow: DustRgb;
  }>({
    primary: { r: 217, g: 130, b: 43 },
    secondary: { r: 180, g: 90, b: 25 },
    glow: { r: 245, g: 158, b: 11 }
  });

  const category = getMemoryCategoryType(selectedMemory);
  const targetColors = getTargetDustColors(category);

  // Initialize dust particle pool
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const initDust = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      const ctx = canvas.getContext('2d');
      if (ctx) ctx.scale(dpr, dpr);

      // Create drifting particles
      const count = 160;
      const particles: DustParticle[] = [];

      for (let i = 0; i < count; i++) {
        const isGlowMote = Math.random() < 0.2;
        const colorRand = Math.random();
        const colorType = colorRand < 0.55 ? 'primary' : colorRand < 0.85 ? 'secondary' : 'glow';

        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.48) * 0.35, // slight gentle rightward drift
          vy: -Math.random() * 0.45 - 0.1,  // slow upward buoyant drift like dust motes
          size: isGlowMote ? Math.random() * 2.2 + 1.8 : Math.random() * 1.6 + 0.7,
          baseAlpha: Math.random() * 0.35 + 0.15,
          alphaPhase: Math.random() * Math.PI * 2,
          alphaSpeed: Math.random() * 0.02 + 0.008,
          wobbleSpeed: Math.random() * 0.015 + 0.005,
          wobbleDistance: Math.random() * 1.5 + 0.5,
          isGlowMote,
          colorType
        });
      }

      particlesRef.current = particles;
    };

    initDust();
    window.addEventListener('resize', initDust);

    return () => {
      window.removeEventListener('resize', initDust);
    };
  }, []);

  // Main animation and color interpolation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let time = 0;

    const render = () => {
      time += 0.016;
      const width = window.innerWidth;
      const height = window.innerHeight;

      ctx.clearRect(0, 0, width, height);

      // Smoothly lerp current RGB colors toward targetColors (sepia <-> blue)
      const lerpSpeed = 0.04;
      const cur = currentColorsRef.current;

      cur.primary.r += (targetColors.primary.r - cur.primary.r) * lerpSpeed;
      cur.primary.g += (targetColors.primary.g - cur.primary.g) * lerpSpeed;
      cur.primary.b += (targetColors.primary.b - cur.primary.b) * lerpSpeed;

      cur.secondary.r += (targetColors.secondary.r - cur.secondary.r) * lerpSpeed;
      cur.secondary.g += (targetColors.secondary.g - cur.secondary.g) * lerpSpeed;
      cur.secondary.b += (targetColors.secondary.b - cur.secondary.b) * lerpSpeed;

      cur.glow.r += (targetColors.glow.r - cur.glow.r) * lerpSpeed;
      cur.glow.g += (targetColors.glow.g - cur.glow.g) * lerpSpeed;
      cur.glow.b += (targetColors.glow.b - cur.glow.b) * lerpSpeed;

      // Update and draw particles
      const particles = particlesRef.current;
      const pLen = particles.length;

      for (let i = 0; i < pLen; i++) {
        const p = particles[i];

        // Motion update
        p.alphaPhase += p.alphaSpeed;
        const currentAlpha = p.baseAlpha * (0.6 + Math.sin(p.alphaPhase) * 0.4);

        // Sinusoidal lateral air current
        const lateralWobble = Math.sin(time * p.wobbleSpeed * 60 + p.alphaPhase) * p.wobbleDistance;
        p.x += p.vx + lateralWobble * 0.15;
        p.y += p.vy;

        // Wrap around viewport edges seamlessly
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;

        // Determine particle color from interpolated palette
        const color = cur[p.colorType];
        const r = Math.round(color.r);
        const g = Math.round(color.g);
        const b = Math.round(color.b);

        ctx.save();

        if (p.isGlowMote) {
          // Soft glowing halo around larger dust motes
          const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3.5);
          grad.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${currentAlpha * 0.85})`);
          grad.addColorStop(0.5, `rgba(${r}, ${g}, ${b}, ${currentAlpha * 0.3})`);
          grad.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);

          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 3.5, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Fine drifting dust mote
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${currentAlpha})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [targetColors]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 w-full h-full"
      data-testid="background-memory-dust-canvas"
      aria-hidden="true"
    />
  );
};

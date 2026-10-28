import React, { useRef, useEffect, useState, useCallback } from 'react';
import { MemoryItem, MemoryConnection } from '../types/memory';
import { soundEngine } from '../audio/ambientSynth';

interface MemoryCoreCanvasProps {
  memories: MemoryItem[];
  connections: MemoryConnection[];
  selectedMemoryId: string | null;
  onSelectMemory: (id: string) => void;
  isDriftMode: boolean;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseX: number;
  baseY: number;
  size: number;
  alpha: number;
  type: 'text' | 'dot' | 'petal' | 'waveform';
  text?: string;
  hue: number;
  orbitRadius: number;
  orbitAngle: number;
  orbitSpeed: number;
  layer: number;
}

interface MemoryNode {
  id: string;
  title: string;
  year: number;
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  angle: number;
  radius: number;
  medium: string;
}

const TEXT_FRAGMENTS = [
  '14.X.1994',
  'WHITBY 19:42',
  'ELIZA',
  'CEMPASÚCHIL',
  'UNPOSTED',
  'OCTOBER RAIN',
  '7 YEARS LATER',
  'BRASS 7:42',
  'SOMERSET',
  'CASSETTE #03',
  'OFFLINE-7B',
  'MEMORY DRIFT',
  'STATION LAMP',
  '0 BYTES EGRESS',
  'FORGETTING',
  'PROMISED'
];

export const MemoryCoreCanvas: React.FC<MemoryCoreCanvasProps> = ({
  memories,
  connections,
  selectedMemoryId,
  onSelectMemory,
  isDriftMode
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const nodesRef = useRef<MemoryNode[]>([]);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({ x: 0, y: 0, active: false });
  const animFrameRef = useRef<number | null>(null);
  const [hoveredNode, setHoveredNode] = useState<MemoryNode | null>(null);

  // Initialize Memory Nodes in a celestial orbital arrangement
  useEffect(() => {
    const nodes: MemoryNode[] = memories.map((m, index) => {
      const angle = (index / memories.length) * Math.PI * 2;
      const radius = 170 + (index % 3) * 35;
      return {
        id: m.id,
        title: m.title,
        year: m.year,
        x: 0,
        y: 0,
        targetX: 0,
        targetY: 0,
        angle,
        radius,
        medium: m.medium
      };
    });
    nodesRef.current = nodes;
  }, [memories]);

  // Initialize particle cloud (spectral archive)
  const initParticles = useCallback((width: number, height: number) => {
    const count = 220;
    const particles: Particle[] = [];
    const centerX = width / 2;
    const centerY = height / 2;

    for (let i = 0; i < count; i++) {
      const typeChoice = Math.random();
      let type: Particle['type'] = 'dot';
      let text: string | undefined;

      if (typeChoice < 0.22) {
        type = 'text';
        text = TEXT_FRAGMENTS[Math.floor(Math.random() * TEXT_FRAGMENTS.length)];
      } else if (typeChoice < 0.35) {
        type = 'petal';
      } else if (typeChoice < 0.45) {
        type = 'waveform';
      }

      // Spectral silhouette distribution: concentrated in a subtle upper mantle/figure shape
      const u = Math.random();
      const v = Math.random();
      const orbitRadius = Math.pow(u, 0.7) * (Math.min(width, height) * 0.42);
      const orbitAngle = v * Math.PI * 2;

      // Vertical bias creating a subtle spectral cowl / memory core column
      const yBias = (Math.random() - 0.5) * 80;

      particles.push({
        x: centerX + Math.cos(orbitAngle) * orbitRadius,
        y: centerY + Math.sin(orbitAngle) * (orbitRadius * 0.85) + yBias,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4 - 0.15, // slight upward float like embers/smoke
        baseX: centerX,
        baseY: centerY,
        size: type === 'text' ? 10 : type === 'petal' ? 5 : Math.random() * 2.5 + 1,
        alpha: Math.random() * 0.6 + 0.2,
        type,
        text,
        hue: Math.random() > 0.4 ? 38 : 28, // Amber gold or warm candle orange
        orbitRadius,
        orbitAngle,
        orbitSpeed: (Math.random() * 0.003 + 0.001) * (Math.random() > 0.5 ? 1 : -1),
        layer: Math.floor(Math.random() * 3)
      });
    }

    particlesRef.current = particles;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const updateSize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      const ctx = canvas.getContext('2d');
      if (ctx) ctx.scale(dpr, dpr);
      initParticles(rect.width, rect.height);
    };

    updateSize();
    window.addEventListener('resize', updateSize);

    return () => {
      window.removeEventListener('resize', updateSize);
    };
  }, [initParticles]);

  // Main render animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let time = 0;

    const render = () => {
      time += 0.015;
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      const centerX = width / 2;
      const centerY = height / 2;

      ctx.clearRect(0, 0, width, height);

      // Deep atmospheric background glow (candlelit core)
      const pulse = Math.sin(time * 1.5) * 0.08 + 0.92;
      const selectedPulse = selectedMemoryId ? 1.25 : 1.0;
      const coreRadius = 140 * pulse * selectedPulse;

      const radialGrad = ctx.createRadialGradient(centerX, centerY, 10, centerX, centerY, coreRadius * 2.2);
      radialGrad.addColorStop(0, 'rgba(245, 158, 11, 0.16)');
      radialGrad.addColorStop(0.35, 'rgba(217, 119, 6, 0.07)');
      radialGrad.addColorStop(0.7, 'rgba(180, 83, 9, 0.02)');
      radialGrad.addColorStop(1, 'rgba(15, 14, 13, 0)');

      ctx.fillStyle = radialGrad;
      ctx.beginPath();
      ctx.arc(centerX, centerY, coreRadius * 2.2, 0, Math.PI * 2);
      ctx.fill();

      // Spectral Archive Ghost Silhouette: delicate geometric rings & faint silhouette contours
      ctx.save();
      ctx.strokeStyle = 'rgba(245, 158, 11, 0.12)';
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 6]);

      // Inner memory rings
      ctx.beginPath();
      ctx.ellipse(centerX, centerY, 80 * pulse, 110 * pulse, time * 0.2, 0, Math.PI * 2);
      ctx.stroke();

      ctx.beginPath();
      ctx.ellipse(centerX, centerY, 140 * pulse, 160 * pulse, -time * 0.15, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);

      // Subtle ghost silhouette lines (metaphorical archive shroud)
      ctx.strokeStyle = 'rgba(251, 191, 36, 0.18)';
      ctx.beginPath();
      // Head / upper mantle curve
      ctx.moveTo(centerX - 35, centerY - 80);
      ctx.bezierCurveTo(
        centerX - 40, centerY - 130 + Math.sin(time) * 4,
        centerX + 40, centerY - 130 + Math.cos(time) * 4,
        centerX + 35, centerY - 80
      );
      // Flowing mantle edges
      ctx.bezierCurveTo(
        centerX + 70 + Math.sin(time * 0.8) * 8, centerY - 10,
        centerX + 90 + Math.cos(time * 0.6) * 12, centerY + 80,
        centerX + 40, centerY + 140
      );
      ctx.bezierCurveTo(
        centerX, centerY + 155 + Math.sin(time * 1.2) * 6,
        centerX - 40, centerY + 140,
        centerX - 90 + Math.sin(time * 0.6) * 12, centerY + 80
      );
      ctx.bezierCurveTo(
        centerX - 70 + Math.cos(time * 0.8) * 8, centerY - 10,
        centerX - 35, centerY - 80,
        centerX - 35, centerY - 80
      );
      ctx.stroke();
      ctx.restore();

      // Draw connection filaments between memory nodes
      const nodes = nodesRef.current;
      nodes.forEach((node) => {
        // Compute orbital position
        node.angle += 0.002;
        const targetX = centerX + Math.cos(node.angle) * node.radius;
        const targetY = centerY + Math.sin(node.angle) * (node.radius * 0.7);

        // Smooth lerp
        node.x += (targetX - node.x) * 0.08;
        node.y += (targetY - node.y) * 0.08;
      });

      // Render connections between nodes
      connections.forEach((conn) => {
        const srcNode = nodes.find((n) => n.id === conn.sourceId);
        const tgtNode = nodes.find((n) => n.id === conn.targetId);
        if (!srcNode || !tgtNode) return;

        const isRelatedToSelected = selectedMemoryId === conn.sourceId || selectedMemoryId === conn.targetId;
        const isContradiction = conn.type === 'contradiction' || conn.type === 'temporal_drift';

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(srcNode.x, srcNode.y);

        // Curve passing through center
        const midX = (srcNode.x + tgtNode.x) / 2 + (centerX - (srcNode.x + tgtNode.x) / 2) * 0.4;
        const midY = (srcNode.y + tgtNode.y) / 2 + (centerY - (srcNode.y + tgtNode.y) / 2) * 0.4;
        ctx.quadraticCurveTo(midX, midY, tgtNode.x, tgtNode.y);

        if (isRelatedToSelected) {
          ctx.strokeStyle = isContradiction ? 'rgba(239, 68, 68, 0.7)' : 'rgba(245, 158, 11, 0.85)';
          ctx.lineWidth = 1.8;
          ctx.setLineDash([5, 3]);
        } else if (isDriftMode && isContradiction) {
          ctx.strokeStyle = 'rgba(244, 63, 94, 0.5)';
          ctx.lineWidth = 1.4;
          ctx.setLineDash([3, 4]);
        } else {
          ctx.strokeStyle = 'rgba(217, 119, 6, 0.15)';
          ctx.lineWidth = 0.8;
        }
        ctx.stroke();
        ctx.restore();
      });

      // Render Memory Core Particles
      const particles = particlesRef.current;
      particles.forEach((p) => {
        // Orbit update
        p.orbitAngle += p.orbitSpeed;
        const targetX = p.baseX + Math.cos(p.orbitAngle) * p.orbitRadius;
        const targetY = p.baseY + Math.sin(p.orbitAngle) * (p.orbitRadius * 0.75);

        // Cursor attraction
        if (mouseRef.current.active) {
          const dx = mouseRef.current.x - p.x;
          const dy = mouseRef.current.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 140) {
            const force = (1 - dist / 140) * 3;
            p.vx += (dx / dist) * force;
            p.vy += (dy / dist) * force;
          }
        }

        p.x += (targetX - p.x) * 0.05 + p.vx;
        p.y += (targetY - p.y) * 0.05 + p.vy;
        p.vx *= 0.92;
        p.vy *= 0.92;

        ctx.save();
        if (p.type === 'text' && p.text) {
          ctx.font = '9px "JetBrains Mono", monospace';
          ctx.fillStyle = `rgba(245, 158, 11, ${p.alpha * 0.75})`;
          ctx.fillText(p.text, p.x, p.y);
        } else if (p.type === 'petal') {
          // Floating Marigold petal
          ctx.fillStyle = `rgba(217, 119, 6, ${p.alpha * 0.8})`;
          ctx.beginPath();
          ctx.ellipse(p.x, p.y, p.size, p.size * 2, p.orbitAngle, 0, Math.PI * 2);
          ctx.fill();
        } else if (p.type === 'waveform') {
          // Micro sound wave bars
          ctx.strokeStyle = `rgba(251, 191, 36, ${p.alpha * 0.6})`;
          ctx.lineWidth = 1;
          const barH = Math.sin(time * 3 + p.orbitAngle * 4) * 6 + 4;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y - barH / 2);
          ctx.lineTo(p.x, p.y + barH / 2);
          ctx.stroke();
        } else {
          // Standard luminous amber dust
          ctx.fillStyle = `rgba(245, 158, 11, ${p.alpha})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      });

      // Render Memory Nodes (anchors around the core)
      nodes.forEach((node) => {
        const isSelected = selectedMemoryId === node.id;
        const isHovered = hoveredNode?.id === node.id;

        ctx.save();
        // Outer halo
        if (isSelected || isHovered) {
          ctx.beginPath();
          ctx.arc(node.x, node.y, 16, 0, Math.PI * 2);
          ctx.fillStyle = isSelected ? 'rgba(245, 158, 11, 0.28)' : 'rgba(245, 158, 11, 0.15)';
          ctx.fill();
        }

        // Core marker
        ctx.beginPath();
        ctx.arc(node.x, node.y, isSelected ? 6 : 4, 0, Math.PI * 2);
        ctx.fillStyle = isSelected ? '#FBBF24' : '#D97706';
        ctx.shadowColor = '#F59E0B';
        ctx.shadowBlur = isSelected ? 12 : 6;
        ctx.fill();

        // Node label
        ctx.font = '10px "Plus Jakarta Sans", sans-serif';
        ctx.fillStyle = isSelected ? '#FDE68A' : 'rgba(214, 206, 190, 0.8)';
        ctx.shadowBlur = 0;
        ctx.fillText(`${node.year} · ${node.title}`, node.x + 10, node.y + 3);

        ctx.restore();
      });

      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [connections, selectedMemoryId, hoveredNode, isDriftMode]);

  // Handle pointer interaction on canvas
  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    mouseRef.current = { x, y, active: true };

    // Check hit test against memory nodes
    const found = nodesRef.current.find((n) => {
      const dx = n.x - x;
      const dy = n.y - y;
      return Math.sqrt(dx * dx + dy * dy) < 22;
    });

    setHoveredNode(found || null);
  };

  const handlePointerLeave = () => {
    mouseRef.current.active = false;
    setHoveredNode(null);
  };

  const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const clicked = nodesRef.current.find((n) => {
      const dx = n.x - x;
      const dy = n.y - y;
      return Math.sqrt(dx * dx + dy * dy) < 26;
    });

    if (clicked) {
      soundEngine.playCassetteClick();
      soundEngine.playMemoryRecallChime(440);
      onSelectMemory(clicked.id);
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full flex items-center justify-center overflow-hidden bg-radial from-[#1A1613] via-[#0F0E0D] to-[#080706]"
      data-testid="memory-core-container"
    >
      <canvas
        ref={canvasRef}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        onClick={handleClick}
        className="w-full h-full block cursor-crosshair"
      />

      {/* Floating Center Core Label HUD */}
      <div className="absolute pointer-events-none flex flex-col items-center justify-center text-center">
        <span className="text-[10px] tracking-[0.3em] uppercase text-amber-500/70 font-mono">
          OFFLINE ARCHIVAL GHOST
        </span>
        <h2 className="text-xl md:text-2xl font-serif text-stone-200 tracking-wider mt-1 drop-shadow-md">
          MEMORY CORE
        </h2>
        <div className="flex items-center gap-2 mt-1 text-[11px] text-stone-400 font-sans">
          <span>{memories.length} Archival Fragments</span>
          <span aria-hidden="true" className="text-stone-600">·</span>
          <span>{connections.length} Neural Filaments</span>
        </div>
      </div>

      {/* Interactive Tooltip when hovering over a node */}
      {hoveredNode && (
        <div
          className="absolute pointer-events-none px-3 py-1.5 rounded bg-stone-900/90 border border-amber-600/50 shadow-xl backdrop-blur-md text-left z-20"
          style={{
            left: Math.min(window.innerWidth - 200, Math.max(20, hoveredNode.x + 12)),
            top: Math.max(20, hoveredNode.y - 30)
          }}
        >
          <div className="text-[10px] uppercase font-mono tracking-wider text-amber-400">
            {hoveredNode.year} · {hoveredNode.medium.replace('_', ' ')}
          </div>
          <div className="text-xs font-serif text-stone-200 font-medium">
            {hoveredNode.title}
          </div>
          <div className="text-[9px] text-stone-400 mt-0.5">Click to inspect offline fragment</div>
        </div>
      )}

      {/* Ambient Marigold Embellishment in corner */}
      <div className="absolute bottom-3 left-4 pointer-events-none flex items-center gap-2 text-[11px] text-amber-500/60 font-serif italic">
        <span>Cempasúchil Resonance</span>
        <span className="w-1.5 h-1.5 rounded-full bg-amber-500/60"></span>
        <span className="font-mono text-[9px] not-italic text-stone-500">432 Hz Offline Synth</span>
      </div>
    </div>
  );
};

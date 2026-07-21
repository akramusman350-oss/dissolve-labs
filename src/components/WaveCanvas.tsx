import { useRef, useEffect, useCallback } from 'react';

interface WaveLayer {
  baseYFrac: number;
  ampFrac: number;
  freqCycles: number;
  speed: number;
  phase: number;
  phase2: number;
  color1: string;
  color2: string;
}

const LAYERS: WaveLayer[] = [
  { baseYFrac: 0.58, ampFrac: 0.026, freqCycles: 3.2, speed: 0.24, phase: 0, phase2: 1.3, color1: 'rgba(147,197,253,0.26)', color2: 'rgba(191,219,254,0.10)' },
  { baseYFrac: 0.63, ampFrac: 0.038, freqCycles: 2.7, speed: 0.40, phase: 1.7, phase2: 2.8, color1: 'rgba(96,165,250,0.46)', color2: 'rgba(147,197,253,0.32)' },
  { baseYFrac: 0.68, ampFrac: 0.052, freqCycles: 2.2, speed: 0.58, phase: 3.3, phase2: 0.6, color1: 'rgba(59,130,246,0.62)', color2: 'rgba(96,165,250,0.50)' },
  { baseYFrac: 0.73, ampFrac: 0.062, freqCycles: 1.8, speed: 0.76, phase: 4.9, phase2: 1.9, color1: 'rgba(37,99,235,0.88)', color2: 'rgba(29,78,216,0.96)' },
];

function waveY(layer: WaveLayer, x: number, t: number, W: number, H: number): number {
  const f = (layer.freqCycles / W) * Math.PI * 2;
  return (
    H * layer.baseYFrac +
    H * layer.ampFrac * Math.sin(x * f + t * layer.speed + layer.phase) +
    H * layer.ampFrac * 0.30 * Math.sin(x * f * 2.18 + t * layer.speed * 1.65 + layer.phase2)
  );
}

function waveSlope(layer: WaveLayer, x: number, t: number, W: number, H: number): number {
  const f = (layer.freqCycles / W) * Math.PI * 2;
  return (
    H * layer.ampFrac * f * Math.cos(x * f + t * layer.speed + layer.phase) +
    H * layer.ampFrac * 0.30 * f * 2.18 * Math.cos(x * f * 2.18 + t * layer.speed * 1.65 + layer.phase2)
  );
}

function pathWave(ctx: CanvasRenderingContext2D, layer: WaveLayer, t: number, W: number, H: number) {
  const step = 18;
  ctx.beginPath();
  ctx.moveTo(0, H);
  let px = 0;
  let py = waveY(layer, 0, t, W, H);
  ctx.lineTo(px, py);
  for (let x = step; x <= W + step; x += step) {
    const cx = Math.min(x, W);
    const cy = waveY(layer, cx, t, W, H);
    const mx = (px + cx) / 2;
    ctx.bezierCurveTo(mx, py, mx, cy, cx, cy);
    px = cx;
    py = cy;
  }
  ctx.lineTo(W, H);
  ctx.closePath();
}

function drawShip(ctx: CanvasRenderingContext2D) {
  const NAVY = '#1A2540';
  const NAVY2 = '#243358';
  const RED = '#E23B33';
  const WHITE = '#F6F7F3';
  const WIN = '#9AD4F0';
  const RAIL = '#98A2B4';
  const DARK = '#14170F';

  ctx.save();
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';

  // Rigging
  ctx.strokeStyle = DARK;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(6, -50); ctx.lineTo(-31, -10);
  ctx.moveTo(6, -50); ctx.lineTo(40, -13);
  ctx.stroke();

  // Mast
  ctx.strokeStyle = RAIL;
  ctx.lineWidth = 2.4;
  ctx.beginPath(); ctx.moveTo(6, -28); ctx.lineTo(6, -51); ctx.stroke();
  ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(6, -29); ctx.lineTo(-22, -13); ctx.stroke();

  // Foredeck railing
  ctx.strokeStyle = RAIL;
  ctx.lineWidth = 1.1;
  ctx.beginPath();
  ctx.moveTo(-31, -16); ctx.lineTo(-8, -16);
  for (const px of [-30, -25, -20, -15, -10]) {
    ctx.moveTo(px, -16); ctx.lineTo(px, -11);
  }
  ctx.stroke();

  // Hull
  const hull = () => {
    ctx.beginPath();
    ctx.moveTo(-32, -9);
    ctx.bezierCurveTo(-12, -12, 14, -12, 31, -11);
    ctx.lineTo(40, -12.5);
    ctx.bezierCurveTo(38, -4, 36, 1, 33, 5);
    ctx.bezierCurveTo(14, 10, -12, 10, -29, 6);
    ctx.closePath();
  };
  hull();
  ctx.fillStyle = NAVY;
  ctx.fill();

  // Red bottom
  ctx.save();
  hull();
  ctx.clip();
  ctx.beginPath();
  ctx.moveTo(-34, 2.5);
  ctx.bezierCurveTo(-5, 4, 22, 3, 42, -0.5);
  ctx.lineTo(42, 14); ctx.lineTo(-34, 14); ctx.closePath();
  ctx.fillStyle = RED;
  ctx.fill();
  ctx.restore();

  // Deck sheer
  ctx.strokeStyle = 'rgba(255,255,255,0.45)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(-31, -8.5);
  ctx.bezierCurveTo(-12, -11, 14, -11, 31, -10.2);
  ctx.stroke();

  // Wheelhouse
  ctx.fillStyle = NAVY2;
  ctx.beginPath();
  ctx.roundRect(-7, -27, 22, 16, 2);
  ctx.fill();
  ctx.fillStyle = RED;
  ctx.beginPath();
  ctx.roundRect(-9, -30, 26, 3.4, 1.5);
  ctx.fill();

  // Portholes
  ctx.strokeStyle = WHITE;
  ctx.lineWidth = 1.5;
  for (const wx of [-2.5, 4, 10.5]) {
    ctx.fillStyle = WIN;
    ctx.beginPath();
    ctx.ellipse(wx, -21, 2.3, 3.4, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  }

  ctx.restore();
}

export function WaveCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const stateRef = useRef({
    animT: 0,
    lastTs: 0,
    shipX: 0,
    shipVX: 0,
    targetNX: 0.55,
  });

  const prefersReducedMotion = useRef(false);

  useEffect(() => {
    prefersReducedMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const s = stateRef.current;

    const tick = (ts: number) => {
      const dt = Math.min((ts - s.lastTs) / 1000, 0.05);
      s.lastTs = ts;
      s.animT += dt;
      const t = s.animT;

      const W2 = canvas.width / dpr;
      const H2 = canvas.height / dpr;

      // Ship spring physics
      const tx = s.targetNX * W2;
      const dx = tx - s.shipX;
      s.shipVX += (55 * dx - 12 * s.shipVX) * dt;
      s.shipX = Math.max(W2 * 0.07, Math.min(W2 * 0.93, s.shipX + s.shipVX * dt));

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W2, H2);

      // Draw wave layers
      for (const layer of LAYERS) {
        pathWave(ctx, layer, t, W2, H2);
        const g = ctx.createLinearGradient(
          0,
          H2 * layer.baseYFrac - H2 * layer.ampFrac * 2,
          0,
          H2
        );
        g.addColorStop(0, layer.color1);
        g.addColorStop(1, layer.color2);
        ctx.fillStyle = g;
        ctx.fill();
      }

      // Sheen on front wave
      const FRONT = LAYERS[3];
      const step = 18;
      ctx.beginPath();
      let px = 0;
      let py = waveY(FRONT, 0, t, W2, H2) - 1.5;
      ctx.moveTo(px, py);
      for (let x = step; x <= W2 + step; x += step) {
        const cx = Math.min(x, W2);
        const cy = waveY(FRONT, cx, t, W2, H2) - 1.5;
        const mx = (px + cx) / 2;
        ctx.bezierCurveTo(mx, py, mx, cy, cx, cy);
        px = cx;
        py = cy;
      }
      ctx.strokeStyle = 'rgba(255,255,255,0.22)';
      ctx.lineWidth = 2.4;
      ctx.stroke();

      // Draw ship
      const sy = waveY(FRONT, s.shipX, t, W2, H2);
      const tilt = Math.atan(waveSlope(FRONT, s.shipX, t, W2, H2)) * 0.55;
      const bob = Math.sin(t * 2.0 + 0.7) * 2.6 + Math.sin(t * 3.1 + 2.0) * 1.0;
      ctx.save();
      ctx.translate(s.shipX, sy + bob);
      ctx.rotate(tilt);
      drawShip(ctx);
      ctx.restore();

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const dpr = window.devicePixelRatio || 1;

    const resize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      if (stateRef.current.shipX === 0) {
        stateRef.current.shipX = w * 0.62;
      }
    };

    const ro = new ResizeObserver(resize);
    ro.observe(container);
    resize();

    const onMove = (e: MouseEvent) => {
      const r = container.getBoundingClientRect();
      stateRef.current.targetNX = Math.max(0.04, Math.min(0.96, (e.clientX - r.left) / r.width));
    };
    const onLeave = () => {
      stateRef.current.targetNX = 0.55;
    };

    container.addEventListener('mousemove', onMove);
    container.addEventListener('mouseleave', onLeave);

    if (!prefersReducedMotion.current) {
      animate();
    } else {
      // Static fallback — draw once
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const w = container.clientWidth;
        const h = container.clientHeight;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        for (const layer of LAYERS) {
          pathWave(ctx, layer, 0, w, h);
          const g = ctx.createLinearGradient(0, h * layer.baseYFrac, 0, h);
          g.addColorStop(0, layer.color1);
          g.addColorStop(1, layer.color2);
          ctx.fillStyle = g;
          ctx.fill();
        }
      }
    }

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      container.removeEventListener('mousemove', onMove);
      container.removeEventListener('mouseleave', onLeave);
    };
  }, [animate]);

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full pointer-events-auto z-0">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />
    </div>
  );
}

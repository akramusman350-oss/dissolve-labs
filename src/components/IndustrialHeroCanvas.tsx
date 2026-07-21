import { useRef, useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';

export function IndustrialHeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeSpeed, setActiveSpeed] = useState<'normal' | 'turbo' | 'sync'>('normal');
  const [oeeVal, setOeeVal] = useState(96.4);

  const mouseRef = useRef({ x: -1000, y: -1000, active: false });

  // OEE Live fluctuation
  useEffect(() => {
    const interval = setInterval(() => {
      setOeeVal(+(95.6 + Math.random() * 1.8).toFixed(1));
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  const renderCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    let animId: number;
    let t = 0;

    const resize = () => {
      const W = container.clientWidth;
      const H = container.clientHeight;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      canvas.style.width = W + 'px';
      canvas.style.height = H + 'px';
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(container);

    const onMove = (e: MouseEvent) => {
      const r = container.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - r.left, y: e.clientY - r.top, active: true };
    };
    const onLeave = () => {
      mouseRef.current.active = false;
    };

    container.addEventListener('mousemove', onMove);
    container.addEventListener('mouseleave', onLeave);

    const speedMult = activeSpeed === 'turbo' ? 2.5 : activeSpeed === 'sync' ? 1.5 : 1.0;

    const tick = () => {
      t += 0.018 * speedMult;
      const W = canvas.width / dpr;
      const H = canvas.height / dpr;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);

      const cx = W / 2;
      const cy = H / 2;

      // ── 1. Industrial Circuit Trace Lines ──
      ctx.strokeStyle = 'rgba(245, 158, 11, 0.18)';
      ctx.lineWidth = 1.5;

      // Horizontal Conveyor Bus Line
      ctx.beginPath();
      ctx.moveTo(0, cy + 40);
      ctx.lineTo(W, cy + 40);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(0, cy - 40);
      ctx.lineTo(W, cy - 40);
      ctx.stroke();

      // Traveling Amber Data Pulses along lines
      const pulseX1 = (t * 140) % W;
      const pulseX2 = ((t * 140) + W / 2) % W;

      ctx.fillStyle = '#f59e0b';
      ctx.beginPath();
      ctx.arc(pulseX1, cy + 40, 4, 0, Math.PI * 2);
      ctx.fill();

      ctx.beginPath();
      ctx.arc(pulseX2, cy - 40, 4, 0, Math.PI * 2);
      ctx.fill();

      // ── 2. Central Industrial Rotor / Gear (Brand Mark Derived) ──
      ctx.save();
      ctx.translate(cx, cy);

      // Rotating Gear Teeth
      const gearRadius = 52;
      const teethCount = 12;

      ctx.rotate(t * 0.4);
      ctx.beginPath();
      for (let i = 0; i < teethCount; i++) {
        const angle = (i * Math.PI * 2) / teethCount;
        const x1 = Math.cos(angle) * (gearRadius - 6);
        const y1 = Math.sin(angle) * (gearRadius - 6);
        const x2 = Math.cos(angle) * (gearRadius + 8);
        const y2 = Math.sin(angle) * (gearRadius + 8);

        if (i === 0) ctx.moveTo(x1, y1);
        else ctx.lineTo(x1, y1);
        ctx.lineTo(x2, y2);
      }
      ctx.closePath();
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 2.5;
      ctx.stroke();

      // Inner Dissolve Mark Segmented Arc
      const arcRadius = 36;
      for (let i = 0; i < 6; i++) {
        const sa = (i * Math.PI) / 3 - t * 0.8;
        const ea = sa + Math.PI / 4;
        ctx.beginPath();
        ctx.arc(0, 0, arcRadius, sa, ea);
        ctx.strokeStyle = '#2563EB';
        ctx.lineWidth = 3;
        ctx.stroke();
      }

      ctx.restore();

      // ── 3. Mouse Inspection Lens Magnifier Overlay ──
      if (mouseRef.current.active) {
        const mx = mouseRef.current.x;
        const my = mouseRef.current.y;

        ctx.save();
        ctx.beginPath();
        ctx.arc(mx, my, 48, 0, Math.PI * 2);
        ctx.strokeStyle = '#f59e0b';
        ctx.lineWidth = 2;
        ctx.fillStyle = 'rgba(245, 158, 11, 0.06)';
        ctx.fill();
        ctx.stroke();

        ctx.font = '600 10px "JetBrains Mono", monospace';
        ctx.fillStyle = '#f59e0b';
        ctx.fillText('PLC: S7-1500', mx - 36, my - 6);
        ctx.fillText('STATUS: OK', mx - 36, my + 10);
        ctx.restore();
      }

      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
      container.removeEventListener('mousemove', onMove);
      container.removeEventListener('mouseleave', onLeave);
    };
  }, [activeSpeed]);

  useEffect(() => {
    renderCanvas();
  }, [renderCanvas]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[420px] lg:h-[500px] flex items-center justify-center"
    >
      {/* Background Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-auto" />

      {/* Speed Mode Control Pills */}
      <div className="absolute top-4 right-4 z-10 flex items-center gap-2 bg-white/80 backdrop-blur-md p-1.5 rounded-full border border-line shadow-sm">
        {(['normal', 'turbo', 'sync'] as const).map((s) => (
          <button
            key={s}
            onClick={() => setActiveSpeed(s)}
            className={`px-3.5 py-1.5 rounded-full font-mono text-[11px] font-semibold uppercase tracking-wider transition-all ${
              activeSpeed === s
                ? 'bg-[#f59e0b] text-white shadow-sm'
                : 'text-faint hover:text-txt'
            }`}
          >
            {s === 'normal' ? 'Standard PLC' : s === 'turbo' ? 'High Speed' : 'Multi-Cell Sync'}
          </button>
        ))}
      </div>

      {/* Floating Telemetry Metric */}
      <motion.div
        key={oeeVal}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute bottom-6 left-6 z-10 bg-white/90 backdrop-blur-md border border-line py-2 px-4 rounded-full shadow-md flex items-center gap-2.5 font-mono text-xs text-dim"
      >
        <span className="w-2 h-2 rounded-full bg-[#f59e0b] animate-pulse" />
        <span className="font-bold text-txt">OEE: {oeeVal}%</span>
        <span className="text-faint text-[10px]">· REAL-TIME THROUGHPUT</span>
      </motion.div>
    </div>
  );
}

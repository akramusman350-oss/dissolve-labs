import { useRef, useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  label?: string;
  tag?: string;
}

const LABELS = ['YOLOv8', 'LLM', 'RAG', 'PyTorch', 'VectorDB', 'OCR', 'MLOps', 'CUDA'];

export function AiHeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeCapability, setActiveCapability] = useState<'vision' | 'llm' | 'predictive'>('vision');
  const [hoveredMetric, setHoveredMetric] = useState('99.8% Accuracy');

  const mouseRef = useRef({ x: -1000, y: -1000, active: false });

  const renderCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    let animId: number;
    let t = 0;

    const particles: Particle[] = [];
    const particleCount = 28;

    const initParticles = () => {
      const W = canvas.width / dpr;
      const H = canvas.height / dpr;
      particles.length = 0;

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * W,
          y: Math.random() * H,
          vx: (Math.random() - 0.5) * 0.6,
          vy: (Math.random() - 0.5) * 0.6,
          radius: 2 + Math.random() * 2.5,
          alpha: 0.25 + Math.random() * 0.5,
          label: i % 3 === 0 ? LABELS[i % LABELS.length] : undefined,
        });
      }
    };

    const resize = () => {
      const W = container.clientWidth;
      const H = container.clientHeight;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      canvas.style.width = W + 'px';
      canvas.style.height = H + 'px';
      initParticles();
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

    const tick = () => {
      t += 0.016;
      const W = canvas.width / dpr;
      const H = canvas.height / dpr;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);

      const cx = W / 2;
      const cy = H / 2;

      // ── 1. Animated Neural Background Sine Wave ──
      ctx.beginPath();
      ctx.moveTo(0, cy);
      const waveFreq = activeCapability === 'vision' ? 0.015 : activeCapability === 'llm' ? 0.025 : 0.035;
      const waveAmp = activeCapability === 'vision' ? 24 : activeCapability === 'llm' ? 36 : 18;

      for (let x = 0; x <= W; x += 10) {
        const y = cy + Math.sin(x * waveFreq + t * 2) * waveAmp + Math.cos(x * 0.01 - t) * 12;
        ctx.lineTo(x, y);
      }
      ctx.strokeStyle = 'rgba(167, 139, 250, 0.25)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // ── 2. Signature Dissolve Mark Central Neural Core ──
      ctx.save();
      ctx.translate(cx, cy);

      // Rotating Outer Pulse Rings
      for (let r = 1; r <= 3; r++) {
        const rad = 45 + r * 30 + Math.sin(t * 2 + r) * 6;
        ctx.beginPath();
        ctx.arc(0, 0, rad, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(167, 139, 250, ${0.12 / r})`;
        ctx.lineWidth = 1.2;
        ctx.stroke();
      }

      // Dissolve Mark Arcs (Signature Brand Circle)
      const arcRadius = 55;
      const opacitySteps = [1, 0.82, 0.64, 0.46, 0.28, 0.1];
      for (let i = 0; i < 6; i++) {
        const startAngle = (i * Math.PI) / 3 + t * 0.4;
        const endAngle = startAngle + Math.PI / 4;
        ctx.beginPath();
        ctx.arc(0, 0, arcRadius, startAngle, endAngle);
        ctx.strokeStyle = '#2563EB';
        ctx.globalAlpha = opacitySteps[i];
        ctx.lineWidth = 3.5;
        ctx.stroke();
      }
      ctx.globalAlpha = 1;

      // Central glowing neural dot
      ctx.beginPath();
      ctx.arc(0, 0, 7 + Math.sin(t * 3) * 2, 0, Math.PI * 2);
      ctx.fillStyle = '#a78bfa';
      ctx.shadowColor = '#a78bfa';
      ctx.shadowBlur = 15;
      ctx.fill();
      ctx.shadowBlur = 0;

      ctx.restore();

      // ── 3. Interactive Floating Neural Data Particles ──
      particles.forEach((p, idx) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;

        // Mouse attraction
        if (mouseRef.current.active) {
          const dx = mouseRef.current.x - p.x;
          const dy = mouseRef.current.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 140) {
            p.x += (dx / dist) * 0.8;
            p.y += (dy / dist) * 0.8;
          }
        }

        // Draw particle node
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = idx % 2 === 0 ? '#2563EB' : '#a78bfa';
        ctx.globalAlpha = p.alpha;
        ctx.fill();
        ctx.globalAlpha = 1;

        // Connect nearby particles with hairline neural vectors
        for (let j = idx + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 110) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = 'rgba(167, 139, 250, 0.14)';
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }

        // Render micro tag label
        if (p.label) {
          ctx.font = '500 10px "JetBrains Mono", monospace';
          ctx.fillStyle = '#5B6B8A';
          ctx.fillText(p.label, p.x + 8, p.y + 3);
        }
      });

      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
      container.removeEventListener('mousemove', onMove);
      container.removeEventListener('mouseleave', onLeave);
    };
  }, [activeCapability]);

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

      {/* Floating Capability Selector Pills */}
      <div className="absolute top-4 right-4 z-10 flex items-center gap-2 bg-white/80 backdrop-blur-md p-1.5 rounded-full border border-line shadow-sm">
        {(['vision', 'llm', 'predictive'] as const).map((cap) => (
          <button
            key={cap}
            onClick={() => {
              setActiveCapability(cap);
              setHoveredMetric(
                cap === 'vision'
                  ? '120 FPS Inspection'
                  : cap === 'llm'
                  ? '99.8% RAG Precision'
                  : '<14ms Anomaly Stream'
              );
            }}
            className={`px-3.5 py-1.5 rounded-full font-mono text-[11px] font-semibold uppercase tracking-wider transition-all ${
              activeCapability === cap
                ? 'bg-acid text-white shadow-sm'
                : 'text-faint hover:text-txt'
            }`}
          >
            {cap === 'vision' ? 'Computer Vision' : cap === 'llm' ? 'LLM & RAG' : 'Predictive ML'}
          </button>
        ))}
      </div>

      {/* Dynamic Telemetry Floating Badge */}
      <motion.div
        key={hoveredMetric}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute bottom-6 left-6 z-10 bg-white/90 backdrop-blur-md border border-line py-2 px-4 rounded-full shadow-md flex items-center gap-2.5 font-mono text-xs text-dim"
      >
        <span className="w-2 h-2 rounded-full bg-acid animate-pulse" />
        <span className="font-bold text-txt">{hoveredMetric}</span>
        <span className="text-faint text-[10px]">· REAL-TIME EVAL</span>
      </motion.div>
    </div>
  );
}

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface Node {
  x: number;
  y: number;
  layer: number;
  radius: number;
}

interface Connection {
  from: Node;
  to: Node;
  progress: number;
  speed: number;
}

export function AiHeroVisual() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [accuracy, setAccuracy] = useState(99.4);
  const [latency, setLatency] = useState(14);
  const [processed, setProcessed] = useState(12840);

  // Live telemetry pulse effect
  useEffect(() => {
    const interval = setInterval(() => {
      setAccuracy(+(99.3 + Math.random() * 0.5).toFixed(1));
      setLatency(Math.floor(12 + Math.random() * 5));
      setProcessed((prev) => prev + Math.floor(Math.random() * 12 + 1));
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  // Neural network animation canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const dpr = window.devicePixelRatio || 1;

    const resize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(container);

    // Build neural layer structure
    const layerCounts = [4, 6, 6, 3];
    const nodes: Node[] = [];
    const connections: Connection[] = [];

    const buildGraph = () => {
      nodes.length = 0;
      connections.length = 0;

      const w = canvas.width / dpr;
      const h = canvas.height / dpr;

      const layerSpacing = w / (layerCounts.length + 1);

      layerCounts.forEach((count, lIndex) => {
        const x = layerSpacing * (lIndex + 1);
        const nodeSpacing = h / (count + 1);

        for (let i = 0; i < count; i++) {
          const y = nodeSpacing * (i + 1);
          nodes.push({ x, y, layer: lIndex, radius: lIndex === 0 || lIndex === 3 ? 6 : 5 });
        }
      });

      // Connect adjacent layers
      nodes.forEach((n1) => {
        nodes.forEach((n2) => {
          if (n2.layer === n1.layer + 1) {
            connections.push({
              from: n1,
              to: n2,
              progress: Math.random(),
              speed: 0.006 + Math.random() * 0.008,
            });
          }
        });
      });
    };

    buildGraph();

    let mouseX = -1000;
    let mouseY = -1000;

    const onMouseMove = (e: MouseEvent) => {
      const r = container.getBoundingClientRect();
      mouseX = e.clientX - r.left;
      mouseY = e.clientY - r.top;
    };
    const onMouseLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
    };

    container.addEventListener('mousemove', onMouseMove);
    container.addEventListener('mouseleave', onMouseLeave);

    const render = () => {
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      // Draw connection lines
      connections.forEach((c) => {
        ctx.beginPath();
        ctx.moveTo(c.from.x, c.from.y);
        ctx.lineTo(c.to.x, c.to.y);
        ctx.strokeStyle = 'rgba(167, 139, 250, 0.12)';
        ctx.lineWidth = 1.2;
        ctx.stroke();

        // Animate glowing signal pulse traveling along connection
        c.progress += c.speed;
        if (c.progress > 1) c.progress = 0;

        const px = c.from.x + (c.to.x - c.from.x) * c.progress;
        const py = c.from.y + (c.to.y - c.from.y) * c.progress;

        ctx.beginPath();
        ctx.arc(px, py, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = '#a78bfa';
        ctx.shadowColor = '#a78bfa';
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Draw nodes
      nodes.forEach((n) => {
        const dx = mouseX - n.x;
        const dy = mouseY - n.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const hover = dist < 60;

        ctx.beginPath();
        ctx.arc(n.x, n.y, hover ? n.radius + 3 : n.radius, 0, Math.PI * 2);
        ctx.fillStyle = hover ? '#2563EB' : '#a78bfa';
        ctx.shadowColor = hover ? '#2563EB' : '#a78bfa';
        ctx.shadowBlur = hover ? 14 : 6;
        ctx.fill();
        ctx.shadowBlur = 0;

        ctx.beginPath();
        ctx.arc(n.x, n.y, hover ? n.radius + 7 : n.radius + 3, 0, Math.PI * 2);
        ctx.strokeStyle = hover ? 'rgba(37,99,235,0.4)' : 'rgba(167,139,250,0.3)';
        ctx.lineWidth = 1.5;
        ctx.stroke();
      });

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
      container.removeEventListener('mousemove', onMouseMove);
      container.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  return (
    <div className="relative w-full h-[400px] lg:h-[480px] flex items-center justify-center">
      {/* Background card with glassmorphism */}
      <div className="absolute inset-0 bg-white/70 backdrop-blur-md border border-line rounded-2xl shadow-xl overflow-hidden">
        {/* Canvas for Neural Network */}
        <div ref={containerRef} className="absolute inset-0 z-0">
          <canvas ref={canvasRef} className="w-full h-full" />
        </div>

        {/* Floating tech badges */}
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-6 left-6 z-10 bg-white/90 border border-[#a78bfa]/30 px-3.5 py-1.5 rounded-full shadow-sm flex items-center gap-2 font-mono text-[11px] font-semibold text-[#7c3aed]"
        >
          <span className="w-2 h-2 rounded-full bg-[#7c3aed] animate-pulse" />
          YOLOv8 Vision Pipeline
        </motion.div>

        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute top-6 right-6 z-10 bg-white/90 border border-acid/30 px-3.5 py-1.5 rounded-full shadow-sm flex items-center gap-2 font-mono text-[11px] font-semibold text-acid"
        >
          <span className="w-2 h-2 rounded-full bg-acid animate-pulse" />
          LLM Copilot & RAG
        </motion.div>

        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          className="absolute bottom-24 left-6 z-10 bg-white/90 border border-line px-3.5 py-1.5 rounded-full shadow-sm font-mono text-[11px] text-dim"
        >
          ⚡ PyTorch / CUDA Engine
        </motion.div>

        {/* Live Telemetry Bar */}
        <div className="absolute bottom-0 inset-x-0 bg-dim/95 backdrop-blur-md p-4 text-white border-t border-line flex items-center justify-between z-10">
          <div className="flex items-center gap-6">
            <div>
              <div className="font-mono text-[10px] uppercase text-faint tracking-wider">
                Accuracy
              </div>
              <div className="font-display font-bold text-lg text-[#a78bfa]">
                {accuracy}%
              </div>
            </div>
            <div className="h-7 w-[1px] bg-white/10" />
            <div>
              <div className="font-mono text-[10px] uppercase text-faint tracking-wider">
                Latency
              </div>
              <div className="font-display font-bold text-lg text-emerald-400">
                {latency} ms
              </div>
            </div>
            <div className="h-7 w-[1px] bg-white/10 hidden sm:block" />
            <div className="hidden sm:block">
              <div className="font-mono text-[10px] uppercase text-faint tracking-wider">
                Inferences
              </div>
              <div className="font-mono font-bold text-base text-blue-300">
                {processed.toLocaleString()}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 font-mono text-[11px] text-emerald-400 font-semibold bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 rounded-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            LIVE EVAL
          </div>
        </div>
      </div>
    </div>
  );
}

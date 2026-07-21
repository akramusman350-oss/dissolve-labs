import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type VisualMode = 'vision' | 'llm' | 'predictive';

export function AiHeroVisual() {
  const [mode, setMode] = useState<VisualMode>('vision');
  const [inferenceCount, setInferenceCount] = useState(49201);
  const [fps, setFps] = useState(118);

  // FPS & Inference counter simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setInferenceCount((prev) => prev + Math.floor(Math.random() * 8 + 3));
      setFps(Math.floor(115 + Math.random() * 8));
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full rounded-2xl border border-line bg-dim/95 text-white shadow-2xl overflow-hidden backdrop-blur-xl">
      {/* ── Top Control Bar with Capability Tabs ── */}
      <div className="p-4 bg-white/5 border-b border-white/10 flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-mono text-xs font-bold tracking-wider uppercase text-purple-300">
            AI Engine v4.2 · Live Neural Simulator
          </span>
        </div>

        {/* Interactive Capability Switcher */}
        <div className="flex items-center bg-black/40 p-1 rounded-lg border border-white/10 gap-1">
          <button
            onClick={() => setMode('vision')}
            className={`px-3 py-1.5 rounded-md font-mono text-[11px] font-semibold transition-all ${
              mode === 'vision'
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                : 'text-faint hover:text-white'
            }`}
          >
            01 · Vision OCR
          </button>
          <button
            onClick={() => setMode('llm')}
            className={`px-3 py-1.5 rounded-md font-mono text-[11px] font-semibold transition-all ${
              mode === 'llm'
                ? 'bg-acid text-white shadow-lg shadow-acid/30'
                : 'text-faint hover:text-white'
            }`}
          >
            02 · LLM & RAG
          </button>
          <button
            onClick={() => setMode('predictive')}
            className={`px-3 py-1.5 rounded-md font-mono text-[11px] font-semibold transition-all ${
              mode === 'predictive'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
                : 'text-faint hover:text-white'
            }`}
          >
            03 · Predictive ML
          </button>
        </div>
      </div>

      {/* ── Main Interactive Simulation Display Area ── */}
      <div className="relative h-[360px] sm:h-[400px] w-full overflow-hidden bg-gradient-to-b from-black/40 to-dim/90">
        <AnimatePresence mode="wait">
          {mode === 'vision' && <VisionModeVisual key="vision" />}
          {mode === 'llm' && <LlmModeVisual key="llm" />}
          {mode === 'predictive' && <PredictiveModeVisual key="predictive" />}
        </AnimatePresence>
      </div>

      {/* ── Bottom Live Telemetry Footer ── */}
      <div className="p-4 bg-black/60 border-t border-white/10 flex items-center justify-between flex-wrap gap-4 font-mono text-xs">
        <div className="flex items-center gap-6">
          <div>
            <span className="text-[10px] text-faint block uppercase">Inferences</span>
            <span className="font-bold text-white text-base">
              {inferenceCount.toLocaleString()}
            </span>
          </div>
          <div className="h-6 w-[1px] bg-white/10" />
          <div>
            <span className="text-[10px] text-faint block uppercase">Line Speed</span>
            <span className="font-bold text-emerald-400 text-base">{fps} FPS</span>
          </div>
          <div className="h-6 w-[1px] bg-white/10 hidden sm:block" />
          <div className="hidden sm:block">
            <span className="text-[10px] text-faint block uppercase">Evaluation</span>
            <span className="font-bold text-purple-300 text-xs">PASS (99.85%)</span>
          </div>
        </div>

        <div className="flex items-center gap-2 font-mono text-[11px] text-purple-300 bg-purple-500/10 border border-purple-500/30 px-3 py-1 rounded">
          <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-ping" />
          CUDA ACCELERATED
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   MODE 1: Computer Vision & Inspection Simulator
   Features: Animated scanning laser beam, bounding boxes with
   live confidence tracking, dynamic object detection.
   ───────────────────────────────────────────────────────────── */
function VisionModeVisual() {
  const [scanPos, setScanPos] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setScanPos((prev) => (prev >= 100 ? 0 : prev + 1.5));
    }, 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="relative w-full h-full p-6 flex flex-col justify-between"
    >
      {/* Background Grid Pattern */}
      <div
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(167,139,250,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(167,139,250,0.3) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      {/* Laser Scan Line */}
      <div
        className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-purple-400 to-transparent shadow-[0_0_15px_#a78bfa] z-20 pointer-events-none"
        style={{ top: `${scanPos}%` }}
      />

      {/* Detected Bounding Boxes Simulation */}
      <div className="relative z-10 grid grid-cols-2 gap-4 h-full">
        {/* Detection Box 1 */}
        <motion.div
          animate={{ borderColor: ['rgba(167,139,250,0.4)', 'rgba(167,139,250,0.9)', 'rgba(167,139,250,0.4)'] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="relative border-2 border-purple-400/70 bg-purple-500/10 rounded-lg p-3 flex flex-col justify-between"
        >
          <div className="flex justify-between items-center">
            <span className="bg-purple-600 text-white font-mono text-[10px] px-2 py-0.5 rounded font-bold">
              PCB_COMPONENT #482
            </span>
            <span className="font-mono text-[10px] text-emerald-300 font-bold">
              99.82% CONF
            </span>
          </div>
          <div className="font-mono text-[10px] text-purple-200">
            Dimensions: 14.2mm × 8.1mm
            <br />
            Defect Probability: 0.002%
          </div>
          <div className="absolute -top-1 -left-1 w-2.5 h-2.5 border-t-2 border-l-2 border-purple-400" />
          <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 border-b-2 border-r-2 border-purple-400" />
        </motion.div>

        {/* Detection Box 2 */}
        <motion.div
          animate={{ borderColor: ['rgba(37,99,235,0.4)', 'rgba(37,99,235,0.9)', 'rgba(37,99,235,0.4)'] }}
          transition={{ duration: 2.4, repeat: Infinity }}
          className="relative border-2 border-acid/70 bg-acid/10 rounded-lg p-3 flex flex-col justify-between"
        >
          <div className="flex justify-between items-center">
            <span className="bg-acid text-white font-mono text-[10px] px-2 py-0.5 rounded font-bold">
              OCR_SERIAL #88A9F
            </span>
            <span className="font-mono text-[10px] text-emerald-300 font-bold">
              100% READ
            </span>
          </div>
          <div className="font-mono text-[10px] text-blue-200">
            Text: "DL-AI-2026-X7"
            <br />
            Font Match: High
          </div>
          <div className="absolute -top-1 -right-1 w-2.5 h-2.5 border-t-2 border-r-2 border-acid" />
          <div className="absolute -bottom-1 -left-1 w-2.5 h-2.5 border-b-2 border-l-2 border-acid" />
        </motion.div>
      </div>

      {/* Live Status Badge */}
      <div className="relative z-10 mt-3 flex items-center justify-between text-xs font-mono text-faint">
        <span>Model: YOLOv8-Custom-FP16</span>
        <span className="text-purple-300">Active Scan Speed: 120 FPS</span>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────
   MODE 2: LLM Copilot & RAG Transformer Matrix Visualizer
   Features: Live interactive token generation, attention connection
   vectors, and document grounding status.
   ───────────────────────────────────────────────────────────── */
function LlmModeVisual() {
  const [tokens, setTokens] = useState<string[]>([]);
  const fullText = [
    'Retrieving',
    'context',
    'from',
    'vector',
    'database...',
    'Generating',
    'structured',
    'API',
    'response',
    'with',
    'grounded',
    'citations.',
  ];

  useEffect(() => {
    setTokens([]);
    let i = 0;
    const interval = setInterval(() => {
      if (i < fullText.length) {
        setTokens((prev) => [...prev, fullText[i]]);
        i++;
      } else {
        i = 0;
        setTokens([]);
      }
    }, 400);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="relative w-full h-full p-6 flex flex-col justify-between"
    >
      {/* Top Transformer Stats */}
      <div className="flex items-center justify-between border-b border-white/10 pb-3 font-mono text-xs">
        <span className="text-acid font-bold">RAG Vector Search: Qdrant Hybrid</span>
        <span className="text-emerald-400 font-bold">Top-K Similarity: 0.964</span>
      </div>

      {/* Token Streaming Stream Box */}
      <div className="my-auto bg-black/50 border border-white/10 rounded-xl p-4 min-h-[140px] flex flex-wrap content-start gap-2 font-mono text-sm">
        {tokens.map((t, idx) => (
          <motion.span
            key={idx}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-acid/20 text-blue-200 border border-acid/40 px-2.5 py-1 rounded"
          >
            {t}
          </motion.span>
        ))}
        <span className="w-2 h-5 bg-acid animate-pulse inline-block self-center" />
      </div>

      {/* Bottom Attention Nodes */}
      <div className="flex items-center justify-between text-xs font-mono text-faint">
        <span>Embeddings: 1536 Dimensions</span>
        <span className="text-blue-300">Context Window: 128k Tokens</span>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────
   MODE 3: Predictive ML Anomaly Spectrum Visualizer
   Features: Real-time 3D wave canvas with peak outlier detection.
   ───────────────────────────────────────────────────────────── */
function PredictiveModeVisual() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let t = 0;

    const render = () => {
      t += 0.05;
      const w = canvas.width;
      const h = canvas.height;

      ctx.clearRect(0, 0, w, h);

      // Draw real-time sine wave spectrum
      ctx.beginPath();
      ctx.moveTo(0, h / 2);

      for (let x = 0; x < w; x += 3) {
        const y =
          h / 2 +
          Math.sin(x * 0.02 + t) * 35 +
          Math.sin(x * 0.05 - t * 1.5) * 15 +
          (x > w * 0.6 && x < w * 0.7 ? Math.sin(x * 0.2 + t * 4) * 30 : 0); // Anomaly spike
        ctx.lineTo(x, y);
      }

      ctx.strokeStyle = '#10B981';
      ctx.lineWidth = 2.5;
      ctx.shadowColor = '#10B981';
      ctx.shadowBlur = 10;
      ctx.stroke();
      ctx.shadowBlur = 0;

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="relative w-full h-full p-6 flex flex-col justify-between"
    >
      <div className="flex items-center justify-between font-mono text-xs border-b border-white/10 pb-3">
        <span className="text-emerald-400 font-bold">Predictive Time-Series Spectrum</span>
        <span className="text-amber-400 font-bold">Anomaly Risk: LOW (0.01%)</span>
      </div>

      <div className="relative h-[180px] w-full flex items-center justify-center">
        <canvas ref={canvasRef} width={500} height={180} className="w-full h-full" />
        <div className="absolute right-12 top-6 bg-emerald-500/20 border border-emerald-400 text-emerald-300 font-mono text-[10px] px-2.5 py-1 rounded">
          ● NORMAL OPERATING BAND
        </div>
      </div>

      <div className="flex items-center justify-between text-xs font-mono text-faint">
        <span>Data Stream: 50,000 Events/sec</span>
        <span className="text-emerald-400">Forecast Horizon: 90 Days</span>
      </div>
    </motion.div>
  );
}

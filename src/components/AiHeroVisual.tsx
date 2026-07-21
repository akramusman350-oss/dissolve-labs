import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type VisualMode = 'vision' | 'llm' | 'predictive';

export function AiHeroVisual() {
  const [mode, setMode] = useState<VisualMode>('vision');
  const [inferenceCount, setInferenceCount] = useState(49201);
  const [fps, setFps] = useState(120);

  // Live telemetry pulse simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setInferenceCount((prev) => prev + Math.floor(Math.random() * 8 + 3));
      setFps(Math.floor(118 + Math.random() * 5));
    }, 1400);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full rounded-2xl border border-line bg-white text-txt shadow-[0_20px_50px_rgba(20,23,15,0.08)] overflow-hidden">
      {/* ── Top Control Bar with Capability Tabs ── */}
      <div className="p-4 bg-[#EEF3FF] border-b border-line flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-acid animate-pulse" />
          <span className="font-mono text-xs font-bold tracking-wider uppercase text-dim">
            AI Engine v4.2 · Live Neural Simulator
          </span>
        </div>

        {/* Capability Tabs matching DissolveLabs button system */}
        <div className="flex items-center bg-white p-1 rounded-lg border border-line gap-1 shadow-sm">
          <button
            onClick={() => setMode('vision')}
            className={`px-3 py-1.5 rounded font-mono text-[11px] font-semibold transition-all ${
              mode === 'vision'
                ? 'bg-acid text-white shadow-md shadow-acid/20'
                : 'text-faint hover:text-txt'
            }`}
          >
            01 · Vision OCR
          </button>
          <button
            onClick={() => setMode('llm')}
            className={`px-3 py-1.5 rounded font-mono text-[11px] font-semibold transition-all ${
              mode === 'llm'
                ? 'bg-acid text-white shadow-md shadow-acid/20'
                : 'text-faint hover:text-txt'
            }`}
          >
            02 · LLM & RAG
          </button>
          <button
            onClick={() => setMode('predictive')}
            className={`px-3 py-1.5 rounded font-mono text-[11px] font-semibold transition-all ${
              mode === 'predictive'
                ? 'bg-acid text-white shadow-md shadow-acid/20'
                : 'text-faint hover:text-txt'
            }`}
          >
            03 · Predictive ML
          </button>
        </div>
      </div>

      {/* ── Main Simulation Area (Light Palette) ── */}
      <div className="relative h-[360px] sm:h-[400px] w-full overflow-hidden bg-[#F6F7F3]">
        <AnimatePresence mode="wait">
          {mode === 'vision' && <VisionModeVisual key="vision" />}
          {mode === 'llm' && <LlmModeVisual key="llm" />}
          {mode === 'predictive' && <PredictiveModeVisual key="predictive" />}
        </AnimatePresence>
      </div>

      {/* ── Bottom Telemetry Footer ── */}
      <div className="p-4 bg-white border-t border-line flex items-center justify-between flex-wrap gap-4 font-mono text-xs">
        <div className="flex items-center gap-6">
          <div>
            <span className="text-[10px] text-faint block uppercase tracking-wider">
              Inferences
            </span>
            <span className="font-display font-bold text-txt text-lg">
              {inferenceCount.toLocaleString()}
            </span>
          </div>
          <div className="h-6 w-[1px] bg-line" />
          <div>
            <span className="text-[10px] text-faint block uppercase tracking-wider">
              Line Speed
            </span>
            <span className="font-display font-bold text-acid text-lg">
              {fps} FPS
            </span>
          </div>
          <div className="h-6 w-[1px] bg-line hidden sm:block" />
          <div className="hidden sm:block">
            <span className="text-[10px] text-faint block uppercase tracking-wider">
              Accuracy
            </span>
            <span className="font-display font-bold text-dim text-lg">
              99.85%
            </span>
          </div>
        </div>

        <div className="chip chip-ai font-mono text-[11px] flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#7C3AED] animate-ping" />
          EVAL HARNESS PASSED
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   MODE 1: Computer Vision & Inspection Simulator (Light Theme)
   ───────────────────────────────────────────────────────────── */
function VisionModeVisual() {
  const [scanPos, setScanPos] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setScanPos((prev) => (prev >= 100 ? 0 : prev + 1.2));
    }, 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="relative w-full h-full p-6 flex flex-col justify-between"
    >
      {/* Background dot grid */}
      <div
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(16,20,12,0.08) 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }}
      />

      {/* Laser Scan Line in Acid Blue */}
      <div
        className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-acid to-transparent shadow-[0_0_10px_#2563EB] z-20 pointer-events-none"
        style={{ top: `${scanPos}%` }}
      />

      {/* Detected Bounding Boxes */}
      <div className="relative z-10 grid grid-cols-2 gap-4 h-full">
        {/* Detection Box 1 */}
        <motion.div
          animate={{ borderColor: ['rgba(37,99,235,0.3)', 'rgba(37,99,235,0.8)', 'rgba(37,99,235,0.3)'] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="relative border-2 border-acid/60 bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-sm flex flex-col justify-between"
        >
          <div className="flex justify-between items-center">
            <span className="chip chip-saas font-mono text-[10px]">
              PCB_COMPONENT #482
            </span>
            <span className="font-mono text-[11px] font-bold text-acid">
              99.82% CONF
            </span>
          </div>
          <div className="font-mono text-[11px] text-dim space-y-1">
            <div>Dimensions: 14.2mm × 8.1mm</div>
            <div className="text-faint">Defect Prob: 0.002%</div>
          </div>
          <div className="absolute -top-1 -left-1 w-2.5 h-2.5 border-t-2 border-l-2 border-acid" />
          <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 border-b-2 border-r-2 border-acid" />
        </motion.div>

        {/* Detection Box 2 */}
        <motion.div
          animate={{ borderColor: ['rgba(124,58,237,0.3)', 'rgba(124,58,237,0.8)', 'rgba(124,58,237,0.3)'] }}
          transition={{ duration: 2.4, repeat: Infinity }}
          className="relative border-2 border-[#7C3AED]/60 bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-sm flex flex-col justify-between"
        >
          <div className="flex justify-between items-center">
            <span className="chip chip-ai font-mono text-[10px]">
              OCR_SERIAL #88A9F
            </span>
            <span className="font-mono text-[11px] font-bold text-[#7C3AED]">
              100% READ
            </span>
          </div>
          <div className="font-mono text-[11px] text-dim space-y-1">
            <div>Text: "DL-AI-2026-X7"</div>
            <div className="text-faint">Font Match: High</div>
          </div>
          <div className="absolute -top-1 -right-1 w-2.5 h-2.5 border-t-2 border-r-2 border-[#7C3AED]" />
          <div className="absolute -bottom-1 -left-1 w-2.5 h-2.5 border-b-2 border-l-2 border-[#7C3AED]" />
        </motion.div>
      </div>

      {/* Status Footer Line */}
      <div className="relative z-10 mt-3 flex items-center justify-between text-xs font-mono text-faint border-t border-line pt-2">
        <span>Model: YOLOv8-Custom-FP16</span>
        <span className="text-acid font-semibold">Line Speed: 120 FPS</span>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────
   MODE 2: LLM Copilot & RAG (Light Theme)
   ───────────────────────────────────────────────────────────── */
function LlmModeVisual() {
  const [tokens, setTokens] = useState<string[]>([]);
  const fullText = [
    'Retrieving',
    'context',
    'from',
    'Qdrant',
    'vector',
    'database...',
    'Generating',
    'grounded',
    'response',
    'with',
    'verified',
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
    }, 380);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="relative w-full h-full p-6 flex flex-col justify-between"
    >
      <div className="flex items-center justify-between border-b border-line pb-3 font-mono text-xs">
        <span className="text-acid font-bold">RAG Vector Search: Hybrid Index</span>
        <span className="chip chip-web font-mono text-[10px]">Similarity: 0.964</span>
      </div>

      <div className="my-auto bg-white border border-line rounded-xl p-5 min-h-[140px] flex flex-wrap content-start gap-2 font-mono text-sm shadow-sm">
        {tokens.map((t, idx) => (
          <motion.span
            key={idx}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-panel border border-acid/20 text-dim px-2.5 py-1 rounded font-medium"
          >
            {t}
          </motion.span>
        ))}
        <span className="w-2 h-5 bg-acid animate-pulse inline-block self-center" />
      </div>

      <div className="flex items-center justify-between text-xs font-mono text-faint border-t border-line pt-2">
        <span>Embeddings: 1536 Dimensions</span>
        <span className="text-acid font-semibold">Context Window: 128k Tokens</span>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────
   MODE 3: Predictive ML Spectrum (Light Theme)
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

      ctx.beginPath();
      ctx.moveTo(0, h / 2);

      for (let x = 0; x < w; x += 3) {
        const y =
          h / 2 +
          Math.sin(x * 0.02 + t) * 35 +
          Math.sin(x * 0.05 - t * 1.5) * 15 +
          (x > w * 0.6 && x < w * 0.7 ? Math.sin(x * 0.2 + t * 4) * 25 : 0);
        ctx.lineTo(x, y);
      }

      ctx.strokeStyle = '#2563EB';
      ctx.lineWidth = 2.5;
      ctx.stroke();

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
      transition={{ duration: 0.25 }}
      className="relative w-full h-full p-6 flex flex-col justify-between"
    >
      <div className="flex items-center justify-between font-mono text-xs border-b border-line pb-3">
        <span className="text-acid font-bold">Predictive Time-Series Spectrum</span>
        <span className="chip chip-it font-mono text-[10px]">Anomaly Risk: LOW</span>
      </div>

      <div className="relative h-[180px] w-full flex items-center justify-center">
        <canvas ref={canvasRef} width={500} height={180} className="w-full h-full" />
        <div className="absolute right-6 top-4 bg-white border border-acid/30 text-acid font-mono text-[10px] px-2.5 py-1 rounded shadow-sm">
          ● NORMAL OPERATING BAND
        </div>
      </div>

      <div className="flex items-center justify-between text-xs font-mono text-faint border-t border-line pt-2">
        <span>Stream: 50,000 Events/sec</span>
        <span className="text-acid font-semibold">Forecast Horizon: 90 Days</span>
      </div>
    </motion.div>
  );
}

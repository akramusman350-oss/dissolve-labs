import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export function IndustrialHeroVisual() {
  const [oee, setOee] = useState(96.4);
  const [cycleTime, setCycleTime] = useState(1.24);
  const [units, setUnits] = useState(48290);
  const [activeStep, setActiveStep] = useState(1);

  // Live PLC telemetry ticker simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setOee(+(95.8 + Math.random() * 1.4).toFixed(1));
      setCycleTime(+(1.21 + Math.random() * 0.08).toFixed(2));
      setUnits((prev) => prev + Math.floor(Math.random() * 3 + 1));
      setActiveStep((prev) => (prev % 4) + 1);
    }, 1600);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[400px] lg:h-[480px] flex items-center justify-center">
      {/* Outer panel container */}
      <div className="absolute inset-0 bg-white/80 backdrop-blur-md border border-line rounded-2xl shadow-xl overflow-hidden flex flex-col justify-between">
        {/* Top Header Bar */}
        <div className="p-4 border-b border-line bg-[#f59e0b]/5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-amber-500 animate-pulse" />
            <span className="font-mono text-xs font-bold tracking-wider text-amber-700 uppercase">
              Siemens S7-1500 PLC · SCADA Node 04
            </span>
          </div>
          <span className="font-mono text-[11px] font-semibold text-faint bg-white border border-line px-2.5 py-1 rounded">
            PLC ONLINE ● 240Hz
          </span>
        </div>

        {/* Middle Visual Diagram (Circuit & Logic Bus) */}
        <div className="relative flex-1 p-6 flex flex-col justify-center gap-6 bg-gradient-to-br from-amber-500/5 via-transparent to-transparent">
          {/* Animated PLC Ladder Logic Steps */}
          <div className="grid grid-cols-4 gap-3 z-10">
            {[
              { id: 1, label: 'INPUT BUS', code: 'I0.0-I0.7' },
              { id: 2, label: 'LADDER LOGIC', code: 'RUN_MAIN' },
              { id: 3, label: 'MOTION CONTROL', code: 'SERVO_AXIS_1' },
              { id: 4, label: 'SCADA FEED', code: 'OPC_UA_PUB' },
            ].map((step) => {
              const active = step.id === activeStep;
              return (
                <div
                  key={step.id}
                  className={`p-3 rounded-lg border transition-all duration-300 ${
                    active
                      ? 'bg-amber-500 text-white border-amber-500 shadow-md shadow-amber-500/20 scale-[1.03]'
                      : 'bg-white border-line text-dim'
                  }`}
                >
                  <div className="font-mono text-[10px] opacity-75 uppercase tracking-wider mb-1">
                    {step.label}
                  </div>
                  <div className="font-mono font-bold text-xs truncate">
                    {step.code}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Animated Gear & Factory Motor Graphics */}
          <div className="relative h-28 bg-white border border-line rounded-xl p-4 flex items-center justify-around overflow-hidden">
            {/* Background grid */}
            <div
              className="absolute inset-0 opacity-[0.05]"
              style={{
                backgroundImage:
                  'linear-gradient(#f59e0b 1px, transparent 1px), linear-gradient(90deg, #f59e0b 1px, transparent 1px)',
                backgroundSize: '16px 16px',
              }}
            />

            {/* Rotating Gear 1 */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
              className="w-16 h-16 text-amber-500 opacity-80"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
                <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" />
              </svg>
            </motion.div>

            {/* Rotating Gear 2 (counter-rotate) */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              className="w-12 h-12 text-amber-600 opacity-60"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
                <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" />
              </svg>
            </motion.div>

            {/* Line Output Status */}
            <div className="flex flex-col">
              <span className="font-mono text-[10px] text-faint uppercase tracking-wider">
                Production Line Output
              </span>
              <span className="font-display font-bold text-xl text-dim">
                {units.toLocaleString()} Units
              </span>
            </div>
          </div>
        </div>

        {/* Bottom SCADA Telemetry Bar */}
        <div className="bg-dim/95 backdrop-blur-md p-4 text-white border-t border-line flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div>
              <div className="font-mono text-[10px] uppercase text-faint tracking-wider">
                OEE Efficiency
              </div>
              <div className="font-display font-bold text-lg text-amber-400">
                {oee}%
              </div>
            </div>
            <div className="h-7 w-[1px] bg-white/10" />
            <div>
              <div className="font-mono text-[10px] uppercase text-faint tracking-wider">
                Cycle Time
              </div>
              <div className="font-display font-bold text-lg text-emerald-400">
                {cycleTime} s
              </div>
            </div>
            <div className="h-7 w-[1px] bg-white/10 hidden sm:block" />
            <div className="hidden sm:block">
              <div className="font-mono text-[10px] uppercase text-faint tracking-wider">
                Safety Interlocks
              </div>
              <div className="font-mono font-bold text-xs text-emerald-300">
                100% SECURE
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 font-mono text-[11px] text-amber-400 font-semibold bg-amber-500/10 border border-amber-500/30 px-3 py-1 rounded-sm">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            PLANT 04 ACTIVE
          </div>
        </div>
      </div>
    </div>
  );
}

import type { EngageStep } from '../types';
import { ScrollReveal } from './ScrollReveal';

interface EngageCardProps {
  step: EngageStep;
  index: number;
}

export function EngageCard({ step, index }: EngageCardProps) {
  return (
    <ScrollReveal delay={index * 0.1}>
      <div className="group relative bg-white border border-line rounded-[6px] p-8 transition-all duration-300 hover:translate-y-[-4px] hover:shadow-[0_16px_36px_rgba(20,23,15,0.07)] hover:border-acid/30 h-full flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-4">
            <span className="font-mono text-xs font-bold tracking-[0.14em] uppercase text-acid bg-panel py-1 px-3 rounded">
              {step.number}
            </span>
            <span className="font-mono text-[11px] font-semibold text-faint uppercase tracking-wider">
              {step.label}
            </span>
          </div>

          <h3 className="font-display font-bold text-[22px] tracking-tight mb-3 group-hover:text-acid transition-colors">
            {step.title}
          </h3>

          <p className="text-[15px] font-medium leading-[1.65] text-dim m-0">
            {step.description}
          </p>
        </div>

        <div className="mt-6 pt-3 border-t border-line/40 flex items-center justify-between font-mono text-[11px] text-faint">
          <span>Phase {index + 1} of 3</span>
          <span className="text-acid group-hover:translate-x-1 transition-transform">
            →
          </span>
        </div>
      </div>
    </ScrollReveal>
  );
}

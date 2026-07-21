import type { EngageStep } from '../types';
import { ScrollReveal } from './ScrollReveal';

interface EngageCardProps {
  step: EngageStep;
  index: number;
}

export function EngageCard({ step, index }: EngageCardProps) {
  return (
    <ScrollReveal delay={index * 0.1}>
      <div className="bg-white border border-line rounded-[4px] p-7 h-full">
        <div className="font-mono text-xs tracking-[0.12em] text-acid mb-3.5">
          {step.number} — {step.label}
        </div>
        <h3 className="font-display font-bold text-[22px] tracking-tight mb-3">
          {step.title}
        </h3>
        <p className="text-[15px] font-medium leading-[1.65] text-dim m-0">
          {step.description}
        </p>
      </div>
    </ScrollReveal>
  );
}

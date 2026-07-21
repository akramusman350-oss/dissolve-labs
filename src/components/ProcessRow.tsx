import type { ProcessPhase } from '../types';
import { ScrollReveal } from './ScrollReveal';

interface ProcessRowProps {
  phase: ProcessPhase;
  index: number;
}

export function ProcessRow({ phase, index }: ProcessRowProps) {
  return (
    <ScrollReveal delay={index * 0.1}>
      <div className="grid grid-cols-[56px_1fr] md:grid-cols-[120px_240px_1fr] gap-x-8 items-baseline py-7 px-5 border-b border-line rounded-sm transition-all duration-200 hover:bg-white hover:pl-9">
        <div className="font-mono text-xs text-acid tracking-[0.12em] pt-0.5">
          {phase.number}
        </div>
        <h3 className="font-display font-bold text-[26px] tracking-tight m-0">
          {phase.title}
        </h3>
        <p className="text-[15px] font-medium leading-[1.65] text-dim m-0 col-start-2 md:col-start-3">
          {phase.description}
        </p>
      </div>
    </ScrollReveal>
  );
}

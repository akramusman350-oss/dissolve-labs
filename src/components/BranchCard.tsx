import type { SubDivision } from '../types';
import { ScrollReveal } from './ScrollReveal';

interface BranchCardProps {
  sub: SubDivision;
  accentColor: string;
  divisionName: string;
  index: number;
}

export function BranchCard({ sub, accentColor, divisionName, index }: BranchCardProps) {
  return (
    <ScrollReveal delay={index * 0.1}>
      <div
        className="relative bg-white border border-line rounded-[4px] p-[30px_28px] transition-all duration-[220ms] ease-[cubic-bezier(0.2,0.7,0.2,1)] hover:translate-y-[-5px] hover:shadow-[0_16px_40px_rgba(20,23,15,0.1)] overflow-hidden h-full"
        style={{ '--ac': accentColor } as React.CSSProperties}
      >
        {/* Left accent bar */}
        <div
          className="absolute left-0 top-0 bottom-0 w-[3px]"
          style={{ background: accentColor }}
        />

        <div className="flex justify-between items-center mb-[18px]">
          <span
            className="chip"
            style={{ background: `${accentColor}1f`, color: accentColor }}
          >
            {divisionName}
          </span>
          <span
            className="font-mono text-[11px] tracking-[0.08em]"
            style={{ color: accentColor }}
          >
            {sub.index}
          </span>
        </div>

        <h3 className="font-display font-bold text-[22px] tracking-tight mb-3">
          {sub.title}
        </h3>
        <p className="text-[15px] font-medium leading-[1.65] text-dim m-0">
          {sub.description}
        </p>
      </div>
    </ScrollReveal>
  );
}

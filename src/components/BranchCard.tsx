import type { SubDivision } from '../types';
import { ScrollReveal } from './ScrollReveal';

interface BranchCardProps {
  sub: SubDivision;
  accentColor: string;
  divisionName: string;
  index: number;
}

// Custom feature badges per sub-division for visual richness
const BADGE_MAP: Record<string, string> = {
  '03.01': '120 FPS Line Speed',
  '03.02': 'Custom ML Pipelines',
  '03.03': 'Grounded RAG Vector DB',
  '03.04': 'Automated Eval Harness',
  '04.01': 'Siemens & Allen-Bradley',
  '04.02': 'SCADA Real-time Gen-3',
  '04.03': 'Safety Interlocks & Cells',
  '04.04': '99.9% Up-time Visibility',
};

export function BranchCard({ sub, accentColor, divisionName, index }: BranchCardProps) {
  const badgeText = BADGE_MAP[sub.index] || 'Engineered Capability';

  return (
    <ScrollReveal delay={index * 0.1}>
      <div
        className="group relative bg-white border border-line rounded-[6px] p-8 transition-all duration-300 ease-[cubic-bezier(0.2,0.7,0.2,1)] hover:translate-y-[-6px] hover:shadow-[0_20px_45px_rgba(20,23,15,0.09)] overflow-hidden h-full flex flex-col justify-between"
        style={{ '--ac': accentColor } as React.CSSProperties}
      >
        {/* Left accent bar with glow on hover */}
        <div
          className="absolute left-0 top-0 bottom-0 w-[4px] transition-all duration-300 group-hover:w-[6px]"
          style={{ background: accentColor, boxShadow: `0 0 12px ${accentColor}80` }}
        />

        {/* Top Header Row */}
        <div>
          <div className="flex justify-between items-center mb-5">
            <span
              className="chip font-mono text-[11px] font-semibold tracking-wider uppercase py-1 px-3 rounded-full"
              style={{ background: `${accentColor}1f`, color: accentColor }}
            >
              {divisionName}
            </span>
            <span
              className="font-mono text-xs font-bold tracking-[0.1em]"
              style={{ color: accentColor }}
            >
              {sub.index}
            </span>
          </div>

          {/* Title */}
          <h3 className="font-display font-bold text-[24px] tracking-tight mb-3 text-txt group-hover:text-acid transition-colors">
            {sub.title}
          </h3>

          {/* Description */}
          <p className="text-[15px] font-medium leading-[1.68] text-dim m-0">
            {sub.description}
          </p>
        </div>

        {/* Bottom Feature Tag & Arrow */}
        <div className="mt-8 pt-4 border-t border-line/60 flex items-center justify-between">
          <span className="font-mono text-[11px] font-medium uppercase tracking-wider text-faint flex items-center gap-1.5">
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: accentColor }}
            />
            {badgeText}
          </span>
          <span
            className="font-mono text-base font-bold transition-transform duration-300 group-hover:translate-x-1.5"
            style={{ color: accentColor }}
          >
            →
          </span>
        </div>
      </div>
    </ScrollReveal>
  );
}

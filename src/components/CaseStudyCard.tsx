import { useRef } from 'react';
import { useInView } from 'framer-motion';
import type { CaseStudy } from '../types';
import { useCountUp } from '../hooks/useCountUp';
import { ScrollReveal } from './ScrollReveal';

interface CaseStudyCardProps {
  study: CaseStudy;
  index: number;
}

export function CaseStudyCard({ study, index }: CaseStudyCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: '-100px' });
  const countedValue = useCountUp(study.statNumeric ?? 0, { trigger: isInView });

  const displayStat = study.statNumeric
    ? `${study.statPrefix ?? ''}${countedValue}${study.statSuffix ?? ''}`
    : study.stat;

  return (
    <ScrollReveal delay={index * 0.1}>
      <div
        ref={cardRef}
        className="group relative bg-white border border-line rounded-[4px] overflow-hidden cursor-pointer transition-all duration-[220ms] hover:bg-[#F6F9FF] hover:border-acid/30 hover:shadow-[0_12px_30px_rgba(20,23,15,0.08)]"
      >
        {/* Watermark */}
        <div className="absolute right-[-14px] top-[34px] opacity-[0.06] transition-all duration-300 pointer-events-none group-hover:opacity-[0.13] group-hover:scale-[1.08]">
          <svg width="120" height="120" viewBox="0 0 60 60" style={{ overflow: 'visible' }}>
            <path d="M 49.05 19 A 22 22 0 0 1 50.67 37.52" fill="none" stroke="#14170F" strokeWidth="4.5" strokeLinecap="round" opacity="1" />
            <path d="M 50.67 37.52 A 22 22 0 0 1 37.52 50.67" fill="none" stroke="#14170F" strokeWidth="4.5" strokeLinecap="round" opacity="0.82" />
            <path d="M 37.52 50.67 A 22 22 0 0 1 19 49.05" fill="none" stroke="#14170F" strokeWidth="4.5" strokeLinecap="round" opacity="0.64" />
            <path d="M 19 49.05 A 22 22 0 0 1 8.33 33.82" fill="none" stroke="#14170F" strokeWidth="4.5" strokeLinecap="round" opacity="0.46" />
          </svg>
        </div>

        {/* Card row */}
        <div className="flex items-center gap-[18px] py-[22px] px-6 relative z-[1]">
          <span className="font-mono text-xs tracking-[0.14em] text-acid w-[34px] flex-shrink-0">
            {study.index}
          </span>
          <div className="flex-1 min-w-0">
            <div className="font-mono text-[11px] tracking-[0.12em] uppercase text-faint mb-[5px]">
              {study.tag}
            </div>
            <h3 className="font-display font-bold text-[22px] tracking-tight m-0">
              {study.title}
            </h3>
          </div>
          <span className="font-mono text-[11px] py-1 px-2.5 bg-panel text-dim rounded-sm flex-shrink-0">
            {displayStat}
          </span>
          <span className="font-mono text-base text-acid flex-shrink-0 transition-transform duration-300 group-hover:translate-x-[3px] group-hover:translate-y-[-3px]">
            ↗
          </span>
        </div>

        {/* Reveal on hover */}
        <div className="max-h-0 opacity-0 overflow-hidden transition-all duration-[340ms] ease-[cubic-bezier(0.2,0.7,0.2,1)] group-hover:max-h-[200px] group-hover:opacity-100 relative z-[1]">
          <p className="text-[15px] font-medium leading-[1.65] text-dim m-0 px-6 pb-5 pl-[76px]">
            {study.description}
          </p>
        </div>
      </div>
    </ScrollReveal>
  );
}

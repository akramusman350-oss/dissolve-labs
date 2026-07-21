import type { Service } from '../types';
import { ScrollReveal } from './ScrollReveal';

interface ServiceCardProps {
  service: Service;
  index: number;
}

export function ServiceCard({ service, index }: ServiceCardProps) {
  return (
    <ScrollReveal delay={index * 0.08}>
      <div className="bg-white border border-line rounded-[4px] p-8 transition-all duration-[220ms] ease-[cubic-bezier(0.2,0.7,0.2,1)] hover:translate-y-[-5px] hover:shadow-[0_16px_40px_rgba(20,23,15,0.1)] hover:border-acid/30 h-full">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-4">
            <span className={`chip ${service.chipColorClass}`}>{service.chipLabel}</span>
            <span className="font-mono text-[11px] text-faint">{service.number}</span>
          </div>
        </div>
        <h3 className="font-display font-bold text-[22px] tracking-tight mb-3">
          {service.title}
        </h3>
        <p className="text-[15px] font-medium leading-[1.65] text-dim m-0">
          {service.description}
        </p>
      </div>
    </ScrollReveal>
  );
}

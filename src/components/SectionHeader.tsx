import { ScrollReveal } from './ScrollReveal';

interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  lead?: string;
  className?: string;
  children?: React.ReactNode;
}

export function SectionHeader({ eyebrow, title, lead, className = '', children }: SectionHeaderProps) {
  return (
    <ScrollReveal className={`mb-14 ${className}`}>
      <div className="font-mono text-xs tracking-[0.14em] uppercase text-acid mb-4">
        {eyebrow}
      </div>
      <h2 className="font-display font-bold text-[clamp(36px,4vw,52px)] leading-[1.04] tracking-tight m-0">
        {title}
      </h2>
      {lead && (
        <p className="text-[17px] font-medium text-dim max-w-[540px] mt-5 mb-0">
          {lead}
        </p>
      )}
      {children}
    </ScrollReveal>
  );
}

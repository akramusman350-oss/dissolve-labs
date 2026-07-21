import { techStack } from '../data/techStack';
import { SectionHeader } from './SectionHeader';
import { ScrollReveal } from './ScrollReveal';

export function TechStack() {
  return (
    <section id="stack" className="py-28 bg-panel border-t border-b border-line">
      <div className="wr">
        <SectionHeader eyebrow="04 — Stack" title="Tools of the lab." />

        {techStack.map((group, gi) => (
          <ScrollReveal key={group.category} delay={gi * 0.08} className="mb-10">
            <div className="font-mono text-[11px] tracking-[0.14em] uppercase text-faint mb-[18px] border-b border-line pb-2.5">
              {group.category}
            </div>
            <div className="flex flex-wrap gap-2">
              {group.items.map((tech) => (
                <div
                  key={tech.name}
                  className="flex flex-col items-center gap-2 py-[18px] px-4 bg-white border border-line rounded-[4px] min-w-[90px] flex-[1_1_90px] cursor-default"
                >
                  <div
                    className="w-8 h-8 bg-contain bg-no-repeat bg-center grayscale opacity-55 transition-all duration-[220ms] hover:grayscale-0 hover:opacity-100 hover:scale-[1.18]"
                    role="img"
                    aria-label={tech.name}
                    style={{ backgroundImage: `url("${tech.icon}")` }}
                  />
                  <span className="font-mono text-[10px] tracking-[0.08em] uppercase text-dim text-center leading-[1.3]">
                    {tech.name}
                  </span>
                </div>
              ))}
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}

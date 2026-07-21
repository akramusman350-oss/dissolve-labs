import { ScrollReveal } from './ScrollReveal';

export function CareersTeaser() {
  return (
    <section className="py-20 border-b border-line">
      <div className="wr flex items-center justify-between flex-wrap gap-8">
        <ScrollReveal>
          <div className="font-mono text-xs tracking-[0.14em] uppercase text-acid mb-3.5">
            05 — Careers
          </div>
          <h2 className="font-display font-bold text-[42px] tracking-tight mb-3">
            Join the lab.
          </h2>
          <p className="text-[16px] font-medium leading-[1.65] text-dim max-w-[480px]">
            We're a small, senior team shipping real products for real clients. 4
            roles open — remote-first, no bloated process.
          </p>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <a href="/" className="btn-acid">
            See open roles →
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
}

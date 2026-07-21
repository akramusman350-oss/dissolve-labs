import { WaveCanvas } from '../components/WaveCanvas';
import { ScrollReveal } from '../components/ScrollReveal';
import { SectionHeader } from '../components/SectionHeader';
import { ServiceCard } from '../components/ServiceCard';
import { ProcessRow } from '../components/ProcessRow';
import { CaseStudyCard } from '../components/CaseStudyCard';
import { TechStack } from '../components/TechStack';
import { CareersTeaser } from '../components/CareersTeaser';
import { ContactSection } from '../components/ContactSection';
import { services } from '../data/services';
import { processPhases } from '../data/process';
import { caseStudies } from '../data/caseStudies';

export function Home() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden min-h-[92vh] flex flex-col bg-bg" id="top">
        {/* Dot grid */}
        <div
          className="absolute inset-0 pointer-events-none z-[1]"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(16,20,12,0.055) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />

        {/* Wave canvas */}
        <WaveCanvas />

        {/* Hero content */}
        <div className="wr relative z-[2] pt-28 pb-14 flex-1 flex flex-col">
          <div className="flex justify-between items-end gap-16 lg:gap-[120px] flex-wrap mt-4">
            <div>
              <h1 className="font-display font-[800] text-[clamp(44px,5.8vw,88px)] leading-[0.96] tracking-[-0.03em] m-0 mb-6 max-w-[760px]">
                Ideas, <span className="text-acid">dissolved</span>
                <br />
                into software.
              </h1>
            </div>
            <div className="max-w-[480px] pb-4">
              <p className="text-[17px] leading-[1.68] text-dim font-medium mb-8 max-w-[480px]">
                We're a development lab that turns raw ideas into SaaS platforms,
                AI applications, and web products, engineered end to end, shipped
                on schedule.
              </p>
              <div className="flex gap-3 flex-wrap">
                <a
                  href="#contact"
                  className="btn-acid"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Start a project →
                </a>
                <a
                  href="#work"
                  className="btn-line"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  View work →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Services ── */}
      <section id="services" className="py-28">
        <div className="wr">
          <SectionHeader
            eyebrow="01 — What we build"
            title="Full-spectrum software."
            lead="Six disciplines under one roof — from first wireframe to managed infrastructure."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((svc, i) => (
              <ServiceCard key={svc.number} service={svc} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Process ── */}
      <section id="process" className="py-28 bg-panel border-t border-b border-line">
        <div className="wr">
          <SectionHeader eyebrow="02 — How we work" title="The dissolution process." />
          {processPhases.map((phase, i) => (
            <ProcessRow key={phase.number} phase={phase} index={i} />
          ))}
        </div>
      </section>

      {/* ── Selected Work ── */}
      <section id="work" className="py-28">
        <div className="wr">
          <ScrollReveal className="flex justify-between items-end flex-wrap gap-5 mb-14">
            <div>
              <div className="font-mono text-xs tracking-[0.14em] uppercase text-acid mb-4">
                03 — Selected work
              </div>
              <h2 className="font-display font-bold text-[clamp(36px,4vw,52px)] leading-[1.04] tracking-tight m-0">
                Out of the lab.
              </h2>
            </div>
            <a
              href="#contact"
              className="btn-line"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Discuss your project →
            </a>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {caseStudies.map((study, i) => (
              <CaseStudyCard key={study.index} study={study} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Stack ── */}
      <TechStack />

      {/* ── Careers ── */}
      <CareersTeaser />

      {/* ── Contact ── */}
      <ContactSection />
    </>
  );
}

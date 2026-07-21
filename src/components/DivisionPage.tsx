import { type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import type { Division } from '../types';
import { engageSteps } from '../data/divisions';
import { ScrollReveal } from './ScrollReveal';
import { SectionHeader } from './SectionHeader';
import { BranchCard } from './BranchCard';
import { EngageCard } from './EngageCard';
import { ContactSection } from './ContactSection';

interface DivisionPageProps {
  division: Division;
  heroBackground?: ReactNode;
}

export function DivisionPage({ division, heroBackground }: DivisionPageProps) {
  return (
    <>
      {/* ── Sub-Hero ── */}
      <section className="relative overflow-hidden bg-bg border-b border-line">
        {/* Dot grid */}
        <div
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(16,20,12,0.055) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />

        {/* Custom hero background (glow/texture per division) */}
        {heroBackground}

        <div className="wr relative z-[2]">
          {/* Breadcrumb */}
          <div className="font-mono text-xs tracking-[0.14em] uppercase text-faint pt-24">
            <Link to="/" className="text-faint hover:text-acid transition-colors">
              Home
            </Link>{' '}
            /{' '}
            <Link to="/" className="text-faint hover:text-acid transition-colors">
              Divisions
            </Link>{' '}
            / <span className="text-txt">{division.name}</span>
          </div>

          {/* Hero content */}
          <div className="py-9 pb-21 max-w-[820px]">
            {/* Badge icon */}
            <div
              className="inline-flex items-center justify-center w-[58px] h-[58px] rounded-xl mb-6"
              style={{
                background: `${division.accentColor}1f`,
                color: division.accentColor,
              }}
            >
              {division.icon}
            </div>

            {/* Eyebrow */}
            <div
              className="font-mono text-xs tracking-[0.16em] uppercase mb-4"
              style={{ color: division.accentColor }}
            >
              {division.eyebrow}
            </div>

            {/* Title */}
            <h1 className="font-display font-[800] text-[clamp(44px,5.8vw,88px)] leading-[0.96] tracking-[-0.03em] m-0 mb-6 max-w-[760px]">
              {division.name}
            </h1>

            {/* Description */}
            <p className="text-[18px] leading-[1.68] text-dim font-medium mb-8 max-w-[620px]">
              {division.description}
            </p>

            {/* CTAs */}
            <div className="flex gap-3 flex-wrap">
              <a
                href="#contact"
                className="btn-acid"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Start a {division.name} project →
              </a>
              <a
                href="#branches"
                className="btn-line"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('branches')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Explore capabilities →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Sub-divisions ── */}
      <section id="branches" className="py-28">
        <div className="wr">
          <SectionHeader
            eyebrow="Sub-divisions"
            title={`Inside ${division.name}.`}
            lead={`Four focused capabilities that make up the ${division.name} division — engineered, delivered, and supported by one team.`}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {division.subDivisions.map((sub, i) => (
              <BranchCard
                key={sub.index}
                sub={sub}
                accentColor={division.accentColor}
                divisionName={division.name}
                index={i}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── How we engage ── */}
      <section className="py-28 bg-panel border-t border-b border-line">
        <div className="wr">
          <SectionHeader
            eyebrow="How we engage"
            title="From brief to running system."
          />
          <ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {engageSteps.map((step, i) => (
                <EngageCard key={step.number} step={step} index={i} />
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Contact ── */}
      <ContactSection />
    </>
  );
}

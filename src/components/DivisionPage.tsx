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
  heroVisual?: ReactNode;
}

export function DivisionPage({
  division,
  heroBackground,
  heroVisual,
}: DivisionPageProps) {
  return (
    <>
      {/* ── Sub-Hero ── */}
      <section className="relative overflow-hidden bg-bg border-b border-line min-h-[85vh] flex flex-col justify-center">
        {/* Dot grid background */}
        <div
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(16,20,12,0.055) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />

        {/* Custom ambient hero glow/texture */}
        {heroBackground}

        <div className="wr relative z-[2] py-16 lg:py-24">
          {/* Breadcrumb */}
          <div className="font-mono text-xs tracking-[0.14em] uppercase text-faint mb-8">
            <Link to="/" className="text-faint hover:text-acid transition-colors">
              Home
            </Link>{' '}
            /{' '}
            <Link to="/" className="text-faint hover:text-acid transition-colors">
              Divisions
            </Link>{' '}
            / <span className="text-txt font-semibold">{division.name}</span>
          </div>

          {/* 2-Column Hero Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Column: Copy & Actions */}
            <div className="lg:col-span-6">
              {/* Badge Icon */}
              <div
                className="inline-flex items-center justify-center w-[58px] h-[58px] rounded-xl mb-6 shadow-sm border border-line"
                style={{
                  background: `${division.accentColor}1f`,
                  color: division.accentColor,
                }}
              >
                {division.icon}
              </div>

              {/* Eyebrow */}
              <div
                className="font-mono text-xs font-semibold tracking-[0.16em] uppercase mb-4"
                style={{ color: division.accentColor }}
              >
                {division.eyebrow}
              </div>

              {/* Headline */}
              <h1 className="font-display font-[800] text-[clamp(40px,5vw,76px)] leading-[0.98] tracking-[-0.03em] m-0 mb-6 text-txt">
                {division.name}
              </h1>

              {/* Description */}
              <p className="text-[18px] leading-[1.68] text-dim font-medium mb-8 max-w-[540px]">
                {division.description}
              </p>

              {/* Action Buttons */}
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

            {/* Right Column: Hero Visual Set-Piece */}
            <div className="lg:col-span-6">
              {heroVisual}
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            lead="Predictable 3-stage delivery model built for high-stakes software releases."
          />
          <ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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

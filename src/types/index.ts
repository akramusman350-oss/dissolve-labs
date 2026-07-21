import type { ReactNode } from 'react';

export interface Service {
  number: string;
  title: string;
  description: string;
  chipLabel: string;
  chipColorClass: string;
}

export interface CaseStudy {
  index: string;
  tag: string;
  title: string;
  stat: string;
  statNumeric?: number;
  statPrefix?: string;
  statSuffix?: string;
  description: string;
}

export interface ProcessPhase {
  number: string;
  title: string;
  description: string;
}

export interface TechItem {
  name: string;
  icon: string;
}

export interface TechGroup {
  category: string;
  items: TechItem[];
}

export interface SubDivision {
  index: string;
  title: string;
  description: string;
}

export interface EngageStep {
  number: string;
  label: string;
  title: string;
  description: string;
}

export interface Division {
  name: string;
  slug: string;
  number: string;
  eyebrow: string;
  description: string;
  accentColor: string;
  icon: ReactNode;
  subDivisions: SubDivision[];
}

export interface FooterColumn {
  title: string;
  links: { label: string; href: string }[];
}

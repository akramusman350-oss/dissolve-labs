import type { Service } from '../types';

export const services: Service[] = [
  {
    number: 'S.01',
    title: 'SaaS applications',
    description: 'Multi-tenant platforms with billing, roles, and analytics — architected from day one for scale, not bolted on later.',
    chipLabel: 'SaaS',
    chipColorClass: 'chip-saas',
  },
  {
    number: 'S.02',
    title: 'AI applications',
    description: 'LLM-powered products, copilots, and automation pipelines — with trustworthy UX that users actually adopt.',
    chipLabel: 'AI',
    chipColorClass: 'chip-ai',
  },
  {
    number: 'S.03',
    title: 'Web applications',
    description: 'Fast, accessible web apps and portals with real performance budgets — no bloated bundles, no janky interactions.',
    chipLabel: 'Web',
    chipColorClass: 'chip-web',
  },
  {
    number: 'S.04',
    title: 'IT solutions',
    description: 'Cloud migration, DevOps pipelines, security hardening, and managed infrastructure — your stack, but better.',
    chipLabel: 'IT',
    chipColorClass: 'chip-it',
  },
  {
    number: 'S.05',
    title: 'Product design',
    description: 'Research, wireframes, and high-fidelity design that developers can actually build — no handoff friction.',
    chipLabel: 'Design',
    chipColorClass: 'chip-ds',
  },
  {
    number: 'S.06',
    title: 'Dedicated teams',
    description: 'Senior engineers embedded in your workflow — scale monthly, no long lock-ins, no ramp-up lag.',
    chipLabel: 'Teams',
    chipColorClass: 'chip-team',
  },
];

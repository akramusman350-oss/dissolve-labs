import type { CaseStudy } from '../types';

export const caseStudies: CaseStudy[] = [
  {
    index: 'W.01',
    tag: 'SaaS · Logistics',
    title: 'Freight management platform',
    stat: '14 weeks',
    statNumeric: 14,
    statSuffix: ' weeks',
    description:
      'Multi-tenant dispatch and tracking replacing spreadsheets for a 200-vehicle fleet operator.',
  },
  {
    index: 'W.02',
    tag: 'AI · Customer support',
    title: 'Support copilot for fintech',
    stat: '−38% AHT',
    statNumeric: 38,
    statPrefix: '−',
    statSuffix: '% AHT',
    description:
      'An LLM assistant that drafts responses and surfaces account context in real time.',
  },
  {
    index: 'W.03',
    tag: 'Web · Healthcare',
    title: 'Patient intake portal',
    stat: '−22% no-shows',
    statNumeric: 22,
    statPrefix: '−',
    statSuffix: '% no-shows',
    description:
      'Accessible intake and scheduling for a clinic network — paper forms gone entirely.',
  },
  {
    index: 'W.04',
    tag: 'IT · Retail',
    title: 'Cloud migration & DevOps',
    stat: '−33% infra cost',
    statNumeric: 33,
    statPrefix: '−',
    statSuffix: '% infra cost',
    description:
      'On-prem to AWS with zero downtime, then infrastructure spend cut by a third.',
  },
];

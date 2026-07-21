import type { ProcessPhase } from '../types';

export const processPhases: ProcessPhase[] = [
  {
    number: 'PHASE 01',
    title: 'Dissolve',
    description:
      'A focused discovery week. We break your idea down to users, constraints, and what "done" means — you get a scoped plan, a fixed estimate, and clickable wireframes.',
  },
  {
    number: 'PHASE 02',
    title: 'Distill',
    description:
      'Clickable prototypes before a line of production code. You react to real screens, not documents.',
  },
  {
    number: 'PHASE 03',
    title: 'Synthesize',
    description:
      'Weekly shipped increments you can use, not status reports. Demos every Friday, staging always live.',
  },
  {
    number: 'PHASE 04',
    title: 'Stabilize',
    description:
      'Launch, monitoring, iteration. We stay on for support and growth — most clients keep us for years.',
  },
];

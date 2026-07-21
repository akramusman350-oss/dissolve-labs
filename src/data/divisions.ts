import type { Division, EngageStep } from '../types';

export const engageSteps: EngageStep[] = [
  {
    number: 'STEP 01',
    label: 'Discover',
    title: 'Scope & plan',
    description:
      'A focused discovery cycle to pin down users, constraints, and what success looks like — with a fixed estimate.',
  },
  {
    number: 'STEP 02',
    label: 'Build',
    title: 'Ship increments',
    description:
      'Working software every week on staging, demoed regularly — you steer with real screens, not documents.',
  },
  {
    number: 'STEP 03',
    label: 'Scale',
    title: 'Run & grow',
    description:
      'Launch, monitoring, and iteration. We stay on for support and growth long after go-live.',
  },
];

export const aiSolutions: Division = {
  name: 'AI Solutions',
  slug: 'ai-solutions',
  number: '03',
  eyebrow: 'Division 03 / 10 · Vision · ML · Custom AI',
  description:
    'Applied models built around your data and your floor — from computer vision to LLM copilots, evaluated and shipped.',
  accentColor: '#a78bfa',
  icon: null, // Set in the page component
  subDivisions: [
    {
      index: '03.01',
      title: 'Computer vision',
      description: 'Detection, inspection, and OCR tuned to your imagery and line speed.',
    },
    {
      index: '03.02',
      title: 'Predictive ML',
      description: 'Forecasting, scoring, and anomaly detection on your operational data.',
    },
    {
      index: '03.03',
      title: 'LLM copilots & RAG',
      description: 'Assistants grounded in your documents, tools, and workflows.',
    },
    {
      index: '03.04',
      title: 'MLOps & evaluation',
      description: 'Training pipelines, monitoring, and eval harnesses for reliable models.',
    },
  ],
};

export const industrialAutomation: Division = {
  name: 'Industrial Automation',
  slug: 'industrial-automation',
  number: '04',
  eyebrow: 'Division 04 / 10 · Factory · PLC · SCADA',
  description:
    'Automation that keeps production lines running around the clock — PLC logic, SCADA, and analytics under one roof.',
  accentColor: '#f59e0b',
  icon: null, // Set in the page component
  subDivisions: [
    {
      index: '04.01',
      title: 'PLC programming',
      description: 'Ladder, ST, and motion control for Siemens, Allen-Bradley, and more.',
    },
    {
      index: '04.02',
      title: 'SCADA systems',
      description: 'Supervisory control and data acquisition across your plant floor.',
    },
    {
      index: '04.03',
      title: 'Line control & robotics',
      description: 'Cell integration, safety interlocks, and robot coordination.',
    },
    {
      index: '04.04',
      title: 'OEE & downtime analytics',
      description: 'Real-time throughput, quality, and downtime visibility.',
    },
  ],
};

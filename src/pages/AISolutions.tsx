import { DivisionPage } from '../components/DivisionPage';
import { aiSolutions } from '../data/divisions';
import { AiHeroCanvas } from '../components/AiHeroCanvas';

// AI Solutions icon (neural network / connected nodes)
const AiIcon = (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.7"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-[30px] h-[30px]"
  >
    <circle cx="5" cy="12" r="2" />
    <circle cx="19" cy="6" r="2" />
    <circle cx="19" cy="18" r="2" />
    <path d="M7 11l10-4M7 13l10 4" />
  </svg>
);

// Violet background glow for AI hero
function AiHeroBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none z-[1] overflow-hidden">
      <div
        className="absolute top-[-20%] right-[-10%] w-[70%] h-[80%] rounded-full opacity-25"
        style={{
          background: 'radial-gradient(circle, rgba(167,139,250,0.3) 0%, transparent 70%)',
          animation: 'aiGlow 8s ease-in-out infinite alternate',
        }}
      />
      <style>{`
        @keyframes aiGlow {
          0% { transform: translate(0, 0) scale(1); }
          100% { transform: translate(30px, -20px) scale(1.1); }
        }
      `}</style>
    </div>
  );
}

export function AISolutionsPage() {
  const division = { ...aiSolutions, icon: AiIcon };

  return (
    <DivisionPage
      division={division}
      heroBackground={<AiHeroBackground />}
      heroVisual={<AiHeroCanvas />}
    />
  );
}

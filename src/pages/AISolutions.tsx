import { DivisionPage } from '../components/DivisionPage';
import { aiSolutions } from '../data/divisions';
import { AiHeroVisual } from '../components/AiHeroVisual';

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
      {/* Primary ambient glow */}
      <div
        className="absolute top-[-20%] right-[-10%] w-[70%] h-[80%] rounded-full opacity-30"
        style={{
          background: 'radial-gradient(circle, rgba(167,139,250,0.35) 0%, transparent 70%)',
          animation: 'aiGlow 8s ease-in-out infinite alternate',
        }}
      />
      {/* Secondary ambient glow */}
      <div
        className="absolute bottom-[-10%] left-[10%] w-[50%] h-[60%] rounded-full opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(139,92,246,0.3) 0%, transparent 65%)',
          animation: 'aiGlow 12s ease-in-out infinite alternate-reverse',
        }}
      />
      <style>{`
        @keyframes aiGlow {
          0% { transform: translate(0, 0) scale(1); }
          100% { transform: translate(30px, -20px) scale(1.12); }
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
      heroVisual={<AiHeroVisual />}
    />
  );
}

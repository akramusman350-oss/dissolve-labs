import { DivisionPage } from '../components/DivisionPage';
import { industrialAutomation } from '../data/divisions';
import { IndustrialHeroVisual } from '../components/IndustrialHeroVisual';

// Industrial Automation icon (circuit/PLC chip)
const IndustrialIcon = (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.7"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-[30px] h-[30px]"
  >
    <rect x="4" y="6" width="16" height="12" rx="2" />
    <path d="M8 6V3M12 6V3M16 6V3M8 21v-3M12 21v-3M16 21v-3" />
  </svg>
);

// Industrial grid/blueprint texture + amber glow for hero
function IndustrialHeroBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none z-[1] overflow-hidden">
      {/* Blueprint grid */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(245,158,11,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(245,158,11,0.4) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />
      {/* Amber ambient glow */}
      <div
        className="absolute top-[-15%] right-[5%] w-[55%] h-[70%] rounded-full opacity-25"
        style={{
          background: 'radial-gradient(circle, rgba(245,158,11,0.3) 0%, transparent 65%)',
          animation: 'indGlow 10s ease-in-out infinite alternate',
        }}
      />
      <style>{`
        @keyframes indGlow {
          0% { transform: translate(0, 0) scale(1); }
          100% { transform: translate(-20px, 15px) scale(1.08); }
        }
      `}</style>
    </div>
  );
}

export function IndustrialAutomationPage() {
  const division = { ...industrialAutomation, icon: IndustrialIcon };

  return (
    <DivisionPage
      division={division}
      heroBackground={<IndustrialHeroBackground />}
      heroVisual={<IndustrialHeroVisual />}
    />
  );
}

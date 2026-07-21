import { Link } from 'react-router-dom';
import { Logo } from './Logo';

const DIVISIONS_COL1 = [
  { label: 'SaaS', href: '/' },
  { label: 'AI-aaS', href: '/' },
  { label: 'AI Solutions', href: '/divisions/ai-solutions' },
  { label: 'Industrial Automation', href: '/divisions/industrial-automation' },
  { label: 'IoT', href: '/' },
];

const DIVISIONS_COL2 = [
  { label: 'Agri-Tech', href: '/' },
  { label: 'Retail', href: '/' },
  { label: 'HMI', href: '/' },
];

const SERVICES = [
  { label: 'SaaS applications', href: '/#services' },
  { label: 'AI applications', href: '/#services' },
  { label: 'Web applications', href: '/#services' },
  { label: 'IT solutions', href: '/#services' },
];

const COMPANY = [
  { label: 'About us', href: '/' },
  { label: 'Work', href: '/#work' },
  { label: 'Careers', href: '/' },
  { label: 'Contact', href: '#contact' },
];

export function Footer() {
  return (
    <footer className="border-t border-line py-16 pb-10">
      <div className="wr">
        {/* Top section */}
        <div className="flex justify-between flex-wrap gap-12 mb-13">
          {/* Brand */}
          <div className="max-w-[280px]">
            <div className="mb-4">
              <Logo size={24} />
            </div>
            <p className="text-sm leading-relaxed text-faint">
              A software development lab building SaaS, AI, and web products for
              ambitious teams worldwide.
            </p>
          </div>

          {/* Divisions col 1 */}
          <div>
            <FooterHead>Divisions</FooterHead>
            {DIVISIONS_COL1.map((l) => (
              <FooterLink key={l.label} href={l.href}>
                {l.label}
              </FooterLink>
            ))}
          </div>

          {/* Divisions col 2 */}
          <div>
            <FooterHead>Divisions</FooterHead>
            {DIVISIONS_COL2.map((l) => (
              <FooterLink key={l.label} href={l.href}>
                {l.label}
              </FooterLink>
            ))}
          </div>

          {/* Services */}
          <div>
            <FooterHead>Services</FooterHead>
            {SERVICES.map((l) => (
              <FooterLink key={l.label} href={l.href}>
                {l.label}
              </FooterLink>
            ))}
          </div>

          {/* Company */}
          <div>
            <FooterHead>Company</FooterHead>
            {COMPANY.map((l) => (
              <FooterLink key={l.label} href={l.href}>
                {l.label}
              </FooterLink>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex justify-between flex-wrap gap-3 border-t border-line pt-6 font-mono text-[11px] tracking-[0.1em] text-faint uppercase">
          <span>© 2026 DISSOLVELABS</span>
          <span>MADE IN THE LAB</span>
        </div>
      </div>
    </footer>
  );
}

function FooterHead({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-mono text-[11px] tracking-[0.14em] uppercase text-faint mb-4">
      {children}
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  const isInternal = href.startsWith('/') && !href.startsWith('/#');
  const isHash = href.startsWith('#');

  if (isInternal) {
    return (
      <Link
        to={href}
        className="block mt-3 text-sm text-faint transition-colors duration-150 hover:text-acid"
      >
        {children}
      </Link>
    );
  }

  return (
    <a
      href={href}
      className="block mt-3 text-sm text-faint transition-colors duration-150 hover:text-acid"
      onClick={
        isHash
          ? (e) => {
              e.preventDefault();
              const el = document.querySelector(href);
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }
          : undefined
      }
    >
      {children}
    </a>
  );
}

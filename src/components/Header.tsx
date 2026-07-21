import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Logo } from './Logo';

const NAV_LINKS = [
  { label: 'Services', href: '/#services' },
  { label: 'Process', href: '/#process' },
  { label: 'Work', href: '/#work' },
  { label: 'Stack', href: '/#stack' },
  { label: 'About', href: '/' },
  { label: 'Careers', href: '/' },
  { label: 'Contact', href: '#contact' },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    if (href.startsWith('#')) {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className="sticky top-0 z-50 border-b border-line"
        style={{
          background: 'rgba(246,247,243,0.92)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          boxShadow: scrolled ? '0 1px 8px rgba(20,23,15,0.06)' : 'none',
          transition: 'box-shadow 0.3s',
        }}
      >
        <div className="wr flex items-center justify-between h-[72px]">
          <Link to="/" aria-label="DissolveLabs home">
            <Logo />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.label}
                href={link.href}
                onClick={() => handleNavClick(link.href)}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <Link
              to="/#contact"
              className="btn-acid btn-sm hidden sm:inline-flex"
              onClick={() => {
                const el = document.getElementById('contact');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Start a project →
            </Link>

            {/* Mobile Hamburger */}
            <button
              className="lg:hidden flex flex-col justify-center items-center w-10 h-10 gap-[5px] cursor-pointer bg-transparent border-none"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
            >
              <motion.span
                className="block w-5 h-[2px] bg-txt rounded-full origin-center"
                animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.2 }}
              />
              <motion.span
                className="block w-5 h-[2px] bg-txt rounded-full"
                animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.15 }}
              />
              <motion.span
                className="block w-5 h-[2px] bg-txt rounded-full origin-center"
                animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.2 }}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Nav Panel */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/20"
              onClick={() => setMenuOpen(false)}
            />
            {/* Panel */}
            <motion.nav
              className="absolute top-[72px] right-0 w-full max-w-sm h-[calc(100vh-72px)] border-l border-line flex flex-col p-8 gap-2 overflow-y-auto"
              style={{ background: 'rgba(246,247,243,0.98)', backdropFilter: 'blur(20px)' }}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            >
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.04 }}
                >
                  <a
                    href={link.href}
                    className="block py-3 text-lg font-medium text-faint hover:text-txt transition-colors"
                    style={{ fontFamily: 'var(--font-body)' }}
                    onClick={(e) => {
                      if (link.href.startsWith('#')) {
                        e.preventDefault();
                        handleNavClick(link.href);
                      } else {
                        setMenuOpen(false);
                      }
                    }}
                  >
                    {link.label}
                  </a>
                </motion.div>
              ))}
              <div className="mt-6">
                <Link
                  to="/#contact"
                  className="btn-acid w-full justify-center"
                  onClick={() => {
                    setMenuOpen(false);
                    setTimeout(() => {
                      const el = document.getElementById('contact');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }}
                >
                  Start a project →
                </Link>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function NavLink({
  href,
  children,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  onClick: () => void;
}) {
  const isHashLink = href.startsWith('#') || href.includes('#');

  if (isHashLink) {
    return (
      <a
        href={href}
        className="text-[15px] font-medium text-faint transition-colors duration-150 hover:text-txt"
        style={{ fontFamily: 'var(--font-body)' }}
        onClick={(e) => {
          e.preventDefault();
          onClick();
          const hash = href.includes('#') ? '#' + href.split('#')[1] : href;
          const el = document.querySelector(hash);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      >
        {children}
      </a>
    );
  }

  return (
    <Link
      to={href}
      className="text-[15px] font-medium text-faint transition-colors duration-150 hover:text-txt"
      style={{ fontFamily: 'var(--font-body)' }}
      onClick={onClick}
    >
      {children}
    </Link>
  );
}

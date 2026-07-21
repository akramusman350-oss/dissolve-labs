import { useState, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScrollReveal } from './ScrollReveal';

export function ContactSection() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section
      id="contact"
      className="py-28 relative overflow-hidden border-t border-line"
      style={{ background: 'var(--color-panel)' }}
    >
      {/* Animated flying mail SVG */}
      <div
        className="absolute top-16 right-14 z-[1] pointer-events-none hidden md:block"
        style={{ animation: 'fly 5.5s ease-in-out infinite' }}
      >
        <svg width="128" height="104" viewBox="0 0 128 104" fill="none">
          <path
            className="trail"
            d="M4 96 C 34 92 44 64 74 58"
            stroke="#2563EB"
            strokeWidth="2"
            strokeLinecap="round"
            opacity=".5"
            style={{ strokeDasharray: '4 7', animation: 'dash 3s linear infinite' }}
          />
          <g transform="translate(72 20) rotate(12)">
            <path d="M2 8 L46 8 L46 34 L2 34 Z" fill="#2563EB" />
            <path
              d="M2 8 L24 24 L46 8"
              fill="none"
              stroke="#F6F7F3"
              strokeWidth="2.4"
              strokeLinejoin="round"
            />
            <path d="M2 34 L18 20 M46 34 L30 20" stroke="#1D4FD8" strokeWidth="2" />
            <path
              d="M-14 14 L-2 14 M-20 22 L-4 22 M-14 30 L-2 30"
              stroke="#2563EB"
              strokeWidth="2"
              strokeLinecap="round"
              opacity=".55"
            />
          </g>
        </svg>
      </div>

      <div className="wr grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start">
        {/* Left column */}
        <ScrollReveal>
          <div className="font-mono text-xs tracking-[0.14em] uppercase text-acid mb-4">
            Contact
          </div>
          <h2 className="font-display font-bold text-[clamp(36px,4vw,52px)] leading-[1.04] tracking-tight mb-6">
            Have something
            <br />
            to dissolve?
          </h2>
          <p className="text-[17px] font-medium text-dim max-w-[420px] mb-10">
            Tell us what you're building. We reply within one business day with
            honest thoughts — and whether we're the right lab for it.
          </p>

          <div className="font-mono text-[11px] tracking-[0.12em] uppercase text-faint mb-2">
            Email directly
          </div>
          <a
            href="mailto:hello@dissolvelabs.com"
            className="flex items-center gap-3 font-mono text-acid text-[15px]"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              className="flex-shrink-0"
            >
              <rect
                x="2.5"
                y="4.5"
                width="19"
                height="15"
                rx="2"
                stroke="#2563EB"
                strokeWidth="1.6"
              />
              <path
                d="M3 6l9 6.5L21 6"
                stroke="#2563EB"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            hello@dissolvelabs.com
          </a>
        </ScrollReveal>

        {/* Right column: form */}
        <ScrollReveal delay={0.1}>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label
                htmlFor="contact-name"
                className="block font-mono text-[11px] tracking-[0.12em] uppercase text-faint mb-2"
              >
                Name
              </label>
              <input
                id="contact-name"
                className="input-f"
                type="text"
                placeholder="Your name"
                required
              />
            </div>
            <div>
              <label
                htmlFor="contact-email"
                className="block font-mono text-[11px] tracking-[0.12em] uppercase text-faint mb-2"
              >
                Work email
              </label>
              <input
                id="contact-email"
                className="input-f"
                type="email"
                placeholder="you@company.com"
                required
              />
            </div>
            <div>
              <label
                htmlFor="contact-type"
                className="block font-mono text-[11px] tracking-[0.12em] uppercase text-faint mb-2"
              >
                What are you building?
              </label>
              <input
                id="contact-type"
                className="input-f"
                type="text"
                placeholder="SaaS, AI app, web app…"
              />
            </div>
            <div>
              <label
                htmlFor="contact-msg"
                className="block font-mono text-[11px] tracking-[0.12em] uppercase text-faint mb-2"
              >
                Project details
              </label>
              <textarea
                id="contact-msg"
                className="input-f"
                rows={5}
                placeholder="Goals, timeline, budget range — anything helps."
                style={{ resize: 'vertical' }}
              />
            </div>

            <AnimatePresence mode="wait">
              {sent && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="font-mono text-[13px] text-acid border border-acid/40 p-3.5 rounded-sm"
                  style={{ background: 'rgba(37,99,235,0.06)' }}
                >
                  ✓ Message sent — we'll reply within one business day.
                </motion.div>
              )}
            </AnimatePresence>

            <button
              type="submit"
              className="btn-acid self-start mt-1"
              disabled={sent}
            >
              {sent ? 'Sent ✓' : 'Send inquiry →'}
            </button>
          </form>
        </ScrollReveal>
      </div>
    </section>
  );
}

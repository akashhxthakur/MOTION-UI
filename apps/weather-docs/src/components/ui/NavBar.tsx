'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { GITHUB_URL, NPM_INSTALL, PACKAGE_NAME } from '@/lib/constants';
import { useScrollY } from '@/hooks/useScrollY';
import { GlassCard } from '@/components/ui/GlassCard';
import { ThemeToggle } from '@/components/ui/ThemeToggle';

const links = [
  { href: '/docs', label: 'Docs' },
  { href: '/components', label: 'Components' },
  { href: '/patterns', label: 'RN Patterns' },
  { href: GITHUB_URL, label: 'GitHub', external: true },
];

function RainLogo() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden className="shrink-0">
      <defs>
        <linearGradient id="logoGrad" x1="0" y1="0" x2="28" y2="28">
          <stop stopColor="#3b82f6" />
          <stop offset="1" stopColor="#8b5cf6" />
        </linearGradient>
      </defs>
      <circle cx="14" cy="14" r="12" stroke="url(#logoGrad)" strokeWidth="2" fill="none" />
      <path
        d="M10 8v6M14 6v8M18 9v5"
        stroke="url(#logoGrad)"
        strokeWidth="2"
        strokeLinecap="round"
        className="animate-pulse"
      />
    </svg>
  );
}

export function NavBar() {
  const scrolled = useScrollY(50);
  const [copied, setCopied] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const copyInstall = async () => {
    await navigator.clipboard.writeText(NPM_INSTALL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <header
      className={`sticky top-0 z-50 min-w-0 w-full backdrop-blur-xl transition-colors ${
        scrolled ? 'border-b border-stroke bg-background/80' : 'bg-background/60'
      }`}
      style={{ paddingTop: 'var(--safe-top)' }}
    >
      <div className="container-page flex h-14 min-w-0 items-center justify-between gap-3 px-4 sm:h-16 sm:px-6">
        <Link
          href="/"
          className="flex min-w-0 items-center gap-2 font-semibold text-foreground"
          onClick={() => setMenuOpen(false)}
        >
          <RainLogo />
          <span className="truncate text-sm sm:text-base">{PACKAGE_NAME}</span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {links.map((item) =>
            item.external ? (
              <a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground transition hover:text-foreground"
              >
                {item.label}
              </a>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-muted-foreground transition hover:text-foreground"
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            onClick={copyInstall}
            className="hidden rounded-lg border border-stroke bg-surface px-2 py-1.5 font-mono text-[10px] text-muted-foreground transition hover:border-white/20 sm:block sm:px-3 sm:text-xs"
          >
            {copied ? 'Copied!' : 'npm install'}
          </button>

          <button
            type="button"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-stroke text-foreground lg:hidden"
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-stroke lg:hidden"
          >
            <GlassCard bare className="mx-3 my-3 rounded-2xl !bg-transparent">
              <nav className="flex flex-col gap-1 px-4 py-4">
                {links.map((item) =>
                  item.external ? (
                    <a
                      key={item.href}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-lg px-3 py-3 text-base text-muted-foreground hover:bg-surface"
                      onClick={() => setMenuOpen(false)}
                    >
                      {item.label}
                    </a>
                  ) : (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="rounded-lg px-3 py-3 text-base text-muted-foreground hover:bg-surface"
                      onClick={() => setMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ),
                )}
                <button
                  type="button"
                  onClick={() => {
                    void copyInstall();
                  }}
                  className="mt-2 rounded-lg border border-stroke bg-surface px-3 py-3 text-left font-mono text-sm text-muted-foreground"
                >
                  {copied ? 'Copied install command!' : NPM_INSTALL}
                </button>
              </nav>
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

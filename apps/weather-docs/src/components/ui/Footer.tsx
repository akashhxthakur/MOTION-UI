import Link from 'next/link';
import { GITHUB_URL, PACKAGE_NAME } from '@/lib/constants';

export function Footer() {
  return (
    <footer
      className="relative z-10 border-t border-white/10 bg-background px-4 py-12 sm:px-6 sm:py-16"
      style={{ paddingBottom: 'max(3rem, var(--safe-bottom))' }}
    >
      <div className="container-page grid min-w-0 grid-cols-1 gap-10 sm:gap-12 md:grid-cols-3">
        <div className="min-w-0">
          <p className="mb-2 text-base font-semibold text-white sm:text-lg">{PACKAGE_NAME}</p>
          <p className="text-sm leading-relaxed text-zinc-500">
            Realistic UI patterns with spring physics and gesture-driven components for React
            Native.
          </p>
        </div>
        <div className="flex flex-col gap-2 text-sm text-zinc-400">
          <Link href="/docs" className="hover:text-white">
            Docs
          </Link>
          <Link href="/components" className="hover:text-white">
            Components
          </Link>
          <Link href="/patterns" className="hover:text-white">
            RN Patterns
          </Link>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white"
          >
            GitHub
          </a>
          <a
            href="https://www.npmjs.com/org/motionui"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white"
          >
            npm
          </a>
        </div>
        <div className="text-sm leading-relaxed text-zinc-500 md:text-right">
          Built with Reanimated + Gesture Handler. Inspired by real product UI.
        </div>
      </div>
    </footer>
  );
}

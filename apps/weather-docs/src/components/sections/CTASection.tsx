'use client';

import Link from 'next/link';
import { GITHUB_URL } from '@/lib/constants';

export function CTASection() {
  return (
    <section className="section-pad relative overflow-x-clip lg:py-32">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            'radial-gradient(ellipse 80% 50% at 50% 50%, rgba(59,130,246,0.12) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 80% 20%, rgba(139,92,246,0.1) 0%, transparent 50%)',
        }}
        aria-hidden
      />
      <div className="container-page relative z-10 max-w-3xl text-center">
        <h2 className="mb-6 text-2xl font-bold text-foreground sm:text-4xl md:text-5xl">
          Ship polished interfaces in an afternoon.
        </h2>
        <div className="flex w-full flex-col gap-3 xs:flex-row xs:flex-wrap xs:justify-center sm:gap-4">
          <Link
            href="/docs"
            className="w-full rounded-xl bg-gradient-to-r from-accent-blue to-accent-purple px-8 py-3 text-center font-semibold text-foreground shadow-lg shadow-blue-500/20 xs:w-auto"
          >
            Read the docs
          </Link>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full rounded-xl border border-stroke px-8 py-3 text-center font-semibold text-foreground hover:bg-surface xs:w-auto"
          >
            Star on GitHub
          </a>
        </div>
        <p className="mt-6 text-sm text-muted-foreground">MIT license. Free forever.</p>
      </div>
    </section>
  );
}

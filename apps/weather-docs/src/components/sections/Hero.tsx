'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import { InteractiveDevice } from '@/components/ui/device/InteractiveDevice';
import { ScreenSwitcher } from '@/components/ui/ScreenSwitcher';
import { GITHUB_URL, HERO_SCREENS } from '@/lib/constants';
import type { UIScreenId } from '@/lib/uiScreens';

const stagger = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: [0.4, 0, 0.2, 1] },
  }),
};

export function Hero() {
  const [screen, setScreen] = useState<UIScreenId>('commerce');

  return (
    <section className="relative flex min-h-[100dvh] flex-col justify-center overflow-x-clip section-pad lg:pt-20">
      <div className="container-page flex min-w-0 flex-col items-stretch gap-10 lg:grid lg:grid-cols-2 lg:items-center lg:gap-16">
        <div className="min-w-0 w-full max-w-full">
          <motion.div custom={0} variants={stagger} initial="hidden" animate="show">
            <div className="mb-5 inline-flex max-w-full items-center gap-2 rounded-full p-[1px] shimmer-border sm:mb-6">
              <span className="rounded-full bg-background px-3 py-1.5 text-xs text-muted-foreground sm:px-4 sm:text-sm">
                Try MagneticButton inside the phone →
              </span>
            </div>
          </motion.div>

          <motion.h1
            custom={1}
            variants={stagger}
            initial="hidden"
            animate="show"
            className="mb-5 text-[1.75rem] font-extrabold leading-[1.08] tracking-tight text-foreground xs:text-4xl sm:mb-6 sm:text-5xl lg:text-6xl xl:text-[72px]"
          >
            Interfaces that feel real.
          </motion.h1>

          <motion.p
            custom={2}
            variants={stagger}
            initial="hidden"
            animate="show"
            className="mb-8 max-w-xl text-base leading-relaxed text-muted-foreground sm:mb-10 sm:text-lg"
          >
            Production-grade UI patterns with spring physics, gesture-driven components, and a
            token-based design system — for iOS, Android, and Web.
          </motion.p>

          <motion.div
            custom={3}
            variants={stagger}
            initial="hidden"
            animate="show"
            className="mb-6 flex w-full flex-col gap-3 xs:flex-row xs:flex-wrap sm:mb-8 sm:gap-4"
          >
            <Link
              href="/docs"
              className="w-full rounded-xl bg-gradient-to-r from-accent-blue to-accent-purple px-6 py-3 text-center font-semibold text-foreground shadow-lg shadow-blue-500/25 transition hover:shadow-blue-500/40 xs:w-auto"
            >
              Get Started
            </Link>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full rounded-xl border border-stroke px-6 py-3 text-center font-semibold text-foreground transition hover:bg-surface xs:w-auto"
            >
              View on GitHub
            </a>
          </motion.div>

          <motion.p
            custom={4}
            variants={stagger}
            initial="hidden"
            animate="show"
            className="text-xs text-muted-foreground sm:text-sm"
          >
            Open Source · MIT License · iOS & Android
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, type: 'spring', stiffness: 120, damping: 20 }}
          className="relative flex w-full min-w-0 flex-col items-center"
        >
          <div
            className="pointer-events-none absolute inset-0 -z-10 rounded-full opacity-15 blur-3xl"
            style={{
              background: 'radial-gradient(circle, #3b82f6 0%, #8b5cf6 50%, transparent 70%)',
            }}
          />
          <InteractiveDevice screen={screen} onScreenChange={setScreen} floating gutter={64} />
          <div className="mt-4 w-full max-w-full overflow-x-auto lg:mt-6 lg:overflow-visible">
            <ScreenSwitcher
              screens={HERO_SCREENS}
              active={screen}
              onChange={setScreen}
              className="flex w-max min-w-full flex-wrap justify-start gap-2 px-0.5 sm:justify-center lg:justify-center"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

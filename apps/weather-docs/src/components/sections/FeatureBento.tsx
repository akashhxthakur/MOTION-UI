'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BentoCard } from '@/components/ui/BentoCard';
import { CodeBlock } from '@/components/ui/CodeBlock';
import { DEVICE_HEIGHT, DEVICE_WIDTH } from '@/lib/constants';
import { DeviceProvider } from '@/components/ui/device/deviceContext';
import { IPhoneMockup } from '@/components/ui/IPhoneMockup';
import type { UIScreenId } from '@/lib/uiScreens';
import { CATEGORIES, CATEGORY_META, formatCount, CATALOG_TOTAL } from '@/lib/componentCatalog';

const CATEGORY_SAMPLE = CATEGORIES.slice(0, 8);
const BENTO_DEVICE_SCALE = 0.42;
const BENTO_CYCLE: UIScreenId[] = ['commerce', 'motionlab', 'wallet'];

function GesturePreview() {
  return (
    <div className="relative flex h-24 items-center justify-center">
      <motion.div
        className="absolute h-14 w-14 rounded-2xl bg-gradient-to-br from-violet-500 to-blue-600 shadow-lg"
        animate={{ x: [0, 24, 0, -24, 0], y: [0, -8, 0, 8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div className="h-16 w-28 rounded-xl border border-dashed border-stroke" />
    </div>
  );
}

export function FeatureBento() {
  const [cycleScreen, setCycleScreen] = useState<UIScreenId>('commerce');

  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      i = (i + 1) % BENTO_CYCLE.length;
      setCycleScreen(BENTO_CYCLE[i]!);
    }, 2000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="section-pad overflow-x-clip">
      <div className="container-page min-w-0">
        <h2 className="mb-3 text-center text-2xl font-bold text-foreground sm:text-3xl md:text-4xl">
          Everything you need. Nothing you don&apos;t.
        </h2>
        <p className="mb-10 text-center text-sm text-muted-foreground sm:mb-16 sm:text-base">
          Realistic layouts, motion primitives, and tokens — composed for production apps.
        </p>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:grid-rows-2">
          <BentoCard
            className="md:col-span-2"
            delay={0}
            style={{
              background:
                'radial-gradient(ellipse at 20% 50%, rgba(59,130,246,0.12) 0%, transparent 50%), radial-gradient(ellipse at 80% 80%, rgba(139,92,246,0.08) 0%, transparent 40%)',
            }}
          >
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <div className="min-w-0">
                <h3 className="mb-4 text-lg font-semibold text-foreground sm:text-xl">
                  {formatCount(CATALOG_TOTAL)} Components
                </h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  Responsive variants across 20 categories — size, state, and breakpoint built in.
                </p>
                <ul className="space-y-3">
                  {CATEGORY_SAMPLE.map((id) => (
                    <li key={id} className="flex items-center gap-3 text-sm text-muted-foreground">
                      <span
                        className="h-2 w-2 rounded-full"
                        style={{ backgroundColor: CATEGORY_META[id].accent }}
                      />
                      {CATEGORY_META[id].label}
                    </li>
                  ))}
                  <li className="text-sm text-muted-foreground">+{CATEGORIES.length - 8} more…</li>
                </ul>
              </div>
              <DeviceProvider screen={cycleScreen} scale={BENTO_DEVICE_SCALE}>
                <div
                  className="mx-auto overflow-hidden"
                  style={{
                    width: DEVICE_WIDTH * BENTO_DEVICE_SCALE,
                    height: DEVICE_HEIGHT * BENTO_DEVICE_SCALE,
                  }}
                >
                  <IPhoneMockup screen={cycleScreen} scale={BENTO_DEVICE_SCALE} />
                </div>
              </DeviceProvider>
            </div>
          </BentoCard>

          <BentoCard className="md:row-span-2" delay={0.1}>
            <div className="flex h-full flex-col">
              <svg
                className="mb-4 h-10 w-10 text-accent-blue"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-hidden
              >
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
              </svg>
              <h3 className="mb-2 text-xl font-semibold text-foreground">120fps Motion</h3>
              <p className="mb-6 flex-1 text-sm text-muted-foreground">
                Reanimated springs run on the UI thread. Gestures, layout, and opacity stay off the
                JS bridge for buttery interactions.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full border border-stroke bg-surface px-3 py-1 text-xs text-muted-foreground">
                  UI-thread springs
                </span>
                <span className="rounded-full border border-stroke bg-surface px-3 py-1 text-xs text-muted-foreground">
                  Zero jank
                </span>
              </div>
            </div>
          </BentoCard>

          <BentoCard delay={0.15}>
            <h3 className="mb-2 font-semibold text-foreground">Gesture-Driven</h3>
            <div className="mb-3 h-24">
              <GesturePreview />
            </div>
            <p className="text-sm text-muted-foreground">
              Magnetic pull, tilt parallax, and press feedback — built on Gesture Handler.
            </p>
          </BentoCard>

          <BentoCard delay={0.2}>
            <h3 className="mb-2 font-semibold text-foreground">Design Tokens</h3>
            <div className="mb-3 flex flex-wrap gap-1.5">
              {['primary', 'spacing', 'radius', 'springs'].map((t) => (
                <span
                  key={t}
                  className="rounded-md bg-surface px-2 py-1 font-mono text-[10px] text-violet-300"
                >
                  {t}
                </span>
              ))}
            </div>
            <p className="text-sm text-muted-foreground">
              Colors, typography, spacing, and spring presets — one source of truth.
            </p>
          </BentoCard>

          <BentoCard delay={0.25}>
            <h3 className="mb-2 font-semibold text-foreground">Plug & Play</h3>
            <CodeBlock
              code={`import { MagneticButton } from '@motionui/components'\n\n<MagneticButton onPress={handlePress}>Get started</MagneticButton>`}
              lang="tsx"
              className="mb-3 text-xs"
            />
            <p className="text-sm text-muted-foreground">
              Drop-in components. Sensible defaults. Full control.
            </p>
          </BentoCard>
        </div>
      </div>
    </section>
  );
}

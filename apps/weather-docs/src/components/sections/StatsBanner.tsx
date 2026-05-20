'use client';

import { motion, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { BentoCard } from '@/components/ui/BentoCard';
import { CATALOG_TOTAL } from '@/lib/componentCatalog';
import { RN_PATTERN_COUNT } from '@/lib/rnMobilePatterns';

const stats = [
  { value: Math.round(CATALOG_TOTAL / 1000), suffix: 'k+', label: 'UI components' },
  { value: RN_PATTERN_COUNT, suffix: '+', label: 'RN primitives' },
  { value: 12, suffix: '', label: 'Screen templates' },
  { value: 5, suffix: '', label: 'Breakpoints' },
];

const marqueeItems = [
  'React Native',
  'Reanimated',
  'Gesture Handler',
  'TypeScript',
  'Expo',
  'iOS',
  'Android',
];

function CountUp({
  target,
  suffix = '',
  inView,
}: {
  target: number;
  suffix?: string;
  inView: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1200;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      setCount(Math.round(target * (1 - Math.pow(1 - t, 3))));
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, target]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}

export function StatsBanner() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="section-pad overflow-x-clip">
      <div className="container-page max-w-4xl min-w-0" ref={ref}>
        <BentoCard className="relative overflow-hidden">
          <div
            className="pointer-events-none absolute inset-0 rounded-2xl opacity-50"
            style={{
              background: 'linear-gradient(135deg, rgba(59,130,246,0.15), rgba(139,92,246,0.15))',
            }}
          />
          <div className="relative grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4 md:gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-2xl font-bold text-foreground sm:text-3xl md:text-4xl">
                  <CountUp target={stat.value} suffix={stat.suffix} inView={inView} />
                </p>
                <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </BentoCard>

        <div className="mt-12 overflow-hidden">
          <motion.div
            className="flex gap-12 whitespace-nowrap"
            animate={{ x: [0, -700] }}
            transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
          >
            {[...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, i) => (
              <span key={`${item}-${i}`} className="text-sm font-medium text-muted-foreground">
                {item} ·
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

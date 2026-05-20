'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { BentoCard } from '@/components/ui/BentoCard';

const steps = [
  {
    icon: '◎',
    title: 'Compose',
    body: 'Drop in MagneticButton, TiltCard, and themed surfaces. Tokens handle spacing, color, and radius consistently.',
  },
  {
    icon: '⟳',
    title: 'Animate',
    body: 'useMotion drives springs and timings on the UI thread. Press, magnetic, and tilt hooks share one mental model.',
  },
  {
    icon: '◆',
    title: 'Ship',
    body: 'Gesture Handler + Reanimated under the hood. One codebase for iOS, Android, and Web with native-feel motion.',
  },
];

const layers = [
  { name: 'Theme', color: 'rgba(124, 58, 237, 0.5)' },
  { name: 'Layout', color: 'rgba(59, 130, 246, 0.45)' },
  { name: 'Gesture', color: 'rgba(16, 185, 129, 0.4)' },
  { name: 'Spring', color: 'rgba(251, 146, 60, 0.4)' },
  { name: 'Surface', color: 'rgba(236, 72, 153, 0.35)' },
  { name: 'Component', color: 'rgba(255, 255, 255, 0.25)' },
];

export function HowItWorks() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="section-pad overflow-x-clip">
      <div className="container-page min-w-0">
        <h2 className="mb-12 text-center text-2xl font-bold text-foreground sm:mb-16 sm:text-3xl">
          Built for production motion.
        </h2>

        <div className="relative mb-12 grid grid-cols-1 gap-6 sm:mb-20 sm:grid-cols-2 sm:gap-8 md:grid-cols-3">
          <div
            className="absolute left-[16%] right-[16%] top-8 hidden h-px bg-gradient-to-r from-transparent via-white/20 to-transparent md:block"
            aria-hidden
          />
          {steps.map((step, i) => (
            <BentoCard key={step.title} delay={i * 0.1} className="text-center">
              <div className="mb-4 text-3xl text-accent-blue">{step.icon}</div>
              <h3 className="mb-2 text-lg font-semibold text-foreground">{step.title}</h3>
              <p className="text-sm text-muted-foreground">{step.body}</p>
            </BentoCard>
          ))}
        </div>

        <div ref={ref} className="mx-auto w-full max-w-lg min-w-0 overflow-hidden">
          <p className="mb-6 text-center text-sm text-muted-foreground">Layered architecture</p>
          <div className="relative flex h-48 items-center justify-center sm:h-64">
            {layers.map((layer, i) => (
              <motion.div
                key={layer.name}
                initial={{ x: 0, opacity: 0.3 }}
                animate={
                  inView
                    ? {
                        x: (i - 2.5) * 14,
                        y: -i * 6,
                        opacity: 0.85 - i * 0.08,
                        rotate: -3 + i * 1.5,
                      }
                    : {}
                }
                transition={{ delay: i * 0.08, duration: 0.6, type: 'spring' }}
                className="absolute flex h-20 w-12 items-end justify-center rounded-2xl border border-stroke pb-2 backdrop-blur-sm sm:h-24 sm:w-16"
                style={{
                  background: layer.color,
                  zIndex: layers.length - i,
                }}
                title={layer.name}
              >
                <span className="text-[8px] font-medium text-foreground/80">{layer.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

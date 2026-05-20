'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { InteractiveDevice } from '@/components/ui/device/InteractiveDevice';
import { UI_SCREEN_ORDER, getScreen, type UIScreenId } from '@/lib/uiScreens';

function ScreenIcon({ id }: { id: UIScreenId }) {
  const colors: Record<UIScreenId, string> = {
    commerce: '#3b82f6',
    motionlab: '#8b5cf6',
    dashboard: '#3b82f6',
    wallet: '#10b981',
    social: '#ec4899',
    music: '#8b5cf6',
    fitness: '#f97316',
    chat: '#06b6d4',
    settings: '#64748b',
    notifications: '#ef4444',
    maps: '#22c55e',
    camera: '#eab308',
    search: '#0ea5e9',
    auth: '#f43f5e',
  };
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden className="shrink-0">
      <rect
        x="4"
        y="2"
        width="16"
        height="20"
        rx="3"
        fill="none"
        stroke={colors[id]}
        strokeWidth="1.5"
      />
      <line
        x1="8"
        y1="7"
        x2="16"
        y2="7"
        stroke={colors[id]}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ScreenCard({
  id,
  active,
  onSelect,
}: {
  id: UIScreenId;
  active: boolean;
  onSelect: () => void;
}) {
  const screen = getScreen(id);
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`w-full min-w-[140px] shrink-0 rounded-xl border p-3 text-left transition-all sm:min-w-0 sm:p-4 ${
        active
          ? 'border-l-2 border-l-accent-blue border-stroke bg-accent-blue/10 glow-blue'
          : 'border-stroke bg-surface hover:border-stroke'
      }`}
    >
      <div className="mb-1 flex items-center gap-2 sm:mb-2 sm:gap-3">
        <ScreenIcon id={id} />
        <span className="text-sm font-medium text-foreground sm:text-base">{screen.label}</span>
      </div>
      <p className="line-clamp-2 text-[10px] text-muted-foreground sm:text-xs">
        {screen.description}
      </p>
    </button>
  );
}

export function InteractiveDemo() {
  const [selected, setSelected] = useState<UIScreenId>('commerce');

  return (
    <section id="demo" className="section-pad overflow-x-clip bg-surface">
      <div className="container-page min-w-0">
        <h2 className="mb-4 text-center text-2xl font-bold text-foreground sm:mb-8 sm:text-3xl">
          Real apps. Real layouts.
        </h2>
        <p className="mx-auto mb-10 max-w-xl text-center text-sm text-muted-foreground">
          Twelve production screen types — tap any pattern to preview on device.
        </p>

        {/* Mobile: device first, horizontal screen picker */}
        <div className="flex flex-col gap-8 lg:hidden">
          <div className="flex w-full min-w-0 justify-center overflow-hidden">
            <motion.div key={selected} initial={{ opacity: 0.85 }} animate={{ opacity: 1 }}>
              <InteractiveDevice
                screen={selected}
                onScreenChange={setSelected}
                gutter={64}
                showHint={false}
              />
            </motion.div>
          </div>
          <div className="scroll-x-touch flex gap-2 pb-2">
            {UI_SCREEN_ORDER.map((id) => (
              <ScreenCard
                key={id}
                id={id}
                active={selected === id}
                onSelect={() => setSelected(id)}
              />
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={selected}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="rounded-xl border border-stroke bg-black/40 p-4 font-mono text-sm"
            >
              <span className="text-muted-foreground">Screen: </span>
              <span className="text-accent-blue">{getScreen(selected).label}</span>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Desktop: three columns */}
        <div className="hidden items-start gap-6 lg:grid lg:grid-cols-[1fr_auto_1fr] xl:gap-8">
          <div className="flex flex-col gap-3">
            {UI_SCREEN_ORDER.slice(0, 6).map((id) => (
              <ScreenCard
                key={id}
                id={id}
                active={selected === id}
                onSelect={() => setSelected(id)}
              />
            ))}
          </div>
          <div className="sticky top-24 flex flex-col items-center">
            <motion.div
              key={selected}
              initial={{ opacity: 0.85 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <InteractiveDevice
                screen={selected}
                onScreenChange={setSelected}
                gutter={80}
                showHint={false}
              />
            </motion.div>
            <AnimatePresence mode="wait">
              <motion.div
                key={selected}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="mt-8 w-full max-w-md rounded-xl border border-stroke bg-black/40 p-4 font-mono text-sm"
              >
                <span className="text-muted-foreground">Screen: </span>
                <span className="text-accent-blue">{getScreen(selected).label}</span>
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="flex flex-col gap-3">
            {UI_SCREEN_ORDER.slice(6).map((id) => (
              <ScreenCard
                key={id}
                id={id}
                active={selected === id}
                onSelect={() => setSelected(id)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

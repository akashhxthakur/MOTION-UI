'use client';

import { useState } from 'react';
import { BentoCard } from '@/components/ui/BentoCard';
import { CodeBlock } from '@/components/ui/CodeBlock';
import { NPM_INSTALL } from '@/lib/constants';

const tabs = ['Installation', 'Basic Usage', 'Theming', 'Components API'] as const;
type Tab = (typeof tabs)[number];

const snippets: Record<Exclude<Tab, 'Components API'>, string> = {
  Installation: NPM_INSTALL,
  'Basic Usage': `import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ThemeProvider } from '@motionui/theme';
import { MagneticButton, TiltCard } from '@motionui/components';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider defaultMode="dark">
        <MagneticButton onPress={() => {}}>Press me</MagneticButton>
        <TiltCard title="Hello" description="Motion-first UI" />
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}`,
  Theming: `import { ThemeProvider, useTheme } from '@motionui/theme';

<ThemeProvider defaultMode="system">
  <App />
</ThemeProvider>

// Access tokens at runtime
const { colors, spacing } = useTheme();`,
};

const apiRows = [
  {
    prop: 'variant',
    type: "'primary' | 'secondary' | 'ghost'",
    default: "'primary'",
    desc: 'Button style',
  },
  { prop: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", desc: 'Touch target size' },
  { prop: 'strength', type: 'number', default: '0.25', desc: 'Magnetic pull intensity (0–1)' },
  { prop: 'maxTilt', type: 'number', default: '10', desc: 'TiltCard max angle in degrees' },
  { prop: 'preset', type: 'SpringPreset', default: "'smooth'", desc: 'useMotion spring preset' },
];

export function CodeWalkthrough() {
  const [tab, setTab] = useState<Tab>('Installation');

  return (
    <section className="section-pad overflow-x-clip">
      <div className="container-page grid min-w-0 grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
        <div className="min-w-0">
          <h2 className="mb-4 text-2xl font-bold text-foreground sm:text-3xl">Start in minutes.</h2>
          <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
            Install the monorepo packages, wrap with providers, and compose realistic interfaces
            with motion primitives — no boilerplate circus.
          </p>
        </div>

        <BentoCard className="min-w-0">
          <div className="scroll-x-touch mb-4 flex gap-2 pb-1 sm:flex-wrap sm:overflow-visible">
            {tabs.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTab(t)}
                className={`shrink-0 rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                  tab === t
                    ? 'bg-accent-blue/20 text-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {tab === 'Components API' ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-stroke text-muted-foreground">
                    <th className="py-2 pr-4">Prop</th>
                    <th className="py-2 pr-4">Type</th>
                    <th className="py-2 pr-4">Default</th>
                    <th className="py-2">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {apiRows.map((row) => (
                    <tr key={row.prop} className="border-b border-white/5">
                      <td className="py-2 pr-4 font-mono text-accent-blue">{row.prop}</td>
                      <td className="py-2 pr-4 font-mono text-muted-foreground">{row.type}</td>
                      <td className="py-2 pr-4 font-mono text-muted-foreground">{row.default}</td>
                      <td className="py-2 text-muted-foreground">{row.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <CodeBlock code={snippets[tab]} lang={tab === 'Installation' ? 'bash' : 'tsx'} />
          )}
        </BentoCard>
      </div>
    </section>
  );
}

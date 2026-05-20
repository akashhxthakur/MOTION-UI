import Link from 'next/link';
import { PageShell } from '@/components/ui/PageShell';
import { CodeBlock } from '@/components/ui/CodeBlock';
import { NPM_INSTALL, PACKAGE_NAME } from '@/lib/constants';

export default function DocsPage() {
  return (
    <PageShell narrow>
      <h1 className="mb-4 text-2xl font-bold text-white sm:text-3xl md:text-4xl">Documentation</h1>
      <p className="mb-8 text-sm leading-relaxed text-zinc-400 sm:text-base">
        {PACKAGE_NAME} brings motion-first components and design tokens to React Native. Use the
        guides below to integrate realistic, production-ready UI into your app.
      </p>

      <h2 className="mb-4 text-lg font-semibold text-white sm:text-xl">Installation</h2>
      <CodeBlock code={NPM_INSTALL} lang="bash" />

      <h2 className="mb-4 mt-10 text-lg font-semibold text-white sm:mt-12 sm:text-xl">
        Quick start
      </h2>
      <CodeBlock
        code={`import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ThemeProvider } from '@motionui/theme';
import { MagneticButton, TiltCard } from '@motionui/components';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider>
        <MagneticButton onPress={() => {}}>Press me</MagneticButton>
        <TiltCard title="Hello" description="Motion-first card" />
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}`}
      />

      <p className="mt-10 sm:mt-12">
        <Link href="/" className="text-sm text-accent-blue hover:underline sm:text-base">
          ← Back to home
        </Link>
      </p>
    </PageShell>
  );
}

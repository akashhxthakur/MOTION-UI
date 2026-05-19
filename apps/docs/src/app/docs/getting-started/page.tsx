import { DocLayout } from '@/components/DocLayout';
import { CodeBlock } from '@/components/CodeBlock';

export default function GettingStartedPage() {
  return (
    <DocLayout title="Getting Started">
      <p>
        MotionUI Native is a motion-first React Native component ecosystem built with Expo,
        Reanimated, and Gesture Handler. It targets iOS, Android, and Web from a single codebase.
      </p>

      <h2 className="text-xl font-semibold text-foreground">Installation</h2>
      <CodeBlock>
        {`pnpm add @motionui/components @motionui/theme @motionui/motion \\
  react-native-reanimated react-native-gesture-handler`}
      </CodeBlock>

      <h2 className="text-xl font-semibold text-foreground">Setup</h2>
      <p>Wrap your app with the required providers:</p>
      <CodeBlock>
        {`import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ThemeProvider } from '@motionui/theme';
import { MagneticButton } from '@motionui/components';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider defaultMode="system">
        <MagneticButton onPress={() => {}}>Get Started</MagneticButton>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}`}
      </CodeBlock>

      <h2 className="text-xl font-semibold text-foreground">Babel Plugin</h2>
      <p>Add the Reanimated plugin to your Babel config (must be listed last):</p>
      <CodeBlock>
        {`module.exports = {
  presets: ['babel-preset-expo'],
  plugins: ['react-native-reanimated/plugin'],
};`}
      </CodeBlock>

      <h2 className="text-xl font-semibold text-foreground">Monorepo</h2>
      <p>
        Clone the repository and run{' '}
        <code className="rounded bg-card px-1.5 py-0.5 text-sm">pnpm install</code> followed by{' '}
        <code className="rounded bg-card px-1.5 py-0.5 text-sm">pnpm dev</code> to start the docs
        site and playground app.
      </p>
    </DocLayout>
  );
}

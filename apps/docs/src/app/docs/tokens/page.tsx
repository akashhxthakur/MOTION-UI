import { DocLayout } from '@/components/DocLayout';
import { CodeBlock } from '@/components/CodeBlock';
import { tokens } from '@motionui/tokens';

export default function TokensPage() {
  return (
    <DocLayout title="Design Tokens">
      <p>
        MotionUI uses a token-based design system. Tokens are platform-agnostic and can be synced
        with Figma in future releases.
      </p>

      <h2 className="text-xl font-semibold text-foreground">Usage</h2>
      <CodeBlock>
        {`import { tokens, springPresets, lightColors } from '@motionui/tokens';

const primary = lightColors.primary;
const spacing = tokens.spacing[4]; // 16
const spring = springPresets.smooth;`}
      </CodeBlock>

      <h2 className="text-xl font-semibold text-foreground">Token Categories</h2>
      <ul className="list-inside list-disc space-y-2">
        <li>Colors (light / dark palettes)</li>
        <li>Typography (font sizes, weights, line heights)</li>
        <li>Spacing (0–96 scale)</li>
        <li>Radius, shadows, blur presets</li>
        <li>Animation curves, spring & timing presets</li>
      </ul>

      <h2 className="text-xl font-semibold text-foreground">Spring Presets Preview</h2>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
        {Object.keys(tokens.animation.springs).map((name) => (
          <div
            key={name}
            className="rounded-lg border border-border bg-card/50 px-4 py-3 text-sm capitalize"
          >
            {name}
          </div>
        ))}
      </div>
    </DocLayout>
  );
}

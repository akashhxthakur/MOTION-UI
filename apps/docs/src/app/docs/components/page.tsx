import { DocLayout } from '@/components/DocLayout';
import { CodeBlock } from '@/components/CodeBlock';

export default function ComponentsPage() {
  return (
    <DocLayout title="Components">
      <p>
        Phase 1 ships two flagship components that demonstrate the motion architecture. More
        components are planned for Phase 2.
      </p>

      <h2 className="text-xl font-semibold text-foreground">MagneticButton</h2>
      <p>
        A gesture-aware button with magnetic pull effect. Drag over the button to feel the
        interaction follow your finger.
      </p>
      <CodeBlock>
        {`import { MagneticButton } from '@motionui/components';

<MagneticButton
  variant="primary"
  size="md"
  strength={0.25}
  onPress={() => console.log('pressed')}
>
  Press me
</MagneticButton>`}
      </CodeBlock>

      <h3 className="text-lg font-medium text-foreground">Props</h3>
      <ul className="list-inside list-disc space-y-1 text-sm">
        <li>
          <code>variant</code> — primary | secondary | ghost
        </li>
        <li>
          <code>size</code> — sm | md | lg
        </li>
        <li>
          <code>strength</code> — magnetic pull intensity (0–1)
        </li>
      </ul>

      <h2 className="mt-8 text-xl font-semibold text-foreground">TiltCard</h2>
      <p>
        A card with 3D tilt parallax driven by pan gestures. Uses spring physics for natural reset
        behavior.
      </p>
      <CodeBlock>
        {`import { TiltCard } from '@motionui/components';

<TiltCard
  title="Depth & Parallax"
  description="Physics-driven tilt with spring presets."
  maxTilt={10}
/>`}
      </CodeBlock>

      <h3 className="text-lg font-medium text-foreground">Props</h3>
      <ul className="list-inside list-disc space-y-1 text-sm">
        <li>
          <code>title</code> — card heading
        </li>
        <li>
          <code>description</code> — subtitle text
        </li>
        <li>
          <code>maxTilt</code> — maximum tilt angle in degrees
        </li>
      </ul>
    </DocLayout>
  );
}

import { DocLayout } from '@/components/DocLayout';
import { CodeBlock } from '@/components/CodeBlock';

export default function MotionPage() {
  return (
    <DocLayout title="Motion API">
      <p>
        The <code className="rounded bg-card px-1.5 py-0.5 text-sm">useMotion</code> hook provides a
        preset-driven animation API powered by Reanimated springs and timings.
      </p>

      <h2 className="text-xl font-semibold text-foreground">useMotion</h2>
      <CodeBlock>
        {`import { useMotion } from '@motionui/motion';
import { useEffect } from 'react';

function FadeIn() {
  const { animate, animatedStyle } = useMotion({
    type: 'spring',
    preset: 'smooth',
  });

  useEffect(() => {
    animate(1);
  }, []);

  return <Animated.View style={animatedStyle} />;
}`}
      </CodeBlock>

      <h2 className="text-xl font-semibold text-foreground">Spring Presets</h2>
      <ul className="list-inside list-disc space-y-2">
        <li>
          <strong>gentle</strong> — soft, relaxed motion
        </li>
        <li>
          <strong>smooth</strong> — balanced default
        </li>
        <li>
          <strong>snappy</strong> — quick press feedback
        </li>
        <li>
          <strong>bouncy</strong> — playful overshoot
        </li>
        <li>
          <strong>stiff</strong> — precise, minimal bounce
        </li>
        <li>
          <strong>wobbly</strong> — exaggerated spring
        </li>
      </ul>

      <h2 className="text-xl font-semibold text-foreground">Specialized Hooks</h2>
      <CodeBlock>
        {`import {
  usePressMotion,
  useMagneticMotion,
  useTiltMotion,
} from '@motionui/motion';

// Press scale feedback
const { pressIn, pressOut, animatedStyle } = usePressMotion({ preset: 'snappy' });

// Magnetic cursor follow
const { onMove, reset, animatedStyle } = useMagneticMotion({ strength: 0.3 });

// 3D card tilt
const { onMove, reset, animatedStyle } = useTiltMotion({ maxTilt: 12 });`}
      </CodeBlock>
    </DocLayout>
  );
}

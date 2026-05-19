export interface SpringConfig {
  damping?: number;
  stiffness?: number;
  mass?: number;
  overshootClamping?: boolean;
  restDisplacementThreshold?: number;
  restSpeedThreshold?: number;
}

export interface TimingConfig {
  duration?: number;
}

export const easing = {
  linear: [0, 0, 1, 1] as const,
  easeIn: [0.4, 0, 1, 1] as const,
  easeOut: [0, 0, 0.2, 1] as const,
  easeInOut: [0.4, 0, 0.2, 1] as const,
  bounce: [0.68, -0.55, 0.265, 1.55] as const,
} as const;

export type EasingToken = keyof typeof easing;

export const springPresets = {
  gentle: { damping: 20, stiffness: 120, mass: 1 },
  smooth: { damping: 25, stiffness: 200, mass: 1 },
  snappy: { damping: 18, stiffness: 300, mass: 0.8 },
  bouncy: { damping: 12, stiffness: 180, mass: 0.9 },
  stiff: { damping: 30, stiffness: 400, mass: 0.7 },
  wobbly: { damping: 8, stiffness: 150, mass: 1.2 },
} as const satisfies Record<string, SpringConfig>;

export type SpringPreset = keyof typeof springPresets;

export const timingPresets = {
  instant: { duration: 100 },
  fast: { duration: 200 },
  normal: { duration: 300 },
  slow: { duration: 500 },
  slower: { duration: 700 },
} as const satisfies Record<string, TimingConfig>;

export type TimingPreset = keyof typeof timingPresets;

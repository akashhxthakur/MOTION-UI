export * from './colors';
export * from './typography';
export * from './spacing';
export * from './radius';
export * from './shadows';
export * from './blur';
export {
  easing,
  springPresets,
  timingPresets,
  type EasingToken,
  type SpringPreset,
  type TimingPreset,
} from './animation';

import { lightColors, darkColors } from './colors';
import { fontFamily, fontSize, fontWeight, lineHeight, letterSpacing } from './typography';
import { spacing } from './spacing';
import { radius } from './radius';
import { shadows } from './shadows';
import { blur } from './blur';
import { easing, springPresets, timingPresets } from './animation';

export const tokens = {
  colors: { light: lightColors, dark: darkColors },
  typography: { fontFamily, fontSize, fontWeight, lineHeight, letterSpacing },
  spacing,
  radius,
  shadows,
  blur,
  animation: { easing, springs: springPresets, timings: timingPresets },
} as const;

export type Tokens = typeof tokens;

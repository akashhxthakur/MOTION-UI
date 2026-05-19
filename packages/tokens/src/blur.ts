export const blur = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 16,
  xl: 24,
  '2xl': 40,
} as const;

export type BlurToken = keyof typeof blur;

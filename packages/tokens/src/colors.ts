export const palette = {
  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',

  gray50: '#FAFAFA',
  gray100: '#F4F4F5',
  gray200: '#E4E4E7',
  gray300: '#D4D4D8',
  gray400: '#A1A1AA',
  gray500: '#71717A',
  gray600: '#52525B',
  gray700: '#3F3F46',
  gray800: '#27272A',
  gray900: '#18181B',
  gray950: '#09090B',

  violet400: '#A78BFA',
  violet500: '#8B5CF6',
  violet600: '#7C3AED',
  violet700: '#6D28D9',

  blue400: '#60A5FA',
  blue500: '#3B82F6',
  blue600: '#2563EB',

  emerald400: '#34D399',
  emerald500: '#10B981',

  rose400: '#FB7185',
  rose500: '#F43F5E',
} as const;

export const lightColors = {
  background: palette.white,
  backgroundSecondary: palette.gray50,
  backgroundTertiary: palette.gray100,
  foreground: palette.gray950,
  foregroundSecondary: palette.gray600,
  foregroundMuted: palette.gray400,
  border: palette.gray200,
  borderFocus: palette.violet500,
  primary: palette.violet600,
  primaryForeground: palette.white,
  secondary: palette.gray100,
  secondaryForeground: palette.gray900,
  accent: palette.violet500,
  accentForeground: palette.white,
  destructive: palette.rose500,
  destructiveForeground: palette.white,
  success: palette.emerald500,
  warning: '#F59E0B',
  card: palette.white,
  cardForeground: palette.gray950,
  overlay: 'rgba(0, 0, 0, 0.5)',
} as const;

export const darkColors = {
  background: palette.gray950,
  backgroundSecondary: palette.gray900,
  backgroundTertiary: palette.gray800,
  foreground: palette.gray50,
  foregroundSecondary: palette.gray400,
  foregroundMuted: palette.gray500,
  border: palette.gray800,
  borderFocus: palette.violet400,
  primary: palette.violet500,
  primaryForeground: palette.white,
  secondary: palette.gray800,
  secondaryForeground: palette.gray100,
  accent: palette.violet400,
  accentForeground: palette.gray950,
  destructive: palette.rose400,
  destructiveForeground: palette.white,
  success: palette.emerald400,
  warning: '#FBBF24',
  card: palette.gray900,
  cardForeground: palette.gray50,
  overlay: 'rgba(0, 0, 0, 0.7)',
} as const;

export type ColorToken = keyof typeof lightColors;
export type ColorValue = (typeof lightColors)[ColorToken];

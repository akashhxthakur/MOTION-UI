import { tokens, lightColors, darkColors, type ColorToken } from '@motionui/tokens';

export type ThemeMode = 'light' | 'dark' | 'system';

export type ColorPalette = typeof lightColors | typeof darkColors;

export interface Theme {
  mode: 'light' | 'dark';
  colors: ColorPalette;
  spacing: typeof tokens.spacing;
  radius: typeof tokens.radius;
  shadows: typeof tokens.shadows;
  blur: typeof tokens.blur;
  typography: typeof tokens.typography;
  animation: typeof tokens.animation;
}

export interface ThemeOverrides {
  colors?: Partial<Record<ColorToken, string>>;
}

export function createTheme(mode: 'light' | 'dark', overrides?: ThemeOverrides): Theme {
  const baseColors = mode === 'light' ? lightColors : darkColors;
  return {
    mode,
    colors: { ...baseColors, ...overrides?.colors } as ColorPalette,
    spacing: tokens.spacing,
    radius: tokens.radius,
    shadows: tokens.shadows,
    blur: tokens.blur,
    typography: tokens.typography,
    animation: tokens.animation,
  };
}

export const lightTheme = createTheme('light');
export const darkTheme = createTheme('dark');

export function getColor(theme: Theme, token: ColorToken): string {
  return theme.colors[token];
}

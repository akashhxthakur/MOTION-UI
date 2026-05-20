export type ThemeMode = 'light' | 'dark';

export interface ThemeTokens {
  background: string;
  foreground: string;
  surface: string;
  card: string;
  border: string;
  muted: string;
  mutedForeground: string;
  primary: string;
  primaryForeground: string;
  secondary: string;
  secondaryForeground: string;
  accentBlue: string;
  accentPurple: string;
  tabBar: string;
  input: string;
  status: string;
  success: string;
}

const LIGHT: ThemeTokens = {
  background: '#f8fafc',
  foreground: '#0f172a',
  surface: '#ffffff',
  card: '#ffffff',
  border: 'rgba(15, 23, 42, 0.1)',
  muted: '#64748b',
  mutedForeground: '#475569',
  primary: '#3b82f6',
  primaryForeground: '#ffffff',
  secondary: '#f1f5f9',
  secondaryForeground: '#0f172a',
  accentBlue: '#3b82f6',
  accentPurple: '#8b5cf6',
  tabBar: 'rgba(255, 255, 255, 0.92)',
  input: 'rgba(15, 23, 42, 0.06)',
  status: '#0f172a',
  success: '#059669',
};

const DARK: ThemeTokens = {
  background: '#05080f',
  foreground: '#f4f4f5',
  surface: '#080d18',
  card: '#12121a',
  border: 'rgba(255, 255, 255, 0.1)',
  muted: '#71717a',
  mutedForeground: '#a1a1aa',
  primary: '#3b82f6',
  primaryForeground: '#ffffff',
  secondary: 'rgba(255, 255, 255, 0.08)',
  secondaryForeground: '#f4f4f5',
  accentBlue: '#3b82f6',
  accentPurple: '#8b5cf6',
  tabBar: 'rgba(12, 12, 14, 0.95)',
  input: 'rgba(255, 255, 255, 0.06)',
  status: 'rgba(255, 255, 255, 0.9)',
  success: '#34d399',
};

export function getThemeTokens(mode: ThemeMode): ThemeTokens {
  return mode === 'light' ? LIGHT : DARK;
}

/** Device palette — same tokens, mapped to legacy shape for screens */
export function getDevicePalette(mode: ThemeMode) {
  const t = getThemeTokens(mode);
  return {
    bg: t.background,
    bgElevated: t.card,
    text: t.foreground,
    textMuted: t.mutedForeground,
    border: t.border,
    card: mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(15, 23, 42, 0.04)',
    cardHover: mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(15, 23, 42, 0.08)',
    tabBar: t.tabBar,
    status: t.status,
    input: t.input,
    primary: t.primary,
    primaryForeground: t.primaryForeground,
    secondary: t.secondary,
    success: t.success,
  };
}

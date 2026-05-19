import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { useColorScheme } from 'react-native';
import { createTheme, type Theme, type ThemeMode, type ThemeOverrides } from './createTheme';

interface ThemeContextValue {
  theme: Theme;
  mode: ThemeMode;
  resolvedMode: 'light' | 'dark';
  setMode: (mode: ThemeMode) => void;
  toggleMode: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export interface ThemeProviderProps {
  children: ReactNode;
  defaultMode?: ThemeMode;
  overrides?: ThemeOverrides;
}

export function ThemeProvider({ children, defaultMode = 'system', overrides }: ThemeProviderProps) {
  const systemScheme = useColorScheme();
  const [mode, setMode] = useState<ThemeMode>(defaultMode);

  const resolvedMode = useMemo<'light' | 'dark'>(() => {
    if (mode === 'system') {
      return systemScheme === 'dark' ? 'dark' : 'light';
    }
    return mode;
  }, [mode, systemScheme]);

  const theme = useMemo(() => createTheme(resolvedMode, overrides), [resolvedMode, overrides]);

  const toggleMode = useCallback(() => {
    setMode((prev) => {
      const current = prev === 'system' ? (systemScheme === 'dark' ? 'dark' : 'light') : prev;
      return current === 'light' ? 'dark' : 'light';
    });
  }, [systemScheme]);

  const value = useMemo<ThemeContextValue>(
    () => ({ theme, mode, resolvedMode, setMode, toggleMode }),
    [theme, mode, resolvedMode, toggleMode],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

export function useThemeColors() {
  const { theme } = useTheme();
  return theme.colors;
}

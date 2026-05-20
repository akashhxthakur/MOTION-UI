import type { UIScreenId } from './uiScreens';
import { getScreen } from './uiScreens';
import { getDevicePalette, type ThemeMode } from './themeTokens';

export type DeviceMode = ThemeMode;

export const DEVICE_SPRING = { type: 'spring' as const, stiffness: 380, damping: 32 };

export const DEVICE_SPACING = { xs: 4, sm: 8, md: 12, lg: 16 } as const;

export const DEVICE_RADIUS = { md: '0.75rem', lg: '1rem', xl: '1.25rem', '2xl': '1.5rem' } as const;

/** Grocify-style bottom nav: Home, Cart, Search FAB, Orders, Profile */
export const TAB_ITEMS = [
  { id: 'Home', label: 'Home', screen: 'commerce' as UIScreenId, fab: false },
  { id: 'Cart', label: 'Cart', screen: 'commerce' as UIScreenId, fab: false },
  { id: 'Search', label: 'Search', screen: 'search' as UIScreenId, fab: true },
  { id: 'Orders', label: 'Orders', screen: 'notifications' as UIScreenId, fab: false },
  { id: 'Profile', label: 'Profile', screen: 'settings' as UIScreenId, fab: false },
] as const;

export type TabId = (typeof TAB_ITEMS)[number]['id'];

export { getDevicePalette };

export function getScreenAccent(id: UIScreenId): string {
  return getScreen(id).accent;
}

export const SPRING_PRESETS = {
  smooth: { stiffness: 280, damping: 28 },
  snappy: { stiffness: 480, damping: 32 },
  bouncy: { stiffness: 520, damping: 18 },
} as const;

export type SpringPresetName = keyof typeof SPRING_PRESETS;

export function tabIdForScreen(screen: UIScreenId): TabId | null {
  const match = TAB_ITEMS.find((t) => t.screen === screen && !t.fab);
  return match?.id ?? null;
}

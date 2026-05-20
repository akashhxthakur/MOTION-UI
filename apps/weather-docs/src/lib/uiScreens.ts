export type UIScreenId =
  | 'commerce'
  | 'motionlab'
  | 'dashboard'
  | 'wallet'
  | 'social'
  | 'music'
  | 'fitness'
  | 'chat'
  | 'settings'
  | 'notifications'
  | 'maps'
  | 'camera'
  | 'search'
  | 'auth';

export interface UIScreen {
  id: UIScreenId;
  label: string;
  description: string;
  accent: string;
  bezelTint: string;
}

export const UI_SCREEN_ORDER: UIScreenId[] = [
  'commerce',
  'motionlab',
  'dashboard',
  'wallet',
  'social',
  'music',
  'fitness',
  'chat',
  'settings',
  'notifications',
  'maps',
  'camera',
  'search',
  'auth',
];

export const HERO_SCREENS: UIScreenId[] = [
  'commerce',
  'motionlab',
  'music',
  'wallet',
  'dashboard',
  'settings',
];

export const UI_SCREENS: Record<UIScreenId, UIScreen> = {
  commerce: {
    id: 'commerce',
    label: 'Commerce',
    description: 'Grocify-style glass shop with cart and categories.',
    accent: '#3b82f6',
    bezelTint: 'rgba(59, 130, 246, 0.25)',
  },
  motionlab: {
    id: 'motionlab',
    label: 'Motion Lab',
    description: 'MagneticButton, TiltCard, and spring presets.',
    accent: '#8b5cf6',
    bezelTint: 'rgba(139, 92, 246, 0.25)',
  },
  dashboard: {
    id: 'dashboard',
    label: 'Dashboard',
    description: 'Cards, charts, and dense data layouts.',
    accent: '#3b82f6',
    bezelTint: 'rgba(59, 130, 246, 0.2)',
  },
  wallet: {
    id: 'wallet',
    label: 'Wallet',
    description: 'Balances, transactions, and fintech patterns.',
    accent: '#10b981',
    bezelTint: 'rgba(16, 185, 129, 0.2)',
  },
  social: {
    id: 'social',
    label: 'Social',
    description: 'Feeds, stories, and profile surfaces.',
    accent: '#ec4899',
    bezelTint: 'rgba(236, 72, 153, 0.2)',
  },
  music: {
    id: 'music',
    label: 'Music',
    description: 'Media players and immersive gradients.',
    accent: '#8b5cf6',
    bezelTint: 'rgba(139, 92, 246, 0.25)',
  },
  fitness: {
    id: 'fitness',
    label: 'Fitness',
    description: 'Rings, metrics, and health dashboards.',
    accent: '#f97316',
    bezelTint: 'rgba(249, 115, 22, 0.2)',
  },
  chat: {
    id: 'chat',
    label: 'Chat',
    description: 'Messaging threads and input bars.',
    accent: '#06b6d4',
    bezelTint: 'rgba(6, 182, 212, 0.2)',
  },
  settings: {
    id: 'settings',
    label: 'Settings',
    description: 'Preferences, toggles, and system rows.',
    accent: '#64748b',
    bezelTint: 'rgba(100, 116, 139, 0.25)',
  },
  notifications: {
    id: 'notifications',
    label: 'Notifications',
    description: 'Alerts, badges, and notification center.',
    accent: '#ef4444',
    bezelTint: 'rgba(239, 68, 68, 0.2)',
  },
  maps: {
    id: 'maps',
    label: 'Maps',
    description: 'MapView, pins, and location UI.',
    accent: '#22c55e',
    bezelTint: 'rgba(34, 197, 94, 0.2)',
  },
  camera: {
    id: 'camera',
    label: 'Camera',
    description: 'Capture, scan, and media picker flows.',
    accent: '#eab308',
    bezelTint: 'rgba(234, 179, 8, 0.2)',
  },
  search: {
    id: 'search',
    label: 'Search',
    description: 'Search bars, filters, and results.',
    accent: '#0ea5e9',
    bezelTint: 'rgba(14, 165, 233, 0.2)',
  },
  auth: {
    id: 'auth',
    label: 'Auth',
    description: 'Login, signup, and verification.',
    accent: '#f43f5e',
    bezelTint: 'rgba(244, 63, 94, 0.2)',
  },
};

export function getScreen(id: UIScreenId): UIScreen {
  return UI_SCREENS[id];
}

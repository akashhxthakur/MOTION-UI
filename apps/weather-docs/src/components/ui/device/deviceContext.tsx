'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { useTheme } from 'next-themes';
import type { DeviceMode } from '@/lib/deviceDesignSystem';
import {
  TAB_ITEMS,
  tabIdForScreen,
  type TabId,
  type SpringPresetName,
} from '@/lib/deviceDesignSystem';
import { DEMO_PRODUCTS } from '@/lib/commerceDemoData';
import type { UIScreenId } from '@/lib/uiScreens';

export interface DeviceContextValue {
  screen: UIScreenId;
  activeTab: TabId;
  deviceMode: DeviceMode;
  scale: number;
  balanceExpanded: boolean;
  playing: boolean;
  selectedTx: string | null;
  searchQuery: string;
  settingsToggles: Record<string, boolean>;
  toast: string | null;
  cart: Record<string, number>;
  favorites: Record<string, boolean>;
  selectedCategory: string;
  springPreset: SpringPresetName;
  cartTotal: number;
  cartCount: number;
  setScreen: (id: UIScreenId) => void;
  setActiveTab: (tab: TabId) => void;
  toggleDeviceMode: () => void;
  setBalanceExpanded: (v: boolean) => void;
  setPlaying: (v: boolean) => void;
  setSelectedTx: (id: string | null) => void;
  setSearchQuery: (q: string) => void;
  toggleSetting: (key: string) => void;
  navigateTab: (tab: TabId) => void;
  showToast: (msg: string) => void;
  addToCart: (productId: string) => void;
  removeFromCart: (productId: string) => void;
  toggleFavorite: (productId: string) => void;
  setSelectedCategory: (id: string) => void;
  setSpringPreset: (preset: SpringPresetName) => void;
}

const DeviceContext = createContext<DeviceContextValue | null>(null);

interface DeviceProviderProps {
  children: ReactNode;
  screen: UIScreenId;
  onScreenChange?: (id: UIScreenId) => void;
  scale?: number;
}

export function DeviceProvider({
  children,
  screen,
  onScreenChange,
  scale = 1,
}: DeviceProviderProps) {
  const { resolvedTheme } = useTheme();
  const [activeTab, setActiveTab] = useState<TabId>(() => tabIdForScreen(screen) ?? 'Home');
  const [deviceModeOverride, setDeviceModeOverride] = useState<DeviceMode | null>(null);
  const deviceThemeLockedRef = useRef(false);
  const [balanceExpanded, setBalanceExpanded] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [selectedTx, setSelectedTx] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [settingsToggles, setSettingsToggles] = useState({
    notifications: true,
    haptics: true,
    analytics: false,
  });
  const [toast, setToast] = useState<string | null>(null);
  const [cart, setCart] = useState<Record<string, number>>({});
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [springPreset, setSpringPreset] = useState<SpringPresetName>('snappy');

  const siteMode: DeviceMode = resolvedTheme === 'light' ? 'light' : 'dark';
  const deviceMode = deviceModeOverride ?? siteMode;

  useEffect(() => {
    const tab = tabIdForScreen(screen);
    if (tab) setActiveTab(tab);
    else if (screen === 'search') setActiveTab('Search');
  }, [screen]);

  useEffect(() => {
    if (!deviceThemeLockedRef.current) {
      setDeviceModeOverride(null);
    }
  }, [resolvedTheme]);

  const setScreen = useCallback(
    (id: UIScreenId) => {
      onScreenChange?.(id);
      const tab = tabIdForScreen(id);
      if (tab) setActiveTab(tab);
    },
    [onScreenChange],
  );

  const navigateTab = useCallback(
    (tab: TabId) => {
      const item = TAB_ITEMS.find((t) => t.id === tab);
      if (!item) return;
      setActiveTab(tab);
      onScreenChange?.(item.screen);
    },
    [onScreenChange],
  );

  const toggleDeviceMode = useCallback(() => {
    deviceThemeLockedRef.current = true;
    setDeviceModeOverride((prev) => {
      const current = prev ?? siteMode;
      return current === 'dark' ? 'light' : 'dark';
    });
  }, [siteMode]);

  const toggleSetting = useCallback((key: string) => {
    setSettingsToggles((prev) => ({ ...prev, [key]: !prev[key as keyof typeof prev] }));
  }, []);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2000);
  }, []);

  const addToCart = useCallback((productId: string) => {
    setCart((prev) => ({ ...prev, [productId]: (prev[productId] ?? 0) + 1 }));
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    setCart((prev) => {
      const next = { ...prev };
      const qty = (next[productId] ?? 0) - 1;
      if (qty <= 0) delete next[productId];
      else next[productId] = qty;
      return next;
    });
  }, []);

  const toggleFavorite = useCallback((productId: string) => {
    setFavorites((prev) => ({ ...prev, [productId]: !prev[productId] }));
  }, []);

  const { cartTotal, cartCount } = useMemo(() => {
    let total = 0;
    let count = 0;
    for (const [id, qty] of Object.entries(cart)) {
      const p = DEMO_PRODUCTS.find((x) => x.id === id);
      if (p) {
        total += p.price * qty;
        count += qty;
      }
    }
    return { cartTotal: total, cartCount: count };
  }, [cart]);

  const value = useMemo<DeviceContextValue>(
    () => ({
      screen,
      activeTab,
      deviceMode,
      scale,
      balanceExpanded,
      playing,
      selectedTx,
      searchQuery,
      settingsToggles,
      toast,
      cart,
      favorites,
      selectedCategory,
      springPreset,
      cartTotal,
      cartCount,
      setScreen,
      setActiveTab,
      toggleDeviceMode,
      setBalanceExpanded,
      setPlaying,
      setSelectedTx,
      setSearchQuery,
      toggleSetting,
      navigateTab,
      showToast,
      addToCart,
      removeFromCart,
      toggleFavorite,
      setSelectedCategory,
      setSpringPreset,
    }),
    [
      screen,
      activeTab,
      deviceMode,
      scale,
      balanceExpanded,
      playing,
      selectedTx,
      searchQuery,
      settingsToggles,
      toast,
      cart,
      favorites,
      selectedCategory,
      springPreset,
      cartTotal,
      cartCount,
      setScreen,
      toggleDeviceMode,
      toggleSetting,
      navigateTab,
      showToast,
      addToCart,
      removeFromCart,
      toggleFavorite,
    ],
  );

  return <DeviceContext.Provider value={value}>{children}</DeviceContext.Provider>;
}

export function useDevice() {
  const ctx = useContext(DeviceContext);
  if (!ctx) throw new Error('useDevice must be used within DeviceProvider');
  return ctx;
}

export function useDeviceOptional() {
  return useContext(DeviceContext);
}

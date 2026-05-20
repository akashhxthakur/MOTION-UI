'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { DEVICE_SPRING, TAB_ITEMS, getDevicePalette, type TabId } from '@/lib/deviceDesignSystem';
import { useTapHandler } from '@/hooks/useTapHandler';
import { useDevice } from './deviceContext';

function TabIcon({ id, active }: { id: TabId; active: boolean }) {
  const opacity = active ? 1 : 0.45;
  const paths: Record<TabId, ReactNode> = {
    Home: (
      <path
        d="M4 10.5L12 4l8 6.5V18a1 1 0 01-1 1h-5v-5H10v5H5a1 1 0 01-1-1v-7.5z"
        fill="currentColor"
        opacity={opacity}
      />
    ),
    Cart: (
      <path
        d="M6 6h14l-1.5 9H8L6 6zm2 13a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm9 0a1.5 1.5 0 110-3 1.5 1.5 0 010 3z"
        fill="currentColor"
        opacity={opacity}
      />
    ),
    Search: (
      <>
        <circle
          cx="11"
          cy="11"
          r="6"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
          opacity={opacity}
        />
        <path d="M16 16l4 4" stroke="currentColor" strokeWidth="1.5" opacity={opacity} />
      </>
    ),
    Orders: (
      <path
        d="M4 6h16v10a1 1 0 01-1 1H5a1 1 0 01-1-1V6zm4 0l2 3h4l2-3"
        stroke="currentColor"
        strokeWidth="1.4"
        fill="none"
        opacity={opacity}
      />
    ),
    Profile: (
      <>
        <circle
          cx="12"
          cy="9"
          r="3.5"
          stroke="currentColor"
          strokeWidth="1.4"
          fill="none"
          opacity={opacity}
        />
        <path
          d="M5 19c0-3.5 3.1-5 7-5s7 1.5 7 5"
          stroke="currentColor"
          strokeWidth="1.4"
          fill="none"
          opacity={opacity}
        />
      </>
    ),
  };
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" className="shrink-0" aria-hidden>
      {paths[id]}
    </svg>
  );
}

export function DeviceScreenRoot({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  const { deviceMode, scale } = useDevice();
  const palette = getDevicePalette(deviceMode);

  return (
    <div
      className={`flex h-full min-h-0 w-full min-w-0 flex-col ${className}`}
      style={{
        fontSize: `${14 * scale}px`,
        backgroundColor: palette.bg,
        color: palette.text,
      }}
    >
      {children}
    </div>
  );
}

export function DeviceStatusBar() {
  const { deviceMode } = useDevice();
  const palette = getDevicePalette(deviceMode);

  return (
    <div
      className="flex shrink-0 items-center justify-between px-[1rem] pt-[0.65rem] text-[0.65rem] font-medium"
      style={{ color: palette.status }}
    >
      <span>9:41</span>
      <div className="flex items-center gap-[0.2rem]">
        <span
          className="h-[0.45rem] w-[0.7rem] rounded-sm opacity-80"
          style={{ backgroundColor: palette.status }}
        />
        <span
          className="h-[0.45rem] w-[0.45rem] rounded-full opacity-80"
          style={{ backgroundColor: palette.status }}
        />
      </div>
    </div>
  );
}

export function DeviceScrollBody({ children }: { children: ReactNode }) {
  return (
    <div className="pointer-events-auto min-h-0 flex-1 overflow-y-auto overscroll-contain px-[1rem] pb-[0.25rem] [-webkit-overflow-scrolling:touch]">
      {children}
    </div>
  );
}

export function DeviceCard({
  children,
  className = '',
  onClick,
  gradient,
}: {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  gradient?: string;
}) {
  const { deviceMode } = useDevice();
  const palette = getDevicePalette(deviceMode);
  const Comp = onClick ? motion.button : motion.div;

  return (
    <Comp
      type={onClick ? 'button' : undefined}
      onClick={onClick}
      whileTap={onClick ? { scale: 0.97 } : undefined}
      className={`min-w-0 overflow-hidden rounded-[1rem] p-[1rem] ring-1 ${className}`}
      style={{
        background: gradient ?? palette.card,
        borderColor: palette.border,
        boxShadow: deviceMode === 'light' ? '0 1px 3px rgba(15,23,42,0.06)' : undefined,
      }}
    >
      {children}
    </Comp>
  );
}

export function DeviceBalance({
  label,
  amount,
  change,
  gradient,
}: {
  label: string;
  amount: string;
  change?: string;
  gradient?: string;
}) {
  return (
    <DeviceCard gradient={gradient} className="w-full">
      <p className="font-ui truncate text-[0.65rem] uppercase tracking-wider opacity-70">{label}</p>
      <p className="font-tabular mt-[0.25rem] truncate text-[1.15rem] font-bold leading-tight">
        {amount}
      </p>
      {change && (
        <span className="mt-[0.5rem] inline-block rounded-full bg-black/10 px-[0.5rem] py-[0.15rem] text-[0.6rem] text-emerald-500 dark:text-emerald-400">
          {change}
        </span>
      )}
    </DeviceCard>
  );
}

function TabBarButton({
  tabId,
  label,
  active,
  badge,
  onPress,
}: {
  tabId: TabId;
  label: string;
  active: boolean;
  badge?: number;
  onPress: () => void;
}) {
  const tap = useTapHandler(onPress);
  const { deviceMode } = useDevice();
  const palette = getDevicePalette(deviceMode);

  return (
    <button
      {...tap}
      className="relative flex min-w-0 flex-1 flex-col items-center justify-center gap-[0.1rem] px-[0.15rem] py-[0.35rem]"
      style={{ color: active ? palette.primary : palette.textMuted }}
    >
      {active ? (
        <motion.span
          layoutId="device-tab-pill"
          className="absolute inset-[0.1rem] rounded-full"
          style={{ backgroundColor: `${palette.primary}22` }}
          transition={DEVICE_SPRING}
        />
      ) : null}
      <span className="relative">
        <TabIcon id={tabId} active={active} />
        {badge && badge > 0 ? (
          <span
            className="absolute -right-1.5 -top-1 grid h-[0.75rem] min-w-[0.75rem] place-items-center rounded-full px-[0.15rem] text-[0.4rem] font-bold text-white"
            style={{ backgroundColor: palette.primary }}
          >
            {badge > 9 ? '9+' : badge}
          </span>
        ) : null}
      </span>
      <span className="font-ui relative w-full truncate text-center text-[0.5rem] font-semibold leading-none">
        {label}
      </span>
    </button>
  );
}

export function DeviceTabBar() {
  const { activeTab, deviceMode, screen, navigateTab, cartCount } = useDevice();
  const palette = getDevicePalette(deviceMode);
  const sideTabs = TAB_ITEMS.filter((t) => !t.fab);
  const fabTab = TAB_ITEMS.find((t) => t.fab)!;
  const fabTap = useTapHandler(() => navigateTab(fabTab.id));
  const searchActive = screen === 'search';

  return (
    <div
      className="pointer-events-none absolute inset-x-[0.65rem] bottom-[0.65rem] z-[100] flex flex-col items-center"
      style={{ touchAction: 'manipulation' }}
    >
      <button
        {...fabTap}
        className="pointer-events-auto relative z-[110] -mb-[1.1rem] grid h-[2.35rem] w-[2.35rem] place-items-center rounded-full text-white shadow-lg"
        style={{
          background: `linear-gradient(135deg, ${palette.primary}, #8b5cf6)`,
          boxShadow: `0 10px 28px -6px ${palette.primary}88`,
          outline: `0.2rem solid ${palette.bg}`,
        }}
        aria-label="Search"
      >
        <TabIcon id="Search" active={searchActive} />
      </button>

      <div className={`device-glass-root ${deviceMode} pointer-events-auto w-full`}>
        <nav className="liquid-strong liquid-tab-bar relative flex items-stretch overflow-hidden rounded-full px-[0.15rem] pb-[0.45rem] pt-[1.35rem]">
          <span aria-hidden className="liquid-shine" />
          <span aria-hidden className="liquid-edge" />
          {sideTabs.map((tab) => (
            <TabBarButton
              key={tab.id}
              tabId={tab.id}
              label={tab.label}
              active={activeTab === tab.id}
              badge={tab.id === 'Cart' ? cartCount : undefined}
              onPress={() => navigateTab(tab.id)}
            />
          ))}
        </nav>
      </div>
    </div>
  );
}

export function DeviceToast() {
  const { toast, deviceMode } = useDevice();
  const palette = getDevicePalette(deviceMode);
  if (!toast) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="absolute left-[1rem] right-[1rem] top-[3rem] z-30 rounded-lg px-3 py-2 text-center text-[0.65rem] font-medium shadow-lg"
      style={{
        backgroundColor: palette.bgElevated,
        color: palette.text,
        border: `1px solid ${palette.border}`,
      }}
    >
      {toast}
    </motion.div>
  );
}

export function DevHint({ children, className = '' }: { children: string; className?: string }) {
  return (
    <span className={`mt-1 block truncate font-mono text-[0.5rem] opacity-40 ${className}`}>
      {children}
    </span>
  );
}

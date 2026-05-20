'use client';

import { motion } from 'framer-motion';
import type { UIScreenId } from '@/lib/uiScreens';
import { getScreen } from '@/lib/uiScreens';
import { useDeviceOptional } from './device/deviceContext';
import {
  AuthScreen,
  CameraScreen,
  ChatScreen,
  CommerceScreen,
  DashboardScreen,
  FitnessScreen,
  MapsScreen,
  MotionLabScreen,
  MusicScreen,
  NotificationsScreen,
  SearchScreen,
  SettingsScreen,
  SocialScreen,
  WalletScreen,
} from './device/screens';

interface DeviceUIScreenProps {
  screen: UIScreenId;
  className?: string;
}

const screens: Record<UIScreenId, () => React.ReactNode> = {
  commerce: CommerceScreen,
  motionlab: MotionLabScreen,
  dashboard: DashboardScreen,
  wallet: WalletScreen,
  social: SocialScreen,
  music: MusicScreen,
  fitness: FitnessScreen,
  chat: ChatScreen,
  settings: SettingsScreen,
  notifications: NotificationsScreen,
  maps: MapsScreen,
  camera: CameraScreen,
  search: SearchScreen,
  auth: AuthScreen,
};

export function DeviceUIScreen({ screen, className = '' }: DeviceUIScreenProps) {
  const ctx = useDeviceOptional();
  const activeScreen = ctx?.screen ?? screen;
  const Screen = screens[activeScreen];
  const accent = getScreen(activeScreen).accent;

  if (!Screen) {
    return (
      <div className={`flex h-full items-center justify-center ${className}`}>
        <p className="text-sm opacity-60">Screen not found</p>
      </div>
    );
  }

  return (
    <div className={`relative h-full min-h-0 w-full overflow-hidden ${className}`}>
      <motion.div
        key={activeScreen}
        initial={false}
        animate={{ opacity: 1 }}
        className="absolute inset-0 flex min-h-0 flex-col"
        style={{ touchAction: 'manipulation' }}
      >
        <Screen />
      </motion.div>
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-10 h-24 opacity-30"
        style={{ background: `linear-gradient(to bottom, ${accent}22, transparent)` }}
      />
    </div>
  );
}

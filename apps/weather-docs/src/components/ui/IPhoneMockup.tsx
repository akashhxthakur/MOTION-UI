'use client';

import {
  BEZEL,
  DEVICE_HEIGHT,
  DEVICE_WIDTH,
  FRAME_RADIUS,
  ISLAND_HEIGHT,
  ISLAND_TOP,
  ISLAND_WIDTH,
  SCREEN_RADIUS,
} from '@/lib/constants';
import type { UIScreenId } from '@/lib/uiScreens';
import { getScreen } from '@/lib/uiScreens';
import { DeviceTabBar } from './device/primitives';
import { DeviceUIScreen } from './DeviceUIScreen';

const SCREEN_W = DEVICE_WIDTH - BEZEL * 2;
const SCREEN_H = DEVICE_HEIGHT - BEZEL * 2;

export interface IPhoneMockupProps {
  screen?: UIScreenId;
  scale?: number;
  className?: string;
  floating?: boolean;
  children?: React.ReactNode;
  showScreen?: boolean;
  showTabBar?: boolean;
}

export function IPhoneMockup({
  screen = 'dashboard',
  scale = 1,
  className = '',
  floating = false,
  children,
  showScreen = true,
  showTabBar = true,
}: IPhoneMockupProps) {
  const bezelTint = getScreen(screen).bezelTint;
  const outerW = DEVICE_WIDTH * scale;
  const outerH = DEVICE_HEIGHT * scale;
  const viewportW = SCREEN_W * scale;
  const viewportH = SCREEN_H * scale;

  return (
    <div
      className={`relative ${floating ? 'animate-float' : ''} ${className}`}
      style={{ width: outerW, height: outerH }}
    >
      <div
        className="absolute inset-0"
        style={{
          borderRadius: FRAME_RADIUS * scale,
          background: `linear-gradient(135deg, #2a2a2e 0%, ${bezelTint}, #1c1c1e 40%, #252528 100%)`,
          boxShadow:
            'inset 2px 0 8px rgba(255,255,255,0.08), inset -2px 0 4px rgba(0,0,0,0.4), 0 25px 50px rgba(0,0,0,0.5)',
        }}
      >
        <div
          className="absolute overflow-hidden bg-[#05080f]"
          style={{
            left: BEZEL * scale,
            top: BEZEL * scale,
            width: viewportW,
            height: viewportH,
            borderRadius: SCREEN_RADIUS * scale,
          }}
        >
          <div
            className="device-screen-scaled relative h-full w-full"
            style={
              {
                '--device-zoom': scale,
                width: SCREEN_W,
                height: SCREEN_H,
              } as React.CSSProperties
            }
          >
            {showScreen ? <DeviceUIScreen screen={screen} className="h-full w-full" /> : children}
            {showScreen && showTabBar ? <DeviceTabBar /> : null}
          </div>
          <div
            className="pointer-events-none absolute left-1/2 z-[60] -translate-x-1/2 rounded-full bg-black"
            style={{
              top: (ISLAND_TOP - BEZEL) * scale,
              width: ISLAND_WIDTH * scale,
              height: ISLAND_HEIGHT * scale,
              borderRadius: 20 * scale,
            }}
          />
        </div>
      </div>
    </div>
  );
}

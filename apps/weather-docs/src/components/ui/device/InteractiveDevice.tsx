'use client';

import { useState } from 'react';
import { DEVICE_HEIGHT, DEVICE_WIDTH } from '@/lib/constants';
import { useDeviceScale } from '@/hooks/useDeviceScale';
import { IPhoneMockup } from '@/components/ui/IPhoneMockup';
import type { UIScreenId } from '@/lib/uiScreens';
import { DeviceProvider } from './deviceContext';

interface InteractiveDeviceProps {
  screen: UIScreenId;
  onScreenChange?: (id: UIScreenId) => void;
  gutter?: number;
  fixedScale?: number;
  floating?: boolean;
  showHint?: boolean;
  className?: string;
}

export function InteractiveDevice({
  screen,
  onScreenChange,
  gutter = 64,
  fixedScale,
  floating = false,
  showHint = true,
  className = '',
}: InteractiveDeviceProps) {
  const [hintDismissed, setHintDismissed] = useState(false);
  const autoScale = useDeviceScale(gutter);
  const scale = fixedScale ?? autoScale;

  return (
    <DeviceProvider screen={screen} onScreenChange={onScreenChange} scale={scale}>
      <div className={`flex flex-col items-center ${className}`}>
        <div
          className="mx-auto shrink-0"
          style={{ width: DEVICE_WIDTH * scale, height: DEVICE_HEIGHT * scale }}
        >
          <IPhoneMockup screen={screen} scale={scale} floating={floating} />
        </div>
        {showHint && !hintDismissed && (
          <div className="mt-3 flex items-center gap-2 rounded-full border border-stroke bg-surface/80 px-3 py-1.5 text-xs text-muted-foreground backdrop-blur sm:text-sm">
            <span>Tap tabs &amp; cards inside the device</span>
            <button
              type="button"
              onClick={() => setHintDismissed(true)}
              className="shrink-0 opacity-60 hover:opacity-100"
              aria-label="Dismiss hint"
            >
              ✕
            </button>
          </div>
        )}
      </div>
    </DeviceProvider>
  );
}

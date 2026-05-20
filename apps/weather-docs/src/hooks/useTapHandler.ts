'use client';

import { useCallback, useRef } from 'react';

/** Reliable tap/click for iOS Safari (avoids transform hit-target bugs and double-fires). */
export function useTapHandler(action: () => void) {
  const lastFire = useRef(0);

  const fire = useCallback(() => {
    const now = Date.now();
    if (now - lastFire.current < 280) return;
    lastFire.current = now;
    action();
  }, [action]);

  return {
    type: 'button' as const,
    onClick: (e: React.MouseEvent) => {
      e.stopPropagation();
      fire();
    },
    onTouchStart: (e: React.TouchEvent) => {
      e.stopPropagation();
    },
    onTouchEnd: (e: React.TouchEvent) => {
      e.preventDefault();
      e.stopPropagation();
      fire();
    },
    style: {
      touchAction: 'manipulation' as const,
      WebkitTapHighlightColor: 'transparent',
    },
  };
}

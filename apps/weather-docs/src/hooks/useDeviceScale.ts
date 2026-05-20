'use client';

import { useEffect, useState } from 'react';
import { DEVICE_WIDTH } from '@/lib/constants';

/** Scale so the device fits the viewport without expanding parent layout. */
export function useDeviceScale(horizontalPadding = 48) {
  const [scale, setScale] = useState(0.8);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      const available = Math.max(280, w - horizontalPadding);

      if (w >= 1280) {
        setScale(0.9);
      } else if (w >= 1024) {
        setScale(0.85);
      } else {
        const fit = available / DEVICE_WIDTH;
        setScale(Math.min(0.92, Math.max(0.65, fit)));
      }
    };

    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, [horizontalPadding]);

  return scale;
}

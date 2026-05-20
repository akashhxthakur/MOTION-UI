'use client';

import { DEVICE_HEIGHT, DEVICE_WIDTH } from '@/lib/constants';
import { useDeviceScale } from '@/hooks/useDeviceScale';
import { IPhoneMockup, type IPhoneMockupProps } from './IPhoneMockup';

type DevicePreviewProps = Omit<IPhoneMockupProps, 'scale'> & {
  /** Horizontal padding + gutters to subtract from viewport (default 48). */
  gutter?: number;
  /** Override auto scale (e.g. compact bento cards). */
  fixedScale?: number;
  className?: string;
};

export function DevicePreview({
  gutter = 48,
  fixedScale,
  className = '',
  ...props
}: DevicePreviewProps) {
  const autoScale = useDeviceScale(gutter);
  const scale = fixedScale ?? autoScale;

  return (
    <div
      className={`mx-auto shrink-0 ${className}`}
      style={{
        width: DEVICE_WIDTH * scale,
        height: DEVICE_HEIGHT * scale,
      }}
    >
      <IPhoneMockup {...props} scale={scale} />
    </div>
  );
}

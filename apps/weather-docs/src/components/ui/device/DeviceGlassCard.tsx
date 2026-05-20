'use client';

import type { HTMLAttributes, ReactNode } from 'react';
import { useDevice } from './deviceContext';

type DeviceGlassCardProps = HTMLAttributes<HTMLDivElement> & {
  intense?: boolean;
  bare?: boolean;
  interactive?: boolean;
  children: ReactNode;
};

function cn(...parts: (string | false | undefined)[]) {
  return parts.filter(Boolean).join(' ');
}

export function DeviceGlassCard({
  intense,
  bare,
  interactive,
  className,
  children,
  ...props
}: DeviceGlassCardProps) {
  const { deviceMode } = useDevice();

  return (
    <div className={cn('device-glass-root', deviceMode)}>
      <div
        className={cn(
          intense ? 'liquid-strong' : 'liquid',
          interactive && 'liquid-interactive',
          'min-w-0 overflow-hidden rounded-[1rem]',
          className,
        )}
        {...props}
      >
        {!bare ? (
          <>
            <span aria-hidden className="liquid-shine" />
            <span aria-hidden className="liquid-edge" />
          </>
        ) : null}
        <div className="relative z-[1]">{children}</div>
      </div>
    </div>
  );
}

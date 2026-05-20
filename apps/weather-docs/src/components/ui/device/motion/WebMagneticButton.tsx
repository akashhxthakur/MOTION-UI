'use client';

import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useRef, type ReactNode } from 'react';
import { useDevice } from '../deviceContext';
import { getDevicePalette } from '@/lib/deviceDesignSystem';

type Variant = 'primary' | 'secondary' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

interface WebMagneticButtonProps {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  strength?: number;
  onClick?: () => void;
  className?: string;
}

const sizeStyles: Record<Size, { px: string; py: string; fontSize: string; radius: string }> = {
  sm: { px: '0.65rem', py: '0.4rem', fontSize: '0.65rem', radius: '0.5rem' },
  md: { px: '0.85rem', py: '0.55rem', fontSize: '0.75rem', radius: '0.65rem' },
  lg: { px: '1rem', py: '0.7rem', fontSize: '0.8rem', radius: '0.75rem' },
};

export function WebMagneticButton({
  children,
  variant = 'primary',
  size = 'md',
  strength = 0.25,
  onClick,
  className = '',
}: WebMagneticButtonProps) {
  const { deviceMode } = useDevice();
  const palette = getDevicePalette(deviceMode);
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  const variantStyle: Record<Variant, React.CSSProperties> = {
    primary: { background: palette.primary, color: palette.primaryForeground, border: 'none' },
    secondary: { background: palette.secondary, color: palette.text, border: 'none' },
    ghost: {
      background: 'transparent',
      color: palette.text,
      border: `1px solid ${palette.border}`,
    },
  };

  const s = sizeStyles[size];

  const handleMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * strength);
    y.set((e.clientY - cy) * strength);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      type="button"
      onClick={onClick}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      style={{
        x: springX,
        y: springY,
        padding: `${s.py} ${s.px}`,
        fontSize: s.fontSize,
        borderRadius: s.radius,
        fontWeight: 600,
        fontFamily: 'var(--font-ui)',
        ...variantStyle[variant],
      }}
      whileTap={{ scale: 0.96 }}
      className={`font-ui min-w-0 truncate ${className}`}
    >
      {children}
    </motion.button>
  );
}

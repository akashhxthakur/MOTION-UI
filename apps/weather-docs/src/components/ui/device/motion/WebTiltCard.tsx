'use client';

import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useRef, type ReactNode } from 'react';
import { DeviceGlassCard } from '../DeviceGlassCard';

interface WebTiltCardProps {
  title?: string;
  description?: string;
  maxTilt?: number;
  children?: ReactNode;
  className?: string;
}

export function WebTiltCard({
  title,
  description,
  maxTilt = 10,
  children,
  className = '',
}: WebTiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 280, damping: 22 });
  const springY = useSpring(rotateY, { stiffness: 280, damping: 22 });

  const handleMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    rotateY.set((px - 0.5) * maxTilt * 2);
    rotateX.set((0.5 - py) * maxTilt * 2);
  };

  const handleLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      style={{
        rotateX: springX,
        rotateY: springY,
        transformStyle: 'preserve-3d',
        perspective: 800,
      }}
      className={`w-full min-w-0 ${className}`}
    >
      <DeviceGlassCard intense className="p-[0.85rem]">
        {title ? <p className="font-ui text-[0.8rem] font-semibold">{title}</p> : null}
        {description ? (
          <p className="font-ui mt-[0.25rem] text-[0.65rem] opacity-60">{description}</p>
        ) : null}
        {children}
      </DeviceGlassCard>
    </motion.div>
  );
}

'use client';

import type { UIScreenId } from '@/lib/uiScreens';
import { getScreen } from '@/lib/uiScreens';
import { useTapHandler } from '@/hooks/useTapHandler';

interface ScreenSwitcherProps {
  screens: UIScreenId[];
  active: UIScreenId;
  onChange: (id: UIScreenId) => void;
  className?: string;
}

function SwitcherPill({
  id,
  isActive,
  onChange,
}: {
  id: UIScreenId;
  isActive: boolean;
  onChange: (id: UIScreenId) => void;
}) {
  const screen = getScreen(id);
  const tap = useTapHandler(() => onChange(id));

  return (
    <button
      {...tap}
      className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
        isActive
          ? 'border border-accent-blue/50 bg-accent-blue/20 text-foreground glow-blue'
          : 'border border-stroke bg-surface text-muted-foreground hover:border-stroke hover:text-foreground'
      }`}
      style={isActive ? { boxShadow: `0 0 20px ${screen.accent}40` } : undefined}
    >
      {screen.label}
    </button>
  );
}

export function ScreenSwitcher({ screens, active, onChange, className = '' }: ScreenSwitcherProps) {
  return (
    <div
      className={`flex flex-wrap justify-center gap-2 sm:flex-wrap ${className}`}
      style={{ touchAction: 'manipulation' }}
    >
      {screens.map((id) => (
        <SwitcherPill key={id} id={id} isActive={id === active} onChange={onChange} />
      ))}
    </div>
  );
}

'use client';

import type { CatalogComponent } from '@/lib/componentCatalog';
import { CATEGORY_META } from '@/lib/componentCatalog';

interface ComponentPreviewThumbProps {
  component: CatalogComponent;
  className?: string;
}

export function ComponentPreviewThumb({ component, className = '' }: ComponentPreviewThumbProps) {
  const accent = CATEGORY_META[component.category].accent;

  return (
    <div
      className={`relative flex h-[100px] w-full flex-col justify-end overflow-hidden rounded-lg border border-white/10 bg-[#0c0c12] p-2 ${className}`}
    >
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background: `radial-gradient(circle at 30% 20%, ${accent}55 0%, transparent 55%)`,
        }}
      />
      <div className="relative z-10 space-y-1.5">
        <PreviewPrimitive category={component.category} accent={accent} state={component.state} />
        <div className="flex gap-1">
          <span className="rounded bg-white/10 px-1 py-0.5 font-mono text-[8px] text-zinc-400">
            {component.size}
          </span>
          <span className="rounded bg-white/10 px-1 py-0.5 font-mono text-[8px] text-zinc-400">
            {component.breakpoint}
          </span>
        </div>
      </div>
    </div>
  );
}

function PreviewPrimitive({
  category,
  accent,
  state,
}: {
  category: CatalogComponent['category'];
  accent: string;
  state: CatalogComponent['state'];
}) {
  const opacity = state === 'disabled' ? 0.4 : 1;

  if (category === 'buttons' || category === 'motion') {
    return (
      <div
        className="h-6 w-16 rounded-md"
        style={{
          opacity,
          background: `linear-gradient(135deg, ${accent}, ${accent}99)`,
        }}
      />
    );
  }

  if (category === 'inputs' || category === 'forms') {
    return (
      <div
        className="h-5 w-full rounded-md border border-white/15 bg-white/5"
        style={{ opacity }}
      />
    );
  }

  if (category === 'cards' || category === 'commerce') {
    return (
      <div className="space-y-1" style={{ opacity }}>
        <div className="h-2 w-3/4 rounded bg-white/20" />
        <div className="h-8 w-full rounded-md bg-white/10" />
      </div>
    );
  }

  if (category === 'lists' || category === 'chat') {
    return (
      <div className="space-y-1" style={{ opacity }}>
        {[0, 1, 2].map((i) => (
          <div key={i} className="flex items-center gap-1">
            <div className="h-3 w-3 rounded-full bg-white/20" />
            <div className="h-2 flex-1 rounded bg-white/10" />
          </div>
        ))}
      </div>
    );
  }

  if (category === 'charts' || category === 'data') {
    return (
      <svg viewBox="0 0 80 32" className="h-8 w-full" style={{ opacity }}>
        <path d="M0 24 L20 16 L40 20 L60 8 L80 12" fill="none" stroke={accent} strokeWidth="2" />
      </svg>
    );
  }

  return (
    <div
      className="h-8 w-full rounded-lg border border-white/10"
      style={{ opacity, borderColor: `${accent}44` }}
    />
  );
}

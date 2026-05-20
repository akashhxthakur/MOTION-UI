import type { HTMLAttributes } from 'react';

type GlassCardProps = HTMLAttributes<HTMLDivElement> & {
  intense?: boolean;
  bare?: boolean;
  interactive?: boolean;
};

function cn(...parts: (string | false | undefined)[]) {
  return parts.filter(Boolean).join(' ');
}

export function GlassCard({
  intense,
  bare,
  interactive,
  className,
  children,
  ...props
}: GlassCardProps) {
  return (
    <div
      className={cn(
        intense ? 'liquid-strong' : 'liquid',
        interactive && 'liquid-interactive cursor-pointer',
        'overflow-hidden rounded-3xl',
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
      <div className="relative">{children}</div>
    </div>
  );
}

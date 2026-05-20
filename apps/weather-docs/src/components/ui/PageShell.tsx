import type { ReactNode } from 'react';

interface PageShellProps {
  children: ReactNode;
  className?: string;
  narrow?: boolean;
}

/** Consistent responsive page wrapper for all routes. */
export function PageShell({ children, className = '', narrow = false }: PageShellProps) {
  return (
    <div className={`section-pad min-w-0 w-full ${className}`}>
      <div className={`container-page min-w-0 ${narrow ? 'max-w-3xl' : ''}`}>{children}</div>
    </div>
  );
}

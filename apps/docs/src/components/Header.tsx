import Link from 'next/link';

const nav = [
  { href: '/docs/getting-started', label: 'Docs' },
  { href: '/docs/motion', label: 'Motion' },
  { href: '/docs/components', label: 'Components' },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-lg">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="text-lg font-bold text-foreground">
          MotionUI
        </Link>
        <nav className="flex gap-6">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-muted-foreground transition hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

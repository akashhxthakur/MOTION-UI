import Link from 'next/link';

const sidebar = [
  { href: '/docs/getting-started', label: 'Getting Started' },
  { href: '/docs/motion', label: 'Motion API' },
  { href: '/docs/tokens', label: 'Design Tokens' },
  { href: '/docs/components', label: 'Components' },
];

export function DocLayout({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mx-auto flex max-w-6xl gap-12 px-6 py-12">
      <aside className="hidden w-48 shrink-0 md:block">
        <nav className="sticky top-24 space-y-1">
          {sidebar.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block rounded-lg px-3 py-2 text-sm text-muted-foreground transition hover:bg-card hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>
      <article className="min-w-0 flex-1">
        <h1 className="mb-8 text-3xl font-bold text-foreground">{title}</h1>
        <div className="space-y-6 text-muted-foreground">{children}</div>
      </article>
    </div>
  );
}

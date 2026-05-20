'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import {
  CATALOG_TOTAL,
  CATEGORIES,
  CATEGORY_META,
  type CatalogComponent,
  type ComponentCategory,
  formatCount,
  searchCatalog,
} from '@/lib/componentCatalog';
import { ComponentPreviewThumb } from './ComponentPreviewThumb';
import { CodeBlock } from './CodeBlock';
import { GlassCard } from '@/components/ui/GlassCard';
import { InteractiveDevice } from './device/InteractiveDevice';

interface ComponentCatalogBrowserProps {
  compact?: boolean;
  initialCategory?: ComponentCategory | 'all';
}

export function ComponentCatalogBrowser({
  compact = false,
  initialCategory = 'all',
}: ComponentCatalogBrowserProps) {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [category, setCategory] = useState<ComponentCategory | 'all'>(initialCategory);
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<CatalogComponent | null>(null);
  const [copied, setCopied] = useState(false);
  const pageSize = compact ? 12 : 48;

  useEffect(() => {
    const t = setTimeout(() => setDebouncedQuery(query), 250);
    return () => clearTimeout(t);
  }, [query]);

  useEffect(() => {
    setPage(1);
  }, [debouncedQuery, category]);

  useEffect(() => {
    if (!selected) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [selected]);

  const result = searchCatalog({
    query: debouncedQuery,
    category,
    page,
    pageSize,
  });

  const copySource = async () => {
    if (!selected) return;
    await navigator.clipboard.writeText(selected.source);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const goPage = useCallback(
    (next: number) => {
      setPage(Math.min(Math.max(1, next), result.totalPages));
    },
    [result.totalPages],
  );

  return (
    <div className={`min-w-0 w-full ${compact ? '' : 'container-page'}`}>
      <div className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          {!compact && (
            <p className="mb-2 text-sm font-medium text-accent-blue">
              {formatCount(CATALOG_TOTAL)} responsive components
            </p>
          )}
          <h2
            className={
              compact
                ? 'text-xl font-bold text-foreground sm:text-2xl'
                : 'text-2xl font-bold text-foreground sm:text-3xl'
            }
          >
            {compact ? 'Browse the library' : 'Component catalog'}
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Every entry ships with size, state, and breakpoint variants for React Native.
          </p>
        </div>
        {compact && (
          <Link
            href="/components"
            className="shrink-0 rounded-lg border border-stroke px-4 py-2 text-sm text-foreground hover:bg-surface"
          >
            View all {formatCount(CATALOG_TOTAL)} →
          </Link>
        )}
      </div>

      <div className="mb-4">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search buttons, cards, charts…"
          className="w-full rounded-xl border border-stroke bg-surface px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-accent-blue/50 focus:outline-none"
        />
      </div>

      <div className="scroll-x-touch mb-6 flex gap-2 pb-1 sm:flex-wrap sm:overflow-visible">
        <CategoryPill label="All" active={category === 'all'} onClick={() => setCategory('all')} />
        {CATEGORIES.map((cat) => (
          <CategoryPill
            key={cat}
            label={CATEGORY_META[cat].label}
            active={category === cat}
            onClick={() => setCategory(cat)}
          />
        ))}
      </div>

      <p className="mb-4 text-xs text-muted-foreground">
        Showing {result.items.length} of {result.total.toLocaleString()} matches
        {debouncedQuery ? ` for “${debouncedQuery}”` : ''}
      </p>

      <div className="grid grid-cols-2 gap-3 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {result.items.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setSelected(item)}
            className="glass glass-hover rounded-xl p-3 text-left"
          >
            <ComponentPreviewThumb component={item} />
            <p className="mt-2 truncate text-xs font-medium text-foreground">{item.name}</p>
            <p className="truncate text-[10px] text-muted-foreground">{item.categoryLabel}</p>
          </button>
        ))}
      </div>

      {result.totalPages > 1 && (
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            disabled={page <= 1}
            onClick={() => goPage(page - 1)}
            className="rounded-lg border border-stroke px-4 py-2 text-sm text-muted-foreground disabled:opacity-30"
          >
            Previous
          </button>
          <span className="text-center text-sm text-muted-foreground">
            Page {result.page} / {result.totalPages.toLocaleString()}
          </span>
          <button
            type="button"
            disabled={page >= result.totalPages}
            onClick={() => goPage(page + 1)}
            className="rounded-lg border border-stroke px-4 py-2 text-sm text-muted-foreground disabled:opacity-30"
          >
            Next
          </button>
        </div>
      )}

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex bg-black/80 p-2 backdrop-blur-sm sm:items-center sm:justify-center sm:p-4"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="h-full w-full max-w-5xl sm:h-auto sm:max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <GlassCard
                intense
                className="flex h-full min-h-0 flex-col overflow-hidden p-4 sm:max-h-[90vh]"
              >
                <div className="mb-4 flex flex-wrap gap-2">
                  {selected.tags.slice(0, 5).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-surface px-2 py-0.5 font-mono text-[10px] text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex min-h-0 flex-1 flex-col gap-6 overflow-y-auto lg:grid lg:grid-cols-2 lg:gap-8">
                  <div className="flex shrink-0 justify-center overflow-hidden">
                    <InteractiveDevice screen={selected.screen} gutter={56} showHint={false} />
                  </div>
                  <div className="min-w-0">
                    <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground sm:text-xl">
                          {selected.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">{selected.description}</p>
                      </div>
                      <button
                        type="button"
                        onClick={copySource}
                        className="shrink-0 rounded-lg border border-stroke px-3 py-1 text-sm text-muted-foreground hover:bg-surface"
                      >
                        {copied ? 'Copied!' : 'Copy'}
                      </button>
                    </div>
                    <CodeBlock code={selected.source} />
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setSelected(null)}
                  className="mt-4 w-full shrink-0 rounded-lg border border-stroke py-2 text-sm text-muted-foreground hover:text-foreground"
                >
                  Close
                </button>
              </GlassCard>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function CategoryPill({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium transition ${
        active
          ? 'bg-accent-blue/20 text-foreground ring-1 ring-accent-blue/40'
          : 'bg-surface text-muted-foreground hover:text-foreground'
      }`}
    >
      {label}
    </button>
  );
}

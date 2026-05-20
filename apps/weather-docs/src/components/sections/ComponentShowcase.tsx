'use client';

import { ComponentCatalogBrowser } from '@/components/ui/ComponentCatalogBrowser';
import { CATALOG_TOTAL, formatCount } from '@/lib/componentCatalog';

export function ComponentShowcase() {
  return (
    <section id="components" className="section-pad overflow-x-clip">
      <div className="container-page min-w-0">
        <div className="mb-10 text-center">
          <p className="mb-2 text-sm font-medium text-accent-blue">
            {formatCount(CATALOG_TOTAL)} components · fully responsive
          </p>
          <h2 className="text-2xl font-bold text-foreground sm:text-3xl">Every component. Live.</h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Buttons, forms, charts, navigation, and motion primitives — each with size, state, and
            breakpoint variants for phone, tablet, foldable, desktop, and watch.
          </p>
        </div>
        <ComponentCatalogBrowser compact initialCategory="all" />
      </div>
    </section>
  );
}

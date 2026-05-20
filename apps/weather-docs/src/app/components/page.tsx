import Link from 'next/link';
import { PageShell } from '@/components/ui/PageShell';
import { ComponentCatalogBrowser } from '@/components/ui/ComponentCatalogBrowser';
import { CATALOG_TOTAL, formatCount } from '@/lib/componentCatalog';

export const metadata = {
  title: `Components — ${formatCount(CATALOG_TOTAL)} responsive UI primitives`,
  description: `Browse ${CATALOG_TOTAL.toLocaleString()}+ responsive React Native UI components with live previews and copy-ready source.`,
};

export default function ComponentsPage() {
  return (
    <PageShell>
      <Link href="/" className="mb-6 inline-block text-sm text-accent-blue hover:underline sm:mb-8">
        ← Back to home
      </Link>
      <ComponentCatalogBrowser />
    </PageShell>
  );
}

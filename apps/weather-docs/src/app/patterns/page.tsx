import Link from 'next/link';
import { PageShell } from '@/components/ui/PageShell';
import { CATALOG_TOTAL, formatCount } from '@/lib/componentCatalog';
import { RN_MOBILE_PATTERN_GROUPS, RN_PATTERN_COUNT } from '@/lib/rnMobilePatterns';

export const metadata = {
  title: 'React Native mobile patterns — MotionUI Native',
  description: `Reference of ${RN_PATTERN_COUNT}+ UI primitives and patterns used in production React Native mobile apps.`,
};

export default function PatternsPage() {
  return (
    <PageShell>
      <Link href="/" className="mb-6 inline-block text-sm text-accent-blue hover:underline sm:mb-8">
        ← Back to home
      </Link>

      <h1 className="mb-3 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
        React Native mobile patterns
      </h1>
      <p className="mb-10 max-w-2xl text-sm leading-relaxed text-zinc-400 sm:mb-12 sm:text-base">
        A complete checklist of UI surfaces, native APIs, and interaction patterns found in real iOS
        and Android apps — mapped to MotionUI components and catalog entries.
      </p>

      <div className="space-y-8 sm:space-y-10">
        {RN_MOBILE_PATTERN_GROUPS.map((group) => (
          <section key={group.id} id={group.id} className="min-w-0">
            <h2 className="mb-2 text-lg font-semibold text-white sm:text-xl">{group.title}</h2>
            <p className="mb-4 text-sm text-zinc-500">{group.description}</p>
            <div className="grid grid-cols-1 gap-2 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {group.items.map((item) => (
                <div
                  key={item}
                  className="rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-zinc-300"
                >
                  {item}
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      <p className="mt-10 text-center text-sm text-zinc-500 sm:mt-12">
        {RN_PATTERN_COUNT} patterns · browse{' '}
        <Link href="/components" className="text-accent-blue hover:underline">
          {formatCount(CATALOG_TOTAL)} component variants
        </Link>
      </p>
    </PageShell>
  );
}

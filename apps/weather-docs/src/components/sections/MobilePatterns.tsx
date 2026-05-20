'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { RN_MOBILE_PATTERN_GROUPS, RN_PATTERN_COUNT } from '@/lib/rnMobilePatterns';

export function MobilePatterns() {
  return (
    <section id="patterns" className="section-pad overflow-x-clip bg-surface">
      <div className="container-page min-w-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <p className="mb-2 text-sm font-medium text-accent-blue">
            {RN_PATTERN_COUNT}+ React Native primitives
          </p>
          <h2 className="text-2xl font-bold text-foreground sm:text-3xl md:text-4xl">
            Everything mobile apps use
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-muted-foreground sm:text-base">
            Safe areas, navigation, gestures, maps, camera, push notifications, sheets, lists,
            forms, and commerce — the full surface area of production iOS & Android apps.
          </p>
          <Link
            href="/patterns"
            className="mt-6 inline-block rounded-lg border border-stroke px-5 py-2 text-sm text-foreground hover:bg-surface"
          >
            View full pattern reference →
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {RN_MOBILE_PATTERN_GROUPS.map((group, i) => (
            <motion.div
              key={group.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="glass rounded-2xl p-5"
            >
              <h3 className="mb-1 font-semibold text-foreground">{group.title}</h3>
              <p className="mb-4 text-xs text-muted-foreground">{group.description}</p>
              <ul className="flex flex-wrap gap-1.5">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-md bg-surface px-2 py-1 text-[10px] text-muted-foreground sm:text-xs"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

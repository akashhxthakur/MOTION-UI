'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function HomePage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      className="mx-auto max-w-4xl px-6 py-24"
    >
      <div className="mb-4 inline-flex items-center rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-1.5 text-sm text-violet-400">
        Open Source · React Native · Expo
      </div>

      <h1 className="mb-6 text-5xl font-bold tracking-tight text-foreground md:text-6xl">
        Motion-first components
        <br />
        <span className="bg-gradient-to-r from-violet-400 to-violet-600 bg-clip-text text-transparent">
          for React Native
        </span>
      </h1>

      <p className="mb-10 max-w-2xl text-lg text-muted-foreground">
        MotionUI Native brings Framer Motion-level interactions to React Native. Spring-based
        animations, gesture-driven components, and a token-based design system — built for iOS,
        Android, and Web.
      </p>

      <motion.div
        className="flex flex-wrap gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <Link
          href="/docs/getting-started"
          className="rounded-xl bg-violet-600 px-6 py-3 font-semibold text-white transition hover:bg-violet-500"
        >
          Get Started
        </Link>
        <a
          href="https://github.com/motionui/motionui-native"
          className="rounded-xl border border-border px-6 py-3 font-semibold text-foreground transition hover:bg-card"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
      </motion.div>

      <div className="mt-24 grid gap-6 md:grid-cols-3">
        {[
          {
            title: 'Motion Engine',
            desc: 'useMotion hook with spring & timing presets',
          },
          {
            title: 'Design Tokens',
            desc: 'Colors, typography, spacing, and animation curves',
          },
          {
            title: 'Cross-Platform',
            desc: 'iOS, Android, and Web from a single codebase',
          },
        ].map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + i * 0.1 }}
            className="rounded-2xl border border-border bg-card/50 p-6"
          >
            <h3 className="mb-2 font-semibold text-card-foreground">{item.title}</h3>
            <p className="text-sm text-muted-foreground">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

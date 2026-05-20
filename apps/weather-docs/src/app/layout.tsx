import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { NavBar } from '@/components/ui/NavBar';
import { Footer } from '@/components/ui/Footer';

export const metadata: Metadata = {
  title: 'MotionUI Native — Interfaces that feel real',
  description:
    'Motion-first React Native components with realistic UI patterns, spring physics, gestures, and a token-based design system.',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <ThemeProvider>
          <div className="grid-bg" aria-hidden />
          <NavBar />
          <main className="relative z-10 min-w-0 w-full overflow-x-clip">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}

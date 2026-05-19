# MotionUI Native

Motion-first React Native component ecosystem — spring-based animations, gesture-driven interactions, and a token-based design system for iOS, Android, and Web.

## Packages

| Package                | Description                                  |
| ---------------------- | -------------------------------------------- |
| `@motionui/tokens`     | Design tokens (colors, spacing, springs)     |
| `@motionui/theme`      | Runtime theming with light/dark mode         |
| `@motionui/motion`     | Animation primitives (`useMotion`, gestures) |
| `@motionui/components` | Motion-first UI components                   |
| `@motionui/core`       | Shared utilities                             |
| `@motionui/hooks`      | Custom React hooks                           |
| `@motionui/icons`      | Icon system                                  |

## Quick Start

```bash
# Install dependencies
pnpm install

# Build all packages
pnpm build

# Start docs site
pnpm --filter @motionui/docs dev

# Start Expo playground
pnpm --filter @motionui/playground dev
```

## Usage

```tsx
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ThemeProvider } from '@motionui/theme';
import { MagneticButton, TiltCard } from '@motionui/components';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider>
        <MagneticButton onPress={() => {}}>Press me</MagneticButton>
        <TiltCard title="Hello" description="Motion-first card" />
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
```

## Monorepo Structure

```
apps/
  docs/        → Next.js documentation site
  playground/  → Expo demo app
packages/
  tokens/      → Design tokens
  theme/       → Theming engine
  motion/      → Animation primitives
  components/  → UI components
  core/        → Utilities
  hooks/       → Custom hooks
  icons/       → Icons
config/
  eslint/      → Shared ESLint config
  typescript/  → Shared TS config
```

## Scripts

| Command          | Description                  |
| ---------------- | ---------------------------- |
| `pnpm build`     | Build all packages           |
| `pnpm dev`       | Start dev servers            |
| `pnpm lint`      | Lint all workspaces          |
| `pnpm typecheck` | Type-check all workspaces    |
| `pnpm changeset` | Create a changeset           |
| `pnpm release`   | Version and publish packages |

## Tech Stack

- React Native + Expo
- react-native-reanimated + gesture-handler
- TypeScript + TurboRepo + pnpm
- Next.js + Tailwind (docs)
- tsup + changesets

## License

MIT

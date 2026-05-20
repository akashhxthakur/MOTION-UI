'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { DEMO_CATEGORIES, DEMO_PRODUCTS } from '@/lib/commerceDemoData';
import {
  DEVICE_SPRING,
  SPRING_PRESETS,
  type SpringPresetName,
  getDevicePalette,
} from '@/lib/deviceDesignSystem';
import { DeviceGlassCard } from './DeviceGlassCard';
import { DeviceProductCard } from './DeviceProductCard';
import { WebMagneticButton } from './motion/WebMagneticButton';
import { WebTiltCard } from './motion/WebTiltCard';
import { useDevice } from './deviceContext';
import {
  DevHint,
  DeviceBalance,
  DeviceCard,
  DeviceScreenRoot,
  DeviceScrollBody,
  DeviceStatusBar,
  DeviceToast,
} from './primitives';

function ScreenWithTabs({ children }: { children: React.ReactNode }) {
  return (
    <DeviceScreenRoot className="relative pb-[6rem]">
      <DeviceToast />
      <DeviceStatusBar />
      <DeviceScrollBody>{children}</DeviceScrollBody>
    </DeviceScreenRoot>
  );
}

export function DashboardScreen() {
  const { deviceMode, balanceExpanded, setBalanceExpanded, showToast } = useDevice();
  const palette = getDevicePalette(deviceMode);
  const gradient =
    deviceMode === 'dark'
      ? 'linear-gradient(135deg, rgba(59,130,246,0.45), rgba(139,92,246,0.35))'
      : 'linear-gradient(135deg, rgba(59,130,246,0.2), rgba(139,92,246,0.15))';

  return (
    <ScreenWithTabs>
      <p className="mt-[0.5rem] text-[1rem] font-semibold">Good evening</p>
      <p className="text-[0.7rem] opacity-60">Here&apos;s your overview</p>
      <motion.div
        className="mt-[0.75rem]"
        onClick={() => {
          setBalanceExpanded(!balanceExpanded);
          showToast(balanceExpanded ? 'Balance collapsed' : 'Pressable + spring scale');
        }}
        whileTap={{ scale: 0.98 }}
      >
        <DeviceBalance
          label="Total balance"
          amount="$24,580.00"
          change="+12.4%"
          gradient={gradient}
        />
        <DevHint>Pressable · onPress · useMotion</DevHint>
      </motion.div>
      <AnimatePresence>
        {balanceExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="mt-2 overflow-hidden"
          >
            <DeviceCard>
              <p className="text-[0.65rem] opacity-70">This week</p>
              <p className="text-[0.85rem] font-semibold tabular-nums">+$1,240.00</p>
            </DeviceCard>
          </motion.div>
        )}
      </AnimatePresence>
      <DeviceCard
        className="mt-[0.65rem] !p-[0.5rem]"
        onClick={() => showToast('Chart · react-native-svg')}
      >
        <svg className="h-[4.5rem] w-full" viewBox="0 0 300 80" preserveAspectRatio="none">
          <path
            d="M0 60 Q50 20 100 45 T200 25 T300 40 V80 H0Z"
            fill="url(#chartFill)"
            opacity={0.4}
          />
          <path
            d="M0 60 Q50 20 100 45 T200 25 T300 40"
            fill="none"
            stroke="#3b82f6"
            strokeWidth="2"
          />
          <defs>
            <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
              <stop stopColor="#3b82f6" />
              <stop offset="1" stopColor="transparent" />
            </linearGradient>
          </defs>
        </svg>
      </DeviceCard>
      <div className="mt-[0.65rem] grid grid-cols-2 gap-[0.5rem]">
        {['Spending', 'Income', 'Savings', 'Invest'].map((label, i) => (
          <motion.button
            key={label}
            type="button"
            whileTap={{ scale: 0.96 }}
            onClick={() => showToast(`${label} · FlatList item`)}
            className="min-w-0 rounded-[0.85rem] p-[0.75rem] text-left ring-1"
            style={{ backgroundColor: palette.card, borderColor: palette.border }}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...DEVICE_SPRING, delay: i * 0.05 }}
          >
            <p className="truncate text-[0.6rem] opacity-60">{label}</p>
            <p className="truncate text-[0.8rem] font-semibold tabular-nums">$2.4k</p>
          </motion.button>
        ))}
      </div>
    </ScreenWithTabs>
  );
}

export function WalletScreen() {
  const { deviceMode, selectedTx, setSelectedTx, showToast } = useDevice();
  const palette = getDevicePalette(deviceMode);
  const txs = [
    { id: '1', name: 'Apple Store', amount: '-$129.00', time: '2h ago' },
    { id: '2', name: 'Salary', amount: '+$4,200', time: 'Yesterday' },
    { id: '3', name: 'Netflix', amount: '-$15.99', time: 'Mon' },
  ];

  return (
    <ScreenWithTabs>
      <DeviceBalance
        label="Available"
        amount="$8,240.50"
        gradient={
          deviceMode === 'dark'
            ? 'linear-gradient(135deg, #059669, #0d9488)'
            : 'linear-gradient(135deg, #10b981, #14b8a6)'
        }
      />
      <p className="mt-[0.75rem] text-[0.7rem] font-medium opacity-60">Recent</p>
      {txs.map((tx, i) => (
        <motion.button
          key={tx.id}
          type="button"
          onClick={() => {
            setSelectedTx(selectedTx === tx.id ? null : tx.id);
            showToast('SwipeableRow · transaction detail');
          }}
          className="mt-[0.45rem] flex w-full min-w-0 items-center justify-between rounded-[0.85rem] px-[0.75rem] py-[0.6rem] text-left ring-1"
          style={{
            backgroundColor: selectedTx === tx.id ? palette.cardHover : palette.card,
            borderColor: palette.border,
          }}
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ ...DEVICE_SPRING, delay: i * 0.06 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="flex min-w-0 items-center gap-[0.5rem]">
            <div
              className="h-[2rem] w-[2rem] shrink-0 rounded-full opacity-30"
              style={{ backgroundColor: palette.text }}
            />
            <div className="min-w-0">
              <p className="truncate text-[0.75rem] font-medium">{tx.name}</p>
              <p className="truncate text-[0.6rem] opacity-50">{tx.time}</p>
            </div>
          </div>
          <span
            className={`shrink-0 text-[0.7rem] font-medium tabular-nums ${tx.amount.startsWith('+') ? 'text-emerald-500' : ''}`}
          >
            {tx.amount}
          </span>
        </motion.button>
      ))}
      <DevHint>FlatList · Pressable row</DevHint>
    </ScreenWithTabs>
  );
}

export function SocialScreen() {
  const { showToast } = useDevice();
  const { deviceMode } = useDevice();
  const palette = getDevicePalette(deviceMode);

  return (
    <ScreenWithTabs>
      <div className="mt-[0.35rem] flex gap-[0.65rem] overflow-x-auto pb-1">
        {['You', 'Alex', 'Sam', 'Jo'].map((n, i) => (
          <motion.button
            key={n}
            type="button"
            whileTap={{ scale: 0.95 }}
            onClick={() => showToast('Story ring · long press')}
            className="flex shrink-0 flex-col items-center gap-[0.2rem]"
          >
            <div
              className={`h-[2.75rem] w-[2.75rem] rounded-full p-[2px] ${i === 0 ? 'bg-gradient-to-tr from-pink-500 to-violet-500' : ''}`}
              style={i > 0 ? { backgroundColor: palette.border } : undefined}
            >
              <div
                className="h-full w-full rounded-full"
                style={{ backgroundColor: palette.card }}
              />
            </div>
            <span className="text-[0.55rem] opacity-50">{n}</span>
          </motion.button>
        ))}
      </div>
      {[
        { user: 'design_daily', text: 'New motion primitives dropped' },
        { user: 'react_native', text: 'Spring presets feel incredible on device.' },
      ].map((post) => (
        <DeviceCard
          key={post.user}
          className="mt-[0.65rem]"
          onClick={() => showToast('Card · like / comment')}
        >
          <div className="mb-[0.4rem] flex items-center gap-[0.45rem]">
            <div className="h-[1.6rem] w-[1.6rem] shrink-0 rounded-full bg-gradient-to-br from-pink-500/50 to-violet-500/50" />
            <span className="truncate text-[0.7rem] font-semibold">{post.user}</span>
          </div>
          <p className="text-[0.7rem] leading-relaxed opacity-80">{post.text}</p>
        </DeviceCard>
      ))}
    </ScreenWithTabs>
  );
}

export function MusicScreen() {
  const { playing, setPlaying, deviceMode } = useDevice();
  const palette = getDevicePalette(deviceMode);
  const progress = 0.34;

  return (
    <DeviceScreenRoot className="relative overflow-hidden pb-[6rem]">
      <DeviceToast />
      <div
        className="pointer-events-none absolute inset-0 scale-110 blur-3xl"
        style={{
          background: 'linear-gradient(160deg, #7c2d12 0%, #4c1d95 35%, #1e1b4b 70%, #0f172a 100%)',
          opacity: deviceMode === 'dark' ? 0.85 : 0.55,
        }}
      />
      <DeviceStatusBar />
      <div className="relative z-10 flex min-h-0 flex-1 flex-col px-[1rem] pt-[0.5rem]">
        <div className="flex items-center justify-between">
          <span className="text-[0.85rem] font-semibold opacity-80">Back</span>
          <span className="text-[0.6rem] font-semibold uppercase tracking-widest opacity-50">
            Now Playing
          </span>
          <span className="text-[0.85rem] font-semibold opacity-80">More</span>
        </div>

        <div className="mt-[1.25rem] flex flex-1 flex-col items-center justify-center">
          <div
            className="relative h-[10.5rem] w-[10.5rem] overflow-hidden rounded-[1.1rem] shadow-2xl ring-1"
            style={{
              background: 'linear-gradient(145deg, #fb7185 0%, #a855f7 45%, #312e81 100%)',
              borderColor: 'rgba(255,255,255,0.15)',
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" />
            <span className="absolute bottom-2 left-2 rounded bg-black/40 px-1.5 py-0.5 text-[0.45rem] font-semibold text-white">
              LOSSLESS
            </span>
          </div>

          <div className="mt-[1.25rem] w-full text-center">
            <p className="font-ui truncate text-[1.05rem] font-bold">Midnight Drive</p>
            <p className="font-ui mt-0.5 truncate text-[0.75rem] text-red-400">Neon Collective</p>
          </div>

          <motion.div className="mt-[1rem] w-full">
            <div className="mb-1 flex justify-between font-tabular text-[0.5rem] opacity-50">
              <span>1:12</span>
              <span>3:28</span>
            </div>
            <div
              className="h-[0.22rem] w-full overflow-hidden rounded-full"
              style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}
            >
              <motion.div
                className="h-full rounded-full bg-white"
                style={{ width: `${progress * 100}%` }}
                animate={
                  playing ? { width: [`${progress * 100}%`, `${(progress + 0.08) * 100}%`] } : {}
                }
                transition={{ duration: 4, repeat: Infinity, repeatType: 'reverse' }}
              />
            </div>
          </motion.div>

          <div className="mt-[1.25rem] flex items-center gap-[1.75rem]">
            <button type="button" className="text-[1rem] opacity-55" aria-label="Shuffle">
              Shuffle
            </button>
            <button type="button" className="text-[1.35rem] opacity-80" aria-label="Previous">
              Prev
            </button>
            <motion.button
              type="button"
              whileTap={{ scale: 0.92 }}
              onClick={() => setPlaying(!playing)}
              className="grid h-[3.25rem] w-[3.25rem] place-items-center rounded-full bg-white text-[0.65rem] font-bold text-black shadow-lg"
              aria-label={playing ? 'Pause' : 'Play'}
            >
              {playing ? 'Pause' : 'Play'}
            </motion.button>
            <button type="button" className="text-[1.35rem] opacity-80" aria-label="Next">
              Next
            </button>
            <button type="button" className="text-[1rem] opacity-55" aria-label="Repeat">
              Repeat
            </button>
          </div>

          <div className="mt-[1.25rem] flex w-full items-center gap-2 px-1">
            <span className="text-[0.55rem] opacity-40">Vol</span>
            <div
              className="h-[0.18rem] flex-1 rounded-full"
              style={{ backgroundColor: palette.input }}
            >
              <div className="h-full w-2/3 rounded-full bg-white/70" />
            </div>
            <span className="text-[0.55rem] opacity-40">Max</span>
          </div>

          <div className="mt-[0.85rem] flex w-full items-center justify-between border-t border-white/10 pt-[0.65rem] text-[0.65rem] opacity-70">
            <span>Lyrics</span>
            <span>Up Next</span>
          </div>
        </div>
      </div>
    </DeviceScreenRoot>
  );
}

export function FitnessScreen() {
  return (
    <ScreenWithTabs>
      <p className="mt-[0.5rem] text-[1rem] font-semibold">Activity</p>
      <p className="text-[0.7rem] opacity-60">Tuesday, May 19</p>
      <div className="mt-[1rem] flex justify-center">
        <svg viewBox="0 0 100 100" className="h-[7rem] w-[7rem] -rotate-90">
          <circle
            cx="50"
            cy="50"
            r="42"
            fill="none"
            stroke="currentColor"
            strokeOpacity={0.15}
            strokeWidth="8"
          />
          <circle
            cx="50"
            cy="50"
            r="42"
            fill="none"
            stroke="#f97316"
            strokeWidth="8"
            strokeDasharray="180 264"
            strokeLinecap="round"
          />
          <circle
            cx="50"
            cy="50"
            r="32"
            fill="none"
            stroke="#22c55e"
            strokeWidth="6"
            strokeDasharray="120 201"
            strokeLinecap="round"
          />
        </svg>
      </div>
      <div className="mt-[0.75rem] grid grid-cols-3 gap-[0.45rem]">
        {[
          { label: 'Steps', val: '8,432' },
          { label: 'Distance', val: '5.2 mi' },
          { label: 'Stand', val: '10/12' },
        ].map((m) => (
          <DeviceCard key={m.label} className="!p-[0.5rem] text-center">
            <p className="truncate text-[0.55rem] opacity-60">{m.label}</p>
            <p className="truncate text-[0.75rem] font-semibold tabular-nums">{m.val}</p>
          </DeviceCard>
        ))}
      </div>
    </ScreenWithTabs>
  );
}

export function ChatScreen() {
  const { deviceMode } = useDevice();
  const palette = getDevicePalette(deviceMode);

  return (
    <DeviceScreenRoot className="pb-[1rem]">
      <DeviceToast />
      <DeviceStatusBar />
      <div className="border-b px-[1rem] py-[0.65rem]" style={{ borderColor: palette.border }}>
        <p className="text-center text-[0.8rem] font-semibold">Design Team</p>
        <p className="text-center text-[0.6rem] text-emerald-500">3 online</p>
      </div>
      <div className="flex-1 space-y-[0.65rem] overflow-y-auto px-[1rem] py-[0.65rem]">
        <div
          className="max-w-[78%] rounded-[1rem] rounded-bl-[0.25rem] px-[0.75rem] py-[0.5rem]"
          style={{ backgroundColor: palette.card }}
        >
          <p className="text-[0.7rem]">Shipped the new motion tokens</p>
        </div>
        <div className="ml-auto max-w-[78%] rounded-[1rem] rounded-br-[0.25rem] bg-blue-600 px-[0.75rem] py-[0.5rem]">
          <p className="text-[0.7rem] text-white">Looks great on device. Merge it.</p>
        </div>
      </div>
      <div
        className="mx-[1rem] flex items-center gap-[0.45rem] rounded-full px-[0.85rem] py-[0.5rem] ring-1"
        style={{ backgroundColor: palette.input, borderColor: palette.border }}
      >
        <span className="flex-1 text-[0.7rem] opacity-50">Message…</span>
        <span className="text-blue-500">↑</span>
      </div>
    </DeviceScreenRoot>
  );
}

export function SettingsScreen() {
  const { deviceMode, settingsToggles, toggleSetting, toggleDeviceMode, showToast } = useDevice();
  const palette = getDevicePalette(deviceMode);
  const rows = [
    {
      key: 'theme',
      label: 'Appearance',
      value: deviceMode === 'dark' ? 'Dark' : 'Light',
      action: toggleDeviceMode,
    },
    { key: 'notifications', label: 'Notifications', toggle: true },
    { key: 'haptics', label: 'Haptic feedback', toggle: true },
    { key: 'analytics', label: 'Analytics', toggle: true },
    { key: 'privacy', label: 'Privacy' },
    { key: 'about', label: 'About' },
  ];

  return (
    <DeviceScreenRoot className="pb-[1rem]">
      <DeviceToast />
      <DeviceStatusBar />
      <p className="px-[1rem] pt-[0.5rem] text-[1rem] font-semibold">Settings</p>
      <div className="mt-[0.5rem] px-[1rem]">
        {rows.map((row) => (
          <motion.button
            key={row.key}
            type="button"
            onClick={() => {
              if (row.action) row.action();
              else if (row.toggle) toggleSetting(row.key);
              else showToast(`SectionList · ${row.label}`);
            }}
            className="flex w-full min-w-0 items-center justify-between border-b py-[0.75rem] text-left"
            style={{ borderColor: palette.border }}
            whileTap={{ scale: 0.99 }}
          >
            <span className="truncate text-[0.8rem]">{row.label}</span>
            {row.toggle ? (
              <motion.div
                className="relative h-[1.25rem] w-[2.2rem] shrink-0 rounded-full"
                style={{
                  backgroundColor: settingsToggles[row.key as keyof typeof settingsToggles]
                    ? '#3b82f6'
                    : palette.card,
                }}
                layout
              >
                <motion.div
                  className="absolute top-[0.15rem] h-[0.95rem] w-[0.95rem] rounded-full bg-white shadow"
                  animate={{
                    left: settingsToggles[row.key as keyof typeof settingsToggles]
                      ? '1.1rem'
                      : '0.15rem',
                  }}
                  transition={DEVICE_SPRING}
                />
              </motion.div>
            ) : (
              <span className="shrink-0 opacity-40">{row.value ?? '›'}</span>
            )}
          </motion.button>
        ))}
      </div>
      <DevHint className="px-4">Switch · ThemeProvider</DevHint>
    </DeviceScreenRoot>
  );
}

export function NotificationsScreen() {
  const { showToast } = useDevice();
  return (
    <DeviceScreenRoot className="pb-[1rem]">
      <DeviceToast />
      <DeviceStatusBar />
      <p className="px-[1rem] pt-[0.5rem] text-[1rem] font-semibold">Notifications</p>
      {['Payment received', 'New follower', 'App update'].map((n, i) => (
        <motion.button
          key={n}
          type="button"
          onClick={() => showToast('PushNotification · handler')}
          className="mx-[1rem] mt-[0.55rem] flex w-[calc(100%-2rem)] gap-[0.65rem] rounded-[0.85rem] p-[0.75rem] text-left ring-1 ring-white/5"
          initial={{ opacity: 0, x: 8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.05 }}
        >
          <div className="h-[2.25rem] w-[2.25rem] shrink-0 rounded-full bg-red-500/30" />
          <div className="min-w-0">
            <p className="truncate text-[0.75rem] font-medium">{n}</p>
            <p className="text-[0.6rem] opacity-50">{i + 1}h ago</p>
          </div>
        </motion.button>
      ))}
    </DeviceScreenRoot>
  );
}

export function MapsScreen() {
  return (
    <DeviceScreenRoot className="relative">
      <DeviceToast />
      <DeviceStatusBar />
      <div className="absolute inset-0 top-[2rem] bg-emerald-900/30">
        <svg className="h-full w-full opacity-60" viewBox="0 0 200 300">
          <path d="M0 150 Q50 100 100 150 T200 120" stroke="#22c55e" fill="none" strokeWidth="2" />
          <circle cx="100" cy="150" r="8" fill="#22c55e" />
        </svg>
      </div>
      <div className="absolute bottom-[1.5rem] left-[1rem] right-[1rem] rounded-[0.85rem] bg-black/60 px-[1rem] py-[0.65rem] text-[0.75rem] text-white backdrop-blur">
        Current location
      </div>
    </DeviceScreenRoot>
  );
}

export function CameraScreen() {
  const { showToast } = useDevice();
  return (
    <DeviceScreenRoot className="bg-black">
      <DeviceToast />
      <DeviceStatusBar />
      <div className="flex flex-1 items-center justify-center">
        <motion.button
          type="button"
          whileTap={{ scale: 0.98 }}
          onClick={() => showToast('Camera · ImagePicker')}
          className="h-[10rem] w-[7.5rem] rounded-lg border-2 border-dashed border-white/30"
        />
      </div>
      <div className="flex justify-center gap-[1.5rem] pb-[1.5rem] pt-[0.75rem]">
        <div className="h-[2.75rem] w-[2.75rem] rounded-full bg-white/20" />
        <motion.button
          type="button"
          whileTap={{ scale: 0.92 }}
          className="h-[3.5rem] w-[3.5rem] rounded-full border-4 border-white"
        />
        <div className="h-[2.75rem] w-[2.75rem] rounded-full bg-white/20" />
      </div>
    </DeviceScreenRoot>
  );
}

export function SearchScreen() {
  const { searchQuery, setSearchQuery, showToast } = useDevice();
  const { deviceMode } = useDevice();
  const palette = getDevicePalette(deviceMode);
  const chips = ['MagneticButton', 'TiltCard', 'useMotion'];

  return (
    <DeviceScreenRoot className="pb-[1rem]">
      <DeviceToast />
      <DeviceStatusBar />
      <div
        className="mx-[1rem] mt-[0.35rem] flex items-center gap-[0.45rem] rounded-[0.85rem] px-[0.75rem] py-[0.5rem] ring-1"
        style={{ backgroundColor: palette.input, borderColor: palette.border }}
      >
        <span className="opacity-50">⌕</span>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search components…"
          className="min-w-0 flex-1 bg-transparent text-[0.75rem] outline-none"
          style={{ color: palette.text }}
        />
      </div>
      <p className="mt-[0.75rem] px-[1rem] text-[0.65rem] opacity-50">Recent</p>
      {chips.map((q) => (
        <motion.button
          key={q}
          type="button"
          onClick={() => {
            setSearchQuery(q);
            showToast(`TextInput · "${q}"`);
          }}
          className="mx-[1rem] mt-[0.45rem] block w-[calc(100%-2rem)] rounded-lg px-[0.75rem] py-[0.5rem] text-left text-[0.75rem] ring-1"
          style={{
            backgroundColor: searchQuery === q ? palette.cardHover : palette.card,
            borderColor: palette.border,
          }}
          whileTap={{ scale: 0.98 }}
        >
          {q}
        </motion.button>
      ))}
    </DeviceScreenRoot>
  );
}

export function AuthScreen() {
  const { showToast } = useDevice();
  return (
    <DeviceScreenRoot className="justify-center px-[1.25rem] pb-[1rem]">
      <DeviceToast />
      <DeviceStatusBar />
      <p className="text-[1.35rem] font-bold">Welcome back</p>
      <p className="mt-[0.25rem] text-[0.75rem] opacity-60">Sign in to continue</p>
      <div className="mt-[1rem] space-y-[0.65rem]">
        <div className="h-[2.5rem] rounded-[0.85rem] ring-1 ring-white/10" />
        <div className="h-[2.5rem] rounded-[0.85rem] ring-1 ring-white/10" />
      </div>
      <motion.button
        type="button"
        whileTap={{ scale: 0.97 }}
        onClick={() => showToast('Pressable · CTA gradient')}
        className="mt-[0.65rem] h-[2.5rem] w-full rounded-[0.85rem] bg-gradient-to-r from-blue-600 to-violet-600"
      />
      <p className="mt-[0.65rem] text-center text-[0.65rem] opacity-50">
        Or continue with Apple / Google
      </p>
    </DeviceScreenRoot>
  );
}

const SPRING_LABELS: SpringPresetName[] = ['smooth', 'snappy', 'bouncy'];

export function CommerceScreen() {
  const {
    deviceMode,
    selectedCategory,
    setSelectedCategory,
    cartCount,
    cartTotal,
    searchQuery,
    setSearchQuery,
  } = useDevice();
  const palette = getDevicePalette(deviceMode);
  const filtered =
    selectedCategory === 'all'
      ? DEMO_PRODUCTS
      : DEMO_PRODUCTS.filter((p) => p.categoryId === selectedCategory);

  return (
    <DeviceScreenRoot className="relative pb-[6rem]">
      <DeviceToast />
      <DeviceStatusBar />
      <DeviceScrollBody>
        <p className="font-display mt-[0.35rem] text-[1rem] font-bold">Grocify</p>
        <p className="font-ui text-[0.65rem] opacity-60">Fresh picks near you</p>
        <DeviceGlassCard className="mt-[0.65rem] !p-[0.5rem]" interactive>
          <div className="flex items-center gap-2 px-1">
            <span className="opacity-50">⌕</span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search groceries…"
              className="font-ui min-w-0 flex-1 bg-transparent text-[0.7rem] outline-none"
              style={{ color: palette.text }}
            />
          </div>
        </DeviceGlassCard>
        <div className="mt-[0.65rem] flex gap-[0.45rem] overflow-x-auto pb-1">
          {DEMO_CATEGORIES.map((cat) => {
            const active = selectedCategory === cat.id;
            return (
              <motion.button
                key={cat.id}
                type="button"
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(cat.id)}
                className="shrink-0"
              >
                <DeviceGlassCard
                  intense={active}
                  className={`!p-[0.45rem] ${active ? 'ring-1 ring-blue-500/50' : ''}`}
                >
                  <div className="flex w-[2.5rem] flex-col items-center gap-0.5">
                    <span className="text-[0.9rem]">{cat.emoji}</span>
                    <span className="font-ui text-[0.45rem] font-medium">{cat.name}</span>
                  </div>
                </DeviceGlassCard>
              </motion.button>
            );
          })}
        </div>
        <div className="mt-[0.65rem] grid grid-cols-2 gap-[0.5rem]">
          {filtered
            .filter((p) => !searchQuery || p.name.toLowerCase().includes(searchQuery.toLowerCase()))
            .map((product) => (
              <DeviceProductCard key={product.id} product={product} />
            ))}
        </div>
      </DeviceScrollBody>
      <AnimatePresence>
        {cartCount > 0 ? (
          <motion.div
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 24, opacity: 0 }}
            className="absolute inset-x-[0.65rem] bottom-[5.5rem] z-20"
          >
            <DeviceGlassCard intense interactive className="!p-[0.55rem]">
              <div className="flex items-center justify-between gap-2">
                <div>
                  <p className="font-ui text-[0.6rem] opacity-60">Cart</p>
                  <p className="font-tabular text-[0.75rem] font-semibold">
                    {cartCount} items · ${cartTotal.toFixed(2)}
                  </p>
                </div>
                <span
                  className="font-ui rounded-full px-2 py-1 text-[0.6rem] font-semibold text-white"
                  style={{ backgroundColor: palette.primary }}
                >
                  Checkout
                </span>
              </div>
            </DeviceGlassCard>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </DeviceScreenRoot>
  );
}

export function MotionLabScreen() {
  const { deviceMode, springPreset, setSpringPreset, showToast } = useDevice();
  const palette = getDevicePalette(deviceMode);
  const spring = SPRING_PRESETS[springPreset];

  return (
    <DeviceScreenRoot className="relative pb-[6rem]">
      <DeviceToast />
      <DeviceStatusBar />
      <DeviceScrollBody>
        <p className="font-display mt-[0.35rem] text-[1rem] font-bold">Motion Lab</p>
        <p className="font-ui text-[0.65rem] opacity-60">Web twins of RN components</p>

        <p className="font-ui mt-[0.85rem] text-[0.6rem] font-semibold uppercase tracking-wide opacity-50">
          MagneticButton
        </p>
        <div className="mt-2 flex flex-wrap gap-2">
          <WebMagneticButton onClick={() => showToast('Primary · magnetic pull')}>
            Primary
          </WebMagneticButton>
          <WebMagneticButton variant="secondary" onClick={() => showToast('Secondary')}>
            Secondary
          </WebMagneticButton>
          <WebMagneticButton variant="ghost" size="sm" onClick={() => showToast('Ghost')}>
            Ghost
          </WebMagneticButton>
        </div>

        <p className="font-ui mt-[0.85rem] text-[0.6rem] font-semibold uppercase tracking-wide opacity-50">
          TiltCard
        </p>
        <div className="mt-2">
          <WebTiltCard title="Tilt me" description="Pointer-driven rotateX/Y with glass surface" />
        </div>

        <p className="font-ui mt-[0.85rem] text-[0.6rem] font-semibold uppercase tracking-wide opacity-50">
          GlassCard
        </p>
        <div className="mt-2 grid grid-cols-2 gap-2">
          <DeviceGlassCard className="!p-2">
            <p className="font-ui text-[0.6rem] font-medium">Subtle</p>
          </DeviceGlassCard>
          <DeviceGlassCard intense className="!p-2">
            <p className="font-ui text-[0.6rem] font-medium">Intense</p>
          </DeviceGlassCard>
        </div>

        <p className="font-ui mt-[0.85rem] text-[0.6rem] font-semibold uppercase tracking-wide opacity-50">
          Spring preset
        </p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {SPRING_LABELS.map((name) => (
            <motion.button
              key={name}
              type="button"
              onClick={() => setSpringPreset(name)}
              className="font-ui rounded-full px-2 py-1 text-[0.55rem] font-medium capitalize"
              style={{
                backgroundColor: springPreset === name ? palette.primary : palette.input,
                color: springPreset === name ? palette.primaryForeground : palette.text,
              }}
              whileTap={{ scale: 0.95 }}
            >
              {name}
            </motion.button>
          ))}
        </div>
        <div className="mt-3 flex h-8 items-center">
          <motion.div
            className="h-3 w-3 rounded-full"
            style={{ backgroundColor: palette.primary }}
            animate={{ x: [0, 48, 0] }}
            transition={{ repeat: Infinity, duration: 1.2, ...spring }}
          />
        </div>
      </DeviceScrollBody>
    </DeviceScreenRoot>
  );
}

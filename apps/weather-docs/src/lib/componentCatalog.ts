import type { UIScreenId } from './uiScreens';

export const CATALOG_TOTAL = 100_800;

export type ComponentCategory =
  | 'buttons'
  | 'inputs'
  | 'cards'
  | 'lists'
  | 'navigation'
  | 'tabs'
  | 'modals'
  | 'feedback'
  | 'data'
  | 'layout'
  | 'media'
  | 'forms'
  | 'pickers'
  | 'charts'
  | 'auth'
  | 'commerce'
  | 'chat'
  | 'profile'
  | 'onboarding'
  | 'motion';

export type ComponentSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type ComponentState = 'default' | 'pressed' | 'disabled' | 'loading';
export type ResponsiveBreakpoint = 'mobile' | 'tablet' | 'foldable' | 'desktop' | 'watch';

export interface CatalogComponent {
  id: string;
  index: number;
  name: string;
  category: ComponentCategory;
  categoryLabel: string;
  size: ComponentSize;
  state: ComponentState;
  breakpoint: ResponsiveBreakpoint;
  description: string;
  tags: string[];
  screen: UIScreenId;
  responsive: boolean;
  source: string;
}

export const CATEGORY_META: Record<
  ComponentCategory,
  { label: string; screen: UIScreenId; accent: string }
> = {
  buttons: { label: 'Buttons', screen: 'dashboard', accent: '#3b82f6' },
  inputs: { label: 'Inputs', screen: 'chat', accent: '#06b6d4' },
  cards: { label: 'Cards', screen: 'wallet', accent: '#10b981' },
  lists: { label: 'Lists', screen: 'social', accent: '#ec4899' },
  navigation: { label: 'Navigation', screen: 'dashboard', accent: '#6366f1' },
  tabs: { label: 'Tabs', screen: 'music', accent: '#8b5cf6' },
  modals: { label: 'Modals', screen: 'wallet', accent: '#14b8a6' },
  feedback: { label: 'Feedback', screen: 'fitness', accent: '#f97316' },
  data: { label: 'Data Display', screen: 'dashboard', accent: '#0ea5e9' },
  layout: { label: 'Layout', screen: 'dashboard', accent: '#64748b' },
  media: { label: 'Media', screen: 'music', accent: '#a855f7' },
  forms: { label: 'Forms', screen: 'chat', accent: '#22c55e' },
  pickers: { label: 'Pickers', screen: 'wallet', accent: '#eab308' },
  charts: { label: 'Charts', screen: 'fitness', accent: '#ef4444' },
  auth: { label: 'Auth', screen: 'social', accent: '#f43f5e' },
  commerce: { label: 'Commerce', screen: 'commerce', accent: '#84cc16' },
  chat: { label: 'Chat', screen: 'chat', accent: '#06b6d4' },
  profile: { label: 'Profile', screen: 'social', accent: '#d946ef' },
  onboarding: { label: 'Onboarding', screen: 'music', accent: '#fb923c' },
  motion: { label: 'Motion', screen: 'motionlab', accent: '#7c3aed' },
};

export const CATEGORIES = Object.keys(CATEGORY_META) as ComponentCategory[];

const BASE_NAMES: Record<ComponentCategory, string[]> = {
  buttons: [
    'PrimaryButton',
    'SecondaryButton',
    'GhostButton',
    'IconButton',
    'FAB',
    'SegmentedButton',
    'ToggleButton',
    'ChipButton',
    'LinkButton',
    'DangerButton',
    'GradientButton',
    'OutlineButton',
    'PillButton',
    'SplitButton',
    'MagneticButton',
    'FloatingAction',
    'SwipeButton',
    'LoadingButton',
    'BiometricButton',
    'SocialButton',
    'PaymentButton',
  ],
  inputs: [
    'TextField',
    'PasswordField',
    'SearchBar',
    'OTPInput',
    'PhoneInput',
    'EmailInput',
    'NumberStepper',
    'SliderInput',
    'SwitchRow',
    'CheckboxRow',
    'RadioGroup',
    'TextArea',
    'MentionInput',
    'CurrencyInput',
    'DateField',
    'TimeField',
    'PinInput',
    'TagInput',
    'VoiceInput',
    'Autocomplete',
    'RichTextField',
  ],
  cards: [
    'TiltCard',
    'StatCard',
    'ProfileCard',
    'ProductCard',
    'ArticleCard',
    'WalletCard',
    'NotificationCard',
    'MediaCard',
    'PricingCard',
    'ReviewCard',
    'MapCard',
    'WeatherCard',
    'EventCard',
    'TeamCard',
    'MetricCard',
    'GlassCard',
    'ExpandableCard',
    'SwipeableCard',
    'StackedCard',
    'HeroCard',
    'CompactCard',
  ],
  lists: [
    'FlatList',
    'SectionList',
    'AvatarList',
    'SettingsList',
    'ChatList',
    'TransactionList',
    'NotificationList',
    'SearchResults',
    'ContactList',
    'MenuList',
    'TimelineList',
    'MediaGrid',
    'ReorderList',
    'InfiniteList',
    'GroupedList',
    'CheckboxList',
    'RadioList',
    'SwipeableRow',
    'ExpandableRow',
    'StickyHeaderList',
    'VirtualizedList',
  ],
  navigation: [
    'TabBar',
    'TopBar',
    'BottomBar',
    'DrawerNav',
    'StackHeader',
    'Breadcrumbs',
    'SidebarNav',
    'FloatingNav',
    'SegmentedNav',
    'WizardNav',
    'ContextualBar',
    'SearchHeader',
    'ModalHeader',
    'CollapsibleHeader',
    'BlurHeader',
    'LargeTitleHeader',
    'MiniBar',
    'RailNav',
    'DockNav',
    'GestureBackHeader',
    'AdaptiveNav',
  ],
  tabs: [
    'UnderlineTabs',
    'PillTabs',
    'IconTabs',
    'ScrollableTabs',
    'AnimatedTabs',
    'VerticalTabs',
    'SegmentTabs',
    'FloatingTabs',
    'BadgeTabs',
    'GradientTabs',
    'CompactTabs',
    'FullWidthTabs',
    'NestedTabs',
    'SwipeTabs',
    'IndicatorTabs',
    'GlassTabs',
    'BottomTabs',
    'TopTabs',
    'ContextTabs',
    'FilterTabs',
    'SortTabs',
  ],
  modals: [
    'BottomSheet',
    'ActionSheet',
    'AlertDialog',
    'ConfirmDialog',
    'FullScreenModal',
    'DrawerSheet',
    'Popover',
    'Tooltip',
    'ContextMenu',
    'Lightbox',
    'ShareSheet',
    'FilterSheet',
    'DatePickerSheet',
    'LoginSheet',
    'PaymentSheet',
    'SnackbarHost',
    'ToastStack',
    'OverlayPortal',
    'HalfSheet',
    'ExpandableSheet',
    'GestureSheet',
  ],
  feedback: [
    'Toast',
    'Snackbar',
    'Banner',
    'InlineAlert',
    'ProgressBar',
    'Spinner',
    'Skeleton',
    'EmptyState',
    'ErrorState',
    'SuccessState',
    'RatingStars',
    'Badge',
    'Chip',
    'Tag',
    'PulseIndicator',
    'Shimmer',
    'PullRefresh',
    'LoadMore',
    'HapticToast',
    'UndoBar',
    'StatusPill',
  ],
  data: [
    'DataTable',
    'KeyValueRow',
    'Timeline',
    'TreeView',
    'Heatmap',
    'Sparkline',
    'Gauge',
    'ProgressRing',
    'StatGrid',
    'ComparisonRow',
    'Leaderboard',
    'CalendarGrid',
    'KanbanColumn',
    'GanttBar',
    'MetricTile',
    'DeltaBadge',
    'TrendArrow',
    'CountUp',
    'AvatarStack',
    'LabelValue',
    'DefinitionList',
  ],
  layout: [
    'Stack',
    'HStack',
    'Grid',
    'Masonry',
    'SplitView',
    'SafeArea',
    'ScrollContainer',
    'StickyFooter',
    'AspectRatio',
    'Center',
    'Spacer',
    'Divider',
    'Container',
    'ResponsiveGrid',
    'TwoPane',
    'SidebarLayout',
    'DashboardGrid',
    'FormLayout',
    'ListLayout',
    'HeroLayout',
    'AdaptiveColumns',
  ],
  media: [
    'Image',
    'Avatar',
    'VideoPlayer',
    'AudioWave',
    'Carousel',
    'Gallery',
    'Thumbnail',
    'CoverArt',
    'CameraPreview',
    'QRScanner',
    'Barcode',
    'LottieView',
    'SvgIcon',
    'AnimatedIcon',
    'BlurHashImage',
    'ProgressiveImage',
    'ParallaxImage',
    'PinchZoom',
    'Cropper',
    'MediaControls',
    'PictureInPicture',
  ],
  forms: [
    'Form',
    'FieldGroup',
    'FormSection',
    'ValidationSummary',
    'SubmitBar',
    'WizardForm',
    'MultiStepForm',
    'InlineForm',
    'SearchForm',
    'LoginForm',
    'SignupForm',
    'AddressForm',
    'PaymentForm',
    'SurveyForm',
    'FeedbackForm',
    'UploadForm',
    'FilterForm',
    'SettingsForm',
    'ProfileForm',
    'CheckoutForm',
    'DynamicForm',
  ],
  pickers: [
    'DatePicker',
    'TimePicker',
    'DateRangePicker',
    'ColorPicker',
    'FilePicker',
    'ImagePicker',
    'CountryPicker',
    'CityPicker',
    'CurrencyPicker',
    'LanguagePicker',
    'WheelPicker',
    'CalendarPicker',
    'MonthPicker',
    'YearPicker',
    'DurationPicker',
    'SlotPicker',
    'SeatPicker',
    'EmojiPicker',
    'IconPicker',
    'TagPicker',
    'MultiSelectPicker',
  ],
  charts: [
    'LineChart',
    'BarChart',
    'AreaChart',
    'PieChart',
    'DonutChart',
    'Candlestick',
    'ScatterPlot',
    'RadarChart',
    'BubbleChart',
    'HeatmapChart',
    'SparkChart',
    'GaugeChart',
    'FunnelChart',
    'Waterfall',
    'Histogram',
    'ComboChart',
    'LiveChart',
    'MiniChart',
    'ComparisonChart',
    'TrendChart',
    'StackedChart',
  ],
  auth: [
    'LoginScreen',
    'SignupScreen',
    'OTPVerify',
    'ForgotPassword',
    'BiometricGate',
    'SSOButtons',
    'MagicLink',
    'PinLock',
    'SessionBanner',
    'LogoutConfirm',
    'AccountPicker',
    'RoleSelector',
    'ConsentForm',
    'TermsSheet',
    'PrivacyToggle',
    'TwoFactor',
    'PasskeyPrompt',
    'OAuthRow',
    'GuestContinue',
    'InviteCode',
    'ProfileSetup',
  ],
  commerce: [
    'ProductTile',
    'CartBar',
    'CheckoutSteps',
    'OrderSummary',
    'PriceTag',
    'DiscountBadge',
    'QuantityStepper',
    'ShippingRow',
    'PaymentMethod',
    'ReceiptCard',
    'SubscriptionCard',
    'WishlistButton',
    'CompareBar',
    'FlashSale',
    'BundleCard',
    'CouponInput',
    'TaxRow',
    'TipSelector',
    'StoreHeader',
    'CategoryRail',
    'ReviewSummary',
  ],
  chat: [
    'MessageBubble',
    'ChatInput',
    'TypingIndicator',
    'ReactionBar',
    'ThreadList',
    'VoiceNote',
    'AttachmentRow',
    'EmojiKeyboard',
    'MentionList',
    'ReadReceipt',
    'OnlineDot',
    'ChatHeader',
    'PinnedMessage',
    'ReplyPreview',
    'ForwardSheet',
    'BlockBanner',
    'GroupAvatar',
    'PollMessage',
    'LinkPreview',
    'CodeBlock',
    'StickerPicker',
  ],
  profile: [
    'ProfileHeader',
    'AvatarUploader',
    'BioSection',
    'StatsRow',
    'FollowButton',
    'SocialLinks',
    'BadgeGrid',
    'ActivityFeed',
    'AchievementCard',
    'SettingsRow',
    'PrivacyToggle',
    'ThemePicker',
    'LanguageRow',
    'NotificationPrefs',
    'BlockedList',
    'EditProfile',
    'CoverPhoto',
    'StoryRing',
    'MutualFriends',
    'VerificationBadge',
    'QRProfile',
  ],
  onboarding: [
    'WelcomeSlide',
    'FeatureCarousel',
    'PermissionCard',
    'ProgressDots',
    'SkipButton',
    'GetStartedCTA',
    'IllustrationHero',
    'TooltipTour',
    'CoachMark',
    'ChecklistStep',
    'ValueProp',
    'SocialProof',
    'PlanSelector',
    'TrialBanner',
    'SetupWizard',
    'ImportContacts',
    'NotificationPrompt',
    'LocationPrompt',
    'PersonalizeForm',
    'FinishScreen',
    'ConfettiSuccess',
  ],
  motion: [
    'useMotion',
    'usePressMotion',
    'useMagneticMotion',
    'useTiltMotion',
    'SpringView',
    'FadeIn',
    'SlideIn',
    'ScalePress',
    'ParallaxScroll',
    'SharedTransition',
    'GestureDetector',
    'DragSnap',
    'FlipCard',
    'StaggerList',
    'SkeletonShimmer',
    'LayoutAnimation',
    'PageTransition',
    'TabIndicator',
    'PullElastic',
    'HapticPress',
    'ReanimatedLoop',
  ],
};

const SIZES: ComponentSize[] = ['xs', 'sm', 'md', 'lg', 'xl'];
const STATES: ComponentState[] = ['default', 'pressed', 'disabled', 'loading'];
const BREAKPOINTS: ResponsiveBreakpoint[] = ['mobile', 'tablet', 'foldable', 'desktop', 'watch'];

const NAMES_PER_CATEGORY = 21;
const PER_CATEGORY = NAMES_PER_CATEGORY * SIZES.length * STATES.length * BREAKPOINTS.length;

export function formatCount(n: number): string {
  if (n >= 100_000) return `${(n / 100_000).toFixed(1).replace(/\.0$/, '')} lakh+`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1).replace(/\.0$/, '')}k+`;
  return String(n);
}

function pascalToTitle(name: string): string {
  return name.replace(/([A-Z])/g, ' $1').trim();
}

export function getComponentAt(index: number): CatalogComponent {
  const safeIndex = Math.max(0, Math.min(index, CATALOG_TOTAL - 1));
  const categoryIndex = Math.floor(safeIndex / PER_CATEGORY);
  const remainder = safeIndex % PER_CATEGORY;

  const category = CATEGORIES[categoryIndex % CATEGORIES.length]!;
  const meta = CATEGORY_META[category];

  const breakpointIndex = remainder % BREAKPOINTS.length;
  const stateIndex = Math.floor(remainder / BREAKPOINTS.length) % STATES.length;
  const sizeIndex = Math.floor(remainder / (BREAKPOINTS.length * STATES.length)) % SIZES.length;
  const nameIndex = Math.floor(remainder / (BREAKPOINTS.length * STATES.length * SIZES.length));

  const names = BASE_NAMES[category];
  const baseName = names[nameIndex % names.length]!;
  const size = SIZES[sizeIndex]!;
  const state = STATES[stateIndex]!;
  const breakpoint = BREAKPOINTS[breakpointIndex]!;

  const name = `${baseName}${size === 'md' ? '' : size.charAt(0).toUpperCase() + size.slice(1)}`;
  const id = `${category}-${name}-${state}-${breakpoint}`.toLowerCase();

  const isShipped =
    baseName === 'MagneticButton' ||
    baseName === 'TiltCard' ||
    baseName === 'useMotion' ||
    baseName === 'usePressMotion' ||
    baseName === 'useMagneticMotion' ||
    baseName === 'useTiltMotion';

  const source = isShipped
    ? generateShippedSource(baseName, size, state, breakpoint)
    : generatePlaceholderSource(baseName, category, size, state, breakpoint);

  let screen = meta.screen;
  if (baseName === 'MagneticButton' || baseName === 'TiltCard') screen = 'motionlab';
  if (baseName === 'ProductCard') screen = 'commerce';

  return {
    id,
    index: safeIndex,
    name,
    category,
    categoryLabel: meta.label,
    size,
    state,
    breakpoint,
    description: `${pascalToTitle(baseName)} · ${size} · ${state} · optimized for ${breakpoint}`,
    tags: [category, size, state, breakpoint, 'responsive', 'react-native'],
    screen,
    responsive: true,
    source,
  };
}

function generateShippedSource(
  baseName: string,
  size: ComponentSize,
  state: ComponentState,
  breakpoint: ResponsiveBreakpoint,
): string {
  if (baseName === 'MagneticButton') {
    return `import { MagneticButton } from '@motionui/components';
import { useWindowDimensions } from 'react-native';

export function CTA() {
  const { width } = useWindowDimensions();
  const size = width < 380 ? 'sm' : '${size}';

  return (
    <MagneticButton
      size={size}
      variant="primary"
      strength={0.25}
      disabled={${state === 'disabled'}}
      onPress={() => {}}
    >
      Continue
    </MagneticButton>
  );
}`;
  }
  if (baseName === 'TiltCard') {
    return `import { TiltCard } from '@motionui/components';

<TiltCard
  title="Balance"
  description="Responsive on ${breakpoint}"
  maxTilt={${size === 'lg' ? 14 : 10}}
/>`;
  }
  return `import { ${baseName} } from '@motionui/motion';

const { animatedStyle } = ${baseName}({ preset: 'smooth' });`;
}

function generatePlaceholderSource(
  baseName: string,
  category: ComponentCategory,
  size: ComponentSize,
  state: ComponentState,
  breakpoint: ResponsiveBreakpoint,
): string {
  return `import { ${baseName} } from '@motionui/components';
import { useResponsiveValue } from '@motionui/hooks';

// ${category} · ${size} · ${state} · ${breakpoint}
export function Example() {
  const padding = useResponsiveValue({
    mobile: 12,
    tablet: 16,
    desktop: 20,
    default: 14,
  });

  return (
    <${baseName}
      size="${size}"
      state="${state}"
      breakpoint="${breakpoint}"
      style={{ padding }}
    />
  );
}`;
}

export interface CatalogSearchParams {
  query?: string;
  category?: ComponentCategory | 'all';
  page?: number;
  pageSize?: number;
}

export interface CatalogSearchResult {
  items: CatalogComponent[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export function searchCatalog({
  query = '',
  category = 'all',
  page = 1,
  pageSize = 48,
}: CatalogSearchParams): CatalogSearchResult {
  const q = query.trim().toLowerCase();
  const safePage = Math.max(1, page);

  if (!q && category === 'all') {
    const totalPages = Math.ceil(CATALOG_TOTAL / pageSize);
    const pageClamped = Math.min(safePage, totalPages);
    const start = (pageClamped - 1) * pageSize;
    const items = Array.from({ length: pageSize }, (_, i) => getComponentAt(start + i));
    return {
      items,
      total: CATALOG_TOTAL,
      page: pageClamped,
      pageSize,
      totalPages,
    };
  }

  if (!q && category !== 'all') {
    const catIndex = CATEGORIES.indexOf(category);
    const startIndex = catIndex * PER_CATEGORY;
    const total = PER_CATEGORY;
    const totalPages = Math.ceil(total / pageSize);
    const pageClamped = Math.min(safePage, totalPages);
    const start = (pageClamped - 1) * pageSize;
    const items = Array.from({ length: pageSize }, (_, i) =>
      getComponentAt(startIndex + start + i),
    );
    return {
      items,
      total,
      page: pageClamped,
      pageSize,
      totalPages,
    };
  }

  const matches: CatalogComponent[] = [];
  const maxResults = 2_000;

  for (let i = 0; i < CATALOG_TOTAL && matches.length < maxResults; i++) {
    const item = getComponentAt(i);
    if (category !== 'all' && item.category !== category) continue;
    if (
      !item.name.toLowerCase().includes(q) &&
      !item.categoryLabel.toLowerCase().includes(q) &&
      !item.tags.some((t) => t.includes(q))
    ) {
      continue;
    }
    matches.push(item);
  }

  const total = matches.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const pageClamped = Math.min(safePage, totalPages);
  const start = (pageClamped - 1) * pageSize;

  return {
    items: matches.slice(start, start + pageSize),
    total,
    page: pageClamped,
    pageSize,
    totalPages,
  };
}

export function getFeaturedComponents(): CatalogComponent[] {
  const targets = [
    'MagneticButton',
    'TiltCard',
    'useMotion',
    'usePressMotion',
    'PrimaryButton',
    'BottomSheet',
    'TextField',
    'FlatList',
  ];
  const found: CatalogComponent[] = [];

  for (let i = 0; i < CATALOG_TOTAL && found.length < targets.length; i++) {
    const c = getComponentAt(i);
    const base = c.name.replace(/(Xs|Sm|Md|Lg|Xl)$/, '');
    if (targets.includes(base) || targets.includes(c.name)) {
      if (!found.some((f) => f.name === c.name)) found.push(c);
    }
  }

  return found;
}

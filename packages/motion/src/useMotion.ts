import { useCallback, useMemo } from 'react';
import {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  withDelay,
  type WithSpringConfig,
  type WithTimingConfig,
  type SharedValue,
} from 'react-native-reanimated';
import {
  springPresets,
  timingPresets,
  type SpringPreset,
  type TimingPreset,
} from '@motionui/tokens';

export type MotionType = 'spring' | 'timing';

export interface UseMotionOptions {
  type?: MotionType;
  preset?: SpringPreset | TimingPreset;
  config?: WithSpringConfig | WithTimingConfig;
  delay?: number;
}

export interface MotionController {
  progress: SharedValue<number>;
  animate: (toValue: number) => void;
  reset: () => void;
  animatedStyle: ReturnType<typeof useAnimatedStyle>;
}

export function useMotion(options: UseMotionOptions = {}): MotionController {
  const { type = 'spring', preset = 'smooth', config, delay = 0 } = options;

  const progress = useSharedValue(0);

  const resolvedConfig = useMemo(() => {
    if (config) return config;
    if (type === 'spring') {
      return springPresets[preset as SpringPreset] ?? springPresets.smooth;
    }
    return timingPresets[preset as TimingPreset] ?? timingPresets.normal;
  }, [type, preset, config]);

  const animate = useCallback(
    (toValue: number) => {
      const run = () => {
        if (type === 'spring') {
          progress.value = withSpring(toValue, resolvedConfig as WithSpringConfig);
        } else {
          progress.value = withTiming(toValue, resolvedConfig as WithTimingConfig);
        }
      };
      if (delay > 0) {
        progress.value = withDelay(
          delay,
          type === 'spring'
            ? withSpring(toValue, resolvedConfig as WithSpringConfig)
            : withTiming(toValue, resolvedConfig as WithTimingConfig),
        );
      } else {
        run();
      }
    },
    [type, resolvedConfig, delay, progress],
  );

  const reset = useCallback(() => {
    progress.value = 0;
  }, [progress]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: progress.value,
    transform: [{ scale: 0.95 + progress.value * 0.05 }],
  }));

  return { progress, animate, reset, animatedStyle };
}

export interface UsePressMotionOptions extends UseMotionOptions {
  pressedScale?: number;
}

export function usePressMotion(options: UsePressMotionOptions = {}) {
  const { pressedScale = 0.96, type = 'spring', preset = 'snappy' } = options;
  const scale = useSharedValue(1);

  const springConfig = useMemo(
    () => springPresets[preset as SpringPreset] ?? springPresets.snappy,
    [preset],
  );

  const pressIn = useCallback(() => {
    scale.value =
      type === 'spring'
        ? withSpring(pressedScale, springConfig)
        : withTiming(pressedScale, timingPresets.fast);
  }, [scale, pressedScale, type, springConfig]);

  const pressOut = useCallback(() => {
    scale.value =
      type === 'spring' ? withSpring(1, springConfig) : withTiming(1, timingPresets.fast);
  }, [scale, type, springConfig]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return { scale, pressIn, pressOut, animatedStyle };
}

export interface UseMagneticMotionOptions {
  strength?: number;
  preset?: SpringPreset;
}

export function useMagneticMotion(options: UseMagneticMotionOptions = {}) {
  const { strength = 0.3, preset = 'smooth' } = options;
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const springConfig = springPresets[preset];

  const onMove = useCallback(
    (x: number, y: number, centerX: number, centerY: number) => {
      const dx = (x - centerX) * strength;
      const dy = (y - centerY) * strength;
      translateX.value = withSpring(dx, springConfig);
      translateY.value = withSpring(dy, springConfig);
    },
    [strength, springConfig, translateX, translateY],
  );

  const reset = useCallback(() => {
    translateX.value = withSpring(0, springConfig);
    translateY.value = withSpring(0, springConfig);
  }, [springConfig, translateX, translateY]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }, { translateY: translateY.value }],
  }));

  return { translateX, translateY, onMove, reset, animatedStyle };
}

export interface UseTiltMotionOptions {
  maxTilt?: number;
  preset?: SpringPreset;
}

export function useTiltMotion(options: UseTiltMotionOptions = {}) {
  const { maxTilt = 12, preset = 'smooth' } = options;
  const rotateX = useSharedValue(0);
  const rotateY = useSharedValue(0);
  const springConfig = springPresets[preset];

  const onMove = useCallback(
    (x: number, y: number, width: number, height: number) => {
      const centerX = width / 2;
      const centerY = height / 2;
      const tiltY = ((x - centerX) / centerX) * maxTilt;
      const tiltX = -((y - centerY) / centerY) * maxTilt;
      rotateY.value = withSpring(tiltY, springConfig);
      rotateX.value = withSpring(tiltX, springConfig);
    },
    [maxTilt, springConfig, rotateX, rotateY],
  );

  const reset = useCallback(() => {
    rotateX.value = withSpring(0, springConfig);
    rotateY.value = withSpring(0, springConfig);
  }, [springConfig, rotateX, rotateY]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { perspective: 1000 },
      { rotateX: `${rotateX.value}deg` },
      { rotateY: `${rotateY.value}deg` },
    ],
  }));

  return { rotateX, rotateY, onMove, reset, animatedStyle };
}

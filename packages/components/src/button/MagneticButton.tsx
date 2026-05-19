import React, { useRef } from 'react';
import {
  Pressable,
  Text,
  StyleSheet,
  type PressableProps,
  type ViewStyle,
  type TextStyle,
} from 'react-native';
import Animated from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { useMagneticMotion, usePressMotion } from '@motionui/motion';
import { useThemeColors } from '@motionui/theme';
import { useLayout } from '@motionui/hooks';

export interface MagneticButtonProps extends Omit<PressableProps, 'style'> {
  children: React.ReactNode;
  style?: ViewStyle;
  textStyle?: TextStyle;
  strength?: number;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export function MagneticButton({
  children,
  style,
  textStyle,
  strength = 0.25,
  variant = 'primary',
  size = 'md',
  onPress,
  disabled,
  ...props
}: MagneticButtonProps) {
  const colors = useThemeColors();
  const { layout, onLayout } = useLayout();
  const layoutRef = useRef(layout);
  layoutRef.current = layout;

  const { animatedStyle: magneticStyle, onMove, reset } = useMagneticMotion({ strength });
  const { animatedStyle: pressStyle, pressIn, pressOut } = usePressMotion();

  const pan = Gesture.Pan()
    .onUpdate((e) => {
      const { width, height } = layoutRef.current;
      if (width === 0) return;
      onMove(e.x, e.y, width / 2, height / 2);
    })
    .onEnd(() => {
      reset();
    });

  const variantStyles: Record<string, ViewStyle> = {
    primary: { backgroundColor: colors.primary },
    secondary: { backgroundColor: colors.secondary },
    ghost: { backgroundColor: 'transparent', borderWidth: 1, borderColor: colors.border },
  };

  const sizeStyles: Record<string, ViewStyle> = {
    sm: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8 },
    md: { paddingHorizontal: 20, paddingVertical: 12, borderRadius: 12 },
    lg: { paddingHorizontal: 28, paddingVertical: 16, borderRadius: 16 },
  };

  const textColors: Record<string, string> = {
    primary: colors.primaryForeground,
    secondary: colors.secondaryForeground,
    ghost: colors.foreground,
  };

  return (
    <GestureDetector gesture={pan}>
      <AnimatedPressable
        onLayout={onLayout}
        onPress={onPress}
        onPressIn={() => !disabled && pressIn()}
        onPressOut={() => !disabled && pressOut()}
        disabled={disabled}
        style={[
          styles.base,
          variantStyles[variant],
          sizeStyles[size],
          magneticStyle,
          pressStyle,
          disabled && styles.disabled,
          style,
        ]}
        accessibilityRole="button"
        {...props}
      >
        {typeof children === 'string' ? (
          <Text style={[styles.text, { color: textColors[variant] }, textStyle]}>{children}</Text>
        ) : (
          children
        )}
      </AnimatedPressable>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
  disabled: {
    opacity: 0.5,
  },
});

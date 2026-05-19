import React, { useRef } from 'react';
import { Text, StyleSheet, type ViewStyle, type TextStyle } from 'react-native';
import Animated from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { useTiltMotion } from '@motionui/motion';
import { useThemeColors } from '@motionui/theme';
import { useLayout } from '@motionui/hooks';
import { shadows } from '@motionui/tokens';

export interface TiltCardProps {
  title?: string;
  description?: string;
  children?: React.ReactNode;
  style?: ViewStyle;
  titleStyle?: TextStyle;
  descriptionStyle?: TextStyle;
  maxTilt?: number;
}

export function TiltCard({
  title,
  description,
  children,
  style,
  titleStyle,
  descriptionStyle,
  maxTilt = 10,
}: TiltCardProps) {
  const colors = useThemeColors();
  const { layout, onLayout } = useLayout();
  const layoutRef = useRef(layout);
  layoutRef.current = layout;

  const { animatedStyle, onMove, reset } = useTiltMotion({ maxTilt });

  const pan = Gesture.Pan()
    .onUpdate((e) => {
      const { width, height } = layoutRef.current;
      if (width === 0) return;
      onMove(e.x, e.y, width, height);
    })
    .onEnd(() => {
      reset();
    });

  return (
    <GestureDetector gesture={pan}>
      <Animated.View
        onLayout={onLayout}
        style={[
          styles.card,
          {
            backgroundColor: colors.card,
            borderColor: colors.border,
          },
          shadows.lg,
          animatedStyle,
          style,
        ]}
      >
        {title ? (
          <Text style={[styles.title, { color: colors.cardForeground }, titleStyle]}>{title}</Text>
        ) : null}
        {description ? (
          <Text
            style={[styles.description, { color: colors.foregroundSecondary }, descriptionStyle]}
          >
            {description}
          </Text>
        ) : null}
        {children}
      </Animated.View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    overflow: 'hidden',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
  },
});

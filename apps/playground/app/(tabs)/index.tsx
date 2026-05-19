import { ScrollView, StyleSheet, Text, View, Pressable } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { MagneticButton, TiltCard } from '@motionui/components';
import { useTheme, useThemeColors } from '@motionui/theme';

export default function HomeScreen() {
  const { resolvedMode, toggleMode } = useTheme();
  const colors = useThemeColors();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar style={resolvedMode === 'dark' ? 'light' : 'dark'} />

      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.foreground }]}>MotionUI Native</Text>
        <Text style={[styles.subtitle, { color: colors.foregroundSecondary }]}>
          Motion-first components for React Native
        </Text>
        <Pressable
          onPress={toggleMode}
          style={[styles.themeToggle, { borderColor: colors.border }]}
        >
          <Text style={{ color: colors.foreground }}>
            {resolvedMode === 'dark' ? 'Light mode' : 'Dark mode'}
          </Text>
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>MagneticButton</Text>
        <Text style={[styles.sectionDesc, { color: colors.foregroundSecondary }]}>
          Drag over the button to feel magnetic pull
        </Text>
        <View style={styles.row}>
          <MagneticButton variant="primary" onPress={() => {}}>
            Primary
          </MagneticButton>
          <MagneticButton variant="secondary" onPress={() => {}}>
            Secondary
          </MagneticButton>
        </View>
        <MagneticButton variant="ghost" size="lg" onPress={() => {}}>
          Ghost Large
        </MagneticButton>

        <Text style={[styles.sectionTitle, { color: colors.foreground, marginTop: 32 }]}>
          TiltCard
        </Text>
        <Text style={[styles.sectionDesc, { color: colors.foregroundSecondary }]}>
          Pan across the card for 3D tilt effect
        </Text>
        <TiltCard
          title="Depth & Parallax"
          description="Physics-driven tilt with spring presets. Built for iOS, Android, and Web."
        />
        <TiltCard
          title="Premium Interactions"
          description="Every component feels alive — spring-based, fluid, and natural."
          style={{ marginTop: 16 }}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
  },
  header: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
    marginTop: 4,
  },
  themeToggle: {
    marginTop: 16,
    alignSelf: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
  },
  scroll: {
    paddingHorizontal: 24,
    paddingBottom: 48,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  sectionDesc: {
    fontSize: 14,
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
});

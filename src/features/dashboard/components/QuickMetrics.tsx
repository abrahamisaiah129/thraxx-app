import { router } from 'expo-router';
import type { Icon as PhosphorIcon } from 'phosphor-react-native';
import { Flag } from 'phosphor-react-native/src/icons/Flag';
import { ListChecks } from 'phosphor-react-native/src/icons/ListChecks';
import { Motorcycle } from 'phosphor-react-native/src/icons/Motorcycle';
import { PauseCircle } from 'phosphor-react-native/src/icons/PauseCircle';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { dashboardData } from '../../../data/mockData';
import { colors } from '../../../theme/tokens';

const COLORS = {
  success: { fg: '#16a34a', bg: '#f0fdf4' },
  info: { fg: colors.primary, bg: colors.primaryLight },
  danger: { fg: '#dc2626', bg: '#fef2f2' },
  warning: { fg: '#d97706', bg: '#fffbeb' },
  neutral: { fg: '#6b7280', bg: '#f3f4f6' },
  text: '#111827',
  muted: '#6b7280',
  border: '#e5e7eb',
};

type SideRowProps = {
  label: string;
  value: number;
  icon: PhosphorIcon;
  tone: { fg: string; bg: string };
  onPress: () => void;
  isLast?: boolean;
};

// One compact row in the right column: small icon, label, value.
function SideRow({ label, value, icon: Icon, tone, onPress, isLast }: SideRowProps) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${label}: ${value}`}
      style={({ pressed }) => [
        styles.sideRow,
        !isLast && styles.sideRowDivider,
        pressed && styles.pressed,
      ]}
    >
      <View style={[styles.sideIcon]}>
        <Icon size={16} weight="fill" color={tone.fg} />
      </View>
      <Text style={styles.sideLabel} numberOfLines={1}>
        {label}
      </Text>
      <Text style={styles.sideValue}>{value.toLocaleString()}</Text>
    </Pressable>
  );
}

export function QuickMetrics() {
  const { metrics } = dashboardData;

  // Flags is red only when something needs attention.
  const flagTone = metrics.flaggedEvents > 0 ? COLORS.danger : COLORS.neutral;

  return (
    <View style={styles.card}>
      {/* Hero: Active Riders is the top priority, so it gets the big number and the tinted panel. */}
      <Pressable
        onPress={() => router.push('/riders')}
        accessibilityRole="button"
        accessibilityLabel={`Active Riders: ${metrics.activeRiders}`}
        style={({ pressed }) => [styles.hero, pressed && styles.pressed]}
      >
        <View style={styles.heroIcon}>
          <Motorcycle size={24} weight="fill" color={colors.primary} />
        </View>
        <View>
          <Text style={styles.heroValue}>{metrics.activeRiders.toLocaleString()}</Text>
          <Text style={styles.heroLabel}>Active Riders</Text>
        </View>
      </Pressable>

      {/* Secondary metrics: smaller, stacked, still easy to read. */}
      <View style={styles.side}>
        <SideRow
          label="Tasks"
          value={metrics.liveAssignments}
          icon={ListChecks}
          tone={COLORS.info}
          onPress={() => router.push('/assignments')}
        />
        <SideRow
          label="Flags"
          value={metrics.flaggedEvents}
          icon={Flag}
          tone={flagTone}
          onPress={() => router.push('/reports')}
        />
        <SideRow
          label="Idle"
          value={metrics.idleRiders}
          icon={PauseCircle}
          tone={COLORS.warning}
          onPress={() => router.push('/riders')}
          isLast
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // One card holding everything; overflow hidden lets the hero panel follow the rounded corners.
  card: {
    flexDirection: 'row',
    backgroundColor: '#ffffff', // Overall card background
    borderBottomLeftRadius: 16, // Curve the bottom left corner
    borderBottomRightRadius: 16, // Curve the bottom right corner
    borderWidth: 0,
    width: '100%', // Make it full width
    overflow: 'hidden',
    marginBottom: 24,
  },

  // Left panel: deeper tint to separate from the right side.
  hero: {
    flex: 0.9,
    padding: 16, // Premium spacing
    justifyContent: 'space-between',
    backgroundColor: colors.primaryLight, // Traxx blue tint for left panel
    minHeight: 140, 
  },
  heroIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'flex-start',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  heroValue: {
    fontSize: 48, // Balanced big number
    lineHeight: 52,
    fontWeight: '700',
    letterSpacing: -1,
    fontVariant: ['tabular-nums'],
    color: COLORS.text,
  },
  heroLabel: {
    marginTop: 4,
    fontSize: 15,
    fontWeight: '500',
    color: COLORS.muted,
  },

  // Right column: more space so labels do not truncate
  side: {
    flex: 1.2,
    paddingHorizontal: 16, 
    paddingVertical: 12,
    backgroundColor: '#ffffff', // White right panel
  },
  sideRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  sideRowDivider: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(0, 0, 0, 0.05)', 
  },
  sideIcon: {
    width: 24, 
    height: 24, 
    alignItems: 'center',
    justifyContent: 'center',
  },
  sideLabel: {
    flex: 1, // Let label take remaining space
    fontSize: 15,
    fontWeight: '500',
    color: COLORS.muted,
  },
  sideValue: {
    fontSize: 20, 
    fontWeight: '700',
    fontVariant: ['tabular-nums'],
    color: COLORS.text, 
    textAlign: 'right', // Value on the right
  },

  pressed: {
    opacity: 0.8,
  },
});

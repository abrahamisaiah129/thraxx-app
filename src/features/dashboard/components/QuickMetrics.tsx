import { fleetManagerData } from '@/data/fleetManagerData';
import { colors } from '@/theme/tokens';
import { router } from 'expo-router';
// Cleaned up the imports to prevent bundling and path resolution issues
import { Flag, ListChecks, PauseCircle, Plus } from 'phosphor-react-native';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

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

export function QuickMetrics() {
  const summary = {
    activeRidersCount: fleetManagerData.riders.length,
  };
  const activeAssignments = fleetManagerData.Assignments.filter(
    (assignment) => assignment.deliveryStatus === 'in_progress',
  ).length;

  const idleCalculatedValue = fleetManagerData.Assignments.filter(
    (assignment) => assignment.deliveryStatus === 'in_progress' && assignment.openFlagCount === 0,
  ).length;
  const flaggedCalculatedValue = fleetManagerData.supportTickets.filter(
    (t: any) => t.status === 'open',
  ).length;

  const [idle, setIdle] = useState(idleCalculatedValue);
  const [flagged, setFlagged] = useState(flaggedCalculatedValue);

  const flagTone = flagged > 0 ? COLORS.danger : COLORS.neutral;
  const sideMetrics = [
    {
      label: 'Live Tasks',
      title: 'liveTasks',
      value: activeAssignments,
      icon: ListChecks,
      tone: COLORS.info,
    },
    { label: 'Flags', title: 'flags', value: flagged, icon: Flag, tone: flagTone },
    { label: 'Idle', title: 'idle', value: idle, icon: PauseCircle, tone: COLORS.warning },
  ];

  return (
    <View style={styles.wrapper}>
      {/* Card 1: Active Riders (hero) on the left, Add Rider action at the top right */}
      <View style={styles.card}>
        <Pressable
          onPress={() => router.push('/fleet_manager/riders')}
          accessibilityRole="button"
          accessibilityLabel={`Active Riders: ${summary.activeRidersCount}`}
          style={({ pressed }) => [styles.hero, pressed && styles.pressed]}
        >
          {/* Bottom: number and label stacked */}
          <View>
            <Text style={styles.heroValue}>{summary.activeRidersCount.toLocaleString()}</Text>
            <Text style={styles.heroLabel}>Active Riders</Text>
          </View>
        </Pressable>

        <View style={styles.actionArea}>
          <Pressable
            onPress={() => router.push('/fleet_manager/add-rider')}
            accessibilityRole="button"
            accessibilityLabel="Add Rider"
            hitSlop={8}
            style={({ pressed }) => [styles.addButton, pressed && styles.addButtonPressed]}
          >
            {/* Color updated to #2563EA so it doesn't blend into the white button background */}
            <Plus size={14} weight="bold" color="#2563EA" />
            <Text style={styles.addText}>Add Rider</Text>
          </Pressable>
        </View>
      </View>

      {/* Card 2: the three secondary metrics side by side */}
      <View style={styles.sideCard}>
        {sideMetrics.map(({ label, value, icon: Icon, tone }, i) => (
          <Pressable
            key={label}
            style={[styles.sideItem, i < sideMetrics.length - 1 && styles.sideItemDivider]}
          >
            <View style={[styles.sideIcon, { backgroundColor: tone.bg }]}>
              <Icon size={20} weight="duotone" color={tone.fg} />
            </View>
            <Text style={[styles.sideValue, { color: tone.fg }]}>{value.toLocaleString()}</Text>
            <Text style={styles.sideLabel} numberOfLines={1}>
              {label}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // Holds both cards with an even gap between them.
  wrapper: {
    gap: 12,
    marginBottom: 24,
  },

  // ---------- Card 1 ----------
  card: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: '#2563EA',
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    overflow: 'hidden',
  },
  hero: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
    minHeight: 140,
  },
  heroValue: {
    fontSize: 48,
    lineHeight: 52,
    fontWeight: '700',
    letterSpacing: -1,
    fontVariant: ['tabular-nums'],
    color: '#ffffff',
  },
  heroLabel: {
    marginTop: 4,
    fontSize: 15,
    fontWeight: '500',
    color: '#ffffff',
  },

  // Right side of card 1: keeps the button pinned to the top right.
  actionArea: {
    padding: 16,
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#ffffff',
    borderRadius: 999,
  },
  addButtonPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.97 }],
  },
  addText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#2563EA',
  },

  // ---------- Card 2 ----------
  sideCard: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: COLORS.border,
    overflow: 'hidden',
  },
  sideItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 4,
    gap: 4,
  },
  sideItemDivider: {
    borderRightWidth: StyleSheet.hairlineWidth,
    borderRightColor: COLORS.border,
  },
  sideIcon: {
    width: 32,
    height: 32,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sideValue: {
    fontSize: 20,
    fontWeight: '700',
    fontVariant: ['tabular-nums'],
  },
  sideLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: COLORS.muted,
  },

  pressed: {
    opacity: 0.8,
  },
});

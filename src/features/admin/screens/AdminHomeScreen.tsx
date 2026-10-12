import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import {
  Buildings,
  CaretRight,
  ChartLineUp,
  ShieldCheck,
  Ticket,
  User,
} from 'phosphor-react-native';
import { router } from 'expo-router';
import { OfflineBanner } from '@/components/OfflineBanner';
import { Screen } from '@/components/Screen';
import { StatePanel } from '@/components/StatePanel';
import { colors, spacing } from '@/theme/tokens';
import { fleetManagerData } from '@/data/fleetManagerData';
import { useAuthStore } from '@/store/useAuthStore';

export function AdminHomeScreen() {
  const login = useAuthStore((s) => s.login);

  const metrics = [
    {
      label: 'Partner Fleets',
      value: '12',
      icon: Buildings,
    },
    {
      label: 'Active Riders',
      value: `${fleetManagerData.riders.length}`,
      icon: ShieldCheck,
    },
    {
      label: 'Open Tickets',
      value: `${fleetManagerData.supportTickets.length}`,
      icon: Ticket,
    },
    {
      label: 'Deliveries Today',
      value: `${fleetManagerData.Assignments.length}`,
      icon: ChartLineUp,
    },
  ];

  return (
    <Screen scroll>
      <View style={styles.header}>
        <View>
          <Text style={styles.eyebrow}>SUPER ADMIN</Text>
          <Text style={styles.title}>Platform Overview</Text>
        </View>
        <Text style={styles.environment}>ACTIVE</Text>
      </View>

      <OfflineBanner />

      {/* 4-Metric Grid */}
      <View style={styles.grid}>
        {metrics.map(({ label, value, icon: Icon }) => (
          <View key={label} style={styles.metric}>
            <Icon size={24} color={colors.primary} weight="bold" />
            <Text style={styles.metricValue}>{value}</Text>
            <Text style={styles.metricLabel}>{label}</Text>
          </View>
        ))}
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Action Required</Text>
        <Text style={styles.caption}>Real-time platform status</Text>
      </View>

      {/* Review Business Action */}
      <StatePanel
        title="2 Businesses Pending Verification"
        message="SwiftDrop Nigeria and PrimeExpress Logistics submitted KYC documents."
        action={
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Review business applications"
            onPress={() => router.push('/admin/businesses')}
            style={({ pressed }) => [styles.action, pressed && styles.pressed]}
          >
            <Text style={styles.actionText}>Review Businesses</Text>
            <CaretRight size={18} color={colors.primary} />
          </Pressable>
        }
      />

      {/* Support Desk Action */}
      <View style={{ marginTop: spacing.md }}>
        <StatePanel
          title="Fleet Support Queue"
          message={`${fleetManagerData.supportTickets.length} dispatch tickets awaiting platform support triage.`}
          action={
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="View support tickets"
              onPress={() => router.push('/admin/support')}
              style={({ pressed }) => [styles.action, pressed && styles.pressed]}
            >
              <Text style={styles.actionText}>Support Queue</Text>
              <CaretRight size={18} color={colors.primary} />
            </Pressable>
          }
        />
      </View>

      {/* Role Switcher */}
      <View style={styles.roleSwitchCard}>
        <Text style={styles.roleSwitchTitle}>Quick Role Switcher (Mock Mode)</Text>
        <View style={styles.roleSwitchRow}>
          <Pressable
            onPress={async () => {
              await login('manager@traxx.ng', 'fleet_manager');
              router.replace('/fleet_manager');
            }}
            style={styles.switchRoleBtn}
          >
            <ShieldCheck size={16} color={colors.primary} />
            <Text style={styles.switchRoleText}>Fleet Manager</Text>
          </Pressable>

          <Pressable
            onPress={async () => {
              await login('rider@traxx.ng', 'rider');
              router.replace('/rider');
            }}
            style={styles.switchRoleBtn}
          >
            <User size={16} color={colors.text} />
            <Text style={styles.switchRoleText}>Rider Mode</Text>
          </Pressable>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  eyebrow: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1,
  },
  title: {
    color: colors.text,
    fontSize: 28,
    fontWeight: '800',
    marginTop: 2,
  },
  environment: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    backgroundColor: '#f0fdf4',
    color: '#16a34a',
    fontSize: 11,
    fontWeight: '800',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
    marginTop: spacing.sm,
    marginBottom: spacing.lg,
  },
  metric: {
    width: '47.5%',
    padding: spacing.md,
    borderRadius: 14,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 6,
  },
  metricValue: {
    color: colors.text,
    fontSize: 24,
    fontWeight: '800',
  },
  metricLabel: {
    color: colors.textSecondary,
    fontSize: 12,
    fontWeight: '600',
  },
  sectionHeader: {
    marginBottom: spacing.sm,
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '800',
  },
  caption: {
    color: colors.textSecondary,
    fontSize: 13,
    marginTop: 2,
  },
  action: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 6,
  },
  actionText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '700',
  },
  pressed: {
    opacity: 0.7,
  },
  roleSwitchCard: {
    marginTop: spacing.xl,
    padding: spacing.md,
    borderRadius: 12,
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: colors.border,
    gap: 10,
    marginBottom: spacing.xl,
  },
  roleSwitchTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textSecondary,
  },
  roleSwitchRow: {
    flexDirection: 'row',
    gap: 10,
  },
  switchRoleBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 10,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 8,
  },
  switchRoleText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.text,
  },
});

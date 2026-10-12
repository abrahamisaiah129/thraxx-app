import React, { useState } from 'react';
import { StyleSheet, Text, View, Pressable, Switch, Alert } from 'react-native';
import {
  Gear,
  ShieldCheck,
  User,
  SignOut,
  SlidersHorizontal,
  Bell,
  Cpu,
} from 'phosphor-react-native';
import { router } from 'expo-router';
import { Screen } from '@/components/Screen';
import { colors, spacing } from '@/theme/tokens';
import { useAuthStore } from '@/store/useAuthStore';

export default function AdminSettingsScreen() {
  const [autoDispatch, setAutoDispatch] = useState(true);
  const [requirePod, setRequirePod] = useState(true);
  const [highFreqGps, setHighFreqGps] = useState(false);
  const { logout, login } = useAuthStore();

  const handleLogout = () => {
    logout();
    router.replace('/auth/login');
  };

  return (
    <Screen scroll>
      <View style={styles.header}>
        <Text style={styles.eyebrow}>PLATFORM SETTINGS</Text>
        <Text style={styles.title}>Admin Controls</Text>
        <Text style={styles.subtitle}>
          Configure global dispatch algorithms, security, and workspaces.
        </Text>
      </View>

      {/* Dispatch Rules Card */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Cpu size={20} color={colors.primary} weight="bold" />
          <Text style={styles.cardTitle}>Dispatch Automation</Text>
        </View>

        <View style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingLabel}>Automated Order Assignment</Text>
            <Text style={styles.settingDesc}>
              Automatically assign pending bookings to closest available rider
            </Text>
          </View>
          <Switch
            value={autoDispatch}
            onValueChange={setAutoDispatch}
            trackColor={{ false: '#e2e8f0', true: colors.primary }}
          />
        </View>

        <View style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingLabel}>Strict Proof of Delivery (POD)</Text>
            <Text style={styles.settingDesc}>
              Require photo or digital signature before completing waybills
            </Text>
          </View>
          <Switch
            value={requirePod}
            onValueChange={setRequirePod}
            trackColor={{ false: '#e2e8f0', true: colors.primary }}
          />
        </View>

        <View style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingLabel}>High-Frequency Telemetry (5s)</Text>
            <Text style={styles.settingDesc}>
              Stream GPS coordinates every 5 seconds (higher battery consumption)
            </Text>
          </View>
          <Switch
            value={highFreqGps}
            onValueChange={setHighFreqGps}
            trackColor={{ false: '#e2e8f0', true: colors.primary }}
          />
        </View>
      </View>

      {/* Role Switcher */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <SlidersHorizontal size={20} color={colors.primary} weight="bold" />
          <Text style={styles.cardTitle}>Test Workspace (Mock Mode)</Text>
        </View>

        <Text style={styles.switchHelp}>
          Instantly jump into another role without manual login:
        </Text>

        <View style={styles.roleButtons}>
          <Pressable
            onPress={async () => {
              await login('manager@traxx.ng', 'fleet_manager');
              router.replace('/fleet_manager');
            }}
            style={styles.roleBtn}
          >
            <ShieldCheck size={18} color={colors.primary} />
            <Text style={styles.roleBtnText}>Fleet Manager</Text>
          </Pressable>

          <Pressable
            onPress={async () => {
              await login('rider@traxx.ng', 'rider');
              router.replace('/rider');
            }}
            style={styles.roleBtn}
          >
            <User size={18} color={colors.text} />
            <Text style={styles.roleBtnText}>Rider Mode</Text>
          </Pressable>
        </View>

        <Pressable onPress={handleLogout} style={styles.logoutBtn}>
          <SignOut size={18} color={colors.danger} />
          <Text style={styles.logoutText}>Sign Out of Super Admin</Text>
        </Pressable>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
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
  subtitle: {
    color: colors.textSecondary,
    fontSize: 14,
    marginTop: 4,
  },
  card: {
    padding: spacing.md,
    borderRadius: 16,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
    gap: 12,
  },
  settingInfo: {
    flex: 1,
  },
  settingLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  settingDesc: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
    lineHeight: 16,
  },
  switchHelp: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  roleButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  roleBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: colors.border,
  },
  roleBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.text,
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: '#fee2e2',
    marginTop: 4,
  },
  logoutText: {
    color: colors.danger,
    fontSize: 14,
    fontWeight: '700',
  },
});

import React, { useState } from 'react';
import { StyleSheet, Text, View, Pressable, Alert } from 'react-native';
import {
  User,
  Star,
  Motorcycle,
  Clock,
  CurrencyNgn,
  SignOut,
  ShieldCheck,
  CheckCircle,
} from 'phosphor-react-native';
import { router } from 'expo-router';
import { Screen } from '@/components/Screen';
import { colors, spacing } from '@/theme/tokens';
import { fleetManagerData } from '@/data/fleetManagerData';
import { useAuthStore } from '@/store/useAuthStore';

export function RiderProfileScreen() {
  const rider = fleetManagerData.riders[0];
  const vehicle = fleetManagerData.activeVehicles[0];
  const [onShift, setOnShift] = useState(true);
  const { logout, login } = useAuthStore();

  const handleToggleShift = () => {
    setOnShift(!onShift);
    Alert.alert(
      'Shift Status Updated',
      !onShift
        ? 'You are now ON SHIFT. Ready to receive dispatch deliveries.'
        : 'You have ended your shift. Sign-off request logged.',
    );
  };

  const handleLogout = () => {
    logout();
    router.replace('/auth/login');
  };

  return (
    <Screen scroll>
      <View style={styles.header}>
        <Text style={styles.eyebrow}>RIDER PROFILE</Text>
        <Text style={styles.title}>Account & Stats</Text>
      </View>

      {/* Driver Card */}
      <View style={styles.card}>
        <View style={styles.profileRow}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{rider.name.charAt(0)}</Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.name}>{rider.name}</Text>
            <Text style={styles.code}>{rider.riderCode} • {rider.phone}</Text>
            <View style={styles.ratingBadge}>
              <Star size={14} color="#d97706" weight="fill" />
              <Text style={styles.ratingText}>{rider.rating} Rating</Text>
            </View>
          </View>
        </View>

        <Pressable
          onPress={handleToggleShift}
          style={[styles.shiftToggleBtn, onShift ? styles.shiftActive : styles.shiftInactive]}
        >
          <Clock size={18} color={onShift ? '#16a34a' : '#64748b'} weight="bold" />
          <Text style={[styles.shiftToggleText, onShift ? styles.shiftTextActive : styles.shiftTextInactive]}>
            {onShift ? 'Shift Active (Clocked In 08:15 AM)' : 'Clocked Out (Start Shift)'}
          </Text>
        </Pressable>
      </View>

      {/* Performance Grid */}
      <View style={styles.statsGrid}>
        <View style={styles.statCard}>
          <CurrencyNgn size={22} color="#16a34a" weight="bold" />
          <Text style={styles.statValue}>₦38,500</Text>
          <Text style={styles.statLabel}>Today&apos;s Earnings</Text>
        </View>

        <View style={styles.statCard}>
          <CheckCircle size={22} color={colors.primary} weight="bold" />
          <Text style={styles.statValue}>{rider.completedDeliveries}</Text>
          <Text style={styles.statLabel}>Total Deliveries</Text>
        </View>
      </View>

      {/* Assigned Vehicle */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Assigned Vehicle</Text>
        <View style={styles.vehicleRow}>
          <View style={styles.vehicleIcon}>
            <Motorcycle size={24} color={colors.primary} />
          </View>
          <View style={styles.vehicleInfo}>
            <Text style={styles.plate}>{vehicle.licensePlateNumber}</Text>
            <Text style={styles.category}>{vehicle.vehicleCategory} • Fleet Unit #1</Text>
          </View>
          <Text style={styles.telemetryStatus}>{vehicle.telemetryStatus.toUpperCase()}</Text>
        </View>
      </View>

      {/* Role Switcher & Auth */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Switch Role (Demo Mode)</Text>
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
              await login('admin@traxx.ng', 'admin');
              router.replace('/admin');
            }}
            style={styles.roleBtn}
          >
            <User size={18} color={colors.text} />
            <Text style={styles.roleBtnText}>Admin</Text>
          </Pressable>
        </View>

        <Pressable onPress={handleLogout} style={styles.logoutBtn}>
          <SignOut size={18} color={colors.danger} />
          <Text style={styles.logoutText}>Sign Out</Text>
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
  card: {
    padding: spacing.md,
    borderRadius: 16,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.primary,
  },
  profileInfo: {
    flex: 1,
  },
  name: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '800',
  },
  code: {
    color: colors.textSecondary,
    fontSize: 13,
    marginTop: 2,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#d97706',
  },
  shiftToggleBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
    borderRadius: 10,
  },
  shiftActive: {
    backgroundColor: '#f0fdf4',
  },
  shiftInactive: {
    backgroundColor: '#f1f5f9',
  },
  shiftToggleText: {
    fontSize: 13,
    fontWeight: '700',
  },
  shiftTextActive: {
    color: '#16a34a',
  },
  shiftTextInactive: {
    color: '#64748b',
  },
  statsGrid: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  statCard: {
    flex: 1,
    padding: spacing.md,
    borderRadius: 16,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    gap: 4,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.text,
    marginTop: 2,
  },
  statLabel: {
    fontSize: 11,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.text,
  },
  vehicleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  vehicleIcon: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  vehicleInfo: {
    flex: 1,
  },
  plate: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.text,
  },
  category: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  telemetryStatus: {
    fontSize: 11,
    fontWeight: '800',
    color: colors.primary,
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
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: colors.border,
  },
  roleBtnText: {
    fontSize: 13,
    fontWeight: '600',
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

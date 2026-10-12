import React from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import {
  Buildings,
  Crown,
  MapPin,
  Phone,
  EnvelopeSimple,
  ShieldCheck,
  User,
  SignOut,
  SlidersHorizontal,
} from 'phosphor-react-native';
import { colors, spacing } from '@/theme/tokens';
import { fleetManagerData } from '@/data/fleetManagerData';
import { useAuthStore } from '@/store/useAuthStore';

export default function FleetManagerProfileScreen() {
  const insets = useSafeAreaInsets();
  const { Company } = fleetManagerData;
  const { logout, login } = useAuthStore();

  const handleLogout = () => {
    logout();
    router.replace('/auth/login');
  };

  return (
    <ScrollView
      style={[styles.container, { paddingTop: insets.top }]}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Text style={styles.eyebrow}>FLEET SETTINGS</Text>
        <Text style={styles.title}>Company Profile</Text>
        <Text style={styles.subtitle}>Manage organization credentials and workspace access</Text>
      </View>

      {/* Company Info Card */}
      <View style={styles.card}>
        <View style={styles.companyHero}>
          <View style={styles.companyIconBox}>
            <Buildings size={28} color={colors.primary} weight="bold" />
          </View>
          <View style={styles.heroText}>
            <Text style={styles.companyName}>{Company.legalName}</Text>
            <Text style={styles.companyId}>ID: {Company.companyId}</Text>
          </View>
        </View>

        <View style={styles.infoList}>
          <View style={styles.infoRow}>
            <EnvelopeSimple size={16} color={colors.textSecondary} />
            <Text style={styles.infoLabel}>Email:</Text>
            <Text style={styles.infoValue}>{Company.emailAddress}</Text>
          </View>
          <View style={styles.infoRow}>
            <Phone size={16} color={colors.textSecondary} />
            <Text style={styles.infoLabel}>Phone:</Text>
            <Text style={styles.infoValue}>{Company.phoneNumber}</Text>
          </View>
          <View style={styles.infoRow}>
            <MapPin size={16} color={colors.textSecondary} />
            <Text style={styles.infoLabel}>Base:</Text>
            <Text style={styles.infoValue}>{Company.Address}</Text>
          </View>
        </View>
      </View>

      {/* Subscription Card */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Crown size={20} color="#d97706" weight="fill" />
          <Text style={styles.cardTitle}>Plan & Fleet Quota</Text>
        </View>

        <View style={styles.planBox}>
          <View>
            <Text style={styles.planName}>{Company.subscription} Tier</Text>
            <Text style={styles.planLimit}>
              Max {Company.assignedRidersMaxCount} simultaneous riders
            </Text>
          </View>
          <Pressable
            onPress={() => router.push('/fleet_manager/pricing')}
            style={styles.upgradeBtn}
          >
            <Text style={styles.upgradeBtnText}>Upgrade</Text>
          </Pressable>
        </View>
      </View>

      {/* Quick Role Switcher */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <SlidersHorizontal size={20} color={colors.primary} weight="bold" />
          <Text style={styles.cardTitle}>Switch Role (Demo Mode)</Text>
        </View>

        <View style={styles.roleButtons}>
          <Pressable
            onPress={async () => {
              await login('rider@traxx.ng', 'rider');
              router.replace('/rider');
            }}
            style={styles.roleBtn}
          >
            <User size={18} color={colors.primary} />
            <Text style={styles.roleBtnText}>Rider Mode</Text>
          </Pressable>

          <Pressable
            onPress={async () => {
              await login('admin@traxx.ng', 'admin');
              router.replace('/admin');
            }}
            style={styles.roleBtn}
          >
            <ShieldCheck size={18} color={colors.text} />
            <Text style={styles.roleBtnText}>Admin Mode</Text>
          </Pressable>
        </View>

        <Pressable onPress={handleLogout} style={styles.logoutBtn}>
          <SignOut size={18} color={colors.danger} />
          <Text style={styles.logoutText}>Sign Out</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  content: {
    padding: 16,
    gap: 16,
    paddingBottom: 48,
  },
  header: {
    marginBottom: 4,
  },
  eyebrow: {
    color: colors.primary,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: colors.text,
    marginTop: 2,
  },
  subtitle: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 4,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    gap: 14,
  },
  companyHero: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  companyIconBox: {
    width: 52,
    height: 52,
    borderRadius: 14,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroText: {
    flex: 1,
  },
  companyName: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.text,
  },
  companyId: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  infoList: {
    backgroundColor: '#f8fafc',
    padding: 12,
    borderRadius: 12,
    gap: 8,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  infoLabel: {
    fontSize: 13,
    color: colors.textSecondary,
    fontWeight: '500',
    width: 50,
  },
  infoValue: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.text,
    flex: 1,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.text,
  },
  planBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    padding: 12,
    borderRadius: 12,
  },
  planName: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.text,
  },
  planLimit: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  upgradeBtn: {
    backgroundColor: colors.primary,
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 8,
  },
  upgradeBtnText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '700',
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
    borderColor: '#e2e8f0',
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

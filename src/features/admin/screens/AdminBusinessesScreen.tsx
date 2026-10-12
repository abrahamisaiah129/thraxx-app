import React, { useState, useMemo } from 'react';
import {
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  Alert,
} from 'react-native';
import {
  Buildings,
  CaretRight,
  CheckCircle,
  MagnifyingGlass,
  X,
  ShieldCheck,
  EnvelopeSimple,
  Phone,
  Crown,
} from 'phosphor-react-native';
import { Screen } from '@/components/Screen';
import { colors, spacing } from '@/theme/tokens';
import { fleetManagerData } from '@/data/fleetManagerData';

interface BusinessItem {
  id: string;
  name: string;
  status: 'Active' | 'Review' | 'Suspended';
  plan: 'Freemium' | 'Growth' | 'Enterprise';
  email: string;
  phone: string;
  ridersCount: number;
  location: string;
}

const initialBusinesses: BusinessItem[] = [
  {
    id: '1',
    name: fleetManagerData.Company.legalName,
    status: 'Active',
    plan: 'Growth',
    email: fleetManagerData.Company.emailAddress,
    phone: fleetManagerData.Company.phoneNumber,
    ridersCount: 5,
    location: 'Lagos, Nigeria',
  },
  {
    id: '2',
    name: 'SwiftDrop Logistics Nigeria',
    status: 'Review',
    plan: 'Freemium',
    email: 'ops@swiftdrop.ng',
    phone: '+234 802 333 4444',
    ridersCount: 3,
    location: 'Abuja, Nigeria',
  },
  {
    id: '3',
    name: 'PrimeExpress Courier Co.',
    status: 'Review',
    plan: 'Growth',
    email: 'admin@primeexpress.ng',
    phone: '+234 803 777 8888',
    ridersCount: 12,
    location: 'Port Harcourt, Nigeria',
  },
  {
    id: '4',
    name: 'MetroExpress Delivery Ltd',
    status: 'Active',
    plan: 'Enterprise',
    email: 'support@metroexpress.com',
    phone: '+234 805 999 0000',
    ridersCount: 45,
    location: 'Ibadan, Nigeria',
  },
];

export function AdminBusinessesScreen() {
  const [businesses, setBusinesses] = useState<BusinessItem[]>(initialBusinesses);
  const [search, setSearch] = useState('');
  const [selectedPlan, setSelectedPlan] = useState<'All' | 'Freemium' | 'Growth' | 'Enterprise'>('All');
  const [activeBusiness, setActiveBusiness] = useState<BusinessItem | null>(null);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return businesses.filter((b) => {
      const matchSearch =
        !q ||
        b.name.toLowerCase().includes(q) ||
        b.email.toLowerCase().includes(q) ||
        b.location.toLowerCase().includes(q);
      const matchPlan = selectedPlan === 'All' || b.plan === selectedPlan;
      return matchSearch && matchPlan;
    });
  }, [businesses, search, selectedPlan]);

  const handleApprove = (id: string) => {
    setBusinesses((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: 'Active' } : b)),
    );
    if (activeBusiness && activeBusiness.id === id) {
      setActiveBusiness((prev) => (prev ? { ...prev, status: 'Active' } : prev));
    }
    Alert.alert('Business Activated', 'Business KYC and dispatch capabilities approved.');
  };

  const handleSuspend = (id: string) => {
    setBusinesses((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: 'Suspended' } : b)),
    );
    if (activeBusiness && activeBusiness.id === id) {
      setActiveBusiness((prev) => (prev ? { ...prev, status: 'Suspended' } : prev));
    }
    Alert.alert('Business Suspended', 'Business operations paused.');
  };

  return (
    <Screen>
      <View style={styles.header}>
        <Text style={styles.eyebrow}>FLEET PARTNERS</Text>
        <Text style={styles.title}>Businesses</Text>
        <Text style={styles.subtitle}>{businesses.length} registered logistics operators</Text>
      </View>

      {/* Search Input */}
      <View style={styles.searchBar}>
        <MagnifyingGlass size={18} color={colors.textSecondary} />
        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder="Search by company, email, location..."
          placeholderTextColor={colors.textSecondary}
          style={styles.searchInput}
        />
      </View>

      {/* Filter Chips */}
      <View style={styles.planFilterRow}>
        {(['All', 'Freemium', 'Growth', 'Enterprise'] as const).map((plan) => (
          <Pressable
            key={plan}
            onPress={() => setSelectedPlan(plan)}
            style={[styles.planChip, selectedPlan === plan && styles.planChipActive]}
          >
            <Text style={[styles.planChipText, selectedPlan === plan && styles.planChipTextActive]}>
              {plan}
            </Text>
          </Pressable>
        ))}
      </View>

      {/* Businesses List */}
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => setActiveBusiness(item)}
            style={({ pressed }) => [styles.row, pressed && styles.rowPressed]}
            accessibilityRole="button"
            accessibilityLabel={`Business ${item.name}`}
          >
            <View style={styles.businessIconBox}>
              <Buildings size={22} color={colors.primary} />
            </View>

            <View style={styles.rowText}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.meta}>
                {item.plan} • {item.ridersCount} riders • {item.location}
              </Text>
            </View>

            <View
              style={[
                styles.statusBadge,
                item.status === 'Active' && styles.statusActive,
                item.status === 'Review' && styles.statusReview,
                item.status === 'Suspended' && styles.statusSuspended,
              ]}
            >
              <Text
                style={[
                  styles.statusText,
                  item.status === 'Active' && styles.textActive,
                  item.status === 'Review' && styles.textReview,
                  item.status === 'Suspended' && styles.textSuspended,
                ]}
              >
                {item.status}
              </Text>
            </View>

            <CaretRight size={18} color={colors.textSecondary} />
          </Pressable>
        )}
      />

      {/* Business Details Modal */}
      {activeBusiness && (
        <Modal
          visible={!!activeBusiness}
          animationType="slide"
          transparent
          onRequestClose={() => setActiveBusiness(null)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <View>
                  <Text style={styles.modalEyebrow}>COMPANY PROFILE</Text>
                  <Text style={styles.modalTitle}>{activeBusiness.name}</Text>
                </View>
                <Pressable onPress={() => setActiveBusiness(null)} style={styles.closeBtn}>
                  <X size={20} color={colors.text} />
                </Pressable>
              </View>

              <View style={styles.modalInfoGrid}>
                <View style={styles.infoRow}>
                  <Crown size={18} color={colors.primary} />
                  <Text style={styles.infoLabel}>Subscription Plan:</Text>
                  <Text style={styles.infoValue}>{activeBusiness.plan}</Text>
                </View>

                <View style={styles.infoRow}>
                  <EnvelopeSimple size={18} color={colors.textSecondary} />
                  <Text style={styles.infoLabel}>Email:</Text>
                  <Text style={styles.infoValue}>{activeBusiness.email}</Text>
                </View>

                <View style={styles.infoRow}>
                  <Phone size={18} color={colors.textSecondary} />
                  <Text style={styles.infoLabel}>Phone:</Text>
                  <Text style={styles.infoValue}>{activeBusiness.phone}</Text>
                </View>

                <View style={styles.infoRow}>
                  <ShieldCheck size={18} color={colors.textSecondary} />
                  <Text style={styles.infoLabel}>Rider Fleet:</Text>
                  <Text style={styles.infoValue}>{activeBusiness.ridersCount} assigned riders</Text>
                </View>
              </View>

              {/* Action Buttons */}
              <View style={styles.modalActions}>
                {activeBusiness.status !== 'Active' && (
                  <Pressable
                    onPress={() => handleApprove(activeBusiness.id)}
                    style={styles.approveBtn}
                  >
                    <CheckCircle size={18} color="#ffffff" weight="bold" />
                    <Text style={styles.approveBtnText}>Approve & Activate</Text>
                  </Pressable>
                )}

                {activeBusiness.status !== 'Suspended' && (
                  <Pressable
                    onPress={() => handleSuspend(activeBusiness.id)}
                    style={styles.suspendBtn}
                  >
                    <Text style={styles.suspendBtnText}>Suspend Fleet Access</Text>
                  </Pressable>
                )}
              </View>
            </View>
          </View>
        </Modal>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    marginBottom: spacing.sm,
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
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 12,
    borderRadius: 10,
    height: 44,
    marginTop: spacing.sm,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: colors.text,
  },
  planFilterRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: spacing.sm,
    marginBottom: spacing.xs,
  },
  planChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#f1f5f9',
  },
  planChipActive: {
    backgroundColor: colors.primary,
  },
  planChipText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  planChipTextActive: {
    color: '#ffffff',
  },
  list: {
    gap: spacing.sm,
    paddingTop: spacing.md,
    paddingBottom: spacing.xl,
  },
  row: {
    padding: spacing.md,
    borderRadius: 14,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  rowPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.995 }],
  },
  businessIconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowText: {
    flex: 1,
  },
  name: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '800',
  },
  meta: {
    color: colors.textSecondary,
    fontSize: 12,
    marginTop: 2,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusActive: {
    backgroundColor: '#f0fdf4',
  },
  statusReview: {
    backgroundColor: '#fef3c7',
  },
  statusSuspended: {
    backgroundColor: '#fee2e2',
  },
  statusText: {
    fontSize: 11,
    fontWeight: '700',
  },
  textActive: {
    color: '#16a34a',
  },
  textReview: {
    color: '#d97706',
  },
  textSuspended: {
    color: '#dc2626',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    gap: 16,
    paddingBottom: 36,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  modalEyebrow: {
    fontSize: 11,
    fontWeight: '800',
    color: colors.primary,
    letterSpacing: 0.8,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.text,
    marginTop: 2,
  },
  closeBtn: {
    padding: 6,
    borderRadius: 20,
    backgroundColor: '#f1f5f9',
  },
  modalInfoGrid: {
    backgroundColor: '#f8fafc',
    padding: 16,
    borderRadius: 14,
    gap: 12,
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
    width: 120,
  },
  infoValue: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.text,
    flex: 1,
  },
  modalActions: {
    gap: 10,
    marginTop: 8,
  },
  approveBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#16a34a',
    paddingVertical: 14,
    borderRadius: 12,
  },
  approveBtnText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '700',
  },
  suspendBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fee2e2',
    paddingVertical: 12,
    borderRadius: 12,
  },
  suspendBtnText: {
    color: '#dc2626',
    fontSize: 14,
    fontWeight: '700',
  },
});

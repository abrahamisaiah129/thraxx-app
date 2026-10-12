import React, { useState, useMemo } from 'react';
import {
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
  Alert,
} from 'react-native';
import {
  CaretRight,
  Package,
  CheckCircle,
  ClockCounterClockwise,
  MapPin,
  X,
  NavigationArrow,
} from 'phosphor-react-native';
import { router } from 'expo-router';
import { Screen } from '@/components/Screen';
import { StatePanel } from '@/components/StatePanel';
import { colors, spacing } from '@/theme/tokens';
import { fleetManagerData, Assignment } from '@/data/fleetManagerData';

type FilterType = 'All' | 'Active' | 'Completed';

export function RiderJobsScreen() {
  const [filter, setFilter] = useState<FilterType>('All');
  const [selectedJob, setSelectedJob] = useState<Assignment | null>(null);

  const jobs = useMemo(() => {
    return fleetManagerData.Assignments.filter((a) => {
      if (filter === 'Active') return a.deliveryStatus === 'in_progress' || a.deliveryStatus === 'pending';
      if (filter === 'Completed') return a.deliveryStatus === 'completed';
      return true;
    });
  }, [filter]);

  const handleSelectJob = (job: Assignment) => {
    setSelectedJob(job);
  };

  return (
    <Screen>
      <View style={styles.header}>
        <Text style={styles.eyebrow}>ASSIGNED DELIVERIES</Text>
        <Text style={styles.title}>My Jobs</Text>
        <Text style={styles.subtitle}>Track today&apos;s assignments and route schedule</Text>
      </View>

      {/* Filter Tabs */}
      <View style={styles.filterRow}>
        {(['All', 'Active', 'Completed'] as const).map((tab) => (
          <Pressable
            key={tab}
            onPress={() => setFilter(tab)}
            style={[styles.filterTab, filter === tab && styles.filterTabActive]}
          >
            <Text style={[styles.filterTabText, filter === tab && styles.filterTabTextActive]}>
              {tab}
            </Text>
          </Pressable>
        ))}
      </View>

      <FlatList
        data={jobs}
        keyExtractor={(item) => item.assignmentId}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          const isCompleted = item.deliveryStatus === 'completed';
          return (
            <Pressable
              onPress={() => handleSelectJob(item)}
              style={({ pressed }) => [styles.row, pressed && styles.rowPressed]}
              accessibilityRole="button"
              accessibilityLabel={`Job ${item.waybillTrackingNumber}`}
            >
              <View style={styles.icon}>
                <Package size={22} color={colors.primary} />
              </View>
              <View style={styles.rowText}>
                <View style={styles.rowTop}>
                  <Text style={styles.reference}>{item.waybillTrackingNumber}</Text>
                  <View
                    style={[
                      styles.statusPill,
                      isCompleted ? styles.statusPillCompleted : styles.statusPillActive,
                    ]}
                  >
                    {isCompleted ? (
                      <CheckCircle size={12} color="#16a34a" weight="fill" />
                    ) : (
                      <ClockCounterClockwise size={12} color={colors.primary} weight="fill" />
                    )}
                    <Text
                      style={[
                        styles.statusText,
                        isCompleted ? styles.statusTextCompleted : styles.statusTextActive,
                      ]}
                    >
                      {isCompleted ? 'Completed' : 'In Progress'}
                    </Text>
                  </View>
                </View>
                <Text style={styles.destination} numberOfLines={1}>
                  {item.pickupAddress} → {item.deliveryAddress}
                </Text>
                <Text style={styles.customerName}>Recipient: {item.customerName}</Text>
              </View>
              <CaretRight size={20} color={colors.textSecondary} />
            </Pressable>
          );
        }}
        ListEmptyComponent={
          <StatePanel
            title="No jobs found"
            message="Deliveries assigned to you will appear here."
          />
        }
      />

      {/* Single Job Modal / Bottom View */}
      {selectedJob && (
        <Modal
          visible={!!selectedJob}
          animationType="slide"
          transparent
          onRequestClose={() => setSelectedJob(null)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <View>
                  <Text style={styles.modalEyebrow}>WAYBILL DETAILS</Text>
                  <Text style={styles.modalTitle}>{selectedJob.waybillTrackingNumber}</Text>
                </View>
                <Pressable onPress={() => setSelectedJob(null)} style={styles.closeBtn}>
                  <X size={20} color={colors.text} />
                </Pressable>
              </View>

              <View style={styles.modalRoute}>
                <View style={styles.routePoint}>
                  <MapPin size={18} color={colors.info} weight="fill" />
                  <View style={styles.pointText}>
                    <Text style={styles.pointLabel}>Pickup</Text>
                    <Text style={styles.pointAddress}>{selectedJob.pickupAddress}</Text>
                  </View>
                </View>

                <View style={styles.routePoint}>
                  <MapPin size={18} color={colors.success} weight="fill" />
                  <View style={styles.pointText}>
                    <Text style={styles.pointLabel}>Delivery</Text>
                    <Text style={styles.pointAddress}>{selectedJob.deliveryAddress}</Text>
                  </View>
                </View>
              </View>

              <View style={styles.customerBox}>
                <Text style={styles.customerBoxLabel}>CUSTOMER</Text>
                <Text style={styles.customerBoxName}>{selectedJob.customerName}</Text>
                <Text style={styles.customerBoxPhone}>{selectedJob.customerPhone || 'N/A'}</Text>
              </View>

              <View style={styles.modalActions}>
                <Pressable
                  onPress={() => {
                    setSelectedJob(null);
                    router.push('/rider');
                  }}
                  style={styles.openTripBtn}
                >
                  <NavigationArrow size={18} color="#ffffff" weight="fill" />
                  <Text style={styles.openTripText}>View in Active Mode</Text>
                </Pressable>
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
  filterRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: spacing.sm,
    marginBottom: spacing.xs,
  },
  filterTab: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    backgroundColor: '#f1f5f9',
  },
  filterTabActive: {
    backgroundColor: colors.primary,
  },
  filterTabText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  filterTabTextActive: {
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
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  rowPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.995 }],
  },
  icon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primaryLight,
  },
  rowText: {
    flex: 1,
    gap: 4,
  },
  rowTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  reference: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '800',
  },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
  },
  statusPillActive: {
    backgroundColor: colors.primaryLight,
  },
  statusPillCompleted: {
    backgroundColor: '#f0fdf4',
  },
  statusText: {
    fontSize: 11,
    fontWeight: '700',
  },
  statusTextActive: {
    color: colors.primary,
  },
  statusTextCompleted: {
    color: '#16a34a',
  },
  destination: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '600',
  },
  customerName: {
    color: colors.textSecondary,
    fontSize: 12,
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
    fontSize: 22,
    fontWeight: '800',
    color: colors.text,
    marginTop: 2,
  },
  closeBtn: {
    padding: 6,
    borderRadius: 20,
    backgroundColor: '#f1f5f9',
  },
  modalRoute: {
    backgroundColor: '#f8fafc',
    padding: 14,
    borderRadius: 14,
    gap: 12,
  },
  routePoint: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  pointText: {
    flex: 1,
  },
  pointLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.textSecondary,
    letterSpacing: 0.6,
  },
  pointAddress: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginTop: 2,
  },
  customerBox: {
    padding: 14,
    backgroundColor: '#f8fafc',
    borderRadius: 14,
    gap: 2,
  },
  customerBoxLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.textSecondary,
  },
  customerBoxName: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.text,
  },
  customerBoxPhone: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 2,
  },
  modalActions: {
    marginTop: 8,
  },
  openTripBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 12,
  },
  openTripText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '700',
  },
});

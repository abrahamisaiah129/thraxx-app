import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, FlatList, Pressable, TextInput } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import {
  MapPin,
  Package,
  Clock,
  CheckCircle,
  ClockCounterClockwise,
  CaretRight,
  MagnifyingGlass,
  Plus,
  User,
} from 'phosphor-react-native';
import { fleetManagerData, Assignment, DeliveryStatus } from '@/data/fleetManagerData';
import { colors, spacing } from '@/theme/tokens';

type Filter = 'All' | DeliveryStatus;

const filterOptions: Filter[] = ['All', 'in_progress', 'completed', 'pending', 'failed'];

const filterLabels: Record<Filter, string> = {
  All: 'All',
  in_progress: 'In Progress',
  completed: 'Completed',
  pending: 'Pending',
  failed: 'Failed',
  cancelled: 'Cancelled',
};

export default function AssignmentsScreen() {
  const insets = useSafeAreaInsets();
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState<Filter>('All');

  const filteredAssignments = useMemo(() => {
    const q = search.trim().toLowerCase();
    return fleetManagerData.Assignments.filter((a) => {
      const matchesSearch =
        !q ||
        a.waybillTrackingNumber.toLowerCase().includes(q) ||
        a.customerName.toLowerCase().includes(q) ||
        a.pickupAddress.toLowerCase().includes(q) ||
        a.deliveryAddress.toLowerCase().includes(q) ||
        a.assignedRiderId.toLowerCase().includes(q);

      const matchesFilter = activeFilter === 'All' || a.deliveryStatus === activeFilter;
      return matchesSearch && matchesFilter;
    });
  }, [search, activeFilter]);

  const renderItem = ({ item }: { item: Assignment }) => {
    const isCompleted = item.deliveryStatus === 'completed';
    const isProgress = item.deliveryStatus === 'in_progress';
    const isPending = item.deliveryStatus === 'pending';
    const isFailed = item.deliveryStatus === 'failed';

    const rider = fleetManagerData.riders.find((r) => r.id === item.assignedRiderId);

    return (
      <Pressable
        onPress={() => router.push(`/fleet_manager/assignment/${item.assignmentId}` as any)}
        style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
        accessibilityRole="button"
        accessibilityLabel={`Assignment ${item.waybillTrackingNumber}`}
      >
        <View style={styles.cardHeader}>
          <View style={styles.trackingBadge}>
            <Text style={styles.trackingText}>{item.waybillTrackingNumber}</Text>
          </View>
          <View
            style={[
              styles.statusBadge,
              isCompleted && styles.statusCompleted,
              isProgress && styles.statusProgress,
              isPending && styles.statusPending,
              isFailed && styles.statusFailed,
            ]}
          >
            {isCompleted ? (
              <CheckCircle size={14} color="#16a34a" weight="fill" />
            ) : (
              <ClockCounterClockwise size={14} color={colors.primary} weight="fill" />
            )}
            <Text
              style={[
                styles.statusText,
                isCompleted && styles.statusTextCompleted,
                isProgress && styles.statusTextProgress,
                isPending && styles.statusTextPending,
                isFailed && styles.statusTextFailed,
              ]}
            >
              {filterLabels[item.deliveryStatus] || item.deliveryStatus}
            </Text>
          </View>
        </View>

        <View style={styles.routeContainer}>
          <View style={styles.routePoint}>
            <View style={styles.dotContainer}>
              <View style={styles.dotStart} />
              <View style={styles.line} />
            </View>
            <View style={styles.routeInfo}>
              <Text style={styles.routeLabel}>PICKUP</Text>
              <Text style={styles.routeAddress} numberOfLines={1}>
                {item.pickupAddress}
              </Text>
            </View>
          </View>

          <View style={styles.routePoint}>
            <View style={styles.dotContainer}>
              <MapPin size={16} color={colors.primary} weight="fill" />
            </View>
            <View style={styles.routeInfo}>
              <Text style={styles.routeLabel}>DELIVERY</Text>
              <Text style={styles.routeAddress} numberOfLines={1}>
                {item.deliveryAddress}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.footer}>
          <View style={styles.footerItem}>
            <Package size={16} color={colors.textSecondary} />
            <Text style={styles.footerText}>2.0 kg</Text>
          </View>
          <View style={styles.footerItem}>
            <Clock size={16} color={colors.textSecondary} />
            <Text style={styles.footerText}>
              {new Date(item.createdAtTimestamp).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </Text>
          </View>
          <View style={styles.customerItem}>
            <Text style={styles.customerText} numberOfLines={1}>
              {item.customerName}
            </Text>
          </View>
        </View>

        <View style={styles.riderBanner}>
          <Pressable
            onPress={(e) => {
              e.stopPropagation();
              if (rider) router.push(`/fleet_manager/rider/${rider.id}` as any);
            }}
            style={styles.riderBannerLeft}
          >
            <User size={15} color={colors.primary} weight="bold" />
            <Text style={styles.riderName}>
              {rider ? rider.name : item.assignedRiderId} ({item.assignedVehicleId})
            </Text>
          </Pressable>
          <CaretRight size={16} color={colors.textSecondary} />
        </View>
      </Pressable>
    );
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <View style={styles.headerTitleRow}>
          <View>
            <Text style={styles.title}>Live Assignments</Text>
            <Text style={styles.subtitle}>
              {filteredAssignments.length} of {fleetManagerData.Assignments.length} tasks
            </Text>
          </View>
          <Pressable
            onPress={() => router.push('/fleet_manager/booking')}
            style={styles.newBookingBtn}
            accessibilityRole="button"
            accessibilityLabel="New Booking"
          >
            <Plus size={18} color="#ffffff" weight="bold" />
            <Text style={styles.newBookingText}>New</Text>
          </Pressable>
        </View>

        {/* Search bar */}
        <View style={styles.searchBar}>
          <MagnifyingGlass size={18} color={colors.textSecondary} />
          <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder="Search by tracking, address, rider..."
            placeholderTextColor={colors.textSecondary}
            style={styles.searchInput}
          />
        </View>

        {/* Status filters */}
        <FlatList
          data={filterOptions}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item}
          contentContainerStyle={styles.filterList}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => setActiveFilter(item)}
              style={[styles.filterChip, activeFilter === item && styles.filterChipActive]}
            >
              <Text
                style={[
                  styles.filterChipText,
                  activeFilter === item && styles.filterChipTextActive,
                ]}
              >
                {filterLabels[item]}
              </Text>
            </Pressable>
          )}
        />
      </View>

      <FlatList
        data={filteredAssignments}
        keyExtractor={(item) => item.assignmentId}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyTitle}>No assignments found</Text>
            <Text style={styles.emptySubtitle}>Try adjusting your search or status filter.</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    paddingHorizontal: 16,
    paddingBottom: 8,
    paddingTop: 8,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
    gap: 12,
  },
  headerTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.text,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 13,
    color: colors.textSecondary,
    fontWeight: '500',
    marginTop: 2,
  },
  newBookingBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.primary,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
  },
  newBookingText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 13,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 12,
    borderRadius: 10,
    height: 42,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: colors.text,
  },
  filterList: {
    gap: 8,
    paddingVertical: 4,
  },
  filterChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#f3f4f6',
  },
  filterChipActive: {
    backgroundColor: colors.primary,
  },
  filterChipText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  filterChipTextActive: {
    color: '#ffffff',
  },
  listContent: {
    padding: 16,
    gap: 14,
    paddingBottom: 40,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,
  },
  cardPressed: {
    opacity: 0.92,
    transform: [{ scale: 0.995 }],
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  trackingBadge: {
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  trackingText: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.text,
    letterSpacing: 0.5,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 99,
  },
  statusProgress: {
    backgroundColor: colors.primaryLight,
  },
  statusCompleted: {
    backgroundColor: '#f0fdf4',
  },
  statusPending: {
    backgroundColor: '#fef3c7',
  },
  statusFailed: {
    backgroundColor: '#fee2e2',
  },
  statusText: {
    fontSize: 11,
    fontWeight: '700',
  },
  statusTextProgress: {
    color: colors.primary,
  },
  statusTextCompleted: {
    color: '#16a34a',
  },
  statusTextPending: {
    color: '#d97706',
  },
  statusTextFailed: {
    color: '#dc2626',
  },
  routeContainer: {
    padding: 14,
  },
  routePoint: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  dotContainer: {
    alignItems: 'center',
    width: 16,
  },
  dotStart: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.textSecondary,
    marginTop: 4,
  },
  line: {
    width: 2,
    height: 24,
    backgroundColor: '#e5e7eb',
    marginVertical: 4,
  },
  routeInfo: {
    flex: 1,
  },
  routeLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.textSecondary,
    letterSpacing: 0.8,
  },
  routeAddress: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginTop: 2,
  },
  footer: {
    flexDirection: 'row',
    paddingHorizontal: 14,
    paddingBottom: 14,
    gap: 16,
    alignItems: 'center',
  },
  footerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  footerText: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  customerItem: {
    flex: 1,
    alignItems: 'flex-end',
  },
  customerText: {
    fontSize: 12,
    color: colors.text,
    fontWeight: '600',
  },
  riderBanner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    padding: 10,
    paddingHorizontal: 14,
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
  },
  riderBannerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  riderName: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.primary,
  },
  emptyContainer: {
    padding: 32,
    alignItems: 'center',
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  emptySubtitle: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 4,
  },
});

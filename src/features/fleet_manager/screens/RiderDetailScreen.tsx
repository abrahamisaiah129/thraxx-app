import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Linking,
  Alert,
  Share,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import {
  CaretLeft,
  ShareNetwork,
  Phone,
  ChatCircleText,
  Star,
  CheckCircle,
  ClockCounterClockwise,
  Motorcycle,
  NavigationArrow,
  MapPin,
  WarningCircle,
  CaretRight,
  ShieldCheck,
  Package,
} from 'phosphor-react-native';
import { fleetManagerData } from '@/data/fleetManagerData';
import { colors, spacing } from '@/theme/tokens';
import { getRiderDeepLink } from '@/services/deepLinking';

export default function RiderDetailScreen() {
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id: string }>();

  const rider = fleetManagerData.riders.find(
    (r) => r.id === id || r.riderCode.toLowerCase() === (id || '').toLowerCase(),
  );

  const [status, setStatus] = useState(rider?.status || 'available');

  if (!rider) {
    return (
      <View style={[styles.container, styles.center, { paddingTop: insets.top }]}>
        <WarningCircle size={48} color={colors.danger} />
        <Text style={styles.notFoundTitle}>Driver Not Found</Text>
        <Text style={styles.notFoundSub}>No rider found with ID &quot;{id}&quot;.</Text>
        <Pressable onPress={() => router.back()} style={styles.backButtonLarge}>
          <Text style={styles.backButtonText}>Return to Riders</Text>
        </Pressable>
      </View>
    );
  }

  // Find vehicle assigned to this rider
  const vehicle = fleetManagerData.activeVehicles.find((v) => v.currentRiderId === rider.id);

  // Find assignments for this rider
  const riderAssignments = fleetManagerData.Assignments.filter(
    (a) => a.assignedRiderId === rider.id,
  );

  const handleCall = () => {
    Linking.openURL(`tel:${rider.phone}`).catch(() => {
      Alert.alert('Unable to dial', `Phone: ${rider.phone}`);
    });
  };

  const handleSms = () => {
    Linking.openURL(`sms:${rider.phone}`).catch(() => {
      Alert.alert('Unable to open SMS', `Phone: ${rider.phone}`);
    });
  };

  const handleShare = async () => {
    const deepLink = getRiderDeepLink(rider.id);
    try {
      await Share.share({
        title: `Driver ${rider.name}`,
        message: `View driver ${rider.name} (${rider.riderCode}) on Traxx: ${deepLink}`,
        url: deepLink,
      });
    } catch {
      // Fallback
    }
  };

  const handleToggleStatus = (newStatus: 'available' | 'assigned' | 'offline') => {
    setStatus(newStatus);
    Alert.alert('Status Updated', `${rider.name} is now marked as ${newStatus.toUpperCase()}`);
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Top Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.headerIconBtn} accessibilityLabel="Back">
          <CaretLeft size={24} color={colors.text} />
        </Pressable>
        <Text style={styles.headerTitle}>Driver Details</Text>
        <Pressable onPress={handleShare} style={styles.headerIconBtn} accessibilityLabel="Share Profile">
          <ShareNetwork size={22} color={colors.primary} />
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Driver Hero Card */}
        <View style={styles.card}>
          <View style={styles.heroRow}>
            <View style={styles.avatarLarge}>
              <Text style={styles.avatarLargeText}>{rider.name.charAt(0)}</Text>
            </View>
            <View style={styles.heroInfo}>
              <Text style={styles.driverName}>{rider.name}</Text>
              <Text style={styles.driverCode}>{rider.riderCode}</Text>
              <View style={styles.ratingRow}>
                <Star size={16} color="#d97706" weight="fill" />
                <Text style={styles.ratingText}>{rider.rating} rating</Text>
                <Text style={styles.ratingDivider}>•</Text>
                <Text style={styles.deliveriesCount}>{rider.completedDeliveries} completed</Text>
              </View>
            </View>
          </View>

          {/* Quick Contact Buttons */}
          <View style={styles.actionButtonsRow}>
            <Pressable onPress={handleCall} style={[styles.actionBtn, styles.callBtn]}>
              <Phone size={18} color="#ffffff" weight="fill" />
              <Text style={styles.actionBtnTextWhite}>Call Driver</Text>
            </Pressable>
            <Pressable onPress={handleSms} style={[styles.actionBtn, styles.smsBtn]}>
              <ChatCircleText size={18} color={colors.primary} weight="fill" />
              <Text style={styles.actionBtnTextPrimary}>Message</Text>
            </Pressable>
            <Pressable
              onPress={() => router.push('/fleet_manager/map')}
              style={[styles.actionBtn, styles.mapBtn]}
            >
              <NavigationArrow size={18} color={colors.text} weight="fill" />
              <Text style={styles.actionBtnTextDark}>Live GPS</Text>
            </Pressable>
          </View>

          {/* Status Selector */}
          <View style={styles.statusSelectorContainer}>
            <Text style={styles.sectionLabel}>DUTY STATUS</Text>
            <View style={styles.statusPillsRow}>
              {(['available', 'assigned', 'offline'] as const).map((st) => (
                <Pressable
                  key={st}
                  onPress={() => handleToggleStatus(st)}
                  style={[styles.statusPill, status === st && styles.statusPillActive]}
                >
                  <Text style={[styles.statusPillText, status === st && styles.statusPillTextActive]}>
                    {st.charAt(0).toUpperCase() + st.slice(1)}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>
        </View>

        {/* Assigned Vehicle & Telemetry */}
        {vehicle && (
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Assigned Vehicle & Telemetry</Text>
              <View style={styles.verifiedBadge}>
                <ShieldCheck size={14} color="#16a34a" weight="fill" />
                <Text style={styles.verifiedText}>Active</Text>
              </View>
            </View>

            <View style={styles.vehicleGrid}>
              <View style={styles.vehicleItem}>
                <Motorcycle size={22} color={colors.primary} />
                <View>
                  <Text style={styles.itemLabel}>Vehicle Plate</Text>
                  <Text style={styles.itemValue}>{vehicle.licensePlateNumber}</Text>
                </View>
              </View>

              <View style={styles.vehicleItem}>
                <View style={styles.telemetryDot} />
                <View>
                  <Text style={styles.itemLabel}>Telemetry Status</Text>
                  <Text style={styles.itemValue}>{vehicle.telemetryStatus.toUpperCase()}</Text>
                </View>
              </View>

              <View style={styles.vehicleItem}>
                <NavigationArrow size={20} color={colors.textSecondary} />
                <View>
                  <Text style={styles.itemLabel}>Current Speed</Text>
                  <Text style={styles.itemValue}>{vehicle.currentSpeedKph} km/h</Text>
                </View>
              </View>

              <View style={styles.vehicleItem}>
                <MapPin size={20} color={colors.textSecondary} />
                <View>
                  <Text style={styles.itemLabel}>GPS Position</Text>
                  <Text style={styles.itemValue}>
                    {vehicle.gpsCoordinates.latitude.toFixed(3)}, {vehicle.gpsCoordinates.longitude.toFixed(3)}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        )}

        {/* Performance Metrics */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Performance Overview</Text>
          <View style={styles.metricsRow}>
            <View style={styles.metricBox}>
              <Text style={styles.metricBig}>98.4%</Text>
              <Text style={styles.metricLabel}>On-Time Rate</Text>
            </View>
            <View style={styles.metricDivider} />
            <View style={styles.metricBox}>
              <Text style={styles.metricBig}>96.2%</Text>
              <Text style={styles.metricLabel}>Acceptance Rate</Text>
            </View>
            <View style={styles.metricDivider} />
            <View style={styles.metricBox}>
              <Text style={styles.metricBig}>4.8</Text>
              <Text style={styles.metricLabel}>Average Rating</Text>
            </View>
          </View>
        </View>

        {/* Assigned Deliveries */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Deliveries ({riderAssignments.length})</Text>
            <Text style={styles.cardSubtitle}>Tap to view details</Text>
          </View>

          {riderAssignments.length === 0 ? (
            <Text style={styles.emptyNotice}>No current assignments assigned to this driver.</Text>
          ) : (
            <View style={styles.assignmentsList}>
              {riderAssignments.map((item) => {
                const isCompleted = item.deliveryStatus === 'completed';
                return (
                  <Pressable
                    key={item.assignmentId}
                    onPress={() => router.push(`/fleet_manager/assignment/${item.assignmentId}` as any)}
                    style={styles.assignmentRow}
                  >
                    <View style={styles.assignmentIconBox}>
                      <Package size={20} color={colors.primary} />
                    </View>
                    <View style={styles.assignmentInfo}>
                      <View style={styles.assignmentTop}>
                        <Text style={styles.waybillText}>{item.waybillTrackingNumber}</Text>
                        <View
                          style={[
                            styles.statusMiniBadge,
                            isCompleted ? styles.statusMiniCompleted : styles.statusMiniProgress,
                          ]}
                        >
                          <Text
                            style={[
                              styles.statusMiniText,
                              isCompleted ? styles.textCompleted : styles.textProgress,
                            ]}
                          >
                            {isCompleted ? 'Completed' : 'In Progress'}
                          </Text>
                        </View>
                      </View>
                      <Text style={styles.routeSummary} numberOfLines={1}>
                        {item.pickupAddress} → {item.deliveryAddress}
                      </Text>
                    </View>
                    <CaretRight size={18} color={colors.textSecondary} />
                  </Pressable>
                );
              })}
            </View>
          )}
        </View>

        {/* Shift Details */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Shift Information</Text>
          <View style={styles.shiftRow}>
            <Text style={styles.shiftLabel}>Today&apos;s Clock In:</Text>
            <Text style={styles.shiftValue}>08:15 AM</Text>
          </View>
          <View style={styles.shiftRow}>
            <Text style={styles.shiftLabel}>Shift Duration:</Text>
            <Text style={styles.shiftValue}>6 hrs 45 mins</Text>
          </View>
          <View style={styles.shiftRow}>
            <Text style={styles.shiftLabel}>Sign-off Status:</Text>
            <Text style={[styles.shiftValue, { color: '#16a34a' }]}>Approved & Active</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  notFoundTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.text,
    marginTop: 16,
  },
  notFoundSub: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 24,
  },
  backButtonLarge: {
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
  },
  backButtonText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 14,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  headerIconBtn: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  scrollContent: {
    padding: 16,
    gap: 16,
    paddingBottom: 48,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 1,
  },
  heroRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  avatarLarge: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarLargeText: {
    fontSize: 26,
    fontWeight: '800',
    color: colors.primary,
  },
  heroInfo: {
    flex: 1,
  },
  driverName: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.text,
  },
  driverCode: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textSecondary,
    marginTop: 2,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 6,
  },
  ratingText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#d97706',
  },
  ratingDivider: {
    color: colors.textSecondary,
  },
  deliveriesCount: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  actionButtonsRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 16,
  },
  actionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 10,
    borderRadius: 10,
  },
  callBtn: {
    backgroundColor: colors.primary,
  },
  smsBtn: {
    backgroundColor: colors.primaryLight,
  },
  mapBtn: {
    backgroundColor: '#f3f4f6',
  },
  actionBtnTextWhite: {
    fontSize: 13,
    fontWeight: '700',
    color: '#ffffff',
  },
  actionBtnTextPrimary: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.primary,
  },
  actionBtnTextDark: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.text,
  },
  statusSelectorContainer: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
  },
  sectionLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.textSecondary,
    letterSpacing: 0.8,
    marginBottom: 8,
  },
  statusPillsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  statusPill: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
  },
  statusPillActive: {
    backgroundColor: colors.primary,
  },
  statusPillText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  statusPillTextActive: {
    color: '#ffffff',
    fontWeight: '700',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  cardSubtitle: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#f0fdf4',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  verifiedText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#16a34a',
  },
  vehicleGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  vehicleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    minWidth: '45%',
  },
  telemetryDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#16a34a',
  },
  itemLabel: {
    fontSize: 11,
    color: colors.textSecondary,
  },
  itemValue: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
    marginTop: 2,
  },
  metricsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: 8,
  },
  metricBox: {
    alignItems: 'center',
  },
  metricBig: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.text,
  },
  metricLabel: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 4,
  },
  metricDivider: {
    width: 1,
    height: 36,
    backgroundColor: '#e5e7eb',
  },
  emptyNotice: {
    fontSize: 13,
    color: colors.textSecondary,
    fontStyle: 'italic',
  },
  assignmentsList: {
    gap: 10,
  },
  assignmentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 12,
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  assignmentIconBox: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  assignmentInfo: {
    flex: 1,
  },
  assignmentTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  waybillText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
  },
  statusMiniBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  statusMiniCompleted: {
    backgroundColor: '#f0fdf4',
  },
  statusMiniProgress: {
    backgroundColor: colors.primaryLight,
  },
  statusMiniText: {
    fontSize: 10,
    fontWeight: '700',
  },
  textCompleted: {
    color: '#16a34a',
  },
  textProgress: {
    color: colors.primary,
  },
  routeSummary: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  shiftRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  shiftLabel: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  shiftValue: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.text,
  },
});

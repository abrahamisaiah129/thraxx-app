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
  Copy,
  CheckCircle,
  ClockCounterClockwise,
  Clock,
  MapPin,
  Package,
  Phone,
  ChatCircleText,
  User,
  WarningCircle,
  NavigationArrow,
  Motorcycle,
  ArrowSquareOut,
} from 'phosphor-react-native';
import { fleetManagerData, Assignment, Flag } from '@/data/fleetManagerData';
import { colors, spacing } from '@/theme/tokens';
import { getAssignmentDeepLink } from '@/services/deepLinking';

export default function AssignmentDetailScreen() {
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id: string }>();

  // Look up assignment by assignmentId or waybillTrackingNumber
  const initialAssignment = fleetManagerData.Assignments.find(
    (a) => a.assignmentId === id || a.waybillTrackingNumber.toLowerCase() === (id || '').toLowerCase(),
  );

  const [assignment, setAssignment] = useState<Assignment | undefined>(initialAssignment);
  const [copied, setCopied] = useState(false);
  const [flags, setFlags] = useState<Flag[]>(
    fleetManagerData.flags.filter((f) => f.assignmentId === (assignment?.assignmentId || id)),
  );

  if (!assignment) {
    return (
      <View style={[styles.container, styles.center, { paddingTop: insets.top }]}>
        <WarningCircle size={48} color={colors.danger} />
        <Text style={styles.notFoundTitle}>Assignment Not Found</Text>
        <Text style={styles.notFoundSub}>
          No delivery found with ID or tracking number &quot;{id}&quot;.
        </Text>
        <Pressable onPress={() => router.back()} style={styles.backButtonLarge}>
          <Text style={styles.backButtonText}>Return to Assignments</Text>
        </Pressable>
      </View>
    );
  }

  const assignedRider = fleetManagerData.riders.find(
    (r) => r.id === assignment.assignedRiderId,
  );
  const assignedVehicle = fleetManagerData.activeVehicles.find(
    (v) => v.vehicleId === assignment.assignedVehicleId,
  );

  const isCompleted = assignment.deliveryStatus === 'completed';
  const isInProgress = assignment.deliveryStatus === 'in_progress';
  const isPending = assignment.deliveryStatus === 'pending';
  const isFailed = assignment.deliveryStatus === 'failed';

  const handleCopyTracking = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShareDeepLink = async () => {
    const deepLink = getAssignmentDeepLink(assignment.assignmentId);
    try {
      await Share.share({
        title: `Delivery ${assignment.waybillTrackingNumber}`,
        message: `Track delivery ${assignment.waybillTrackingNumber} on Traxx: ${deepLink}`,
        url: deepLink,
      });
    } catch {
      // Fallback
    }
  };

  const handleCall = (phoneNumber?: string) => {
    if (!phoneNumber) return;
    Linking.openURL(`tel:${phoneNumber}`).catch(() => {
      Alert.alert('Unable to make call', `Phone: ${phoneNumber}`);
    });
  };

  const handleSms = (phoneNumber?: string) => {
    if (!phoneNumber) return;
    Linking.openURL(`sms:${phoneNumber}`).catch(() => {
      Alert.alert('Unable to open SMS', `Phone: ${phoneNumber}`);
    });
  };

  const handleMarkCompleted = () => {
    setAssignment((prev) =>
      prev ? { ...prev, deliveryStatus: 'completed', completedAtTimestamp: new Date().toISOString() } : prev,
    );
    Alert.alert('Status Updated', `Waybill ${assignment.waybillTrackingNumber} marked as Completed.`);
  };

  const handleResolveFlag = (flagId: string) => {
    setFlags((prev) => prev.filter((f) => f.flagId !== flagId));
    Alert.alert('Flag Resolved', 'The alert has been dismissed.');
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Top Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.headerIconBtn} accessibilityLabel="Back">
          <CaretLeft size={24} color={colors.text} />
        </Pressable>
        <Text style={styles.headerTitle}>Assignment Details</Text>
        <Pressable onPress={handleShareDeepLink} style={styles.headerIconBtn} accessibilityLabel="Share Link">
          <ShareNetwork size={22} color={colors.primary} />
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Tracking & Status Card */}
        <View style={styles.card}>
          <View style={styles.statusRow}>
            <View>
              <Text style={styles.cardSectionLabel}>WAYBILL TRACKING</Text>
              <Pressable onPress={handleCopyTracking} style={styles.trackingRow}>
                <Text style={styles.trackingNumber}>{assignment.waybillTrackingNumber}</Text>
                <View style={styles.copyPill}>
                  {copied ? (
                    <CheckCircle size={14} color="#16a34a" weight="fill" />
                  ) : (
                    <Copy size={14} color={colors.textSecondary} />
                  )}
                  <Text style={[styles.copyPillText, copied && styles.copyPillTextSuccess]}>
                    {copied ? 'Copied' : 'Copy'}
                  </Text>
                </View>
              </Pressable>
            </View>

            <View
              style={[
                styles.statusBadge,
                isCompleted && styles.badgeCompleted,
                isInProgress && styles.badgeProgress,
                isPending && styles.badgePending,
                isFailed && styles.badgeFailed,
              ]}
            >
              {isCompleted ? (
                <CheckCircle size={15} color="#16a34a" weight="fill" />
              ) : (
                <ClockCounterClockwise size={15} color={colors.primary} weight="fill" />
              )}
              <Text
                style={[
                  styles.statusBadgeText,
                  isCompleted && styles.statusTextCompleted,
                  isInProgress && styles.statusTextProgress,
                  isPending && styles.statusTextPending,
                  isFailed && styles.statusTextFailed,
                ]}
              >
                {assignment.deliveryStatus.toUpperCase().replace('_', ' ')}
              </Text>
            </View>
          </View>

          {/* Deep link badge */}
          <Pressable onPress={handleShareDeepLink} style={styles.deepLinkBanner}>
            <ArrowSquareOut size={14} color={colors.primary} />
            <Text style={styles.deepLinkBannerText}>Deep Link: {getAssignmentDeepLink(assignment.assignmentId)}</Text>
          </Pressable>
        </View>

        {/* Route Details Card */}
        <View style={styles.card}>
          <View style={styles.cardHeaderWithAction}>
            <Text style={styles.cardTitle}>Route & Waypoints</Text>
            <Pressable
              onPress={() => router.push('/fleet_manager/map')}
              style={styles.openMapBtn}
              accessibilityLabel="View on map"
            >
              <NavigationArrow size={14} color={colors.primary} weight="fill" />
              <Text style={styles.openMapText}>Live Map</Text>
            </Pressable>
          </View>

          <View style={styles.routeContainer}>
            <View style={styles.routePoint}>
              <View style={styles.dotContainer}>
                <View style={styles.dotPickup} />
                <View style={styles.timelineLine} />
              </View>
              <View style={styles.routeInfo}>
                <Text style={styles.routePointLabel}>PICKUP LOCATION</Text>
                <Text style={styles.routeAddress}>{assignment.pickupAddress}</Text>
                <Text style={styles.coordsText}>
                  {assignment.startCoordinates.latitude.toFixed(4)}, {assignment.startCoordinates.longitude.toFixed(4)}
                </Text>
              </View>
            </View>

            <View style={styles.routePoint}>
              <View style={styles.dotContainer}>
                <MapPin size={18} color={colors.primary} weight="fill" />
              </View>
              <View style={styles.routeInfo}>
                <Text style={styles.routePointLabel}>DELIVERY DESTINATION</Text>
                <Text style={styles.routeAddress}>{assignment.deliveryAddress}</Text>
                <Text style={styles.coordsText}>
                  {assignment.finishCoordinates.latitude.toFixed(4)}, {assignment.finishCoordinates.longitude.toFixed(4)}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Assigned Rider Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Assigned Driver</Text>
          {assignedRider ? (
            <View style={styles.riderRow}>
              <View style={styles.riderAvatar}>
                <Text style={styles.riderAvatarText}>{assignedRider.name.charAt(0)}</Text>
              </View>
              <View style={styles.riderDetails}>
                <Text style={styles.riderName}>{assignedRider.name}</Text>
                <Text style={styles.riderMeta}>
                  {assignedRider.riderCode} • ★ {assignedRider.rating} ({assignedRider.completedDeliveries} deliveries)
                </Text>
              </View>

              <View style={styles.contactActions}>
                <Pressable
                  onPress={() => handleCall(assignedRider.phone)}
                  style={styles.circleActionBtn}
                  accessibilityLabel="Call driver"
                >
                  <Phone size={16} color={colors.primary} weight="fill" />
                </Pressable>
              </View>
            </View>
          ) : (
            <Text style={styles.noDataText}>No rider currently assigned.</Text>
          )}

          {assignedRider && (
            <Pressable
              onPress={() => router.push(`/fleet_manager/rider/${assignedRider.id}` as any)}
              style={styles.viewDriverProfileBtn}
            >
              <User size={16} color={colors.primary} />
              <Text style={styles.viewDriverProfileText}>View Complete Driver Profile</Text>
            </Pressable>
          )}
        </View>

        {/* Vehicle Information */}
        {assignedVehicle && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Vehicle & Telemetry</Text>
            <View style={styles.vehicleRow}>
              <View style={styles.vehicleIconBox}>
                <Motorcycle size={22} color={colors.primary} />
              </View>
              <View style={styles.vehicleInfo}>
                <Text style={styles.vehiclePlate}>{assignedVehicle.licensePlateNumber}</Text>
                <Text style={styles.vehicleCategory}>{assignedVehicle.vehicleCategory}</Text>
              </View>
              <View style={styles.telemetryBadge}>
                <Text style={styles.telemetryStatus}>{assignedVehicle.telemetryStatus.toUpperCase()}</Text>
                <Text style={styles.telemetrySpeed}>{assignedVehicle.currentSpeedKph} km/h</Text>
              </View>
            </View>
          </View>
        )}

        {/* Customer Information Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Customer Details</Text>
          <View style={styles.customerRow}>
            <View style={styles.customerInfo}>
              <Text style={styles.customerName}>{assignment.customerName}</Text>
              <Text style={styles.customerPhone}>{assignment.customerPhone || 'No phone provided'}</Text>
            </View>
            {assignment.customerPhone && (
              <View style={styles.contactActions}>
                <Pressable
                  onPress={() => handleCall(assignment.customerPhone)}
                  style={styles.circleActionBtn}
                  accessibilityLabel="Call customer"
                >
                  <Phone size={16} color="#16a34a" weight="fill" />
                </Pressable>
                <Pressable
                  onPress={() => handleSms(assignment.customerPhone)}
                  style={styles.circleActionBtn}
                  accessibilityLabel="SMS customer"
                >
                  <ChatCircleText size={16} color={colors.primary} weight="fill" />
                </Pressable>
              </View>
            )}
          </View>
        </View>

        {/* Package & Timing Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Package & Timing</Text>
          <View style={styles.metaGrid}>
            <View style={styles.metaItem}>
              <Package size={18} color={colors.textSecondary} />
              <View>
                <Text style={styles.metaLabel}>Weight</Text>
                <Text style={styles.metaValue}>2.0 kg</Text>
              </View>
            </View>

            <View style={styles.metaItem}>
              <Clock size={18} color={colors.textSecondary} />
              <View>
                <Text style={styles.metaLabel}>Created</Text>
                <Text style={styles.metaValue}>
                  {new Date(assignment.createdAtTimestamp).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </Text>
              </View>
            </View>

            {assignment.startedAtTimestamp && (
              <View style={styles.metaItem}>
                <ClockCounterClockwise size={18} color={colors.textSecondary} />
                <View>
                  <Text style={styles.metaLabel}>Started</Text>
                  <Text style={styles.metaValue}>
                    {new Date(assignment.startedAtTimestamp).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </Text>
                </View>
              </View>
            )}

            {assignment.completedAtTimestamp && (
              <View style={styles.metaItem}>
                <CheckCircle size={18} color="#16a34a" />
                <View>
                  <Text style={styles.metaLabel}>Completed</Text>
                  <Text style={styles.metaValue}>
                    {new Date(assignment.completedAtTimestamp).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </Text>
                </View>
              </View>
            )}
          </View>
        </View>

        {/* Active Flags / Alerts */}
        {flags.length > 0 && (
          <View style={[styles.card, styles.alertCard]}>
            <View style={styles.alertHeader}>
              <WarningCircle size={20} color="#dc2626" weight="fill" />
              <Text style={styles.alertTitle}>Active Alerts ({flags.length})</Text>
            </View>
            {flags.map((flag) => (
              <View key={flag.flagId} style={styles.flagItem}>
                <View style={styles.flagTop}>
                  <Text style={styles.flagType}>{flag.type.replace('_', ' ').toUpperCase()}</Text>
                  <Text style={[styles.flagSeverity, flag.severity === 'high' ? styles.flagHigh : styles.flagMedium]}>
                    {flag.severity.toUpperCase()}
                  </Text>
                </View>
                <Text style={styles.flagReason}>{flag.reason}</Text>
                <Pressable onPress={() => handleResolveFlag(flag.flagId)} style={styles.resolveBtn}>
                  <Text style={styles.resolveBtnText}>Dismiss & Resolve</Text>
                </Pressable>
              </View>
            ))}
          </View>
        )}

        {/* Action Controls */}
        <View style={styles.actionsContainer}>
          {!isCompleted && (
            <Pressable onPress={handleMarkCompleted} style={styles.completeBtn}>
              <CheckCircle size={20} color="#ffffff" weight="bold" />
              <Text style={styles.completeBtnText}>Mark as Completed</Text>
            </Pressable>
          )}

          <Pressable
            onPress={() => router.push('/fleet_manager/booking')}
            style={styles.reassignBtn}
          >
            <Text style={styles.reassignBtnText}>Create New Waybill Booking</Text>
          </Pressable>
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
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  cardSectionLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.textSecondary,
    letterSpacing: 0.8,
  },
  trackingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 4,
  },
  trackingNumber: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.text,
  },
  copyPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  copyPillText: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  copyPillTextSuccess: {
    color: '#16a34a',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
  },
  badgeCompleted: {
    backgroundColor: '#f0fdf4',
  },
  badgeProgress: {
    backgroundColor: colors.primaryLight,
  },
  badgePending: {
    backgroundColor: '#fef3c7',
  },
  badgeFailed: {
    backgroundColor: '#fee2e2',
  },
  statusBadgeText: {
    fontSize: 12,
    fontWeight: '700',
  },
  statusTextCompleted: {
    color: '#16a34a',
  },
  statusTextProgress: {
    color: colors.primary,
  },
  statusTextPending: {
    color: '#d97706',
  },
  statusTextFailed: {
    color: '#dc2626',
  },
  deepLinkBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
  },
  deepLinkBannerText: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: '600',
  },
  cardHeaderWithAction: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 12,
  },
  openMapBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.primaryLight,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    marginBottom: 12,
  },
  openMapText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.primary,
  },
  routeContainer: {
    gap: 12,
  },
  routePoint: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  dotContainer: {
    alignItems: 'center',
    width: 20,
  },
  dotPickup: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.textSecondary,
    marginTop: 4,
  },
  timelineLine: {
    width: 2,
    height: 36,
    backgroundColor: '#e5e7eb',
    marginVertical: 4,
  },
  routeInfo: {
    flex: 1,
  },
  routePointLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.textSecondary,
    letterSpacing: 0.6,
  },
  routeAddress: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.text,
    marginTop: 2,
  },
  coordsText: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 2,
  },
  riderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  riderAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  riderAvatarText: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.primary,
  },
  riderDetails: {
    flex: 1,
  },
  riderName: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.text,
  },
  riderMeta: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  contactActions: {
    flexDirection: 'row',
    gap: 8,
  },
  circleActionBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewDriverProfileBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: colors.primaryLight,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 12,
  },
  viewDriverProfileText: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.primary,
  },
  noDataText: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  vehicleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  vehicleIconBox: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  vehicleInfo: {
    flex: 1,
  },
  vehiclePlate: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.text,
  },
  vehicleCategory: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  telemetryBadge: {
    alignItems: 'flex-end',
  },
  telemetryStatus: {
    fontSize: 11,
    fontWeight: '800',
    color: colors.primary,
  },
  telemetrySpeed: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: '600',
    marginTop: 2,
  },
  customerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  customerInfo: {
    flex: 1,
  },
  customerName: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.text,
  },
  customerPhone: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 2,
  },
  metaGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    minWidth: 120,
  },
  metaLabel: {
    fontSize: 11,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  metaValue: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.text,
  },
  alertCard: {
    borderColor: '#fca5a5',
    backgroundColor: '#fff5f5',
  },
  alertHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 10,
  },
  alertTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#dc2626',
  },
  flagItem: {
    backgroundColor: '#ffffff',
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fecaca',
    gap: 6,
  },
  flagTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  flagType: {
    fontSize: 11,
    fontWeight: '800',
    color: '#991b1b',
  },
  flagSeverity: {
    fontSize: 10,
    fontWeight: '800',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  flagHigh: {
    backgroundColor: '#fee2e2',
    color: '#dc2626',
  },
  flagMedium: {
    backgroundColor: '#fef3c7',
    color: '#d97706',
  },
  flagReason: {
    fontSize: 13,
    color: colors.text,
    fontWeight: '500',
  },
  resolveBtn: {
    alignSelf: 'flex-start',
    backgroundColor: '#fee2e2',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    marginTop: 4,
  },
  resolveBtnText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#dc2626',
  },
  actionsContainer: {
    gap: 12,
    marginTop: 8,
  },
  completeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#16a34a',
    paddingVertical: 14,
    borderRadius: 12,
  },
  completeBtnText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '700',
  },
  reassignBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: 14,
    borderRadius: 12,
  },
  reassignBtnText: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '600',
  },
});

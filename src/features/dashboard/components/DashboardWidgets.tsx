import { CaretRight } from 'phosphor-react-native/src/icons/CaretRight';
import { WarningCircle } from 'phosphor-react-native/src/icons/WarningCircle';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { fleetManagerData } from '@/data/fleetManagerData';
import { colors } from '@/theme/tokens';

export function DashboardWidgets() {
  const assignments = fleetManagerData.Assignments;
  const top3Assignments = assignments.slice(0, 3);

  const flaggedEventsCount = fleetManagerData.supportTickets.filter((t: any) => t.status === 'open').length;
  const hasAlerts = flaggedEventsCount > 0;

  return (
    <View style={styles.container}>
      {/* 1. Recent Alerts Strip (Only shows if flagged > 0) */}
      {hasAlerts && (
        <View style={styles.alertStrip}>
          <WarningCircle size={20} color="#dc2626" weight="fill" />
          <Text style={styles.alertText}>
            {flaggedEventsCount} Actionable Alerts: Route deviations detected.
          </Text>
          <Pressable>
            <Text style={styles.alertLink}>View</Text>
          </Pressable>
        </View>
      )}

      {/* 2. Mini Fleet Map */}
      <View style={styles.widgetCard}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Fleet Map</Text>
          <View style={styles.liveIndicator}>
            <View style={styles.liveDot} />
            <Text style={styles.liveText}>Live</Text>
          </View>
        </View>
        <Pressable style={styles.mapPlaceholder}>
          <Text style={styles.mapText}>Tap to open interactive map</Text>
        </Pressable>
      </View>

      {/* 3. Today's Assignments */}
      <View style={styles.widgetCard}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Today's Assignments</Text>
          <Pressable style={styles.viewAllBtn}>
            <Text style={styles.viewAllText}>View all</Text>
            <CaretRight size={14} color={colors.primary} />
          </Pressable>
        </View>

        <View style={styles.assignmentList}>
          {top3Assignments.map((task: any, index: number) => (
            <View
              key={index}
              style={[
                styles.taskRow,
                index !== top3Assignments.length - 1 && styles.taskRowDivider,
              ]}
            >
              <View style={styles.taskInfo}>
                <Text style={styles.taskRider}>{task.assignedRiderId}</Text>
                <Text style={styles.taskDesc}>
                  {task.pickupAddress} to {task.deliveryAddress}
                </Text>
              </View>
              <View style={styles.taskMeta}>
                <Text style={styles.taskTime}>
                  {new Date(task.createdAtTimestamp).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </Text>
                <Text
                  style={[
                    styles.taskStatus,
                    task.deliveryStatus === 'in_progress'
                      ? styles.statusActive
                      : styles.statusPending,
                  ]}
                >
                  {task.deliveryStatus === 'in_progress' ? 'In Transit' : task.deliveryStatus}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 24,
    paddingBottom: 40,
  },

  // Alerts
  alertStrip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fef2f2',
    borderWidth: 1,
    borderColor: '#fecaca',
    padding: 12,
    borderRadius: 12,
    gap: 8,
  },
  alertText: {
    flex: 1,
    fontSize: 13,
    color: '#991b1b',
    fontWeight: '500',
  },
  alertLink: {
    fontSize: 13,
    fontWeight: '600',
    color: '#dc2626',
  },

  // Generic Card
  widgetCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },

  // Map Widget
  liveIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0fdf4',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 6,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#16a34a',
  },
  liveText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#16a34a',
  },
  mapPlaceholder: {
    height: 120,
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapText: {
    fontSize: 13,
    color: '#6b7280',
    fontWeight: '500',
  },

  // Tasks Widget
  viewAllBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  viewAllText: {
    fontSize: 13,
    fontWeight: '500',
    color: colors.primary,
  },
  assignmentList: {
    // container for rows
  },
  taskRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  taskRowDivider: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#e5e7eb',
  },
  taskInfo: {
    gap: 2,
  },
  taskRider: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  taskDesc: {
    fontSize: 12,
    color: '#6b7280',
  },
  taskMeta: {
    alignItems: 'flex-end',
    gap: 4,
  },
  taskTime: {
    fontSize: 12,
    fontWeight: '500',
    color: '#4b5563',
  },
  taskStatus: {
    fontSize: 11,
    fontWeight: '600',
  },
  statusActive: {
    color: '#16a34a',
  },
  statusPending: {
    color: '#d97706',
  },
});

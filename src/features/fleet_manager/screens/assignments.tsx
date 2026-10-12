import React from 'react';
import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ClipboardText, MapPin, Package, Clock, CheckCircle, ClockCounterClockwise } from 'phosphor-react-native';
import { fleetManagerData } from '@/data/fleetManagerData';
import { colors } from '@/theme/tokens';

export default function AssignmentsScreen() {
  const insets = useSafeAreaInsets();
  
  const renderItem = ({ item }: { item: typeof fleetManagerData.Assignments[0] }) => {
    const isCompleted = item.deliveryStatus === 'completed';
    const isProgress = item.deliveryStatus === 'in_progress';
    
    return (
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <View style={styles.trackingBadge}>
            <Text style={styles.trackingText}>{item.waybillTrackingNumber}</Text>
          </View>
          <View style={[styles.statusBadge, isCompleted ? styles.statusCompleted : styles.statusProgress]}>
            {isCompleted ? <CheckCircle size={14} color="#16a34a" weight="fill" /> : <ClockCounterClockwise size={14} color={colors.primary} weight="fill" />}
            <Text style={[styles.statusText, isCompleted ? styles.statusTextCompleted : styles.statusTextProgress]}>
              {isCompleted ? 'Completed' : 'In Progress'}
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
              <Text style={styles.routeAddress} numberOfLines={1}>{item.pickupAddress}</Text>
            </View>
          </View>
          
          <View style={styles.routePoint}>
            <View style={styles.dotContainer}>
              <MapPin size={16} color={colors.primary} weight="fill" />
            </View>
            <View style={styles.routeInfo}>
              <Text style={styles.routeLabel}>DELIVERY</Text>
              <Text style={styles.routeAddress} numberOfLines={1}>{item.deliveryAddress}</Text>
            </View>
          </View>
        </View>

        <View style={styles.footer}>
          <View style={styles.footerItem}>
            <Package size={16} color={colors.textSecondary} />
            <Text style={styles.footerText}>{"2kg"}</Text>
          </View>
          <View style={styles.footerItem}>
            <Clock size={16} color={colors.textSecondary} />
            <Text style={styles.footerText}>{new Date(item.createdAtTimestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
          </View>
        </View>
        
        <View style={styles.riderBanner}>
          <Text style={styles.riderLabel}>Assigned to:</Text>
          <Text style={styles.riderName}>{item.assignedRiderId} ({item.assignedVehicleId})</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={styles.title}>Live Assignments</Text>
        <Text style={styles.subtitle}>{fleetManagerData.Assignments.length} total tasks</Text>
      </View>
      
      <FlatList
        data={fleetManagerData.Assignments}
        keyExtractor={(item) => item.assignmentId}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
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
    paddingHorizontal: 20,
    paddingBottom: 16,
    paddingTop: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.text,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    fontWeight: '500',
    marginTop: 4,
  },
  listContent: {
    padding: 16,
    gap: 16,
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
    shadowOpacity: 0.02,
    shadowRadius: 8,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
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
    fontSize: 12,
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
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  statusTextProgress: {
    color: colors.primary,
  },
  statusTextCompleted: {
    color: '#16a34a',
  },
  routeContainer: {
    padding: 16,
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
    fontSize: 15,
    fontWeight: '600',
    color: colors.text,
    marginTop: 2,
  },
  footer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingBottom: 16,
    gap: 16,
  },
  footerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  footerText: {
    fontSize: 13,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  riderBanner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    padding: 12,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
  },
  riderLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  riderName: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.text,
  }
});

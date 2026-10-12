import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { ScreenContainer, Button, Card, StatusChip } from '@/components';
import { useShiftStore, selectShiftState, selectIsOffShift, selectIsOnShift, selectIsTripActive } from '@/store/useShiftStore';
import { useActiveTripStore } from '@/store/useActiveTripStore';
import { useShiftQueries } from '@/hooks/useQueries';
import { authRepo } from '@/services/mock';

export function HomeScreen() {
  const router = useRouter();
  const shiftState = useShiftStore(selectShiftState);
  const isOffShift = useShiftStore(selectIsOffShift);
  const isOnShift = useShiftStore(selectIsOnShift);
  const isTripActive = useShiftStore(selectIsTripActive);
  
  const { startShift } = useShiftQueries();
  const endShift = () => {
    // We just mock ending a shift for now by resetting it if we are on shift
    // Real flow would go to signoff_pending
    useShiftStore.getState().initiateSignOff();
    useShiftStore.getState().completeSignOff();
    useShiftStore.getState().resetShift();
  };

  const { activeTrip } = useActiveTripStore();

  const handleLogout = async () => {
    await authRepo.logout();
    router.replace('/(auth)/login' as any);
  };

  return (
    <ScreenContainer>
      <View style={styles.header}>
        <Text style={styles.title}>Dashboard</Text>
        <Button title="Logout" onPress={handleLogout} variant="danger" />
      </View>

      <Card>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Shift Status</Text>
          <StatusChip status={shiftState === 'off_shift' ? 'offline' : (shiftState === 'trip_active' ? 'onTrip' : 'idle')} />
        </View>
        <View style={styles.shiftActions}>
          {isOffShift ? (
            <Button title="Start Shift" onPress={() => startShift()} variant="primary" />
          ) : (
            <Button title="End Shift" onPress={endShift} variant="danger" />
          )}
        </View>
      </Card>

      {isTripActive && activeTrip && (
        <Card style={styles.banner}>
          <Text style={styles.bannerTitle}>Active Trip: {activeTrip.passengerName}</Text>
          <Text>Pickup: {activeTrip.pickupLocation}</Text>
          <Text>Dropoff: {activeTrip.dropoffLocation}</Text>
          <View style={{ marginTop: 10 }}>
            <Button title="View Trip" onPress={() => router.push('/fleet_manager/trip' as any)} variant="primary" />
          </View>
        </Card>
      )}

      {isOnShift && !isTripActive && (
        <Card>
          <Text style={styles.bannerTitle}>Waiting for trips...</Text>
          <View style={{ marginTop: 10 }}>
            <Button title="Simulate Trip" onPress={() => router.push('/fleet_manager/trip' as any)} variant="primary" />
          </View>
        </Card>
      )}

      <Card>
        <Text style={styles.cardTitle}>Today's Stats</Text>
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>$124.50</Text>
            <Text style={styles.statLabel}>Earnings</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>8</Text>
            <Text style={styles.statLabel}>Trips</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>4.2h</Text>
            <Text style={styles.statLabel}>Online</Text>
          </View>
        </View>
      </Card>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  shiftActions: {
    marginTop: 8,
  },
  banner: {
    borderColor: '#4ade80',
    borderWidth: 2,
  },
  bannerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  statBox: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
});

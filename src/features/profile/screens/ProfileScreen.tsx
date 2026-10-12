import React, { useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { useProfileStore } from '@/features/profile/store/useProfileStore';

export const ProfileScreen = () => {
  const { profile, shiftHistory, isLoading, error, fetchProfileData } = useProfileStore();

  useEffect(() => {
    // Hardcoded driverId for now
    fetchProfileData('driver_123');
  }, [fetchProfileData]);

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Driver Profile</Text>
        {profile && (
          <View style={styles.statsContainer}>
            <View style={styles.statBox}>
              <Text style={styles.statLabel}>Completed Trips</Text>
              <Text style={styles.statValue}>{profile.completedTrips}</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statLabel}>On-Time Rate</Text>
              <Text style={styles.statValue}>{profile.onTimeRate}%</Text>
            </View>
          </View>
        )}
      </View>

      <View style={styles.historySection}>
        <Text style={styles.sectionTitle}>Shift History</Text>
        <FlatList
          data={shiftHistory}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.historyItem}>
              <Text style={styles.historyDate}>{item.date.toLocaleDateString()}</Text>
              <View style={styles.historyDetails}>
                <Text>Duration: {item.durationHours}h</Text>
                <Text>Trips: {item.completedTrips}</Text>
              </View>
            </View>
          )}
          ListEmptyComponent={<Text>No shift history available.</Text>}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statBox: {
    flex: 1,
    backgroundColor: '#f0f4f8',
    padding: 15,
    borderRadius: 8,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 5,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  historySection: {
    flex: 1,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
  },
  historyItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  historyDate: {
    fontWeight: '500',
    fontSize: 16,
  },
  historyDetails: {
    alignItems: 'flex-end',
  },
});

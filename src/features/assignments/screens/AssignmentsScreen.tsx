// Import React for functional components
import React, { useState } from 'react';
// Import UI elements from React Native
import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native';
// Import mock data to simulate real backend data
import { mockAssignments } from '../../../data/mockData';
// Import theme tokens
import { colors, spacing } from '../../../theme/tokens';

/**
 * AssignmentCard
 * Displays a single assignment in the ledger
 */
function AssignmentCard({ item }: { item: any }) {
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>{item.rider}</Text>
        <View style={[styles.statusBadge, item.status === 'In Transit' ? styles.statusActive : styles.statusPending]}>
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>
      
      <View style={styles.cardBody}>
        <Text style={styles.detailText}>Type: {item.type}</Text>
        <Text style={styles.detailText}>Pickup: {item.pickup}</Text>
        <Text style={styles.detailText}>Dropoff: {item.delivery}</Text>
        <Text style={styles.etaText}>ETA: {item.eta}</Text>
      </View>
    </View>
  );
}

/**
 * AssignmentsScreen Component
 * 
 * Renders the Task Ledger containing all active and past assignments.
 */
export function AssignmentsScreen() {
  const [activeTab, setActiveTab] = useState('Active');
  const tabs = ['Active', 'Completed', 'Canceled'];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Task Ledger</Text>
      
      {/* Top tabs for filtering the ledger */}
      <View style={styles.tabContainer}>
        {tabs.map(tab => (
          <Pressable 
            key={tab} 
            onPress={() => setActiveTab(tab)}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
              {tab}
            </Text>
          </Pressable>
        ))}
      </View>

      {/* FlatList automatically handles scrollable lists efficiently */}
      <FlatList
        data={mockAssignments}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => <AssignmentCard item={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: spacing.xl,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.md,
    color: colors.text,
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  tab: {
    paddingVertical: spacing.sm,
    marginRight: spacing.lg,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: colors.primary,
  },
  tabText: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  activeTabText: {
    color: colors.primary,
    fontWeight: '600',
  },
  listContainer: {
    padding: spacing.lg,
    gap: spacing.md,
  },
  card: {
    backgroundColor: '#fff',
    padding: spacing.md,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusActive: {
    backgroundColor: '#dcfce7',
  },
  statusPending: {
    backgroundColor: '#fef3c7',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  cardBody: {
    gap: 4,
  },
  detailText: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  etaText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.primary,
    marginTop: 8,
  }
});

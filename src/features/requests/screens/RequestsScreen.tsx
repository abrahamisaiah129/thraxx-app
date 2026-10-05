// Import React and hooks
import React, { useState } from 'react';
// Import UI components
import { View, Text, StyleSheet, FlatList, TextInput } from 'react-native';
// Import theme
import { colors, spacing } from '../../../theme/tokens';
// Import ScreenContainer
import { ScreenContainer } from '../../../components/layout/ScreenContainer';

/**
 * RequestItem Component
 * Renders an individual inbound request from a user
 */
function RequestItem({ item }: { item: any }) {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{item.customerName}</Text>
      <Text style={styles.detailText}>Location: {item.location}</Text>
      <Text style={styles.detailText}>Item: {item.itemDescription}</Text>
      <Text style={styles.timeText}>{item.timeAgo}</Text>
    </View>
  );
}

/**
 * RequestsScreen Component
 * 
 * Displays the Inbound Management queue.
 * Allows admins to search, filter, and view incoming task requests.
 */
export function RequestsScreen() {
  const [searchQuery, setSearchQuery] = useState('');

  // Dummy data for inbound requests
  const mockRequests = [
    { id: 'R-001', customerName: 'Alice Johnson', location: 'Victoria Island', itemDescription: 'Documents', timeAgo: '5 mins ago' },
    { id: 'R-002', customerName: 'Tech Hub Ltd', location: 'Yaba', itemDescription: 'Laptops', timeAgo: '12 mins ago' },
  ];

  return (
    <ScreenContainer style={styles.container}>
      <Text style={styles.title}>Inbound Requests</Text>
      
      {/* Search Input for filtering requests */}
      <TextInput 
        style={styles.searchInput}
        placeholder="Search requests by name or location..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {/* List of inbound requests */}
      <FlatList
        data={mockRequests}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => <RequestItem item={item} />}
        ListEmptyComponent={<Text style={styles.emptyText}>No pending requests.</Text>}
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: spacing.lg,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.md,
    color: colors.text,
  },
  searchInput: {
    marginHorizontal: spacing.lg,
    padding: spacing.md,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    marginBottom: spacing.md,
  },
  listContainer: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
    gap: spacing.sm,
  },
  card: {
    backgroundColor: '#fff',
    padding: spacing.md,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  detailText: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 2,
  },
  timeText: {
    fontSize: 12,
    color: colors.primary,
    marginTop: 8,
    fontWeight: '600',
  },
  emptyText: {
    textAlign: 'center',
    color: colors.textSecondary,
    marginTop: spacing.xl,
  }
});

// Import React
import React from 'react';
// Import UI components
import { View, Text, StyleSheet, SectionList } from 'react-native';
// Import theme
import { colors, spacing } from '../../../theme/tokens';
// Import ScreenContainer
import { ScreenContainer } from '../../../components/layout/ScreenContainer';
// Import mock data
import { dashboardData } from '../../../data/mockData';

/**
 * NotificationItem Component
 * Renders a single alert or notification
 */
function NotificationItem({ item }: { item: any }) {
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>{item.type}</Text>
        <Text style={styles.timeText}>{item.time}</Text>
      </View>
      <Text style={styles.messageText}>{item.message}</Text>
    </View>
  );
}

/**
 * NotificationsScreen Component
 * 
 * Displays the Alert Center with grouped notifications.
 */
export function NotificationsScreen() {
  // We use SectionList to group notifications by date (e.g., Today, Yesterday)
  const sections = [
    {
      title: 'Today',
      data: dashboardData.recentAlerts,
    },
    {
      title: 'Yesterday',
      data: [
        { id: 'ALT-3', type: 'Speeding', message: 'Rider R005 exceeded speed limit', time: '14:20' }
      ]
    }
  ];

  return (
    <ScreenContainer style={styles.container}>
      <Text style={styles.title}>Notifications</Text>
      
      {/* SectionList renders grouped lists perfectly */}
      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => <NotificationItem item={item} />}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.sectionHeader}>{title}</Text>
        )}
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
  listContainer: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.textSecondary,
    backgroundColor: colors.background,
    paddingVertical: spacing.sm,
    marginTop: spacing.sm,
  },
  card: {
    backgroundColor: '#fff',
    padding: spacing.md,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.sm,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.text,
  },
  timeText: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  messageText: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 4,
  }
});

import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { EnvelopeOpen, WarningCircle } from 'phosphor-react-native';
import { fleetManagerData } from '@/data/fleetManagerData';
import { colors } from '@/theme/tokens';

export default function RequestsScreen() {
  const insets = useSafeAreaInsets();
  
  const renderItem = ({ item }: { item: typeof fleetManagerData.supportTickets[0] }) => {
    return (
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.ticketId}>{item.ticketNumber}</Text>
          <View style={[styles.priorityBadge, item.priority === 'high' ? styles.priorityHigh : styles.priorityMedium]}>
            <Text style={styles.priorityText}>{item.priority.toUpperCase()}</Text>
          </View>
        </View>
        <Text style={styles.subject}>{item.subject}</Text>
        <Text style={styles.message}>{item.message}</Text>
        <View style={styles.footer}>
          <Text style={styles.time}>{new Date(item.createdAt).toLocaleDateString()}</Text>
          <Text style={styles.status}>{item.status.toUpperCase()}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={styles.title}>Requests & Support</Text>
        <Text style={styles.subtitle}>{fleetManagerData.supportTickets.length} open tickets</Text>
      </View>
      
      <FlatList
        data={fleetManagerData.supportTickets}
        keyExtractor={(item) => item.id}
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
    padding: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
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
    marginBottom: 8,
  },
  ticketId: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textSecondary,
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  priorityMedium: {
    backgroundColor: '#fffbeb',
  },
  priorityHigh: {
    backgroundColor: '#fef2f2',
  },
  priorityText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#d97706',
  },
  subject: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  message: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
    marginBottom: 16,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
  },
  time: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  status: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.primary,
  }
});

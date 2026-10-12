import React, { useState } from 'react';
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
  Alert,
} from 'react-native';
import {
  Ticket,
  CheckCircle,
  Clock,
  WarningCircle,
  ChatCircleDots,
} from 'phosphor-react-native';
import { Screen } from '@/components/Screen';
import { StatePanel } from '@/components/StatePanel';
import { colors, spacing } from '@/theme/tokens';
import { fleetManagerData } from '@/data/fleetManagerData';

export function AdminSupportScreen() {
  const [tickets, setTickets] = useState(fleetManagerData.supportTickets);
  const [filter, setFilter] = useState<'All' | 'open' | 'resolved'>('All');

  const filteredTickets = tickets.filter((t) => {
    if (filter === 'All') return true;
    return t.status === filter;
  });

  const handleResolve = (ticketId: string) => {
    setTickets((prev) =>
      prev.map((t) => (t.id === ticketId ? { ...t, status: 'resolved' as const } : t)),
    );
    Alert.alert('Ticket Resolved', 'The support ticket has been closed.');
  };

  return (
    <Screen>
      <View style={styles.header}>
        <Text style={styles.eyebrow}>PLATFORM DESK</Text>
        <Text style={styles.title}>Support Desk</Text>
        <Text style={styles.subtitle}>
          Resolve platform dispatch issues and partner requests
        </Text>
      </View>

      {/* Filter Tabs */}
      <View style={styles.tabRow}>
        {(['All', 'open', 'resolved'] as const).map((status) => (
          <Pressable
            key={status}
            onPress={() => setFilter(status)}
            style={[styles.tab, filter === status && styles.tabActive]}
          >
            <Text style={[styles.tabText, filter === status && styles.tabTextActive]}>
              {status === 'All' ? 'All Tickets' : status.toUpperCase()}
            </Text>
          </Pressable>
        ))}
      </View>

      {/* Ticket List */}
      <FlatList
        data={filteredTickets}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          const isResolved = item.status === 'resolved';
          const isHighPriority = item.priority === 'high';

          return (
            <View style={styles.card}>
              <View style={styles.cardTop}>
                <View style={styles.ticketBadge}>
                  <Text style={styles.ticketNumber}>{item.ticketNumber}</Text>
                </View>
                <View
                  style={[
                    styles.priorityBadge,
                    isHighPriority ? styles.badgeHigh : styles.badgeNormal,
                  ]}
                >
                  <Text
                    style={[
                      styles.priorityText,
                      isHighPriority ? styles.textHigh : styles.textNormal,
                    ]}
                  >
                    {item.priority.toUpperCase()}
                  </Text>
                </View>
              </View>

              <Text style={styles.subject}>{item.subject}</Text>
              <Text style={styles.message}>{item.message}</Text>

              <View style={styles.cardFooter}>
                <View style={styles.timeInfo}>
                  <Clock size={14} color={colors.textSecondary} />
                  <Text style={styles.timeText}>
                    {new Date(item.createdAt).toLocaleDateString()}
                  </Text>
                </View>

                {!isResolved ? (
                  <Pressable
                    onPress={() => handleResolve(item.id)}
                    style={styles.resolveBtn}
                    accessibilityRole="button"
                    accessibilityLabel="Resolve ticket"
                  >
                    <CheckCircle size={14} color="#16a34a" weight="bold" />
                    <Text style={styles.resolveBtnText}>Mark Resolved</Text>
                  </Pressable>
                ) : (
                  <View style={styles.resolvedBadge}>
                    <CheckCircle size={14} color="#16a34a" weight="fill" />
                    <Text style={styles.resolvedText}>Resolved</Text>
                  </View>
                )}
              </View>
            </View>
          );
        }}
        ListEmptyComponent={
          <StatePanel
            title="Ticket queue clear"
            message="No tickets currently matching this filter."
          />
        }
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    marginBottom: spacing.sm,
  },
  eyebrow: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1,
  },
  title: {
    color: colors.text,
    fontSize: 28,
    fontWeight: '800',
    marginTop: 2,
  },
  subtitle: {
    color: colors.textSecondary,
    fontSize: 14,
    marginTop: 4,
  },
  tabRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: spacing.sm,
    marginBottom: spacing.xs,
  },
  tab: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    backgroundColor: '#f1f5f9',
  },
  tabActive: {
    backgroundColor: colors.primary,
  },
  tabText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  tabTextActive: {
    color: '#ffffff',
  },
  list: {
    gap: spacing.sm,
    paddingTop: spacing.md,
    paddingBottom: spacing.xl,
  },
  card: {
    padding: spacing.md,
    borderRadius: 14,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 8,
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ticketBadge: {
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  ticketNumber: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.text,
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  badgeHigh: {
    backgroundColor: '#fee2e2',
  },
  badgeNormal: {
    backgroundColor: '#fef3c7',
  },
  priorityText: {
    fontSize: 10,
    fontWeight: '800',
  },
  textHigh: {
    color: '#dc2626',
  },
  textNormal: {
    color: '#d97706',
  },
  subject: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.text,
  },
  message: {
    fontSize: 13,
    color: colors.textSecondary,
    lineHeight: 18,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
  },
  timeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  timeText: {
    fontSize: 11,
    color: colors.textSecondary,
  },
  resolveBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#f0fdf4',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
  },
  resolveBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#16a34a',
  },
  resolvedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  resolvedText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#16a34a',
  },
});

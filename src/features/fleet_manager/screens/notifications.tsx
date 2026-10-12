import React from 'react';
import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native';
import { router } from 'expo-router';
import { useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Bell, Warning, CheckCircle } from 'phosphor-react-native';
import { fleetManagerData } from '@/data/fleetManagerData';
import { colors } from '@/theme/tokens';

export default function NotificationsScreen() {
  const insets = useSafeAreaInsets();
  const [readIds, setReadIds] = useState(
    () => new Set(fleetManagerData.notifications.filter((notification) => notification.read).map((notification) => notification.id)),
  );

  /**
   * Marks a notification as read and opens its related assignment when one exists.
   */
  function openNotification(notification: (typeof fleetManagerData.notifications)[number]) {
    setReadIds((current) => new Set(current).add(notification.id));
    if (notification.relatedAssignmentId) {
      router.push(`/fleet_manager/assignment/${notification.relatedAssignmentId}` as any);
    }
  }
  
  const renderItem = ({ item }: { item: typeof fleetManagerData.notifications[0] }) => {
    const isWarning = item.type === 'warning';
    
    return (
      <View style={[styles.card, !item.read && styles.cardUnread]}>
        <View style={[styles.iconBox, isWarning ? styles.iconWarning : styles.iconInfo]}>
          {isWarning ? (
            <Warning size={20} color="#dc2626" weight="fill" />
          ) : (
            <Bell size={20} color={colors.primary} weight="fill" />
          )}
        </View>
        <View style={styles.content}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.message}>{item.message}</Text>
          <Text style={styles.time}>{new Date(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
        </View>
        {!item.read && <View style={styles.unreadDot} />}
      </View>
    );
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={styles.titleText}>Notifications</Text>
      </View>
      
      <FlatList
        data={fleetManagerData.notifications}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable onPress={() => openNotification(item)}>
            {renderItem({ item: { ...item, read: readIds.has(item.id) } })}
          </Pressable>
        )}
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
  titleText: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.text,
    letterSpacing: -0.5,
  },
  listContent: {
    paddingBottom: 40,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#ffffff',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
    gap: 12,
  },
  cardUnread: {
    backgroundColor: colors.primaryLight,
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWarning: {
    backgroundColor: '#fef2f2',
  },
  iconInfo: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 2,
  },
  message: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
    marginBottom: 8,
  },
  time: {
    fontSize: 12,
    color: '#9ca3af',
    fontWeight: '500',
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
    marginTop: 6,
  }
});

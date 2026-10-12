import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import { Alert, FlatList, Linking, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { CaretLeft, CaretRight, MagnifyingGlass, Phone, Plus, Star } from 'phosphor-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { fleetManagerData } from '@/data/fleetManagerData';
import { colors, spacing } from '@/theme/tokens';

type RiderStatus = 'offline' | 'available' | 'assigned';
type Filter = 'All' | RiderStatus;

const filters: Filter[] = ['All', 'offline', 'available', 'assigned'];

const statusCopy: Record<RiderStatus, string> = {
  offline: 'Offline',
  available: 'Available',
  assigned: 'Assigned',
};

const statusStyles: Record<RiderStatus, { background: string; text: string }> = {
  offline: { background: '#f1f5f9', text: '#64748b' },
  available: { background: '#f0fdf4', text: '#16a34a' },
  assigned: { background: colors.primaryLight, text: colors.primary },
};

export default function RidersScreen() {
  const insets = useSafeAreaInsets();
  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<Filter>('All');

  const visibleRiders = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return fleetManagerData.riders.filter((rider) => {
      const matchesQuery =
        !normalizedQuery ||
        `${rider.name} ${rider.riderCode} ${rider.phone}`.toLowerCase().includes(normalizedQuery);
      const matchesFilter = activeFilter === 'All' || rider.status === activeFilter;
      return matchesQuery && matchesFilter;
    });
  }, [activeFilter, query]);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.headerButton} accessibilityLabel="Go back">
          <CaretLeft size={24} color={colors.text} />
        </Pressable>
        <View style={styles.headerCopy}>
          <Text style={styles.title}>Riders</Text>
          <Text style={styles.subtitle}>{visibleRiders.length} riders shown</Text>
        </View>
        <Pressable
          onPress={() => router.push('/fleet_manager/add-rider')}
          style={styles.addButton}
          accessibilityRole="button"
          accessibilityLabel="Add rider"
        >
          <Plus size={20} color="#fff" weight="bold" />
        </Pressable>
      </View>

      <View style={styles.toolbar}>
        <MagnifyingGlass size={18} color={colors.textSecondary} />
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Search riders"
          placeholderTextColor={colors.textSecondary}
          style={styles.searchInput}
          accessibilityLabel="Search riders"
        />
      </View>

      <FlatList
        data={filters}
        horizontal
        keyExtractor={(filter) => filter}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filters}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => setActiveFilter(item)}
            style={[styles.filter, activeFilter === item && styles.filterActive]}
            accessibilityRole="button"
            accessibilityState={{ selected: activeFilter === item }}
          >
            <Text style={[styles.filterText, activeFilter === item && styles.filterTextActive]}>
              {item === 'All' ? 'All' : statusCopy[item]}
            </Text>
          </Pressable>
        )}
      />

      <FlatList
        data={visibleRiders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const status = item.status as RiderStatus;
          const tone = statusStyles[status];
          return (
            <Pressable
              onPress={() => router.push(`/fleet_manager/rider/${item.id}` as any)}
              style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
              accessibilityRole="button"
              accessibilityLabel={`Rider ${item.name}`}
            >
              <View style={styles.cardHeader}>
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>{item.name.charAt(0)}</Text>
                </View>
                <View style={styles.riderInfo}>
                  <Text style={styles.name}>{item.name}</Text>
                  <Text style={styles.code}>{item.riderCode}</Text>
                </View>
                <View style={[styles.statusBadge, { backgroundColor: tone.background }]}>
                  <Text style={[styles.statusText, { color: tone.text }]}>{statusCopy[status]}</Text>
                </View>
                <CaretRight size={18} color={colors.textSecondary} style={{ marginLeft: 4 }} />
              </View>

              <View style={styles.statsRow}>
                <View style={styles.stat}>
                  <Star size={16} color="#d97706" weight="fill" />
                  <Text style={styles.statText}>{item.rating}</Text>
                </View>
                <View style={styles.divider} />
                <Text style={styles.statLabel}>{item.completedDeliveries} completed deliveries</Text>
              </View>

              <View style={styles.footer}>
                <Pressable
                  onPress={(e) => {
                    e.stopPropagation();
                    Linking.openURL(`tel:${item.phone}`).catch(() => {
                      Alert.alert('Phone', item.phone);
                    });
                  }}
                  style={styles.phoneAction}
                >
                  <Phone size={16} color={colors.primary} weight="fill" />
                  <Text style={[styles.footerText, { color: colors.primary, fontWeight: '600' }]}>{item.phone}</Text>
                </Pressable>
              </View>
            </Pressable>
          );
        }}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={<Text style={styles.empty}>No riders match this filter.</Text>}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.md,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerButton: { padding: spacing.sm, marginLeft: -spacing.sm },
  headerCopy: { flex: 1, marginLeft: spacing.sm },
  title: { fontSize: 24, fontWeight: '800', color: colors.text },
  subtitle: { color: colors.textSecondary, fontSize: 13, marginTop: 2 },
  addButton: {
    padding: spacing.sm,
    borderRadius: 10,
    backgroundColor: colors.primary,
  },
  toolbar: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: spacing.md,
    paddingHorizontal: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    backgroundColor: '#fff',
  },
  searchInput: { flex: 1, minHeight: 46, marginLeft: spacing.sm, color: colors.text },
  filters: { paddingHorizontal: spacing.md, paddingBottom: spacing.md, gap: spacing.sm },
  filter: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 99,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: '#fff',
  },
  filterActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  filterText: { color: colors.textSecondary, fontWeight: '600', textTransform: 'capitalize' },
  filterTextActive: { color: '#fff' },
  listContent: { padding: spacing.md, paddingTop: 0, gap: spacing.md, paddingBottom: spacing.xl },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
  },
  cardPressed: {
    opacity: 0.92,
    transform: [{ scale: 0.995 }],
  },
  phoneAction: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.md },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
  },
  avatarText: { color: '#fff', fontSize: 20, fontWeight: '700' },
  riderInfo: { flex: 1 },
  name: { fontSize: 16, fontWeight: '700', color: colors.text },
  code: { fontSize: 12, color: colors.textSecondary, marginTop: 2 },
  statusBadge: { paddingHorizontal: spacing.sm, paddingVertical: 6, borderRadius: 99 },
  statusText: { fontSize: 11, fontWeight: '800' },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    padding: spacing.sm,
    borderRadius: 8,
  },
  stat: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  divider: { width: 1, height: 16, backgroundColor: colors.border, marginHorizontal: spacing.md },
  statLabel: { color: colors.textSecondary, fontSize: 13 },
  statText: { color: colors.text, fontWeight: '700' },
  footer: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingTop: spacing.md },
  footerText: { color: colors.textSecondary, fontSize: 14 },
  empty: { textAlign: 'center', color: colors.textSecondary, padding: spacing.xl },
});

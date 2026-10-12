import { FlatList, StyleSheet, Text, View } from 'react-native';
import { MagnifyingGlass } from 'phosphor-react-native';
import { Screen } from '@/components/Screen';
import { StatePanel } from '@/components/StatePanel';
import { colors, spacing } from '@/theme/tokens';

const businesses = [
  { id: '1', name: 'Example Logistics Ltd', status: 'Active', plan: 'Growth' },
  { id: '2', name: 'SwiftDrop Nigeria', status: 'Review', plan: 'Starter' },
];

export function AdminBusinessesScreen() {
  return (
    <Screen>
      <Text style={styles.title}>Businesses</Text>
      <View style={styles.search}>
        <MagnifyingGlass size={20} color={colors.textSecondary} />
        <Text style={styles.searchText}>Search businesses</Text>
      </View>
      <FlatList
        data={businesses}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <View style={styles.rowText}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.plan}>{item.plan}</Text>
            </View>
            <Text style={[styles.status, item.status === 'Review' && styles.review]}>
              {item.status}
            </Text>
          </View>
        )}
        ListEmptyComponent={
          <StatePanel title="No businesses found" message="Try changing the search or filter." />
        }
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { color: colors.text, fontSize: 28, fontWeight: '800' },
  search: {
    minHeight: 48,
    marginTop: spacing.md,
    paddingHorizontal: spacing.md,
    borderRadius: 8,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  searchText: { color: colors.textSecondary, fontSize: 15 },
  list: { gap: spacing.sm, paddingTop: spacing.lg },
  row: {
    minHeight: 76,
    padding: spacing.md,
    borderRadius: 12,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowText: { flex: 1, gap: spacing.xs },
  name: { color: colors.text, fontSize: 16, fontWeight: '800' },
  plan: { color: colors.textSecondary, fontSize: 13 },
  status: { color: colors.success, fontSize: 13, fontWeight: '800' },
  review: { color: colors.warning },
});

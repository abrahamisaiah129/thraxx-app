import { FlatList, StyleSheet, Text, View } from 'react-native';
import { CaretRight, Package } from 'phosphor-react-native';
import { Screen } from '@/components/Screen';
import { StatePanel } from '@/components/StatePanel';
import { colors, spacing } from '@/theme/tokens';

const jobs = [
  { id: 'TRX-2048', destination: 'Victoria Island', status: 'Accepted' },
  { id: 'TRX-2051', destination: 'Yaba', status: 'Pending' },
];

export function RiderJobsScreen() {
  return (
    <Screen>
      <Text style={styles.title}>My jobs</Text>
      <Text style={styles.subtitle}>Assigned deliveries for today</Text>
      <FlatList
        data={jobs}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <View style={styles.icon}>
              <Package size={20} color={colors.primary} />
            </View>
            <View style={styles.rowText}>
              <Text style={styles.reference}>{item.id}</Text>
              <Text style={styles.destination}>{item.destination}</Text>
              <Text style={styles.status}>{item.status}</Text>
            </View>
            <CaretRight size={20} color={colors.textSecondary} />
          </View>
        )}
        ListEmptyComponent={
          <StatePanel title="No jobs yet" message="Assigned deliveries will appear here." />
        }
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { color: colors.text, fontSize: 28, fontWeight: '800' },
  subtitle: { color: colors.textSecondary, fontSize: 15, marginTop: spacing.xs },
  list: { gap: spacing.sm, paddingTop: spacing.lg },
  row: {
    minHeight: 88,
    padding: spacing.md,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  icon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primaryLight,
  },
  rowText: { flex: 1, gap: spacing.xs },
  reference: { color: colors.text, fontSize: 16, fontWeight: '800' },
  destination: { color: colors.textSecondary, fontSize: 14 },
  status: { color: colors.info, fontSize: 13, fontWeight: '700' },
});

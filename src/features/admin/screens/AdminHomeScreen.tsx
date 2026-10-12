import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Buildings, CaretRight, ChartLineUp, ShieldCheck, Ticket } from 'phosphor-react-native';
import { OfflineBanner } from '@/components/OfflineBanner';
import { Screen } from '@/components/Screen';
import { StatePanel } from '@/components/StatePanel';
import { colors, spacing } from '@/theme/tokens';

const metrics = [
  { label: 'Businesses', value: '128', icon: Buildings },
  { label: 'Active riders', value: '1,842', icon: ShieldCheck },
  { label: 'Open tickets', value: '24', icon: Ticket },
  { label: 'Deliveries today', value: '10,904', icon: ChartLineUp },
];

export function AdminHomeScreen() {
  return (
    <Screen scroll>
      <View style={styles.header}>
        <View>
          <Text style={styles.eyebrow}>TRAXX ADMIN</Text>
          <Text style={styles.title}>Platform overview</Text>
        </View>
        <Text style={styles.environment}>PRODUCTION</Text>
      </View>

      <OfflineBanner />

      <View style={styles.grid}>
        {metrics.map(({ label, value, icon: Icon }) => (
          <View key={label} style={styles.metric}>
            <Icon size={22} color={colors.primary} weight="bold" />
            <Text style={styles.metricValue}>{value}</Text>
            <Text style={styles.metricLabel}>{label}</Text>
          </View>
        ))}
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Needs attention</Text>
        <Text style={styles.caption}>Updated just now</Text>
      </View>

      <StatePanel
        title="2 businesses need review"
        message="Two new business applications are waiting for verification before activation."
        action={
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Review business applications"
            style={({ pressed }) => [styles.action, pressed && styles.pressed]}
          >
            <Text style={styles.actionText}>Review applications</Text>
            <CaretRight size={18} color={colors.primary} />
          </Pressable>
        }
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  eyebrow: { color: colors.primary, fontSize: 12, fontWeight: '800', letterSpacing: 1 },
  title: { color: colors.text, fontSize: 28, fontWeight: '800', marginTop: spacing.xs },
  environment: {
    color: colors.success,
    fontSize: 11,
    fontWeight: '800',
    backgroundColor: colors.successLight,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 8,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginTop: spacing.md,
  },
  metric: {
    width: '48%',
    minHeight: 112,
    padding: spacing.md,
    borderRadius: 12,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.xs,
  },
  metricValue: { color: colors.text, fontSize: 22, fontWeight: '800' },
  metricLabel: { color: colors.textSecondary, fontSize: 13 },
  sectionHeader: {
    marginTop: spacing.xl,
    marginBottom: spacing.sm,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: { color: colors.text, fontSize: 18, fontWeight: '800' },
  caption: { color: colors.textSecondary, fontSize: 12 },
  action: {
    minHeight: 44,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  actionText: { color: colors.primary, fontSize: 15, fontWeight: '800' },
  pressed: { opacity: 0.7 },
});

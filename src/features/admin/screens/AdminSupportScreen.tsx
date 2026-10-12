import { StyleSheet, Text, View } from 'react-native';
import { Screen } from '@/components/Screen';
import { StatePanel } from '@/components/StatePanel';
import { colors, spacing } from '@/theme/tokens';

export function AdminSupportScreen() {
  return (
    <Screen>
      <Text style={styles.title}>Support desk</Text>
      <Text style={styles.subtitle}>Resolve platform issues and business requests.</Text>
      <View style={styles.card}>
        <Text style={styles.count}>24</Text>
        <Text style={styles.label}>Open tickets</Text>
      </View>
      <StatePanel title="Ticket queue ready" message="Tickets are prioritised by severity and age." />
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { color: colors.text, fontSize: 28, fontWeight: '800' },
  subtitle: { color: colors.textSecondary, fontSize: 15, marginTop: spacing.xs },
  card: {
    marginVertical: spacing.lg,
    padding: spacing.md,
    borderRadius: 12,
    backgroundColor: colors.dangerLight,
    gap: spacing.xs,
  },
  count: { color: colors.danger, fontSize: 28, fontWeight: '800' },
  label: { color: colors.text, fontSize: 14, fontWeight: '700' },
});

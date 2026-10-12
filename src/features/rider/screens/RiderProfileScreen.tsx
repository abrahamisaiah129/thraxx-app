import { StyleSheet, Text, View } from 'react-native';
import { Screen } from '@/components/Screen';
import { colors, spacing } from '@/theme/tokens';

export function RiderProfileScreen() {
  return (
    <Screen>
      <Text style={styles.title}>Profile</Text>
      <View style={styles.card}>
        <Text style={styles.name}>Rider account</Text>
        <Text style={styles.detail}>Availability: Online</Text>
        <Text style={styles.detail}>Completed today: 4 deliveries</Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { color: colors.text, fontSize: 28, fontWeight: '800', marginBottom: spacing.lg },
  card: {
    padding: spacing.md,
    borderRadius: 12,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.sm,
  },
  name: { color: colors.text, fontSize: 18, fontWeight: '800' },
  detail: { color: colors.textSecondary, fontSize: 15 },
});

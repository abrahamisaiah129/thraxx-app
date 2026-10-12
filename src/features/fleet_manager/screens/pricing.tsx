import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SUBSCRIPTION_OPTIONS, fleetManagerData } from '@/data/fleetManagerData';
import { colors, spacing } from '@/theme/tokens';

/**
 * Presents the three B2B subscription options and the rider limit attached to each plan.
 */
export default function PricingPage() {
  const insets = useSafeAreaInsets();
  const currentPlan = fleetManagerData.tenantCompany.subscription;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={[styles.content, { paddingTop: insets.top + spacing.md }]}
    >
      <Text style={styles.eyebrow}>B2B SUBSCRIPTION</Text>
      <Text style={styles.title}>Pricing & rider limits</Text>
      <Text style={styles.description}>
        Choose the fleet size that matches your delivery operation. The rider limit controls how many
        riders this account can keep active.
      </Text>

      {SUBSCRIPTION_OPTIONS.map((plan) => {
        const isCurrent = plan.name === currentPlan;
        const limit = Number.isFinite(plan.riderLimit) ? `${plan.riderLimit} riders` : 'Custom fleet size';
        return (
          <View key={plan.name} style={[styles.card, isCurrent && styles.currentCard]}>
            <View style={styles.cardHeader}>
              <View>
                <Text style={styles.planName}>{plan.name}</Text>
                <Text style={styles.planDescription}>{plan.description}</Text>
              </View>
              {isCurrent ? <Text style={styles.currentLabel}>Current plan</Text> : null}
            </View>
            <Text style={styles.limit}>{limit}</Text>
            <Text style={styles.limitHint}>Maximum active riders</Text>
          </View>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  content: { padding: spacing.lg, paddingBottom: spacing.xl },
  eyebrow: { color: colors.primary, fontSize: 11, fontWeight: '800', letterSpacing: 1.1 },
  title: { color: colors.text, fontSize: 30, fontWeight: '800', marginTop: spacing.xs },
  description: { color: colors.textSecondary, fontSize: 15, lineHeight: 22, marginTop: spacing.sm, marginBottom: spacing.xl },
  card: { backgroundColor: '#fff', borderColor: colors.border, borderRadius: 16, borderWidth: 1, padding: spacing.md, marginBottom: spacing.md },
  currentCard: { borderColor: colors.primary, backgroundColor: colors.primaryLight },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', gap: spacing.sm },
  planName: { color: colors.text, fontSize: 18, fontWeight: '800' },
  planDescription: { color: colors.textSecondary, fontSize: 13, marginTop: 4 },
  currentLabel: { color: colors.primary, fontSize: 11, fontWeight: '800' },
  limit: { color: colors.primary, fontSize: 28, fontWeight: '800', marginTop: spacing.lg },
  limitHint: { color: colors.textSecondary, fontSize: 12, marginTop: 2 },
});

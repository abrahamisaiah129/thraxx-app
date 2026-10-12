import { Pressable, StyleSheet, Text, View } from 'react-native';
import { MapPin, Package, WarningCircle } from 'phosphor-react-native';
import { OfflineBanner } from '@/components/OfflineBanner';
import { Screen } from '@/components/Screen';
import { StatePanel } from '@/components/StatePanel';
import { colors, spacing } from '@/theme/tokens';

const activeDelivery = {
  reference: 'TRX-2048',
  pickup: 'Ikeja City Mall',
  destination: 'Victoria Island',
  status: 'Accepted',
};

export function RiderHomeScreen() {
  return (
    <Screen scroll>
      <View style={styles.header}>
        <View>
          <Text style={styles.eyebrow}>RIDER MODE</Text>
          <Text style={styles.title}>Today&apos;s delivery</Text>
        </View>
        <View style={styles.statusDot} accessibilityLabel="Online" />
      </View>

      <OfflineBanner />

      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <View style={styles.icon}>
            <Package size={24} color={colors.primary} weight="bold" />
          </View>
          <View style={styles.cardHeaderText}>
            <Text style={styles.reference}>{activeDelivery.reference}</Text>
            <Text style={styles.status}>● {activeDelivery.status}</Text>
          </View>
        </View>

        <View style={styles.route}>
          <View style={styles.routeLine} />
          <View style={styles.routeRow}>
            <MapPin size={22} color={colors.info} weight="fill" />
            <View>
              <Text style={styles.routeLabel}>Pick up</Text>
              <Text style={styles.routeValue}>{activeDelivery.pickup}</Text>
            </View>
          </View>
          <View style={styles.routeRow}>
            <MapPin size={22} color={colors.success} weight="fill" />
            <View>
              <Text style={styles.routeLabel}>Deliver to</Text>
              <Text style={styles.routeValue}>{activeDelivery.destination}</Text>
            </View>
          </View>
        </View>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Mark package as picked up"
          style={({ pressed }) => [styles.primaryAction, pressed && styles.pressed]}
        >
          <Text style={styles.primaryActionText}>Mark as picked up</Text>
        </Pressable>
        <Text style={styles.syncText}>Action is queued and will sync when online.</Text>
      </View>

      <StatePanel
        title="Need help?"
        message="Raise an SOS flag if you have a breakdown, accident, or cannot find the customer."
        action={
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Raise SOS flag"
            style={({ pressed }) => [styles.secondaryAction, pressed && styles.pressed]}
          >
            <WarningCircle size={20} color={colors.danger} />
            <Text style={styles.secondaryActionText}>Raise SOS flag</Text>
          </Pressable>
        }
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
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
    marginTop: spacing.xs,
  },
  statusDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: colors.success,
  },
  card: {
    marginTop: spacing.md,
    padding: spacing.md,
    borderRadius: 16,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.md,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  icon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primaryLight,
  },
  cardHeaderText: {
    gap: spacing.xs,
  },
  reference: {
    color: colors.text,
    fontSize: 20,
    fontWeight: '800',
  },
  status: {
    color: colors.info,
    fontSize: 15,
    fontWeight: '700',
  },
  route: {
    gap: spacing.md,
    position: 'relative',
  },
  routeLine: {
    position: 'absolute',
    left: 10,
    top: 24,
    bottom: 24,
    width: 2,
    backgroundColor: colors.border,
  },
  routeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  routeLabel: {
    color: colors.textSecondary,
    fontSize: 13,
  },
  routeValue: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '700',
    marginTop: spacing.xs,
  },
  primaryAction: {
    minHeight: 56,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
  },
  primaryActionText: {
    color: colors.background,
    fontSize: 17,
    fontWeight: '800',
  },
  syncText: {
    color: colors.textSecondary,
    fontSize: 13,
    textAlign: 'center',
  },
  secondaryAction: {
    minHeight: 48,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.danger,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  secondaryActionText: {
    color: colors.danger,
    fontSize: 15,
    fontWeight: '700',
  },
  pressed: {
    opacity: 0.75,
  },
});

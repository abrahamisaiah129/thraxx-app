import { StyleSheet, Text, View } from 'react-native';
import { WifiSlash } from 'phosphor-react-native';
import { colors, spacing } from '@/theme/tokens';

export function OfflineBanner() {
  return (
    <View style={styles.container} accessibilityRole="alert">
      <WifiSlash size={16} color={colors.warning} />
      <Text style={styles.text}>You&apos;re offline. Changes will sync when online.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: 40,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 8,
    backgroundColor: colors.warningLight,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  text: {
    flex: 1,
    color: colors.text,
    fontSize: 14,
    fontWeight: '600',
  },
});

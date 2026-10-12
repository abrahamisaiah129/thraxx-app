import type { Icon as PhosphorIcon } from 'phosphor-react-native';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '@/theme/tokens';

export type MetricTone = 'success' | 'info' | 'danger' | 'warning' | 'neutral';

// foreground = icon + accent, background = soft tint behind the icon
const TONES: Record<MetricTone, { fg: string; bg: string }> = {
  success: { fg: '#16a34a', bg: '#f0fdf4' },
  info: { fg: colors.primary, bg: colors.primaryLight },
  danger: { fg: '#dc2626', bg: '#fef2f2' },
  warning: { fg: '#d97706', bg: '#fffbeb' },
  neutral: { fg: '#6b7280', bg: '#f3f4f6' },
};

type MetricCardProps = {
  title: string;
  value: number | string;
  icon: PhosphorIcon;
  tone?: MetricTone;
  onPress?: () => void; // optional: makes the card tappable (e.g. open the Flags list)
};

export function MetricCard({ title, value, icon: Icon, tone = 'info', onPress }: MetricCardProps) {
  const { fg, bg } = TONES[tone];
  const display = typeof value === 'number' ? value.toLocaleString() : value;

  return (
    <Pressable
      onPress={onPress}
      disabled={!onPress}
      accessibilityRole={onPress ? 'button' : 'text'}
      accessibilityLabel={`${title}: ${display}`}
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
    >
      <View style={[styles.iconChip, { backgroundColor: bg }]}>
        <Icon size={22} weight="duotone" color={fg} />
      </View>

      <Text style={styles.value}>{display}</Text>
      <Text style={styles.title} numberOfLines={1}>
        {title}
      </Text>

      {/* Thin accent line at the bottom edge ties the card to its status color */}
      <View style={[styles.accent, { backgroundColor: fg }]} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexBasis: '47%', // two cards per row; gap in the parent handles spacing
    flexGrow: 1,
    padding: 16,
    paddingBottom: 18,
    backgroundColor: '#ffffff',
    borderRadius: 18,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#e5e7eb',
    overflow: 'hidden',

    ...Platform.select({
      web: {
        boxShadow: '0px 6px 18px rgba(17, 24, 39, 0.06)',
      } as any,
      default: {
        shadowColor: '#111827',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.06,
        shadowRadius: 18,
        elevation: 3,
      },
    }),
  },
  cardPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },
  iconChip: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  value: {
    fontSize: 32,
    lineHeight: 36,
    fontWeight: '700',
    color: '#111827',
    letterSpacing: -0.5,
    fontVariant: ['tabular-nums'], // digits keep a fixed width so numbers don't jitter on refresh
  },
  title: {
    marginTop: 2,
    fontSize: 13,
    fontWeight: '500',
    color: '#6b7280',
  },
  accent: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 3,
    opacity: 0.85,
  },
});

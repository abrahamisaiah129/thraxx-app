import { Platform, StyleSheet, Text, View } from 'react-native';
import { Button } from '../../../components/ui/Button';
import { dashboardData } from '../../../data/mockData';
import { colors, spacing } from '../../../theme/tokens';
import { ShieldCheck } from 'phosphor-react-native/src/icons/ShieldCheck';

export function OnboardingBanner() {
  if (dashboardData.onboarding.isFirstRiderAdded) return null;

  return (
    <View style={styles.banner}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>Welcome to Traxx! Add your first rider.</Text>
        <View style={styles.subtitleRow}>
          <ShieldCheck size={16} color="#475569" weight="fill" />
          <Text style={styles.subtitle}>
            Mandatory NIN verification is required before live tracking begins.
          </Text>
        </View>
      </View>
      <Button title="+ Add Rider" onPress={() => console.log('Navigate to add rider')} />
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    backgroundColor: '#ffffff', // White card
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
    // Soft shadow
    ...Platform.select({
      web: {
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.05)',
      } as any,
      default: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 12,
        elevation: 2,
      },
    }),
  },
  textContainer: { 
    flex: 1, 
    paddingRight: 16 
  },
  title: { 
    fontSize: 16, 
    fontWeight: '600', 
    color: colors.primary, 
    marginBottom: 6 
  },
  subtitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  subtitle: { 
    flex: 1,
    fontSize: 13, 
    lineHeight: 18, 
    color: '#475569' 
  },
});

import { Platform, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { Button } from '@/components/ui/Button';
import { fleetManagerData } from '@/data/fleetManagerData';
import { colors, spacing } from '@/theme/tokens';

export function OnboardingBanner() {
  const isFirstRiderAdded = fleetManagerData.riders && fleetManagerData.riders.length > 0;
  if (isFirstRiderAdded) return null;

  return (
    <View style={styles.banner}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>Welcome to Traxx! Add your first rider.</Text>
        <Text style={styles.subtitle}>Add riders to start assigning and tracking deliveries.</Text>
      </View>
      <Button title="+ Add Rider" onPress={() => router.push('/fleet_manager/add-rider')} />
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
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

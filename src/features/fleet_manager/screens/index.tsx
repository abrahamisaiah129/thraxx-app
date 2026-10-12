import { OfflineBanner } from '@/components/OfflineBanner';
import { DashboardWidgets } from '@/features/dashboard/components/DashboardWidgets';
import { OnboardingBanner } from '@/features/dashboard/components/OnboardingBanner';
import { QuickActions } from '@/features/dashboard/components/QuickActions';
import { ScrollView, StyleSheet, View } from 'react-native';

export default function WorkspaceDashboard() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Content wrapper with standard padding for the rest of the widgets */}
      <View style={styles.content}>
        <OfflineBanner />
        <OnboardingBanner />
        <QuickActions />
        <DashboardWidgets />
      </View>
    </ScrollView>
  );
}

// Styles specific to the Dashboard screen
const styles = StyleSheet.create({
  container: {
    flex: 1, // Take up available screen space
    backgroundColor: '#f9fafb', // Softer standard background for premium look
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 8, // Smaller padding since QuickMetrics has bottom margin
    paddingBottom: 24, // Extra breathing room at bottom
  },
});

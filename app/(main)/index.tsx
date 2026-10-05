import { StyleSheet, View, ScrollView } from 'react-native';
import { OnboardingBanner } from '../../src/features/dashboard/components/OnboardingBanner';
import { QuickActions } from '../../src/features/dashboard/components/QuickActions';
import { QuickMetrics } from '../../src/features/dashboard/components/QuickMetrics';
import { DashboardWidgets } from '../../src/features/dashboard/components/DashboardWidgets';
import { colors, spacing } from '../../src/theme/tokens';

export default function WorkspaceDashboard() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* QuickMetrics sits right at the top, full width */}
      <QuickMetrics />
      
      {/* Content wrapper with standard padding for the rest of the widgets */}
      <View style={styles.content}>
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

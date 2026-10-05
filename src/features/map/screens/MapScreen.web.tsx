// Import React for building the component
import React, { useState } from 'react';
// Import core layout and UI elements from React Native
import { View, Text, StyleSheet, Pressable } from 'react-native';
// Import global styling tokens
import { colors, spacing } from '../../../theme/tokens';
// Import ScreenContainer to ensure safe area padding and correct background
import { ScreenContainer } from '../../../components/layout/ScreenContainer';
// Import MapTrifold icon for the placeholder
import { MapTrifold } from 'phosphor-react-native/src/icons/MapTrifold';

/**
 * FilterPill Component
 * Renders a clickable status filter button for the map.
 */
function FilterPill({ label, isActive, onPress }: { label: string, isActive: boolean, onPress: () => void }) {
  return (
    <Pressable 
      onPress={onPress} 
      style={[styles.pill, isActive && styles.pillActive]}
    >
      <Text style={[styles.pillText, isActive && styles.pillTextActive]}>{label}</Text>
    </Pressable>
  );
}

/**
 * MapScreen Component (Web Fallback)
 * 
 * Displays a placeholder for the Live Map on web environments because
 * react-native-maps relies on native map SDKs that are not supported in the web bundler.
 */
export function MapScreen() {
  // State to hold the currently selected map filter
  const [activeFilter, setActiveFilter] = useState('All');

  // Define the filters available for the map
  const filters = ['All', 'On Trip', 'Idle', 'Flagged', 'Offline'];

  return (
    // ScreenContainer wraps the screen to handle safe area boundaries
    <ScreenContainer style={styles.container}>
      
      {/* Header section containing the Title and the Filter Pills */}
      <View style={styles.header}>
        <Text style={styles.title}>Live Fleet Map</Text>
        
        {/* Horizontal list of filter buttons */}
        <View style={styles.filtersContainer}>
          {filters.map(filter => (
            <FilterPill 
              key={filter} 
              label={filter} 
              isActive={activeFilter === filter} 
              onPress={() => setActiveFilter(filter)} 
            />
          ))}
        </View>
      </View>

      {/* MapView container fallback for Web */}
      <View style={[styles.mapContainer, styles.webPlaceholder]}>
        <MapTrifold size={48} color={colors.textSecondary} />
        <Text style={styles.placeholderText}>Interactive Map is only available on the mobile app.</Text>
        <Text style={styles.placeholderSubtext}>View this page on iOS or Android to see live rider tracking.</Text>
      </View>
    </ScreenContainer>
  );
}

// Styles specific to the MapScreen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    padding: spacing.lg,
    paddingBottom: spacing.md,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: spacing.md,
  },
  filtersContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  pill: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    backgroundColor: '#F3F4F6', // Light gray background
    borderWidth: 1,
    borderColor: 'transparent',
  },
  pillActive: {
    backgroundColor: colors.primaryLight,
    borderColor: colors.primary,
  },
  pillText: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  pillTextActive: {
    color: colors.primary,
    fontWeight: '600',
  },
  mapContainer: {
    flex: 1,
    position: 'relative',
    borderRadius: 16,
    marginHorizontal: spacing.lg,
    marginBottom: spacing.lg,
    overflow: 'hidden', // Ensures the map stays within border radius
  },
  webPlaceholder: {
    backgroundColor: '#e5e7eb', // gray-200
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  placeholderText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginTop: spacing.md,
    textAlign: 'center',
  },
  placeholderSubtext: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: spacing.sm,
    textAlign: 'center',
  },
});

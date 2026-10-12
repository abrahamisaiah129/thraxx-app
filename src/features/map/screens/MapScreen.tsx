// Import React for building the component
import React, { useState } from 'react';
// Import core layout and UI elements from React Native
import { View, Text, StyleSheet, Pressable } from 'react-native';
// Import MapView for rendering the interactive map
import MapView, { Marker, PROVIDER_DEFAULT } from 'react-native-maps';
// Import global styling tokens
import { colors, spacing } from '@/theme/tokens';
// Import ScreenContainer to ensure safe area padding and correct background
import { ScreenContainer } from '@/components/layout/ScreenContainer';

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
 * MapScreen Component
 * 
 * Displays the Live Map of the Traxx fleet.
 * Includes interactive status filters and a map view centered on Lagos.
 */
export function MapScreen() {
  // State to hold the currently selected map filter
  const [activeFilter, setActiveFilter] = useState('All');

  // Define the filters available for the map
  const filters = ['All', 'On Trip', 'Idle', 'Flagged', 'Offline'];

  // Define initial coordinates focused on Lagos, Nigeria
  const initialRegion = {
    latitude: 6.5244,
    longitude: 3.3792,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  };

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

      {/* MapView container */}
      <View style={styles.mapContainer}>
        {/* Render the actual Map */}
        <MapView 
          provider={PROVIDER_DEFAULT}
          style={styles.map} 
          initialRegion={initialRegion}
        >
          {/* Example Marker for a rider */}
          <Marker 
            coordinate={{ latitude: 6.5244, longitude: 3.3792 }} 
            title="Rider R001"
            description="Status: On Trip"
            pinColor={colors.status.onTrip}
          />
        </MapView>
        
        {/* Floating overlay showing the last refresh time */}
        <View style={styles.liveIndicator}>
          <Text style={styles.liveText}>Updated just now</Text>
        </View>
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
  map: {
    width: '100%',
    height: '100%',
  },
  liveIndicator: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  liveText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  }
});

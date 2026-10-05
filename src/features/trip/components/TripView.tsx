import React, { useState } from 'react';
import { View, Text, StyleSheet, Linking, Platform } from 'react-native';
import MapView, { Marker } from 'react-native-maps'; // Will be installed by orchestrator
import { Assignment } from '../../../types/domain';
import { Button } from '../../../components/ui/Button';
import { Card } from '../../../components/ui/Card';
import { colors, spacing } from '../../../theme/tokens';

type TripStep = 'navigating_to_pickup' | 'arrived_at_pickup' | 'picked_up' | 'navigating_to_dropoff' | 'arrived_at_dropoff';

interface TripViewProps {
  assignment: Assignment;
  onCompleteTrip: () => void;
  onUpdateStatus?: (status: Assignment['status']) => void;
  // TODO: Add repo function for step updates if added to domain
}

export const TripView = ({ assignment, onCompleteTrip, onUpdateStatus }: TripViewProps) => {
  const [step, setStep] = useState<TripStep>('navigating_to_pickup');
  const [eta, setEta] = useState<string>('12 mins');

  const handleNavigate = () => {
    // Deep link to maps app
    const location = step.includes('pickup') ? assignment.pickupLocation : assignment.dropoffLocation;
    const url = Platform.select({
      ios: `maps:0,0?q=${location}`,
      android: `geo:0,0?q=${location}`,
      default: `https://maps.google.com/?q=${location}`
    });
    Linking.openURL(url).catch(err => console.error('An error occurred', err));
  };

  const handleNextStep = () => {
    if (step === 'navigating_to_pickup') {
      setStep('arrived_at_pickup');
      // If domain allows, update status
    } else if (step === 'arrived_at_pickup') {
      setStep('picked_up');
      onUpdateStatus?.('in_progress'); 
    } else if (step === 'picked_up') {
      setStep('navigating_to_dropoff');
      setEta('25 mins');
    } else if (step === 'navigating_to_dropoff') {
      setStep('arrived_at_dropoff');
    } else if (step === 'arrived_at_dropoff') {
      onCompleteTrip();
    }
  };

  const getStepTitle = () => {
    switch (step) {
      case 'navigating_to_pickup': return 'Navigating to Pickup';
      case 'arrived_at_pickup': return 'Arrived at Pickup';
      case 'picked_up': return 'Passenger Picked Up';
      case 'navigating_to_dropoff': return 'Navigating to Drop-off';
      case 'arrived_at_dropoff': return 'Arrived at Drop-off';
    }
  };

  const getButtonTitle = () => {
    switch (step) {
      case 'navigating_to_pickup': return 'Arrived at Pickup';
      case 'arrived_at_pickup': return 'Confirm Picked Up';
      case 'picked_up': return 'Start Drop-off Navigation';
      case 'navigating_to_dropoff': return 'Arrived at Drop-off';
      case 'arrived_at_dropoff': return 'Complete Trip';
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        {/* Mock region for MapView */}
        <MapView 
          style={styles.map}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker coordinate={{ latitude: 37.78825, longitude: -122.4324 }} title="Destination" />
        </MapView>
      </View>
      
      <Card style={styles.card}>
        <View style={styles.infoRow}>
          <Text style={styles.stepTitle}>{getStepTitle()}</Text>
          <Text style={styles.etaText}>ETA: {eta}</Text>
        </View>

        <View style={styles.addressContainer}>
          <Text style={styles.addressLabel}>
            {step.includes('pickup') ? 'Pickup Location' : 'Drop-off Location'}
          </Text>
          <Text style={styles.addressText}>
            {step.includes('pickup') ? assignment.pickupLocation : assignment.dropoffLocation}
          </Text>
        </View>

        <View style={styles.actionRow}>
          <View style={styles.navButton}>
            <Button 
              title="Navigate" 
              onPress={handleNavigate} 
              variant="secondary"
            />
          </View>
          <View style={styles.stepButton}>
            <Button 
              title={getButtonTitle()} 
              onPress={handleNextStep} 
            />
          </View>
        </View>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  mapContainer: {
    flex: 1,
    backgroundColor: colors.border, // Fallback color
  },
  map: {
    ...StyleSheet.absoluteFill,
  },
  card: {
    margin: spacing.md,
    marginTop: -spacing.xl, // Overlap map
    padding: spacing.md,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  stepTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  etaText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,
  },
  addressContainer: {
    marginBottom: spacing.lg,
  },
  addressLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  addressText: {
    fontSize: 16,
    color: colors.text,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  navButton: {
    flex: 1,
  },
  stepButton: {
    flex: 2,
  },
});

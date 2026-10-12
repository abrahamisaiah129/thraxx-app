import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '@/theme/tokens';
import { fleetManagerData } from '@/data/fleetManagerData';
import { useLiveFleet } from '@/features/fleet_manager/hooks/useLiveFleet';

// Safely import MapView only on native platforms
let MapView: any = null;
let Marker: any = null;
if (Platform.OS !== 'web') {
  const Maps = require('react-native-maps');
  MapView = Maps.default;
  Marker = Maps.Marker;
}

export default function MapScreen() {
  const insets = useSafeAreaInsets();
  const vehicles = useLiveFleet();
  const assignments = fleetManagerData.Assignments;

  if (Platform.OS === 'web') {
    return (
      <View style={[styles.container, { paddingTop: insets.top, justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={styles.webText}>Map is not supported on web preview.</Text>
        <Text style={styles.webSub}>Please view on an iOS or Android simulator.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 6.5244,
          longitude: 3.3792,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
      >
        {vehicles.map((v) => (
          <Marker
            key={v.vehicleId}
            coordinate={v.gpsCoordinates}
            title={v.currentRiderId}
            description={`${v.licensePlateNumber} • ${v.telemetryStatus.toUpperCase()}`}
          />
        ))}
        {assignments.map((assignment) => (
          <React.Fragment key={assignment.assignmentId}>
            <Marker
              coordinate={assignment.startCoordinates}
              title={`${assignment.waybillTrackingNumber} pickup`}
              pinColor={colors.primary}
            />
            <Marker
              coordinate={assignment.finishCoordinates}
              title={`${assignment.waybillTrackingNumber} delivery`}
              pinColor={colors.success}
            />
          </React.Fragment>
        ))}
      </MapView>

      {/* Floating Header */}
      <View style={[styles.headerFloating, { top: insets.top + 16 }]}>
        <Text style={styles.title}>Live Fleet Map</Text>
        <View style={styles.badge}>
          <View style={styles.pulseDot} />
          <Text style={styles.badgeText}>{vehicles.length} Active</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  headerFloating: {
    position: 'absolute',
    left: 16,
    right: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.text,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primaryLight,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 99,
    gap: 6,
  },
  pulseDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.primary,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.primary,
  },
  webText: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  webSub: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 8,
  }
});

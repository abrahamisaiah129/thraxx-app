import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Location from 'expo-location';

export function GpsOffWarning() {
  const [gpsOff, setGpsOff] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const checkGps = async () => {
      const providerStatus = await Location.getProviderStatusAsync();
      if (isMounted) {
        setGpsOff(!providerStatus.locationServicesEnabled);
      }
    };
    
    checkGps();
    const interval = setInterval(checkGps, 5000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  if (!gpsOff) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>GPS is turned off. Please enable it for tracking.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffaa00',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  text: {
    color: '#000',
    fontWeight: 'bold',
  },
});

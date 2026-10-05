import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import * as Battery from 'expo-battery';

interface Props {
  onComplete: () => void;
}

export function BatteryOnboarding({ onComplete }: Props) {
  const [isOptimized, setIsOptimized] = useState<boolean | null>(null);

  useEffect(() => {
    let isMounted = true;
    const checkBattery = async () => {
      // In a real app, this might check for actual battery optimization status
      // expo-battery provides Battery.isLowPowerModeEnabledAsync()
      const lowPowerMode = await Battery.isLowPowerModeEnabledAsync();
      if (isMounted) {
        setIsOptimized(lowPowerMode);
      }
    };
    
    checkBattery();
    return () => { isMounted = false; };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Battery Optimization</Text>
      <Text style={styles.description}>
        To ensure background tracking works reliably, please disable battery optimization or low power mode for this app.
      </Text>
      {isOptimized && (
        <Text style={styles.warning}>
          Low Power Mode is currently enabled. Please turn it off in your device settings.
        </Text>
      )}
      <Button title="I have done this" onPress={onComplete} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  warning: {
    fontSize: 14,
    color: 'red',
    marginBottom: 20,
    textAlign: 'center',
  }
});

import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import * as Location from 'expo-location';

interface Props {
  onComplete: () => void;
}

export function PermissionFlow({ onComplete }: Props) {
  const [step, setStep] = useState(1);

  const requestLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission needed', 'Location permission is required for the app to function.');
        return;
      }
      
      const { status: bgStatus } = await Location.requestBackgroundPermissionsAsync();
      if (bgStatus !== 'granted') {
        Alert.alert('Background Permission', 'Background location helps us track your route even when the app is in background.');
      }
      
      setStep(2);
    } catch (e) {
      console.warn(e);
    }
  };

  const finishFlow = () => {
    onComplete();
  };

  if (step === 1) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Location Access</Text>
        <Text style={styles.description}>
          We need location access to track your route during deliveries.
        </Text>
        <Button title="Grant Location" onPress={requestLocation} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>All Set!</Text>
      <Text style={styles.description}>
        You have granted the necessary permissions.
      </Text>
      <Button title="Continue" onPress={finishFlow} />
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
  }
});

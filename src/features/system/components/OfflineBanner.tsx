import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Network from 'expo-network';

export function OfflineBanner() {
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const checkNetwork = async () => {
      const state = await Network.getNetworkStateAsync();
      if (isMounted) {
        setIsOffline(state.isConnected === false);
      }
    };
    
    checkNetwork();
    const interval = setInterval(checkNetwork, 5000); // Check every 5s

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  if (!isOffline) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>You are currently offline.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ff4444',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

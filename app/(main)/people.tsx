import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { colors, spacing } from '../../src/theme/tokens';

export default function PeopleDashboard() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>People Dashboard</Text>
      
      <Link href="/riders" style={styles.link}>Riders Directory</Link>
      <Link href="/shifts" style={styles.link}>Shifts & Sign Offs</Link>
      <Link href="/vendors" style={styles.link}>Vendors</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.lg,
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: spacing.lg,
    color: colors.text,
  },
  link: {
    fontSize: 18,
    color: colors.primary,
    marginBottom: spacing.md,
    padding: spacing.sm,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 8,
    textAlign: 'center',
  }
});

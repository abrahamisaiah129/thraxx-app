import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { colors, spacing } from '../../src/theme/tokens';

export default function SettingsDashboard() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings & Global Tools</Text>
      
      <Link href="/profile" style={styles.link}>Company Profile</Link>
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

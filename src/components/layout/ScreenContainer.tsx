import React from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { colors, spacing } from '../../theme/tokens';

export const ScreenContainer = ({ children, style }: { children: React.ReactNode, style?: any }) => {
  return (
    <SafeAreaView style={[styles.safeArea, style]}>
      <View style={styles.container}>
        {children}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    padding: spacing.md,
  },
});

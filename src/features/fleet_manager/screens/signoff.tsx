import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useShiftStore, selectShiftState } from '@/store/useShiftStore';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { ScreenContainer } from '@/components/layout/ScreenContainer';
import { colors, spacing } from '@/theme/tokens';

export default function SignOffView() {
  const shiftState = useShiftStore(selectShiftState);
  const initiateSignOff = useShiftStore(state => state.initiateSignOff);
  const completeSignOff = useShiftStore(state => state.completeSignOff);
  const resetShift = useShiftStore(state => state.resetShift);

  return (
    <ScreenContainer>
      <Card>
        <Text style={styles.title}>Sign-off Status</Text>
        <Text style={styles.status}>Current State: {shiftState}</Text>
        
        <View style={styles.actions}>
          {shiftState === 'on_shift' && (
            <Button
              title="Request Sign-Off"
              onPress={initiateSignOff}
              variant="primary"
            />
          )}

          {shiftState === 'signoff_pending' && (
            <>
              <Text style={styles.message}>
                Your sign-off request is pending approval from dispatch.
              </Text>
              <Button
                title="Simulate Approval"
                onPress={completeSignOff}
                variant="secondary"
              />
            </>
          )}

          {shiftState === 'signed_off' && (
            <>
              <Text style={styles.message}>
                You have been successfully signed off.
              </Text>
              <Button
                title="Acknowledge (Reset)"
                onPress={resetShift}
                variant="secondary"
              />
            </>
          )}

          {(shiftState === 'off_shift' || shiftState === 'trip_active') && (
            <Text style={styles.message}>
              Sign-off is not available in the current state.
            </Text>
          )}
        </View>
      </Card>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: spacing.md,
    color: colors.text,
  },
  status: {
    fontSize: 16,
    marginBottom: spacing.lg,
    color: colors.textSecondary,
  },
  actions: {
    gap: spacing.md,
  },
  message: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: spacing.md,
    textAlign: 'center',
  },
});

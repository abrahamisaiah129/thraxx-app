import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, borderRadius } from '@/theme/tokens';

type StatusType = 'onTrip' | 'idle' | 'flagged' | 'offline';

interface StatusChipProps {
  status: StatusType;
}

export const StatusChip = ({ status }: StatusChipProps) => {
  const getStatusColor = () => {
    return colors.status[status] || colors.status.offline;
  };

  const getStatusLabel = () => {
    switch (status) {
      case 'onTrip': return 'On Trip';
      case 'idle': return 'Idle';
      case 'flagged': return 'Flagged';
      case 'offline': return 'Offline';
      default: return 'Unknown';
    }
  };

  return (
    <View style={[styles.chip, { backgroundColor: getStatusColor() }]}>
      <Text style={styles.text}>{getStatusLabel()}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
    alignSelf: 'flex-start',
  },
  text: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
});

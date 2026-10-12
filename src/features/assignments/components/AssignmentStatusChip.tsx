import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, borderRadius } from '@/theme/tokens';
import { AssignmentStatus } from '@/types/domain';

interface AssignmentStatusChipProps {
  status: AssignmentStatus;
}

export const AssignmentStatusChip = ({ status }: AssignmentStatusChipProps) => {
  const getStatusColor = () => {
    switch (status) {
      case 'pending': return colors.status.idle;
      case 'accepted': return colors.primary;
      case 'in_progress': return colors.status.onTrip;
      case 'completed': return colors.status.offline;
      case 'cancelled': return colors.status.flagged;
      default: return colors.status.offline;
    }
  };

  const getStatusLabel = () => {
    switch (status) {
      case 'pending': return 'Pending';
      case 'accepted': return 'Accepted';
      case 'in_progress': return 'In Progress';
      case 'completed': return 'Completed';
      case 'cancelled': return 'Cancelled';
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

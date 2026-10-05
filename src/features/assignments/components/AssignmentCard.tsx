import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Card } from '../../../components/ui/Card';
import { Assignment } from '../../../types/domain';
import { AssignmentStatusChip } from './AssignmentStatusChip';
import { colors, spacing } from '../../../theme/tokens';

interface AssignmentCardProps {
  assignment: Assignment;
  onPress: (id: string) => void;
}

export const AssignmentCard = ({ assignment, onPress }: AssignmentCardProps) => {
  return (
    <TouchableOpacity onPress={() => onPress(assignment.id)} activeOpacity={0.7} style={styles.container}>
      <Card>
        <View style={styles.header}>
          <Text style={styles.passengerName}>{assignment.passengerName}</Text>
          <AssignmentStatusChip status={assignment.status} />
        </View>
        <View style={styles.details}>
          <Text style={styles.locationLabel}>Pickup:</Text>
          <Text style={styles.locationText}>{assignment.pickupLocation}</Text>
        </View>
        <View style={styles.details}>
          <Text style={styles.locationLabel}>Dropoff:</Text>
          <Text style={styles.locationText}>{assignment.dropoffLocation}</Text>
        </View>
        <View style={styles.footer}>
          <Text style={styles.timeText}>
            {new Date(assignment.scheduledTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </Text>
        </View>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  passengerName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  details: {
    marginBottom: spacing.sm,
  },
  locationLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 2,
  },
  locationText: {
    fontSize: 14,
    color: colors.text,
  },
  footer: {
    marginTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: spacing.sm,
    alignItems: 'flex-end',
  },
  timeText: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: '500',
  },
});

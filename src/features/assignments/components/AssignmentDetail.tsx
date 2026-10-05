import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Assignment } from '../../../types/domain';
import { AssignmentStatusChip } from './AssignmentStatusChip';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { colors, spacing } from '../../../theme/tokens';

interface AssignmentDetailProps {
  assignment: Assignment;
  onAccept?: () => void;
  onComplete?: () => void;
  isLoading?: boolean;
}

export const AssignmentDetail = ({ assignment, onAccept, onComplete, isLoading }: AssignmentDetailProps) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Assignment Details</Text>
        <AssignmentStatusChip status={assignment.status} />
      </View>

      <Card>
        <View style={styles.section}>
          <Text style={styles.label}>Passenger</Text>
          <Text style={styles.value}>{assignment.passengerName}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Scheduled Time</Text>
          <Text style={styles.value}>
            {new Date(assignment.scheduledTime).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Pickup Location</Text>
          <Text style={styles.value}>{assignment.pickupLocation}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Dropoff Location</Text>
          <Text style={styles.value}>{assignment.dropoffLocation}</Text>
        </View>
      </Card>

      <View style={styles.actions}>
        {assignment.status === 'pending' && onAccept && (
          <Button title="Accept Assignment" onPress={onAccept} isLoading={isLoading} />
        )}
        {assignment.status === 'in_progress' && onComplete && (
          <Button title="Complete Assignment" onPress={onComplete} isLoading={isLoading} />
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
  },
  section: {
    marginBottom: spacing.md,
  },
  label: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    color: colors.text,
  },
  actions: {
    marginTop: spacing.xl,
  },
});

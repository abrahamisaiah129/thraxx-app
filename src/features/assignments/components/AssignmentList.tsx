import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Assignment } from '../../../types/domain';
import { AssignmentCard } from './AssignmentCard';
import { EmptyState } from '../../../components/feedback/EmptyState';
import { spacing } from '../../../theme/tokens';

interface AssignmentListProps {
  assignments: Assignment[];
  onAssignmentPress: (id: string) => void;
  onRefresh?: () => void;
  refreshing?: boolean;
}

export const AssignmentList = ({ assignments, onAssignmentPress, onRefresh, refreshing }: AssignmentListProps) => {
  if (assignments.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <EmptyState title="No Assignments" message="You don't have any assignments at the moment." />
      </View>
    );
  }

  return (
    <FlatList
      data={assignments}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <AssignmentCard assignment={item} onPress={onAssignmentPress} />
      )}
      contentContainerStyle={styles.listContainer}
      onRefresh={onRefresh}
      refreshing={refreshing}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    padding: spacing.md,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: spacing.xl,
  },
});

import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { colors, spacing } from '../../theme/tokens';

interface Column {
  key: string;
  title: string;
  flex?: number;
}

interface TableProps {
  columns: Column[];
  data: any[];
}

export const Table: React.FC<TableProps> = ({ columns, data }) => {
  const renderHeader = () => (
    <View style={styles.headerRow}>
      {columns.map(col => (
        <Text key={`header-${col.key}`} style={[styles.headerText, { flex: col.flex || 1 }]}>
          {col.title}
        </Text>
      ))}
    </View>
  );

  const renderRow = ({ item }: { item: any }) => (
    <View style={styles.row}>
      {columns.map(col => (
        <Text key={`cell-${item.id || Math.random()}-${col.key}`} style={[styles.cellText, { flex: col.flex || 1 }]}>
          {item[col.key]}
        </Text>
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      {renderHeader()}
      <FlatList
        data={data}
        renderItem={renderRow}
        keyExtractor={(item, index) => item.id ? item.id.toString() : index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    overflow: 'hidden',
  },
  headerRow: {
    flexDirection: 'row',
    backgroundColor: '#F3F4F6',
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerText: {
    fontWeight: 'bold',
    color: colors.textSecondary,
    fontSize: 12,
  },
  row: {
    flexDirection: 'row',
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    backgroundColor: colors.background,
  },
  cellText: {
    color: colors.text,
    fontSize: 14,
  }
});

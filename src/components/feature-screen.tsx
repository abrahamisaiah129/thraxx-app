import React, { useMemo, useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { Plus, DownloadSimple, Funnel, MagnifyingGlass } from 'phosphor-react-native';
import { borderRadius, colors, spacing } from '@/theme/tokens';

export type FeatureRow = {
  title: string;
  subtitle: string;
  status?: string;
  value?: string;
  detail?: string;
};

type FeatureScreenProps = {
  title: string;
  description: string;
  actionLabel?: string;
  searchPlaceholder?: string;
  filters?: string[];
  rows: FeatureRow[];
  summary?: Array<{ label: string; value: string }>;
  emptyMessage?: string;
};

// Renders a consistent placeholder page for features that are backed by local mock data.
export function FeatureScreen({
  title,
  description,
  actionLabel,
  searchPlaceholder = 'Search mock records',
  filters = ['All'],
  rows,
  summary,
  emptyMessage = 'No mock records match your filters.',
}: FeatureScreenProps) {
  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState(filters[0]);

  // Filters the local rows so every placeholder page feels interactive without an API.
  const visibleRows = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return rows.filter((row) => {
      const matchesQuery =
        !normalizedQuery ||
        `${row.title} ${row.subtitle} ${row.status ?? ''} ${row.detail ?? ''}`
          .toLowerCase()
          .includes(normalizedQuery);
      const matchesFilter =
        activeFilter === 'All' ||
        row.status?.toLowerCase().includes(activeFilter.toLowerCase()) ||
        row.detail?.toLowerCase().includes(activeFilter.toLowerCase());
      return matchesQuery && matchesFilter;
    });
  }, [activeFilter, query, rows]);

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <View style={styles.headerCopy}>
          <Text style={styles.eyebrow}>TRAXX WORKSPACE</Text>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
        </View>
        {actionLabel ? (
          <Pressable style={styles.primaryButton} accessibilityRole="button">
            <Plus size={17} color="#fff" weight="bold" />
            <Text style={styles.primaryButtonText}>{actionLabel}</Text>
          </Pressable>
        ) : null}
      </View>

      {summary ? (
        <View style={styles.summaryGrid}>
          {summary.map((item) => (
            <View key={item.label} style={styles.summaryCard}>
              <Text style={styles.summaryValue}>{item.value}</Text>
              <Text style={styles.summaryLabel}>{item.label}</Text>
            </View>
          ))}
        </View>
      ) : null}

      <View style={styles.toolbar}>
        <View style={styles.searchBox}>
          <MagnifyingGlass size={18} color={colors.textSecondary} />
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder={searchPlaceholder}
            placeholderTextColor={colors.textSecondary}
            style={styles.searchInput}
            accessibilityLabel={searchPlaceholder}
          />
        </View>
        <Pressable style={styles.iconButton} accessibilityRole="button">
          <Funnel size={18} color={colors.primary} />
        </Pressable>
        <Pressable style={styles.iconButton} accessibilityRole="button">
          <DownloadSimple size={18} color={colors.primary} />
        </Pressable>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filters}>
        {filters.map((filter) => (
          <Pressable
            key={filter}
            onPress={() => setActiveFilter(filter)}
            style={[styles.filter, activeFilter === filter && styles.filterActive]}
            accessibilityRole="button"
            accessibilityState={{ selected: activeFilter === filter }}
          >
            <Text style={[styles.filterText, activeFilter === filter && styles.filterTextActive]}>
              {filter}
            </Text>
          </Pressable>
        ))}
      </ScrollView>

      <View style={styles.listCard}>
        <View style={styles.listHeader}>
          <Text style={styles.listTitle}>Mock data preview</Text>
          <Text style={styles.listCount}>{visibleRows.length} records</Text>
        </View>
        {visibleRows.length ? (
          visibleRows.map((row) => (
            <View key={`${row.title}-${row.subtitle}`} style={styles.row}>
              <View style={styles.rowCopy}>
                <Text style={styles.rowTitle}>{row.title}</Text>
                <Text style={styles.rowSubtitle}>{row.subtitle}</Text>
                {row.detail ? <Text style={styles.rowDetail}>{row.detail}</Text> : null}
              </View>
              <View style={styles.rowMeta}>
                {row.value ? <Text style={styles.rowValue}>{row.value}</Text> : null}
                {row.status ? <Text style={styles.status}>{row.status}</Text> : null}
              </View>
            </View>
          ))
        ) : (
          <Text style={styles.empty}>{emptyMessage}</Text>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#F9FAFB' },
  content: { padding: spacing.lg, paddingBottom: spacing.xl },
  header: { gap: spacing.md, marginBottom: spacing.lg },
  headerCopy: { gap: spacing.xs },
  eyebrow: { color: colors.primary, fontSize: 11, fontWeight: '800', letterSpacing: 1.2 },
  title: { color: colors.text, fontSize: 28, fontWeight: '800', letterSpacing: -0.5 },
  description: { color: colors.textSecondary, fontSize: 14, lineHeight: 20 },
  primaryButton: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: colors.primary,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: 11,
  },
  primaryButtonText: { color: '#fff', fontWeight: '700', fontSize: 14 },
  summaryGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, marginBottom: spacing.lg },
  summaryCard: {
    minWidth: '47%',
    flexGrow: 1,
    backgroundColor: '#fff',
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
  },
  summaryValue: { color: colors.text, fontSize: 23, fontWeight: '800' },
  summaryLabel: { color: colors.textSecondary, fontSize: 12, marginTop: spacing.xs },
  toolbar: { flexDirection: 'row', gap: spacing.sm, marginBottom: spacing.md },
  searchBox: {
    flex: 1,
    minHeight: 44,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: '#fff',
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.md,
  },
  searchInput: { flex: 1, color: colors.text, fontSize: 14 },
  iconButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primaryLight,
    borderRadius: borderRadius.md,
  },
  filters: { gap: spacing.sm, paddingBottom: spacing.md },
  filter: {
    backgroundColor: '#fff',
    borderRadius: borderRadius.full,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  filterActive: { backgroundColor: colors.primaryLight, borderColor: colors.primary },
  filterText: { color: colors.textSecondary, fontSize: 13, fontWeight: '600' },
  filterTextActive: { color: colors.primary },
  listCard: {
    backgroundColor: '#fff',
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.md,
    backgroundColor: colors.primaryLight,
  },
  listTitle: { color: colors.text, fontSize: 15, fontWeight: '800' },
  listCount: { color: colors.primary, fontSize: 12, fontWeight: '700' },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.md,
    padding: spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  rowCopy: { flex: 1, gap: 3 },
  rowTitle: { color: colors.text, fontSize: 15, fontWeight: '700' },
  rowSubtitle: { color: colors.textSecondary, fontSize: 13 },
  rowDetail: { color: colors.textSecondary, fontSize: 12, marginTop: 3 },
  rowMeta: { alignItems: 'flex-end', gap: 4 },
  rowValue: { color: colors.text, fontSize: 15, fontWeight: '800' },
  status: { color: colors.primary, fontSize: 12, fontWeight: '700' },
  empty: { color: colors.textSecondary, padding: spacing.lg, textAlign: 'center' },
});

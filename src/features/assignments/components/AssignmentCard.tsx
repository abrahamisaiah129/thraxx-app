import { Card } from '@/components/ui/Card';
import { colors, spacing } from '@/theme/tokens';
import { Link } from 'expo-router';
import { memo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { AssignmentStatusChip } from './AssignmentStatusChip';

type Props = {
  assignment: {
    assignmentId: string;
    waybillTrackingNumber: string;
    customerName: string;
    pickupAddress: string;
    deliveryAddress: string;
    deliveryStatus: string;
    openFlagCount: number;
  };
};

const place = (address: string) => address.split(',')[0];

export const AssignmentCard = memo(function AssignmentCard({ assignment: a }: Props) {
  return (
    <Link
      href={{
        pathname: '/fleet_manager/assignments',
        params: { id: a.assignmentId },
      }}
      asChild
    >
      <Pressable
        style={({ pressed }) => [styles.container, pressed && styles.pressed]}
        accessibilityRole="link"
        accessibilityLabel={`${a.waybillTrackingNumber}, ${a.customerName}, ${a.deliveryStatus}`}
      >
        <Card>
          <View style={styles.row}>
            <View style={styles.titleWrap}>
              <Text style={styles.waybill} numberOfLines={1}>
                {a.waybillTrackingNumber}
              </Text>
              {a.openFlagCount > 0 && <Text style={styles.flag}>⚑ {a.openFlagCount}</Text>}
            </View>
            <AssignmentStatusChip
              status={a.deliveryStatus as Parameters<typeof AssignmentStatusChip>[0]['status']}
            />
          </View>

          <Text style={styles.customer} numberOfLines={1}>
            {a.customerName}
          </Text>
          <Text style={styles.route} numberOfLines={1}>
            {place(a.pickupAddress)} → {place(a.deliveryAddress)}
          </Text>
        </Card>
      </Pressable>
    </Link>
  );
});

const styles = StyleSheet.create({
  container: { marginBottom: spacing.sm },
  pressed: { opacity: 0.7 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  titleWrap: { flexDirection: 'row', alignItems: 'center', flexShrink: 1 },
  waybill: { fontSize: 14, fontWeight: '600', color: colors.text },
  flag: { fontSize: 12, fontWeight: '600', color: colors.danger, marginLeft: spacing.sm },
  customer: { fontSize: 13, color: colors.text, marginTop: 2 },
  route: { fontSize: 12, color: colors.textSecondary, marginTop: 2 },
});

import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { CaretLeft, CheckCircle, UserCircle } from 'phosphor-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { fleetManagerData } from '@/data/fleetManagerData';
import { colors, spacing } from '@/theme/tokens';
import { normalizeNigerianPhone } from '@/features/fleet_manager/utils/phone';

/**
 * Creates a readable tracking identifier for a new B2B delivery booking.
 */
function createWaybill(): string {
  return `TRX-${Date.now().toString().slice(-6)}`;
}

/**
 * Renders the delivery booking form and allows the fleet manager to assign a rider immediately.
 */
export default function BookingPage() {
  const insets = useSafeAreaInsets();
  const availableRiders = useMemo(
    () => fleetManagerData.riders.filter((rider) => rider.status === 'available'),
    [],
  );
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [pickupAddress, setPickupAddress] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [selectedRider, setSelectedRider] = useState<string | null>(null);
  const [error, setError] = useState('');

  /**
   * Validates the form, normalizes the customer phone, and confirms the generated booking.
   */
  function handleCreateBooking() {
    const normalizedPhone = normalizeNigerianPhone(customerPhone);
    if (!customerName.trim() || !pickupAddress.trim() || !deliveryAddress.trim()) {
      setError('Customer, pickup, and delivery details are required.');
      return;
    }
    if (!normalizedPhone) {
      setError('Enter a valid Nigerian phone number, for example 08031234567.');
      return;
    }

    const waybill = createWaybill();
    const assignmentMode = selectedRider ? 'assigned to the selected rider' : 'sent to dispatch';
    Alert.alert('Booking created', `${waybill} was ${assignmentMode}.`);
    router.back();
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={[styles.content, { paddingTop: insets.top + spacing.md }]}
      keyboardShouldPersistTaps="handled"
    >
      <Pressable onPress={() => router.back()} style={styles.backButton} accessibilityLabel="Go back">
        <CaretLeft size={24} color={colors.text} />
      </Pressable>
      <Text style={styles.title}>Create delivery</Text>
      <Text style={styles.description}>
        Create a waybill for a business customer. Choose a rider now for direct dispatch, or leave it
        unassigned for later allocation.
      </Text>

      <Text style={styles.label}>Customer name</Text>
      <TextInput value={customerName} onChangeText={setCustomerName} style={styles.input} placeholder="Customer or company name" />

      <Text style={styles.label}>Customer phone</Text>
      <TextInput
        value={customerPhone}
        onChangeText={setCustomerPhone}
        style={styles.input}
        placeholder="08031234567"
        keyboardType="phone-pad"
      />

      <Text style={styles.label}>Pickup address</Text>
      <TextInput value={pickupAddress} onChangeText={setPickupAddress} style={styles.input} placeholder="Ikeja, Lagos" />

      <Text style={styles.label}>Delivery address</Text>
      <TextInput value={deliveryAddress} onChangeText={setDeliveryAddress} style={styles.input} placeholder="Victoria Island, Lagos" />

      <Text style={styles.sectionTitle}>Assign a rider now</Text>
      <Text style={styles.helper}>
        Select a rider when the customer needs immediate dispatch. Leave this empty when operations should assign it later.
      </Text>
      <View style={styles.riderList}>
        <Pressable
          onPress={() => setSelectedRider(null)}
          style={[styles.riderOption, selectedRider === null && styles.riderOptionActive]}
        >
          <UserCircle size={20} color={selectedRider === null ? colors.primary : colors.textSecondary} />
          <Text style={styles.riderOptionText}>Assign later</Text>
          {selectedRider === null && <CheckCircle size={18} color={colors.primary} weight="fill" />}
        </Pressable>
        {availableRiders.map((rider) => (
          <Pressable
            key={rider.id}
            onPress={() => setSelectedRider(rider.id)}
            style={[styles.riderOption, selectedRider === rider.id && styles.riderOptionActive]}
          >
            <UserCircle size={20} color={selectedRider === rider.id ? colors.primary : colors.textSecondary} />
            <View style={styles.riderCopy}>
              <Text style={styles.riderName}>{rider.name}</Text>
              <Text style={styles.riderCode}>{rider.riderCode}</Text>
            </View>
            {selectedRider === rider.id && <CheckCircle size={18} color={colors.primary} weight="fill" />}
          </Pressable>
        ))}
      </View>

      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Pressable onPress={handleCreateBooking} style={styles.submitButton}>
        <Text style={styles.submitText}>Create booking</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  content: { padding: spacing.lg, paddingBottom: spacing.xl },
  backButton: { alignSelf: 'flex-start', padding: spacing.sm, marginLeft: -spacing.sm },
  title: { color: colors.text, fontSize: 30, fontWeight: '800', marginTop: spacing.md },
  description: { color: colors.textSecondary, fontSize: 15, lineHeight: 22, marginTop: spacing.sm, marginBottom: spacing.xl },
  label: { color: colors.text, fontSize: 14, fontWeight: '700', marginBottom: spacing.sm },
  input: { backgroundColor: '#fff', borderColor: colors.border, borderRadius: 12, borderWidth: 1, color: colors.text, minHeight: 50, paddingHorizontal: spacing.md, marginBottom: spacing.lg },
  sectionTitle: { color: colors.text, fontSize: 17, fontWeight: '800', marginTop: spacing.sm },
  helper: { color: colors.textSecondary, fontSize: 13, lineHeight: 19, marginTop: spacing.xs, marginBottom: spacing.sm },
  riderList: { gap: spacing.sm },
  riderOption: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, backgroundColor: '#fff', borderColor: colors.border, borderRadius: 12, borderWidth: 1, padding: spacing.md },
  riderOptionActive: { borderColor: colors.primary, backgroundColor: colors.primaryLight },
  riderOptionText: { flex: 1, color: colors.text, fontWeight: '600' },
  riderCopy: { flex: 1 },
  riderName: { color: colors.text, fontWeight: '700' },
  riderCode: { color: colors.textSecondary, fontSize: 12, marginTop: 2 },
  error: { color: colors.danger, fontSize: 13, marginTop: spacing.md },
  submitButton: { alignItems: 'center', backgroundColor: colors.primary, borderRadius: 12, padding: spacing.md, marginTop: spacing.lg },
  submitText: { color: '#fff', fontSize: 16, fontWeight: '700' },
});

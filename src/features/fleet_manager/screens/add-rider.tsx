import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { CaretLeft } from 'phosphor-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, spacing } from '@/theme/tokens';
import { normalizeNigerianPhone } from '@/features/fleet_manager/utils/phone';

export default function AddRiderScreen() {
  const insets = useSafeAreaInsets();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  /**
   * Validates the rider form and shows the normalized Nigerian phone that would be saved.
   */
  function handleSave() {
    const normalizedPhone = normalizeNigerianPhone(phone);
    if (!name.trim()) {
      setError('Enter the rider name.');
      return;
    }
    if (!normalizedPhone) {
      setError('Enter a valid Nigerian phone number, for example 08031234567.');
      return;
    }
    setError('');
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
      <Text style={styles.title}>Add rider</Text>
      <Text style={styles.description}>Create a rider profile so they can receive delivery tasks.</Text>

      <Text style={styles.label}>Full name</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Enter rider name"
        placeholderTextColor={colors.textSecondary}
        style={styles.input}
        accessibilityLabel="Rider full name"
      />

      <Text style={styles.label}>Phone number</Text>
      <TextInput
        value={phone}
        onChangeText={setPhone}
        placeholder="+234 800 000 0000"
        placeholderTextColor={colors.textSecondary}
        keyboardType="phone-pad"
        style={styles.input}
        accessibilityLabel="Rider phone number"
      />

      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Pressable
        onPress={handleSave}
        style={styles.submitButton}
        accessibilityRole="button"
        accessibilityLabel="Save rider"
      >
        <Text style={styles.submitText}>Save rider</Text>
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
  input: {
    backgroundColor: '#fff',
    borderColor: colors.border,
    borderRadius: 12,
    borderWidth: 1,
    color: colors.text,
    minHeight: 50,
    paddingHorizontal: spacing.md,
    marginBottom: spacing.lg,
  },
  submitButton: { alignItems: 'center', backgroundColor: colors.primary, borderRadius: 12, padding: spacing.md, marginTop: spacing.md },
  submitDisabled: { opacity: 0.45 },
  error: { color: colors.danger, fontSize: 13, marginTop: -spacing.sm },
  submitText: { color: '#fff', fontSize: 16, fontWeight: '700' },
});

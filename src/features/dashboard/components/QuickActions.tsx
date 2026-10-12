import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View, Alert } from 'react-native';
import { router } from 'expo-router';
import { colors } from '@/theme/tokens';
import { Copy } from 'phosphor-react-native/src/icons/Copy';
import { Link } from 'phosphor-react-native/src/icons/Link';
import { CheckCircle } from 'phosphor-react-native/src/icons/CheckCircle';
import { Sparkle } from 'phosphor-react-native/src/icons/Sparkle';
import { getBookingDeepLink } from '@/services/deepLinking';

export function QuickActions() {
  const [copied, setCopied] = useState(false);
  const [query, setQuery] = useState('');

  const handleCopy = () => {
    const bookingLink = getBookingDeepLink();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    Alert.alert('Booking Deep Link Generated', bookingLink);
  };

  const handleAiSubmit = () => {
    router.push('/fleet_manager/ai');
  };

  return (
    <View style={styles.container}>
      {/* AI Assistant Search Bar */}
      <Pressable onPress={handleAiSubmit} style={styles.aiBar}>
        <Sparkle color={colors.primary} size={20} weight="fill" />
        <TextInput
          placeholder="Ask Traxx AI (e.g., 'Why is Rider 2 delayed?')"
          placeholderTextColor="#9ca3af"
          value={query}
          onChangeText={setQuery}
          onSubmitEditing={handleAiSubmit}
          style={styles.input}
        />
      </Pressable>

      {/* Quick Copy Booking Link Pill */}
      <Pressable 
        style={[styles.copyPill, copied && styles.copyPillSuccess]} 
        onPress={handleCopy}
        accessibilityRole="button"
        accessibilityLabel="Copy booking deep link"
      >
        {copied ? (
          <CheckCircle color="#16a34a" size={16} weight="fill" />
        ) : (
          <Link color={colors.textSecondary} size={16} weight="bold" />
        )}
        <Text style={[styles.copyText, copied && styles.copyTextSuccess]}>
          {copied ? 'Link Generated & Copied!' : 'Copy Booking Deep Link'}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 24, gap: 16 },
  aiBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 24, // Full pill shape
    paddingHorizontal: 16,
    height: 48, // Taller bar
  },
  input: { 
    flex: 1, 
    marginLeft: 12, 
    fontSize: 14,
    color: colors.text,
  },
  copyPill: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: '#f3f4f6', // Subtle gray pill
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    gap: 8,
  },
  copyPillSuccess: {
    backgroundColor: '#f0fdf4', // Light green tint on copy
  },
  copyText: { 
    color: '#4b5563', 
    fontWeight: '600', 
    fontSize: 13 
  },
  copyTextSuccess: {
    color: '#16a34a',
  }
});

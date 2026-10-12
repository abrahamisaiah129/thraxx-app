import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { colors } from '@/theme/tokens';
import { Copy } from 'phosphor-react-native/src/icons/Copy';
import { Link } from 'phosphor-react-native/src/icons/Link';
import { CheckCircle } from 'phosphor-react-native/src/icons/CheckCircle';
import { Sparkle } from 'phosphor-react-native/src/icons/Sparkle';

export function QuickActions() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <View style={styles.container}>
      {/* AI Assistant Search Bar */}
      <View style={styles.aiBar}>
        <Sparkle color={colors.primary} size={20} weight="fill" />
        <TextInput
          placeholder="Ask Traxx AI (e.g., 'Why is Rider 2 delayed?')"
          placeholderTextColor="#9ca3af"
          style={styles.input}
        />
      </View>

      {/* Quick Copy Booking Link Pill */}
      <Pressable 
        style={[styles.copyPill, copied && styles.copyPillSuccess]} 
        onPress={handleCopy}
      >
        {copied ? (
          <CheckCircle color="#16a34a" size={16} weight="fill" />
        ) : (
          <Link color={colors.textSecondary} size={16} weight="bold" />
        )}
        <Text style={[styles.copyText, copied && styles.copyTextSuccess]}>
          {copied ? 'Link Copied!' : 'Copy Booking Page Link'}
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

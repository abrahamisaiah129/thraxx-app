import React from 'react';
import { View, Text, StyleSheet, Pressable, Switch, ScrollView } from 'react-native';
import { Moon, Sun, Monitor } from 'phosphor-react-native';
import { useThemeStore } from '@/store/useThemeStore';
import { colors } from '@/theme/tokens';
import { fleetManagerData } from '@/data/fleetManagerData';

export default function SettingsScreen() {
  const { theme, setTheme } = useThemeStore();
  
  // Here we use the mock data to populate user info
  const user = {
    fullName: fleetManagerData.Company.legalName,
    securityRole: fleetManagerData.Company.role,
    emailAddress: fleetManagerData.Company.emailAddress,
    phoneNumber: fleetManagerData.Company.phoneNumber,
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>Settings</Text>
        <Text style={styles.subtitle}>{user.fullName} • {user.securityRole.replace('_', ' ').toUpperCase()}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Appearance</Text>
        
        <View style={styles.card}>
          <Pressable 
            style={[styles.row, theme === 'light' && styles.activeRow]} 
            onPress={() => setTheme('light')}
          >
            <View style={styles.rowLeft}>
              <Sun size={20} color={theme === 'light' ? colors.primary : colors.textSecondary} weight={theme === 'light' ? "fill" : "regular"} />
              <Text style={[styles.rowText, theme === 'light' && styles.activeText]}>Light Mode</Text>
            </View>
            {theme === 'light' && <View style={styles.activeDot} />}
          </Pressable>

          <View style={styles.divider} />

          <Pressable 
            style={[styles.row, theme === 'dark' && styles.activeRow]} 
            onPress={() => setTheme('dark')}
          >
            <View style={styles.rowLeft}>
              <Moon size={20} color={theme === 'dark' ? colors.primary : colors.textSecondary} weight={theme === 'dark' ? "fill" : "regular"} />
              <Text style={[styles.rowText, theme === 'dark' && styles.activeText]}>Dark Mode</Text>
            </View>
            {theme === 'dark' && <View style={styles.activeDot} />}
          </Pressable>

          <View style={styles.divider} />

          <Pressable 
            style={[styles.row, theme === 'system' && styles.activeRow]} 
            onPress={() => setTheme('system')}
          >
            <View style={styles.rowLeft}>
              <Monitor size={20} color={theme === 'system' ? colors.primary : colors.textSecondary} weight={theme === 'system' ? "fill" : "regular"} />
              <Text style={[styles.rowText, theme === 'system' && styles.activeText]}>System Default</Text>
            </View>
            {theme === 'system' && <View style={styles.activeDot} />}
          </Pressable>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account</Text>
        <View style={styles.card}>
          <View style={styles.row}>
            <Text style={styles.rowText}>Email Address</Text>
            <Text style={styles.rowValue}>{user.emailAddress}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.row}>
            <Text style={styles.rowText}>Phone Number</Text>
            <Text style={styles.rowValue}>{user.phoneNumber}</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  content: {
    padding: 16,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.text,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 4,
    fontWeight: '500',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 8,
    marginLeft: 4,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  activeRow: {
    backgroundColor: colors.primaryLight,
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  rowText: {
    fontSize: 15,
    fontWeight: '500',
    color: colors.text,
  },
  activeText: {
    color: colors.primary,
    fontWeight: '600',
  },
  rowValue: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  activeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.border,
    marginLeft: 48, // Indent the divider past the icon
  }
});

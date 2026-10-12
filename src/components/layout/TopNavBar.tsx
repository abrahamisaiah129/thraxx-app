import React from 'react';
import { View, Image, StyleSheet, Text, Pressable } from 'react-native';
// We use useSafeAreaInsets so the navbar respects the phone's notch/status bar dynamically
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '@/theme/tokens';
// Updated imports to use clean main entry points to match QuickMetrics
import { Bell, UserCircle } from 'phosphor-react-native';
import { fleetManagerData, MOCK_NOW_MS } from '@/data/fleetManagerData';

/**
 * TopNavBar Component
 */
export function TopNavBar() {
  const { Company } = fleetManagerData;
  const insets = useSafeAreaInsets();

  // Greeting logic dynamically synced using the historical timestamp anchor from mock data
  const mockNow = new Date(MOCK_NOW_MS);
  const hour = mockNow.getHours();
  
  let greeting = 'Good evening';
  if (hour < 12) greeting = 'Good morning';
  else if (hour < 17) greeting = 'Good afternoon';
  
  const dateStr = mockNow.toLocaleDateString('en-US', { 
    weekday: 'short', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <View style={[styles.container, { paddingTop: Math.max(insets.top, 12) }]}>
      {/* Left side: Logo, Context & Company Legal Name */}
      <View style={styles.leftContainer}>
        <Image 
          source={require('../../../assets/images/logo.jpg')} 
          style={styles.logo} 
          resizeMode="cover"
        />
        <View>
          {/* Displays dynamic greeting alongside the extracted legal name from data */}
          <Text style={styles.greeting}>{`${greeting}, ${Company.legalName}`}</Text>
          <Text style={styles.dateText}>{dateStr}</Text>
        </View>
      </View>

      {/* Right side: Actions & Profile */}
      <View style={styles.actionsContainer}>
        <Pressable style={styles.iconButton} accessibilityRole="button" accessibilityLabel="Notifications">
          <Bell size={24} color={colors.text} />
          {/* Unread badge indicator */}
          <View style={styles.badge} />
        </Pressable>

        <Pressable 
          style={styles.profileContainer} 
          onPress={() => console.log('Open profile menu')}
          accessibilityRole="button"
          accessibilityLabel="Profile Menu"
        >
          <UserCircle size={32} color={colors.textSecondary} weight="fill" />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  logo: {
    width: 32,
    height: 32,
    borderRadius: 8, 
  },
  greeting: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.text,
  },
  dateText: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  iconButton: {
    position: 'relative',
    padding: 4,
  },
  badge: {
    position: 'absolute',
    top: 4,
    right: 6,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ef4444', // Red indicator dot
    borderWidth: 1,
    borderColor: '#ffffff',
  },
  profileContainer: {
    // Ready for specific tap dimensions if needed
  },
});

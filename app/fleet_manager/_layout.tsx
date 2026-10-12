// Import the Tabs navigator from Expo Router, which enables bottom-tab based navigation
import { Tabs } from 'expo-router';
import type { ComponentProps } from 'react';
// Import our custom BottomNav component to replace the default Expo tab bar
import { BottomNav } from '@/components/layout/BottomNav';
import { TopNavBar } from '@/components/layout/TopNavBar';

/**
 * VISIBLE_TABS
 *
 * An array of the screens that should actually show up as icons in the bottom navigation bar.
 * The order in this array dictates the order they appear from left to right.
 */
const VISIBLE_TABS = [
  { name: 'index', title: 'Dashboard' },
  { name: 'map', title: 'Live Map' },
  { name: 'assignments', title: 'Assignments' },
  { name: 'requests', title: 'Requests' },
  { name: 'notifications', title: 'Notifications' },
] as const;

/**
 * HIDDEN_SCREENS
 *
 * These are valid authenticated routes, but they should NOT
 * show up as icons in the bottom tab bar.
 */
const HIDDEN_SCREENS = [
  'analytics',
  'setup',
  'settings',
  'riders',
  'shifts',
  'vendors',
  'reports',
  'ai',
  'booking',
  'pricing',
  'profile',
  'signoff',
  'trip',
  'add-rider',
  'assignment/[id]',
  'rider/[id]',
] as const;

/** Screens that provide their own custom header and back button */
const CUSTOM_HEADER_SCREENS = new Set([
  'assignment/[id]',
  'rider/[id]',
  'booking',
  'add-rider',
  'riders',
]);

/**
 * MainLayout
 *
 * This file serves as the root layout for all authenticated screens in the app.
 * It uses the <Tabs> component from Expo Router but injects a custom `tabBar`
 * (the BottomNav component we created) to give it a unique pill-shaped design.
 */
export default function MainLayout() {
  return (
    // The tabBar prop overrides the default UI with our custom BottomNav.
    <Tabs
      tabBar={(props) => <BottomNav {...(props as unknown as ComponentProps<typeof BottomNav>)} />}
      screenOptions={{ 
        headerShown: true,
        header: () => <TopNavBar />
      }}
    >
      {/* Dynamically map over the visible tabs and render them */}
      {VISIBLE_TABS.map(({ name, title }) => (
        <Tabs.Screen key={name} name={name} options={{ title }} />
      ))}

      {/* Dynamically map over the hidden screens and set their href to null so they are hidden from the nav bar */}
      {HIDDEN_SCREENS.map((name) => (
        <Tabs.Screen
          key={name}
          name={name}
          options={{
            href: null,
            headerShown: !CUSTOM_HEADER_SCREENS.has(name),
          }}
        />
      ))}
    </Tabs>
  );
}

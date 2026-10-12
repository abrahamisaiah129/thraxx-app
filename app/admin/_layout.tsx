import { Tabs } from 'expo-router';
import { Buildings, Gear, House, Ticket } from 'phosphor-react-native';
import { colors } from '@/theme/tokens';

export default function AdminLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false, tabBarActiveTintColor: colors.primary }}>
      <Tabs.Screen name="index" options={{ title: 'Overview', tabBarIcon: ({ color }) => <House color={String(color)} /> }} />
      <Tabs.Screen name="businesses" options={{ title: 'Businesses', tabBarIcon: ({ color }) => <Buildings color={String(color)} /> }} />
      <Tabs.Screen name="support" options={{ title: 'Support', tabBarIcon: ({ color }) => <Ticket color={String(color)} /> }} />
      <Tabs.Screen name="settings" options={{ title: 'Settings', tabBarIcon: ({ color }) => <Gear color={String(color)} /> }} />
    </Tabs>
  );
}

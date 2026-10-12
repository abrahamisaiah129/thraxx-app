import { Tabs } from 'expo-router';
import { House, List, User } from 'phosphor-react-native';
import { colors } from '@/theme/tokens';

export default function RiderLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false, tabBarActiveTintColor: colors.primary }}>
      <Tabs.Screen name="index" options={{ title: 'Home', tabBarIcon: ({ color }) => <House color={String(color)} /> }} />
      <Tabs.Screen name="jobs" options={{ title: 'Jobs', tabBarIcon: ({ color }) => <List color={String(color)} /> }} />
      <Tabs.Screen name="profile" options={{ title: 'Profile', tabBarIcon: ({ color }) => <User color={String(color)} /> }} />
    </Tabs>
  );
}

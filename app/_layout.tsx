import { useAuthStore } from '@/store/useAuthStore';
import { Stack } from 'expo-router';

export default function RootLayout() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const role = useAuthStore((s) => s.user?.role);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={!isAuthenticated}>
        <Stack.Screen name="auth" />
      </Stack.Protected>
      <Stack.Protected guard={isAuthenticated && role === 'rider'}>
        <Stack.Screen name="rider" />
      </Stack.Protected>
      <Stack.Protected guard={isAuthenticated && role === 'fleet_manager'}>
        <Stack.Screen name="fleet_manager" />
      </Stack.Protected>
      <Stack.Protected guard={isAuthenticated && role === 'admin'}>
        <Stack.Screen name="admin" />
      </Stack.Protected>
    </Stack>
  );
}
// app/_layout.tsx

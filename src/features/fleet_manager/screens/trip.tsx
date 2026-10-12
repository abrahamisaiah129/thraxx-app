import { View, Text } from 'react-native';
import { ScreenContainer, Button } from '@/components';
import { useRouter } from 'expo-router';

export default function TripScreen() {
  const router = useRouter();

  return (
    <ScreenContainer>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Current Trip</Text>
      <Button title="Back to Dashboard" onPress={() => router.back()} variant="secondary" />
    </ScreenContainer>
  );
}

import { StyleSheet, Text } from 'react-native';
import { Screen } from '@/components/Screen';
import { colors } from '@/theme/tokens';

export default function AdminSettingsScreen() {
  return (
    <Screen>
      <Text style={styles.title}>Admin settings</Text>
      <Text style={styles.body}>Manage platform configuration, permissions, and audit preferences.</Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { color: colors.text, fontSize: 28, fontWeight: '800' },
  body: { color: colors.textSecondary, fontSize: 15, lineHeight: 22, marginTop: 16 },
});

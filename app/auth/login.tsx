// Import core components from React Native for UI layout and text input
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
// Import useState to manage form field state
import { useState } from 'react';
// Import useRouter for programmatic navigation between screens
import { useRouter } from 'expo-router';
// Import our custom, reusable UI button component
import { Button } from '@/components/ui/Button';
// Import centralized theme tokens for consistent styling
import { useAuthStore, type UserRole } from '@/store/useAuthStore';
import { colors, spacing } from '@/theme/tokens';

/**
 * LoginScreen Component
 *
 * This screen handles user authentication. Currently, it is set up to completely
 * bypass real authentication for rapid development and testing.
 */
export default function LoginScreen() {
  // State to track the user's email input
  const [email, setEmail] = useState('');
  // State to track the user's password input
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<Exclude<UserRole, null>>('fleet_manager');

  // Router instance to navigate across the app
  const router = useRouter();
  const login = useAuthStore((state) => state.login);
  const isLoading = useAuthStore((state) => state.isLoading);

  /**
   * handleLogin
   *
   * A placeholder function that fires when the user taps "Login".
   * It skips backend validation and routes to the selected role workspace.
   */
  const handleLogin = async () => {
    // router.replace completely overwrites the history stack so the user cannot press "back" to return to the login screen
    await login(email || 'demo@traxx.ng', role);
    router.replace(
      role === 'admin'
        ? '/admin'
        : role === 'fleet_manager'
          ? '/fleet_manager'
          : '/rider',
    );
  };

  return (
    // Main wrapper container that centers the login form on the screen
    <View style={styles.container}>
      {/* Header text introducing the app */}
      <Text style={styles.title}>Traxx Admin</Text>
      <Text style={styles.subtitle}>Sign in to your account</Text>

      <View style={styles.roleSelector}>
        {(
          [
            ['fleet_manager', 'Fleet Manager'],
            ['rider', 'Rider'],
            ['admin', 'Admin'],
          ] as const
        ).map(([value, label]) => (
          <Pressable
            key={value}
            onPress={() => setRole(value)}
            style={[styles.roleButton, role === value && styles.roleButtonActive]}
          >
            <Text style={[styles.roleText, role === value && styles.roleTextActive]}>{label}</Text>
          </Pressable>
        ))}
      </View>

      {/* 
        Email Input Field
        - keyboardType="email-address" optimizes the mobile keyboard layout for typing emails (@ symbol)
        - autoCapitalize="none" prevents the OS from capitalizing the first letter
      */}
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        placeholder="Email"
        autoCapitalize="none"
      />

      {/* 
        Password Input Field
        - secureTextEntry replaces typed characters with dots/asterisks for security
      */}
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholder="Password"
      />

      {/* 
        Custom Button component wrapping a React Native TouchableOpacity.
        Executes handleLogin to bypass auth when pressed.
      */}
      <Button title="Login" onPress={handleLogin} isLoading={isLoading} />
    </View>
  );
}

// Global styles for the LoginScreen
const styles = StyleSheet.create({
  container: {
    flex: 1, // Take up the entire screen height
    justifyContent: 'center', // Center content vertically
    padding: spacing.xl, // Extra large padding around the edges
    backgroundColor: '#f9fafb', // Standard app background color
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.primary, // Use the primary brand blue
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  roleSelector: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  roleButton: {
    flex: 1,
    paddingVertical: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  roleButtonActive: {
    borderColor: colors.primary,
    backgroundColor: colors.primaryLight,
  },
  roleText: {
    color: colors.textSecondary,
    fontWeight: '600',
  },
  roleTextActive: {
    color: colors.primary,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: spacing.md,
    fontSize: 16,
    marginBottom: spacing.md,
    backgroundColor: '#ffffff',
  },
});

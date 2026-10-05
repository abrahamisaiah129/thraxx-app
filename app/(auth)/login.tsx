// Import core components from React Native for UI layout and text input
import { View, Text, TextInput, StyleSheet } from 'react-native';
// Import useState to manage form field state
import { useState } from 'react';
// Import useRouter for programmatic navigation between screens
import { useRouter } from 'expo-router';
// Import our custom, reusable UI button component
import { Button } from '../../src/components';
// Import centralized theme tokens for consistent styling
import { colors, spacing } from '../../src/theme/tokens';

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
  
  // Router instance to navigate across the app
  const router = useRouter();

  /**
   * handleLogin
   * 
   * A placeholder function that fires when the user taps "Login". 
   * It skips backend validation and forces navigation directly into the main app structure.
   */
  const handleLogin = () => {
    // router.replace completely overwrites the history stack so the user cannot press "back" to return to the login screen
    router.replace('/(main)');
  };

  return (
    // Main wrapper container that centers the login form on the screen
    <View style={styles.container}>
      {/* Header text introducing the app */}
      <Text style={styles.title}>Thraxx Admin</Text>
      <Text style={styles.subtitle}>Sign in to your account</Text>
      
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
      <Button 
        title="Login" 
        onPress={handleLogin} 
      />
    </View>
  );
}

// Global styles for the LoginScreen
const styles = StyleSheet.create({
  container: {
    flex: 1,                    // Take up the entire screen height
    justifyContent: 'center',   // Center content vertically
    padding: spacing.xl,        // Extra large padding around the edges
    backgroundColor: colors.background, // Standard app background color
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.primary,      // Use the primary brand blue
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: spacing.md,
    fontSize: 16,
    marginBottom: spacing.md,
  },
});

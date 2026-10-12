import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { Button } from '@/components/ui/Button';
import { useAuthStore, type UserRole } from '@/store/useAuthStore';
import { colors, spacing } from '@/theme/tokens';
import { ShieldCheck, Motorcycle, Buildings } from 'phosphor-react-native';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<Exclude<UserRole, null>>('fleet_manager');

  const router = useRouter();
  const login = useAuthStore((state) => state.login);
  const isLoading = useAuthStore((state) => state.isLoading);

  const handleLogin = async (selectedRole?: Exclude<UserRole, null>) => {
    const targetRole = selectedRole || role;
    await login(email || `demo_${targetRole}@traxx.ng`, targetRole);
    router.replace(
      targetRole === 'admin'
        ? '/admin'
        : targetRole === 'fleet_manager'
          ? '/fleet_manager'
          : '/rider',
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Traxx Logistics</Text>
      <Text style={styles.subtitle}>Select a role to preview any workspace</Text>

      {/* Role Selector Tabs */}
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

      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        placeholder={`Email (or tap direct login below)`}
        placeholderTextColor={colors.textSecondary}
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholder="Password"
        placeholderTextColor={colors.textSecondary}
      />

      <Button title={`Sign in as ${role === 'fleet_manager' ? 'Fleet Manager' : role === 'rider' ? 'Rider' : 'Admin'}`} onPress={() => handleLogin()} isLoading={isLoading} />

      {/* 1-Tap Quick Role Demos */}
      <View style={styles.quickAccessSection}>
        <Text style={styles.quickAccessTitle}>ONE-TAP QUICK ACCESS</Text>
        <View style={styles.quickButtons}>
          <Pressable
            onPress={() => handleLogin('fleet_manager')}
            style={styles.quickBtn}
          >
            <Buildings size={18} color={colors.primary} weight="bold" />
            <Text style={styles.quickBtnText}>Fleet Manager</Text>
          </Pressable>

          <Pressable
            onPress={() => handleLogin('rider')}
            style={styles.quickBtn}
          >
            <Motorcycle size={18} color="#16a34a" weight="bold" />
            <Text style={styles.quickBtnText}>Rider / Driver</Text>
          </Pressable>

          <Pressable
            onPress={() => handleLogin('admin')}
            style={styles.quickBtn}
          >
            <ShieldCheck size={18} color="#d97706" weight="bold" />
            <Text style={styles.quickBtnText}>Super Admin</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: spacing.xl,
    backgroundColor: '#f9fafb',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.primary,
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: 14,
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
    fontSize: 13,
  },
  roleTextActive: {
    color: colors.primary,
    fontWeight: '700',
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: spacing.md,
    fontSize: 15,
    marginBottom: spacing.md,
    backgroundColor: '#ffffff',
    color: colors.text,
  },
  quickAccessSection: {
    marginTop: spacing.xl,
    paddingTop: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    alignItems: 'center',
    gap: 12,
  },
  quickAccessTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: colors.textSecondary,
    letterSpacing: 0.8,
  },
  quickButtons: {
    flexDirection: 'row',
    gap: 8,
    width: '100%',
  },
  quickBtn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 6,
  },
  quickBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.text,
  },
});

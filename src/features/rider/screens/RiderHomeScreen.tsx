import React, { useState } from 'react';
import {
  Alert,
  Linking,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  CheckCircle,
  MapPin,
  NavigationArrow,
  Package,
  Phone,
  ShieldCheck,
  WarningCircle,
  ChatCircleText,
  ArrowRight,
} from 'phosphor-react-native';
import { router } from 'expo-router';
import { OfflineBanner } from '@/components/OfflineBanner';
import { Screen } from '@/components/Screen';
import { StatePanel } from '@/components/StatePanel';
import { colors, spacing } from '@/theme/tokens';
import { fleetManagerData } from '@/data/fleetManagerData';
import { useAuthStore } from '@/store/useAuthStore';

type Step = 'accepted' | 'picked_up' | 'in_transit' | 'delivered';

export function RiderHomeScreen() {
  const [online, setOnline] = useState(true);
  const [currentStep, setCurrentStep] = useState<Step>('accepted');
  const [sosActive, setSosActive] = useState(false);
  const login = useAuthStore((s) => s.login);

  // Active assignment from mock data
  const assignment = fleetManagerData.Assignments[0];

  const handleNextStep = () => {
    if (currentStep === 'accepted') {
      setCurrentStep('picked_up');
      Alert.alert('Package Picked Up', 'Proceed to customer delivery address.');
    } else if (currentStep === 'picked_up') {
      setCurrentStep('in_transit');
      Alert.alert('In Transit', 'Navigation initiated.');
    } else if (currentStep === 'in_transit') {
      setCurrentStep('delivered');
      Alert.alert('Delivery Completed', `Proof of delivery captured for ${assignment.waybillTrackingNumber}.`);
    } else {
      setCurrentStep('accepted');
      Alert.alert('Reset Demo', 'Assignment reset to accepted.');
    }
  };

  const handleOpenNavigation = () => {
    const address = currentStep === 'accepted' ? assignment.pickupAddress : assignment.deliveryAddress;
    const url = Platform.select({
      ios: `maps:0,0?q=${encodeURIComponent(address)}`,
      android: `geo:0,0?q=${encodeURIComponent(address)}`,
      default: `https://maps.google.com/?q=${encodeURIComponent(address)}`,
    });
    Linking.openURL(url!).catch(() => {
      Alert.alert('Navigation', address);
    });
  };

  const handleCallCustomer = () => {
    if (assignment.customerPhone) {
      Linking.openURL(`tel:${assignment.customerPhone}`).catch(() => {
        Alert.alert('Phone', assignment.customerPhone);
      });
    }
  };

  const handleSmsCustomer = () => {
    if (assignment.customerPhone) {
      Linking.openURL(`sms:${assignment.customerPhone}`).catch(() => {
        Alert.alert('SMS', assignment.customerPhone);
      });
    }
  };

  const handleRaiseSOS = () => {
    Alert.alert(
      'Emergency SOS Dispatch',
      'Select reason to alert fleet control center:',
      [
        {
          text: 'Accident / Breakdown',
          onPress: () => {
            setSosActive(true);
            Alert.alert('SOS Dispatched', 'Dispatch notified of vehicle breakdown.');
          },
        },
        {
          text: 'Customer Unreachable',
          onPress: () => {
            setSosActive(true);
            Alert.alert('SOS Dispatched', 'Dispatch notified customer is unreachable.');
          },
        },
        { text: 'Cancel', style: 'cancel' },
      ],
    );
  };

  const getStepButtonText = () => {
    switch (currentStep) {
      case 'accepted':
        return 'Arrived at Pickup & Confirm Package';
      case 'picked_up':
        return 'Start Trip to Delivery Address';
      case 'in_transit':
        return 'Complete Delivery (Capture POD)';
      case 'delivered':
        return 'Job Completed (Tap to Reset)';
    }
  };

  const stepLabels: Record<Step, string> = {
    accepted: 'Accepted by Rider',
    picked_up: 'Package Picked Up',
    in_transit: 'Out for Delivery',
    delivered: 'Delivered',
  };

  return (
    <Screen scroll>
      {/* Top Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.eyebrow}>RIDER WORKSPACE</Text>
          <Text style={styles.title}>Active Delivery</Text>
        </View>

        <Pressable
          onPress={() => setOnline(!online)}
          style={[styles.dutyPill, online ? styles.dutyOnline : styles.dutyOffline]}
        >
          <View style={[styles.statusDot, online ? styles.dotOnline : styles.dotOffline]} />
          <Text style={[styles.dutyText, online ? styles.textOnline : styles.textOffline]}>
            {online ? 'ON DUTY' : 'OFFLINE'}
          </Text>
        </Pressable>
      </View>

      <OfflineBanner />

      {/* Active Assignment Card */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <View style={styles.packageIconBox}>
            <Package size={24} color={colors.primary} weight="bold" />
          </View>
          <View style={styles.cardHeaderText}>
            <Text style={styles.reference}>{assignment.waybillTrackingNumber}</Text>
            <Text style={styles.statusTextBadge}>● {stepLabels[currentStep]}</Text>
          </View>
          <Pressable onPress={handleOpenNavigation} style={styles.gpsNavBtn}>
            <NavigationArrow size={16} color={colors.primary} weight="fill" />
            <Text style={styles.gpsNavText}>Navigate</Text>
          </Pressable>
        </View>

        {/* Customer Quick Call Row */}
        <View style={styles.customerRow}>
          <View style={styles.customerInfo}>
            <Text style={styles.customerLabel}>RECIPIENT</Text>
            <Text style={styles.customerName}>{assignment.customerName}</Text>
          </View>
          <View style={styles.contactButtons}>
            <Pressable onPress={handleCallCustomer} style={styles.contactBtn}>
              <Phone size={16} color="#16a34a" weight="fill" />
            </Pressable>
            <Pressable onPress={handleSmsCustomer} style={styles.contactBtn}>
              <ChatCircleText size={16} color={colors.primary} weight="fill" />
            </Pressable>
          </View>
        </View>

        {/* Route Details */}
        <View style={styles.route}>
          <View style={styles.routeRow}>
            <MapPin size={20} color={colors.info} weight="fill" />
            <View style={styles.routeTextGroup}>
              <Text style={styles.routeLabel}>Pick up</Text>
              <Text style={styles.routeValue}>{assignment.pickupAddress}</Text>
            </View>
          </View>

          <View style={styles.routeLine} />

          <View style={styles.routeRow}>
            <MapPin size={20} color={colors.success} weight="fill" />
            <View style={styles.routeTextGroup}>
              <Text style={styles.routeLabel}>Deliver to</Text>
              <Text style={styles.routeValue}>{assignment.deliveryAddress}</Text>
            </View>
          </View>
        </View>

        {/* Step Progression Button */}
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={getStepButtonText()}
          onPress={handleNextStep}
          style={({ pressed }) => [
            styles.primaryAction,
            currentStep === 'delivered' && styles.actionDelivered,
            pressed && styles.pressed,
          ]}
        >
          {currentStep === 'delivered' ? (
            <CheckCircle size={20} color="#ffffff" weight="bold" />
          ) : (
            <ArrowRight size={20} color="#ffffff" weight="bold" />
          )}
          <Text style={styles.primaryActionText}>{getStepButtonText()}</Text>
        </Pressable>

        <Text style={styles.syncText}>
          GPS coordinates and delivery timestamps sync to fleet manager in real-time.
        </Text>
      </View>

      {/* SOS Support Panel */}
      <StatePanel
        title={sosActive ? 'SOS Alert Active' : 'Need help on the road?'}
        message={
          sosActive
            ? 'Dispatch is monitoring your location. Stay at a safe position.'
            : 'Raise an emergency flag if you face route blockage, breakdown, or accident.'
        }
        action={
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Raise SOS flag"
            onPress={handleRaiseSOS}
            style={({ pressed }) => [styles.secondaryAction, pressed && styles.pressed]}
          >
            <WarningCircle size={20} color={colors.danger} />
            <Text style={styles.secondaryActionText}>
              {sosActive ? 'Update SOS Status' : 'Raise Road SOS'}
            </Text>
          </Pressable>
        }
      />

      {/* Quick Role Switcher for pair-testing */}
      <View style={styles.roleSwitchCard}>
        <Text style={styles.roleSwitchTitle}>Quick Role Switcher (Mock Mode)</Text>
        <View style={styles.roleSwitchRow}>
          <Pressable
            onPress={async () => {
              await login('manager@traxx.ng', 'fleet_manager');
              router.replace('/fleet_manager');
            }}
            style={styles.switchRoleBtn}
          >
            <ShieldCheck size={16} color={colors.primary} />
            <Text style={styles.switchRoleText}>Fleet Manager</Text>
          </Pressable>

          <Pressable
            onPress={async () => {
              await login('admin@traxx.ng', 'admin');
              router.replace('/admin');
            }}
            style={styles.switchRoleBtn}
          >
            <Text style={styles.switchRoleText}>Admin</Text>
          </Pressable>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  eyebrow: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1,
  },
  title: {
    color: colors.text,
    fontSize: 26,
    fontWeight: '800',
    marginTop: 2,
  },
  dutyPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  dutyOnline: {
    backgroundColor: '#f0fdf4',
  },
  dutyOffline: {
    backgroundColor: '#f1f5f9',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  dotOnline: {
    backgroundColor: '#16a34a',
  },
  dotOffline: {
    backgroundColor: '#64748b',
  },
  dutyText: {
    fontSize: 11,
    fontWeight: '800',
  },
  textOnline: {
    color: '#16a34a',
  },
  textOffline: {
    color: '#64748b',
  },
  card: {
    marginTop: spacing.sm,
    padding: spacing.md,
    borderRadius: 16,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.md,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  packageIconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardHeaderText: {
    flex: 1,
    marginLeft: 12,
  },
  reference: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.text,
  },
  statusTextBadge: {
    fontSize: 13,
    color: colors.primary,
    fontWeight: '700',
    marginTop: 2,
  },
  gpsNavBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.primaryLight,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  gpsNavText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.primary,
  },
  customerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f8fafc',
    padding: 12,
    borderRadius: 10,
  },
  customerInfo: {
    flex: 1,
  },
  customerLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.textSecondary,
    letterSpacing: 0.6,
  },
  customerName: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.text,
    marginTop: 2,
  },
  contactButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  contactBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  route: {
    paddingVertical: 4,
  },
  routeRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  routeLine: {
    width: 2,
    height: 24,
    backgroundColor: '#e2e8f0',
    marginLeft: 9,
    marginVertical: 4,
  },
  routeTextGroup: {
    flex: 1,
  },
  routeLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.textSecondary,
  },
  routeValue: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginTop: 2,
  },
  primaryAction: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 12,
  },
  actionDelivered: {
    backgroundColor: '#16a34a',
  },
  pressed: {
    opacity: 0.85,
  },
  primaryActionText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '700',
  },
  syncText: {
    fontSize: 11,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  secondaryAction: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: '#fee2e2',
  },
  secondaryActionText: {
    color: colors.danger,
    fontSize: 13,
    fontWeight: '700',
  },
  roleSwitchCard: {
    marginTop: spacing.lg,
    padding: spacing.md,
    borderRadius: 12,
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: colors.border,
    gap: 10,
    marginBottom: spacing.xl,
  },
  roleSwitchTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textSecondary,
  },
  roleSwitchRow: {
    flexDirection: 'row',
    gap: 10,
  },
  switchRoleBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 8,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 8,
  },
  switchRoleText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.text,
  },
});

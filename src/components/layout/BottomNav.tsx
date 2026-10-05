import type { Icon as PhosphorIcon } from 'phosphor-react-native';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Direct imports (not the package root) so the web bundler doesn't parse all 1,000+ icons.
import { Bell } from 'phosphor-react-native/src/icons/Bell';
import { ClipboardText } from 'phosphor-react-native/src/icons/ClipboardText';
import { EnvelopeOpen } from 'phosphor-react-native/src/icons/EnvelopeOpen';
import { House } from 'phosphor-react-native/src/icons/House';
import { MapTrifold } from 'phosphor-react-native/src/icons/MapTrifold';

type BottomNavProps = {
  state: {
    index: number;
    routes: Array<{ key: string; name: string }>;
  };
  descriptors: Record<string, { options: { title?: string } }>;
  navigation: {
    emit: (event: { type: 'tabPress'; target: string; canPreventDefault: boolean }) => {
      defaultPrevented?: boolean;
    };
    navigate: (name: string) => void;
  };
};

const TAB_ICONS: Record<string, PhosphorIcon> = {
  index: House,
  map: MapTrifold,
  assignments: ClipboardText,
  requests: EnvelopeOpen,
  notifications: Bell,
};

import { colors } from '../../theme/tokens';

const COLORS = {
  active: colors.primary,
  inactive: '#9ca3af',
  activeBackground: colors.primaryLight,
  barBackground: '#ffffff',
  border: '#e5e7eb',
};

const ICON_SIZE = 24;

export function BottomNav({ state, descriptors, navigation }: BottomNavProps) {
  const insets = useSafeAreaInsets();
  const activeRouteKey = state.routes[state.index].key;
  const visibleRoutes = state.routes.filter((route) => route.name in TAB_ICONS);

  // Calculate bottom padding dynamically to include the device's home indicator safe area
  const paddingBottom = Math.max(insets.bottom, 8);

  return (
    <View style={styles.bar}>
      {visibleRoutes.map((route) => {
        const { options } = descriptors[route.key];
        const isFocused = route.key === activeRouteKey;
        const Icon = TAB_ICONS[route.name];
        const color = isFocused ? COLORS.active : COLORS.inactive;
        const label = options.title ?? route.name;

        const handlePress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <Pressable
            key={route.key}
            onPress={handlePress}
            accessibilityRole="button"
            accessibilityLabel={label}
            accessibilityState={{ selected: isFocused }}
            // Pass the calculated dynamic padding down to the item container
            style={[styles.navItem, { paddingBottom }]}
          >
            <View style={[styles.iconContainer, isFocused && styles.iconContainerActive]}>
              <Icon size={ICON_SIZE} weight={isFocused ? 'fill' : 'regular'} color={color} />
            </View>
            <Text style={[styles.label, { color }, isFocused && styles.labelActive]}>{label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    width: '100%',
    paddingTop: 8,
    paddingHorizontal: 8,
    paddingBottom: 8, 
    backgroundColor: COLORS.barBackground,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: COLORS.border,
    ...Platform.select({
      web: {
        boxShadow: '0px -4px 16px rgba(0, 0, 0, 0.04)',
      } as any,
      default: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.04,
        shadowRadius: 12,
        elevation: 8,
      },
    }),
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 4, 
  },
  iconContainer: {
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderRadius: 16,
  },
  iconContainerActive: {
    backgroundColor: COLORS.activeBackground, // Subtle highlight behind just the icon
  },
  label: {
    fontSize: 11, // Standard 11px
    marginTop: 4,
    fontWeight: '400',
  },
  labelActive: {
    fontWeight: '500', // Medium weight for active
  }
});

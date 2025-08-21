// components/ConaTabBar.tsx
import React from 'react';
import { View, TouchableOpacity, Text, Image, StyleSheet } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const BG = '#142029';
const ACCENT = '#A7EE43';

const icons = {
  Home: require('../assets/icon-home.png'),
  AllMatches: require('../assets/icon-search.png'),
  Create: require('../assets/icon-create.png'),
  Profile: require('../assets/icon-profile.png'),
};

export default function ConaTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();

  return (
    // Transparent overlay so nothing “around” the bar shows
    <View pointerEvents="box-none" style={StyleSheet.absoluteFill}>
<View style={[styles.wrap, { bottom: 6 + insets.bottom * 0.5 }]}>
          <View style={styles.bar}>
          {state.routes.map((route, index) => {
            const isFocused = state.index === index;
            const { options } = descriptors[route.key];
            const label =
              (options.tabBarLabel as string) ??
              (options.title as string) ??
              route.name;

            const onPress = () => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });
              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name as never);
              }
            };

            return (
              <TouchableOpacity
                key={route.key}
                style={styles.item}
                onPress={onPress}
                activeOpacity={0.8}
              >
                <Image
                  source={icons[route.name as keyof typeof icons]}
                  style={[styles.icon, { tintColor: ACCENT }]}
                  resizeMode="contain"
                />
                <Text
                  numberOfLines={1}
                  style={[styles.label, isFocused && styles.labelActive]}
                >
                  {label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    left: 16,
    right: 16,
    paddingBottom:-10,
  },
  bar: {
    height: 64,                 // smaller than before (was ~76)
    backgroundColor: BG,
    borderRadius: 24,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // nice “floating” shadow
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 10,
  },
  item: { width: 82, alignItems: 'center' },
  icon: { width: 22, height: 22, marginBottom: 2 },
  label: { fontSize: 12, color: ACCENT, fontFamily: 'PlusJakarta-Regular' },
  labelActive: { fontFamily: 'PlusJakarta-Bold' },
});

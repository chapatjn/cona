// screens/DevMenu.tsx
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const BRAND = '#A7EE43';
const BG = '#142029';

export default function DevMenuScreen() {
  // keep it loose so we can navigate anywhere without TS friction
  const navigation = useNavigation<any>();

  const items: Array<{ label: string; onPress: () => void }> = [
    // ------- Root stack screens -------
    { label: 'Splash', onPress: () => navigation.navigate('Splash') },
    { label: 'Sign In', onPress: () => navigation.navigate('SignIn') },
    { label: 'Sign Up', onPress: () => navigation.navigate('SignUp') },
    { label: 'Match End', onPress: () => navigation.navigate('MatchEnd') },

    // ------- Tabs (via MainTabs) -------
    {
      label: 'Tabs → Home',
      onPress: () => navigation.navigate('MainTabs', { screen: 'Home' }),
    },
    {
      label: 'Tabs → AllMatches',
      onPress: () => navigation.navigate('MainTabs', { screen: 'AllMatches' }),
    },
    {
      label: 'Tabs → Create',
      onPress: () => navigation.navigate('MainTabs', { screen: 'Create' }),
    },
    {
      label: 'Tabs → Profile',
      onPress: () => navigation.navigate('MainTabs', { screen: 'Profile' }),
    },

    // ------- Deep links inside the Home tab stack (if you have it nested) -------
    {
      label: 'Home → MatchInfo',
      onPress: () =>
        navigation.navigate('MainTabs', {
          screen: 'Home',
          // if Home is a stack, this param pattern will push MatchInfo
          params: { screen: 'MatchInfo' },
        }),
    },
    {
      label: 'Home → Payment',
      onPress: () =>
        navigation.navigate('MainTabs', {
          screen: 'Home',
          params: { screen: 'Payment' },
        }),
    },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Dev Menu</Text>

      <View style={styles.grid}>
        {items.map((it, idx) => (
          <TouchableOpacity key={idx} style={styles.btn} onPress={it.onPress} activeOpacity={0.9}>
            <Text style={styles.btnText}>{it.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.hint}>
        Tip: If “Home → MatchInfo/Payment” doesn’t open, make sure those routes
        are registered in your Home tab stack (or register them at root).
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0E151B' },
  content: { padding: 16, paddingBottom: 40 },
  title: {
    color: BRAND,
    fontSize: 22,
    marginBottom: 12,
    fontFamily: 'PlusJakarta-Bold',
  },
  grid: { gap: 10 },
  btn: {
    backgroundColor: BG,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#22313A',
  },
  btnText: {
    color: BRAND,
    fontSize: 16,
    fontFamily: 'PlusJakarta-Bold',
  },
  hint: {
    marginTop: 16,
    color: '#84A2B6',
    fontSize: 12,
    fontFamily: 'PlusJakarta-Regular',
  },
});

// screens/OnboardingScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, Pressable, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const BG = '#142029';
const GREEN = '#A7EE43';

export default function OnboardingScreen() {
  const navigation = useNavigation<any>();

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        {/* Top block: Logo + Brand */}
        <View style={styles.topBlock}>
          <View style={styles.logoCircle}>
            {/* Blobs to mimic your shapes */}
            <View style={[styles.blob, { width: 16.03, height: 17.81, left: 81.94, top: 69.47 }]} />
            <View style={[styles.blob, { width: 8.91, height: 10.69, left: 48.09, top: 23.16 }]} />
            <View style={[styles.blob, { width: 69.47, height: 74.81, left: 16.03, top: 19.59 }]} />
          </View>
          <Text style={styles.brand}>Cona</Text>
        </View>

        {/* Buttons */}
        <View style={styles.buttons}>
          <Pressable
            onPress={() => navigation.navigate('Login')}
            style={({ pressed }) => [styles.primaryBtn, pressed && styles.pressed]}
          >
            <Text style={styles.primaryText}>Ingresar</Text>
          </Pressable>

          <Pressable
            onPress={() => navigation.navigate('Signup')}
            style={({ pressed }) => [styles.outlineBtn, pressed && styles.pressedOutline]}
          >
            <Text style={styles.outlineText}>Crear cuenta</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: BG },
  container: {
    flex: 1,
    backgroundColor: BG,
    paddingHorizontal: 16,
    paddingTop: 104,
    paddingBottom: 24,
    justifyContent: 'space-between',
  },
  topBlock: {
    width: 370,
    maxWidth: '100%',
    alignSelf: 'center',
    alignItems: 'center',
    gap: 44,
  },
  logoCircle: {
    width: 114,
    height: 114,
    backgroundColor: GREEN,
    borderRadius: 89,
    position: 'relative',
    overflow: 'hidden',
  },
  blob: {
    position: 'absolute',
    backgroundColor: BG,
    borderRadius: 20,
  },
  brand: {
    color: GREEN,
    fontSize: 44,
    lineHeight: 48,
    textAlign: 'center',
    fontFamily: 'PlusJakartaSans-Bold', // change if your loaded font name differs
    fontWeight: '700',
  },
  buttons: {
    width: 370,
    maxWidth: '100%',
    alignSelf: 'center',
    gap: 22,
  },
  primaryBtn: {
    height: 50,
    backgroundColor: GREEN,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryText: {
    color: BG,
    fontSize: 20,
    lineHeight: 20,
    fontFamily: 'PlusJakartaSans-Medium',
    fontWeight: '500',
  },
  outlineBtn: {
    height: 50,
    backgroundColor: BG,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: GREEN,
    alignItems: 'center',
    justifyContent: 'center',
  },
  outlineText: {
    color: GREEN,
    fontSize: 20,
    lineHeight: 20,
    fontFamily: 'PlusJakartaSans-Medium',
    fontWeight: '500',
  },
  pressed: { opacity: 0.9, transform: [{ scale: 0.995 }] },
  pressedOutline: { opacity: 0.88, transform: [{ scale: 0.995 }] },
});

// screens/ProfileEmptyScreen.tsx
import React from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const BRAND = '#A7EE43';
const BG_DARK = '#142029';

export default function ProfileEmptyScreen() {
  const navigation = useNavigation<any>();

  const handleSignIn = () => {
    // Navigate to root stack "SignIn" from inside tabs
    navigation.getParent()?.navigate('SignIn');
  };

  const handleSignUp = () => {
    // Navigate to root stack "SignUp" from inside tabs
    navigation.getParent()?.navigate('SignUp');
  };

  return (
    <View style={styles.screen}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        <View style={styles.emptyWrap}>
          <Image
            source={require('../assets/icon-profile-empty.png')}
            style={styles.emptyIcon}
            resizeMode="contain"
          />
          <Text style={styles.emptyText}>
            Debés ingresar a tu cuenta o crear un usuario para ver tu perfil
          </Text>

          <View style={styles.ctaCol}>
            <TouchableOpacity style={styles.primaryBtn} onPress={handleSignIn} activeOpacity={0.9}>
              <Text style={styles.primaryBtnText}>Ingresar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.secondaryBtn} onPress={handleSignUp} activeOpacity={0.9}>
              <Text style={styles.secondaryBtnText}>Crear cuenta</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#F4F5F6' },
  container: { flex: 1 },

  // Empty state
  emptyWrap: {
    paddingHorizontal: 16,
    alignItems: 'center',
    gap: 26,
    marginTop: 240,
  },
  emptyIcon: { width: 64, height: 64 },
  emptyText: {
    textAlign: 'center',
    color: '#000',
    fontSize: 16,
    lineHeight: 23,
    fontFamily: 'PlusJakarta-Bold', // keep to loaded fonts
  },

  ctaCol: {
    alignSelf: 'stretch',
    marginTop: 32,
    gap: 22,
  },
  primaryBtn: {
    height: 50,
    borderRadius: 16,
    backgroundColor: BRAND,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryBtnText: {
    color: BG_DARK,
    fontSize: 20,
    fontFamily: 'Inter',
    fontWeight: '600',
    lineHeight: 20,
  },
  secondaryBtn: {
    height: 50,
    borderRadius: 16,
    backgroundColor: BG_DARK,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryBtnText: {
    color: BRAND,
    fontSize: 20,
    fontFamily: 'Inter',
    fontWeight: '600',
    lineHeight: 20,
  },
});

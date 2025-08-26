// screens/CreateScreen.tsx
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const BG = '#00000';
const BRAND = '#142029';
const TEXT_MID = '#142029';

export default function CreateScreen() {
  const navigation = useNavigation<any>();

  return (
    <SafeAreaView style={styles.safe}>
      {/* Header: Cona + tappable profile circle */}
   

      {/* Center content */}
      <View style={styles.center}>
        {/* Use icon-profile-empty.png as the “!” mark */}
        <View style={styles.exclamationWrap}>
          <Image
            source={require('../assets/icon-profile-empty.png')}
            style={styles.exclamationTop}
            resizeMode="contain"
          />
          <View style={styles.exclamationDot} />
        </View>

        <Text style={styles.title}>PRÓXIMAMENTE</Text>
        <Text style={styles.subtitle}>Estamos trabajando en esta sección</Text>
      </View>

      {/* Bottom spacer so floating ConaTabBar doesn’t overlap */}
      <View style={{ height: 40 }} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: BG },
  header: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  brand: {
    fontSize: 24,
    color: BRAND,
    fontFamily: 'PlusJakarta-Bold',
  },
  profileBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1F2B39',
  },
  profileImg: { width: 36, height: 36, borderRadius: 18 },

  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },

  // Exclamation built from your icon + a neon dot
  exclamationWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
  },
  exclamationTop: {
    width: 72,
    height: 72,
    tintColor: BRAND, // neon green tint
  },
  exclamationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: BRAND,
    marginTop: 8,
  },

  title: {
    color: '#142029',
    fontSize: 22,
    textAlign: 'center',
    fontFamily: 'PlusJakarta-Bold',
    letterSpacing: 1,
  },
  subtitle: {
    color: TEXT_MID,
    fontSize: 14,
    textAlign: 'center',
    marginTop: 8,
    fontFamily: 'PlusJakarta-Regular',
  },
});

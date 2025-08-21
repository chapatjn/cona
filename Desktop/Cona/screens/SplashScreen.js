// screens/SplashScreen.js
import React, { useEffect } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function SplashScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    const timeout = setTimeout(() => {
      // Go into the tab navigator so the footer shows on Home/others
      navigation.reset({
        index: 0,
        routes: [{ name: 'MainTabs', params: { screen: 'Home' } }],
      });
    }, 2000); // 2 seconds delay

    return () => clearTimeout(timeout);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/cona-logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#142029',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 200,
  },
});
